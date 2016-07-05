'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _errors = require('../errors.js');

var _reusables = require('../reusables.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Matrix module for DataFrame, providing basic mathematical matrix computations.
 */

var Matrix = function () {
    /**
     * Start the Matrix module.
     * @param {DataFrame} df An instance of DataFrame.
     */

    function Matrix(df) {
        (0, _classCallCheck3.default)(this, Matrix);

        this.df = df;
        this.name = 'matrix';
    }

    /**
     * Check if two DataFrames are commutative, if both have the same dimensions.
     * @param {DataFrame} df The second DataFrame to check.
     * @returns {Boolean} True if they are commutative, else false.
     */


    (0, _createClass3.default)(Matrix, [{
        key: 'hasSameStruct',
        value: function hasSameStruct(df) {
            return (0, _reusables.arrayEqual)(this.df.dim(), df.dim(), true);
        }

        /**
         * Check if two DataFrames have the same dimensions while the second is transposed. Required for dot().
         * @param {DataFrame} df The second DataFrame to check.
         * @returns {Boolean} True if they can be multiplied, else false.
         */

    }, {
        key: 'hasSameTransposedStruct',
        value: function hasSameTransposedStruct(df) {
            return (0, _reusables.arrayEqual)(this.df.dim(), df.dim().reverse(), true);
        }

        /**
         * Provide an elements pairwise addition of two DataFrames having the same dimensions. See .hasSameStruct().
         * @param {DataFrame} df The second DataFrame to add.
         * @returns {DataFrame} A new DataFrame resulting to the addition two DataFrames.
         */

    }, {
        key: 'add',
        value: function add(df) {
            var _this = this;

            if (!this.hasSameStruct(df)) {
                throw new _errors.WrongMatrixStructureError(this.df.dim(), df.dim());
            }
            var columns = [].concat((0, _toConsumableArray3.default)(Array(this.df.dim()[1]).keys()));
            return this.df.__newInstance__([].concat((0, _toConsumableArray3.default)((0, _reusables.iter)((0, _keys2.default)(this.df.__rows__), function (rowKey) {
                var a = _this.df.__rows__[rowKey].toArray();
                var b = df.__rows__[rowKey].toArray();
                return columns.map(function (column) {
                    return a[column] + b[column];
                });
            }))), this.df.listColumns());
        }

        /**
         * Provide a scalar product between a number and a DataFrame.
         * @param {Number} number The number to multiply.
         * @returns {DataFrame} A new DataFrame resulting to the scalar product.
         */

    }, {
        key: 'product',
        value: function product(number) {
            return this.df.map(function (row) {
                return row.toArray().map(function (column) {
                    return column * number;
                });
            });
        }

        /**
         * Multiply one DataFrame n x p and a second p x n. See .hasSameTransposedStruct().
         * @param {DataFrame} df The second DataFrame to multiply.
         * @returns {DataFrame} A new n x n DataFrame resulting to the product of two DataFrame.
         */

    }, {
        key: 'dot',
        value: function dot(df) {
            var _this2 = this;

            if (!this.hasSameTransposedStruct(df)) {
                throw new _errors.WrongMatrixStructureError(this.df.dim(), df.dim().reverse());
            }
            var transposedDF = df.matrix.transpose();
            var columns = [].concat((0, _toConsumableArray3.default)(Array(this.df.dim()[0]).keys()));
            return this.df.__newInstance__([].concat((0, _toConsumableArray3.default)((0, _reusables.iter)((0, _keys2.default)(this.df.__rows__), function (rowKey) {
                var a = _this2.df.__rows__[rowKey].toArray();
                return [].concat((0, _toConsumableArray3.default)((0, _reusables.iter)(columns, function (column) {
                    var b = transposedDF.__rows__[column].toArray();
                    return (0, _keys2.default)(b).reduce(function (p, n) {
                        return p + b[n] * a[n];
                    }, 0);
                })));
            }))), columns);
        }

        /**
         * Transpose a DataFrame. Rows become columns and conversely. n x p => p x n.
         * @returns {ÐataFrame} A new transpoded DataFrame.
         */

    }, {
        key: 'transpose',
        value: function transpose() {
            var newColumns = [].concat((0, _toConsumableArray3.default)(Array(this.df.count()).keys()));
            return this.df.__newInstance__((0, _reusables.transpose)((0, _reusables.transpose)((0, _values2.default)(this.df.toDict()))), newColumns);
        }
    }]);
    return Matrix;
}();

exports.default = Matrix;