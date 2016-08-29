'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

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

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __groups__ = (0, _symbol2.default)('groups');

/**
 * Grouped DataFrame structure grouping DataFrames by column value.
 */

var GroupedDataFrame = function () {

    /**
     * Create a GroupedDataFrame. Used in df.groupBy('columnName').
     * @param {DataFrame} df The DataFrame to group by.
     * @param {String} columnName The column used for the group by.
     * @example
     * df.groupBy('column1');
     * //or
     * new GroupedDataFrame(df, 'column1');
     */
    function GroupedDataFrame(df, columnName) {
        (0, _classCallCheck3.default)(this, GroupedDataFrame);

        this[__groups__] = _assign2.default.apply(Object, [{}].concat((0, _toConsumableArray3.default)(df.distinct(columnName).map(function (groupName) {
            var group = groupName.get(columnName);
            return groupName.set(columnName, (0, _defineProperty3.default)({}, group, df.filter(function (row) {
                return row.get(columnName) === group;
            })));
        }).toArray(columnName))));
    }

    (0, _createClass3.default)(GroupedDataFrame, [{
        key: _iterator3.default,
        value: _regenerator2.default.mark(function value() {
            var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, groupName, group;

            return _regenerator2.default.wrap(function value$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context.prev = 3;
                            _iterator = (0, _getIterator3.default)((0, _entries2.default)(this[__groups__]));

                        case 5:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _context.next = 14;
                                break;
                            }

                            _step$value = (0, _slicedToArray3.default)(_step.value, 2);
                            groupName = _step$value[0];
                            group = _step$value[1];
                            _context.next = 11;
                            return [group, groupName];

                        case 11:
                            _iteratorNormalCompletion = true;
                            _context.next = 5;
                            break;

                        case 14:
                            _context.next = 20;
                            break;

                        case 16:
                            _context.prev = 16;
                            _context.t0 = _context['catch'](3);
                            _didIteratorError = true;
                            _iteratorError = _context.t0;

                        case 20:
                            _context.prev = 20;
                            _context.prev = 21;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 23:
                            _context.prev = 23;

                            if (!_didIteratorError) {
                                _context.next = 26;
                                break;
                            }

                            throw _iteratorError;

                        case 26:
                            return _context.finish(23);

                        case 27:
                            return _context.finish(20);

                        case 28:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, value, this, [[3, 16, 20, 28], [21,, 23, 27]]);
        })

        /**
         * Convert GroupedDataFrame into dict / hash / object.
         * @returns {Object} The GroupedDataFrame converted into dict.
         * @example
         * groupedDF.toDict();
         */

    }, {
        key: 'toDict',
        value: function toDict() {
            return (0, _assign2.default)({}, this[__groups__]);
        }

        /**
         * Convert GroupedDataFrame into array.
         * @returns {Array} The GroupedDataFrame converted into array.
         * @example
         * groupedDf.toArray()
         */

    }, {
        key: 'toArray',
        value: function toArray() {
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

            return this.aggregate(function (group, groupName) {
                var groupLog = '--\n[' + groupName + ']\n--';
                if (!quiet) {
                    console.log(groupLog);
                }
                return groupLog + group.show(10, quiet);
            });
        }

        /**
         * Create an aggregation from a custom function.
         * @param {Function} func The aggregation function.
         * @returns {Object} The result of the aggregation with the group as key and the aggregate as value.
         * @example
         * groupedDF.aggregate(group => group.sql.sum('column1'));
         */

    }, {
        key: 'aggregate',
        value: function aggregate(func) {
            return _assign2.default.apply(Object, [{}].concat((0, _toConsumableArray3.default)([].concat((0, _toConsumableArray3.default)(this)).map(function (_ref) {
                var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

                var group = _ref2[0];
                var groupName = _ref2[1];
                return (0, _defineProperty3.default)({}, groupName, func(group, groupName));
            }))));
        }
    }]);
    return GroupedDataFrame;
}();

exports.default = GroupedDataFrame;