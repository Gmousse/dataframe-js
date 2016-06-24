import { returnArray, match, transpose, opMax } from './reusables.js';
import { InputTypeError, EmptyInputError, SchemaTypeError } from './errors.js';
import Row from './row.js';

function Any(value) {return value;}

export default class DataFrame {
    constructor(data, schema) {
        [this.columns, this.__rows__] = this._build(data, schema);
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

    _build(data, schema) {
        return match(data,
                [(value) => (value instanceof DataFrame), () => [data.columns, data.__rows__]],
                [(value) => Array.isArray(value) && value.length === 0,
                    () => {throw new EmptyInputError(typeof data);}],
                [(value) => (value instanceof Object) && Object.keys(value).length === 0,
                    () => {throw new EmptyInputError(typeof data);}],
                [(value) => (value instanceof Array), () => this._fromArray(data, schema)],
                [(value) => (value instanceof Object), () => this._fromDict(data, schema)],
                [() => true, () => {throw new InputTypeError(typeof data, ['Object', 'Array', 'Row']);}]);
    }

    _fromDict(dict, schema) {
        const realSchema = schema ? schema : this._inferSchemaFromDict(dict);
        return [realSchema, transpose(Object.values(dict)).map(row => new Row(row, realSchema))];
    }

    _fromArray(array, schema) {
        const realSchema = schema ? this._formatSchema(schema) : this._inferSchemaFromArray(array);
        return [realSchema, array.map(row => new Row(row, realSchema))];
    }

    _formatSchema(schema) {
        if (!Array.isArray(schema)) {
            throw new SchemaTypeError(typeof schema);
        }
        return schema.map(column => Array.isArray(column) ? column : column);
    }

    _inferSchemaFromDict(dict) {
        return Object.keys(dict).map(column => column);
    }

    _inferSchemaFromArray(array) {
        return match(array[0],
                [(value) => (value instanceof Array),
                 () => [...Array(opMax(array.map(row => row.length))).keys()].map(
                    column => String(column)
                )],
                [(value) => (value instanceof Row), (value) => value.__schema__],
                [(value) => (value instanceof Object), (value) => Object.keys(value).map(column => column)]
        );
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

    filter(condition = () => true) {
        return new DataFrame([...this.__iter__(row => condition(row) ? row : false)], this.__schema__);
    }

    map(modification = () => true) {
        return new DataFrame([...this.__iter__((line) => modification(line))], this.__schema__);
    }

    ____deprecatedFilter____(condition = () => true) {
        return new DataFrame(this.__rows__.filter(
            row => condition(row)
        ), this.__schema__);
    }

    ____deprecatedMap____(modification = () => true) {
        return new DataFrame(this.__rows__.map(
            row => modification(row)
        ), this.__schema__);
    }

    select(...columns) {
        return new DataFrame(this.__rows__.map(
            row => row.select(...columns)
        ), this.__schema__.filter(column => returnArray(columns).includes(column[0])));
    }

    withColumn(columnName, columnFunc = () => undefined) {
        return new DataFrame(this.__rows__.map(
            (row, index) => {
                return row.set(columnName, columnFunc(row, index));
            }
        ), this.columns.includes(columnName) ? this.__schema__ : [...this.__schema__, [columnName, Any]]);
    }

    drop(columnName) {
        return new DataFrame(this.__rows__.map(
            (row) => row.delete(columnName)
        ), this.__schema__.filter(column => column[0] !== columnName));
    }

    count() {
        return [...this].length;
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
            ...this.__iter__((row) => makeRow(row.toArray()), limit),
        ].join('\n');
        return onlyReturn ? toShow : console.log(toShow);
    }
}
