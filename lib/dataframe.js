'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _iterator2 = require('babel-runtime/core-js/symbol/iterator');

var _iterator3 = _interopRequireDefault(_iterator2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _reusables = require('./reusables.js');

var _errors = require('./errors.js');

var _row = require('./row.js');

var _row2 = _interopRequireDefault(_row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataFrame = function () {
    function DataFrame(data, columns) {
        var _this = this;

        (0, _classCallCheck3.default)(this, DataFrame);

        var _build2 = this._build(data, columns);

        var _build3 = (0, _slicedToArray3.default)(_build2, 2);

        this.__rows__ = _build3[0];
        this.columns = _build3[1];

        for (var _len = arguments.length, plugins = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            plugins[_key - 2] = arguments[_key];
        }

        this.plugins = plugins;
        if (plugins.length > 0) {
            _assign2.default.apply(Object, [this].concat((0, _toConsumableArray3.default)(plugins.map(function (Plugin) {
                var pluginInstance = new Plugin(_this);
                return (0, _defineProperty3.default)({}, pluginInstance.name, pluginInstance);
            }))));
        }
    }

    (0, _createClass3.default)(DataFrame, [{
        key: _iterator3.default,
        value: _regenerator2.default.mark(function value() {
            var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, row;

            return _regenerator2.default.wrap(function value$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context.prev = 3;
                            _iterator = (0, _getIterator3.default)(this.__rows__);

                        case 5:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _context.next = 12;
                                break;
                            }

                            row = _step.value;
                            _context.next = 9;
                            return row;

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
        key: '__newInstance__',
        value: function __newInstance__(data, columns) {
            return new (Function.prototype.bind.apply(DataFrame, [null].concat([data, columns], (0, _toConsumableArray3.default)(this.plugins))))();
        }
    }, {
        key: '_build',
        value: function _build(data, columns) {
            var _this2 = this;

            return (0, _reusables.match)(data, [function (value) {
                return value instanceof DataFrame;
            }, function () {
                return [data.__rows__, data.columns];
            }], [function (value) {
                return value instanceof Array;
            }, function () {
                return _this2._fromArray(data, columns);
            }], [function (value) {
                return value instanceof Object;
            }, function () {
                return _this2._fromDict(data, columns);
            }], [function () {
                return true;
            }, function () {
                throw new _errors.InputTypeError(typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data), ['Object', 'Array']);
            }]);
        }
    }, {
        key: '_fromDict',
        value: function _fromDict(dict, columns) {
            return [(0, _reusables.transpose)((0, _values2.default)(dict)).map(function (row) {
                return new _row2.default(row, columns);
            }), columns];
        }
    }, {
        key: '_fromArray',
        value: function _fromArray(array, columns) {
            return [array.map(function (row) {
                return new _row2.default(row, columns);
            }), columns];
        }
    }, {
        key: 'transpose',
        value: function transpose() {
            var newColumns = [].concat((0, _toConsumableArray3.default)(Array(this.count()).keys()));
            return this.__newInstance__((0, _reusables.transpose)((0, _reusables.transpose)((0, _values2.default)(this.toDict()))).map(function (row) {
                return new _row2.default(row, newColumns);
            }), newColumns);
        }
    }, {
        key: 'toDict',
        value: function toDict() {
            var _this3 = this;

            return _assign2.default.apply(Object, [{}].concat((0, _toConsumableArray3.default)((0, _entries2.default)((0, _reusables.transpose)([].concat((0, _toConsumableArray3.default)(this.__rows__)).map(function (row) {
                return row.toArray();
            }))).map(function (_ref2) {
                var _ref3 = (0, _slicedToArray3.default)(_ref2, 2);

                var index = _ref3[0];
                var column = _ref3[1];
                return (0, _defineProperty3.default)({}, _this3.columns[index], column);
            }))));
        }
    }, {
        key: 'toArray',
        value: function toArray() {
            return [].concat((0, _toConsumableArray3.default)(this)).map(function (row) {
                return row.toArray();
            });
        }
    }, {
        key: 'show',
        value: function show() {
            var rows = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];
            var returnAsString = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            var makeRow = function makeRow(row) {
                return '| ' + row.map(function (column) {
                    return String(column).substring(0, 10) + Array(10 - String(column).length).join(' ');
                }).join(' | ') + ' |';
            };
            var header = makeRow(this.columns);
            var toShow = [header, Array(header.length).join('-')].concat((0, _toConsumableArray3.default)((0, _reusables.iter)(this.__rows__, function (row) {
                return makeRow(row.toArray());
            }, rows))).join('\n');
            return returnAsString ? toShow : console.log(toShow);
        }
    }, {
        key: 'select',
        value: function select() {
            for (var _len2 = arguments.length, columns = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                columns[_key2] = arguments[_key2];
            }

            return this.__newInstance__(this.__rows__.map(function (row) {
                return row.select.apply(row, columns);
            }), columns);
        }
    }, {
        key: 'withColumn',
        value: function withColumn(columnName) {
            var func = arguments.length <= 1 || arguments[1] === undefined ? function () {
                return undefined;
            } : arguments[1];

            return this.__newInstance__(this.__rows__.map(function (row, index) {
                return row.set(columnName, func(row, index));
            }), this.columns.includes(columnName) ? this.columns : [].concat((0, _toConsumableArray3.default)(this.columns), [columnName]));
        }
    }, {
        key: 'drop',
        value: function drop(columnName) {
            return this.__newInstance__(this.__rows__.map(function (row) {
                return row.delete(columnName);
            }), this.columns.filter(function (column) {
                return column !== columnName;
            }));
        }
    }, {
        key: 'distinct',
        value: function distinct(columnName) {
            return [].concat((0, _toConsumableArray3.default)(new (Function.prototype.bind.apply(_set2.default, [null].concat((0, _toConsumableArray3.default)(this.select(columnName).transpose().toArray()))))()));
        }
    }, {
        key: 'chain',
        value: function chain() {
            for (var _len3 = arguments.length, funcs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                funcs[_key3] = arguments[_key3];
            }

            return this.__newInstance__([].concat((0, _toConsumableArray3.default)(_reusables.chain.apply(undefined, [this.__rows__].concat(funcs)))), this.columns);
        }
    }, {
        key: 'filter',
        value: function filter(condition) {
            var filteredRows = [].concat((0, _toConsumableArray3.default)((0, _reusables.iter)(this.__rows__, function (row) {
                return condition(row) ? row : false;
            })));
            return filteredRows.length > 0 ? this.__newInstance__(filteredRows, this.columns) : this.__newInstance__([], []);
        }
    }, {
        key: 'map',
        value: function map(modification) {
            return this.__newInstance__([].concat((0, _toConsumableArray3.default)((0, _reusables.iter)(this.__rows__, function (row) {
                return modification(row);
            }))), this.columns);
        }
    }, {
        key: 'reduce',
        value: function reduce(func, init) {
            return typeof init === 'undefined' ? this.__rows__.reduce(function (p, n) {
                return func(p, n);
            }) : this.__rows__.reduce(function (p, n) {
                return func(p, n);
            }, init);
        }
    }, {
        key: 'reduceRight',
        value: function reduceRight(func, init) {
            return typeof init === 'undefined' ? this.__rows__.reduceRight(function (p, n) {
                return func(p, n);
            }) : this.__rows__.reduceRight(function (p, n) {
                return func(p, n);
            }, init);
        }
    }, {
        key: 'groupBy',
        value: function groupBy(columnName) {
            var _this4 = this;

            return [].concat((0, _toConsumableArray3.default)((0, _reusables.iter)(this.distinct(columnName), function (value) {
                var groupedDF = _this4.filter(function (row) {
                    return row.get(columnName) === value;
                });
                groupedDF.group = value;
                return groupedDF;
            })));
        }
    }, {
        key: 'sortBy',
        value: function sortBy(columnName) {
            var reverse = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            var sortedRows = this.__rows__.sort(function (p, n) {
                return p.get(columnName) - n.get(columnName);
            });
            return this.__newInstance__(reverse ? sortedRows.reverse() : sortedRows, this.columns);
        }
    }, {
        key: 'count',
        value: function count(valueToCount) {
            var columnName = arguments.length <= 1 || arguments[1] === undefined ? this.columns[0] : arguments[1];

            return valueToCount ? this.filter(function (row) {
                return row.get(columnName) === valueToCount;
            }).count() : [].concat((0, _toConsumableArray3.default)(this)).length;
        }
    }]);
    return DataFrame;
}();

exports.default = DataFrame;