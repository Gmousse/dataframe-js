import DataFrame from "../dataframe";
import { ArgumentTypeError, WrongSchemaError } from "../errors";
import { arrayEqual, iter } from "../reusables";

/**
 * Matrix module for DataFrame, providing basic mathematical matrix computations.
 */
class Matrix {
    /**
     * Start the Matrix module.
     * @param {DataFrame} df An instance of DataFrame.
     */
    constructor(df) {
        this.df = df;
        this.name = "matrix";
    }

    /**
     * Check if two DataFrames are commutative, if both have the same dimensions.
     * @param {DataFrame} df The second DataFrame to check.
     * @param {Boolean} [reverse = false] Revert the second DataFrame before the comparison.
     * @returns {Boolean} True if they are commutative, else false.
     * @example
     * df.matrix.isCommutative(df2)
     */
    isCommutative(df, reverse = false) {
        if (!(df instanceof DataFrame))
            throw new ArgumentTypeError(df, "DataFrame");
        return arrayEqual(
            this.df.dim(),
            reverse ? df.dim().reverse() : df.dim(),
            true
        );
    }

    /**
     * Provide an elements pairwise addition of two DataFrames having the same dimensions.
     * @param {DataFrame} df The second DataFrame to add.
     * @returns {DataFrame} A new DataFrame resulting to the addition two DataFrames.
     * @example
     * df.matrix.add(df2)
     */
    add(df) {
        if (!this.isCommutative(df)) {
            throw new WrongSchemaError(this.df.dim(), df.dim());
        }
        const columns = [...Array(this.df.dim()[1]).keys()];
        return this.df.__newInstance__(
            [
                ...iter(Object.keys([...this.df]), rowKey => {
                    const a = [...this.df][rowKey].toArray();
                    const b = [...df][rowKey].toArray();
                    return columns.map(column => a[column] + b[column]);
                })
            ],
            this.df.listColumns()
        );
    }

    /**
     * Provide a scalar product between a number and a DataFrame.
     * @param {Number} number The number to multiply.
     * @returns {DataFrame} A new DataFrame resulting to the scalar product.
     * @example
     * df.matrix.product(6)
     */
    product(number) {
        if (!(typeof number === "number"))
            throw new ArgumentTypeError(number, "Number");
        return this.df.map(row => row.toArray().map(column => column * number));
    }

    /**
     * Multiply one DataFrame n x p and a second p x n.
     * @param {DataFrame} df The second DataFrame to multiply.
     * @returns {DataFrame} A new n x n DataFrame resulting to the product of two DataFrame.
     * @example
     * df.matrix.dot(df)
     */
    dot(df) {
        if (!this.isCommutative(df, true)) {
            throw new WrongSchemaError(this.df.dim(), df.dim().reverse());
        }
        const columns = [...Array(this.df.dim()[0]).keys()];
        return this.df.__newInstance__(
            [
                ...iter(Object.keys([...this.df]), rowKey => {
                    const a = [...this.df][rowKey].toArray();
                    return [
                        ...iter(columns, column => {
                            const b = [...df.transpose()][column].toArray();
                            return Object.keys(b).reduce(
                                (p, n) => p + b[n] * a[n],
                                0
                            );
                        })
                    ];
                })
            ],
            columns
        );
    }
}

export default Matrix;
