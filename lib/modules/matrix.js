'use strict';

exports.__esModule = true;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _dataframe = require('../dataframe');

var _dataframe2 = _interopRequireDefault(_dataframe);

var _errors = require('../errors');

var _reusables = require('../reusables');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Matrix = function () {
    function Matrix(df) {
        (0, _classCallCheck3['default'])(this, Matrix);

        this.df = df;
        this.name = 'matrix';
    }

    (0, _createClass3['default'])(Matrix, [{
        key: 'isCommutative',
        value: function isCommutative(df) {
            var reverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (!(df instanceof _dataframe2['default'])) throw new _errors.ArgumentTypeError(df, 'DataFrame');
            return (0, _reusables.arrayEqual)(this.df.dim(), reverse ? df.dim().reverse() : df.dim(), true);
        }
    }, {
        key: 'add',
        value: function add(df) {
            var _this = this;

            if (!this.isCommutative(df)) {
                throw new _errors.WrongSchemaError(this.df.dim(), df.dim());
            }
            var columns = [].concat((0, _toConsumableArray3['default'])(Array(this.df.dim()[1]).keys()));
            return this.df.__newInstance__([].concat((0, _toConsumableArray3['default'])((0, _reusables.iter)((0, _keys2['default'])([].concat((0, _toConsumableArray3['default'])(this.df))), function (rowKey) {
                var a = [].concat((0, _toConsumableArray3['default'])(_this.df))[rowKey].toArray();
                var b = [].concat((0, _toConsumableArray3['default'])(df))[rowKey].toArray();
                return columns.map(function (column) {
                    return a[column] + b[column];
                });
            }))), this.df.listColumns());
        }
    }, {
        key: 'product',
        value: function product(number) {
            if (!(typeof number === 'number')) throw new _errors.ArgumentTypeError(number, 'Number');
            return this.df.map(function (row) {
                return row.toArray().map(function (column) {
                    return column * number;
                });
            });
        }
    }, {
        key: 'dot',
        value: function dot(df) {
            var _this2 = this;

            if (!this.isCommutative(df, true)) {
                throw new _errors.WrongSchemaError(this.df.dim(), df.dim().reverse());
            }
            var columns = [].concat((0, _toConsumableArray3['default'])(Array(this.df.dim()[0]).keys()));
            return this.df.__newInstance__([].concat((0, _toConsumableArray3['default'])((0, _reusables.iter)((0, _keys2['default'])([].concat((0, _toConsumableArray3['default'])(this.df))), function (rowKey) {
                var a = [].concat((0, _toConsumableArray3['default'])(_this2.df))[rowKey].toArray();
                return [].concat((0, _toConsumableArray3['default'])((0, _reusables.iter)(columns, function (column) {
                    var b = [].concat((0, _toConsumableArray3['default'])(df.transpose()))[column].toArray();
                    return (0, _keys2['default'])(b).reduce(function (p, n) {
                        return p + b[n] * a[n];
                    }, 0);
                })));
            }))), columns);
        }
    }]);
    return Matrix;
}();

exports['default'] = Matrix;