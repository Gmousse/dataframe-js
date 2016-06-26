'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _reusables = require('./reusables.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MathModule = function () {
    function MathModule(dataframe) {
        (0, _classCallCheck3.default)(this, MathModule);

        this.df = dataframe;
        this.name = 'math';
    }

    (0, _createClass3.default)(MathModule, [{
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
                return p + n.get(columnName);
            }, 0)) / numericDF.count();
        }
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
    }, {
        key: 'sd',
        value: function sd(columnName) {
            var population = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            return Math.sqrt(this.var(columnName, population));
        }
    }, {
        key: 'stats',
        value: function stats(columnName) {
            return {
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
    return MathModule;
}();

exports.default = MathModule;