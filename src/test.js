import { returnArray, match, transpose, opMax } from './reusables.js';
import { InputTypeError, EmptyInputError, SchemaTypeError } from './errors.js';
import Row from './row.js';

function Any(value) {return value;}

export default class DataFrame {
    constructor(data) {
        [this.__rows__] = this._build(data);
        Object.freeze(this);
    }

    * [Symbol.iterator]() {
        for (const row of this.__rows__) {
            yield row;
        }
    }

    * __iter__(func, limit = Infinity) {
        let token = limit;
        for (const row of this.__rows__) {
            if (token <= 0) return;
            token --;
            const chain = func(row);
            if (chain) {yield chain;}
        }
    }

    _build(data) {
        return match(data,
                [(value) => (value instanceof DataFrame), () => [data.__rows__]],
                [(value) => Array.isArray(value) && value.length === 0,
                    () => {throw new EmptyInputError(typeof data);}],
                [(value) => (value instanceof Object) && Object.keys(value).length === 0,
                    () => {throw new EmptyInputError(typeof data);}],
                [(value) => (value instanceof Array), () => this._fromArray(data)],
                [(value) => (value instanceof Object), () => this._fromDict(data)],
                [() => true, () => {throw new InputTypeError(typeof data, ['Object', 'Array', 'Row']);}]);
    }

    _fromDict(dict) {
        return [transpose(Object.values(dict)).map(row => [...row])];
    }

    _fromArray(array) {
        return [array.map(row => [...row])];
    }
    toDict() {
        return Object.assign({}, ...Object.entries(
            transpose([...this].map(row => row.toArray()))
        ).map(([index, column]) => ({[this.columns[index]]: column})));
    }

    toArray() {
        return [...this].map(row => row.toArray());
    }

    chain(...operations) {
        return new DataFrame([...this.__iter__(
            operations.reduce(
                (p, n) => (x) => {
                    const prev = p(x);
                    const next = prev ? n(prev) : false;
                    return next === true ? prev : next;
                }, (x) => x)
        )]);
    }
}
