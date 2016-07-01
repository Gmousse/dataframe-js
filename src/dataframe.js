import { match, transpose, chain, iter, arrayEqual } from './reusables.js';
import { InputTypeError, NotTheSameSchemaError } from './errors.js';
import Row from './row.js';

export default class DataFrame {
    constructor(data, columns, ...modules) {
        [this.__rows__, this.columns] = this._build(data, columns);
        this.modules = modules;
        if (modules.length > 0) {
            Object.assign(this, ...modules.map(Plugin => {
                const pluginInstance = new Plugin(this);
                return {[pluginInstance.name]: pluginInstance};
            }));
        }
    }

    * [Symbol.iterator]() {
        for (const row of this.__rows__) {
            yield row;
        }
    }

    __newInstance__(data, columns) {
        return new DataFrame(data, columns, ...this.modules);
    }

    _build(data, columns) {
        return match(data,
                [(value) => (value instanceof DataFrame), () => [data.__rows__, data.columns]],
                [(value) => (value instanceof Array), () => this._fromArray(data, columns)],
                [(value) => (value instanceof Object), () => this._fromDict(data, columns)],
                [() => true, () => {throw new InputTypeError(typeof data, ['Object', 'Array']);}]);
    }

    _fromDict(dict, columns) {
        return [transpose(Object.values(dict)).map(row => new Row(row, columns)), columns];
    }

    _fromArray(array, columns) {
        return [array.map(row => new Row(row, columns)), columns];
    }

    toDict() {
        return Object.assign({}, ...Object.entries(
            transpose([...this.__rows__].map(row => row.toArray()))
        ).map(([index, column]) => ({[this.columns[index]]: column})));
    }

    toArray() {
        return [...this].map(row => row.toArray());
    }

    show(rows = 10, returnAsString = false) {
        const makeRow = (row) => (
            `| ${row.map(
                column => String(column).substring(0, 10) + Array(10 - String(column).length).join(' ')
            ).join(' | ')} |`
        );
        const header = makeRow(this.columns);
        const toShow = [
            header,
            Array(header.length).join('-'),
            ...iter(this.__rows__, row => makeRow(row.toArray()), rows),
        ].join('\n');
        return returnAsString ? toShow : console.log(toShow);
    }

    dim() {
        return [this.count(), this.columns.length];
    }

    select(...columns) {
        return this.__newInstance__(this.__rows__.map(
            row => row.select(...columns)
        ), columns);
    }

    withColumn(columnName, func = () => undefined) {
        return this.__newInstance__(this.__rows__.map(
            (row, index) => {
                return row.set(columnName, func(row, index));
            }
        ), this.columns.includes(columnName) ? this.columns : [...this.columns, columnName]);
    }

    restructure(...newColumns) {
        return this.__newInstance__(this.__rows__, newColumns);
    }

    rename(...newColumnsName) {
        return this.__newInstance__(this.__rows__.map(row => row.toArray()), newColumnsName);
    }

    drop(columnName) {
        return this.__newInstance__(this.__rows__.map(
            (row) => row.delete(columnName)
        ), this.columns.filter(column => column !== columnName));
    }

    distinct(columnName) {
        return [...new Set(...transpose(this.select(columnName).toArray()))];
    }

    chain(...funcs) {
        return this.__newInstance__([...chain(this.__rows__, ...funcs)], this.columns);
    }

    filter(condition) {
        const filteredRows = [...iter(this.__rows__, row => condition(row) ? row : false)];
        return filteredRows.length > 0 ? this.__newInstance__(filteredRows, this.columns) : this.__newInstance__([], []);
    }

    map(modification) {
        return this.__newInstance__([...iter(this.__rows__, row => modification(row))], this.columns);
    }

    reduce(func, init) {
        return typeof init === 'undefined' ? this.__rows__.reduce((p, n) => func(p, n)) :
         this.__rows__.reduce((p, n) => func(p, n), init);
    }

    reduceRight(func, init) {
        return typeof init === 'undefined' ? this.__rows__.reduceRight((p, n) => func(p, n)) :
         this.__rows__.reduceRight((p, n) => func(p, n), init);
    }

    groupBy(columnName) {
        return [...iter(
            this.distinct(columnName),
            (value) => {
                const groupedDF = this.filter(row => row.get(columnName) === value);
                groupedDF.group = value;
                return groupedDF;
            }
        )];
    }

    sortBy(columnName, reverse = false) {
        const sortedRows = this.__rows__.sort((p, n) => p.get(columnName) - n.get(columnName));
        return this.__newInstance__(reverse ? sortedRows.reverse() : sortedRows, this.columns);
    }

    count(valueToCount, columnName = this.columns[0]) {
        return valueToCount ? this.filter(row => row.get(columnName) === valueToCount).count() : [...this].length;
    }

    union(dfToUnion) {
        if (!arrayEqual(this.columns, dfToUnion.columns)) {
            throw new NotTheSameSchemaError(dfToUnion.columns, this.columns);
        }
        return this.__newInstance__([...this, ...dfToUnion], this.columns);
    }

    join(dfToJoin, on, how = 'full') {
        const joinMethods = {
            inner: () => this.innerJoin(dfToJoin, on),
            full: () => this.fullJoin(dfToJoin, on),
            outer: () => this.outerJoin(dfToJoin, on),
            left: () => this.leftJoin(dfToJoin, on),
            right: () => this.rightJoin(dfToJoin, on),
        };
        return joinMethods[how]();
    }

    innerJoin(dfToJoin, on) {
        const newColumns = [...new Set([...this.columns, ...dfToJoin.columns])];
        const actualGroupedDFs = this.groupBy(on);
        const groupedDFsToJoin = dfToJoin.groupBy(on);
        return [...iter([
            ...actualGroupedDFs.filter(
                groupedDF => !(typeof groupedDFsToJoin.find(df => df.group === groupedDF.group) === 'undefined')
            ),
            ...groupedDFsToJoin.filter(
                groupedDF => !(typeof actualGroupedDFs.find(df => df.group === groupedDF.group) === 'undefined')
            ),
        ], groupedDF => groupedDF.restructure(...newColumns))].reduce((p, n) => p.union(n));
    }

    fullJoin(dfToJoin, on) {
        const newColumns = [...new Set([...this.columns, ...dfToJoin.columns])];
        return [...iter([
            ...this.groupBy(on), ...dfToJoin.groupBy(on),
        ], groupedDF => groupedDF.restructure(...newColumns))].reduce((p, n) => p.union(n));
    }

    outerJoin(dfToJoin, on) {
        const newColumns = [...new Set([...this.columns, ...dfToJoin.columns])];
        const actualGroupedDFs = this.groupBy(on);
        const groupedDFsToJoin = dfToJoin.groupBy(on);
        return [...iter([
            ...actualGroupedDFs.filter(
                groupedDF => typeof groupedDFsToJoin.find(df => df.group === groupedDF.group) === 'undefined'
            ),
            ...groupedDFsToJoin.filter(
                groupedDF => typeof actualGroupedDFs.find(df => df.group === groupedDF.group) === 'undefined'
            ),
        ], groupedDF => groupedDF.restructure(...newColumns))].reduce((p, n) => p.union(n));
    }

    leftJoin(dfToJoin, on) {
        const newColumns = [...new Set([...this.columns, ...dfToJoin.columns])];
        const actualGroupedDFs = this.groupBy(on);
        const groupedDFsToJoin = dfToJoin.groupBy(on);
        return [...iter([
            ...actualGroupedDFs,
            ...groupedDFsToJoin.filter(
                groupedDF => !(typeof actualGroupedDFs.find(df => df.group === groupedDF.group) === 'undefined')
            ),
        ], groupedDF => groupedDF.restructure(...newColumns))].reduce((p, n) => p.union(n));
    }

    rightJoin(dfToJoin, on) {
        const newColumns = [...new Set([...this.columns, ...dfToJoin.columns])];
        const actualGroupedDFs = this.groupBy(on);
        const groupedDFsToJoin = dfToJoin.groupBy(on);
        return [...iter([
            ...groupedDFsToJoin,
            ...actualGroupedDFs.filter(
                groupedDF => !(typeof groupedDFsToJoin.find(df => df.group === groupedDF.group) === 'undefined')
            ),
        ], groupedDF => groupedDF.restructure(...newColumns))].reduce((p, n) => p.union(n));
    }
}
