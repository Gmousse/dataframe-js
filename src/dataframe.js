import { match, transpose, chain, __iter__ } from './reusables.js';
import { InputTypeError, EmptyInputError } from './errors.js';
import Row from './row.js';

export default class DataFrame {
    constructor(data, columns) {
        [this.__rows__, this.columns] = this._build(data, columns);
    }

    * [Symbol.iterator]() {
        for (const row of this.__rows__) {
            yield row;
        }
    }

    _build(data, columns) {
        return match(data,
                [(value) => (value instanceof DataFrame), () => [data.__rows__, data.columns]],
                [(value) => Array.isArray(value) && value.length === 0,
                    () => {throw new EmptyInputError(typeof data);}],
                [(value) => (value instanceof Object) && Object.keys(value).length === 0,
                    () => {throw new EmptyInputError(typeof data);}],
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

    transpose() {
        const newColumns = [...Array(this.count()).keys()];
        return new DataFrame(transpose(transpose(Object.values(this.toDict()))).map(row => new Row(row, newColumns)), newColumns);
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
            ...__iter__((row) => makeRow(row.toArray()), this.__rows__, rows),
        ].join('\n');
        return returnAsString ? toShow : console.log(toShow);
    }

    select(...columns) {
        return new DataFrame(this.__rows__.map(
            row => row.select(...columns)
        ), columns);
    }

    withColumn(columnName, func = () => undefined) {
        return new DataFrame(this.__rows__.map(
            (row, index) => {
                return row.set(columnName, func(row, index));
            }
        ), this.columns.includes(columnName) ? this.columns : [...this.columns, columnName]);
    }

    drop(columnName) {
        return new DataFrame(this.__rows__.map(
            (row) => row.delete(columnName)
        ), this.columns.filter(column => column !== columnName));
    }

    chain(...funcs) {
        return new DataFrame([...chain(this.__rows__, ...funcs)], this.columns);
    }

    filter(condition = () => true) {
        return new DataFrame([...__iter__(row => condition(row) ? row : false, this.__rows__)], this.columns);
    }

    map(modification = () => true) {
        return new DataFrame([...__iter__((line) => modification(line), this.__rows__)], this.columns);
    }

    count() {
        return [...this].length;
    }

}
