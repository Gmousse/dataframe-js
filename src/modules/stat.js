import { isNumber } from "../reusables";

/**
 * Stat module for DataFrame, providing basic statistical metrics for numeric columns.
 */
class Stat {
    /**
     * Start the Stat module.
     * @param {DataFrame} df An instance of DataFrame.
     */
    constructor(df) {
        this.df = df;
        this.name = "stat";
    }

    _castAsNumber(columnName) {
        return this.df
            .withColumn(columnName, row => Number(row.get(columnName)))
            .filter(row => !Number.isNaN(row.get(columnName)));
    }

    /**
     * Compute the sum of a numeric column.
     * @param {String} columnName The column to evaluate, containing Numbers.
     * @returns {Number} The sum of the column.
     * @example
     * df.stat.sum('column1')
     */
    sum(columnName) {
        return Number(
            this.df.reduce(
                (p, n) =>
                    isNumber(n.get(columnName))
                        ? p + Number(n.get(columnName))
                        : p,
                0
            )
        );
    }

    /**
     * Compute the maximal value into a numeric column.
     * @param {String} columnName The column to evaluate, containing Numbers.
     * @returns {Number} The maximal value into the column.
     * @example
     * df.stat.max('column1')
     */
    max(columnName) {
        return this._castAsNumber(columnName)
            .reduce((p, n) => (n.get(columnName) > p.get(columnName) ? n : p))
            .get(columnName);
    }

    /**
     * Compute the minimal value into a numeric column.
     * @param {String} columnName The column to evaluate, containing Numbers.
     * @returns {Number} The minimal value into the column.
     * @example
     * df.stat.min('column1')
     */
    min(columnName) {
        return this._castAsNumber(columnName)
            .reduce((p, n) => (p.get(columnName) > n.get(columnName) ? n : p))
            .get(columnName);
    }

    /**
     * Compute the mean value into a numeric column.
     * @param {String} columnName The column to evaluate,isNumber(n.get(columnName)) ? p + Number( containing Numbers.
     * @returns {Number} The mean value into the column.
     * @example
     * df.stat.mean('column1')
     */
    mean(columnName) {
        const numericDF = this.df.filter(row => isNumber(row.get(columnName)));
        return (
            Number(
                numericDF.reduce(
                    (p, n) =>
                        isNumber(n.get(columnName))
                            ? p + Number(n.get(columnName))
                            : p,
                    0
                )
            ) / numericDF.count()
        );
    }

    /**
     * Compute the mean value into a numeric column.
     * Alias from mean.
     * @param {String} columnName The column to evaluate, containing Numbers.
     * @returns {Number} The mean value into the column.
     * @example
     * df.stat.min('column1')
     */
    average(columnName) {
        return this.mean(columnName);
    }

    /**
     * Compute the variance into a numeric column.
     * @param {String} columnName The column to evaluate, containing Numbers.
     * @param {Boolean} [population=false] Population mode. If true, provide the population variance, not the sample one.
     * @returns {Number} The variance into the column.
     * @example
     * df.stat.var('column1')
     */
    var(columnName, population = false) {
        const numericDF = this.df.filter(row => isNumber(row.get(columnName)));
        const mean = this.mean(columnName);
        return (
            Number(
                numericDF.reduce(
                    (p, n) => p + Math.pow(n.get(columnName) - mean, 2),
                    0
                )
            ) /
            (numericDF.count() - (population ? 0 : 1))
        );
    }

    /**
     * Compute the standard deviation into a numeric column.
     * @param {String} columnName The column to evaluate, containing Numbers.
     * @param {Boolean} [population=false] Population mode. If true, provide the population standard deviation, not the sample one.
     * @returns {Number} The standard deviation into the column.
     * @example
     * df.stat.sd('column1')
     */
    sd(columnName, population = false) {
        return Math.sqrt(this.var(columnName, population));
    }

    /**
     * Compute all the stats available with the Stat module on a numeric column.
     * @param {String} columnName The column to evaluate, containing Numbers.
     * @returns {Object} An dictionnary containing all statistical metrics available.
     * @example
     * df.stat.stats('column1')
     */
    stats(columnName) {
        return {
            sum: this.sum(columnName),
            mean: this.mean(columnName),
            min: this.min(columnName),
            max: this.max(columnName),
            var: this.var(columnName),
            varpop: this.var(columnName, true),
            sd: this.sd(columnName),
            sdpop: this.sd(columnName, true)
        };
    }
}

export default Stat;
