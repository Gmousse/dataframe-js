'use strict';

exports.__esModule = true;
exports['default'] = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _iterator2 = require('babel-runtime/core-js/symbol/iterator');

var _iterator3 = _interopRequireDefault(_iterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _dataframe = require('./dataframe');

var _dataframe2 = _interopRequireDefault(_dataframe);

var _errors = require('./errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __groups__ = (0, _symbol2['default'])('groups');

var GroupedDataFrame = function () {
    function GroupedDataFrame(df) {
        (0, _classCallCheck3['default'])(this, GroupedDataFrame);

        if (!(df instanceof _dataframe2['default'])) throw new _errors.ArgumentTypeError(df, 'DataFrame');

        for (var _len = arguments.length, columnNames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            columnNames[_key - 1] = arguments[_key];
        }

        this[__groups__] = this._groupBy(df, columnNames);
        this.df = df;
        this.on = columnNames.length > 0 ? columnNames : df.listColumns();
    }

    (0, _createClass3['default'])(GroupedDataFrame, [{
        key: _iterator3['default'],
        value: _regenerator2['default'].mark(function value() {
            var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, group;

            return _regenerator2['default'].wrap(function value$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context.prev = 3;
                            _iterator = (0, _getIterator3['default'])(this[__groups__]);

                        case 5:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _context.next = 12;
                                break;
                            }

                            group = _step.value;
                            _context.next = 9;
                            return group;

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
        key: '_groupBy',
        value: function _groupBy(df, columnNames) {
            var hashedDF = df.withColumn('hash', function (row) {
                return row.select.apply(row, (0, _toConsumableArray3['default'])(columnNames)).hash();
            });
            return hashedDF.distinct('hash').toArray('hash').map(function (hash) {
                var _group$toCollection$;

                var group = hashedDF.filter(function (row) {
                    return row.get('hash') === hash;
                }).drop('hash');
                return {
                    groupKey: (_group$toCollection$ = group.toCollection(true)[0]).select.apply(_group$toCollection$, (0, _toConsumableArray3['default'])(columnNames)).toDict(),
                    hash: hash,
                    group: group
                };
            }).filter(function (_ref) {
                var group = _ref.group;
                return group.count() > 0;
            });
        }
    }, {
        key: 'get',
        value: function get(hash) {
            return this.toCollection().find(function (group) {
                return group.hash === hash;
            });
        }
    }, {
        key: 'toCollection',
        value: function toCollection() {
            return [].concat((0, _toConsumableArray3['default'])(this));
        }
    }, {
        key: 'show',
        value: function show() {
            var quiet = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            return [].concat((0, _toConsumableArray3['default'])(this)).map(function (_ref2) {
                var group = _ref2.group,
                    groupKey = _ref2.groupKey;

                var groupLog = '--\n[' + (0, _stringify2['default'])(groupKey) + ']\n--';
                if (!quiet) {
                    console.log(groupLog);
                }
                return groupLog + '\n' + group.show(10, quiet);
            }).reduce(function (p, n) {
                return p + '\n' + n;
            });
        }
    }, {
        key: 'listGroups',
        value: function listGroups() {
            return [].concat((0, _toConsumableArray3['default'])(this)).map(function (_ref3) {
                var groupKey = _ref3.groupKey;
                return groupKey;
            });
        }
    }, {
        key: 'listHashs',
        value: function listHashs() {
            return [].concat((0, _toConsumableArray3['default'])(this)).map(function (_ref4) {
                var hash = _ref4.hash;
                return hash;
            });
        }
    }, {
        key: 'aggregate',
        value: function aggregate(func) {
            var columnName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'aggregation';

            return this.df.__newInstance__([].concat((0, _toConsumableArray3['default'])(this)).map(function (_ref5) {
                var group = _ref5.group,
                    groupKey = _ref5.groupKey;
                return (0, _extends4['default'])({}, groupKey, (0, _defineProperty3['default'])({}, columnName, func(group, groupKey)));
            }), [].concat((0, _toConsumableArray3['default'])(this.on), [columnName]));
        }
    }, {
        key: 'pivot',
        value: function pivot(columnToPivot) {
            var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (gdf) {
                return gdf.count();
            };

            var columns = [].concat((0, _toConsumableArray3['default'])(this.on), (0, _toConsumableArray3['default'])(this.df.distinct(columnToPivot).toArray(columnToPivot)));
            return this.df.__newInstance__(this.aggregate(function (group) {
                return group.groupBy(columnToPivot).aggregate(function (gp, gk) {
                    return (0, _defineProperty3['default'])({}, gk[columnToPivot], func(gp, gk));
                }).toArray('aggregation').reduce(function (p, n) {
                    return (0, _extends4['default'])({}, p, n);
                }, {});
            }).toCollection().map(function (_ref7) {
                var aggregation = _ref7.aggregation,
                    rest = (0, _objectWithoutProperties3['default'])(_ref7, ['aggregation']);
                return (0, _extends4['default'])({}, rest, aggregation);
            }), columns);
        }
    }, {
        key: 'melt',
        value: function melt() {
            var _this = this;

            var variableColumnName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'variable';
            var valueColumnName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'value';

            var columns = [].concat((0, _toConsumableArray3['default'])(this.on), [variableColumnName, valueColumnName]);
            return this.df.__newInstance__(this.aggregate(function (group) {
                return (0, _entries2['default'])(group.toDict()).reduce(function (tidy, _ref8) {
                    var _ref9 = (0, _slicedToArray3['default'])(_ref8, 2),
                        key = _ref9[0],
                        value = _ref9[1];

                    return [].concat((0, _toConsumableArray3['default'])(tidy), (0, _toConsumableArray3['default'])(value.reduce(function (p, n) {
                        var _ref10;

                        return !_this.on.includes(key) ? [].concat((0, _toConsumableArray3['default'])(p), [(_ref10 = {}, (0, _defineProperty3['default'])(_ref10, variableColumnName, key), (0, _defineProperty3['default'])(_ref10, valueColumnName, n), _ref10)]) : p;
                    }, [])));
                }, []);
            }).toCollection().reduce(function (p, _ref11) {
                var aggregation = _ref11.aggregation,
                    rest = (0, _objectWithoutProperties3['default'])(_ref11, ['aggregation']);
                return [].concat((0, _toConsumableArray3['default'])(p), (0, _toConsumableArray3['default'])(aggregation.map(function (x) {
                    return (0, _extends4['default'])({}, rest, x);
                })));
            }, []), columns);
        }
    }]);
    return GroupedDataFrame;
}();

exports['default'] = GroupedDataFrame;