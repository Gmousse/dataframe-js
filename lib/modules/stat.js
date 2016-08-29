'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _reusables = require('../reusables.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Stat module for DataFrame, providing basic statistical metrics for numeric columns.
 */
var Stat = function () {
    /**
     * Start the Stat module.
     * @param {DataFrame} df An instance of DataFrame.
     */
    function Stat(df) {
        (0, _classCallCheck3.default)(this, Stat);

        this.df = df;
        this.name = 'stat';
    }

    /**
    * Compute the sum of a numeric column.
    * @param {String} columnName The column to evaluate, containing Numbers.
    * @returns {Number} The sum of the column.
    */


    (0, _createClass3.default)(Stat, [{
        key: 'sum',
        value: function sum(columnName) {
            return Number(this.df.reduce(function (p, n) {
                return (0, _reusables.isNumber)(n.get(columnName)) ? p + Number(n.get(columnName)) : p;
            }, 0));
        }

        /**
         * Compute the maximal value into a numeric column.
         * @param {String} columnName The column to evaluate, containing Numbers.
         * @returns {Number} The maximal value into the column.
         */

    }, {
        key: 'max',
        value: function max(columnName) {
            return Number(this.df.reduce(function (p, n) {
                return (0, _reusables.isNumber)(n.get(columnName)) && n.get(columnName) > p ? n.get(columnName) : p;
            }, 0));
        }

        /**
         * Compute the sum of a numeric column.
         * @param {String} columnName The column to evaluate, containing Numbers.
         * @returns {Number} The sum of the column.
         */

    }, {
        key: 'sum',
        value: function sum(columnName) {
            return Number(this.df.reduce(function (p, n) {
                return (0, _reusables.isNumber)(n.get(columnName)) ? p + Number(n.get(columnName)) : p;
            }, 0));
        }

        /**
         * Compute the minimal value into a numeric column.
         * @param {String} columnName The column to evalue, containing Numbers.
         * @returns {Number} The minimal value into the column.
         */

    }, {
        key: 'min',
        value: function min(columnName) {
            return Number(this.df.reduce(function (p, n) {
                return (0, _reusables.isNumber)(n.get(columnName)) && n.get(columnName) < p.get(columnName) ? n : p;
            }).get(columnName));
        }

        /**
         * Compute the mean value into a numeric column.
         * @param {String} columnName The column to evalue, containing Numbers.
         * @returns {Number} The mean value into the column.
         */

    }, {
        key: 'mean',
        value: function mean(columnName) {
            var numericDF = this.df.filter(function (row) {
                return (0, _reusables.isNumber)(row.get(columnName));
            });
            return Number(numericDF.reduce(function (p, n) {
                return (0, _reusables.isNumber)(n.get(columnName)) ? p + Number(n.get(columnName)) : p;
            }, 0)) / numericDF.count();
        }

        /**
         * Compute the mean value into a numeric column.
         * Alias from mean.
         * @param {String} columnName The column to evalue, containing Numbers.
         * @returns {Number} The mean value into the column.
         */

    }, {
        key: 'average',
        value: function average(columnName) {
            return this.mean(columnName);
        }

        /**
         * Compute the variance into a numeric column.
         * @param {String} columnName The column to evalue, containing Numbers.
         * @param {Boolean} [population=false] Population mode. If true, provide the population variance, not the sample one.
         * @returns {Number} The variance into the column.
         */

    }, {
        key: 'var',
        value: function _var(columnName) {
            var population = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            var numericDF = this.df.filter(function (row) {
                return (0, _reusables.isNumber)(row.get(columnName));
            });
            var mean = this.mean(columnName);
            return Number(numericDF.reduce(function (p, n) {
                return p + Math.pow(n.get(columnName) - mean, 2);
            }, 0)) / (numericDF.count() - (population ? 0 : 1));
        }

        /**
         * Compute the standard deviation into a numeric column.
         * @param {String} columnName The column to evalue, containing Numbers.
         * @param {Boolean} [population=false] Population mode. If true, provide the population standard deviation, not the sample one.
         * @returns {Number} The standard deviation into the column.
         */

    }, {
        key: 'sd',
        value: function sd(columnName) {
            var population = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            return Math.sqrt(this.var(columnName, population));
        }

        /**
         * Compute all the stats available with the Stat module on a numeric column.
         * @param {String} columnName The column to evalue, containing Numbers.
         * @returns {Object} An dictionnary containing all statistical metrics available.
         */

    }, {
        key: 'stats',
        value: function stats(columnName) {
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
    }]);
    return Stat;
}();

exports.default = Stat;