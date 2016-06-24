import { match, isArrayOfType } from './reusables.js';
import { InputTypeError, SchemaError, NoSuchColumnError } from './errors.js';

export default class Row {
    constructor(data, columns) {
        this.__columns__ = columns;
        this.__columnsWithIndex__ = Object.entries(columns);
        this.__size__ = this.__columns__.length;
        this.__row__ = this._build(data);
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
        return Object.assign({}, ...this.__columns__.map(column => ({[column]: object[column]})));
    }

    _fromArray(array) {
        return Object.assign({}, ...this.__columnsWithIndex__.map(column => ({[column[1]]: array[column[0]]})));
    }

    size() {
        return this.__size__;
    }

    toDict() {
        return this.__row__;
    }

    toArray() {
        return [...Object.values(this.__row__)];
    }

    select(...columns) {
        this.__row__ = columns.map(column => {
            if (!this.__columns__.includes(column)) {throw new NoSuchColumnError(column, columns);}
            return this.__row__[column];
        });
        this.__columns__ = columns.map(column => this.__columns__.find(col => col === column)).filter(col => col);
        return this;
    }

    get(columnToGet) {
        return this.__row__[this.__columnsWithIndex__.find(column => column[1] === columnToGet)[0]];
    }

    set(columnToSet, value) {
        this.__row__[columnToSet] = value;
        return this;
    }

    delete(columnToDel) {
        if (!this.__columns__.includes(columnToDel)) {
            throw new NoSuchColumnError(columnToDel, this.__columns__);
        }
        return this.select(...this.__columns__.filter(column => column !== columnToDel));
    }
}
