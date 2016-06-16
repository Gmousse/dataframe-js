'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DataFrame = exports.Row = undefined;

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _iterator3 = require('babel-runtime/core-js/symbol/iterator');

var _iterator4 = _interopRequireDefault(_iterator3);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function returnArray(thing) {
    return Array.isArray(thing) ? thing : [thing];
}

function match(value) {
    var checker = function checker(condition, makeInSuccess, memory) {
        if (condition) {
            var _ret = function () {
                var nextMemory = condition(value) ? makeInSuccess : memory;
                return {
                    v: function v(t, m) {
                        return checker(t, m, nextMemory);
                    }
                };
            }();

            if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
        }
        return memory();
    };
    return checker;
}

function transpose(table) {
    var tableSize = table.map(function (row) {
        return row.length;
    }).reduce(function (p, n) {
        return Math.max(p, n);
    }, 0);
    return [].concat((0, _toConsumableArray3.default)(Array(tableSize).keys())).map(function (index) {
        return table.map(function (row) {
            return row[index];
        });
    });
}

var Row = exports.Row = function () {
    function Row() {
        var row = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
        var schema = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
        (0, _classCallCheck3.default)(this, Row);

        this.__columns__ = schema.length > 0 ? schema : (0, _keys2.default)(row);
        this._build(row);
        this.__size__ = (0, _keys2.default)(this.__publics__()).length;
    }

    (0, _createClass3.default)(Row, [{
        key: _iterator4.default,
        value: _regenerator2.default.mark(function value() {
            var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, column;

            return _regenerator2.default.wrap(function value$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context.prev = 3;
                            _iterator = (0, _getIterator3.default)((0, _keys2.default)(this));

                        case 5:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _context.next = 12;
                                break;
                            }

                            column = _step.value;
                            _context.next = 9;
                            return column;

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

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
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
        key: '__publics__',
        value: function __publics__() {
            var _this = this;

            return _assign2.default.apply(Object, [{}].concat((0, _toConsumableArray3.default)((0, _keys2.default)(this).filter(function (column) {
                return !column.includes('__');
            }).map(function (column) {
                return (0, _defineProperty3.default)({}, column, _this[column]);
            }))));
        }
    }, {
        key: '_build',
        value: function _build(data) {
            var _this2 = this;

            return match(data)(function (value) {
                return value instanceof Object;
            }, function () {
                return _this2._fromDict(data);
            })(function (value) {
                return value instanceof Array;
            }, function () {
                return _this2._fromArray(data);
            })(function (value) {
                return value instanceof Row;
            }, function () {
                return _this2._fromDict(data.toDict());
            })();
        }
    }, {
        key: '_fromDict',
        value: function _fromDict(dict) {
            var _this3 = this;

            return (0, _entries2.default)(dict).forEach(function (column) {
                _this3[column[0]] = column[1];
            });
        }
    }, {
        key: '_fromArray',
        value: function _fromArray(array) {
            var _this4 = this;

            return array.forEach(function (elem, index) {
                _this4[_this4.__columns__[index]] = elem;
            });
        }
    }, {
        key: 'size',
        value: function size() {
            return this.__size__;
        }
    }, {
        key: 'toDict',
        value: function toDict() {
            return this.__publics__();
        }
    }, {
        key: 'toArray',
        value: function toArray() {
            return Array([].concat((0, _toConsumableArray3.default)(this.__publics__())));
        }
    }, {
        key: 'select',
        value: function select() {
            var _this5 = this;

            var columns = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

            return new Row(returnArray(columns).map(function (column) {
                return _this5.__publics__()[column];
            }), columns);
        }
    }, {
        key: 'add',
        value: function add(columnName) {
            var _this6 = this;

            var value = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            var newColumns = this.__columns__.includes(columnName) ? this.__columns__ : [].concat((0, _toConsumableArray3.default)(this.__columns__), [columnName]);
            return new Row(newColumns.map(function (column) {
                return column === columnName ? value : _this6.__publics__()[column];
            }), newColumns);
        }
    }]);
    return Row;
}();

var DataFrame = exports.DataFrame = function () {
    function DataFrame() {
        var data = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
        var schema = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
        (0, _classCallCheck3.default)(this, DataFrame);

        this.__columns__ = schema.length > 0 ? schema : (0, _keys2.default)(data);
        this.__rows__ = this._build(data);
        this._checkSchema();
    }

    (0, _createClass3.default)(DataFrame, [{
        key: _iterator4.default,
        value: _regenerator2.default.mark(function value() {
            var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, row;

            return _regenerator2.default.wrap(function value$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _iteratorNormalCompletion2 = true;
                            _didIteratorError2 = false;
                            _iteratorError2 = undefined;
                            _context2.prev = 3;
                            _iterator2 = (0, _getIterator3.default)(this.__rows__);

                        case 5:
                            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                                _context2.next = 12;
                                break;
                            }

                            row = _step2.value;
                            _context2.next = 9;
                            return row;

                        case 9:
                            _iteratorNormalCompletion2 = true;
                            _context2.next = 5;
                            break;

                        case 12:
                            _context2.next = 18;
                            break;

                        case 14:
                            _context2.prev = 14;
                            _context2.t0 = _context2['catch'](3);
                            _didIteratorError2 = true;
                            _iteratorError2 = _context2.t0;

                        case 18:
                            _context2.prev = 18;
                            _context2.prev = 19;

                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }

                        case 21:
                            _context2.prev = 21;

                            if (!_didIteratorError2) {
                                _context2.next = 24;
                                break;
                            }

                            throw _iteratorError2;

                        case 24:
                            return _context2.finish(21);

                        case 25:
                            return _context2.finish(18);

                        case 26:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, value, this, [[3, 14, 18, 26], [19,, 21, 25]]);
        })
    }, {
        key: '_build',
        value: function _build(data) {
            var _this7 = this;

            return match(data)(function (value) {
                return value instanceof Object;
            }, function () {
                return _this7._fromDict(data);
            })(function (value) {
                return value instanceof Array;
            }, function () {
                return _this7._fromArray(data);
            })(function (value) {
                return value instanceof DataFrame;
            }, function () {
                return data.__rows__;
            })();
        }
    }, {
        key: '_fromDict',
        value: function _fromDict(dict) {
            var _this8 = this;

            return transpose((0, _values2.default)(dict)).map(function (row) {
                return new Row(row, _this8.__columns__);
            });
        }
    }, {
        key: '_fromArray',
        value: function _fromArray(array) {
            var _this9 = this;

            return array.map(function (row) {
                return new Row(row, _this9.__columns__);
            });
        }
    }, {
        key: '_checkSchema',
        value: function _checkSchema() {
            if (this.__rows__[0].size() !== this.__columns__.length) {
                throw new Error('Wrong schema: ' + this.__rows__[0].size() + ' columns found while\n                having ' + this.__columns__.length + ' in schema');
            }
        }
    }, {
        key: 'select',
        value: function select() {
            var columns = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

            return new DataFrame(this.__rows__.map(function (row) {
                return row.select(returnArray(columns));
            }), returnArray(columns));
        }
    }, {
        key: 'filter',
        value: function filter() {
            var condition = arguments.length <= 0 || arguments[0] === undefined ? function () {
                return true;
            } : arguments[0];

            return new DataFrame(this.__rows__.filter(function (row) {
                return condition(row);
            }), this.__columns__);
        }
    }, {
        key: 'withColumn',
        value: function withColumn(columnName) {
            var columnFunc = arguments.length <= 1 || arguments[1] === undefined ? function () {
                return null;
            } : arguments[1];

            var newColumns = this.__columns__.includes(columnName) ? this.__columns__ : [].concat((0, _toConsumableArray3.default)(this.__columns__), [columnName]);
            return new DataFrame(this.__rows__.map(function (row, index) {
                return row.add(columnName, columnFunc(row, index));
            }), newColumns);
        }
    }, {
        key: 'count',
        value: function count() {
            return this.__rows__.length;
        }
    }]);
    return DataFrame;
}();