'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _reusables = require('../reusables');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Stat = function () {
    function Stat(df) {
        (0, _classCallCheck3['default'])(this, Stat);

        this.df = df;
        this.name = 'stat';
    }

    (0, _createClass3['default'])(Stat, [{
        key: 'sum',
        value: function sum(columnName) {
            return Number(this.df.reduce(function (p, n) {
                return (0, _reusables.isNumber)(n.get(columnName)) ? p + Number(n.get(columnName)) : p;
            }, 0));
        }
    }, {
        key: 'max',
        value: function max(columnName) {
            return Number(this.df.reduce(function (p, n) {
                return (0, _reusables.isNumber)(n.get(columnName)) && n.get(columnName) > p ? n.get(columnName) : p;
            }, 0));
        }
    }, {
        key: 'min',
        value: function min(columnName) {
            return Number(this.df.reduce(function (p, n) {
                return (0, _reusables.isNumber)(n.get(columnName)) && n.get(columnName) < p.get(columnName) ? n : p;
            }).get(columnName));
        }
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
    }, {
        key: 'average',
        value: function average(columnName) {
            return this.mean(columnName);
        }
    }, {
        key: 'var',
        value: function _var(columnName) {
            var population = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var numericDF = this.df.filter(function (row) {
                return (0, _reusables.isNumber)(row.get(columnName));
            });
            var mean = this.mean(columnName);
            return Number(numericDF.reduce(function (p, n) {
                return p + Math.pow(n.get(columnName) - mean, 2);
            }, 0)) / (numericDF.count() - (population ? 0 : 1));
        }
    }, {
        key: 'sd',
        value: function sd(columnName) {
            var population = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            return Math.sqrt(this['var'](columnName, population));
        }
    }, {
        key: 'stats',
        value: function stats(columnName) {
            return {
                sum: this.sum(columnName),
                mean: this.mean(columnName),
                min: this.min(columnName),
                max: this.max(columnName),
                'var': this['var'](columnName),
                varpop: this['var'](columnName, true),
                sd: this.sd(columnName),
                sdpop: this.sd(columnName, true)
            };
        }
    }]);
    return Stat;
}();

exports['default'] = Stat;