import { match, transpose, chain } from './reusables.js';
import { InputTypeError, EmptyInputError } from './errors.js';
import Row from './row.js';

export default class DataFrame {
    constructor(data, columns) {
        this.columns = columns;
        this.__rows__ = this._build(data);
    }

    * [Symbol.iterator]() {
        for (const row of this.__rows__) {
            yield row;
        }
    }

    _build(data) {
        return match(data,
                [(value) => (value instanceof DataFrame), () => data.__rows__],
                [(value) => Array.isArray(value) && value.length === 0,
                    () => {throw new EmptyInputError(typeof data);}],
                [(value) => (value instanceof Object) && Object.keys(value).length === 0,
                    () => {throw new EmptyInputError(typeof data);}],
                [(value) => (value instanceof Array), () => this._fromArray(data)],
                [(value) => (value instanceof Object), () => this._fromDict(data)],
                [() => true, () => {throw new InputTypeError(typeof data, ['Object', 'Array']);}]);
    }

    _fromDict(dict) {
        return transpose(Object.values(dict)).map(row => new Row(row, this.columns));
    }

    _fromArray(array) {
        return array.map(row => new Row(row, this.columns));
    }

    chain(...funcs) {
        return chain(this.__rows__, ...funcs);
    }

}
