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

/**
 * DataFrame data structure providing an immutable, flexible and powerfull way to manipulate data with columns and rows.
 */

var DataFrame = function () {
    /**
     * Create a new DataFrame.
     * @param {Array | Object | DataFrame} data The data of the DataFrame.
     * @param {Array} columns The DataFrame column names.
     * @param {...Object} [modules] Additional modules.
     * @example
     * // From Object
     * const dfFromObjectOfArrays = new DataFrame({
    *      'column1': [3, 6, 8],  // Column Data
    *      'column2': [3, 4, 5, 6], // Column Data
     * }, ['column1', 'column2']); // Columns
     *
     * // From Array of Arrays
     * const dfFromArrayOfArrays = new DataFrame([
    *      [1, 6, 9, 10, 12],  // Row Data
    *      [1, 2],             // Row Data
    *      [6, 6, 9, 8, 9, 12], // Row Data
     * ], ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']); // Columns
     *
     * // From Array of Objects -- THE BETTER WAY --
     * const dfFromArrayOfObjects = new DataFrame([
    *      {c1: 1, c2: 6, c3: 9, c4: 10, c5: 12},  // Row Data
    *      {c4: 1, c3: 2},                         // Row Data
    *      {c1: 6, c5: 6, c2: 9, c4: 8, c3: 9, c6: 12}, // Row Data
     * ], ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']); // Columns
     *
     * // From DataFrame
     * const dfFromDF = new DataFrame(dfFromArrayOfArrays);
     */

    function DataFrame(data, columns) {
        var _this = this;

        (0, _classCallCheck3.default)(this, DataFrame);

        var _build2 = this._build(data, columns);

        var _build3 = (0, _slicedToArray3.default)(_build2, 2);

        this.__rows__ = _build3[0];
        this.__columns__ = _build3[1];

        for (var _len = arguments.length, modules = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            modules[_key - 2] = arguments[_key];
        }

        this.modules = modules;
        if (modules.length > 0) {
            _assign2.default.apply(Object, [this].concat((0, _toConsumableArray3.default)(modules.map(function (Plugin) {
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
            return new (Function.prototype.bind.apply(DataFrame, [null].concat([data, columns], (0, _toConsumableArray3.default)(this.modules))))();
        }
    }, {
        key: '_build',
        value: function _build(data, columns) {
            var _this2 = this;

            return (0, _reusables.match)(data, [function (value) {
                return value instanceof DataFrame;
            }, function () {
                return [data.__rows__, data.__columns__];
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

        /**
         * Convert DataFrame into dict / hash / object.
         * @returns {Object} The DataFrame converted into dict.
         * @example
         * df.toDict()
         *
         * { c1: [ 1, undefined, 6 ], // one array by column
         *   c2: [ 6, undefined, 9 ],
         *   c3: [ 9, 2, 9 ],
         *   c4: [ 10, 1, 8 ],
         *   c5: [ 12, undefined, 6 ],
         *   c6: [ undefined, undefined, 12 ] }
         */

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
                return (0, _defineProperty3.default)({}, _this3.__columns__[index], column);
            }))));
        }

        /**
         * Convert DataFrame into Array.
         * @returns {Array} The DataFrame converted into dict.
         * @example
         * df.toArray()
         *
         * [ [ 1, 6, 9, 10, 12, undefined ], // one array by row
         *   [ undefined, undefined, 2, 1, undefined, undefined ],
         *   [ 6, 9, 9, 8, 6, 12 ] ]
         */

    }, {
        key: 'toArray',
        value: function toArray() {
            return [].concat((0, _toConsumableArray3.default)(this)).map(function (row) {
                return row.toArray();
            });
        }

        /**
         * Display the DataFrame as String Table. Can only return a sring instead of displaying the DataFrame.
         * @param {Number} [rows=10] The number of lines to display.
         * @param {Boolean} [quiet=false] Quiet mode. If true, only returns a string instead of console.log().
         * @returns {String} The DataFrame as String Table.
         * @example
         * df.show() // console.log the DataFrame with the first 10nth rows
         *
         * | column1   | column2   | column3   |
         * ------------------------------------
         * | 3         | 3         | undefined |
         * | 6         | 4         | undefined |
         * | 8         | 5         | undefined |
         * | undefined | 6         | undefined |
         */

    }, {
        key: 'show',
        value: function show() {
            var rows = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];
            var quiet = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            var makeRow = function makeRow(row) {
                return '| ' + row.map(function (column) {
                    return String(column).substring(0, 10) + Array(10 - String(column).length).join(' ');
                }).join(' | ') + ' |';
            };
            var header = makeRow(this.__columns__);
            var token = 0;
            var toShow = [header, Array(header.length).join('-')].concat((0, _toConsumableArray3.default)((0, _reusables.iter)(this.__rows__, function (row) {
                token++;return makeRow(row.toArray());
            }, function () {
                return token >= rows;
            }))).join('\n');
            if (!quiet) {
                console.log(toShow);
            }
            return toShow;
        }

        /**
         * Get the DataFrame dimensions.
         * @returns {Array} The DataFrame dimensions. [height, weight]
         * @example
         * df.dim()
         * [4, 3] // [height, weight]
         */

    }, {
        key: 'dim',
        value: function dim() {
            return [this.count(), this.__columns__.length];
        }

        /**
         * Get the rows number.
         * @returns {Int} The number of DataFrame rows.
         * @example
         * // Counting rows
         * df.count()
         *
         * 4
         */

    }, {
        key: 'count',
        value: function count() {
            return [].concat((0, _toConsumableArray3.default)(this)).length;
        }

        /**
         * Get the count of a value into a column.
         * @param valueToCount The value to count into the selected column.
         * @param {String} [columnName=this.__columns__[0]] The column where found the value.
         * @returns {Int} The number of times the selected value appears.
         * @example
          * // Counting specific value in a column
          * df.countValue(5, 'column2')
          *
          * 1
          *
          * // Counting specific value in a selected column
          * df.select('column1').countValue(5)
          *
          * 0
         */

    }, {
        key: 'countValue',
        value: function countValue(valueToCount) {
            var columnName = arguments.length <= 1 || arguments[1] === undefined ? this.__columns__[0] : arguments[1];

            return this.filter(function (row) {
                return row.get(columnName) === valueToCount;
            }).count();
        }

        /**
         * Compute unique values into a column.
         * @param {String} columnName The column to distinct.
         * @returns {Array} An Array containing distinct values of the column.
         * @example
         * df.distinct('d2')
         *
         * [3, 4, 15, 6]
         */

    }, {
        key: 'distinct',
        value: function distinct(columnName) {
            return [].concat((0, _toConsumableArray3.default)(new (Function.prototype.bind.apply(_set2.default, [null].concat((0, _toConsumableArray3.default)((0, _reusables.transpose)(this.select(columnName).toArray())))))()));
        }

        /**
         * List DataFrame columns.
         * @returns {Array} An Array containing DataFrame column Names.
         * @example
         * df.listColumns()
         *
         * ['c1', 'c2', 'c3', 'c4']
         */

    }, {
        key: 'listColumns',
        value: function listColumns() {
            return [].concat((0, _toConsumableArray3.default)(this.__columns__));
        }

        /**
         * Select columns in the DataFrame.
         * @param {...String} columnNames The columns to select.
         * @returns {DataFrame} A new DataFrame containing selected columns.
         * @example
         * df.select('column1', 'column3').show()
         *
         * | column1   | column3   |
         * ------------------------
         * | 3         | undefined |
         * | 6         | undefined |
         * | 8         | undefined |
         * | undefined | undefined |
         */

    }, {
        key: 'select',
        value: function select() {
            for (var _len2 = arguments.length, columnNames = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                columnNames[_key2] = arguments[_key2];
            }

            return this.__newInstance__(this.__rows__.map(function (row) {
                return row.select.apply(row, columnNames);
            }), columnNames);
        }

        /**
         * Add a new column or set an existing one.
         * @param {String} columnName The column to modify or to create.
         * @param {Function} [func=(row, index) => undefined] The function to create the column.
         * @returns {DataFrame} A new DataFrame containing the new or modified column.
         * @example
         * // Add a new column
         * df.withColumn('column4', () => 2).show()
         *
         * | column1   | column2   | column3   | column4   |
         * ------------------------------------------------
         * | 3         | 3         | undefined | 2         |
         * | 6         | 4         | undefined | 2         |
         * | 8         | 5         | undefined | 2         |
         * | undefined | 6         | undefined | 2         |
         *
         * // Modify a column
         * df.withColumn('column2', (row) => row.get('column2') * 2).show()
         *
         * | column1   | column2   | column3   |
         * ------------------------------------
         * | 3         | 6         | undefined |
         * | 6         | 8         | undefined |
         * | 8         | 10        | undefined |
         * | undefined | 12        | undefined |
         */

    }, {
        key: 'withColumn',
        value: function withColumn(columnName) {
            var func = arguments.length <= 1 || arguments[1] === undefined ? function () {
                return undefined;
            } : arguments[1];

            return this.__newInstance__(this.__rows__.map(function (row, index) {
                return row.set(columnName, func(row, index));
            }), this.__columns__.includes(columnName) ? this.__columns__ : [].concat((0, _toConsumableArray3.default)(this.__columns__), [columnName]));
        }

        /**
         * Modify the structure of the DataFrame by changing columns order, creating new columns or removing some columns.
         * @param {...String} columnNames The new columns of the DataFrame.
         * @returns {DataFrame} A new DataFrame with different columns (renamed, add or deleted).
         * @example
         * df.__columns__
         *
         * ['column1', 'column2', 'column3']
         *
         * // Adding one empty column and removing one
         * df.restructure('column1', 'column3', 'column4')
         *
         * | column1   | column3   | column4   |
         * ------------------------------------
         * | 3         | undefined | undefined |
         * | 6         | undefined | undefined |
         * | 8         | undefined | undefined |
         * | undefined | undefined | undefined |
         */

    }, {
        key: 'restructure',
        value: function restructure() {
            for (var _len3 = arguments.length, columnNames = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                columnNames[_key3] = arguments[_key3];
            }

            return this.__newInstance__(this.__rows__, columnNames);
        }

        /**
         * Rename columns.
         * @param {...String} columnNames The new column names of the DataFrame.
         * @returns {DataFrame} A new DataFrame with the new column names.
         * @example
         * df.__columns__
         *
         * ['column1', 'column2', 'column3']
         *
         * df.rename('column1', 'column3', 'column4').__columns__
         *
         * ['column1', 'column3', 'column4']
         */

    }, {
        key: 'rename',
        value: function rename() {
            for (var _len4 = arguments.length, columnNames = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                columnNames[_key4] = arguments[_key4];
            }

            return this.__newInstance__(this.__rows__.map(function (row) {
                return row.toArray();
            }), columnNames);
        }

        /**
         * Remove a single column.
         * @param {String} columnName The column to drop.
         * @returns {DataFrame} A new DataFrame without the dropped column.
         * @example
         * df.drop('d2').show()
         *
         * | column1   | column3   |
         * ------------------------
         * | 3         | undefined |
         * | 6         | undefined |
         * | 8         | undefined |
         * | undefined | undefined |
         */

    }, {
        key: 'drop',
        value: function drop(columnName) {
            return this.__newInstance__(this.__rows__.map(function (row) {
                return row.delete(columnName);
            }), this.__columns__.filter(function (column) {
                return column !== columnName;
            }));
        }

        /**
         * Chain multiple functions on DataFrame (filters, maps) and optimized their executions.
         * If a function returns boolean, it's a filter. Else it's a map.
         * It can be 10 - 100 x faster than standard chains of .map() and .filter().
         * @param {...Function} funcs Functions to apply on the DataFrame rows taking the row as parameter.
         * @returns {DataFrame} A new DataFrame with modified rows.
         * @example
         * // 1 filter ==> 1 map ==> 1 filter
         * df.chain(
        *      line => line.get('column1') > 3, // Filter sending boolean. If true the chain continue. Else it breaks and the row is not send.
        *      line => line.set('column1', 3),  // Map sending modification
        *      line => line.get('column2') === '5' // Filter sending boolean. If true the row is send.
         * ).show();
         *
         * | column1   | column2   | column3   |
         * ------------------------------------
         * | 3         | 5         | undefined |
         */

    }, {
        key: 'chain',
        value: function chain() {
            for (var _len5 = arguments.length, funcs = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                funcs[_key5] = arguments[_key5];
            }

            return this.__newInstance__([].concat((0, _toConsumableArray3.default)(_reusables.chain.apply(undefined, [this.__rows__].concat(funcs)))), this.__columns__);
        }

        /**
         * Filter DataFrame rows. /!\ Prefer to use .chain().
         * @param {Function} func A function sending a boolean taking the row as parameter.
         * @returns {DataFrame} A new filtered DataFrame.
         */

    }, {
        key: 'filter',
        value: function filter(func) {
            var filteredRows = [].concat((0, _toConsumableArray3.default)((0, _reusables.iter)(this.__rows__, function (row) {
                return func(row) ? row : false;
            })));
            return filteredRows.length > 0 ? this.__newInstance__(filteredRows, this.__columns__) : this.__newInstance__([], []);
        }

        /**
         * Map on DataFrame rows. /!\ Prefer to use .chain().
         * @param {Function} func A function to apply on each row taking the row as parameter.
         * @returns {DataFrame} A new DataFrame with modified rows.
         */

    }, {
        key: 'map',
        value: function map(func) {
            return this.__newInstance__([].concat((0, _toConsumableArray3.default)((0, _reusables.iter)(this.__rows__, function (row) {
                return func(row);
            }))), this.__columns__);
        }

        /**
         * Reduce DataFrame into a value.
         * @param {Function} func The reduce function taking 2 parameters, previous and next.
         * @param [init] The initial value of the reducer.
         * @returns A reduced value.
         * @example
         * // Compute a value from rows, starting from value 0
         * df.reduce((p, n) => n.get('column1') + p, 0)
         *
         * // Compute a row from rows
         * df2.reduce((p, n) => (
        *          n.set('column1', p.get('column1') + n.get('column1'))
        *           .set('column2', p.get('column2') + n.get('column2'))
         * ))
         */

    }, {
        key: 'reduce',
        value: function reduce(func, init) {
            return typeof init === 'undefined' ? this.__rows__.reduce(function (p, n) {
                return func(p, n);
            }) : this.__rows__.reduce(function (p, n) {
                return func(p, n);
            }, init);
        }

        /**
         * Reduce DataFrame into a value, starting from the last row (see .reduce()).
         * @param {Function} func The reduce function taking 2 parameters, previous and next.
         * @param [init] The initial value of the reducer.
         * @returns A reduced value.
         */

    }, {
        key: 'reduceRight',
        value: function reduceRight(func, init) {
            return typeof init === 'undefined' ? this.__rows__.reduceRight(function (p, n) {
                return func(p, n);
            }) : this.__rows__.reduceRight(function (p, n) {
                return func(p, n);
            }, init);
        }

        /**
         * Return a random sample of rows.
         * @param {Number} percentage A percentage of the orignal DataFrame giving the sample size.
         * @returns {DataFrame} A sample DataFrame
         * @example
         * df.sample(0.3) // Return a DataFrame with 30% of the original size.
         */

    }, {
        key: 'sample',
        value: function sample(percentage) {
            var nRows = this.count() * percentage;
            var token = 0;
            return this.__newInstance__([].concat((0, _toConsumableArray3.default)((0, _reusables.iter)(this.__rows__, function (row) {
                if (Math.random() > 0.5) {
                    token++;
                    return row;
                }
            }, function () {
                return token >= nRows;
            }))), this.__columns__);
        }

        /**
         * Randomly split a DataFrame into 2 DataFrames.
         * @param {Number} percentage A percentage of the orignal DataFrame giving the first DataFrame size. The second takes the rest.
         * @returns {Array} An Array containing the two DataFrames.
         * @example
         * df.randomSplit(0.3) // Return a DataFrame with 30% of the original size and a second with the rest (70%).
         */

    }, {
        key: 'randomSplit',
        value: function randomSplit(percentage) {
            var nRows = this.count() * percentage;
            var token = 0;
            var restRows = [];
            return [this.__newInstance__([].concat((0, _toConsumableArray3.default)((0, _reusables.iter)(this.__rows__, function (row) {
                if (Math.random() > 0.5 && token < nRows) {
                    token++;
                    return row;
                }
                restRows.push(row);
            }))), this.__columns__), this.__newInstance__(restRows, this.__columns__)];
        }

        /**
         * Group DataFrame rows by a column values.
         * @param {String} columnName The column giving groups (distinct values).
         * @returns {Array} An Array containing a DataFrame by group. The group value can be accessed via df.group.
         * @example
         * // Group By id and return an object containing group and dataframe
         * df.groupBy('id').map(dfByValue => ({group: dfByValue.group, df: dfByValue.toDict()}))
         *
         * [ { group: 3, df: { id: [Object], value: [Object] } },
         *   { group: 6, df: { id: [Object], value: [Object] } },
         *   { group: 8, df: { id: [Object], value: [Object] } },
         *   { group: 1, df: { id: [Object], value: [Object] } } ]
         *
         * // Get sum of value by id with a simple formating
         * df.groupBy('id').map(dfByValue => (
        *      {group: dfByValue.group, result: dfByValue.reduce((p, n) => p + n.get('value'), 0)})
         * )
         *
         * [ { group: 3, result: 3 },
         *   { group: 6, result: 0 },
         *   { group: 8, result: 5 },
         *   { group: 1, result: 2 } ]
         */

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

        /**
         * Sort DataFrame rows based on a column values.
         * @param {String} columnName The column giving order.
         * @param {Boolean} [reverse=false] Reverse mode. Reverse the order if true.
         * @returns {DataFrame} An ordered DataFrame.
         * @example
         * // Sort DataFrame by id
         * df.sortBy('id').toArray()
         *
         * [
        *      [1, 1],
        *      [1, 1],
        *      [3, 1],
        *      [3, 2],
        *      [6, 0],
        *      [8, 1],
        *      [8, 4],
         * ]
         *
         * // Sort DataFrame by id and reverse
         * df.sortBy('id', true).toArray()
         *
         * [
        *      [8, 4],
        *      [8, 1],
        *      [6, 0],
        *      [3, 2],
        *      [3, 1],
        *      [1, 1],
        *      [1, 1],
         * ]
         */

    }, {
        key: 'sortBy',
        value: function sortBy(columnName) {
            var reverse = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            var sortedRows = this.__rows__.sort(function (p, n) {
                return p.get(columnName) - n.get(columnName);
            });
            return this.__newInstance__(reverse ? sortedRows.reverse() : sortedRows, this.__columns__);
        }

        /**
         * Concat two DataFrames.
         * @param {DataFrame} dfToUnion The DataFrame to concat.
         * @returns {DataFrame} A new DataFrame resulting of the union.
         * @example
         * df.union(df2).toArray()
         *
         * [
        *      [8, 4],
        *      [8, 1],
        *      [6, 0],
        *      [3, 2],
        *      [3, 1],
        *      [1, 1],
        *      [1, 1],
        *      [3, 1],
        *      [1, 0],
        *      [8, 1],
         * ]
         */

    }, {
        key: 'union',
        value: function union(dfToUnion) {
            if (!(0, _reusables.arrayEqual)(this.__columns__, dfToUnion.__columns__)) {
                throw new _errors.NotTheSameSchemaError(dfToUnion.__columns__, this.__columns__);
            }
            return this.__newInstance__([].concat((0, _toConsumableArray3.default)(this), (0, _toConsumableArray3.default)(dfToUnion)), this.__columns__);
        }

        /**
         * Join two DataFrames.
         * @param {DataFrame} dfToJoin The DataFrame to join.
         * @param {String} on The selected column for the join.
         * @param {String} [how='full'] The join mode. Can be: full, inner, outer, left, right.
         * @returns {DataFrame} The joined DataFrame.
         */

    }, {
        key: 'join',
        value: function join(dfToJoin, on) {
            var _this5 = this;

            var how = arguments.length <= 2 || arguments[2] === undefined ? 'full' : arguments[2];

            var joinMethods = {
                inner: function inner() {
                    return _this5.innerJoin(dfToJoin, on);
                },
                full: function full() {
                    return _this5.fullJoin(dfToJoin, on);
                },
                outer: function outer() {
                    return _this5.outerJoin(dfToJoin, on);
                },
                left: function left() {
                    return _this5.leftJoin(dfToJoin, on);
                },
                right: function right() {
                    return _this5.rightJoin(dfToJoin, on);
                }
            };
            return joinMethods[how]();
        }

        /**
         * Join two DataFrames with inner mode.
         * @param {DataFrame} dfToJoin The DataFrame to join.
         * @param {String} on The selected column for the join.
         * @returns {DataFrame} The joined DataFrame.
         * @example
         * df1.join(df2, 'id', 'inner')
         *
         * | id        | value     | value2    |
         * ------------------------------------
         * | 3         | 1         | undefined |
         * | 1         | 0         | undefined |
         * | 8         | 1         | undefined |
         * | 1         | undefined | 0         |
         * | 8         | undefined | 2         |
         * | 3         | undefined | 6         |
         */

    }, {
        key: 'innerJoin',
        value: function innerJoin(dfToJoin, on) {
            var newColumns = [].concat((0, _toConsumableArray3.default)(new _set2.default([].concat((0, _toConsumableArray3.default)(this.__columns__), (0, _toConsumableArray3.default)(dfToJoin.__columns__)))));
            var actualGroupedDFs = this.groupBy(on);
            var groupedDFsToJoin = dfToJoin.groupBy(on);
            return [].concat((0, _toConsumableArray3.default)((0, _reusables.iter)([].concat((0, _toConsumableArray3.default)(actualGroupedDFs.filter(function (groupedDF) {
                return !(typeof groupedDFsToJoin.find(function (df) {
                    return df.group === groupedDF.group;
                }) === 'undefined');
            })), (0, _toConsumableArray3.default)(groupedDFsToJoin.filter(function (groupedDF) {
                return !(typeof actualGroupedDFs.find(function (df) {
                    return df.group === groupedDF.group;
                }) === 'undefined');
            }))), function (groupedDF) {
                return groupedDF.restructure.apply(groupedDF, (0, _toConsumableArray3.default)(newColumns));
            }))).reduce(function (p, n) {
                return p.union(n);
            });
        }

        /**
         * Join two DataFrames with full mode.
         * @param {DataFrame} dfToJoin The DataFrame to join.
         * @param {String} on The selected column for the join.
         * @returns {DataFrame} The joined DataFrame.
         * @example
         * df1.join(df2, 'id', 'full')
         *
         * | id        | value     | value2    |
         * ------------------------------------
         * | 3         | 1         | undefined |
         * | 1         | 0         | undefined |
         * | 8         | 1         | undefined |
         * | 2         | undefined | 1         |
         * | 1         | undefined | 0         |
         * | 6         | undefined | 1         |
         * | 8         | undefined | 2         |
         * | 3         | undefined | 6         |
         */

    }, {
        key: 'fullJoin',
        value: function fullJoin(dfToJoin, on) {
            var newColumns = [].concat((0, _toConsumableArray3.default)(new _set2.default([].concat((0, _toConsumableArray3.default)(this.__columns__), (0, _toConsumableArray3.default)(dfToJoin.__columns__)))));
            return [].concat((0, _toConsumableArray3.default)((0, _reusables.iter)([].concat((0, _toConsumableArray3.default)(this.groupBy(on)), (0, _toConsumableArray3.default)(dfToJoin.groupBy(on))), function (groupedDF) {
                return groupedDF.restructure.apply(groupedDF, (0, _toConsumableArray3.default)(newColumns));
            }))).reduce(function (p, n) {
                return p.union(n);
            });
        }

        /**
         * Join two DataFrames with outer mode.
         * @param {DataFrame} dfToJoin The DataFrame to join.
         * @param {String} on The selected column for the join.
         * @returns {DataFrame} The joined DataFrame.
         * @example
         * df1.join(df2, 'id', 'outer')
         *
         * | id        | value     | value2    |
         * ------------------------------------
         * | 2         | undefined | 1         |
         * | 6         | undefined | 1         |
         */

    }, {
        key: 'outerJoin',
        value: function outerJoin(dfToJoin, on) {
            var newColumns = [].concat((0, _toConsumableArray3.default)(new _set2.default([].concat((0, _toConsumableArray3.default)(this.__columns__), (0, _toConsumableArray3.default)(dfToJoin.__columns__)))));
            var actualGroupedDFs = this.groupBy(on);
            var groupedDFsToJoin = dfToJoin.groupBy(on);
            return [].concat((0, _toConsumableArray3.default)((0, _reusables.iter)([].concat((0, _toConsumableArray3.default)(actualGroupedDFs.filter(function (groupedDF) {
                return typeof groupedDFsToJoin.find(function (df) {
                    return df.group === groupedDF.group;
                }) === 'undefined';
            })), (0, _toConsumableArray3.default)(groupedDFsToJoin.filter(function (groupedDF) {
                return typeof actualGroupedDFs.find(function (df) {
                    return df.group === groupedDF.group;
                }) === 'undefined';
            }))), function (groupedDF) {
                return groupedDF.restructure.apply(groupedDF, (0, _toConsumableArray3.default)(newColumns));
            }))).reduce(function (p, n) {
                return p.union(n);
            });
        }

        /**
         * Join two DataFrames with left mode.
         * @param {DataFrame} dfToJoin The DataFrame to join.
         * @param {String} on The selected column for the join.
         * @returns {DataFrame} The joined DataFrame.
         * @example
         * df1.join(df2, 'id', 'left')
         *
         * | id        | value     | value2    |
         * ------------------------------------
         * | 3         | 1         | undefined |
         * | 1         | 0         | undefined |
         * | 8         | 1         | undefined |
         * | 1         | undefined | 0         |
         * | 8         | undefined | 2         |
         * | 3         | undefined | 6         |
         */

    }, {
        key: 'leftJoin',
        value: function leftJoin(dfToJoin, on) {
            var newColumns = [].concat((0, _toConsumableArray3.default)(new _set2.default([].concat((0, _toConsumableArray3.default)(this.__columns__), (0, _toConsumableArray3.default)(dfToJoin.__columns__)))));
            var actualGroupedDFs = this.groupBy(on);
            var groupedDFsToJoin = dfToJoin.groupBy(on);
            return [].concat((0, _toConsumableArray3.default)((0, _reusables.iter)([].concat((0, _toConsumableArray3.default)(actualGroupedDFs), (0, _toConsumableArray3.default)(groupedDFsToJoin.filter(function (groupedDF) {
                return !(typeof actualGroupedDFs.find(function (df) {
                    return df.group === groupedDF.group;
                }) === 'undefined');
            }))), function (groupedDF) {
                return groupedDF.restructure.apply(groupedDF, (0, _toConsumableArray3.default)(newColumns));
            }))).reduce(function (p, n) {
                return p.union(n);
            });
        }

        /**
         * Join two DataFrames with right mode.
         * @param {DataFrame} dfToJoin The DataFrame to join.
         * @param {String} on The selected column for the join.
         * @returns {DataFrame} The joined DataFrame.
         * @example
         * df1.join(df2, 'id', 'right')
         *
         * | id        | value     | value2    |
         * ------------------------------------
         * | 2         | undefined | 1         |
         * | 1         | undefined | 0         |
         * | 6         | undefined | 1         |
         * | 8         | undefined | 2         |
         * | 3         | undefined | 6         |
         * | 3         | 1         | undefined |
         * | 1         | 0         | undefined |
         * | 8         | 1         | undefined |
         */

    }, {
        key: 'rightJoin',
        value: function rightJoin(dfToJoin, on) {
            var newColumns = [].concat((0, _toConsumableArray3.default)(new _set2.default([].concat((0, _toConsumableArray3.default)(this.__columns__), (0, _toConsumableArray3.default)(dfToJoin.__columns__)))));
            var actualGroupedDFs = this.groupBy(on);
            var groupedDFsToJoin = dfToJoin.groupBy(on);
            return [].concat((0, _toConsumableArray3.default)((0, _reusables.iter)([].concat((0, _toConsumableArray3.default)(groupedDFsToJoin), (0, _toConsumableArray3.default)(actualGroupedDFs.filter(function (groupedDF) {
                return !(typeof groupedDFsToJoin.find(function (df) {
                    return df.group === groupedDF.group;
                }) === 'undefined');
            }))), function (groupedDF) {
                return groupedDF.restructure.apply(groupedDF, (0, _toConsumableArray3.default)(newColumns));
            }))).reduce(function (p, n) {
                return p.union(n);
            });
        }
    }]);
    return DataFrame;
}();

exports.default = DataFrame;