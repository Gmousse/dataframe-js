import { returnArray, match, transpose } from './reusables.js';
import { InputTypeError, EmptyInputError } from './errors.js';
import Row from './row.js';

export default class DataFrame {
    constructor(data, schema = []) {
        [this.columns, this.__rows__] = this._build(data);
        this._checkSchema();
    }

    * [Symbol.iterator]() {
        for (const row of this.__rows__) {
            yield row;
        }
    }

    _build(data) {
        return match(data)
                (() => true, () => {throw new InputTypeError(typeof data, ['Object', 'Array', 'Row']);})
                ((value) => (value instanceof Object), () => this._fromDict(data))
                ((value) => (value instanceof Array), () => this._fromArray(data))
                ((value) => (value instanceof DataFrame), () => [data.columns, data.__rows__])
                ((value) => (value instanceof Object) && Object.keys(value).length === 0,
                    () => {throw new EmptyInputError(typeof data);})
                ((value) => Array.isArray(value) && value.length === 0, () => {throw new EmptyInputError(typeof data);})();
    }

    _fromDict(dict) {
        const columns = Object.keys(dict);
        return [columns, transpose(Object.values(dict)).map(row => new Row(row, columns))];
    }

    _fromArray(array) {
        const columns = [...Array(Math.max(...array.map(row => row.length))).keys()];
        return [columns, array.map(row => new Row(row, columns))];
    }

    _checkSchema() {
        if (this.__rows__[0].size() !== this.columns.length) {
            throw new Error(
                `ShemaError: ${this.__rows__[0].size()} columns found while
                having ${this.columns.length} in schema`
            );
        }
    }

    toDict() {
        return this.__publics__();
    }

    toArray() {
        return this.__rows__;
    }

    select(columns = []) {
        return new DataFrame(this.__rows__.map(
            row => row.select(returnArray(columns))
        ), returnArray(columns));
    }

    filter(condition = () => true) {
        return new DataFrame(this.__rows__.filter(
            row => condition(row)
        ), this.columns);
    }

    withColumn(columnName, columnFunc = () => null) {
        const newColumns = this.columns.includes(columnName) ? this.columns : [...this.columns, columnName];
        return new DataFrame(this.__rows__.map(
            (row, index) => {
                return row.add(columnName, columnFunc(row, index));
            }
        ), newColumns);
    }

    count() {
        return this.__rows__.length;
    }
}
