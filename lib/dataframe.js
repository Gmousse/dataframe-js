'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _is = require('babel-runtime/core-js/object/is'),
    _is2 = _interopRequireDefault(_is),
    _stringify = require('babel-runtime/core-js/json/stringify'),
    _stringify2 = _interopRequireDefault(_stringify),
    _entries = require('babel-runtime/core-js/object/entries'),
    _entries2 = _interopRequireDefault(_entries),
    _values = require('babel-runtime/core-js/object/values'),
    _values2 = _interopRequireDefault(_values),
    _typeof2 = require('babel-runtime/helpers/typeof'),
    _typeof3 = _interopRequireDefault(_typeof2),
    _keys = require('babel-runtime/core-js/object/keys'),
    _keys2 = _interopRequireDefault(_keys),
    _set = require('babel-runtime/core-js/set'),
    _set2 = _interopRequireDefault(_set),
    _defineProperty2 = require('babel-runtime/helpers/defineProperty'),
    _defineProperty3 = _interopRequireDefault(_defineProperty2),
    _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of'),
    _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf),
    _create = require('babel-runtime/core-js/object/create'),
    _create2 = _interopRequireDefault(_create),
    _regenerator = require('babel-runtime/regenerator'),
    _regenerator2 = _interopRequireDefault(_regenerator),
    _getIterator2 = require('babel-runtime/core-js/get-iterator'),
    _getIterator3 = _interopRequireDefault(_getIterator2),
    _iterator2 = require('babel-runtime/core-js/symbol/iterator'),
    _iterator3 = _interopRequireDefault(_iterator2),
    _assign = require('babel-runtime/core-js/object/assign'),
    _assign2 = _interopRequireDefault(_assign),
    _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray'),
    _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2),
    _slicedToArray2 = require('babel-runtime/helpers/slicedToArray'),
    _slicedToArray3 = _interopRequireDefault(_slicedToArray2),
    _classCallCheck2 = require('babel-runtime/helpers/classCallCheck'),
    _classCallCheck3 = _interopRequireDefault(_classCallCheck2),
    _createClass2 = require('babel-runtime/helpers/createClass'),
    _createClass3 = _interopRequireDefault(_createClass2),
    _symbol = require('babel-runtime/core-js/symbol'),
    _symbol2 = _interopRequireDefault(_symbol),
    _reusables = require('./reusables.js'),
    _errors = require('./errors.js'),
    _row = require('./row.js'),
    _row2 = _interopRequireDefault(_row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __columns__ = (0, _symbol2.default)('columns'),
    __rows__ = (0, _symbol2.default)('rows');

/**
 * DataFrame data structure providing an immutable, flexible and powerfull way to manipulate data with columns and rows.
 */
var DataFrame = function () {
    (0, _createClass3.default)(DataFrame, null, [{
        key: 'setDefaultModules',
        value: function setDefaultModules() {
            for (var _len = arguments.length, modules = Array(_len), _key = 0; _key < _len; _key++) {
                modules[_key] = arguments[_key];
            }

            DataFrame.defaultModules = modules;
        }

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

    }]);

    function DataFrame(data, columns) {
        (0, _classCallCheck3.default)(this, DataFrame);

        var _build2 = this._build(data, columns),
            _build3 = (0, _slicedToArray3.default)(_build2, 2);

        this[__rows__] = _build3[0];
        this[__columns__] = _build3[1];

        for (var _len2 = arguments.length, modules = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            modules[_key2 - 2] = arguments[_key2];
        }

        this.modules = DataFrame.defaultModules ? [].concat((0, _toConsumableArray3.default)(DataFrame.defaultModules), modules) : modules;
        _assign2.default.apply(Object, [this].concat((0, _toConsumableArray3.default)(this.__instanciateModules__(this.modules))));
    }

    (0, _createClass3.default)(DataFrame, [{
        key: _iterator3.default,
        value: _regenerator2.default.mark(function value() {
            var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, row;

            return _regenerator2.default.wrap(function value$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                            _context.prev = 1;
                            _iterator = (0, _getIterator3.default)(this[__rows__]);

                        case 3:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _context.next = 10;
                                break;
                            }

                            row = _step.value;
                            _context.next = 7;
                            return row;

                        case 7:
                            _iteratorNormalCompletion = true;
                            _context.next = 3;
                            break;

                        case 10:
                            _context.next = 16;
                            break;

                        case 12:
                            _context.prev = 12;
                            _context.t0 = _context['catch'](1);
                            _didIteratorError = true;
                            _iteratorError = _context.t0;

                        case 16:
                            _context.prev = 16;
                            _context.prev = 17;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 19:
                            _context.prev = 19;

                            if (!_didIteratorError) {
                                _context.next = 22;
                                break;
                            }

                            throw _iteratorError;

                        case 22:
                            return _context.finish(19);

                        case 23:
                            return _context.finish(16);

                        case 24:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, value, this, [[1, 12, 16, 24], [17,, 19, 23]]);
        })
    }, {
        key: '__newInstance__',
        value: function __newInstance__(data, columns) {
            var _Object$assign2;

            if (!(0, _reusables.arrayEqual)(columns, this[__columns__]) || !(data[0] instanceof _row2.default)) {
                return new (Function.prototype.bind.apply(DataFrame, [null].concat([data, columns], (0, _toConsumableArray3.default)(this.modules))))();
            }
            var newInstance = (0, _assign2.default)((0, _create2.default)((0, _getPrototypeOf2.default)(this)), this, (_Object$assign2 = {}, (0, _defineProperty3.default)(_Object$assign2, __rows__, [].concat((0, _toConsumableArray3.default)(data))), (0, _defineProperty3.default)(_Object$assign2, __columns__, [].concat((0, _toConsumableArray3.default)(columns))), _Object$assign2));
            return _assign2.default.apply(Object, [newInstance].concat((0, _toConsumableArray3.default)(this.__instanciateModules__(this.modules, newInstance))));
        }
    }, {
        key: '__instanciateModules__',
        value: function __instanciateModules__(modules) {
            var _this = this,
                df = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];

            return modules.map(function (Plugin) {
                var pluginInstance = new Plugin(df ? df : _this);
                return (0, _defineProperty3.default)({}, pluginInstance.name, pluginInstance);
            });
        }
    }, {
        key: '_build',
        value: function _build(data, columns) {
            var _this2 = this;

            return (0, _reusables.match)(data, [function (value) {
                return value instanceof DataFrame;
            }, function () {
                return _this2._fromArray([].concat((0, _toConsumableArray3.default)(data[__rows__])), columns ? columns : data[__columns__]);
            }], [function (value) {
                return value instanceof Array;
            }, function () {
                return _this2._fromArray(data, columns ? columns : [].concat((0, _toConsumableArray3.default)(new _set2.default(data.map(function (row) {
                    return (0, _keys2.default)(row);
                }).reduce(function (p, n) {
                    return [].concat((0, _toConsumableArray3.default)(p), (0, _toConsumableArray3.default)(n));
                })))));
            }], [function (value) {
                return value instanceof Object;
            }, function () {
                return _this2._fromDict(data, columns ? columns : (0, _keys2.default)(data));
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

            return _assign2.default.apply(Object, [{}].concat((0, _toConsumableArray3.default)((0, _entries2.default)(this.transpose().toArray()).map(function (_ref2) {
                var _ref3 = (0, _slicedToArray3.default)(_ref2, 2),
                    index = _ref3[0],
                    column = _ref3[1];

                return (0, _defineProperty3.default)({}, _this3[__columns__][index], column);
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
         * Convert the DataFrame into a text string. You can also save the file if you are using nodejs.
         * @param {String} [sep=' '] Column separator.
         * @param {Boolean} [header=true] Writing the header in the first line. If false, there will be no header.
         * @param {String} [path] The path to save the file. /!\ Works only on node.js, not into the browser.
         * @returns {String} The text file in raw string.
         */

    }, {
        key: 'toText',
        value: function toText() {
            var sep = arguments.length <= 0 || arguments[0] === undefined ? ';' : arguments[0],
                header = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1],
                path = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2],
                csvContent = this.reduce(function (p, n) {
                return '' + (p ? p + '\n' : '') + n.toArray().join(sep);
            }, header ? this[__columns__].join(sep) : '');

            if (path) {
                (0, _reusables.saveFile)(path, csvContent);
            }
            return csvContent;
        }

        /**
         * Convert the DataFrame into a csv string. You can also save the file if you are using nodejs.
         * @param {Boolean} [header=true] Writing the header in the first line. If false, there will be no header.
         * @param {String} [path] The path to save the file. /!\ Works only on node.js, not into the browser.
         * @returns {String} The csv file in raw string.
         */

    }, {
        key: 'toCSV',
        value: function toCSV() {
            var header = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0],
                path = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];

            return this.toText(',', header, path);
        }

        /**
         * Convert the DataFrame into a json string. You can also save the file if you are using nodejs.
         * @param {String} [path] The path to save the file. /!\ Works only on node.js, not into the browser.
         * @returns {String} The json file in raw string.
         */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            var path = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0],
                jsonContent = (0, _stringify2.default)(this.toDict());

            if (path) {
                (0, _reusables.saveFile)(path, jsonContent);
            }
            return jsonContent;
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
            var rows = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0],
                quiet = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1],
                makeRow = function makeRow(row) {
                return '| ' + row.map(function (column) {
                    return String(column).substring(0, 10) + Array(10 - String(column).length).join(' ');
                }).join(' | ') + ' |';
            },
                header = makeRow(this[__columns__]),
                token = 0,
                toShow = [header, Array(header.length).join('-')].concat((0, _toConsumableArray3.default)((0, _reusables.iter)(this[__rows__], function (row) {
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
            return [this.count(), this[__columns__].length];
        }

        /**
         * Transpose a DataFrame. Rows become columns and conversely. n x p => p x n.
         * @returns {ÐataFrame} A new transpoded DataFrame.
         */

    }, {
        key: 'transpose',
        value: function transpose() {
            var newColumns = [].concat((0, _toConsumableArray3.default)(Array(this.count()).keys()));
            return this.__newInstance__((0, _reusables.transpose)(this.toArray()), newColumns);
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
         * @param {String} [columnName=this[__columns__][0]] The column where found the value.
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
            var columnName = arguments.length <= 1 || arguments[1] === undefined ? this[__columns__][0] : arguments[1];

            return this.filter(function (row) {
                return row.get(columnName) === valueToCount;
            }).count();
        }

        /**
         * Push new rows into the DataFrame.
         * @param {Array | Row} rows The rows to add.
         * @returns {DataFrame} A new DataFrame with the new rows.
         * @example
          * df.push([1,2,3], [1,4,9])
         */

    }, {
        key: 'push',
        value: function push() {
            for (var _len3 = arguments.length, rows = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rows[_key3] = arguments[_key3];
            }

            return this.union(new DataFrame(rows, this[__columns__]));
        }

        /**
         * Replace a value by another in the DataFrame or in a column.
         * @param value The value to replace.
         * @param replacment The new value.
         * @param {...String} [columnNames=this[__columns__]] The columns to apply the replacment.
         * @returns {DataFrame} A new DataFrame with replaced values.
         */

    }, {
        key: 'replace',
        value: function replace(value, replacment) {
            for (var _len4 = arguments.length, columnNames = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
                columnNames[_key4 - 2] = arguments[_key4];
            }

            var _this4 = this;

            return this.map(function (row) {
                return (columnNames.length > 0 ? columnNames : _this4[__columns__]).reduce(function (p, n) {
                    return p.get(n) === value ? p.set(n, replacment) : p;
                }, row);
            });
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
            return [].concat((0, _toConsumableArray3.default)(new (Function.prototype.bind.apply(_set2.default, [null].concat((0, _toConsumableArray3.default)(this.select(columnName).transpose().toArray()))))()));
        }

        /**
         * Compute unique values into a column.
         * Alias from .distinct()
         * @param {String} columnName The column to distinct.
         * @returns {Array} An Array containing distinct values of the column.
         * @example
         * df.unique('d2')
         *
         * [3, 4, 15, 6]
         */

    }, {
        key: 'unique',
        value: function unique(columnName) {
            return this.distinct(columnName);
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
            return [].concat((0, _toConsumableArray3.default)(this[__columns__]));
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
            for (var _len5 = arguments.length, columnNames = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                columnNames[_key5] = arguments[_key5];
            }

            return this.__newInstance__(this[__rows__].map(function (row) {
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

            return this.__newInstance__(this[__rows__].map(function (row, index) {
                return row.set(columnName, func(row, index));
            }), this[__columns__].includes(columnName) ? this[__columns__] : [].concat((0, _toConsumableArray3.default)(this[__columns__]), [columnName]));
        }

        /**
         * Modify the structure of the DataFrame by changing columns order, creating new columns or removing some columns.
         * @param {Array} newColumnNames The new columns of the DataFrame.
         * @returns {DataFrame} A new DataFrame with different columns (renamed, add or deleted).
         * @example
         * df[__columns__]
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
        value: function restructure(newColumnNames) {
            return this.__newInstance__(this[__rows__], newColumnNames);
        }

        /**
         * Rename columns.
         * @param {Array} newColumnNames The new column names of the DataFrame.
         * @returns {DataFrame} A new DataFrame with the new column names.
         * @example
         * df[__columns__]
         *
         * ['column1', 'column2', 'column3']
         *
         * df.rename('column1', 'column3', 'column4')[__columns__]
         *
         * ['column1', 'column3', 'column4']
         */

    }, {
        key: 'rename',
        value: function rename(newColumnNames) {
            if (newColumnNames.length !== this[__columns__].length) {
                throw new _errors.NotTheSameColumnLengthsError(newColumnNames.length, this[__columns__].length);
            }
            return this.__newInstance__(this[__rows__].map(function (row) {
                return row.toArray();
            }), newColumnNames);
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
            return this.__newInstance__(this[__rows__].map(function (row) {
                return row.delete(columnName);
            }), this[__columns__].filter(function (column) {
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
            for (var _len6 = arguments.length, funcs = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                funcs[_key6] = arguments[_key6];
            }

            return this.__newInstance__([].concat((0, _toConsumableArray3.default)(_reusables.chain.apply(undefined, [this[__rows__]].concat(funcs)))), this[__columns__]);
        }

        /**
         * Filter DataFrame rows.
         * @param {Function} condition A function sending a boolean taking the row as parameter or a column/value object.
         * @returns {DataFrame} A new filtered DataFrame.
         * @example
         * df.filter(
        *      line => line.get('column1') >= 3
         * ).show();
         *
         * | column1   | column2   | column3   |
         * ------------------------------------
         * | 3         | 5         | undefined |
         *
         * df.filter(
        *      {'column2': 5, 'column1': 3}
         * ).show();
         *
         * | column1   | column2   | column3   |
         * ------------------------------------
         * | 3         | 5         | undefined |
         */

    }, {
        key: 'filter',
        value: function filter(condition) {
            var func = (typeof condition === 'undefined' ? 'undefined' : (0, _typeof3.default)(condition)) === 'object' ? function (row) {
                return (0, _entries2.default)(condition).map(function (_ref5) {
                    var _ref6 = (0, _slicedToArray3.default)(_ref5, 2),
                        column = _ref6[0],
                        value = _ref6[1];

                    return (0, _is2.default)(row.get(column), value);
                }).reduce(function (p, n) {
                    return p && n;
                });
            } : condition,
                filteredRows = [].concat((0, _toConsumableArray3.default)((0, _reusables.iter)(this[__rows__], function (row) {
                return func(row) ? row : false;
            })));

            return filteredRows.length > 0 ? this.__newInstance__(filteredRows, this[__columns__]) : this.__newInstance__([], []);
        }

        /**
         * Find a row (the first met) based on a condition.
         * @param {Function} condition A function sending a boolean taking the row as parameter or a column/value object..
         * @returns {Row} The targeted Row.
         * @example
         * df.find(
        *      line => line.get('column1') == 3
         * );
         * df.find(
        *      {'id': 958998}
         * );
         */

    }, {
        key: 'find',
        value: function find(condition) {
            return this.filter(condition)[__rows__][0];
        }

        /**
         * Filter DataFrame rows.
         * Alias of .filter()
         * @param {Function} condition A function sending a boolean taking the row as parameter or a column/value object.
         * @returns {DataFrame} A new filtered DataFrame.
         * @example
         * df.filter(
        *      line => line.get('column1') >= 3
         * ).show();
         *
         * | column1   | column2   | column3   |
         * ------------------------------------
         * | 3         | 5         | undefined |
         *
         * df.filter(
        *      {'column2': 5, 'column1': 3}
         * ).show();
         *
         * | column1   | column2   | column3   |
         * ------------------------------------
         * | 3         | 5         | undefined |
         */

    }, {
        key: 'where',
        value: function where(condition) {
            return this.filter(condition);
        }

        /**
         * Map on DataFrame rows. /!\ Prefer to use .chain().
         * @param {Function} func A function to apply on each row taking the row as parameter.
         * @returns {DataFrame} A new DataFrame with modified rows.
         */

    }, {
        key: 'map',
        value: function map(func) {
            return this.__newInstance__([].concat((0, _toConsumableArray3.default)((0, _reusables.iter)(this[__rows__], function (row) {
                return func(row);
            }))), this[__columns__]);
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
            return typeof init === 'undefined' ? this[__rows__].reduce(function (p, n) {
                return func(p, n);
            }) : this[__rows__].reduce(function (p, n) {
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
            return typeof init === 'undefined' ? this[__rows__].reduceRight(function (p, n) {
                return func(p, n);
            }) : this[__rows__].reduceRight(function (p, n) {
                return func(p, n);
            }, init);
        }

        /**
         * Return a shuffled DataFrame rows.
         * @returns {DataFrame} A shuffled DataFrame
         * @example
         * df.shuffle() // Return a DataFrame with shuffled rows.
         */

    }, {
        key: 'shuffle',
        value: function shuffle() {
            return this.__newInstance__(this.reduce(function (p, n) {
                var index = Math.floor(Math.random() * (p.length - 1) + 1);
                return Array.isArray(p) ? [].concat((0, _toConsumableArray3.default)(p.slice(index, p.length + 1)), [n], (0, _toConsumableArray3.default)(p.slice(0, index))) : [p, n];
            }), this[__columns__]);
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
            var nRows = this.count() * percentage,
                token = 0;

            return this.__newInstance__([].concat((0, _toConsumableArray3.default)((0, _reusables.iter)(this.shuffle()[__rows__], function (row) {
                token++;
                return row;
            }, function () {
                return token >= nRows;
            }))), this[__columns__]);
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
            var nRows = this.count() * percentage,
                token = 0,
                restRows = [];

            return [this.__newInstance__([].concat((0, _toConsumableArray3.default)((0, _reusables.iter)(this.shuffle()[__rows__], function (row) {
                if (token < nRows) {
                    token++;
                    return row;
                }
                restRows.push(row);
            }))), this[__columns__]), this.__newInstance__(restRows, this[__columns__])];
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
            var _this5 = this;

            return [].concat((0, _toConsumableArray3.default)((0, _reusables.iter)(this.distinct(columnName), function (value) {
                var groupedDF = _this5.filter(function (row) {
                    return row.get(columnName) === value;
                });
                groupedDF.group = value;
                return groupedDF;
            })));
        }

        /**
         * Sort DataFrame rows based on a column values. The row should contains only one type. (numerical or string).
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
            var reverse = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1],
                sortedRows = this[__rows__].sort(function (p, n) {
                return p.get(columnName) - n.get(columnName);
            });

            return this.__newInstance__(reverse ? sortedRows.reverse() : sortedRows, this[__columns__]);
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
            if (!(0, _reusables.arrayEqual)(this[__columns__], dfToUnion[__columns__])) {
                throw new _errors.NotTheSameSchemaError(dfToUnion[__columns__], this[__columns__]);
            }
            return this.__newInstance__([].concat((0, _toConsumableArray3.default)(this), (0, _toConsumableArray3.default)(dfToUnion)), this[__columns__]);
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
            var _this6 = this,
                how = arguments.length <= 2 || arguments[2] === undefined ? 'full' : arguments[2],
                joinMethods = {
                inner: function inner() {
                    return _this6.innerJoin(dfToJoin, on);
                },
                full: function full() {
                    return _this6.fullJoin(dfToJoin, on);
                },
                outer: function outer() {
                    return _this6.outerJoin(dfToJoin, on);
                },
                left: function left() {
                    return _this6.leftJoin(dfToJoin, on);
                },
                right: function right() {
                    return _this6.rightJoin(dfToJoin, on);
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
            var newColumns = [].concat((0, _toConsumableArray3.default)(new _set2.default([].concat((0, _toConsumableArray3.default)(this[__columns__]), (0, _toConsumableArray3.default)(dfToJoin[__columns__]))))),
                actualGroupedDFs = this.groupBy(on),
                groupedDFsToJoin = dfToJoin.groupBy(on);

            return [].concat((0, _toConsumableArray3.default)((0, _reusables.iter)([].concat((0, _toConsumableArray3.default)(actualGroupedDFs.filter(function (groupedDF) {
                return !(typeof groupedDFsToJoin.find(function (df) {
                    return df.group === groupedDF.group;
                }) === 'undefined');
            })), (0, _toConsumableArray3.default)(groupedDFsToJoin.filter(function (groupedDF) {
                return !(typeof actualGroupedDFs.find(function (df) {
                    return df.group === groupedDF.group;
                }) === 'undefined');
            }))), function (groupedDF) {
                return groupedDF.restructure(newColumns);
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
            var newColumns = [].concat((0, _toConsumableArray3.default)(new _set2.default([].concat((0, _toConsumableArray3.default)(this[__columns__]), (0, _toConsumableArray3.default)(dfToJoin[__columns__])))));
            return [].concat((0, _toConsumableArray3.default)((0, _reusables.iter)([].concat((0, _toConsumableArray3.default)(this.groupBy(on)), (0, _toConsumableArray3.default)(dfToJoin.groupBy(on))), function (groupedDF) {
                return groupedDF.restructure(newColumns);
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
            var newColumns = [].concat((0, _toConsumableArray3.default)(new _set2.default([].concat((0, _toConsumableArray3.default)(this[__columns__]), (0, _toConsumableArray3.default)(dfToJoin[__columns__]))))),
                actualGroupedDFs = this.groupBy(on),
                groupedDFsToJoin = dfToJoin.groupBy(on);

            return [].concat((0, _toConsumableArray3.default)((0, _reusables.iter)([].concat((0, _toConsumableArray3.default)(actualGroupedDFs.filter(function (groupedDF) {
                return typeof groupedDFsToJoin.find(function (df) {
                    return df.group === groupedDF.group;
                }) === 'undefined';
            })), (0, _toConsumableArray3.default)(groupedDFsToJoin.filter(function (groupedDF) {
                return typeof actualGroupedDFs.find(function (df) {
                    return df.group === groupedDF.group;
                }) === 'undefined';
            }))), function (groupedDF) {
                return groupedDF.restructure(newColumns);
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
            var newColumns = [].concat((0, _toConsumableArray3.default)(new _set2.default([].concat((0, _toConsumableArray3.default)(this[__columns__]), (0, _toConsumableArray3.default)(dfToJoin[__columns__]))))),
                actualGroupedDFs = this.groupBy(on),
                groupedDFsToJoin = dfToJoin.groupBy(on);

            return [].concat((0, _toConsumableArray3.default)((0, _reusables.iter)([].concat((0, _toConsumableArray3.default)(actualGroupedDFs), (0, _toConsumableArray3.default)(groupedDFsToJoin.filter(function (groupedDF) {
                return !(typeof actualGroupedDFs.find(function (df) {
                    return df.group === groupedDF.group;
                }) === 'undefined');
            }))), function (groupedDF) {
                return groupedDF.restructure(newColumns);
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
            var newColumns = [].concat((0, _toConsumableArray3.default)(new _set2.default([].concat((0, _toConsumableArray3.default)(this[__columns__]), (0, _toConsumableArray3.default)(dfToJoin[__columns__]))))),
                actualGroupedDFs = this.groupBy(on),
                groupedDFsToJoin = dfToJoin.groupBy(on);

            return [].concat((0, _toConsumableArray3.default)((0, _reusables.iter)([].concat((0, _toConsumableArray3.default)(groupedDFsToJoin), (0, _toConsumableArray3.default)(actualGroupedDFs.filter(function (groupedDF) {
                return !(typeof groupedDFsToJoin.find(function (df) {
                    return df.group === groupedDF.group;
                }) === 'undefined');
            }))), function (groupedDF) {
                return groupedDF.restructure(newColumns);
            }))).reduce(function (p, n) {
                return p.union(n);
            });
        }
    }]);
    return DataFrame;
}();

exports.default = DataFrame;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WrongMatrixStructureError = exports.NotTheSameColumnLengthsError = exports.NotTheSameSchemaError = exports.NoSuchColumnError = exports.SchemaTypeError = exports.SchemaError = exports.EmptyInputError = exports.InputTypeError = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof'),
    _typeof3 = _interopRequireDefault(_typeof2),
    _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of'),
    _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf),
    _classCallCheck2 = require('babel-runtime/helpers/classCallCheck'),
    _classCallCheck3 = _interopRequireDefault(_classCallCheck2),
    _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn'),
    _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2),
    _inherits2 = require('babel-runtime/helpers/inherits'),
    _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputTypeError = exports.InputTypeError = function (_Error) {
    (0, _inherits3.default)(InputTypeError, _Error);

    function InputTypeError(type, supportedTypes) {
        (0, _classCallCheck3.default)(this, InputTypeError);

        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(InputTypeError).call(this));

        _this.message = 'InputTypeError: ' + (typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) + ' while only suppporting ' + supportedTypes.join(', ');
        _this.name = 'InputTypeError';
        return _this;
    }

    return InputTypeError;
}(Error);

var EmptyInputError = exports.EmptyInputError = function (_Error2) {
    (0, _inherits3.default)(EmptyInputError, _Error2);

    function EmptyInputError(input) {
        (0, _classCallCheck3.default)(this, EmptyInputError);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(EmptyInputError).call(this));

        _this2.message = 'EmptyInputError: ' + input + ' is empty';
        _this2.name = 'EmptyInputError';
        return _this2;
    }

    return EmptyInputError;
}(Error);

var SchemaError = exports.SchemaError = function (_Error3) {
    (0, _inherits3.default)(SchemaError, _Error3);

    function SchemaError(schema) {
        (0, _classCallCheck3.default)(this, SchemaError);

        var _this3 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SchemaError).call(this));

        _this3.message = 'ShemaError: ' + schema + ' found while expecting [[String, Object]]';
        _this3.name = 'SchemaError';
        return _this3;
    }

    return SchemaError;
}(Error);

var SchemaTypeError = exports.SchemaTypeError = function (_Error4) {
    (0, _inherits3.default)(SchemaTypeError, _Error4);

    function SchemaTypeError(type) {
        (0, _classCallCheck3.default)(this, SchemaTypeError);

        var _this4 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SchemaTypeError).call(this));

        _this4.message = 'SchemaTypeError: ' + type + ' while only supporting Array as Schema';
        _this4.name = 'SchemaTypeError';
        return _this4;
    }

    return SchemaTypeError;
}(Error);

var NoSuchColumnError = exports.NoSuchColumnError = function (_Error5) {
    (0, _inherits3.default)(NoSuchColumnError, _Error5);

    function NoSuchColumnError(column, columns) {
        (0, _classCallCheck3.default)(this, NoSuchColumnError);

        var _this5 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(NoSuchColumnError).call(this));

        _this5.message = 'NoSuchColumnError: ' + column + ' not found in [' + columns.join(', ') + ']';
        _this5.name = 'NoSuchColumnError';
        return _this5;
    }

    return NoSuchColumnError;
}(Error);

var NotTheSameSchemaError = exports.NotTheSameSchemaError = function (_Error6) {
    (0, _inherits3.default)(NotTheSameSchemaError, _Error6);

    function NotTheSameSchemaError(columns, expected) {
        (0, _classCallCheck3.default)(this, NotTheSameSchemaError);

        var _this6 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(NotTheSameSchemaError).call(this));

        _this6.message = 'NotTheSameSchemaError: [' + columns.join(', ') + '] while expecting [' + expected.join(', ') + ']';
        _this6.name = 'NotTheSameSchemaError';
        return _this6;
    }

    return NotTheSameSchemaError;
}(Error);

var NotTheSameColumnLengthsError = exports.NotTheSameColumnLengthsError = function (_Error7) {
    (0, _inherits3.default)(NotTheSameColumnLengthsError, _Error7);

    function NotTheSameColumnLengthsError(length, expected) {
        (0, _classCallCheck3.default)(this, NotTheSameColumnLengthsError);

        var _this7 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(NotTheSameColumnLengthsError).call(this));

        _this7.message = 'NotTheSameColumnLengthsError: [' + length + '] while expecting [' + expected + ']';
        _this7.name = 'NotTheSameColumnLengthsError';
        return _this7;
    }

    return NotTheSameColumnLengthsError;
}(Error);

var WrongMatrixStructureError = exports.WrongMatrixStructureError = function (_Error8) {
    (0, _inherits3.default)(WrongMatrixStructureError, _Error8);

    function WrongMatrixStructureError(structure, expected) {
        (0, _classCallCheck3.default)(this, WrongMatrixStructureError);

        var _this8 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(WrongMatrixStructureError).call(this));

        _this8.message = 'WrongMatrixStructureError: [' + structure.join(', ') + '] while expecting [' + expected.join(', ') + ']';
        _this8.name = 'WrongMatrixStructureError';
        return _this8;
    }

    return WrongMatrixStructureError;
}(Error);
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray'),
    _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2),
    _regenerator = require('babel-runtime/regenerator'),
    _regenerator2 = _interopRequireDefault(_regenerator),
    _getIterator2 = require('babel-runtime/core-js/get-iterator'),
    _getIterator3 = _interopRequireDefault(_getIterator2),
    _classCallCheck2 = require('babel-runtime/helpers/classCallCheck'),
    _classCallCheck3 = _interopRequireDefault(_classCallCheck2),
    _createClass2 = require('babel-runtime/helpers/createClass'),
    _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Benchmark = function () {
    function Benchmark() {
        (0, _classCallCheck3.default)(this, Benchmark);
    }

    (0, _createClass3.default)(Benchmark, [{
        key: '__benchmarks__',
        value: _regenerator2.default.mark(function __benchmarks__(func, repeats) {
            var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, bench, timer, diff;

            return _regenerator2.default.wrap(function __benchmarks__$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                            _context.prev = 1;
                            _iterator = (0, _getIterator3.default)(Array(repeats));

                        case 3:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _context.next = 12;
                                break;
                            }

                            bench = _step.value, timer = process.hrtime();

                            func(bench);
                            diff = process.hrtime(timer);
                            _context.next = 9;
                            return diff[0] * 1e9 + diff[1];

                        case 9:
                            _iteratorNormalCompletion = true;
                            _context.next = 3;
                            break;

                        case 12:
                            _context.next = 18;
                            break;

                        case 14:
                            _context.prev = 14;
                            _context.t0 = _context['catch'](1);
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
            }, __benchmarks__, this, [[1, 14, 18, 26], [19,, 21, 25]]);
        })
    }, {
        key: '_mean',
        value: function _mean(array) {
            return array.reduce(function (p, n) {
                return p + n;
            }, 0) / array.length;
        }
    }, {
        key: 'start',
        value: function start(func, repeats) {
            var benchmarkResult = this._mean([].concat((0, _toConsumableArray3.default)(this.__benchmarks__(func, repeats))));
            console.log('New benchmark: ' + benchmarkResult + ' nanoseconds');
            return benchmarkResult;
        }
    }, {
        key: 'compare',
        value: function compare(func1, func2, repeats) {
            var benchmarkResult1 = this.start(func1, repeats),
                benchmarkResult2 = this.start(func2, repeats);

            console.log('Most rapid function: ' + (benchmarkResult1 > benchmarkResult2 ? 'func2' : 'func1'));
            return [benchmarkResult1, benchmarkResult2];
        }
    }]);
    return Benchmark;
}();

exports.default = Benchmark;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Benchmark = exports.Row = exports.DataFrame = undefined;

var _dataframe = require('./dataframe.js'),
    _dataframe2 = _interopRequireDefault(_dataframe),
    _row = require('./row.js'),
    _row2 = _interopRequireDefault(_row),
    _stat = require('./modules/stat.js'),
    _stat2 = _interopRequireDefault(_stat),
    _matrix = require('./modules/matrix.js'),
    _matrix2 = _interopRequireDefault(_matrix),
    _benchmark = require('./extras/benchmark.js'),
    _benchmark2 = _interopRequireDefault(_benchmark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dataframe2.default.setDefaultModules(_stat2.default, _matrix2.default);

exports.DataFrame = _dataframe2.default;
exports.Row = _row2.default;
exports.Benchmark = _benchmark2.default;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys'),
    _keys2 = _interopRequireDefault(_keys),
    _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray'),
    _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2),
    _classCallCheck2 = require('babel-runtime/helpers/classCallCheck'),
    _classCallCheck3 = _interopRequireDefault(_classCallCheck2),
    _createClass2 = require('babel-runtime/helpers/createClass'),
    _createClass3 = _interopRequireDefault(_createClass2),
    _errors = require('../errors.js'),
    _reusables = require('../reusables.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Matrix module for DataFrame, providing basic mathematical matrix computations.
 */
var Matrix = function () {
    /**
     * Start the Matrix module.
     * @param {DataFrame} df An instance of DataFrame.
     */
    function Matrix(df) {
        (0, _classCallCheck3.default)(this, Matrix);

        this.df = df;
        this.name = 'matrix';
    }

    /**
     * Check if two DataFrames are commutative, if both have the same dimensions.
     * @param {Array} dfDim The second DataFrame dim to check.
     * @returns {Boolean} True if they are commutative, else false.
     */


    (0, _createClass3.default)(Matrix, [{
        key: 'isCommutative',
        value: function isCommutative(dfDim) {
            return (0, _reusables.arrayEqual)(this.df.dim(), dfDim, true);
        }

        /**
         * Provide an elements pairwise addition of two DataFrames having the same dimensions.
         * @param {DataFrame} df The second DataFrame to add.
         * @returns {DataFrame} A new DataFrame resulting to the addition two DataFrames.
         */

    }, {
        key: 'add',
        value: function add(df) {
            var _this = this;

            if (!this.isCommutative(df.dim())) {
                throw new _errors.WrongMatrixStructureError(this.df.dim(), df.dim());
            }
            var columns = [].concat((0, _toConsumableArray3.default)(Array(this.df.dim()[1]).keys()));
            return this.df.__newInstance__([].concat((0, _toConsumableArray3.default)((0, _reusables.iter)((0, _keys2.default)([].concat((0, _toConsumableArray3.default)(this.df))), function (rowKey) {
                var a = [].concat((0, _toConsumableArray3.default)(_this.df))[rowKey].toArray(),
                    b = [].concat((0, _toConsumableArray3.default)(df))[rowKey].toArray();

                return columns.map(function (column) {
                    return a[column] + b[column];
                });
            }))), this.df.listColumns());
        }

        /**
         * Provide a scalar product between a number and a DataFrame.
         * @param {Number} number The number to multiply.
         * @returns {DataFrame} A new DataFrame resulting to the scalar product.
         */

    }, {
        key: 'product',
        value: function product(number) {
            return this.df.map(function (row) {
                return row.toArray().map(function (column) {
                    return column * number;
                });
            });
        }

        /**
         * Multiply one DataFrame n x p and a second p x n.
         * @param {DataFrame} df The second DataFrame to multiply.
         * @returns {DataFrame} A new n x n DataFrame resulting to the product of two DataFrame.
         */

    }, {
        key: 'dot',
        value: function dot(df) {
            var _this2 = this;

            if (!this.isCommutative(df.dim().reverse())) {
                throw new _errors.WrongMatrixStructureError(this.df.dim(), df.dim().reverse());
            }
            var transposedDF = df.transpose(),
                columns = [].concat((0, _toConsumableArray3.default)(Array(this.df.dim()[0]).keys()));

            return this.df.__newInstance__([].concat((0, _toConsumableArray3.default)((0, _reusables.iter)((0, _keys2.default)([].concat((0, _toConsumableArray3.default)(this.df))), function (rowKey) {
                var a = [].concat((0, _toConsumableArray3.default)(_this2.df))[rowKey].toArray();
                return [].concat((0, _toConsumableArray3.default)((0, _reusables.iter)(columns, function (column) {
                    var b = [].concat((0, _toConsumableArray3.default)(transposedDF))[column].toArray();
                    return (0, _keys2.default)(b).reduce(function (p, n) {
                        return p + b[n] * a[n];
                    }, 0);
                })));
            }))), columns);
        }
    }]);
    return Matrix;
}();

exports.default = Matrix;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck'),
    _classCallCheck3 = _interopRequireDefault(_classCallCheck2),
    _createClass2 = require('babel-runtime/helpers/createClass'),
    _createClass3 = _interopRequireDefault(_createClass2),
    _reusables = require('../reusables.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Stat module for DataFrame, providing basic statistical metrics for numeric columns.
 */
var Stat = function () {
    /**
     * Start the Stat module.
     * @param {DataFrame} df An instance of DataFrame.
     */
    function Stat(df) {
        (0, _classCallCheck3.default)(this, Stat);

        this.df = df;
        this.name = 'stat';
    }

    /**
     * Compute the maximal value into a numeric column.
     * @param {String} columnName The column to evaluate, containing Numbers.
     * @returns {Number} The maximal value into the column.
     */


    (0, _createClass3.default)(Stat, [{
        key: 'max',
        value: function max(columnName) {
            return Number(this.df.reduce(function (p, n) {
                return (0, _reusables.isNumber)(n.get(columnName)) && n.get(columnName) > p ? n.get(columnName) : p;
            }, 0));
        }

        /**
         * Compute the minimal value into a numeric column.
         * @param {String} columnName The column to evalue, containing Numbers.
         * @returns {Number} The minimal value into the column.
         */

    }, {
        key: 'min',
        value: function min(columnName) {
            return Number(this.df.reduce(function (p, n) {
                return (0, _reusables.isNumber)(n.get(columnName)) && n.get(columnName) < p.get(columnName) ? n : p;
            }).get(columnName));
        }

        /**
         * Compute the mean value into a numeric column.
         * @param {String} columnName The column to evalue, containing Numbers.
         * @returns {Number} The mean value into the column.
         */

    }, {
        key: 'mean',
        value: function mean(columnName) {
            var numericDF = this.df.filter(function (row) {
                return (0, _reusables.isNumber)(row.get(columnName));
            });
            return Number(numericDF.reduce(function (p, n) {
                return p + n.get(columnName);
            }, 0)) / numericDF.count();
        }

        /**
         * Compute the variance into a numeric column.
         * @param {String} columnName The column to evalue, containing Numbers.
         * @param {Boolean} [population=false] Population mode. If true, provide the population variance, not the sample one.
         * @returns {Number} The variance into the column.
         */

    }, {
        key: 'var',
        value: function _var(columnName) {
            var population = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1],
                numericDF = this.df.filter(function (row) {
                return (0, _reusables.isNumber)(row.get(columnName));
            }),
                mean = this.mean(columnName);

            return Number(numericDF.reduce(function (p, n) {
                return p + Math.pow(n.get(columnName) - mean, 2);
            }, 0)) / (numericDF.count() - (population ? 0 : 1));
        }

        /**
         * Compute the standard deviation into a numeric column.
         * @param {String} columnName The column to evalue, containing Numbers.
         * @param {Boolean} [population=false] Population mode. If true, provide the population standard deviation, not the sample one.
         * @returns {Number} The standard deviation into the column.
         */

    }, {
        key: 'sd',
        value: function sd(columnName) {
            var population = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            return Math.sqrt(this.var(columnName, population));
        }

        /**
         * Compute all the stats available with the Stat module on a numeric column.
         * @param {String} columnName The column to evalue, containing Numbers.
         * @returns {Object} An dictionnary containing all statistical metrics available.
         */

    }, {
        key: 'stats',
        value: function stats(columnName) {
            return {
                mean: this.mean(columnName),
                min: this.min(columnName),
                max: this.max(columnName),
                var: this.var(columnName),
                varpop: this.var(columnName, true),
                sd: this.sd(columnName),
                sdpop: this.sd(columnName, true)
            };
        }
    }]);
    return Stat;
}();

exports.default = Stat;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator'),
    _getIterator3 = _interopRequireDefault(_getIterator2),
    _regenerator = require('babel-runtime/regenerator'),
    _regenerator2 = _interopRequireDefault(_regenerator),
    _set = require('babel-runtime/core-js/set'),
    _set2 = _interopRequireDefault(_set),
    _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray'),
    _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2),
    _keys = require('babel-runtime/core-js/object/keys'),
    _keys2 = _interopRequireDefault(_keys);

exports.asArray = asArray;
exports.isArrayOfType = isArrayOfType;
exports.isNumber = isNumber;
exports.arrayEqual = arrayEqual;
exports.transpose = transpose;
exports.makeGenerator = makeGenerator;
exports.match = match;
exports.iter = iter;
exports.chain = chain;
exports.saveFile = saveFile;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [makeGenerator, iter].map(_regenerator2.default.mark);

function asArray(x) {
    return Array.isArray(x) ? x : [x];
}

function isArrayOfType(value, ofType) {
    var index = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

    return value instanceof Array && value.hasOwnProperty(index) && (ofType === String ? typeof value[index] === 'string' : value[index] instanceof ofType) ? true : false;
}

function isNumber(x) {
    return !isNaN(parseFloat(x)) && isFinite(x);
}

function arrayEqual(a, b) {
    var byOrder = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

    return byOrder ? (0, _keys2.default)(a).map(function (x) {
        return a[x] === b[x];
    }).reduce(function (p, n) {
        return p ? n : p;
    }) : [].concat((0, _toConsumableArray3.default)(new _set2.default(a.filter(function (x) {
        return !new _set2.default(b).has(x);
    })))).length === 0;
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

function makeGenerator(x) {
    return _regenerator2.default.wrap(function makeGenerator$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    return _context.delegateYield(x, 't0', 1);

                case 1:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked[0], this);
}

function match(value) {
    for (var _len = arguments.length, cases = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        cases[_key - 1] = arguments[_key];
    }

    var casesGen = makeGenerator(cases),
        checker = function checker(nextCase) {
        return nextCase[0](value) ? nextCase[1](value) : checker(casesGen.next().value);
    };

    return checker(casesGen.next().value);
}

function iter(data, func) {
    var abort = arguments.length <= 2 || arguments[2] === undefined ? function () {
        return false;
    } : arguments[2],
        _iteratorNormalCompletion = void 0,
        _didIteratorError = void 0,
        _iteratorError = void 0,
        _iterator = void 0,
        _step = void 0,
        iteration = void 0,
        modifiedRow = void 0;

    return _regenerator2.default.wrap(function iter$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    _context2.prev = 1;
                    _iterator = (0, _getIterator3.default)(data);

                case 3:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                        _context2.next = 14;
                        break;
                    }

                    iteration = _step.value;

                    if (!abort()) {
                        _context2.next = 7;
                        break;
                    }

                    return _context2.abrupt('return');

                case 7:
                    modifiedRow = func(iteration);

                    if (!modifiedRow) {
                        _context2.next = 11;
                        break;
                    }

                    _context2.next = 11;
                    return modifiedRow;

                case 11:
                    _iteratorNormalCompletion = true;
                    _context2.next = 3;
                    break;

                case 14:
                    _context2.next = 20;
                    break;

                case 16:
                    _context2.prev = 16;
                    _context2.t0 = _context2['catch'](1);
                    _didIteratorError = true;
                    _iteratorError = _context2.t0;

                case 20:
                    _context2.prev = 20;
                    _context2.prev = 21;

                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }

                case 23:
                    _context2.prev = 23;

                    if (!_didIteratorError) {
                        _context2.next = 26;
                        break;
                    }

                    throw _iteratorError;

                case 26:
                    return _context2.finish(23);

                case 27:
                    return _context2.finish(20);

                case 28:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked[1], this, [[1, 16, 20, 28], [21,, 23, 27]]);
}

function chain(data) {
    for (var _len2 = arguments.length, operations = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        operations[_key2 - 1] = arguments[_key2];
    }

    return iter(data, operations.reduce(function (p, n) {
        return function (x) {
            var prev = p(x),
                next = prev ? n(prev) : false;

            return next === true ? prev : next;
        };
    }, function (x) {
        return x;
    }));
}

function saveFile(path, content) {
    require('fs').writeFile(path, content, function (err) {
        if (err) {
            throw new Error(err);
        }
    });
}
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _entries = require('babel-runtime/core-js/object/entries'),
    _entries2 = _interopRequireDefault(_entries),
    _is = require('babel-runtime/core-js/object/is'),
    _is2 = _interopRequireDefault(_is),
    _typeof2 = require('babel-runtime/helpers/typeof'),
    _typeof3 = _interopRequireDefault(_typeof2),
    _defineProperty2 = require('babel-runtime/helpers/defineProperty'),
    _defineProperty3 = _interopRequireDefault(_defineProperty2),
    _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray'),
    _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2),
    _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of'),
    _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf),
    _create = require('babel-runtime/core-js/object/create'),
    _create2 = _interopRequireDefault(_create),
    _assign = require('babel-runtime/core-js/object/assign'),
    _assign2 = _interopRequireDefault(_assign),
    _regenerator = require('babel-runtime/regenerator'),
    _regenerator2 = _interopRequireDefault(_regenerator),
    _values = require('babel-runtime/core-js/object/values'),
    _values2 = _interopRequireDefault(_values),
    _getIterator2 = require('babel-runtime/core-js/get-iterator'),
    _getIterator3 = _interopRequireDefault(_getIterator2),
    _iterator2 = require('babel-runtime/core-js/symbol/iterator'),
    _iterator3 = _interopRequireDefault(_iterator2),
    _freeze = require('babel-runtime/core-js/object/freeze'),
    _freeze2 = _interopRequireDefault(_freeze),
    _keys = require('babel-runtime/core-js/object/keys'),
    _keys2 = _interopRequireDefault(_keys),
    _classCallCheck2 = require('babel-runtime/helpers/classCallCheck'),
    _classCallCheck3 = _interopRequireDefault(_classCallCheck2),
    _createClass2 = require('babel-runtime/helpers/createClass'),
    _createClass3 = _interopRequireDefault(_createClass2),
    _symbol = require('babel-runtime/core-js/symbol'),
    _symbol2 = _interopRequireDefault(_symbol),
    _reusables = require('./reusables.js'),
    _errors = require('./errors.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __columns__ = (0, _symbol2.default)('columns'),
    __values__ = (0, _symbol2.default)('values');

/**
 * Row data structure used into the dataframe-js.
 */
var Row = function () {
    /**
     * Create a new Row.
     * @param {Array | Object | Row} data The data of the Row.
     * @param {Array} columns The DataFrame column names.
     */
    function Row(data, columns) {
        (0, _classCallCheck3.default)(this, Row);

        this[__columns__] = columns ? columns : (0, _keys2.default)(data);
        this[__values__] = (0, _freeze2.default)(this._build(data));
    }

    (0, _createClass3.default)(Row, [{
        key: _iterator3.default,
        value: _regenerator2.default.mark(function value() {
            var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, value;

            return _regenerator2.default.wrap(function value$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                            _context.prev = 1;
                            _iterator = (0, _getIterator3.default)((0, _values2.default)(this[__values__]));

                        case 3:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _context.next = 10;
                                break;
                            }

                            value = _step.value;
                            _context.next = 7;
                            return value;

                        case 7:
                            _iteratorNormalCompletion = true;
                            _context.next = 3;
                            break;

                        case 10:
                            _context.next = 16;
                            break;

                        case 12:
                            _context.prev = 12;
                            _context.t0 = _context['catch'](1);
                            _didIteratorError = true;
                            _iteratorError = _context.t0;

                        case 16:
                            _context.prev = 16;
                            _context.prev = 17;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 19:
                            _context.prev = 19;

                            if (!_didIteratorError) {
                                _context.next = 22;
                                break;
                            }

                            throw _iteratorError;

                        case 22:
                            return _context.finish(19);

                        case 23:
                            return _context.finish(16);

                        case 24:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, value, this, [[1, 12, 16, 24], [17,, 19, 23]]);
        })
    }, {
        key: '__newInstance__',
        value: function __newInstance__(data, columns) {
            var _Object$assign2;

            if (!(0, _reusables.arrayEqual)(this[__columns__], columns)) {
                return new Row(data, columns);
            }
            return (0, _assign2.default)((0, _create2.default)((0, _getPrototypeOf2.default)(this)), this, (_Object$assign2 = {}, (0, _defineProperty3.default)(_Object$assign2, __values__, data), (0, _defineProperty3.default)(_Object$assign2, __columns__, [].concat((0, _toConsumableArray3.default)(columns))), _Object$assign2));
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
            return _assign2.default.apply(Object, [{}].concat((0, _toConsumableArray3.default)(this[__columns__].map(function (column) {
                return (0, _defineProperty3.default)({}, column, object[column]);
            }))));
        }
    }, {
        key: '_fromArray',
        value: function _fromArray(array) {
            return _assign2.default.apply(Object, [{}].concat((0, _toConsumableArray3.default)((0, _entries2.default)(this[__columns__]).map(function (column) {
                return (0, _defineProperty3.default)({}, column[1], array[column[0]]);
            }))));
        }

        /**
         * Convert Row into dict / hash / object.
         * @returns {Object} The Row converted into dict.
         */

    }, {
        key: 'toDict',
        value: function toDict() {
            return (0, _assign2.default)({}, this[__values__]);
        }

        /**
         * Convert Row into Array, loosing column names.
         * @returns {Array} The Row values converted into Array.
         */

    }, {
        key: 'toArray',
        value: function toArray() {
            return [].concat((0, _toConsumableArray3.default)(this));
        }

        /**
         * Get the Row size.
         * @returns {Int} The Row length.
         */

    }, {
        key: 'size',
        value: function size() {
            return this[__columns__].length;
        }

        /**
         * Check if row contains a column.
         * @param {String} columnName The column to check.
         * @returns {Boolean} The presence or not of the column.
         */

    }, {
        key: 'has',
        value: function has(columnName) {
            return this[__columns__].includes(columnName);
        }

        /**
         * Select columns into the Row.
         * @param {...String} columnNames The columns to select.
         * @returns {Row} A new Row containing only the selected columns.
         */

    }, {
        key: 'select',
        value: function select() {
            var _this2 = this;

            for (var _len = arguments.length, columnNames = Array(_len), _key = 0; _key < _len; _key++) {
                columnNames[_key] = arguments[_key];
            }

            return this.__newInstance__(_assign2.default.apply(Object, [{}].concat((0, _toConsumableArray3.default)(columnNames.map(function (column) {
                return (0, _defineProperty3.default)({}, column, _this2.get(column));
            })))), columnNames);
        }

        /**
         * Get a Row value by its column.
         * @param {String} columnToGet The column value to get.
         * @returns The selected value.
         */

    }, {
        key: 'get',
        value: function get(columnToGet) {
            if (!this.has(columnToGet)) {
                throw new _errors.NoSuchColumnError(columnToGet, this[__columns__]);
            }
            return this[__values__][columnToGet];
        }

        /**
         * Set a Row value by its column, or create a new value if column doesn't exist.
         * @param {String} columnToSet The column value to set.
         * @returns {Row} A new Row with the modified / new value.
         */

    }, {
        key: 'set',
        value: function set(columnToSet, value) {
            var newRow = (0, _assign2.default)({}, this[__values__], (0, _defineProperty3.default)({}, columnToSet, value));
            return this.__newInstance__(newRow, (0, _keys2.default)(newRow));
        }

        /**
         * Delete a Row value by its column.
         * @param {String} columnToDel The column value to delete.
         * @returns {Row} A new Row without the deleted value.
         */

    }, {
        key: 'delete',
        value: function _delete(columnToDel) {
            if (!this.has(columnToDel)) {
                throw new _errors.NoSuchColumnError(columnToDel, this[__columns__]);
            }
            return this.select.apply(this, (0, _toConsumableArray3.default)(this[__columns__].filter(function (column) {
                return column !== columnToDel;
            })));
        }
    }]);
    return Row;
}();

exports.default = Row;
