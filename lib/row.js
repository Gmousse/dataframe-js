'use strict';

exports.__esModule = true;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _iterator2 = require('babel-runtime/core-js/symbol/iterator');

var _iterator3 = _interopRequireDefault(_iterator2);

var _freeze = require('babel-runtime/core-js/object/freeze');

var _freeze2 = _interopRequireDefault(_freeze);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _reusables = require('./reusables');

var _errors = require('./errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __columns__ = (0, _symbol2['default'])('columns');
var __values__ = (0, _symbol2['default'])('values');

var Row = function () {
    function Row(data, columns) {
        (0, _classCallCheck3['default'])(this, Row);

        if (!data) throw new _errors.ArgumentTypeError(data, 'Row | Array | Object');
        this[__columns__] = columns ? columns : (0, _keys2['default'])(data);
        this[__values__] = (0, _freeze2['default'])(this._build(data));
    }

    (0, _createClass3['default'])(Row, [{
        key: _iterator3['default'],
        value: _regenerator2['default'].mark(function value() {
            var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, value;

            return _regenerator2['default'].wrap(function value$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context.prev = 3;
                            _iterator = (0, _getIterator3['default'])((0, _values2['default'])(this[__values__]));

                        case 5:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _context.next = 12;
                                break;
                            }

                            value = _step.value;
                            _context.next = 9;
                            return value;

                        case 9:
                            _iteratorNormalCompletion = true;
                            _context.next = 5;
                            break;

                        case 12:
                            _context.next = 18;
                            break;

                        case 14:
                            _context.prev = 14;
                            _context.t0 = _context['catch'](3);
                            _didIteratorError = true;
                            _iteratorError = _context.t0;

                        case 18:
                            _context.prev = 18;
                            _context.prev = 19;

                            if (!_iteratorNormalCompletion && _iterator['return']) {
                                _iterator['return']();
                            }

                        case 21:
                            _context.prev = 21;

                            if (!_didIteratorError) {
                                _context.next = 24;
                                break;
                            }

                            throw _iteratorError;

                        case 24:
                            return _context.finish(21);

                        case 25:
                            return _context.finish(18);

                        case 26:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, value, this, [[3, 14, 18, 26], [19,, 21, 25]]);
        })
    }, {
        key: '__newInstance__',
        value: function __newInstance__(data, columns) {
            var _Object$assign2;

            if (!(0, _reusables.arrayEqual)(this[__columns__], columns)) {
                return new Row(data, columns);
            }
            return (0, _assign2['default'])((0, _create2['default'])((0, _getPrototypeOf2['default'])(this)), this, (_Object$assign2 = {}, (0, _defineProperty3['default'])(_Object$assign2, __values__, data), (0, _defineProperty3['default'])(_Object$assign2, __columns__, [].concat((0, _toConsumableArray3['default'])(columns))), _Object$assign2));
        }
    }, {
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
                return _this._fromObject(data[__values__]);
            }], [function (value) {
                return value instanceof Object && value !== null;
            }, function () {
                return _this._fromObject(data);
            }], [function () {
                return true;
            }, function (value) {
                throw new _errors.ArgumentTypeError(value, 'Row | Array | Object');
            }]);
        }
    }, {
        key: '_fromObject',
        value: function _fromObject(object) {
            return _assign2['default'].apply(Object, [{}].concat((0, _toConsumableArray3['default'])(this[__columns__].map(function (column) {
                return (0, _defineProperty3['default'])({}, column, object[column]);
            }))));
        }
    }, {
        key: '_fromArray',
        value: function _fromArray(array) {
            return _assign2['default'].apply(Object, [{}].concat((0, _toConsumableArray3['default'])((0, _entries2['default'])(this[__columns__]).map(function (column) {
                return (0, _defineProperty3['default'])({}, column[1], array[column[0]]);
            }))));
        }
    }, {
        key: 'toDict',
        value: function toDict() {
            return (0, _assign2['default'])({}, this[__values__]);
        }
    }, {
        key: 'toArray',
        value: function toArray() {
            return [].concat((0, _toConsumableArray3['default'])(this));
        }
    }, {
        key: 'size',
        value: function size() {
            return this[__columns__].length;
        }
    }, {
        key: 'hash',
        value: function hash() {
            return (0, _reusables.hashCode)((0, _stringify2['default'])(this[__values__]));
        }
    }, {
        key: 'has',
        value: function has(columnName) {
            return this[__columns__].includes(columnName);
        }
    }, {
        key: 'select',
        value: function select() {
            var _this2 = this;

            for (var _len = arguments.length, columnNames = Array(_len), _key = 0; _key < _len; _key++) {
                columnNames[_key] = arguments[_key];
            }

            return this.__newInstance__(_assign2['default'].apply(Object, [{}].concat((0, _toConsumableArray3['default'])(columnNames.map(function (column) {
                return (0, _defineProperty3['default'])({}, column, _this2.get(column));
            })))), columnNames);
        }
    }, {
        key: 'get',
        value: function get(columnToGet) {
            if (!this.has(columnToGet)) {
                throw new _errors.NoSuchColumnError(columnToGet, this[__columns__]);
            }
            return this[__values__][columnToGet];
        }
    }, {
        key: 'set',
        value: function set(columnToSet, value) {
            var newRow = (0, _assign2['default'])({}, this[__values__], (0, _defineProperty3['default'])({}, columnToSet, value));
            return this.__newInstance__(newRow, (0, _keys2['default'])(newRow));
        }
    }, {
        key: 'delete',
        value: function _delete(columnToDel) {
            if (!this.has(columnToDel)) {
                throw new _errors.NoSuchColumnError(columnToDel, this[__columns__]);
            }
            return this.select.apply(this, (0, _toConsumableArray3['default'])(this[__columns__].filter(function (column) {
                return column !== columnToDel;
            })));
        }
    }]);
    return Row;
}();

exports['default'] = Row;