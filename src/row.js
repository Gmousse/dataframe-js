import { arrayEqual } from "./reusables";
import { ArgumentTypeError, NoSuchColumnError } from "./errors";
import { hashCode } from "./reusables";

const __columns__ = Symbol("columns");
const __values__ = Symbol("values");

/**
 * Row data structure used into the dataframe-js.
 */
class Row {
    /**
     * Create a new Row.
     * @param {Array | Object | Row} data The data of the Row.
     * @param {Array} columns The DataFrame column names.
     * @example
     * new Row({
     *      'column1': 3,
     *      'column2': 6,
     * })
     *
     * new Row([3, 6], ['column1', 'column2'])
     *
     * new Row(Row, ['column1', 'column3'])
     */
    constructor(data, columns) {
        if (!data) throw new ArgumentTypeError(data, "Row | Array | Object");
        this[__columns__] = columns ? columns : Object.keys(data);
        this[__values__] = Object.freeze(this._build(data));
    }

    *[Symbol.iterator]() {
        for (const value of Object.values(this[__values__])) {
            yield value;
        }
    }

    __newInstance__(data, columns) {
        if (!arrayEqual(this[__columns__], columns)) {
            return new Row(data, columns);
        }
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this, {
            [__values__]: data,
            [__columns__]: [...columns]
        });
    }

    _build(data) {
        if (data instanceof Array) return this._fromArray(data);
        if (data instanceof Row) return this._fromObject(data[__values__]);
        if (data instanceof Object && data !== null)
            return this._fromObject(data);
        throw new ArgumentTypeError(data, "Row | Array | Object");
    }

    _fromObject(object) {
        return Object.assign(
            {},
            ...this[__columns__].map(column => ({ [column]: object[column] }))
        );
    }

    _fromArray(array) {
        return Object.assign(
            {},
            ...Object.entries(this[__columns__]).map(column => ({
                [column[1]]: array[column[0]]
            }))
        );
    }

    /**
     * Convert Row into dict / hash / object.
     * @returns {Object} The Row converted into dict.
     * @example
     * row.toDict()
     */
    toDict() {
        return Object.assign({}, this[__values__]);
    }

    /**
     * Convert Row into Array, loosing column names.
     * @returns {Array} The Row values converted into Array.
     * @example
     * row.toArray()
     */
    toArray() {
        return [...this];
    }

    /**
     * Get the Row size.
     * @returns {Int} The Row length.
     * @example
     * row.size()
     */
    size() {
        return this[__columns__].length;
    }

    /**
     * Get the Row hash code.
     * @returns {Int} The Row hash unique code.
     * @example
     * row.hash()
     */
    hash() {
        return hashCode(JSON.stringify(this[__values__]));
    }

    /**
     * Check if row contains a column.
     * @param {String} columnName The column to check.
     * @returns {Boolean} The presence or not of the column.
     * @example
     * row.has('column1')
     */
    has(columnName) {
        return this[__columns__].includes(columnName);
    }

    /**
     * Select columns into the Row.
     * @param {...String} columnNames The columns to select.
     * @returns {Row} A new Row containing only the selected columns.
     * @example
     * row.select('column1', 'column2')
     */
    select(...columnNames) {
        return this.__newInstance__(
            Object.assign(
                {},
                ...columnNames.map(column => {
                    return { [column]: this.get(column) };
                })
            ),
            columnNames
        );
    }

    /**
     * Get a Row value by its column.
     * @param {String} columnToGet The column value to get.
     * @returns The selected value.
     * @example
     * row.get('column1')
     */
    get(columnToGet) {
        if (!this.has(columnToGet)) {
            throw new NoSuchColumnError(columnToGet, this[__columns__]);
        }
        return this[__values__][columnToGet];
    }

    /**
     * Set a Row value by its column, or create a new value if column doesn't exist.
     * @param {String} columnToSet The column value to set.
     * @returns {Row} A new Row with the modified / new value.
     * @example
     * row.set('column1', 6)
     */
    set(columnToSet, value) {
        const newRow = Object.assign({}, this[__values__], {
            [columnToSet]: value
        });
        return this.__newInstance__(newRow, Object.keys(newRow));
    }

    /**
     * Delete a Row value by its column.
     * @param {String} columnToDel The column value to delete.
     * @returns {Row} A new Row without the deleted value.
     * @example
     * row.delete('column1')
     */
    delete(columnToDel) {
        if (!this.has(columnToDel)) {
            throw new NoSuchColumnError(columnToDel, this[__columns__]);
        }
        return this.select(
            ...this[__columns__].filter(column => column !== columnToDel)
        );
    }
}

export default Row;
