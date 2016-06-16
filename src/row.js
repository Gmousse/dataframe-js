import { returnArray, match } from './reusables.js';
import { InputTypeError } from './errors.js';

export default class Row {
    constructor(row = [], schema = []) {
        this.__columns__ = schema;
        this._build(row);
        this.__size__ = Object.keys(this.__publics__()).length;
    }

    * [Symbol.iterator]() {
        for (const column of Object.keys(this)) {
            yield column;
        }
    }

    __publics__() {
        return Object.assign({}, ...Object.keys(this).filter(
            column => !column.includes('__')
        ).map(column => ({[column]: this[column]})));
    }

    _build(data) {
        return match(data)
                (() => true, () => {throw new InputTypeError(typeof data, ['Object', 'Array', 'Row']);})
                ((value) => (value instanceof Object || Array || Row), () => this._fromAny(data))();
    }

    _fromAny(thing) {
        return this.__columns__.forEach(column => {this[column] = thing[column];});
    }

    size() {
        return this.__size__;
    }

    toDict() {
        return this.__publics__();
    }

    toArray() {
        return Array([...this.__publics__()]);
    }

    select(columns = []) {
        return new Row(returnArray(columns).map(
            column => this.__publics__()[column]
        ), columns);
    }

    add(columnName, value = null) {
        const newColumns = this.__columns__.includes(columnName) ? this.__columns__ : [...this.__columns__, columnName];
        return new Row(newColumns.map(
            column => column === columnName ? value : this.__publics__()[column]
        ), newColumns);
    }
}
