var dfjs =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Benchmark = exports.Row = exports.DataFrame = undefined;

	var _dataframe = __webpack_require__(1);

	var _dataframe2 = _interopRequireDefault(_dataframe);

	var _row = __webpack_require__(148);

	var _row2 = _interopRequireDefault(_row);

	var _stat = __webpack_require__(152);

	var _stat2 = _interopRequireDefault(_stat);

	var _matrix = __webpack_require__(153);

	var _matrix2 = _interopRequireDefault(_matrix);

	var _benchmark = __webpack_require__(154);

	var _benchmark2 = _interopRequireDefault(_benchmark);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_dataframe2.default.defaultModules = [_stat2.default, _matrix2.default];

	exports.DataFrame = _dataframe2.default;
	exports.Row = _row2.default;
	exports.Benchmark = _benchmark2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _is = __webpack_require__(2);

	var _is2 = _interopRequireDefault(_is);

	var _stringify = __webpack_require__(21);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _entries = __webpack_require__(23);

	var _entries2 = _interopRequireDefault(_entries);

	var _values = __webpack_require__(43);

	var _values2 = _interopRequireDefault(_values);

	var _typeof2 = __webpack_require__(46);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _keys = __webpack_require__(83);

	var _keys2 = _interopRequireDefault(_keys);

	var _set = __webpack_require__(87);

	var _set2 = _interopRequireDefault(_set);

	var _defineProperty2 = __webpack_require__(106);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _getPrototypeOf = __webpack_require__(110);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _create = __webpack_require__(113);

	var _create2 = _interopRequireDefault(_create);

	var _regenerator = __webpack_require__(116);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _getIterator2 = __webpack_require__(120);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _iterator2 = __webpack_require__(47);

	var _iterator3 = _interopRequireDefault(_iterator2);

	var _assign = __webpack_require__(123);

	var _assign2 = _interopRequireDefault(_assign);

	var _toConsumableArray2 = __webpack_require__(127);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _slicedToArray2 = __webpack_require__(133);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	var _classCallCheck2 = __webpack_require__(137);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(138);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol = __webpack_require__(68);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _reusables = __webpack_require__(139);

	var _errors = __webpack_require__(141);

	var _row = __webpack_require__(148);

	var _row2 = _interopRequireDefault(_row);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __columns__ = (0, _symbol2.default)('columns');
	var __rows__ = (0, _symbol2.default)('rows');

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
	        (0, _classCallCheck3.default)(this, DataFrame);

	        var _build2 = this._build(data, columns);

	        var _build3 = (0, _slicedToArray3.default)(_build2, 2);

	        this[__rows__] = _build3[0];
	        this[__columns__] = _build3[1];

	        for (var _len = arguments.length, modules = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	            modules[_key - 2] = arguments[_key];
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
	                            _iteratorNormalCompletion = true;
	                            _didIteratorError = false;
	                            _iteratorError = undefined;
	                            _context.prev = 3;
	                            _iterator = (0, _getIterator3.default)(this[__rows__]);

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
	            var _this = this;

	            var df = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];

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
	                var _ref3 = (0, _slicedToArray3.default)(_ref2, 2);

	                var index = _ref3[0];
	                var column = _ref3[1];
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
	            var sep = arguments.length <= 0 || arguments[0] === undefined ? ';' : arguments[0];
	            var header = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	            var path = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

	            var csvContent = this.reduce(function (p, n) {
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
	            var header = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	            var path = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];

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
	            var path = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

	            var jsonContent = (0, _stringify2.default)(this.toDict());
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
	            var rows = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];
	            var quiet = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	            var makeRow = function makeRow(row) {
	                return '| ' + row.map(function (column) {
	                    return String(column).substring(0, 10) + Array(10 - String(column).length).join(' ');
	                }).join(' | ') + ' |';
	            };
	            var header = makeRow(this[__columns__]);
	            var token = 0;
	            var toShow = [header, Array(header.length).join('-')].concat((0, _toConsumableArray3.default)((0, _reusables.iter)(this[__rows__], function (row) {
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
	            for (var _len2 = arguments.length, rows = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                rows[_key2] = arguments[_key2];
	            }

	            return this.union(new DataFrame(rows, this[__columns__]));
	        }

	        /**
	         * Replace a value by another in the DataFrame or in a column.
	         * @param value The value to replace.
	         * @param replacement The new value.
	         * @param {...String} [columnNames=this[__columns__]] The columns to apply the replacement.
	         * @returns {DataFrame} A new DataFrame with replaced values.
	         */

	    }, {
	        key: 'replace',
	        value: function replace(value, replacement) {
	            for (var _len3 = arguments.length, columnNames = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
	                columnNames[_key3 - 2] = arguments[_key3];
	            }

	            var _this4 = this;

	            return this.map(function (row) {
	                return (columnNames.length > 0 ? columnNames : _this4[__columns__]).reduce(function (p, n) {
	                    return p.get(n) === value ? p.set(n, replacement) : p;
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
	            for (var _len4 = arguments.length, columnNames = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	                columnNames[_key4] = arguments[_key4];
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
	            for (var _len5 = arguments.length, funcs = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	                funcs[_key5] = arguments[_key5];
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
	                    var _ref6 = (0, _slicedToArray3.default)(_ref5, 2);

	                    var column = _ref6[0];
	                    var value = _ref6[1];
	                    return (0, _is2.default)(row.get(column), value);
	                }).reduce(function (p, n) {
	                    return p && n;
	                });
	            } : condition;
	            var filteredRows = [].concat((0, _toConsumableArray3.default)((0, _reusables.iter)(this[__rows__], function (row) {
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
	            var nRows = this.count() * percentage;
	            var token = 0;
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
	            var nRows = this.count() * percentage;
	            var token = 0;
	            var restRows = [];
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
	            var reverse = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	            var sortedRows = this[__rows__].sort(function (p, n) {
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
	            var _this6 = this;

	            var how = arguments.length <= 2 || arguments[2] === undefined ? 'full' : arguments[2];

	            var joinMethods = {
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
	            var newColumns = [].concat((0, _toConsumableArray3.default)(new _set2.default([].concat((0, _toConsumableArray3.default)(this[__columns__]), (0, _toConsumableArray3.default)(dfToJoin[__columns__])))));
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
	            var newColumns = [].concat((0, _toConsumableArray3.default)(new _set2.default([].concat((0, _toConsumableArray3.default)(this[__columns__]), (0, _toConsumableArray3.default)(dfToJoin[__columns__])))));
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
	            var newColumns = [].concat((0, _toConsumableArray3.default)(new _set2.default([].concat((0, _toConsumableArray3.default)(this[__columns__]), (0, _toConsumableArray3.default)(dfToJoin[__columns__])))));
	            var actualGroupedDFs = this.groupBy(on);
	            var groupedDFsToJoin = dfToJoin.groupBy(on);
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
	            var newColumns = [].concat((0, _toConsumableArray3.default)(new _set2.default([].concat((0, _toConsumableArray3.default)(this[__columns__]), (0, _toConsumableArray3.default)(dfToJoin[__columns__])))));
	            var actualGroupedDFs = this.groupBy(on);
	            var groupedDFsToJoin = dfToJoin.groupBy(on);
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	module.exports = __webpack_require__(7).Object.is;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.10 Object.is(value1, value2)
	var $export = __webpack_require__(5);
	$export($export.S, 'Object', {is: __webpack_require__(20)});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(6)
	  , core      = __webpack_require__(7)
	  , ctx       = __webpack_require__(8)
	  , hide      = __webpack_require__(10)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 6 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(9);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(11)
	  , createDesc = __webpack_require__(19);
	module.exports = __webpack_require__(15) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(12)
	  , IE8_DOM_DEFINE = __webpack_require__(14)
	  , toPrimitive    = __webpack_require__(18)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(15) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(13);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(15) && !__webpack_require__(16)(function(){
	  return Object.defineProperty(__webpack_require__(17)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(16)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(13)
	  , document = __webpack_require__(6).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(13);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(22), __esModule: true };

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(7)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(24), __esModule: true };

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(25);
	module.exports = __webpack_require__(7).Object.entries;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export  = __webpack_require__(5)
	  , $entries = __webpack_require__(26)(true);

	$export($export.S, 'Object', {
	  entries: function entries(it){
	    return $entries(it);
	  }
	});

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(27)
	  , toIObject = __webpack_require__(30)
	  , isEnum    = __webpack_require__(42).f;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(28)
	  , enumBugKeys = __webpack_require__(41);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(29)
	  , toIObject    = __webpack_require__(30)
	  , arrayIndexOf = __webpack_require__(34)(false)
	  , IE_PROTO     = __webpack_require__(38)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(31)
	  , defined = __webpack_require__(33);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(32);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(30)
	  , toLength  = __webpack_require__(35)
	  , toIndex   = __webpack_require__(37);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(36)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(36)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(39)('keys')
	  , uid    = __webpack_require__(40);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(6)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 42 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(44), __esModule: true };

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(45);
	module.exports = __webpack_require__(7).Object.values;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export = __webpack_require__(5)
	  , $values = __webpack_require__(26)(false);

	$export($export.S, 'Object', {
	  values: function values(it){
	    return $values(it);
	  }
	});

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(47);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(68);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(48), __esModule: true };

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(49);
	__webpack_require__(63);
	module.exports = __webpack_require__(67).f('iterator');

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(50)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(51)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(36)
	  , defined   = __webpack_require__(33);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(52)
	  , $export        = __webpack_require__(5)
	  , redefine       = __webpack_require__(53)
	  , hide           = __webpack_require__(10)
	  , has            = __webpack_require__(29)
	  , Iterators      = __webpack_require__(54)
	  , $iterCreate    = __webpack_require__(55)
	  , setToStringTag = __webpack_require__(59)
	  , getPrototypeOf = __webpack_require__(61)
	  , ITERATOR       = __webpack_require__(60)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(10);

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(56)
	  , descriptor     = __webpack_require__(19)
	  , setToStringTag = __webpack_require__(59)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(10)(IteratorPrototype, __webpack_require__(60)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(12)
	  , dPs         = __webpack_require__(57)
	  , enumBugKeys = __webpack_require__(41)
	  , IE_PROTO    = __webpack_require__(38)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(17)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(58).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(11)
	  , anObject = __webpack_require__(12)
	  , getKeys  = __webpack_require__(27);

	module.exports = __webpack_require__(15) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6).document && document.documentElement;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(11).f
	  , has = __webpack_require__(29)
	  , TAG = __webpack_require__(60)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(39)('wks')
	  , uid        = __webpack_require__(40)
	  , Symbol     = __webpack_require__(6).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(29)
	  , toObject    = __webpack_require__(62)
	  , IE_PROTO    = __webpack_require__(38)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(33);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(64);
	var global        = __webpack_require__(6)
	  , hide          = __webpack_require__(10)
	  , Iterators     = __webpack_require__(54)
	  , TO_STRING_TAG = __webpack_require__(60)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(65)
	  , step             = __webpack_require__(66)
	  , Iterators        = __webpack_require__(54)
	  , toIObject        = __webpack_require__(30);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(51)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(60);

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(69), __esModule: true };

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(70);
	__webpack_require__(80);
	__webpack_require__(81);
	__webpack_require__(82);
	module.exports = __webpack_require__(7).Symbol;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(6)
	  , has            = __webpack_require__(29)
	  , DESCRIPTORS    = __webpack_require__(15)
	  , $export        = __webpack_require__(5)
	  , redefine       = __webpack_require__(53)
	  , META           = __webpack_require__(71).KEY
	  , $fails         = __webpack_require__(16)
	  , shared         = __webpack_require__(39)
	  , setToStringTag = __webpack_require__(59)
	  , uid            = __webpack_require__(40)
	  , wks            = __webpack_require__(60)
	  , wksExt         = __webpack_require__(67)
	  , wksDefine      = __webpack_require__(72)
	  , keyOf          = __webpack_require__(73)
	  , enumKeys       = __webpack_require__(74)
	  , isArray        = __webpack_require__(76)
	  , anObject       = __webpack_require__(12)
	  , toIObject      = __webpack_require__(30)
	  , toPrimitive    = __webpack_require__(18)
	  , createDesc     = __webpack_require__(19)
	  , _create        = __webpack_require__(56)
	  , gOPNExt        = __webpack_require__(77)
	  , $GOPD          = __webpack_require__(79)
	  , $DP            = __webpack_require__(11)
	  , $keys          = __webpack_require__(27)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(78).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(42).f  = $propertyIsEnumerable;
	  __webpack_require__(75).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(52)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(10)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(40)('meta')
	  , isObject = __webpack_require__(13)
	  , has      = __webpack_require__(29)
	  , setDesc  = __webpack_require__(11).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(16)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(6)
	  , core           = __webpack_require__(7)
	  , LIBRARY        = __webpack_require__(52)
	  , wksExt         = __webpack_require__(67)
	  , defineProperty = __webpack_require__(11).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(27)
	  , toIObject = __webpack_require__(30);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(27)
	  , gOPS    = __webpack_require__(75)
	  , pIE     = __webpack_require__(42);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 75 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(32);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(30)
	  , gOPN      = __webpack_require__(78).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(28)
	  , hiddenKeys = __webpack_require__(41).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(42)
	  , createDesc     = __webpack_require__(19)
	  , toIObject      = __webpack_require__(30)
	  , toPrimitive    = __webpack_require__(18)
	  , has            = __webpack_require__(29)
	  , IE8_DOM_DEFINE = __webpack_require__(14)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(15) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 80 */
/***/ function(module, exports) {

	

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(72)('asyncIterator');

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(72)('observable');

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(84), __esModule: true };

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(85);
	module.exports = __webpack_require__(7).Object.keys;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(62)
	  , $keys    = __webpack_require__(27);

	__webpack_require__(86)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(5)
	  , core    = __webpack_require__(7)
	  , fails   = __webpack_require__(16);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(88), __esModule: true };

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(80);
	__webpack_require__(49);
	__webpack_require__(63);
	__webpack_require__(89);
	__webpack_require__(103);
	module.exports = __webpack_require__(7).Set;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(90);

	// 23.2 Set Objects
	module.exports = __webpack_require__(99)('Set', function(get){
	  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var dP          = __webpack_require__(11).f
	  , create      = __webpack_require__(56)
	  , redefineAll = __webpack_require__(91)
	  , ctx         = __webpack_require__(8)
	  , anInstance  = __webpack_require__(92)
	  , defined     = __webpack_require__(33)
	  , forOf       = __webpack_require__(93)
	  , $iterDefine = __webpack_require__(51)
	  , step        = __webpack_require__(66)
	  , setSpecies  = __webpack_require__(98)
	  , DESCRIPTORS = __webpack_require__(15)
	  , fastKey     = __webpack_require__(71).fastKey
	  , SIZE        = DESCRIPTORS ? '_s' : 'size';

	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};

	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = create(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        anInstance(this, C, 'forEach');
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)dP(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(10);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 92 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(8)
	  , call        = __webpack_require__(94)
	  , isArrayIter = __webpack_require__(95)
	  , anObject    = __webpack_require__(12)
	  , toLength    = __webpack_require__(35)
	  , getIterFn   = __webpack_require__(96)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(12);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(54)
	  , ITERATOR   = __webpack_require__(60)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(97)
	  , ITERATOR  = __webpack_require__(60)('iterator')
	  , Iterators = __webpack_require__(54);
	module.exports = __webpack_require__(7).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(32)
	  , TAG = __webpack_require__(60)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(6)
	  , core        = __webpack_require__(7)
	  , dP          = __webpack_require__(11)
	  , DESCRIPTORS = __webpack_require__(15)
	  , SPECIES     = __webpack_require__(60)('species');

	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global         = __webpack_require__(6)
	  , $export        = __webpack_require__(5)
	  , meta           = __webpack_require__(71)
	  , fails          = __webpack_require__(16)
	  , hide           = __webpack_require__(10)
	  , redefineAll    = __webpack_require__(91)
	  , forOf          = __webpack_require__(93)
	  , anInstance     = __webpack_require__(92)
	  , isObject       = __webpack_require__(13)
	  , setToStringTag = __webpack_require__(59)
	  , dP             = __webpack_require__(11).f
	  , each           = __webpack_require__(100)(0)
	  , DESCRIPTORS    = __webpack_require__(15);

	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    meta.NEED = true;
	  } else {
	    C = wrapper(function(target, iterable){
	      anInstance(target, C, NAME, '_c');
	      target._c = new Base;
	      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','),function(KEY){
	      var IS_ADDER = KEY == 'add' || KEY == 'set';
	      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
	        anInstance(this, C, KEY);
	        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
	        var result = this._c[KEY](a === 0 ? 0 : a, b);
	        return IS_ADDER ? this : result;
	      });
	    });
	    if('size' in proto)dP(C.prototype, 'size', {
	      get: function(){
	        return this._c.size;
	      }
	    });
	  }

	  setToStringTag(C, NAME);

	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F, O);

	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(8)
	  , IObject  = __webpack_require__(31)
	  , toObject = __webpack_require__(62)
	  , toLength = __webpack_require__(35)
	  , asc      = __webpack_require__(101);
	module.exports = function(TYPE, $create){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
	    , create        = $create || asc;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(102);

	module.exports = function(original, length){
	  return new (speciesConstructor(original))(length);
	};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(13)
	  , isArray  = __webpack_require__(76)
	  , SPECIES  = __webpack_require__(60)('species');

	module.exports = function(original){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(5);

	$export($export.P + $export.R, 'Set', {toJSON: __webpack_require__(104)('Set')});

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(97)
	  , from    = __webpack_require__(105);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var forOf = __webpack_require__(93);

	module.exports = function(iter, ITERATOR){
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(107);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(108), __esModule: true };

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(109);
	var $Object = __webpack_require__(7).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(5);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(15), 'Object', {defineProperty: __webpack_require__(11).f});

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(111), __esModule: true };

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(112);
	module.exports = __webpack_require__(7).Object.getPrototypeOf;

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(62)
	  , $getPrototypeOf = __webpack_require__(61);

	__webpack_require__(86)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(114), __esModule: true };

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(115);
	var $Object = __webpack_require__(7).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(5)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(56)});

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(117);


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// This method of obtaining a reference to the global object needs to be
	// kept identical to the way it is obtained in runtime.js
	var g =
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this;

	// Use `getOwnPropertyNames` because not all browsers support calling
	// `hasOwnProperty` on the global `self` object in a worker. See #183.
	var hadRuntime = g.regeneratorRuntime &&
	  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

	// Save the old regeneratorRuntime in case it needs to be restored later.
	var oldRuntime = hadRuntime && g.regeneratorRuntime;

	// Force reevalutation of runtime.js.
	g.regeneratorRuntime = undefined;

	module.exports = __webpack_require__(118);

	if (hadRuntime) {
	  // Restore the original runtime.
	  g.regeneratorRuntime = oldRuntime;
	} else {
	  // Remove the global property added by runtime.js.
	  try {
	    delete g.regeneratorRuntime;
	  } catch(e) {
	    g.regeneratorRuntime = undefined;
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */

	!(function(global) {
	  "use strict";

	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }

	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = Object.create((outerFn || Generator).prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  runtime.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function(arg) {
	    return new AwaitArgument(arg);
	  };

	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value instanceof AwaitArgument) {
	          return Promise.resolve(value.arg).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }

	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;

	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }

	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }

	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );

	          if (record.type === "throw") {
	            context.delegate = null;

	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }

	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;

	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }

	          context.delegate = null;
	        }

	        if (method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = arg;

	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }

	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }

	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          var info = {
	            value: record.arg,
	            done: context.done
	          };

	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp[toStringTagSymbol] = "Generator";

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;

	  function doneResult() {
	    return { value: undefined, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }

	      return ContinueSentinel;
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(119)))

/***/ },
/* 119 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(121), __esModule: true };

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(63);
	__webpack_require__(49);
	module.exports = __webpack_require__(122);

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(12)
	  , get      = __webpack_require__(96);
	module.exports = __webpack_require__(7).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(124), __esModule: true };

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(125);
	module.exports = __webpack_require__(7).Object.assign;

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(5);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(126)});

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(27)
	  , gOPS     = __webpack_require__(75)
	  , pIE      = __webpack_require__(42)
	  , toObject = __webpack_require__(62)
	  , IObject  = __webpack_require__(31)
	  , $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(16)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _from = __webpack_require__(128);

	var _from2 = _interopRequireDefault(_from);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(129), __esModule: true };

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(49);
	__webpack_require__(130);
	module.exports = __webpack_require__(7).Array.from;

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(8)
	  , $export        = __webpack_require__(5)
	  , toObject       = __webpack_require__(62)
	  , call           = __webpack_require__(94)
	  , isArrayIter    = __webpack_require__(95)
	  , toLength       = __webpack_require__(35)
	  , createProperty = __webpack_require__(131)
	  , getIterFn      = __webpack_require__(96);

	$export($export.S + $export.F * !__webpack_require__(132)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(11)
	  , createDesc      = __webpack_require__(19);

	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(60)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _isIterable2 = __webpack_require__(134);

	var _isIterable3 = _interopRequireDefault(_isIterable2);

	var _getIterator2 = __webpack_require__(120);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(135), __esModule: true };

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(63);
	__webpack_require__(49);
	module.exports = __webpack_require__(136);

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(97)
	  , ITERATOR  = __webpack_require__(60)('iterator')
	  , Iterators = __webpack_require__(54);
	module.exports = __webpack_require__(7).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 137 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(107);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getIterator2 = __webpack_require__(120);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _regenerator = __webpack_require__(116);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _set = __webpack_require__(87);

	var _set2 = _interopRequireDefault(_set);

	var _toConsumableArray2 = __webpack_require__(127);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _keys = __webpack_require__(83);

	var _keys2 = _interopRequireDefault(_keys);

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

	    var casesGen = makeGenerator(cases);
	    var checker = function checker(nextCase) {
	        return nextCase[0](value) ? nextCase[1](value) : checker(casesGen.next().value);
	    };
	    return checker(casesGen.next().value);
	}

	function iter(data, func) {
	    var abort = arguments.length <= 2 || arguments[2] === undefined ? function () {
	        return false;
	    } : arguments[2];

	    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, iteration, modifiedRow;

	    return _regenerator2.default.wrap(function iter$(_context2) {
	        while (1) {
	            switch (_context2.prev = _context2.next) {
	                case 0:
	                    _iteratorNormalCompletion = true;
	                    _didIteratorError = false;
	                    _iteratorError = undefined;
	                    _context2.prev = 3;
	                    _iterator = (0, _getIterator3.default)(data);

	                case 5:
	                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
	                        _context2.next = 16;
	                        break;
	                    }

	                    iteration = _step.value;

	                    if (!abort()) {
	                        _context2.next = 9;
	                        break;
	                    }

	                    return _context2.abrupt('return');

	                case 9:
	                    modifiedRow = func(iteration);

	                    if (!modifiedRow) {
	                        _context2.next = 13;
	                        break;
	                    }

	                    _context2.next = 13;
	                    return modifiedRow;

	                case 13:
	                    _iteratorNormalCompletion = true;
	                    _context2.next = 5;
	                    break;

	                case 16:
	                    _context2.next = 22;
	                    break;

	                case 18:
	                    _context2.prev = 18;
	                    _context2.t0 = _context2['catch'](3);
	                    _didIteratorError = true;
	                    _iteratorError = _context2.t0;

	                case 22:
	                    _context2.prev = 22;
	                    _context2.prev = 23;

	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }

	                case 25:
	                    _context2.prev = 25;

	                    if (!_didIteratorError) {
	                        _context2.next = 28;
	                        break;
	                    }

	                    throw _iteratorError;

	                case 28:
	                    return _context2.finish(25);

	                case 29:
	                    return _context2.finish(22);

	                case 30:
	                case 'end':
	                    return _context2.stop();
	            }
	        }
	    }, _marked[1], this, [[3, 18, 22, 30], [23,, 25, 29]]);
	}

	function chain(data) {
	    for (var _len2 = arguments.length, operations = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        operations[_key2 - 1] = arguments[_key2];
	    }

	    return iter(data, operations.reduce(function (p, n) {
	        return function (x) {
	            var prev = p(x);
	            var next = prev ? n(prev) : false;
	            return next === true ? prev : next;
	        };
	    }, function (x) {
	        return x;
	    }));
	}

	function saveFile(path, content) {
	    __webpack_require__(140).writeFile(path, content, function (err) {
	        if (err) {
	            throw new Error(err);
	        }
	    });
	}

/***/ },
/* 140 */
/***/ function(module, exports) {

	

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.WrongMatrixStructureError = exports.NotTheSameColumnLengthsError = exports.NotTheSameSchemaError = exports.NoSuchColumnError = exports.SchemaTypeError = exports.SchemaError = exports.EmptyInputError = exports.InputTypeError = undefined;

	var _typeof2 = __webpack_require__(46);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _getPrototypeOf = __webpack_require__(110);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(137);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(142);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(143);

	var _inherits3 = _interopRequireDefault(_inherits2);

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

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(46);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(144);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(113);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(46);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(145), __esModule: true };

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(146);
	module.exports = __webpack_require__(7).Object.setPrototypeOf;

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(5);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(147).set});

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(13)
	  , anObject = __webpack_require__(12);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(8)(Function.call, __webpack_require__(79).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _entries = __webpack_require__(23);

	var _entries2 = _interopRequireDefault(_entries);

	var _is = __webpack_require__(2);

	var _is2 = _interopRequireDefault(_is);

	var _typeof2 = __webpack_require__(46);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _defineProperty2 = __webpack_require__(106);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _toConsumableArray2 = __webpack_require__(127);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _getPrototypeOf = __webpack_require__(110);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _create = __webpack_require__(113);

	var _create2 = _interopRequireDefault(_create);

	var _assign = __webpack_require__(123);

	var _assign2 = _interopRequireDefault(_assign);

	var _regenerator = __webpack_require__(116);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _values = __webpack_require__(43);

	var _values2 = _interopRequireDefault(_values);

	var _getIterator2 = __webpack_require__(120);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _iterator2 = __webpack_require__(47);

	var _iterator3 = _interopRequireDefault(_iterator2);

	var _freeze = __webpack_require__(149);

	var _freeze2 = _interopRequireDefault(_freeze);

	var _keys = __webpack_require__(83);

	var _keys2 = _interopRequireDefault(_keys);

	var _classCallCheck2 = __webpack_require__(137);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(138);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol = __webpack_require__(68);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _reusables = __webpack_require__(139);

	var _errors = __webpack_require__(141);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __columns__ = (0, _symbol2.default)('columns');
	var __values__ = (0, _symbol2.default)('values');

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
	                            _iteratorNormalCompletion = true;
	                            _didIteratorError = false;
	                            _iteratorError = undefined;
	                            _context.prev = 3;
	                            _iterator = (0, _getIterator3.default)((0, _values2.default)(this[__values__]));

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

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(150), __esModule: true };

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(151);
	module.exports = __webpack_require__(7).Object.freeze;

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.5 Object.freeze(O)
	var isObject = __webpack_require__(13)
	  , meta     = __webpack_require__(71).onFreeze;

	__webpack_require__(86)('freeze', function($freeze){
	  return function freeze(it){
	    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
	  };
	});

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classCallCheck2 = __webpack_require__(137);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(138);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _reusables = __webpack_require__(139);

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
	            var population = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	            var numericDF = this.df.filter(function (row) {
	                return (0, _reusables.isNumber)(row.get(columnName));
	            });
	            var mean = this.mean(columnName);
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

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _keys = __webpack_require__(83);

	var _keys2 = _interopRequireDefault(_keys);

	var _toConsumableArray2 = __webpack_require__(127);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _classCallCheck2 = __webpack_require__(137);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(138);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _errors = __webpack_require__(141);

	var _reusables = __webpack_require__(139);

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
	                var a = [].concat((0, _toConsumableArray3.default)(_this.df))[rowKey].toArray();
	                var b = [].concat((0, _toConsumableArray3.default)(df))[rowKey].toArray();
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
	            var transposedDF = df.transpose();
	            var columns = [].concat((0, _toConsumableArray3.default)(Array(this.df.dim()[0]).keys()));
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

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _toConsumableArray2 = __webpack_require__(127);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _regenerator = __webpack_require__(116);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _getIterator2 = __webpack_require__(120);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(137);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(138);

	var _createClass3 = _interopRequireDefault(_createClass2);

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
	                            _iteratorNormalCompletion = true;
	                            _didIteratorError = false;
	                            _iteratorError = undefined;
	                            _context.prev = 3;
	                            _iterator = (0, _getIterator3.default)(Array(repeats));

	                        case 5:
	                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
	                                _context.next = 15;
	                                break;
	                            }

	                            bench = _step.value;
	                            timer = process.hrtime();

	                            func(bench);
	                            diff = process.hrtime(timer);
	                            _context.next = 12;
	                            return diff[0] * 1e9 + diff[1];

	                        case 12:
	                            _iteratorNormalCompletion = true;
	                            _context.next = 5;
	                            break;

	                        case 15:
	                            _context.next = 21;
	                            break;

	                        case 17:
	                            _context.prev = 17;
	                            _context.t0 = _context['catch'](3);
	                            _didIteratorError = true;
	                            _iteratorError = _context.t0;

	                        case 21:
	                            _context.prev = 21;
	                            _context.prev = 22;

	                            if (!_iteratorNormalCompletion && _iterator.return) {
	                                _iterator.return();
	                            }

	                        case 24:
	                            _context.prev = 24;

	                            if (!_didIteratorError) {
	                                _context.next = 27;
	                                break;
	                            }

	                            throw _iteratorError;

	                        case 27:
	                            return _context.finish(24);

	                        case 28:
	                            return _context.finish(21);

	                        case 29:
	                        case 'end':
	                            return _context.stop();
	                    }
	                }
	            }, __benchmarks__, this, [[3, 17, 21, 29], [22,, 24, 28]]);
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
	            var benchmarkResult1 = this.start(func1, repeats);
	            var benchmarkResult2 = this.start(func2, repeats);

	            console.log('Most rapid function: ' + (benchmarkResult1 > benchmarkResult2 ? 'func2' : 'func1'));
	            return [benchmarkResult1, benchmarkResult2];
	        }
	    }]);
	    return Benchmark;
	}();

	exports.default = Benchmark;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(119)))

/***/ }
/******/ ]);