import { returnArray, match, transpose } from './reusables.js';
import { InputTypeError, EmptyInputError, SchemaError, SchemaTypeError } from './errors.js';
import Row from './row.js';

export default class DataFrame {
    constructor(data, schema) {
        [this.__schema__, this.__rows__] = this._build(data, schema);
        this.columns = this.__schema__.map(column => column[0]);
        this._checkSchema();
    }

    * [Symbol.iterator]() {
        for (const row of this.__rows__) {
            yield row;
        }
    }

    * __map__(func) {
        for (const row of this) {
            yield func(row);
        }
    }

    * __filter__(func) {
        for (const row of this.__rows__) {
            if (func(row)) { yield row; }
        }
    }

    * __iter__(chaining) {
        for (const row of this.__rows__) {
            const chain = chaining(row);
            if (chain) {yield chain;}
        }
    }

    _build(data, schema) {
        return match(data,
                [(value) => Array.isArray(value) && value.length === 0,
                    () => {throw new EmptyInputError(typeof data);}],
                [(value) => (value instanceof Object) && Object.keys(value).length === 0,
                    () => {throw new EmptyInputError(typeof data);}],
                [(value) => (value instanceof Array), () => this._fromArray(data, schema)],
                [(value) => (value instanceof DataFrame), () => [data.__schema__, data.__rows__]],
                [(value) => (value instanceof Object), () => this._fromDict(data, schema)],
                [() => true, () => {throw new InputTypeError(typeof data, ['Object', 'Array', 'Row']);}]);
    }

    _fromDict(dict, schema) {
        const realSchema = schema ? this._formatSchema(schema) : this._inferSchemaFromDict(dict);
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
        return schema.map(column => Array.isArray(column) ? column : [column, 'any']);
    }

    _inferSchemaFromDict(dict) {
        return Object.keys(dict).map(column => [column, typeof dict[column][0]]);
    }

    _inferSchemaFromArray(array) {
        return [...Array(Math.max(...array.map(row => row.length))).keys()].map(
            column => [column, typeof array[0][column]]
        );
    }

    _checkSchema() {
        if (this.__rows__[0].size() !== this.__schema__.length) {
            throw new SchemaError(this.__rows__[0].size(), this.columns.length);
        }
    }

    _buildChain(operations) {
        return operations.reduce(
            (p, n) => (x) => {
                if (typeof n(p(x)) === 'boolean') {
                    return n(p(x)) ? p(x) : false;
                }
                return p(x) ? n(p(x)) : false;
            }, (x) => x);
    }

    toDict() {
        return this.__rows__;
    }

    toArray() {
        return this.__rows__;
    }

    chain(...operations) {
        return new DataFrame([...this.__iter__(this._buildChain([...operations]))]);
    }

    select(columns = []) {
        return new DataFrame(this.__rows__.map(
            row => row.select(returnArray(columns))
        ), this.__schema__.filter(column => returnArray(columns).includes(column[0])));
    }

    filter(condition = () => true) {
        return new DataFrame([...this.__filter__(
            row => condition(row)
        )], this.__schema__);
    }

    map(modification = () => true) {
        return new DataFrame([...this.__map__((line) => modification(line))], this.__schema__);
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
