import { isNumber } from '../reusables.js';

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
        this.name = 'stat';
    }

    /**
    * Compute the sum of a numeric column.
    * @param {String} columnName The column to evaluate, containing Numbers.
    * @returns {Number} The sum of the column.
    */
    sum(columnName) {
        return Number(this.df.reduce(
            (p, n) => isNumber(n.get(columnName)) ? p + Number(n.get(columnName)) : p, 0
        ));
    }

    /**
     * Compute the maximal value into a numeric column.
     * @param {String} columnName The column to evaluate, containing Numbers.
     * @returns {Number} The maximal value into the column.
     */
    max(columnName) {
        return Number(this.df.reduce(
            (p, n) => isNumber(n.get(columnName)) && n.get(columnName) > p ? n.get(columnName) : p, 0
        ));
    }

    /**
     * Compute the sum of a numeric column.
     * @param {String} columnName The column to evaluate, containing Numbers.
     * @returns {Number} The sum of the column.
     */
    sum(columnName) {
        return Number(this.df.reduce(
            (p, n) => isNumber(n.get(columnName)) ? p + Number(n.get(columnName)) : p, 0
        ));
    }

    /**
     * Compute the minimal value into a numeric column.
     * @param {String} columnName The column to evalue, containing Numbers.
     * @returns {Number} The minimal value into the column.
     */
    min(columnName) {
        return Number(this.df.reduce(
            (p, n) => isNumber(n.get(columnName)) && n.get(columnName) < p.get(columnName) ? n : p
        ).get(columnName));
    }

    /**
     * Compute the mean value into a numeric column.
     * @param {String} columnName The column to evalue, containing Numbers.
     * @returns {Number} The mean value into the column.
     */
    mean(columnName) {
        const numericDF = this.df.filter(row => isNumber(row.get(columnName)));
        return Number(numericDF.reduce(
            (p, n) => isNumber(n.get(columnName)) ? p + Number(n.get(columnName)) : p, 0
        )) / numericDF.count();
    }

    /**
     * Compute the mean value into a numeric column.
     * Alias from mean.
     * @param {String} columnName The column to evalue, containing Numbers.
     * @returns {Number} The mean value into the column.
     */
    average(columnName) {
        return this.mean(columnName);
    }

    /**
     * Compute the variance into a numeric column.
     * @param {String} columnName The column to evalue, containing Numbers.
     * @param {Boolean} [population=false] Population mode. If true, provide the population variance, not the sample one.
     * @returns {Number} The variance into the column.
     */
    var(columnName, population = false) {
        const numericDF = this.df.filter(row => isNumber(row.get(columnName)));
        const mean = this.mean(columnName);
        return Number(numericDF.reduce(
            (p, n) => p + Math.pow(n.get(columnName) - mean, 2), 0
        )) / (numericDF.count() - (population ? 0 : 1));
    }

    /**
     * Compute the standard deviation into a numeric column.
     * @param {String} columnName The column to evalue, containing Numbers.
     * @param {Boolean} [population=false] Population mode. If true, provide the population standard deviation, not the sample one.
     * @returns {Number} The standard deviation into the column.
     */
    sd(columnName, population = false) {
        return Math.sqrt(this.var(columnName, population));
    }

    /**
     * Compute all the stats available with the Stat module on a numeric column.
     * @param {String} columnName The column to evalue, containing Numbers.
     * @returns {Object} An dictionnary containing all statistical metrics available.
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
            sdpop: this.sd(columnName, true),
        };
    }
}

export default Stat;
