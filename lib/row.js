'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _is = require('babel-runtime/core-js/object/is');

var _is2 = _interopRequireDefault(_is);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _reusables = require('./reusables.js');

var _errors = require('./errors.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Row = function () {
    function Row(data, columns) {
        (0, _classCallCheck3.default)(this, Row);

        this.__columns__ = columns ? columns : (0, _keys2.default)(data);
        this.__columnsWithIndex__ = (0, _entries2.default)(columns);
        this.__row__ = this._build(data);
    }

    (0, _createClass3.default)(Row, [{
        key: '_build',
        value: function _build(data) {
            var _this = this;

            return (0, _reusables.match)(data, [function (value) {
                return value instanceof Array;
            }, function () {
                return _this._fromArray(data);
            }], [function (value) {
                return value instanceof Row;
            }, function () {
                return _this._fromObject(data.__row__);
            }], [function (value) {
                return (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object' && !(0, _is2.default)(value, null);
            }, function () {
                return _this._fromObject(data);
            }], [function () {
                return true;
            }, function () {
                throw new _errors.InputTypeError(typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data), ['Object', 'Array', 'Row']);
            }]);
        }
    }, {
        key: '_fromObject',
        value: function _fromObject(object) {
            return _assign2.default.apply(Object, [{}].concat((0, _toConsumableArray3.default)(this.__columns__.map(function (column) {
                return (0, _defineProperty3.default)({}, column, object[column]);
            }))));
        }
    }, {
        key: '_fromArray',
        value: function _fromArray(array) {
            return _assign2.default.apply(Object, [{}].concat((0, _toConsumableArray3.default)(this.__columnsWithIndex__.map(function (column) {
                return (0, _defineProperty3.default)({}, column[1], array[column[0]]);
            }))));
        }
    }, {
        key: 'size',
        value: function size() {
            return this.__columns__.length;
        }
    }, {
        key: 'toDict',
        value: function toDict() {
            return this.__row__;
        }
    }, {
        key: 'toArray',
        value: function toArray() {
            return [].concat((0, _toConsumableArray3.default)((0, _values2.default)(this.__row__)));
        }
    }, {
        key: 'select',
        value: function select() {
            var _this2 = this;

            for (var _len = arguments.length, columns = Array(_len), _key = 0; _key < _len; _key++) {
                columns[_key] = arguments[_key];
            }

            return new Row(columns.map(function (column) {
                if (!_this2.__columns__.includes(column)) {
                    throw new _errors.NoSuchColumnError(column, columns);
                }
                return _this2.__row__[column];
            }), columns);
        }
    }, {
        key: 'get',
        value: function get(columnToGet) {
            return this.__row__[columnToGet];
        }
    }, {
        key: 'set',
        value: function set(columnToSet, value) {
            var newRow = (0, _assign2.default)({}, this.__row__, (0, _defineProperty3.default)({}, columnToSet, value));
            return new Row(newRow, (0, _keys2.default)(newRow));
        }
    }, {
        key: 'delete',
        value: function _delete(columnToDel) {
            if (!this.__columns__.includes(columnToDel)) {
                throw new _errors.NoSuchColumnError(columnToDel, this.__columns__);
            }
            return this.select.apply(this, (0, _toConsumableArray3.default)(this.__columns__.filter(function (column) {
                return column !== columnToDel;
            })));
        }
    }]);
    return Row;
}();

exports.default = Row;