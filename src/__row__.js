import { match, isArrayOfType } from './reusables.js';
import { InputTypeError, SchemaError, NoSuchColumnError } from './errors.js';

const Any = {};

export default class Row {
    constructor(row, schema) {
        this.__schema__ = schema;
        this.__size__ = this.__schema__.length;
        this._build(row);
    }

    * [Symbol.iterator]() {
        for (const column of Object.values(this.__publics__())) {
            yield column;
        }
    }

    __publics__() {
        return Object.assign({}, ...Object.keys(this).filter(
            column => !column.includes('__')
        ).map(column => ({[column]: this[column]})));
    }

    _build(data) {
        return match(data,
                [(value) => (value instanceof Array), () => this._fromArray(data)],
                [(value) => (value instanceof Row), () => this._fromObject(data)],
                [(value) => (typeof value === 'object' && !Object.is(value, null)), () => this._fromObject(data)],
                [() => true, () => {throw new InputTypeError(typeof data, ['Object', 'Array', 'Row']);}]
            );
    }

    _fromObject(object) {
        return this.__schema__.forEach(column => {this[column] = object[column];});
    }

    _fromArray(array) {
        return Object.entries(this.__schema__).forEach(column => {this[column[1]] = array[column[0]];});
    }

    size() {
        return this.__size__;
    }

    toDict() {
        return this.__publics__();
    }

    toArray() {
        return [...this];
    }

    select(...columns) {
        return new Row(
            columns.map(column => {
                if (!this.__columns__.includes(column)) {throw new NoSuchColumnError(column, columns);}
                return this.__publics__()[column];
            }),
            columns.map(column => this.__schema__.find(colSchema => colSchema[0] === column)).filter(colSchema => colSchema)
        );
    }

    set(columnToSet, value, type = Any) {
        const newSchema = this.__schema__.includes(columnToSet) ?
            this.__schema__ : [...this.__schema__, columnToSet];
        return new Row(newSchema.map(
            column => column[0] === columnToSet ? value : this.__publics__()[column[0]]
        ), newSchema);
    }

    delete(columnToDel) {
        if (!this.__columns__.includes(columnToDel)) {
            throw new NoSuchColumnError(columnToDel, this.__columns__);
        }
        return this.select(...this.__columns__.filter(column => column !== columnToDel));
    }
}
