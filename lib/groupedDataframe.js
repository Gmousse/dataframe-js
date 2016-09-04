'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _is = require('babel-runtime/core-js/object/is');

var _is2 = _interopRequireDefault(_is);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _reusables = require('./reusables.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __groups__ = (0, _symbol2.default)('groups');

/**
 * Grouped DataFrame structure grouping DataFrame rows by column value.
 */

var GroupedDataFrame = function () {

    /**
     * Create a GroupedDataFrame. Used in DataFrame.groupBy('columnName').
     * @param {DataFrame} df The DataFrame to group by.
     * @param {String} columnName The column used for the group by.
     * @example
     * df.groupBy('column1');
     * //or
     * new GroupedDataFrame(df, 'column1');
     */
    function GroupedDataFrame(df) {
        (0, _classCallCheck3.default)(this, GroupedDataFrame);

        this.df = df;

        for (var _len = arguments.length, columnNames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            columnNames[_key - 1] = arguments[_key];
        }

        this.on = columnNames;
        this[__groups__] = this._groupBy(df, columnNames);
    }

    (0, _createClass3.default)(GroupedDataFrame, [{
        key: _iterator3.default,
        value: _regenerator2.default.mark(function value() {
            var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, group;

            return _regenerator2.default.wrap(function value$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context.prev = 3;
                            _iterator = (0, _getIterator3.default)(this[__groups__]);

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
        key: '_groupBy',
        value: function _groupBy(df, columnNames) {
            return (0, _reusables.combine)(columnNames.map(function (column) {
                return df.distinct(column).toArray(column);
            })).map(function (combination) {
                var groupKey = _assign2.default.apply(Object, [{}].concat((0, _toConsumableArray3.default)(combination.map(function (column, i) {
                    return (0, _defineProperty3.default)({}, columnNames[i], column);
                }))));
                return {
                    groupKey: groupKey,
                    group: df.filter(function (row) {
                        return (0, _entries2.default)(groupKey).reduce(function (p, n) {
                            return p && (0, _is2.default)(row.get(n[0]), n[1]);
                        }, true);
                    })
                };
            }).filter(function (_ref2) {
                var group = _ref2.group;
                return group.count() > 0;
            });
        }

        /**
         * Convert GroupedDataFrame into collection (Array) of dictionnaries (Object).
         * @returns {Array} An Array containing group: {groupKey, group}.
         * @example
         * groupedDF.toCollection();
         */

    }, {
        key: 'toCollection',
        value: function toCollection() {
            return [].concat((0, _toConsumableArray3.default)(this));
        }

        /**
        * Display the GroupedDataFrame as String Table.
        * @param {Boolean} [quiet=false] Quiet mode. If true, it doesn't trigger console.log().
        * @returns {String} The GroupedDataFrame as String Table.
        * @example
        * groupedDf.show()
        */

    }, {
        key: 'show',
        value: function show() {
            var quiet = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

            return [].concat((0, _toConsumableArray3.default)(this)).map(function (_ref3) {
                var group = _ref3.group;
                var groupKey = _ref3.groupKey;

                var groupLog = '--\n[' + (0, _stringify2.default)(groupKey) + ']\n--';
                if (!quiet) {
                    console.log(groupLog);
                }
                return groupLog + '\n' + group.show(10, quiet);
            }).reduce(function (p, n) {
                return p + '\n' + n;
            });
        }

        /**
         * List GroupedDataFrame groups.
         * @returns {Array} An Array containing GroupedDataFrame groupNames.
         * @example
         * gdf.listGroups()
         */

    }, {
        key: 'listGroups',
        value: function listGroups() {
            return [].concat((0, _toConsumableArray3.default)(this)).map(function (_ref4) {
                var groupKey = _ref4.groupKey;
                return groupKey;
            });
        }

        /**
         * Create an aggregation from a function.
         * @param {Function} func The aggregation function.
         * @returns {DataFrame} A new DataFrame with a column aggregation containing the result.
         * @example
         * groupedDF.aggregate(group => group.sql.sum('column1'));
         */

    }, {
        key: 'aggregate',
        value: function aggregate(func) {
            return this.df.__newInstance__([].concat((0, _toConsumableArray3.default)(this)).map(function (_ref5) {
                var group = _ref5.group;
                var groupKey = _ref5.groupKey;
                return (0, _extends3.default)({}, groupKey, { aggregation: func(group, groupKey) });
            }), [].concat((0, _toConsumableArray3.default)(this.on), ['aggregation']));
        }
    }]);
    return GroupedDataFrame;
}();

exports.default = GroupedDataFrame;