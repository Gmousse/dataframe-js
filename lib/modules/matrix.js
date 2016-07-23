'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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
     * @param {Array} dfDim The second DataFrame dim to check.
     * @returns {Boolean} True if they are commutative, else false.
     */


    (0, _createClass3.default)(Matrix, [{
        key: 'isCommutative',
        value: function isCommutative(dfDim) {
            return (0, _reusables.arrayEqual)(this.df.dim(), dfDim, true);
        }

        /**
         * Provide an elements pairwise addition of two DataFrames having the same dimensions.
         * @param {DataFrame} df The second DataFrame to add.
         * @returns {DataFrame} A new DataFrame resulting to the addition two DataFrames.
         */

    }, {
        key: 'add',
        value: function add(df) {
            var _this = this;

            if (!this.isCommutative(df.dim())) {
                throw new _errors.WrongMatrixStructureError(this.df.dim(), df.dim());
            }
            var columns = [].concat((0, _toConsumableArray3.default)(Array(this.df.dim()[1]).keys()));
            return this.df.__newInstance__([].concat((0, _toConsumableArray3.default)((0, _reusables.iter)((0, _keys2.default)([].concat((0, _toConsumableArray3.default)(this.df))), function (rowKey) {
                var a = [].concat((0, _toConsumableArray3.default)(_this.df))[rowKey].toArray();
                var b = [].concat((0, _toConsumableArray3.default)(df))[rowKey].toArray();
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
         * Multiply one DataFrame n x p and a second p x n.
         * @param {DataFrame} df The second DataFrame to multiply.
         * @returns {DataFrame} A new n x n DataFrame resulting to the product of two DataFrame.
         */

    }, {
        key: 'dot',
        value: function dot(df) {
            var _this2 = this;

            if (!this.isCommutative(df.dim().reverse())) {
                throw new _errors.WrongMatrixStructureError(this.df.dim(), df.dim().reverse());
            }
            var transposedDF = df.transpose();
            var columns = [].concat((0, _toConsumableArray3.default)(Array(this.df.dim()[0]).keys()));
            return this.df.__newInstance__([].concat((0, _toConsumableArray3.default)((0, _reusables.iter)((0, _keys2.default)([].concat((0, _toConsumableArray3.default)(this.df))), function (rowKey) {
                var a = [].concat((0, _toConsumableArray3.default)(_this2.df))[rowKey].toArray();
                return [].concat((0, _toConsumableArray3.default)((0, _reusables.iter)(columns, function (column) {
                    var b = [].concat((0, _toConsumableArray3.default)(transposedDF))[column].toArray();
                    return (0, _keys2.default)(b).reduce(function (p, n) {
                        return p + b[n] * a[n];
                    }, 0);
                })));
            }))), columns);
        }
    }]);
    return Matrix;
}();

exports.default = Matrix;