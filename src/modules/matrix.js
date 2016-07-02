import { WrongMatrixStructureError } from '../errors.js';
import { transpose, arrayEqual, iter } from '../reusables.js';

/**
* Matrix module for DataFrame, providing basics mathematical matrix computations.
 */
class Matrix {
    /**
     * Start the Matrix module.
     * @param {DataFrame} dataframe An instance of DataFrame.
     */
    constructor(dataframe) {
        this.df = dataframe;
        this.name = 'matrix';
    }

    /**
     * Check if two DataFrames are commutative, if both have the same dimensions.
     * @param {DataFrame} df The second DataFrame to check.
     * @returns {Boolean} True if they are commutative, else false.
     */
    hasSameStruct(df) {
        return arrayEqual(this.df.dim(), df.dim(), true);
    }

    /**
     * Check if two DataFrames have the same dimensions while the second is transposed. Required for dot().
     * @param {DataFrame} df The second DataFrame to check.
     * @returns {Boolean} True if they can be multiplied, else false.
     */
    hasSameTransposedStruct(df) {
        return arrayEqual(this.df.dim(), df.dim().reverse(), true);
    }

    /**
     * Provide an elements pairwise addition of two DataFrames having the same dimensions. See .hasSameStruct().
     * @param {DataFrame} df The second DataFrame to add.
     * @returns {DataFrame} A new DataFrame resulting to the addition two DataFrames.
     */
    add(df) {
        if (!this.hasSameStruct(df)) {
            throw new WrongMatrixStructureError(this.df.dim(), df.dim());
        }
        const columns = [...Array(this.df.dim()[1]).keys()];
        return this.df.__newInstance__([...iter(
            Object.keys(this.df.__rows__),
            rowKey => {
                const a = this.df.__rows__[rowKey].toArray();
                const b = df.__rows__[rowKey].toArray();
                return columns.map(column => a[column] + b[column]);
            }
        )], this.df.columns);
    }

    /**
     * Provide a scalar product between a number and a DataFrame.
     * @param {Number} number The number to multiply.
     * @returns {DataFrame} A new DataFrame resulting to the scalar product.
     */
    product(number) {
        return this.df.map(row => row.toArray().map(column => column * number));
    }

    /**
     * Multiply one DataFrame n x p and a second p x n. See .hasSameTransposedStruct().
     * @param {DataFrame} df The second DataFrame to multiply.
     * @returns {DataFrame} A new n x n DataFrame resulting to the product of two DataFrame.
     */
    dot(df) {
        if (!this.hasSameTransposedStruct(df)) {
            throw new WrongMatrixStructureError(this.df.dim(), df.dim().reverse());
        }
        const transposedDF = df.matrix.transpose();
        const columns = [...Array(this.df.dim()[0]).keys()];
        return this.df.__newInstance__([...iter(
            Object.keys(this.df.__rows__),
            rowKey => {
                const a = this.df.__rows__[rowKey].toArray();
                return [...iter(
                    columns,
                    column => {
                        const b = transposedDF.__rows__[column].toArray();
                        return Object.keys(b).reduce((p, n) => p + b[n] * a[n], 0);
                    }
                )];
            }
        )], columns);
    }

    /**
     * Transpose a DataFrame. Rows become columns and conversely. n x p => p x n.
     * @returns {ÐataFrame} A new transpoded DataFrame.
     */
    transpose() {
        const newColumns = [...Array(this.df.count()).keys()];
        return this.df.__newInstance__(transpose(transpose(Object.values(this.df.toDict()))), newColumns);
    }
}

export default Matrix;
