import { isNumber } from '../reusables.js';

export default class Stat {

    constructor(dataframe) {
        this.df = dataframe;
        this.name = 'stat';
    }

    max(columnName) {
        return Number(this.df.reduce(
            (p, n) => isNumber(n.get(columnName)) && n.get(columnName) > p ? n.get(columnName) : p, 0
        ));
    }

    min(columnName) {
        return Number(this.df.reduce(
            (p, n) => isNumber(n.get(columnName)) && n.get(columnName) < p.get(columnName) ? n : p
        ).get(columnName));
    }

    mean(columnName) {
        const numericDF = this.df.filter(row => isNumber(row.get(columnName)));
        return Number(numericDF.reduce(
            (p, n) => p + n.get(columnName), 0
        )) / numericDF.count();
    }

    var(columnName, population = false) {
        const numericDF = this.df.filter(row => isNumber(row.get(columnName)));
        const mean = this.mean(columnName);
        return Number(numericDF.reduce(
            (p, n) => p + Math.pow(n.get(columnName) - mean, 2), 0
        )) / (numericDF.count() - (population ? 0 : 1));
    }

    sd(columnName, population = false) {
        return Math.sqrt(this.var(columnName, population));
    }

    stats(columnName) {
        return {
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
