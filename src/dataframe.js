import { match, transpose, chain, iter, arrayEqual } from './reusables.js';
import { InputTypeError, NotTheSameSchemaError } from './errors.js';
import Row from './row.js';

/**
 * DataFrame Object providing a structured data container with columns and rows.
 */
export default class DataFrame {
    /**
     * Create a new DataFrame.
     * @param {array | object | DataFrame} data The data of the DataFrame.
     * @param {array} columns The DataFrame column names.
     * @param {...object} [modules] Additional modules.
     */
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


    /**
     * Convert DataFrame into dict / hash / object.
     * @returns {object} The DataFrame converted into dict.
     */
    toDict() {
        return Object.assign({}, ...Object.entries(
            transpose([...this.__rows__].map(row => row.toArray()))
        ).map(([index, column]) => ({[this.columns[index]]: column})));
    }

    /**
     * Convert DataFrame into Array.
     * @returns {array} The DataFrame converted into dict.
     */
    toArray() {
        return [...this].map(row => row.toArray());
    }

    /**
     * Display the DataFrame as String Table. Can only return a sring instead of displaying the DataFrame.
     * @param {number} [rows=10] The number of lines to display.
     * @param {boolean} [quiet=false] Quiet mode. If true, only returns a string instead of console.log().
     * @returns {string} The DataFrame as String Table.
     */
    show(rows = 10, quiet = false) {
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
        if (!quiet) {console.log(toShow);}
        return toShow;
    }

    /**
     * Give the DataFrame dimensions.
     * @returns {array} The DataFrame dimensions. [height, weight]
     */
    dim() {
        return [this.count(), this.columns.length];
    }

    /**
     * Select columns in the DataFrame.
     * @param {...string} columnNames The columns to select.
     * @returns {DataFrame} A new DataFrame containing selected columns.
     */
    select(...columnNames) {
        return this.__newInstance__(this.__rows__.map(
            row => row.select(...columnNames)
        ), columnNames);
    }

    /**
     * Add a new column or set an existing one.
     * @param {string} columnName The column to modify or to create.
     * @param {function} [func=(row, index) => undefined] The function to create the column.
     * @returns {DataFrame} A new DataFrame containing the new or modified column.
     */
    withColumn(columnName, func = () => undefined) {
        return this.__newInstance__(this.__rows__.map(
            (row, index) => {
                return row.set(columnName, func(row, index));
            }
        ), this.columns.includes(columnName) ? this.columns : [...this.columns, columnName]);
    }

    /**
     * Modify the structure of the DataFrame by changing columns order, creating new columns or removing some columns.
     * @param {...string} columnNames The new columns of the DataFrame.
     * @returns {DataFrame} A new DataFrame with different columns (renamed, add or deleted).
     */
    restructure(...columnNames) {
        return this.__newInstance__(this.__rows__, columnNames);
    }

    /**
     * Rename columns.
     * @param {...string} columnNames The new column names of the DataFrame.
     * @returns {DataFrame} A new DataFrame with the new column names.
     */
    rename(...columnNames) {
        return this.__newInstance__(this.__rows__.map(row => row.toArray()), columnNames);
    }

    /**
     * Remove a single column.
     * @param {string} columnName The column to drop.
     * @returns {DataFrame} A new DataFrame without the dropped column.
     */
    drop(columnName) {
        return this.__newInstance__(this.__rows__.map(
            (row) => row.delete(columnName)
        ), this.columns.filter(column => column !== columnName));
    }

    /**
     * Compute unique values into a column.
     * @param {string} columnName The column to distinct.
     * @returns {array} An Array containing distinct values of the column.
     */
    distinct(columnName) {
        return [...new Set(...transpose(this.select(columnName).toArray()))];
    }

    /**
     * Chain multiple functions on DataFrame (filters, maps) and optimized their executions.
     * If a function returns boolean, it's a filter. Else it's a map.
     * @param {...function} funcs Functions to apply on the DataFrame rows taking the row as parameter.
     * @returns {DataFrame} A new DataFrame with modified rows.
     */
    chain(...funcs) {
        return this.__newInstance__([...chain(this.__rows__, ...funcs)], this.columns);
    }

    /**
     * Filter DataFrame rows. /!\ Prefer to use .chain().
     * @param {function} func A function sending a boolean taking the row as parameter.
     * @returns {DataFrame} A new filtered DataFrame.
     */
    filter(func) {
        const filteredRows = [...iter(this.__rows__, row => func(row) ? row : false)];
        return filteredRows.length > 0 ? this.__newInstance__(filteredRows, this.columns) : this.__newInstance__([], []);
    }

    /**
     * Map on DataFrame rows. /!\ Prefer to use .chain().
     * @param {function} func A function to apply on each row taking the row as parameter.
     * @returns {DataFrame} A new DataFrame with modified rows.
     */
    map(func) {
        return this.__newInstance__([...iter(this.__rows__, row => func(row))], this.columns);
    }

    /**
     * Reduce DataFrame into a value.
     * @param {function} func The reduce function taking 2 parameters, previous and next.
     * @param [init] The initial value of the reducer.
     * @returns A reduced value.
     */
    reduce(func, init) {
        return typeof init === 'undefined' ? this.__rows__.reduce((p, n) => func(p, n)) :
         this.__rows__.reduce((p, n) => func(p, n), init);
    }

    /**
     * Reduce DataFrame into a value, starting from the last row (see .reduce()).
     * @param {function} func The reduce function taking 2 parameters, previous and next.
     * @param [init] The initial value of the reducer.
     * @returns A reduced value.
     */
    reduceRight(func, init) {
        return typeof init === 'undefined' ? this.__rows__.reduceRight((p, n) => func(p, n)) :
         this.__rows__.reduceRight((p, n) => func(p, n), init);
    }

    /**
     * Group DataFrame rows by a column values.
     * @param {string} columnName The column giving groups (distinct values).
     * @returns {array} An array containing a DataFrame by group. The group value can be accessed via df.group.
     */
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

    /**
     * Sort DataFrame rows based on a column values.
     * @param {string} columnName The column giving order.
     * @param {boolean} [reverse=false] Reverse mode. Reverse the order if true.
     * @returns {DataFrame} An ordered DataFrame.
     */
    sortBy(columnName, reverse = false) {
        const sortedRows = this.__rows__.sort((p, n) => p.get(columnName) - n.get(columnName));
        return this.__newInstance__(reverse ? sortedRows.reverse() : sortedRows, this.columns);
    }

    /**
     * Give the rows number.
     * @returns {int} The number of DataFrame rows.
     */
    count() {
        return this.dim()[0];
    }

    /**
     * Give the count of a value into a column.
     * @param valueToCount The value to count into the selected column.
     * @param {string} columnName The column where found the value.
     * @returns {int} The number of times the selected value appears.
     */
    countValue(valueToCount, columnName) {
        return this.filter(row => row.get(columnName) === valueToCount).count();
    }

    /**
     * Concat two DataFrames.
     * @param {DataFrame} dfToUnion The DataFrame to concat.
     * @returns {DataFrame} A new DataFrame resulting of the union.
     */
    union(dfToUnion) {
        if (!arrayEqual(this.columns, dfToUnion.columns)) {
            throw new NotTheSameSchemaError(dfToUnion.columns, this.columns);
        }
        return this.__newInstance__([...this, ...dfToUnion], this.columns);
    }

    /**
     * Join two DataFrames.
     * @param {DataFrame} dfToJoin The DataFrame to join.
     * @param {string} on The selected column for the join.
     * @param {string} [how='full'] The join mode. Can be: full, inner, outer, left, right.
     * @returns {DataFrame} The joined DataFrame.
     */
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

    /**
     * Join two DataFrames with inner mode.
     * @param {DataFrame} dfToJoin The DataFrame to join.
     * @param {string} on The selected column for the join.
     * @returns {DataFrame} The joined DataFrame.
     */
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

    /**
     * Join two DataFrames with full mode.
     * @param {DataFrame} dfToJoin The DataFrame to join.
     * @param {string} on The selected column for the join.
     * @returns {DataFrame} The joined DataFrame.
     */
    fullJoin(dfToJoin, on) {
        const newColumns = [...new Set([...this.columns, ...dfToJoin.columns])];
        return [...iter([
            ...this.groupBy(on), ...dfToJoin.groupBy(on),
        ], groupedDF => groupedDF.restructure(...newColumns))].reduce((p, n) => p.union(n));
    }

    /**
     * Join two DataFrames with outer mode.
     * @param {DataFrame} dfToJoin The DataFrame to join.
     * @param {string} on The selected column for the join.
     * @returns {DataFrame} The joined DataFrame.
     */
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

    /**
     * Join two DataFrames with left mode.
     * @param {DataFrame} dfToJoin The DataFrame to join.
     * @param {string} on The selected column for the join.
     * @returns {DataFrame} The joined DataFrame.
     */
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

    /**
     * Join two DataFrames with right mode.
     * @param {DataFrame} dfToJoin The DataFrame to join.
     * @param {string} on The selected column for the join.
     * @returns {DataFrame} The joined DataFrame.
     */
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
