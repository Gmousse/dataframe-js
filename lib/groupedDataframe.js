"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _entries = require("babel-runtime/core-js/object/entries");

var _entries2 = _interopRequireDefault(_entries);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require("babel-runtime/helpers/extends");

var _extends4 = _interopRequireDefault(_extends3);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _iterator3 = require("babel-runtime/core-js/symbol/iterator");

var _iterator4 = _interopRequireDefault(_iterator3);

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = require("babel-runtime/core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _dataframe = require("./dataframe");

var _dataframe2 = _interopRequireDefault(_dataframe);

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var __groups__ = (0, _symbol2["default"])("groups");
var __hashes__ = (0, _symbol2["default"])("hashes");

var GroupedDataFrame = function () {
    function GroupedDataFrame(df) {
        (0, _classCallCheck3["default"])(this, GroupedDataFrame);

        if (!(df instanceof _dataframe2["default"])) throw new _errors.ArgumentTypeError(df, "DataFrame");

        for (var _len = arguments.length, columnNames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            columnNames[_key - 1] = arguments[_key];
        }

        var _groupBy2 = this._groupBy(df, columnNames);

        var _groupBy3 = (0, _slicedToArray3["default"])(_groupBy2, 2);

        this[__groups__] = _groupBy3[0];
        this[__hashes__] = _groupBy3[1];

        this.df = df;
        this.on = columnNames.length > 0 ? columnNames : df.listColumns();
    }

    (0, _createClass3["default"])(GroupedDataFrame, [{
        key: _iterator4["default"],
        value: _regenerator2["default"].mark(function value() {
            var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, hash;

            return _regenerator2["default"].wrap(function value$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context.prev = 3;
                            _iterator = (0, _getIterator3["default"])(this[__hashes__]);

                        case 5:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _context.next = 12;
                                break;
                            }

                            hash = _step.value;
                            _context.next = 9;
                            return this[__groups__][hash];

                        case 9:
                            _iteratorNormalCompletion = true;
                            _context.next = 5;
                            break;

                        case 12:
                            _context.next = 18;
                            break;

                        case 14:
                            _context.prev = 14;
                            _context.t0 = _context["catch"](3);
                            _didIteratorError = true;
                            _iteratorError = _context.t0;

                        case 18:
                            _context.prev = 18;
                            _context.prev = 19;

                            if (!_iteratorNormalCompletion && _iterator["return"]) {
                                _iterator["return"]();
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
                        case "end":
                            return _context.stop();
                    }
                }
            }, value, this, [[3, 14, 18, 26], [19,, 21, 25]]);
        })
    }, {
        key: "_groupBy",
        value: function _groupBy(df, columnNames) {
            var rowsByGroup = {};
            var hashes = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = (0, _getIterator3["default"])(df.toCollection(true)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var row = _step2.value;

                    var hash = row.select.apply(row, (0, _toConsumableArray3["default"])(columnNames)).hash();
                    if (!rowsByGroup[hash]) {
                        hashes.push(hash);
                        rowsByGroup[hash] = [];
                    }
                    rowsByGroup[hash].push(row);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                        _iterator2["return"]();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return [hashes.reduce(function (groups, hash) {
                var _rowsByGroup$hash$;

                groups[hash] = {
                    groupKey: (_rowsByGroup$hash$ = rowsByGroup[hash][0]).select.apply(_rowsByGroup$hash$, (0, _toConsumableArray3["default"])(columnNames)).toDict(),
                    hash: hash,
                    group: new _dataframe2["default"](rowsByGroup[hash], df.listColumns())
                };
                return groups;
            }, {}), hashes];
        }
    }, {
        key: "get",
        value: function get(hash) {
            return this[__groups__][hash];
        }
    }, {
        key: "toCollection",
        value: function toCollection() {
            return [].concat((0, _toConsumableArray3["default"])(this));
        }
    }, {
        key: "show",
        value: function show() {
            var quiet = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            return [].concat((0, _toConsumableArray3["default"])(this)).map(function (_ref) {
                var group = _ref.group,
                    groupKey = _ref.groupKey;

                var groupLog = "--\n[" + (0, _stringify2["default"])(groupKey) + "]\n--";
                if (!quiet) {
                    console.log(groupLog);
                }
                return groupLog + "\n" + group.show(10, quiet);
            }).reduce(function (p, n) {
                return p + "\n" + n;
            });
        }
    }, {
        key: "listGroups",
        value: function listGroups() {
            return [].concat((0, _toConsumableArray3["default"])(this)).map(function (_ref2) {
                var groupKey = _ref2.groupKey;
                return groupKey;
            });
        }
    }, {
        key: "listHashs",
        value: function listHashs() {
            return this[__hashes__];
        }
    }, {
        key: "map",
        value: function map(func) {
            var _ref4;

            var mapped = [].concat((0, _toConsumableArray3["default"])(this)).map(function (_ref3) {
                var group = _ref3.group;
                return group.map(func);
            });
            return this.df.__newInstance__((_ref4 = []).concat.apply(_ref4, (0, _toConsumableArray3["default"])(mapped.map(function (group) {
                return group.toCollection();
            }))), mapped[0].listColumns());
        }
    }, {
        key: "filter",
        value: function filter(condition) {
            var _ref6;

            var mapped = [].concat((0, _toConsumableArray3["default"])(this)).map(function (_ref5) {
                var group = _ref5.group;
                return group.filter(condition);
            }).filter(function (group) {
                return group.listColumns().length > 0;
            });
            return mapped.length === 0 ? [] : this.df.__newInstance__((_ref6 = []).concat.apply(_ref6, (0, _toConsumableArray3["default"])(mapped.map(function (group) {
                return group.toCollection();
            }))), mapped[0].listColumns());
        }
    }, {
        key: "chain",
        value: function chain() {
            var _ref8;

            for (var _len2 = arguments.length, funcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                funcs[_key2] = arguments[_key2];
            }

            var mapped = [].concat((0, _toConsumableArray3["default"])(this)).map(function (_ref7) {
                var group = _ref7.group;
                return group.chain.apply(group, funcs);
            });
            return this.df.__newInstance__((_ref8 = []).concat.apply(_ref8, (0, _toConsumableArray3["default"])(mapped.map(function (group) {
                return group.toCollection();
            }))), mapped[0].listColumns());
        }
    }, {
        key: "aggregate",
        value: function aggregate(func) {
            var columnName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "aggregation";

            return this.df.__newInstance__([].concat((0, _toConsumableArray3["default"])(this)).map(function (_ref9) {
                var group = _ref9.group,
                    groupKey = _ref9.groupKey;
                return (0, _extends4["default"])({}, groupKey, (0, _defineProperty3["default"])({}, columnName, func(group, groupKey)));
            }), [].concat((0, _toConsumableArray3["default"])(this.on), [columnName]));
        }
    }, {
        key: "pivot",
        value: function pivot(columnToPivot) {
            var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (gdf) {
                return gdf.count();
            };

            var columns = [].concat((0, _toConsumableArray3["default"])(this.on), (0, _toConsumableArray3["default"])(this.df.distinct(columnToPivot).toArray(columnToPivot)));
            return this.df.__newInstance__(this.aggregate(function (group) {
                return group.groupBy(columnToPivot).aggregate(function (gp, gk) {
                    return (0, _defineProperty3["default"])({}, gk[columnToPivot], func(gp, gk));
                }).toArray("aggregation").reduce(function (p, n) {
                    return (0, _extends4["default"])({}, p, n);
                }, {});
            }).toCollection().map(function (_ref11) {
                var aggregation = _ref11.aggregation,
                    rest = (0, _objectWithoutProperties3["default"])(_ref11, ["aggregation"]);
                return (0, _extends4["default"])({}, rest, aggregation);
            }), columns);
        }
    }, {
        key: "melt",
        value: function melt() {
            var _this = this;

            var variableColumnName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "variable";
            var valueColumnName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "value";

            var columns = [].concat((0, _toConsumableArray3["default"])(this.on), [variableColumnName, valueColumnName]);
            return this.df.__newInstance__(this.aggregate(function (group) {
                return (0, _entries2["default"])(group.toDict()).reduce(function (tidy, _ref12) {
                    var _ref13 = (0, _slicedToArray3["default"])(_ref12, 2),
                        key = _ref13[0],
                        value = _ref13[1];

                    return [].concat((0, _toConsumableArray3["default"])(tidy), (0, _toConsumableArray3["default"])(value.reduce(function (p, n) {
                        var _ref14;

                        return !_this.on.includes(key) ? [].concat((0, _toConsumableArray3["default"])(p), [(_ref14 = {}, (0, _defineProperty3["default"])(_ref14, variableColumnName, key), (0, _defineProperty3["default"])(_ref14, valueColumnName, n), _ref14)]) : p;
                    }, [])));
                }, []);
            }).toCollection().reduce(function (p, _ref15) {
                var aggregation = _ref15.aggregation,
                    rest = (0, _objectWithoutProperties3["default"])(_ref15, ["aggregation"]);
                return [].concat((0, _toConsumableArray3["default"])(p), (0, _toConsumableArray3["default"])(aggregation.map(function (x) {
                    return (0, _extends4["default"])({}, rest, x);
                })));
            }, []), columns);
        }
    }]);
    return GroupedDataFrame;
}();

exports["default"] = GroupedDataFrame;