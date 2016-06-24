import { match } from './reusables.js';
import { InputTypeError, NoSuchColumnError } from './errors.js';

export default class Row {
    constructor(data, columns) {
        this.__columns__ = columns ? columns : Object.keys(data);
        this.__columnsWithIndex__ = Object.entries(columns);
        this.__row__ = this._build(data);
    }

    _build(data) {
        return match(data,
                [(value) => (value instanceof Array), () => this._fromArray(data)],
                [(value) => (value instanceof Row), () => this._fromObject(data.__row__)],
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
        return this.__columns__.length;
    }

    toDict() {
        return this.__row__;
    }

    toArray() {
        return [...Object.values(this.__row__)];
    }

    select(...columns) {
        return new Row(columns.map(column => {
            if (!this.__columns__.includes(column)) {throw new NoSuchColumnError(column, columns);}
            return this.__row__[column];
        }), columns);
    }

    get(columnToGet) {
        return this.__row__[columnToGet];
    }

    set(columnToSet, value) {
        const newRow = Object.assign({}, this.__row__, {[columnToSet]: value});
        return new Row(newRow, Object.keys(newRow));
    }

    delete(columnToDel) {
        if (!this.__columns__.includes(columnToDel)) {
            throw new NoSuchColumnError(columnToDel, this.__columns__);
        }
        return this.select(...this.__columns__.filter(column => column !== columnToDel));
    }
}
