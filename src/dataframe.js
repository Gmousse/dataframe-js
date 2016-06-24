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

    toDict() {
        return Object.assign({}, ...Object.entries(
            transpose([...this.__rows__].map(row => row.toArray()))
        ).map(([index, column]) => ({[this.columns[index]]: column})));
    }

    toArray() {
        return [...this].map(row => row.toArray());
    }

    show(limit = 10, onlyReturn = false) {
        const makeRow = (row) => (
            `| ${row.map(
                column => String(column).substring(0, 10) + Array(10 - String(column).length).join(' ')
            ).join(' | ')} |`
        );
        const header = makeRow(this.columns);
        const toShow = [
            header,
            Array(header.length).join('-'),
            ...__iter__((row) => makeRow(row.toArray()), this.__rows__, limit),
        ].join('\n');
        return onlyReturn ? toShow : console.log(toShow);
    }

    select(...columns) {
        this.columns = this.columns.filter(column => columns.includes(column));
        this.__rows__ = this.__rows__.map(
            row => row.select(...columns)
        );
        return this;
    }

    chain(...funcs) {
        this.__rows__ = chain(this.__rows__, ...funcs);
        return this;
    }

    count() {
        return [...this].length;
    }

}
