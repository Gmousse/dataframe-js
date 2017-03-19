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

	var _row = __webpack_require__(164);

	var _row2 = _interopRequireDefault(_row);

	var _stat = __webpack_require__(171);

	var _stat2 = _interopRequireDefault(_stat);

	var _matrix = __webpack_require__(172);

	var _matrix2 = _interopRequireDefault(_matrix);

	var _sql = __webpack_require__(173);

	var _sql2 = _interopRequireDefault(_sql);

	var _benchmark = __webpack_require__(175);

	var _benchmark2 = _interopRequireDefault(_benchmark);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	_dataframe2['default'].setDefaultModules(_stat2['default'], _matrix2['default'], _sql2['default']);
	_dataframe2['default'].sql = _sql2['default'];

	exports.DataFrame = _dataframe2['default'];
	exports.Row = _row2['default'];
	exports.Benchmark = _benchmark2['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getOwnPropertyDescriptor = __webpack_require__(2);

	var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

	var _is = __webpack_require__(28);

	var _is2 = _interopRequireDefault(_is);

	var _typeof2 = __webpack_require__(32);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _stringify = __webpack_require__(78);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _entries = __webpack_require__(80);

	var _entries2 = _interopRequireDefault(_entries);

	var _values = __webpack_require__(84);

	var _values2 = _interopRequireDefault(_values);

	var _keys = __webpack_require__(87);

	var _keys2 = _interopRequireDefault(_keys);

	var _set = __webpack_require__(90);

	var _set2 = _interopRequireDefault(_set);

	var _defineProperty2 = __webpack_require__(109);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _getPrototypeOf = __webpack_require__(113);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _create = __webpack_require__(116);

	var _create2 = _interopRequireDefault(_create);

	var _regenerator = __webpack_require__(119);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _getIterator2 = __webpack_require__(123);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _iterator2 = __webpack_require__(33);

	var _iterator3 = _interopRequireDefault(_iterator2);

	var _assign = __webpack_require__(126);

	var _assign2 = _interopRequireDefault(_assign);

	var _toConsumableArray2 = __webpack_require__(130);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _slicedToArray2 = __webpack_require__(136);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	var _promise = __webpack_require__(140);

	var _promise2 = _interopRequireDefault(_promise);

	var _classCallCheck2 = __webpack_require__(147);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(148);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol = __webpack_require__(64);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _dec, _dec2, _dec3, _dec4, _dec5, _desc, _value, _class;

	var _es7ChecktypesDecorator = __webpack_require__(149);

	var _d3Request = __webpack_require__(157);

	var _d3Dsv = __webpack_require__(160);

	var _reusables = __webpack_require__(161);

	var _errors = __webpack_require__(163);

	var _row = __webpack_require__(164);

	var _row2 = _interopRequireDefault(_row);

	var _groupedDataframe = __webpack_require__(168);

	var _groupedDataframe2 = _interopRequireDefault(_groupedDataframe);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	    var desc = {};
	    Object['ke' + 'ys'](descriptor).forEach(function (key) {
	        desc[key] = descriptor[key];
	    });
	    desc.enumerable = !!desc.enumerable;
	    desc.configurable = !!desc.configurable;

	    if ('value' in desc || desc.initializer) {
	        desc.writable = true;
	    }

	    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
	        return decorator(target, property, desc) || desc;
	    }, desc);

	    if (context && desc.initializer !== void 0) {
	        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
	        desc.initializer = undefined;
	    }

	    if (desc.initializer === void 0) {
	        Object['define' + 'Property'](target, property, desc);
	        desc = null;
	    }

	    return desc;
	}

	var __columns__ = (0, _symbol2['default'])('columns');
	var __rows__ = (0, _symbol2['default'])('rows');

	/**
	 * DataFrame data structure providing an immutable, flexible and powerfull way to manipulate data with columns and rows.
	 */
	var DataFrame = (_dec = (0, _es7ChecktypesDecorator.checktypes)(['String', 'File'], 'String'), _dec2 = (0, _es7ChecktypesDecorator.checktypes)(['String', 'File']), _dec3 = (0, _es7ChecktypesDecorator.checktypes)(['String', 'File']), _dec4 = (0, _es7ChecktypesDecorator.checktypes)(['DataFrame', Array, Object]), _dec5 = (0, _es7ChecktypesDecorator.checktypes)('DataFrame', ['Array', 'String']), (_class = function () {
	    (0, _createClass3['default'])(DataFrame, null, [{
	        key: 'setDefaultModules',


	        /**
	         * Set the default modules used in DataFrame instances.
	         * @param {...Object} defaultModules DataFrame modules used by default.
	         * @example
	         * DataFrame.setDefaultModules(SQL, Stat)
	         */
	        value: function setDefaultModules() {
	            for (var _len = arguments.length, defaultModules = Array(_len), _key = 0; _key < _len; _key++) {
	                defaultModules[_key] = arguments[_key];
	            }

	            DataFrame.defaultModules = defaultModules;
	        }
	    }, {
	        key: 'fromText',

	        /**
	         * Create a DataFrame from a Text file. It returns a Promise.
	         * @param {String | File} pathOrFile A path to the file (url or local) or a browser File object.
	         * @param {String} sep The separator used to parse the file.
	         * @param {Boolean} [header=true] A boolean indicating if the text has a header or not.
	         * @example
	         * DataFrame.fromText('http://myurl/myfile.txt').then(df => df.show())
	         * // In browser Only
	         * DataFrame.fromText(myFile).then(df => df.show())
	         * // From node.js only Only
	         * DataFrame.fromText('/my/absolue/path/myfile.txt').then(df => df.show())
	         * DataFrame.fromText('/my/absolue/path/myfile.txt', ';', true).then(df => df.show())
	         */
	        value: function fromText(pathOrFile) {
	            var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ';';
	            var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	            var parser = (0, _d3Dsv.dsvFormat)(sep);
	            return new _promise2['default'](function (resolve) {
	                var parseText = function parseText(txt) {
	                    var data = header ? parser.parse(txt) : parser.parseRows(txt);
	                    resolve(new DataFrame(data, data.columns));
	                };
	                return typeof pathOrFile === 'string' ? (0, _d3Request.text)((0, _reusables.addFileProtocol)(pathOrFile), parseText) : (0, _reusables.loadTextFile)(pathOrFile, parseText);
	            });
	        }
	    }, {
	        key: 'fromCSV',

	        /**
	         * Create a DataFrame from a CSV file. It returns a Promise.
	         * @param {String | File} pathOrFile A path to the file (url or local) or a browser File object.
	         * @param {Boolean} [header=true] A boolean indicating if the csv has a header or not.
	         * @example
	         * DataFrame.fromCSV('http://myurl/myfile.csv').then(df => df.show())
	         * // For browser only
	         * DataFrame.fromCSV(myFile).then(df => df.show())
	         * // From node.js only
	         * DataFrame.fromCSV('/my/absolue/path/myfile.csv').then(df => df.show())
	         * DataFrame.fromCSV('/my/absolue/path/myfile.csv', true).then(df => df.show())
	         */
	        value: function fromCSV(pathOrFile) {
	            var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	            return new _promise2['default'](function (resolve) {
	                var parseCSV = function parseCSV(txt) {
	                    var data = header ? (0, _d3Dsv.csvParse)(txt) : (0, _d3Dsv.csvParseRows)(txt);
	                    resolve(new DataFrame(data, data.columns));
	                };
	                return typeof pathOrFile === 'string' ? (0, _d3Request.text)((0, _reusables.addFileProtocol)(pathOrFile), parseCSV) : (0, _reusables.loadTextFile)(pathOrFile, parseCSV);
	            });
	        }
	    }, {
	        key: 'fromJSON',

	        /**
	         * Create a DataFrame from a JSON file. It returns a Promise.
	         * @param {String | File} pathOrFile A path to the file (url or local) or a browser File object.
	         * @example
	         * DataFrame.fromJSON('http://myurl/myfile.json').then(df => df.show())
	         * // For browser only
	         * DataFrame.fromJSON(myFile).then(df => df.show())
	         * // From node.js only
	         * DataFrame.fromJSON('/my/absolute/path/myfile.json').then(df => df.show())
	         */
	        value: function fromJSON(pathOrFile) {
	            return new _promise2['default'](function (resolve) {
	                var parseJSON = function parseJSON(dict) {
	                    return resolve(new DataFrame(dict));
	                };
	                return typeof pathOrFile === 'string' ? (0, _d3Request.json)((0, _reusables.addFileProtocol)(pathOrFile), parseJSON) : (0, _reusables.loadTextFile)(pathOrFile, function (txt) {
	                    return parseJSON(JSON.parse(txt));
	                });
	            });
	        }

	        /**
	         * Create a new DataFrame.
	         * @param {Array | Object | DataFrame} data The data of the DataFrame.
	         * @param {Array} columns The DataFrame column names.
	         * @param {...Object} [modules] Additional modules.
	         * @example
	         * new DataFrame({
	         *      'column1': [3, 6, 8],
	         *      'column2': [3, 4, 5, 6],
	         * }, ['column1', 'column2'])
	         *
	         * new Data Frame([
	         *      [1, 6, 9, 10, 12],
	         *      [1, 2],
	         *      [6, 6, 9, 8, 9, 12],
	         * ], ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'])
	         *
	         * new DataFrame([
	         *      {c1: 1, c2: 6, c3: 9, c4: 10, c5: 12},
	         *      {c4: 1, c3: 2},
	         *      {c1: 6, c5: 6, c2: 9, c4: 8, c3: 9, c6: 12},
	         * ], ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'])
	         *
	         * new DataFrame(df);
	         */

	    }]);

	    function DataFrame(data, columns) {
	        (0, _classCallCheck3['default'])(this, DataFrame);

	        var _build2 = this._build(data, columns);

	        var _build3 = (0, _slicedToArray3['default'])(_build2, 2);

	        this[__rows__] = _build3[0];
	        this[__columns__] = _build3[1];

	        var defaultModulesNames = DataFrame.defaultModules ? DataFrame.defaultModules.map(function (defaultModule) {
	            return defaultModule.name;
	        }) : [];

	        for (var _len2 = arguments.length, modules = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	            modules[_key2 - 2] = arguments[_key2];
	        }

	        this.modules = [].concat((0, _toConsumableArray3['default'])(DataFrame.defaultModules ? DataFrame.defaultModules : []), (0, _toConsumableArray3['default'])(modules.filter(function (module) {
	            return !defaultModulesNames.includes(module.name);
	        })));
	        _assign2['default'].apply(Object, [this].concat((0, _toConsumableArray3['default'])(this.__instanciateModules__(this.modules))));
	    }

	    (0, _createClass3['default'])(DataFrame, [{
	        key: _iterator3['default'],
	        value: _regenerator2['default'].mark(function value() {
	            var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, row;

	            return _regenerator2['default'].wrap(function value$(_context) {
	                while (1) {
	                    switch (_context.prev = _context.next) {
	                        case 0:
	                            _iteratorNormalCompletion = true;
	                            _didIteratorError = false;
	                            _iteratorError = undefined;
	                            _context.prev = 3;
	                            _iterator = (0, _getIterator3['default'])(this[__rows__]);

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

	            if (!(0, _reusables.arrayEqual)(columns, this[__columns__], true) || !(data[0] instanceof _row2['default'])) {
	                return new (Function.prototype.bind.apply(DataFrame, [null].concat([data, columns], (0, _toConsumableArray3['default'])(this.modules))))();
	            }
	            var newInstance = (0, _assign2['default'])((0, _create2['default'])((0, _getPrototypeOf2['default'])(this)), this, (_Object$assign2 = {}, (0, _defineProperty3['default'])(_Object$assign2, __rows__, [].concat((0, _toConsumableArray3['default'])(data))), (0, _defineProperty3['default'])(_Object$assign2, __columns__, [].concat((0, _toConsumableArray3['default'])(columns))), _Object$assign2));
	            return _assign2['default'].apply(Object, [newInstance].concat((0, _toConsumableArray3['default'])(this.__instanciateModules__(this.modules, newInstance))));
	        }
	    }, {
	        key: '__instanciateModules__',
	        value: function __instanciateModules__(modules) {
	            var _this = this;

	            var df = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

	            return modules.map(function (Plugin) {
	                var pluginInstance = new Plugin(df ? df : _this);
	                return (0, _defineProperty3['default'])({}, pluginInstance.name, pluginInstance);
	            });
	        }
	    }, {
	        key: '_build',
	        value: function _build(data, columns) {
	            var _this2 = this;

	            return (0, _reusables.match)(data, [function (value) {
	                return value instanceof DataFrame;
	            }, function () {
	                return _this2._fromArray([].concat((0, _toConsumableArray3['default'])(data[__rows__])), columns ? columns : data[__columns__]);
	            }], [function (value) {
	                return value instanceof Array;
	            }, function () {
	                return _this2._fromArray(data, columns ? columns : [].concat((0, _toConsumableArray3['default'])(new _set2['default'](data.map(function (row) {
	                    return (0, _keys2['default'])(row);
	                }).reduce(function (p, n) {
	                    return [].concat((0, _toConsumableArray3['default'])(p), (0, _toConsumableArray3['default'])(n));
	                })))));
	            }], [function (value) {
	                return value instanceof Object;
	            }, function () {
	                return _this2._fromDict(data, columns ? columns : (0, _keys2['default'])(data));
	            }]);
	        }
	    }, {
	        key: '_fromDict',
	        value: function _fromDict(dict, columns) {
	            return [(0, _reusables.transpose)((0, _values2['default'])(dict)).map(function (row) {
	                return new _row2['default'](row, columns);
	            }), columns];
	        }
	    }, {
	        key: '_fromArray',
	        value: function _fromArray(array, columns) {
	            return [array.map(function (row) {
	                return new _row2['default'](row, columns);
	            }), columns];
	        }
	    }, {
	        key: '_joinByType',
	        value: function _joinByType(gdf1, gdf2, type, newColumns) {
	            var _this3 = this;

	            var gdf2Hashs = gdf2.listHashs();
	            return gdf1.toCollection().map(function (_ref2) {
	                var group = _ref2.group,
	                    hash = _ref2.hash;

	                var isContained = gdf2Hashs.includes(hash);
	                var modifiedGroup = group;
	                if (gdf2.get(hash)) {
	                    var gdf2Collection = gdf2.get(hash).group.toCollection();
	                    var combinedGroup = group.toCollection().map(function (row) {
	                        return gdf2Collection.map(function (row2) {
	                            return (0, _assign2['default'])({}, row2, row);
	                        });
	                    }).reduce(function (p, n) {
	                        return [].concat((0, _toConsumableArray3['default'])(p), (0, _toConsumableArray3['default'])(n));
	                    }, []);
	                    modifiedGroup = _this3.__newInstance__(combinedGroup, newColumns);
	                }
	                var filterCondition = function filterCondition(bool) {
	                    return bool ? modifiedGroup : false;
	                };
	                if (type === 'full') return modifiedGroup;
	                return type === 'out' ? filterCondition(!isContained) : filterCondition(isContained);
	            }).filter(function (group) {
	                return group;
	            });
	        }
	    }, {
	        key: '_join',
	        value: function _join(dfToJoin, columnNames, types) {
	            var newColumns = [].concat((0, _toConsumableArray3['default'])(new _set2['default']([].concat((0, _toConsumableArray3['default'])(this.listColumns()), (0, _toConsumableArray3['default'])(dfToJoin.listColumns())))));
	            var columns = Array.isArray(columnNames) ? columnNames : [columnNames];
	            var gdf = this.groupBy.apply(this, (0, _toConsumableArray3['default'])(columns));
	            var gdfToJoin = dfToJoin.groupBy.apply(dfToJoin, (0, _toConsumableArray3['default'])(columns));
	            return [this.__newInstance__([], newColumns)].concat((0, _toConsumableArray3['default'])((0, _reusables.iter)([].concat((0, _toConsumableArray3['default'])(types[0] ? this._joinByType(gdf, gdfToJoin, types[0], newColumns) : []), (0, _toConsumableArray3['default'])(types[1] ? this._joinByType(gdfToJoin, gdf, types[1], newColumns) : [])), function (group) {
	                return group.restructure(newColumns);
	            }))).reduce(function (p, n) {
	                return p.union(n);
	            });
	        }
	    }, {
	        key: '_cleanSavePath',
	        value: function _cleanSavePath(path) {
	            return path.replace('file://', '/');
	        }

	        /**
	         * Convert DataFrame into dict / hash / object.
	         * @returns {Object} The DataFrame converted into dict.
	         * @example
	         * df.toDict()
	         */

	    }, {
	        key: 'toDict',
	        value: function toDict() {
	            var _this4 = this;

	            return _assign2['default'].apply(Object, [{}].concat((0, _toConsumableArray3['default'])((0, _entries2['default'])(this.transpose().toArray()).map(function (_ref3) {
	                var _ref4 = (0, _slicedToArray3['default'])(_ref3, 2),
	                    index = _ref4[0],
	                    column = _ref4[1];

	                return (0, _defineProperty3['default'])({}, _this4[__columns__][index], column);
	            }))));
	        }

	        /**
	         * Convert DataFrame into Array of Arrays. You can also extract only one column as Array.
	         * @param {String} [columnName] Column Name to extract. By default, all columns are transformed.
	         * @returns {Array} The DataFrame (or the column) converted into Array.
	         * @example
	         * df.toArray()
	         */

	    }, {
	        key: 'toArray',
	        value: function toArray(columnName) {
	            return columnName ? [].concat((0, _toConsumableArray3['default'])(this)).map(function (row) {
	                return row.get(columnName);
	            }) : [].concat((0, _toConsumableArray3['default'])(this)).map(function (row) {
	                return row.toArray();
	            });
	        }

	        /**
	         * Convert DataFrame into Array of dictionnaries. You can also return Rows instead of dictionnaries.
	         * @param {Boolean} [ofRows] Return a collection of Rows instead of dictionnaries.
	         * @returns {Array} The DataFrame converted into Array of dictionnaries (or Rows).
	         * @example
	         * df.toCollection()
	         */

	    }, {
	        key: 'toCollection',
	        value: function toCollection(ofRows) {
	            return ofRows ? [].concat((0, _toConsumableArray3['default'])(this)) : [].concat((0, _toConsumableArray3['default'])(this)).map(function (row) {
	                return row.toDict();
	            });
	        }

	        /**
	         * Convert the DataFrame into a text string. You can also save the file if you are using nodejs.
	         * @param {String} [sep=' '] Column separator.
	         * @param {Boolean} [header=true] Writing the header in the first line. If false, there will be no header.
	         * @param {String} [path] The path to save the file. /!\ Works only on node.js, not into the browser.
	         * @returns {String} The text file in raw string.
	         * @example
	         * df.toText()
	         * df.toText(';')
	         * df.toText(';', true)
	         * // From node.js only
	         * df.toText(';', true, '/my/absolute/path/dataframe.txt')
	         */

	    }, {
	        key: 'toText',
	        value: function toText() {
	            var sep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ';';
	            var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	            var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

	            var csvContent = this.reduce(function (p, n) {
	                return '' + (p ? p + '\n' : '') + n.toArray().join(sep);
	            }, header ? this[__columns__].join(sep) : '');
	            if (path) {
	                (0, _reusables.saveFile)(this._cleanSavePath(path), csvContent);
	            }
	            return csvContent;
	        }

	        /**
	         * Convert the DataFrame into a csv string. You can also save the file if you are using nodejs.
	         * @param {Boolean} [header=true] Writing the header in the first line. If false, there will be no header.
	         * @param {String} [path] The path to save the file. /!\ Works only on node.js, not into the browser.
	         * @returns {String} The csv file in raw string.
	         * @example
	         * df.toCSV()
	         * df.toCSV(true)
	         * // From node.js only
	         * df.toCSV(true, '/my/absolute/path/dataframe.csv')
	         */

	    }, {
	        key: 'toCSV',
	        value: function toCSV() {
	            var header = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	            var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

	            return this.toText(',', header, path);
	        }

	        /**
	         * Convert the DataFrame into a json string. You can also save the file if you are using nodejs.
	         * @param {Boolean} [asCollection=true] Writing the JSON as collection of Object.
	         * @param {String} [path] The path to save the file. /!\ Works only on node.js, not into the browser.
	         * @returns {String} The json file in raw string.
	         * @example
	         * df.toJSON()
	         * // From node.js only
	         * df.toJSON('/my/absolute/path/dataframe.json')
	         */

	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            var asCollection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	            var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

	            var jsonContent = (0, _stringify2['default'])(asCollection ? this.toCollection() : this.toDict());
	            if (path) {
	                (0, _reusables.saveFile)(this._cleanSavePath(path), jsonContent);
	            }
	            return jsonContent;
	        }

	        /**
	         * Display the DataFrame as String Table. Can only return a sring instead of displaying the DataFrame.
	         * @param {Number} [rows=10] The number of lines to display.
	         * @param {Boolean} [quiet=false] Quiet mode. If true, only returns a string instead of console.log().
	         * @returns {String} The DataFrame as String Table.
	         * @example
	         * df.show()
	         * df.show(10)
	         * const stringDF = df.show(10, true)
	         */

	    }, {
	        key: 'show',
	        value: function show() {
	            var rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
	            var quiet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	            var makeRow = function makeRow(row) {
	                return '| ' + row.map(function (column) {
	                    var columnAsString = String(column);
	                    return columnAsString.length > 9 ? columnAsString.substring(0, 6) + '...' : columnAsString + Array(10 - columnAsString.length).join(' ');
	                }).join(' | ') + ' |';
	            };
	            var header = makeRow(this[__columns__]);
	            var token = 0;
	            var toShow = [header, Array(header.length).join('-')].concat((0, _toConsumableArray3['default'])((0, _reusables.iter)(this[__rows__], function (row) {
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
	         * const [height, weight] = df.dim()
	         */

	    }, {
	        key: 'dim',
	        value: function dim() {
	            return [this.count(), this[__columns__].length];
	        }

	        /**
	         * Transpose a DataFrame. Rows become columns and conversely. n x p => p x n.
	         * @param {Boolean} [transposeColumnNames=false] An option to transpose columnNames in a rowNames column.
	         * @returns {ÐataFrame} A new transposed DataFrame.
	         * @example
	         * df.transpose()
	         */

	    }, {
	        key: 'transpose',
	        value: function transpose(tranposeColumnNames) {
	            var newColumns = [].concat((0, _toConsumableArray3['default'])(tranposeColumnNames ? ['rowNames'] : []), (0, _toConsumableArray3['default'])([].concat((0, _toConsumableArray3['default'])(Array(this.count()).keys())).reverse()));
	            var transposedRows = (0, _reusables.transpose)((tranposeColumnNames ? this.push(this[__columns__]) : this).toArray());
	            return this.__newInstance__(transposedRows, newColumns.reverse()).restructure(newColumns);
	        }

	        /**
	         * Get the rows number.
	         * @returns {Int} The number of DataFrame rows.
	         * @example
	         * df.count()
	         */

	    }, {
	        key: 'count',
	        value: function count() {
	            return this[__rows__].length;
	        }

	        /**
	         * Get the count of a value into a column.
	         * @param valueToCount The value to count into the selected column.
	         * @param {String} [columnName=this.listColumns()[0]] The column to count the value.
	         * @returns {Int} The number of times the selected value appears.
	         * @example
	          * df.countValue(5, 'column2')
	          * df.select('column1').countValue(5)
	         */

	    }, {
	        key: 'countValue',
	        value: function countValue(valueToCount) {
	            var columnName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this[__columns__][0];

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
	         * Replace a value by another in all the DataFrame or in a column.
	         * @param value The value to replace.
	         * @param replacement The new value.
	         * @param {String | Array} [columnNames=this.listColumns()] The columns to apply the replacement.
	         * @returns {DataFrame} A new DataFrame with replaced values.
	         * @example
	         * df.replace(undefined, 0, 'column1', 'column2')
	         */

	    }, {
	        key: 'replace',
	        value: function replace(value, replacement, columnNames) {
	            var _this5 = this;

	            var columns = (0, _reusables.asArray)(columnNames);
	            return this.map(function (row) {
	                return (columns.length > 0 ? columns : _this5[__columns__]).reduce(function (p, n) {
	                    return p.get(n) === value ? p.set(n, replacement) : p;
	                }, row);
	            });
	        }

	        /**
	         * Compute unique values into a column.
	         * @param {String} columnName The column to distinct.
	         * @returns {DataFrame} A DataFrame containing the column with distinct values.
	         * @example
	         * df.distinct('column1')
	         */

	    }, {
	        key: 'distinct',
	        value: function distinct(columnName) {
	            return this.__newInstance__((0, _defineProperty3['default'])({}, columnName, [].concat((0, _toConsumableArray3['default'])(new _set2['default'](this.toArray(columnName))))), [columnName]);
	        }

	        /**
	         * Compute unique values into a column.
	         * Alias from .distinct()
	         * @param {String} columnName The column to distinct.
	         * @returns {DataFrame} A DataFrame containing the column with distinct values.
	         * @example
	         * df.unique('column1')
	         */

	    }, {
	        key: 'unique',
	        value: function unique(columnName) {
	            return this.distinct(columnName);
	        }

	        /**
	         * List DataFrame columns.
	         * @returns {Array} An Array containing DataFrame columnNames.
	         * @example
	         * df.listColumns()
	         */

	    }, {
	        key: 'listColumns',
	        value: function listColumns() {
	            return [].concat((0, _toConsumableArray3['default'])(this[__columns__]));
	        }

	        /**
	         * Select columns in the DataFrame.
	         * @param {...String} columnNames The columns to select.
	         * @returns {DataFrame} A new DataFrame containing selected columns.
	         * @example
	         * df.select('column1', 'column3')
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
	         * df.withColumn('column4', () => 2)
	         * df.withColumn('column2', (row) => row.get('column2') * 2)
	         */

	    }, {
	        key: 'withColumn',
	        value: function withColumn(columnName) {
	            var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
	                return undefined;
	            };

	            return this.__newInstance__(this[__rows__].map(function (row, index) {
	                return row.set(columnName, func(row, index));
	            }), this[__columns__].includes(columnName) ? this[__columns__] : [].concat((0, _toConsumableArray3['default'])(this[__columns__]), [columnName]));
	        }

	        /**
	         * Modify the structure of the DataFrame by changing columns order, creating new columns or removing some columns.
	         * @param {Array} newColumnNames The new columns of the DataFrame.
	         * @returns {DataFrame} A new DataFrame with restructured columns (renamed, add or deleted).
	         * @example
	         * df.restructure(['column1', 'column4', 'column2', 'column3'])
	         * df.restructure(['column1', 'column4'])
	         * df.restructure(['column1', 'newColumn', 'column4'])
	         */

	    }, {
	        key: 'restructure',
	        value: function restructure(newColumnNames) {
	            return this.__newInstance__(this[__rows__], newColumnNames);
	        }

	        /**
	         * Rename each column.
	         * @param {Array} newColumnNames The new column names of the DataFrame.
	         * @returns {DataFrame} A new DataFrame with the new column names.
	         * @example
	         * df.renameAll(['column1', 'column3', 'column4'])
	         */

	    }, {
	        key: 'renameAll',
	        value: function renameAll(newColumnNames) {
	            if (newColumnNames.length !== this[__columns__].length) {
	                throw new _errors.WrongSchemaError(newColumnNames, this[__columns__]);
	            }
	            return this.__newInstance__(this.toArray(), newColumnNames);
	        }

	        /**
	         * Rename a column.
	         * @param {String} columnName The column to rename.
	         * @param {String} replacement The new name for the column.
	         * @returns {DataFrame} A new DataFrame with the new column name.
	         * @example
	         * df.rename('column1', 'columnRenamed')
	         */

	    }, {
	        key: 'rename',
	        value: function rename(columnName, replacement) {
	            var newColumnNames = this[__columns__].map(function (column) {
	                return column === columnName ? replacement : column;
	            });
	            return this.renameAll(newColumnNames);
	        }

	        /**
	         * Cast each column into a given type.
	         * @param {Array} typeFunctions The functions used to cast columns.
	         * @returns {DataFrame} A new DataFrame with the columns having new types.
	         * @example
	         * df.castAll([Number, String, (val) => new CustomClass(val)])
	         */

	    }, {
	        key: 'castAll',
	        value: function castAll(typeFunctions) {
	            var _this6 = this;

	            if (typeFunctions.length !== this[__columns__].length) {
	                throw new _errors.WrongSchemaError(typeFunctions, this[__columns__]);
	            }
	            return this.map(function (row) {
	                return new _row2['default'](row.toArray().map(function (column, index) {
	                    return typeFunctions[index](column);
	                }), _this6[__columns__]);
	            });
	        }

	        /**
	         * Cast a column into a given type.
	         * @param {String} columnName The column to cast.
	         * @param {Function} ObjectType The function used to cast the column.
	         * @returns {DataFrame} A new DataFrame with the column having a new type.
	         * @example
	         * df.cast('column1', Number)
	         * df.cast('column1', (val) => new MyCustomClass(val))
	         */

	    }, {
	        key: 'cast',
	        value: function cast(columnName, typeFunction) {
	            return this.withColumn(columnName, function (row) {
	                return typeFunction(row.get(columnName));
	            });
	        }

	        /**
	         * Remove a single column.
	         * @param {String} columnName The column to drop.
	         * @returns {DataFrame} A new DataFrame without the dropped column.
	         * @example
	         * df.drop('column2')
	         */

	    }, {
	        key: 'drop',
	        value: function drop(columnName) {
	            return this.__newInstance__(this[__rows__].map(function (row) {
	                return row['delete'](columnName);
	            }), this[__columns__].filter(function (column) {
	                return column !== columnName;
	            }));
	        }

	        /**
	         * Chain maps and filters functions on DataFrame by optimizing their executions.
	         * If a function returns boolean, it's a filter. Else it's a map.
	         * It can be 10 - 100 x faster than standard chains of .map() and .filter().
	         * @param {...Function} funcs Functions to apply on the DataFrame rows taking the row as parameter.
	         * @returns {DataFrame} A new DataFrame with modified rows.
	         * @example
	         * df.chain(
	         *      row => row.get('column1') > 3, // filter
	         *      row => row.set('column1', 3),  // map
	         *      row => row.get('column2') === '5' // filter
	         * )
	         */

	    }, {
	        key: 'chain',
	        value: function chain() {
	            for (var _len5 = arguments.length, funcs = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	                funcs[_key5] = arguments[_key5];
	            }

	            return this.__newInstance__([].concat((0, _toConsumableArray3['default'])(_reusables.chain.apply(undefined, [this[__rows__]].concat(funcs)))), this[__columns__]);
	        }

	        /**
	         * Filter DataFrame rows.
	         * @param {Function | Object} condition A filter function or a column/value object.
	         * @returns {DataFrame} A new filtered DataFrame.
	         * @example
	         * df.filter(row => row.get('column1') >= 3)
	         * df.filter({'column2': 5, 'column1': 3}))
	         */

	    }, {
	        key: 'filter',
	        value: function filter(condition) {
	            var func = (typeof condition === 'undefined' ? 'undefined' : (0, _typeof3['default'])(condition)) === 'object' ? function (row) {
	                return (0, _entries2['default'])(condition).map(function (_ref6) {
	                    var _ref7 = (0, _slicedToArray3['default'])(_ref6, 2),
	                        column = _ref7[0],
	                        value = _ref7[1];

	                    return (0, _is2['default'])(row.get(column), value);
	                }).reduce(function (p, n) {
	                    return p && n;
	                });
	            } : condition;
	            var filteredRows = [].concat((0, _toConsumableArray3['default'])((0, _reusables.iter)(this[__rows__], function (row) {
	                return func(row) ? row : false;
	            })));
	            return filteredRows.length > 0 ? this.__newInstance__(filteredRows, this[__columns__]) : this.__newInstance__([], []);
	        }

	        /**
	         * Filter DataFrame rows.
	         * Alias of .filter()
	         * @param {Function | Object} condition A filter function or a column/value object.
	         * @returns {DataFrame} A new filtered DataFrame.
	         * @example
	         * df.where(row => row.get('column1') >= 3)
	         * df.where({'column2': 5, 'column1': 3}))
	         */

	    }, {
	        key: 'where',
	        value: function where(condition) {
	            return this.filter(condition);
	        }

	        /**
	         * Find a row (the first met) based on a condition.
	         * @param {Function | Object} condition A filter function or a column/value object.
	         * @returns {Row} The targeted Row.
	         * @example
	         * df.find(row => row.get('column1') === 3)
	         * df.find({'column1': 3})
	         */

	    }, {
	        key: 'find',
	        value: function find(condition) {
	            return this.filter(condition)[__rows__][0];
	        }

	        /**
	         * Map on DataFrame rows. /!\ Prefer to use .chain().
	         * @param {Function} func A function to apply on each row taking the row as parameter.
	         * @returns {DataFrame} A new DataFrame with modified rows.
	         * @example
	         * df.map(row => row.set('column1', row.get('column1') * 2))
	         */

	    }, {
	        key: 'map',
	        value: function map(func) {
	            return this.__newInstance__([].concat((0, _toConsumableArray3['default'])((0, _reusables.iter)(this[__rows__], function (row) {
	                return func(row);
	            }))), this[__columns__]);
	        }

	        /**
	         * Reduce DataFrame into a value.
	         * @param {Function} func The reduce function taking 2 parameters, previous and next.
	         * @param [init] The initial value of the reducer.
	         * @returns A reduced value.
	         * @example
	         * df.reduce((p, n) => n.get('column1') + p, 0)
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
	         * @example
	         * df.reduceRight((p, n) => p > n ? p : n, 0)
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
	         * Return a DataFrame without duplicated columns.
	         * @returns {DataFrame} A DataFrame without duplicated rows.
	         * @example
	         * df.dropDuplicates()
	         */

	    }, {
	        key: 'dropDuplicates',
	        value: function dropDuplicates() {
	            return this.groupBy.apply(this, (0, _toConsumableArray3['default'])(this[__columns__])).aggregate(function () {}).drop('aggregation');
	        }

	        /**
	         * Return a shuffled DataFrame rows.
	         * @returns {DataFrame} A shuffled DataFrame.
	         * @example
	         * df.shuffle()
	         */

	    }, {
	        key: 'shuffle',
	        value: function shuffle() {
	            return this.__newInstance__(this.reduce(function (p, n) {
	                var index = Math.floor(Math.random() * (p.length - 1) + 1);
	                return Array.isArray(p) ? [].concat((0, _toConsumableArray3['default'])(p.slice(index, p.length + 1)), [n], (0, _toConsumableArray3['default'])(p.slice(0, index))) : [p, n];
	            }), this[__columns__]);
	        }

	        /**
	         * Return a random sample of rows.
	         * @param {Number} percentage A percentage of the orignal DataFrame giving the sample size.
	         * @returns {DataFrame} A sample DataFrame
	         * @example
	         * df.sample(0.3)
	         */

	    }, {
	        key: 'sample',
	        value: function sample(percentage) {
	            var nRows = this.count() * percentage;
	            var token = 0;
	            return this.__newInstance__([].concat((0, _toConsumableArray3['default'])((0, _reusables.iter)(this.shuffle()[__rows__], function (row) {
	                token++;
	                return row;
	            }, function () {
	                return token >= nRows;
	            }))), this[__columns__]);
	        }

	        /**
	         * Randomly split a DataFrame into 2 DataFrames.
	         * @param {Number} percentage A percentage of the orignal DataFrame giving the first DataFrame size. The second takes the rest.
	         * @returns {Array} An Array containing the two DataFrames. First, the X% DataFrame then the rest DataFrame.
	         * @example
	         * const [30DF, 70DF] = df.bisect(0.3)
	         */

	    }, {
	        key: 'bisect',
	        value: function bisect(percentage) {
	            var nRows = this.count() * percentage;
	            var token = 0;
	            var restRows = [];
	            return [this.__newInstance__([].concat((0, _toConsumableArray3['default'])((0, _reusables.iter)(this.shuffle()[__rows__], function (row) {
	                if (token < nRows) {
	                    token++;
	                    return row;
	                }
	                restRows.push(row);
	            }))), this[__columns__]), this.__newInstance__(restRows, this[__columns__])];
	        }

	        /**
	         * Group DataFrame rows by columns giving a GroupedDataFrame object. See its doc for more examples.
	         * @param {...String} columnNames The columns used for the groupBy.
	         * @returns {GroupedDataFrame} A GroupedDataFrame object.
	         * @example
	         * df.groupBy('column1')
	         * df.groupBy('column1', 'column2')
	         * df.groupBy('column1', 'column2').listGroups()
	         * df.groupBy('column1', 'column2').show()
	         * df.groupBy('column1', 'column2').aggregate((group) => group.count())
	         */

	    }, {
	        key: 'groupBy',
	        value: function groupBy() {
	            for (var _len6 = arguments.length, columnNames = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	                columnNames[_key6] = arguments[_key6];
	            }

	            return new (Function.prototype.bind.apply(_groupedDataframe2['default'], [null].concat([this], columnNames)))();
	        }

	        /**
	         * Sort DataFrame rows based on a column values. The row should contains only one variable type.
	         * @param {String} columnName The column giving order.
	         * @param {Boolean} [reverse=false] Reverse mode. Reverse the order if true.
	         * @returns {DataFrame} An ordered DataFrame.
	         * @example
	         * df.sortBy('id')
	         */

	    }, {
	        key: 'sortBy',
	        value: function sortBy(columnName) {
	            var reverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	            var sortedRows = this[__rows__].sort(function (p, n) {
	                var _ref8 = [p.get(columnName), n.get(columnName)],
	                    pValue = _ref8[0],
	                    nValue = _ref8[1];

	                if ((typeof pValue === 'undefined' ? 'undefined' : (0, _typeof3['default'])(pValue)) !== (typeof nValue === 'undefined' ? 'undefined' : (0, _typeof3['default'])(nValue))) {
	                    throw new _errors.MixedTypeError();
	                }
	                return (0, _reusables.compare)(pValue, nValue, reverse);
	            });
	            return this.__newInstance__(sortedRows, this[__columns__]);
	        }

	        /**
	         * Concat two DataFrames.
	         * @param {DataFrame} dfToUnion The DataFrame to concat.
	         * @returns {DataFrame} A new concatenated DataFrame resulting of the union.
	         * @example
	         * df.union(df2)
	         */

	    }, {
	        key: 'union',
	        value: function union(dfToUnion) {
	            if (!(0, _reusables.arrayEqual)(this[__columns__], dfToUnion[__columns__])) {
	                throw new _errors.WrongSchemaError(dfToUnion[__columns__], this[__columns__]);
	            }
	            return this.__newInstance__([].concat((0, _toConsumableArray3['default'])(this), (0, _toConsumableArray3['default'])(dfToUnion.restructure(this[__columns__]))), this[__columns__]);
	        }

	        /**
	         * Join two DataFrames.
	         * @param {DataFrame} dfToJoin The DataFrame to join.
	         * @param {String | Array} columnNames The selected columns for the join.
	         * @param {String} [how='inner'] The join mode. Can be: full, inner, outer, left, right.
	         * @returns {DataFrame} The joined DataFrame.
	         * @example
	         * df.join(df2, 'column1', 'full')
	         */

	    }, {
	        key: 'join',
	        value: function join(dfToJoin, columnNames) {
	            var _this7 = this;

	            var how = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'inner';

	            var joinMethods = {
	                inner: function inner() {
	                    return _this7.innerJoin(dfToJoin, columnNames);
	                },
	                full: function full() {
	                    return _this7.fullJoin(dfToJoin, columnNames);
	                },
	                outer: function outer() {
	                    return _this7.outerJoin(dfToJoin, columnNames);
	                },
	                left: function left() {
	                    return _this7.leftJoin(dfToJoin, columnNames);
	                },
	                right: function right() {
	                    return _this7.rightJoin(dfToJoin, columnNames);
	                }
	            };
	            return joinMethods[how]();
	        }

	        /**
	         * Join two DataFrames with inner mode.
	         * @param {DataFrame} dfToJoin The DataFrame to join.
	         * @param {String | Array} columnNames The selected columns for the join.
	         * @returns {DataFrame} The joined DataFrame.
	         * @example
	         * df.innerJoin(df2, 'id')
	         * df.join(df2, 'id')
	         * df.join(df2, 'id', 'inner')
	         */

	    }, {
	        key: 'innerJoin',
	        value: function innerJoin(dfToJoin, columnNames) {
	            return this._join(dfToJoin, columnNames, ['in']);
	        }

	        /**
	         * Join two DataFrames with full mode.
	         * @param {DataFrame} dfToJoin The DataFrame to join.
	         * @param {String | Array} columnNames The selected columns for the join.
	         * @returns {DataFrame} The joined DataFrame.
	         * @example
	         * df.fullJoin(df2, 'id')
	         * df.join(df2, 'id', 'full')
	         */

	    }, {
	        key: 'fullJoin',
	        value: function fullJoin(dfToJoin, columnNames) {
	            return this._join(dfToJoin, columnNames, ['full', 'full']);
	        }

	        /**
	         * Join two DataFrames with outer mode.
	         * @param {DataFrame} dfToJoin The DataFrame to join.
	         * @param {String | Array} columnNames The selected columns for the join.
	         * @returns {DataFrame} The joined DataFrame.
	         * @example
	         * df2.rightJoin(df2, 'id')
	         * df2.join(df2, 'id', 'outer')
	         */

	    }, {
	        key: 'outerJoin',
	        value: function outerJoin(dfToJoin, columnNames) {
	            return this._join(dfToJoin, columnNames, ['out', 'out']);
	        }

	        /**
	         * Join two DataFrames with left mode.
	         * @param {DataFrame} dfToJoin The DataFrame to join.
	         * @param {String | Array} columnNames The selected columns for the join.
	         * @returns {DataFrame} The joined DataFrame.
	         * @example
	         * df.leftJoin(df2, 'id')
	         * df.join(df2, 'id', 'left')
	         */

	    }, {
	        key: 'leftJoin',
	        value: function leftJoin(dfToJoin, columnNames) {
	            return this._join(dfToJoin, columnNames, ['full', 'in']);
	        }

	        /**
	         * Join two DataFrames with right mode.
	         * @param {DataFrame} dfToJoin The DataFrame to join.
	         * @param {String | Array} columnNames The selected columns for the join.
	         * @returns {DataFrame} The joined DataFrame.
	         * @example
	         * df.rightJoin(df2, 'id')
	         * df.join(df2, 'id', 'right')
	         */

	    }, {
	        key: 'rightJoin',
	        value: function rightJoin(dfToJoin, columnNames) {
	            return this._join(dfToJoin, columnNames, ['in', 'full']);
	        }
	    }]);
	    return DataFrame;
	}(), (_applyDecoratedDescriptor(_class, 'fromText', [_dec], (0, _getOwnPropertyDescriptor2['default'])(_class, 'fromText'), _class), _applyDecoratedDescriptor(_class, 'fromCSV', [_dec2], (0, _getOwnPropertyDescriptor2['default'])(_class, 'fromCSV'), _class), _applyDecoratedDescriptor(_class, 'fromJSON', [_dec3], (0, _getOwnPropertyDescriptor2['default'])(_class, 'fromJSON'), _class), _applyDecoratedDescriptor(_class.prototype, '_build', [_dec4], (0, _getOwnPropertyDescriptor2['default'])(_class.prototype, '_build'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_join', [_dec5], (0, _getOwnPropertyDescriptor2['default'])(_class.prototype, '_join'), _class.prototype)), _class));
	exports['default'] = DataFrame;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	var $Object = __webpack_require__(22).Object;
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $Object.getOwnPropertyDescriptor(it, key);
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject                 = __webpack_require__(5)
	  , $getOwnPropertyDescriptor = __webpack_require__(9).f;

	__webpack_require__(20)('getOwnPropertyDescriptor', function(){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(6)
	  , defined = __webpack_require__(8);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(7);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(10)
	  , createDesc     = __webpack_require__(11)
	  , toIObject      = __webpack_require__(5)
	  , toPrimitive    = __webpack_require__(12)
	  , has            = __webpack_require__(14)
	  , IE8_DOM_DEFINE = __webpack_require__(15)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(16) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 11 */
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
/* 12 */
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
/* 13 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(16) && !__webpack_require__(17)(function(){
	  return Object.defineProperty(__webpack_require__(18)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(17)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(13)
	  , document = __webpack_require__(19).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(21)
	  , core    = __webpack_require__(22)
	  , fails   = __webpack_require__(17);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(19)
	  , core      = __webpack_require__(22)
	  , ctx       = __webpack_require__(23)
	  , hide      = __webpack_require__(25)
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
/* 22 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(24);
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
/* 24 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(26)
	  , createDesc = __webpack_require__(11);
	module.exports = __webpack_require__(16) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(27)
	  , IE8_DOM_DEFINE = __webpack_require__(15)
	  , toPrimitive    = __webpack_require__(12)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(16) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(13);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(29), __esModule: true };

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(30);
	module.exports = __webpack_require__(22).Object.is;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.10 Object.is(value1, value2)
	var $export = __webpack_require__(21);
	$export($export.S, 'Object', {is: __webpack_require__(31)});

/***/ },
/* 31 */
/***/ function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(33);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(64);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(34), __esModule: true };

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(35);
	__webpack_require__(59);
	module.exports = __webpack_require__(63).f('iterator');

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(36)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(38)(String, 'String', function(iterated){
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(37)
	  , defined   = __webpack_require__(8);
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
/* 37 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(39)
	  , $export        = __webpack_require__(21)
	  , redefine       = __webpack_require__(40)
	  , hide           = __webpack_require__(25)
	  , has            = __webpack_require__(14)
	  , Iterators      = __webpack_require__(41)
	  , $iterCreate    = __webpack_require__(42)
	  , setToStringTag = __webpack_require__(55)
	  , getPrototypeOf = __webpack_require__(57)
	  , ITERATOR       = __webpack_require__(56)('iterator')
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
/* 39 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(25);

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(43)
	  , descriptor     = __webpack_require__(11)
	  , setToStringTag = __webpack_require__(55)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(25)(IteratorPrototype, __webpack_require__(56)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(27)
	  , dPs         = __webpack_require__(44)
	  , enumBugKeys = __webpack_require__(53)
	  , IE_PROTO    = __webpack_require__(50)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(18)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(54).appendChild(iframe);
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(26)
	  , anObject = __webpack_require__(27)
	  , getKeys  = __webpack_require__(45);

	module.exports = __webpack_require__(16) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(46)
	  , enumBugKeys = __webpack_require__(53);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(14)
	  , toIObject    = __webpack_require__(5)
	  , arrayIndexOf = __webpack_require__(47)(false)
	  , IE_PROTO     = __webpack_require__(50)('IE_PROTO');

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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(5)
	  , toLength  = __webpack_require__(48)
	  , toIndex   = __webpack_require__(49);
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
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(37)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(37)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(51)('keys')
	  , uid    = __webpack_require__(52);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(19)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 52 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 53 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(19).document && document.documentElement;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(26).f
	  , has = __webpack_require__(14)
	  , TAG = __webpack_require__(56)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(51)('wks')
	  , uid        = __webpack_require__(52)
	  , Symbol     = __webpack_require__(19).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(14)
	  , toObject    = __webpack_require__(58)
	  , IE_PROTO    = __webpack_require__(50)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(8);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(60);
	var global        = __webpack_require__(19)
	  , hide          = __webpack_require__(25)
	  , Iterators     = __webpack_require__(41)
	  , TO_STRING_TAG = __webpack_require__(56)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(61)
	  , step             = __webpack_require__(62)
	  , Iterators        = __webpack_require__(41)
	  , toIObject        = __webpack_require__(5);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(38)(Array, 'Array', function(iterated, kind){
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
/* 61 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(56);

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(65), __esModule: true };

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(66);
	__webpack_require__(75);
	__webpack_require__(76);
	__webpack_require__(77);
	module.exports = __webpack_require__(22).Symbol;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(19)
	  , has            = __webpack_require__(14)
	  , DESCRIPTORS    = __webpack_require__(16)
	  , $export        = __webpack_require__(21)
	  , redefine       = __webpack_require__(40)
	  , META           = __webpack_require__(67).KEY
	  , $fails         = __webpack_require__(17)
	  , shared         = __webpack_require__(51)
	  , setToStringTag = __webpack_require__(55)
	  , uid            = __webpack_require__(52)
	  , wks            = __webpack_require__(56)
	  , wksExt         = __webpack_require__(63)
	  , wksDefine      = __webpack_require__(68)
	  , keyOf          = __webpack_require__(69)
	  , enumKeys       = __webpack_require__(70)
	  , isArray        = __webpack_require__(72)
	  , anObject       = __webpack_require__(27)
	  , toIObject      = __webpack_require__(5)
	  , toPrimitive    = __webpack_require__(12)
	  , createDesc     = __webpack_require__(11)
	  , _create        = __webpack_require__(43)
	  , gOPNExt        = __webpack_require__(73)
	  , $GOPD          = __webpack_require__(9)
	  , $DP            = __webpack_require__(26)
	  , $keys          = __webpack_require__(45)
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
	  __webpack_require__(74).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(10).f  = $propertyIsEnumerable;
	  __webpack_require__(71).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(39)){
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
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(25)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(52)('meta')
	  , isObject = __webpack_require__(13)
	  , has      = __webpack_require__(14)
	  , setDesc  = __webpack_require__(26).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(17)(function(){
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
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(19)
	  , core           = __webpack_require__(22)
	  , LIBRARY        = __webpack_require__(39)
	  , wksExt         = __webpack_require__(63)
	  , defineProperty = __webpack_require__(26).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(45)
	  , toIObject = __webpack_require__(5);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(45)
	  , gOPS    = __webpack_require__(71)
	  , pIE     = __webpack_require__(10);
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
/* 71 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(7);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(5)
	  , gOPN      = __webpack_require__(74).f
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
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(46)
	  , hiddenKeys = __webpack_require__(53).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 75 */
/***/ function(module, exports) {

	

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(68)('asyncIterator');

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(68)('observable');

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(79), __esModule: true };

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(22)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(81), __esModule: true };

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(82);
	module.exports = __webpack_require__(22).Object.entries;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export  = __webpack_require__(21)
	  , $entries = __webpack_require__(83)(true);

	$export($export.S, 'Object', {
	  entries: function entries(it){
	    return $entries(it);
	  }
	});

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(45)
	  , toIObject = __webpack_require__(5)
	  , isEnum    = __webpack_require__(10).f;
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
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(85), __esModule: true };

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(86);
	module.exports = __webpack_require__(22).Object.values;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export = __webpack_require__(21)
	  , $values = __webpack_require__(83)(false);

	$export($export.S, 'Object', {
	  values: function values(it){
	    return $values(it);
	  }
	});

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(88), __esModule: true };

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(89);
	module.exports = __webpack_require__(22).Object.keys;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(58)
	  , $keys    = __webpack_require__(45);

	__webpack_require__(20)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(91), __esModule: true };

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(75);
	__webpack_require__(35);
	__webpack_require__(59);
	__webpack_require__(92);
	__webpack_require__(106);
	module.exports = __webpack_require__(22).Set;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(93);

	// 23.2 Set Objects
	module.exports = __webpack_require__(102)('Set', function(get){
	  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var dP          = __webpack_require__(26).f
	  , create      = __webpack_require__(43)
	  , redefineAll = __webpack_require__(94)
	  , ctx         = __webpack_require__(23)
	  , anInstance  = __webpack_require__(95)
	  , defined     = __webpack_require__(8)
	  , forOf       = __webpack_require__(96)
	  , $iterDefine = __webpack_require__(38)
	  , step        = __webpack_require__(62)
	  , setSpecies  = __webpack_require__(101)
	  , DESCRIPTORS = __webpack_require__(16)
	  , fastKey     = __webpack_require__(67).fastKey
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
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(25);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 95 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(23)
	  , call        = __webpack_require__(97)
	  , isArrayIter = __webpack_require__(98)
	  , anObject    = __webpack_require__(27)
	  , toLength    = __webpack_require__(48)
	  , getIterFn   = __webpack_require__(99)
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
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(27);
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
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(41)
	  , ITERATOR   = __webpack_require__(56)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(100)
	  , ITERATOR  = __webpack_require__(56)('iterator')
	  , Iterators = __webpack_require__(41);
	module.exports = __webpack_require__(22).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(7)
	  , TAG = __webpack_require__(56)('toStringTag')
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
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(19)
	  , core        = __webpack_require__(22)
	  , dP          = __webpack_require__(26)
	  , DESCRIPTORS = __webpack_require__(16)
	  , SPECIES     = __webpack_require__(56)('species');

	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global         = __webpack_require__(19)
	  , $export        = __webpack_require__(21)
	  , meta           = __webpack_require__(67)
	  , fails          = __webpack_require__(17)
	  , hide           = __webpack_require__(25)
	  , redefineAll    = __webpack_require__(94)
	  , forOf          = __webpack_require__(96)
	  , anInstance     = __webpack_require__(95)
	  , isObject       = __webpack_require__(13)
	  , setToStringTag = __webpack_require__(55)
	  , dP             = __webpack_require__(26).f
	  , each           = __webpack_require__(103)(0)
	  , DESCRIPTORS    = __webpack_require__(16);

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
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(23)
	  , IObject  = __webpack_require__(6)
	  , toObject = __webpack_require__(58)
	  , toLength = __webpack_require__(48)
	  , asc      = __webpack_require__(104);
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
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(105);

	module.exports = function(original, length){
	  return new (speciesConstructor(original))(length);
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(13)
	  , isArray  = __webpack_require__(72)
	  , SPECIES  = __webpack_require__(56)('species');

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
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(21);

	$export($export.P + $export.R, 'Set', {toJSON: __webpack_require__(107)('Set')});

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(100)
	  , from    = __webpack_require__(108);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var forOf = __webpack_require__(96);

	module.exports = function(iter, ITERATOR){
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(110);

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
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(111), __esModule: true };

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(112);
	var $Object = __webpack_require__(22).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(21);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(16), 'Object', {defineProperty: __webpack_require__(26).f});

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(114), __esModule: true };

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(115);
	module.exports = __webpack_require__(22).Object.getPrototypeOf;

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(58)
	  , $getPrototypeOf = __webpack_require__(57);

	__webpack_require__(20)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(117), __esModule: true };

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(118);
	var $Object = __webpack_require__(22).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(21)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(43)});

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(120);


/***/ },
/* 120 */
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

	module.exports = __webpack_require__(121);

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
/* 121 */
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

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
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
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
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

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] =
	    GeneratorFunction.displayName = "GeneratorFunction";

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
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  runtime.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function(value) {
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
	  runtime.AsyncIterator = AsyncIterator;

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

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        if (delegate.iterator.return) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

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

	      this.method = "next";
	      this.arg = undefined;

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

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined;
	        }

	        return !! caught;
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
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
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

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined;
	      }

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

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(122)))

/***/ },
/* 122 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
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
	    var timeout = runTimeout(cleanUpNextTick);
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
	    runClearTimeout(timeout);
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
	        runTimeout(drainQueue);
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
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(124), __esModule: true };

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(59);
	__webpack_require__(35);
	module.exports = __webpack_require__(125);

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(27)
	  , get      = __webpack_require__(99);
	module.exports = __webpack_require__(22).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(127), __esModule: true };

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(128);
	module.exports = __webpack_require__(22).Object.assign;

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(21);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(129)});

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(45)
	  , gOPS     = __webpack_require__(71)
	  , pIE      = __webpack_require__(10)
	  , toObject = __webpack_require__(58)
	  , IObject  = __webpack_require__(6)
	  , $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(17)(function(){
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
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _from = __webpack_require__(131);

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
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(132), __esModule: true };

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(35);
	__webpack_require__(133);
	module.exports = __webpack_require__(22).Array.from;

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(23)
	  , $export        = __webpack_require__(21)
	  , toObject       = __webpack_require__(58)
	  , call           = __webpack_require__(97)
	  , isArrayIter    = __webpack_require__(98)
	  , toLength       = __webpack_require__(48)
	  , createProperty = __webpack_require__(134)
	  , getIterFn      = __webpack_require__(99);

	$export($export.S + $export.F * !__webpack_require__(135)(function(iter){ Array.from(iter); }), 'Array', {
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
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(26)
	  , createDesc      = __webpack_require__(11);

	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(56)('iterator')
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
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _isIterable2 = __webpack_require__(137);

	var _isIterable3 = _interopRequireDefault(_isIterable2);

	var _getIterator2 = __webpack_require__(123);

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
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(138), __esModule: true };

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(59);
	__webpack_require__(35);
	module.exports = __webpack_require__(139);

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(100)
	  , ITERATOR  = __webpack_require__(56)('iterator')
	  , Iterators = __webpack_require__(41);
	module.exports = __webpack_require__(22).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(141), __esModule: true };

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(75);
	__webpack_require__(35);
	__webpack_require__(59);
	__webpack_require__(142);
	module.exports = __webpack_require__(22).Promise;

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(39)
	  , global             = __webpack_require__(19)
	  , ctx                = __webpack_require__(23)
	  , classof            = __webpack_require__(100)
	  , $export            = __webpack_require__(21)
	  , isObject           = __webpack_require__(13)
	  , aFunction          = __webpack_require__(24)
	  , anInstance         = __webpack_require__(95)
	  , forOf              = __webpack_require__(96)
	  , speciesConstructor = __webpack_require__(143)
	  , task               = __webpack_require__(144).set
	  , microtask          = __webpack_require__(146)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;

	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(56)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();

	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};

	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(94)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(55)($Promise, PROMISE);
	__webpack_require__(101)(PROMISE);
	Wrapper = __webpack_require__(22)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(135)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(27)
	  , aFunction = __webpack_require__(24)
	  , SPECIES   = __webpack_require__(56)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(23)
	  , invoke             = __webpack_require__(145)
	  , html               = __webpack_require__(54)
	  , cel                = __webpack_require__(18)
	  , global             = __webpack_require__(19)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(7)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 145 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(19)
	  , macrotask = __webpack_require__(144).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(7)(process) == 'process';

	module.exports = function(){
	  var head, last, notify;

	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };

	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }

	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 147 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(110);

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
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.checktypes = undefined;

	var _checkTypes = __webpack_require__(150);

	var _checkTypes2 = _interopRequireDefault(_checkTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	exports.checktypes = _checkTypes2['default'];

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _defineProperty = __webpack_require__(110);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	var _typeof2 = __webpack_require__(32);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _getPrototypeOf = __webpack_require__(113);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(147);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(151);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(152);

	var _inherits3 = _interopRequireDefault(_inherits2);

	exports['default'] = checktypes;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var ArgumentTypeError = function (_TypeError) {
	    (0, _inherits3['default'])(ArgumentTypeError, _TypeError);

	    function ArgumentTypeError(arg, argName, supportedTypes) {
	        (0, _classCallCheck3['default'])(this, ArgumentTypeError);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (ArgumentTypeError.__proto__ || (0, _getPrototypeOf2['default'])(ArgumentTypeError)).call(this));

	        _this.message = argName + ' expected as one of [' + supportedTypes.join(', ') + '], ' + ('not as a ' + (typeof arg === 'undefined' ? 'undefined' : (0, _typeof3['default'])(arg)) + (arg.constructor ? ' | ' + arg.constructor.name : '') + '.');
	        return _this;
	    }

	    return ArgumentTypeError;
	}(TypeError);

	function getArgumentsNames(Func) {
	    var funcString = Func.toString();
	    var argumentsNames = funcString.slice(funcString.indexOf('(') + 1, funcString.indexOf(')')).match(/([^\s,]+)/g);
	    if (!argumentsNames) {
	        throw new TypeError('getParamNames only works with non exotic functions.');
	    }
	    return argumentsNames;
	}

	function isOfType(variable, type) {
	    return typeof type === 'string' ? variable.constructor && variable.constructor.name === type || (typeof variable === 'undefined' ? 'undefined' : (0, _typeof3['default'])(variable)) === type.toLowerCase() : variable instanceof type;
	}

	function checkArgType(arg, argName, expectedTypes) {
	    if (!expectedTypes.reduce(function (p, n) {
	        return p || isOfType(arg, n);
	    }, false)) {
	        throw new ArgumentTypeError(arg, argName, expectedTypes);
	    }
	}

	function checkArgumentsTypes(Func, types) {
	    var _this2 = this;

	    var isClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	    var argNames = getArgumentsNames(Func);
	    return function () {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        args.forEach(function (arg, index) {
	            if (types[index]) {
	                checkArgType(arg, argNames[index], Array.isArray(types[index]) ? types[index] : [types[index]]);
	            }
	        });
	        if (isClass) {
	            return new (Function.prototype.bind.apply(Func, [null].concat(args)))();
	        }
	        return Func.call.apply(Func, [_this2].concat(args));
	    };
	}

	function checktypes() {
	    for (var _len2 = arguments.length, types = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        types[_key2] = arguments[_key2];
	    }

	    return function (target, name, descriptor) {
	        if (!name && !descriptor) {
	            return checkArgumentsTypes(target, types, true);
	        }
	        return {
	            configurable: true,
	            get: function get() {
	                var func = checkArgumentsTypes.call(this, descriptor.value, types);
	                (0, _defineProperty2['default'])(this, name, {
	                    value: func,
	                    configurable: true,
	                    writable: true
	                });
	                return func;
	            }
	        };
	    };
	}

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(32);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(153);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(116);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(32);

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
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(154), __esModule: true };

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(155);
	module.exports = __webpack_require__(22).Object.setPrototypeOf;

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(21);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(156).set});

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(13)
	  , anObject = __webpack_require__(27);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(23)(Function.call, __webpack_require__(9).f(Object.prototype, '__proto__').set, 2);
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
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-request/ Version 1.0.5. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports, __webpack_require__(158), __webpack_require__(159), __webpack_require__(160)) :
		typeof define === 'function' && define.amd ? define(['exports', 'd3-collection', 'd3-dispatch', 'd3-dsv'], factory) :
		(factory((global.d3 = global.d3 || {}),global.d3,global.d3,global.d3));
	}(this, (function (exports,d3Collection,d3Dispatch,d3Dsv) { 'use strict';

	var request = function(url, callback) {
	  var request,
	      event = d3Dispatch.dispatch("beforesend", "progress", "load", "error"),
	      mimeType,
	      headers = d3Collection.map(),
	      xhr = new XMLHttpRequest,
	      user = null,
	      password = null,
	      response,
	      responseType,
	      timeout = 0;

	  // If IE does not support CORS, use XDomainRequest.
	  if (typeof XDomainRequest !== "undefined"
	      && !("withCredentials" in xhr)
	      && /^(http(s)?:)?\/\//.test(url)) xhr = new XDomainRequest;

	  "onload" in xhr
	      ? xhr.onload = xhr.onerror = xhr.ontimeout = respond
	      : xhr.onreadystatechange = function(o) { xhr.readyState > 3 && respond(o); };

	  function respond(o) {
	    var status = xhr.status, result;
	    if (!status && hasResponse(xhr)
	        || status >= 200 && status < 300
	        || status === 304) {
	      if (response) {
	        try {
	          result = response.call(request, xhr);
	        } catch (e) {
	          event.call("error", request, e);
	          return;
	        }
	      } else {
	        result = xhr;
	      }
	      event.call("load", request, result);
	    } else {
	      event.call("error", request, o);
	    }
	  }

	  xhr.onprogress = function(e) {
	    event.call("progress", request, e);
	  };

	  request = {
	    header: function(name, value) {
	      name = (name + "").toLowerCase();
	      if (arguments.length < 2) return headers.get(name);
	      if (value == null) headers.remove(name);
	      else headers.set(name, value + "");
	      return request;
	    },

	    // If mimeType is non-null and no Accept header is set, a default is used.
	    mimeType: function(value) {
	      if (!arguments.length) return mimeType;
	      mimeType = value == null ? null : value + "";
	      return request;
	    },

	    // Specifies what type the response value should take;
	    // for instance, arraybuffer, blob, document, or text.
	    responseType: function(value) {
	      if (!arguments.length) return responseType;
	      responseType = value;
	      return request;
	    },

	    timeout: function(value) {
	      if (!arguments.length) return timeout;
	      timeout = +value;
	      return request;
	    },

	    user: function(value) {
	      return arguments.length < 1 ? user : (user = value == null ? null : value + "", request);
	    },

	    password: function(value) {
	      return arguments.length < 1 ? password : (password = value == null ? null : value + "", request);
	    },

	    // Specify how to convert the response content to a specific type;
	    // changes the callback value on "load" events.
	    response: function(value) {
	      response = value;
	      return request;
	    },

	    // Alias for send("GET", …).
	    get: function(data, callback) {
	      return request.send("GET", data, callback);
	    },

	    // Alias for send("POST", …).
	    post: function(data, callback) {
	      return request.send("POST", data, callback);
	    },

	    // If callback is non-null, it will be used for error and load events.
	    send: function(method, data, callback) {
	      xhr.open(method, url, true, user, password);
	      if (mimeType != null && !headers.has("accept")) headers.set("accept", mimeType + ",*/*");
	      if (xhr.setRequestHeader) headers.each(function(value, name) { xhr.setRequestHeader(name, value); });
	      if (mimeType != null && xhr.overrideMimeType) xhr.overrideMimeType(mimeType);
	      if (responseType != null) xhr.responseType = responseType;
	      if (timeout > 0) xhr.timeout = timeout;
	      if (callback == null && typeof data === "function") callback = data, data = null;
	      if (callback != null && callback.length === 1) callback = fixCallback(callback);
	      if (callback != null) request.on("error", callback).on("load", function(xhr) { callback(null, xhr); });
	      event.call("beforesend", request, xhr);
	      xhr.send(data == null ? null : data);
	      return request;
	    },

	    abort: function() {
	      xhr.abort();
	      return request;
	    },

	    on: function() {
	      var value = event.on.apply(event, arguments);
	      return value === event ? request : value;
	    }
	  };

	  if (callback != null) {
	    if (typeof callback !== "function") throw new Error("invalid callback: " + callback);
	    return request.get(callback);
	  }

	  return request;
	};

	function fixCallback(callback) {
	  return function(error, xhr) {
	    callback(error == null ? xhr : null);
	  };
	}

	function hasResponse(xhr) {
	  var type = xhr.responseType;
	  return type && type !== "text"
	      ? xhr.response // null on error
	      : xhr.responseText; // "" on error
	}

	var type = function(defaultMimeType, response) {
	  return function(url, callback) {
	    var r = request(url).mimeType(defaultMimeType).response(response);
	    if (callback != null) {
	      if (typeof callback !== "function") throw new Error("invalid callback: " + callback);
	      return r.get(callback);
	    }
	    return r;
	  };
	};

	var html = type("text/html", function(xhr) {
	  return document.createRange().createContextualFragment(xhr.responseText);
	});

	var json = type("application/json", function(xhr) {
	  return JSON.parse(xhr.responseText);
	});

	var text = type("text/plain", function(xhr) {
	  return xhr.responseText;
	});

	var xml = type("application/xml", function(xhr) {
	  var xml = xhr.responseXML;
	  if (!xml) throw new Error("parse error");
	  return xml;
	});

	var dsv = function(defaultMimeType, parse) {
	  return function(url, row, callback) {
	    if (arguments.length < 3) callback = row, row = null;
	    var r = request(url).mimeType(defaultMimeType);
	    r.row = function(_) { return arguments.length ? r.response(responseOf(parse, row = _)) : row; };
	    r.row(row);
	    return callback ? r.get(callback) : r;
	  };
	};

	function responseOf(parse, row) {
	  return function(request$$1) {
	    return parse(request$$1.responseText, row);
	  };
	}

	var csv = dsv("text/csv", d3Dsv.csvParse);

	var tsv = dsv("text/tab-separated-values", d3Dsv.tsvParse);

	exports.request = request;
	exports.html = html;
	exports.json = json;
	exports.text = text;
	exports.xml = xml;
	exports.csv = csv;
	exports.tsv = tsv;

	Object.defineProperty(exports, '__esModule', { value: true });

	})));


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-collection/ Version 1.0.3. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';

	var prefix = "$";

	function Map() {}

	Map.prototype = map.prototype = {
	  constructor: Map,
	  has: function(key) {
	    return (prefix + key) in this;
	  },
	  get: function(key) {
	    return this[prefix + key];
	  },
	  set: function(key, value) {
	    this[prefix + key] = value;
	    return this;
	  },
	  remove: function(key) {
	    var property = prefix + key;
	    return property in this && delete this[property];
	  },
	  clear: function() {
	    for (var property in this) if (property[0] === prefix) delete this[property];
	  },
	  keys: function() {
	    var keys = [];
	    for (var property in this) if (property[0] === prefix) keys.push(property.slice(1));
	    return keys;
	  },
	  values: function() {
	    var values = [];
	    for (var property in this) if (property[0] === prefix) values.push(this[property]);
	    return values;
	  },
	  entries: function() {
	    var entries = [];
	    for (var property in this) if (property[0] === prefix) entries.push({key: property.slice(1), value: this[property]});
	    return entries;
	  },
	  size: function() {
	    var size = 0;
	    for (var property in this) if (property[0] === prefix) ++size;
	    return size;
	  },
	  empty: function() {
	    for (var property in this) if (property[0] === prefix) return false;
	    return true;
	  },
	  each: function(f) {
	    for (var property in this) if (property[0] === prefix) f(this[property], property.slice(1), this);
	  }
	};

	function map(object, f) {
	  var map = new Map;

	  // Copy constructor.
	  if (object instanceof Map) object.each(function(value, key) { map.set(key, value); });

	  // Index array by numeric index or specified key function.
	  else if (Array.isArray(object)) {
	    var i = -1,
	        n = object.length,
	        o;

	    if (f == null) while (++i < n) map.set(i, object[i]);
	    else while (++i < n) map.set(f(o = object[i], i, object), o);
	  }

	  // Convert object to map.
	  else if (object) for (var key in object) map.set(key, object[key]);

	  return map;
	}

	var nest = function() {
	  var keys = [],
	      sortKeys = [],
	      sortValues,
	      rollup,
	      nest;

	  function apply(array, depth, createResult, setResult) {
	    if (depth >= keys.length) return rollup != null
	        ? rollup(array) : (sortValues != null
	        ? array.sort(sortValues)
	        : array);

	    var i = -1,
	        n = array.length,
	        key = keys[depth++],
	        keyValue,
	        value,
	        valuesByKey = map(),
	        values,
	        result = createResult();

	    while (++i < n) {
	      if (values = valuesByKey.get(keyValue = key(value = array[i]) + "")) {
	        values.push(value);
	      } else {
	        valuesByKey.set(keyValue, [value]);
	      }
	    }

	    valuesByKey.each(function(values, key) {
	      setResult(result, key, apply(values, depth, createResult, setResult));
	    });

	    return result;
	  }

	  function entries(map$$1, depth) {
	    if (++depth > keys.length) return map$$1;
	    var array, sortKey = sortKeys[depth - 1];
	    if (rollup != null && depth >= keys.length) array = map$$1.entries();
	    else array = [], map$$1.each(function(v, k) { array.push({key: k, values: entries(v, depth)}); });
	    return sortKey != null ? array.sort(function(a, b) { return sortKey(a.key, b.key); }) : array;
	  }

	  return nest = {
	    object: function(array) { return apply(array, 0, createObject, setObject); },
	    map: function(array) { return apply(array, 0, createMap, setMap); },
	    entries: function(array) { return entries(apply(array, 0, createMap, setMap), 0); },
	    key: function(d) { keys.push(d); return nest; },
	    sortKeys: function(order) { sortKeys[keys.length - 1] = order; return nest; },
	    sortValues: function(order) { sortValues = order; return nest; },
	    rollup: function(f) { rollup = f; return nest; }
	  };
	};

	function createObject() {
	  return {};
	}

	function setObject(object, key, value) {
	  object[key] = value;
	}

	function createMap() {
	  return map();
	}

	function setMap(map$$1, key, value) {
	  map$$1.set(key, value);
	}

	function Set() {}

	var proto = map.prototype;

	Set.prototype = set.prototype = {
	  constructor: Set,
	  has: proto.has,
	  add: function(value) {
	    value += "";
	    this[prefix + value] = value;
	    return this;
	  },
	  remove: proto.remove,
	  clear: proto.clear,
	  values: proto.keys,
	  size: proto.size,
	  empty: proto.empty,
	  each: proto.each
	};

	function set(object, f) {
	  var set = new Set;

	  // Copy constructor.
	  if (object instanceof Set) object.each(function(value) { set.add(value); });

	  // Otherwise, assume it’s an array.
	  else if (object) {
	    var i = -1, n = object.length;
	    if (f == null) while (++i < n) set.add(object[i]);
	    else while (++i < n) set.add(f(object[i], i, object));
	  }

	  return set;
	}

	var keys = function(map) {
	  var keys = [];
	  for (var key in map) keys.push(key);
	  return keys;
	};

	var values = function(map) {
	  var values = [];
	  for (var key in map) values.push(map[key]);
	  return values;
	};

	var entries = function(map) {
	  var entries = [];
	  for (var key in map) entries.push({key: key, value: map[key]});
	  return entries;
	};

	exports.nest = nest;
	exports.set = set;
	exports.map = map;
	exports.keys = keys;
	exports.values = values;
	exports.entries = entries;

	Object.defineProperty(exports, '__esModule', { value: true });

	})));


/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-dispatch/ Version 1.0.3. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';

	var noop = {value: function() {}};

	function dispatch() {
	  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
	    if (!(t = arguments[i] + "") || (t in _)) throw new Error("illegal type: " + t);
	    _[t] = [];
	  }
	  return new Dispatch(_);
	}

	function Dispatch(_) {
	  this._ = _;
	}

	function parseTypenames(typenames, types) {
	  return typenames.trim().split(/^|\s+/).map(function(t) {
	    var name = "", i = t.indexOf(".");
	    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
	    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
	    return {type: t, name: name};
	  });
	}

	Dispatch.prototype = dispatch.prototype = {
	  constructor: Dispatch,
	  on: function(typename, callback) {
	    var _ = this._,
	        T = parseTypenames(typename + "", _),
	        t,
	        i = -1,
	        n = T.length;

	    // If no callback was specified, return the callback of the given type and name.
	    if (arguments.length < 2) {
	      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
	      return;
	    }

	    // If a type was specified, set the callback for the given type and name.
	    // Otherwise, if a null callback was specified, remove callbacks of the given name.
	    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
	    while (++i < n) {
	      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
	      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
	    }

	    return this;
	  },
	  copy: function() {
	    var copy = {}, _ = this._;
	    for (var t in _) copy[t] = _[t].slice();
	    return new Dispatch(copy);
	  },
	  call: function(type, that) {
	    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
	    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
	    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	  },
	  apply: function(type, that, args) {
	    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
	    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	  }
	};

	function get(type, name) {
	  for (var i = 0, n = type.length, c; i < n; ++i) {
	    if ((c = type[i]).name === name) {
	      return c.value;
	    }
	  }
	}

	function set(type, name, callback) {
	  for (var i = 0, n = type.length; i < n; ++i) {
	    if (type[i].name === name) {
	      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
	      break;
	    }
	  }
	  if (callback != null) type.push({name: name, value: callback});
	  return type;
	}

	exports.dispatch = dispatch;

	Object.defineProperty(exports, '__esModule', { value: true });

	})));


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-dsv/ Version 1.0.5. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';

	function objectConverter(columns) {
	  return new Function("d", "return {" + columns.map(function(name, i) {
	    return JSON.stringify(name) + ": d[" + i + "]";
	  }).join(",") + "}");
	}

	function customConverter(columns, f) {
	  var object = objectConverter(columns);
	  return function(row, i) {
	    return f(object(row), i, columns);
	  };
	}

	// Compute unique columns in order of discovery.
	function inferColumns(rows) {
	  var columnSet = Object.create(null),
	      columns = [];

	  rows.forEach(function(row) {
	    for (var column in row) {
	      if (!(column in columnSet)) {
	        columns.push(columnSet[column] = column);
	      }
	    }
	  });

	  return columns;
	}

	var dsv = function(delimiter) {
	  var reFormat = new RegExp("[\"" + delimiter + "\n\r]"),
	      delimiterCode = delimiter.charCodeAt(0);

	  function parse(text, f) {
	    var convert, columns, rows = parseRows(text, function(row, i) {
	      if (convert) return convert(row, i - 1);
	      columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
	    });
	    rows.columns = columns;
	    return rows;
	  }

	  function parseRows(text, f) {
	    var EOL = {}, // sentinel value for end-of-line
	        EOF = {}, // sentinel value for end-of-file
	        rows = [], // output rows
	        N = text.length,
	        I = 0, // current character index
	        n = 0, // the current line number
	        t, // the current token
	        eol; // is the current token followed by EOL?

	    function token() {
	      if (I >= N) return EOF; // special case: end of file
	      if (eol) return eol = false, EOL; // special case: end of line

	      // special case: quotes
	      var j = I, c;
	      if (text.charCodeAt(j) === 34) {
	        var i = j;
	        while (i++ < N) {
	          if (text.charCodeAt(i) === 34) {
	            if (text.charCodeAt(i + 1) !== 34) break;
	            ++i;
	          }
	        }
	        I = i + 2;
	        c = text.charCodeAt(i + 1);
	        if (c === 13) {
	          eol = true;
	          if (text.charCodeAt(i + 2) === 10) ++I;
	        } else if (c === 10) {
	          eol = true;
	        }
	        return text.slice(j + 1, i).replace(/""/g, "\"");
	      }

	      // common case: find next delimiter or newline
	      while (I < N) {
	        var k = 1;
	        c = text.charCodeAt(I++);
	        if (c === 10) eol = true; // \n
	        else if (c === 13) { eol = true; if (text.charCodeAt(I) === 10) ++I, ++k; } // \r|\r\n
	        else if (c !== delimiterCode) continue;
	        return text.slice(j, I - k);
	      }

	      // special case: last token before EOF
	      return text.slice(j);
	    }

	    while ((t = token()) !== EOF) {
	      var a = [];
	      while (t !== EOL && t !== EOF) {
	        a.push(t);
	        t = token();
	      }
	      if (f && (a = f(a, n++)) == null) continue;
	      rows.push(a);
	    }

	    return rows;
	  }

	  function format(rows, columns) {
	    if (columns == null) columns = inferColumns(rows);
	    return [columns.map(formatValue).join(delimiter)].concat(rows.map(function(row) {
	      return columns.map(function(column) {
	        return formatValue(row[column]);
	      }).join(delimiter);
	    })).join("\n");
	  }

	  function formatRows(rows) {
	    return rows.map(formatRow).join("\n");
	  }

	  function formatRow(row) {
	    return row.map(formatValue).join(delimiter);
	  }

	  function formatValue(text) {
	    return text == null ? ""
	        : reFormat.test(text += "") ? "\"" + text.replace(/\"/g, "\"\"") + "\""
	        : text;
	  }

	  return {
	    parse: parse,
	    parseRows: parseRows,
	    format: format,
	    formatRows: formatRows
	  };
	};

	var csv = dsv(",");

	var csvParse = csv.parse;
	var csvParseRows = csv.parseRows;
	var csvFormat = csv.format;
	var csvFormatRows = csv.formatRows;

	var tsv = dsv("\t");

	var tsvParse = tsv.parse;
	var tsvParseRows = tsv.parseRows;
	var tsvFormat = tsv.format;
	var tsvFormatRows = tsv.formatRows;

	exports.dsvFormat = dsv;
	exports.csvParse = csvParse;
	exports.csvParseRows = csvParseRows;
	exports.csvFormat = csvFormat;
	exports.csvFormatRows = csvFormatRows;
	exports.tsvParse = tsvParse;
	exports.tsvParseRows = tsvParseRows;
	exports.tsvFormat = tsvFormat;
	exports.tsvFormatRows = tsvFormatRows;

	Object.defineProperty(exports, '__esModule', { value: true });

	})));


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getIterator2 = __webpack_require__(123);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _regenerator = __webpack_require__(119);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _set = __webpack_require__(90);

	var _set2 = _interopRequireDefault(_set);

	var _toConsumableArray2 = __webpack_require__(130);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _keys = __webpack_require__(87);

	var _keys2 = _interopRequireDefault(_keys);

	exports.asArray = asArray;
	exports.isArrayOfType = isArrayOfType;
	exports.isNumber = isNumber;
	exports.arrayEqual = arrayEqual;
	exports.transpose = transpose;
	exports.combine = combine;
	exports.makeGenerator = makeGenerator;
	exports.match = match;
	exports.iter = iter;
	exports.chain = chain;
	exports.saveFile = saveFile;
	exports.loadTextFile = loadTextFile;
	exports.addFileProtocol = addFileProtocol;
	exports.xSplit = xSplit;
	exports.xReplace = xReplace;
	exports.xContains = xContains;
	exports.compare = compare;
	exports.hashCode = hashCode;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _marked = [makeGenerator, iter].map(_regenerator2['default'].mark);

	function asArray(x) {
	    if (!x) return [];
	    return Array.isArray(x) ? x : [x];
	}

	function isArrayOfType(value, ofType) {
	    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

	    return value instanceof Array && value.hasOwnProperty(index) && (ofType === String ? typeof value[index] === 'string' : value[index] instanceof ofType) ? true : false;
	}

	function isNumber(x) {
	    return !isNaN(parseFloat(x)) && isFinite(x);
	}

	function arrayEqual(a, b) {
	    var byOrder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	    return byOrder ? (0, _keys2['default'])(a).map(function (x) {
	        return a[x] === b[x];
	    }).reduce(function (p, n) {
	        return p ? n : p;
	    }, true) : [].concat((0, _toConsumableArray3['default'])(new _set2['default'](a.filter(function (x) {
	        return !new _set2['default'](b).has(x);
	    })))).length === 0;
	}

	function transpose(table) {
	    var tableSize = table.map(function (row) {
	        return row.length;
	    }).reduce(function (p, n) {
	        return Math.max(p, n);
	    }, 0);
	    return [].concat((0, _toConsumableArray3['default'])(Array(tableSize).keys())).map(function (index) {
	        return table.map(function (row) {
	            return row[index];
	        });
	    });
	}

	function combine(table) {
	    var memory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	    if (table.length === 1) {
	        return table[0].map(function (elem) {
	            return [].concat((0, _toConsumableArray3['default'])(memory), [elem]);
	        });
	    }
	    return table[0].map(function (elem) {
	        return combine(table.slice(1, table.length), [].concat((0, _toConsumableArray3['default'])(memory), [elem]));
	    }).reduce(function (p, n) {
	        return [].concat((0, _toConsumableArray3['default'])(p), (0, _toConsumableArray3['default'])(n));
	    });
	}

	function makeGenerator(x) {
	    return _regenerator2['default'].wrap(function makeGenerator$(_context) {
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
	    var abort = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
	        return false;
	    };

	    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, iteration, modifiedRow;

	    return _regenerator2['default'].wrap(function iter$(_context2) {
	        while (1) {
	            switch (_context2.prev = _context2.next) {
	                case 0:
	                    _iteratorNormalCompletion = true;
	                    _didIteratorError = false;
	                    _iteratorError = undefined;
	                    _context2.prev = 3;
	                    _iterator = (0, _getIterator3['default'])(data);

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

	                    if (!_iteratorNormalCompletion && _iterator['return']) {
	                        _iterator['return']();
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
	    try {
	        __webpack_require__(162).writeFileSync(path, content);
	    } catch (e) {
	        console.log('File system module is not available.');
	    }
	}

	function loadTextFile(file, func) {
	    if (FileReader && File) {
	        var reader = new FileReader();
	        reader.onload = function (event) {
	            return func(event.target.result);
	        };
	        reader.readAsText(file);
	    }
	}

	function addFileProtocol(path) {
	    return path.startsWith('/') ? 'file://' + path : path;
	}

	function xSplit(stringToSplit) {
	    for (var _len3 = arguments.length, patterns = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	        patterns[_key3 - 1] = arguments[_key3];
	    }

	    return patterns.reduce(function (prev, next) {
	        return prev.map(function (str) {
	            return str.split(next);
	        }).reduce(function (p, n) {
	            return [].concat((0, _toConsumableArray3['default'])(p), (0, _toConsumableArray3['default'])(n));
	        }, []);
	    }, [stringToSplit]);
	}

	function xReplace(stringToReplace) {
	    for (var _len4 = arguments.length, patterns = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	        patterns[_key4 - 1] = arguments[_key4];
	    }

	    return patterns.reduce(function (prev, next) {
	        return prev.split(next[0]).join(next[1]);
	    }, stringToReplace);
	}

	function xContains(stringWhereFind) {
	    for (var _len5 = arguments.length, patterns = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
	        patterns[_key5 - 1] = arguments[_key5];
	    }

	    return patterns.filter(function (pattern) {
	        return stringWhereFind.includes(pattern);
	    });
	}

	function compare(firstElem, secondElem) {
	    var reverse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	    if (firstElem > secondElem) {
	        return reverse ? -1 : 1;
	    } else if (firstElem < secondElem) {
	        return reverse ? 1 : -1;
	    }
	    return 0;
	}

	function hashCode(str) {
	    var hash = 0;
	    var char = void 0;
	    if (str.length === 0) return hash;
	    for (var i = 0; i < str.length; i++) {
	        char = str.charCodeAt(i);
	        hash = (hash << 5) - hash + char;
	        hash = hash & hash;
	    }
	    return hash;
	}

/***/ },
/* 162 */
/***/ function(module, exports) {

	

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TableAlreadyExistsError = exports.SQLParseError = exports.WrongSchemaError = exports.NoSuchColumnError = exports.InputTypeError = exports.MixedTypeError = undefined;

	var _getPrototypeOf = __webpack_require__(113);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(147);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(151);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(152);

	var _inherits3 = _interopRequireDefault(_inherits2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var MixedTypeError = exports.MixedTypeError = function (_TypeError) {
	    (0, _inherits3['default'])(MixedTypeError, _TypeError);

	    function MixedTypeError() {
	        (0, _classCallCheck3['default'])(this, MixedTypeError);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (MixedTypeError.__proto__ || (0, _getPrototypeOf2['default'])(MixedTypeError)).call(this));

	        for (var _len = arguments.length, types = Array(_len), _key = 0; _key < _len; _key++) {
	            types[_key] = arguments[_key];
	        }

	        _this.message = 'can\'t work with multiple variable types: [' + types.join(',') + '].';
	        _this.name = 'MixedTypeError';
	        return _this;
	    }

	    return MixedTypeError;
	}(TypeError);

	var InputTypeError = exports.InputTypeError = function (_TypeError2) {
	    (0, _inherits3['default'])(InputTypeError, _TypeError2);

	    function InputTypeError(inputName, supportedTypes, inputType) {
	        (0, _classCallCheck3['default'])(this, InputTypeError);

	        var _this2 = (0, _possibleConstructorReturn3['default'])(this, (InputTypeError.__proto__ || (0, _getPrototypeOf2['default'])(InputTypeError)).call(this));

	        _this2.message = inputName + ' must be one of [' + supportedTypes.join(',') + '], not a ' + inputType + '.';
	        return _this2;
	    }

	    return InputTypeError;
	}(TypeError);

	var NoSuchColumnError = exports.NoSuchColumnError = function (_TypeError3) {
	    (0, _inherits3['default'])(NoSuchColumnError, _TypeError3);

	    function NoSuchColumnError(column, columns) {
	        (0, _classCallCheck3['default'])(this, NoSuchColumnError);

	        var _this3 = (0, _possibleConstructorReturn3['default'])(this, (NoSuchColumnError.__proto__ || (0, _getPrototypeOf2['default'])(NoSuchColumnError)).call(this));

	        _this3.message = column + ' not found in [' + columns.join(', ') + '].';
	        _this3.name = 'NoSuchColumnError';
	        return _this3;
	    }

	    return NoSuchColumnError;
	}(TypeError);

	var WrongSchemaError = exports.WrongSchemaError = function (_Error) {
	    (0, _inherits3['default'])(WrongSchemaError, _Error);

	    function WrongSchemaError(columns, expected) {
	        (0, _classCallCheck3['default'])(this, WrongSchemaError);

	        var _this4 = (0, _possibleConstructorReturn3['default'])(this, (WrongSchemaError.__proto__ || (0, _getPrototypeOf2['default'])(WrongSchemaError)).call(this));

	        _this4.message = '[' + columns.join(', ') + '] while expecting [' + expected.join(', ') + '].';
	        _this4.name = 'WrongSchemaError';
	        return _this4;
	    }

	    return WrongSchemaError;
	}(Error);

	var SQLParseError = exports.SQLParseError = function (_Error2) {
	    (0, _inherits3['default'])(SQLParseError, _Error2);

	    function SQLParseError(message) {
	        (0, _classCallCheck3['default'])(this, SQLParseError);

	        var _this5 = (0, _possibleConstructorReturn3['default'])(this, (SQLParseError.__proto__ || (0, _getPrototypeOf2['default'])(SQLParseError)).call(this));

	        _this5.message = message + '.';
	        _this5.name = 'SQLParseError';
	        return _this5;
	    }

	    return SQLParseError;
	}(Error);

	var TableAlreadyExistsError = exports.TableAlreadyExistsError = function (_Error3) {
	    (0, _inherits3['default'])(TableAlreadyExistsError, _Error3);

	    function TableAlreadyExistsError(tableName) {
	        (0, _classCallCheck3['default'])(this, TableAlreadyExistsError);

	        var _this6 = (0, _possibleConstructorReturn3['default'])(this, (TableAlreadyExistsError.__proto__ || (0, _getPrototypeOf2['default'])(TableAlreadyExistsError)).call(this));

	        _this6.message = 'The SQL temporary table ' + tableName + ' already exits. Use overwrite = true to overwrite it.';
	        _this6.name = 'TableAlreadyExistsError';
	        return _this6;
	    }

	    return TableAlreadyExistsError;
	}(Error);

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getOwnPropertyDescriptor = __webpack_require__(2);

	var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

	var _entries = __webpack_require__(80);

	var _entries2 = _interopRequireDefault(_entries);

	var _is = __webpack_require__(28);

	var _is2 = _interopRequireDefault(_is);

	var _typeof2 = __webpack_require__(32);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _defineProperty2 = __webpack_require__(109);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _toConsumableArray2 = __webpack_require__(130);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _getPrototypeOf = __webpack_require__(113);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _create = __webpack_require__(116);

	var _create2 = _interopRequireDefault(_create);

	var _assign = __webpack_require__(126);

	var _assign2 = _interopRequireDefault(_assign);

	var _regenerator = __webpack_require__(119);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _values = __webpack_require__(84);

	var _values2 = _interopRequireDefault(_values);

	var _getIterator2 = __webpack_require__(123);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _iterator2 = __webpack_require__(33);

	var _iterator3 = _interopRequireDefault(_iterator2);

	var _freeze = __webpack_require__(165);

	var _freeze2 = _interopRequireDefault(_freeze);

	var _keys = __webpack_require__(87);

	var _keys2 = _interopRequireDefault(_keys);

	var _classCallCheck2 = __webpack_require__(147);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(148);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol = __webpack_require__(64);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _dec, _desc, _value, _class;

	var _es7ChecktypesDecorator = __webpack_require__(149);

	var _reusables = __webpack_require__(161);

	var _errors = __webpack_require__(163);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	    var desc = {};
	    Object['ke' + 'ys'](descriptor).forEach(function (key) {
	        desc[key] = descriptor[key];
	    });
	    desc.enumerable = !!desc.enumerable;
	    desc.configurable = !!desc.configurable;

	    if ('value' in desc || desc.initializer) {
	        desc.writable = true;
	    }

	    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
	        return decorator(target, property, desc) || desc;
	    }, desc);

	    if (context && desc.initializer !== void 0) {
	        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
	        desc.initializer = undefined;
	    }

	    if (desc.initializer === void 0) {
	        Object['define' + 'Property'](target, property, desc);
	        desc = null;
	    }

	    return desc;
	}

	var __columns__ = (0, _symbol2['default'])('columns');
	var __values__ = (0, _symbol2['default'])('values');

	/**
	 * Row data structure used into the dataframe-js.
	 */
	var Row = (_dec = (0, _es7ChecktypesDecorator.checktypes)(['Row', Array, Object]), (_class = function () {
	    /**
	     * Create a new Row.
	     * @param {Array | Object | Row} data The data of the Row.
	     * @param {Array} columns The DataFrame column names.
	     * @example
	     * new Row({
	     *      'column1': 3,
	     *      'column2': 6,
	     * })
	     *
	     * new Row([3, 6], ['column1', 'column2'])
	     *
	     * new Row(Row, ['column1', 'column3'])
	     */
	    function Row(data, columns) {
	        (0, _classCallCheck3['default'])(this, Row);

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
	                return (typeof value === 'undefined' ? 'undefined' : (0, _typeof3['default'])(value)) === 'object' && !(0, _is2['default'])(value, null);
	            }, function () {
	                return _this._fromObject(data);
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

	        /**
	         * Convert Row into dict / hash / object.
	         * @returns {Object} The Row converted into dict.
	         * @example
	         * row.toDict()
	         */

	    }, {
	        key: 'toDict',
	        value: function toDict() {
	            return (0, _assign2['default'])({}, this[__values__]);
	        }

	        /**
	         * Convert Row into Array, loosing column names.
	         * @returns {Array} The Row values converted into Array.
	         * @example
	         * row.toArray()
	         */

	    }, {
	        key: 'toArray',
	        value: function toArray() {
	            return [].concat((0, _toConsumableArray3['default'])(this));
	        }

	        /**
	         * Get the Row size.
	         * @returns {Int} The Row length.
	         * @example
	         * row.size()
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
	         * @example
	         * row.has('column1')
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
	         * @example
	         * row.select('column1', 'column2')
	         */

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

	        /**
	         * Get a Row value by its column.
	         * @param {String} columnToGet The column value to get.
	         * @returns The selected value.
	         * @example
	         * row.get('column1')
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
	         * @example
	         * row.set('column1', 6)
	         */

	    }, {
	        key: 'set',
	        value: function set(columnToSet, value) {
	            var newRow = (0, _assign2['default'])({}, this[__values__], (0, _defineProperty3['default'])({}, columnToSet, value));
	            return this.__newInstance__(newRow, (0, _keys2['default'])(newRow));
	        }

	        /**
	         * Delete a Row value by its column.
	         * @param {String} columnToDel The column value to delete.
	         * @returns {Row} A new Row without the deleted value.
	         * @example
	         * row.delete('column1')
	         */

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
	}(), (_applyDecoratedDescriptor(_class.prototype, '_build', [_dec], (0, _getOwnPropertyDescriptor2['default'])(_class.prototype, '_build'), _class.prototype)), _class));
	exports['default'] = Row;

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(166), __esModule: true };

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(167);
	module.exports = __webpack_require__(22).Object.freeze;

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.5 Object.freeze(O)
	var isObject = __webpack_require__(13)
	  , meta     = __webpack_require__(67).onFreeze;

	__webpack_require__(20)('freeze', function($freeze){
	  return function freeze(it){
	    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
	  };
	});

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports['default'] = undefined;

	var _getOwnPropertyDescriptor = __webpack_require__(2);

	var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

	var _slicedToArray2 = __webpack_require__(136);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	var _objectWithoutProperties2 = __webpack_require__(169);

	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

	var _extends3 = __webpack_require__(170);

	var _extends4 = _interopRequireDefault(_extends3);

	var _stringify = __webpack_require__(78);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _is = __webpack_require__(28);

	var _is2 = _interopRequireDefault(_is);

	var _defineProperty2 = __webpack_require__(109);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _assign = __webpack_require__(126);

	var _assign2 = _interopRequireDefault(_assign);

	var _toConsumableArray2 = __webpack_require__(130);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _entries = __webpack_require__(80);

	var _entries2 = _interopRequireDefault(_entries);

	var _regenerator = __webpack_require__(119);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _getIterator2 = __webpack_require__(123);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _iterator2 = __webpack_require__(33);

	var _iterator3 = _interopRequireDefault(_iterator2);

	var _classCallCheck2 = __webpack_require__(147);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(148);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol = __webpack_require__(64);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _dec, _dec2, _dec3, _desc, _value, _class;

	var _es7ChecktypesDecorator = __webpack_require__(149);

	var _reusables = __webpack_require__(161);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	    var desc = {};
	    Object['ke' + 'ys'](descriptor).forEach(function (key) {
	        desc[key] = descriptor[key];
	    });
	    desc.enumerable = !!desc.enumerable;
	    desc.configurable = !!desc.configurable;

	    if ('value' in desc || desc.initializer) {
	        desc.writable = true;
	    }

	    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
	        return decorator(target, property, desc) || desc;
	    }, desc);

	    if (context && desc.initializer !== void 0) {
	        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
	        desc.initializer = undefined;
	    }

	    if (desc.initializer === void 0) {
	        Object['define' + 'Property'](target, property, desc);
	        desc = null;
	    }

	    return desc;
	}

	var __groups__ = (0, _symbol2['default'])('groups');

	/**
	 * Grouped DataFrame structure grouping DataFrame rows by column value.
	 */
	var GroupedDataFrame = (_dec = (0, _es7ChecktypesDecorator.checktypes)('DataFrame', Array), _dec2 = (0, _es7ChecktypesDecorator.checktypes)('Function'), _dec3 = (0, _es7ChecktypesDecorator.checktypes)('String', 'Function'), (_class = function () {

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
	        (0, _classCallCheck3['default'])(this, GroupedDataFrame);

	        this.df = df;

	        for (var _len = arguments.length, columnNames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            columnNames[_key - 1] = arguments[_key];
	        }

	        this.on = columnNames;
	        this[__groups__] = this._groupBy(df, columnNames);
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
	        key: '__hashKey__',
	        value: function __hashKey__(groupKey) {
	            return (0, _reusables.hashCode)((0, _entries2['default'])(groupKey).reduce(function (p, n) {
	                return [].concat((0, _toConsumableArray3['default'])(p), (0, _toConsumableArray3['default'])(n));
	            }).join(''));
	        }
	    }, {
	        key: '_groupBy',
	        value: function _groupBy(df, columnNames) {
	            var _this = this;

	            return (0, _reusables.combine)(columnNames.map(function (column) {
	                return df.distinct(column).toArray(column);
	            })).map(function (combination) {
	                var groupKey = _assign2['default'].apply(Object, [{}].concat((0, _toConsumableArray3['default'])(combination.map(function (column, i) {
	                    return (0, _defineProperty3['default'])({}, columnNames[i], column);
	                }))));
	                return {
	                    groupKey: groupKey,
	                    hash: _this.__hashKey__(groupKey),
	                    group: df.filter(function (row) {
	                        return (0, _entries2['default'])(groupKey).reduce(function (p, n) {
	                            return p && (0, _is2['default'])(row.get(n[0]), n[1]);
	                        }, true);
	                    })
	                };
	            }).filter(function (_ref2) {
	                var group = _ref2.group;
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

	        /**
	         * Convert GroupedDataFrame into collection (Array) of dictionnaries (Object).
	         * @returns {Array} An Array containing group: {groupKey, group}.
	         * @example
	         * groupedDF.toCollection();
	         */

	    }, {
	        key: 'toCollection',
	        value: function toCollection() {
	            return [].concat((0, _toConsumableArray3['default'])(this));
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
	            var quiet = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	            return [].concat((0, _toConsumableArray3['default'])(this)).map(function (_ref3) {
	                var group = _ref3.group,
	                    groupKey = _ref3.groupKey;

	                var groupLog = '--\n[' + (0, _stringify2['default'])(groupKey) + ']\n--';
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
	         * @returns {Array} An Array containing GroupedDataFrame group names.
	         * @example
	         * gdf.listGroups()
	         */

	    }, {
	        key: 'listGroups',
	        value: function listGroups() {
	            return [].concat((0, _toConsumableArray3['default'])(this)).map(function (_ref4) {
	                var groupKey = _ref4.groupKey;
	                return groupKey;
	            });
	        }

	        /**
	         * List GroupedDataFrame groups as a hashCode.
	         * @returns {Array} An Array containing GroupedDataFrame hash codes.
	         * @example
	         * gdf.listHashCodes()
	         */

	    }, {
	        key: 'listHashs',
	        value: function listHashs() {
	            return [].concat((0, _toConsumableArray3['default'])(this)).map(function (_ref5) {
	                var hash = _ref5.hash;
	                return hash;
	            });
	        }
	    }, {
	        key: 'aggregate',

	        /**
	         * Create an aggregation from a function.
	         * @param {Function} func The aggregation function.
	         * @param {String} [columnName='aggregation'] The column name created by the aggregation.
	         * @returns {DataFrame} A new DataFrame with a column 'aggregation' containing the result.
	         * @example
	         * groupedDF.aggregate(group => group.stat.sum('column1'));
	         */
	        value: function aggregate(func) {
	            var columnName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'aggregation';

	            return this.df.__newInstance__([].concat((0, _toConsumableArray3['default'])(this)).map(function (_ref6) {
	                var group = _ref6.group,
	                    groupKey = _ref6.groupKey;
	                return (0, _extends4['default'])({}, groupKey, (0, _defineProperty3['default'])({}, columnName, func(group, groupKey)));
	            }), [].concat((0, _toConsumableArray3['default'])(this.on), [columnName]));
	        }
	    }, {
	        key: 'pivot',

	        /**
	         * Pivot a GroupedDataFrame.
	         * @param {String} columnToPivot The column which will be transposed as columns.
	         * @param {Function} [func=(gdf) => gdf.count()] The function to define each column value from a DataFrame.
	         * @returns {DataFrame} The pivot DataFrame.
	         * @example
	         * df.groupBy('carType').pivot('carModel', values => values.stat.sum('kms'))
	         */
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
	            }).toCollection().map(function (_ref8) {
	                var aggregation = _ref8.aggregation,
	                    rest = (0, _objectWithoutProperties3['default'])(_ref8, ['aggregation']);
	                return (0, _extends4['default'])({}, rest, aggregation);
	            }), columns);
	        }

	        /**
	         * Melt a DataFrame to make it tidy. It's the reverse of GroupedDataFrame.pivot().
	         * @param {String} [variableColumnName='variable'] The column name containing columns.
	         * @param {String} [variableColumnName='value'] The column name containing values.
	         * @returns {DataFrame} The tidy DataFrame.
	         * @example
	         * df.groupBy('carType').melt('kms')
	         */

	    }, {
	        key: 'melt',
	        value: function melt() {
	            var _this2 = this;

	            var variableColumnName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'variable';
	            var valueColumnName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'value';

	            var columns = [].concat((0, _toConsumableArray3['default'])(this.on), [variableColumnName, valueColumnName]);
	            return this.df.__newInstance__(this.aggregate(function (group) {
	                return (0, _entries2['default'])(group.toDict()).reduce(function (tidy, _ref9) {
	                    var _ref10 = (0, _slicedToArray3['default'])(_ref9, 2),
	                        key = _ref10[0],
	                        value = _ref10[1];

	                    return [].concat((0, _toConsumableArray3['default'])(tidy), (0, _toConsumableArray3['default'])(value.reduce(function (p, n) {
	                        var _ref11;

	                        return !_this2.on.includes(key) ? [].concat((0, _toConsumableArray3['default'])(p), [(_ref11 = {}, (0, _defineProperty3['default'])(_ref11, variableColumnName, key), (0, _defineProperty3['default'])(_ref11, valueColumnName, n), _ref11)]) : p;
	                    }, [])));
	                }, []);
	            }).toCollection().reduce(function (p, _ref12) {
	                var aggregation = _ref12.aggregation,
	                    rest = (0, _objectWithoutProperties3['default'])(_ref12, ['aggregation']);
	                return [].concat((0, _toConsumableArray3['default'])(p), (0, _toConsumableArray3['default'])(aggregation.map(function (x) {
	                    return (0, _extends4['default'])({}, rest, x);
	                })));
	            }, []), columns);
	        }
	    }]);
	    return GroupedDataFrame;
	}(), (_applyDecoratedDescriptor(_class.prototype, '_groupBy', [_dec], (0, _getOwnPropertyDescriptor2['default'])(_class.prototype, '_groupBy'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'aggregate', [_dec2], (0, _getOwnPropertyDescriptor2['default'])(_class.prototype, 'aggregate'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'pivot', [_dec3], (0, _getOwnPropertyDescriptor2['default'])(_class.prototype, 'pivot'), _class.prototype)), _class));
	exports['default'] = GroupedDataFrame;

/***/ },
/* 169 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (obj, keys) {
	  var target = {};

	  for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;
	    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	    target[i] = obj[i];
	  }

	  return target;
	};

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _assign = __webpack_require__(126);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _assign2.default || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classCallCheck2 = __webpack_require__(147);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(148);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _reusables = __webpack_require__(161);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	* Stat module for DataFrame, providing basic statistical metrics for numeric columns.
	 */
	var Stat = function () {
	    /**
	     * Start the Stat module.
	     * @param {DataFrame} df An instance of DataFrame.
	     */
	    function Stat(df) {
	        (0, _classCallCheck3['default'])(this, Stat);

	        this.df = df;
	        this.name = 'stat';
	    }

	    /**
	    * Compute the sum of a numeric column.
	    * @param {String} columnName The column to evaluate, containing Numbers.
	    * @returns {Number} The sum of the column.
	    * @example
	    * df.stat.sum('column1')
	    */


	    (0, _createClass3['default'])(Stat, [{
	        key: 'sum',
	        value: function sum(columnName) {
	            return Number(this.df.reduce(function (p, n) {
	                return (0, _reusables.isNumber)(n.get(columnName)) ? p + Number(n.get(columnName)) : p;
	            }, 0));
	        }

	        /**
	         * Compute the maximal value into a numeric column.
	         * @param {String} columnName The column to evaluate, containing Numbers.
	         * @returns {Number} The maximal value into the column.
	         * @example
	         * df.stat.max('column1')
	         */

	    }, {
	        key: 'max',
	        value: function max(columnName) {
	            return Number(this.df.reduce(function (p, n) {
	                return (0, _reusables.isNumber)(n.get(columnName)) && n.get(columnName) > p ? n.get(columnName) : p;
	            }, 0));
	        }

	        /**
	         * Compute the minimal value into a numeric column.
	         * @param {String} columnName The column to evaluate, containing Numbers.
	         * @returns {Number} The minimal value into the column.
	         * @example
	         * df.stat.min('column1')
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
	         * @param {String} columnName The column to evaluate, containing Numbers.
	         * @returns {Number} The mean value into the column.
	         * @example
	         * df.stat.mean('column1')
	         */

	    }, {
	        key: 'mean',
	        value: function mean(columnName) {
	            var numericDF = this.df.filter(function (row) {
	                return (0, _reusables.isNumber)(row.get(columnName));
	            });
	            return Number(numericDF.reduce(function (p, n) {
	                return (0, _reusables.isNumber)(n.get(columnName)) ? p + Number(n.get(columnName)) : p;
	            }, 0)) / numericDF.count();
	        }

	        /**
	         * Compute the mean value into a numeric column.
	         * Alias from mean.
	         * @param {String} columnName The column to evaluate, containing Numbers.
	         * @returns {Number} The mean value into the column.
	         * @example
	         * df.stat.min('column1')
	         */

	    }, {
	        key: 'average',
	        value: function average(columnName) {
	            return this.mean(columnName);
	        }

	        /**
	         * Compute the variance into a numeric column.
	         * @param {String} columnName The column to evaluate, containing Numbers.
	         * @param {Boolean} [population=false] Population mode. If true, provide the population variance, not the sample one.
	         * @returns {Number} The variance into the column.
	         * @example
	         * df.stat.var('column1')
	         */

	    }, {
	        key: 'var',
	        value: function _var(columnName) {
	            var population = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

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
	         * @param {String} columnName The column to evaluate, containing Numbers.
	         * @param {Boolean} [population=false] Population mode. If true, provide the population standard deviation, not the sample one.
	         * @returns {Number} The standard deviation into the column.
	         * @example
	         * df.stat.sd('column1')
	         */

	    }, {
	        key: 'sd',
	        value: function sd(columnName) {
	            var population = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	            return Math.sqrt(this['var'](columnName, population));
	        }

	        /**
	         * Compute all the stats available with the Stat module on a numeric column.
	         * @param {String} columnName The column to evaluate, containing Numbers.
	         * @returns {Object} An dictionnary containing all statistical metrics available.
	         * @example
	         * df.stat.stats('column1')
	         */

	    }, {
	        key: 'stats',
	        value: function stats(columnName) {
	            return {
	                sum: this.sum(columnName),
	                mean: this.mean(columnName),
	                min: this.min(columnName),
	                max: this.max(columnName),
	                'var': this['var'](columnName),
	                varpop: this['var'](columnName, true),
	                sd: this.sd(columnName),
	                sdpop: this.sd(columnName, true)
	            };
	        }
	    }]);
	    return Stat;
	}();

	exports['default'] = Stat;

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getOwnPropertyDescriptor = __webpack_require__(2);

	var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

	var _keys = __webpack_require__(87);

	var _keys2 = _interopRequireDefault(_keys);

	var _toConsumableArray2 = __webpack_require__(130);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _classCallCheck2 = __webpack_require__(147);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(148);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _dec, _dec2, _dec3, _dec4, _desc, _value, _class;

	var _es7ChecktypesDecorator = __webpack_require__(149);

	var _errors = __webpack_require__(163);

	var _reusables = __webpack_require__(161);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	    var desc = {};
	    Object['ke' + 'ys'](descriptor).forEach(function (key) {
	        desc[key] = descriptor[key];
	    });
	    desc.enumerable = !!desc.enumerable;
	    desc.configurable = !!desc.configurable;

	    if ('value' in desc || desc.initializer) {
	        desc.writable = true;
	    }

	    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
	        return decorator(target, property, desc) || desc;
	    }, desc);

	    if (context && desc.initializer !== void 0) {
	        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
	        desc.initializer = undefined;
	    }

	    if (desc.initializer === void 0) {
	        Object['define' + 'Property'](target, property, desc);
	        desc = null;
	    }

	    return desc;
	}

	/**
	* Matrix module for DataFrame, providing basic mathematical matrix computations.
	 */
	var Matrix = (_dec = (0, _es7ChecktypesDecorator.checktypes)('DataFrame'), _dec2 = (0, _es7ChecktypesDecorator.checktypes)('DataFrame'), _dec3 = (0, _es7ChecktypesDecorator.checktypes)('Number'), _dec4 = (0, _es7ChecktypesDecorator.checktypes)('DataFrame'), (_class = function () {
	    /**
	     * Start the Matrix module.
	     * @param {DataFrame} df An instance of DataFrame.
	     */
	    function Matrix(df) {
	        (0, _classCallCheck3['default'])(this, Matrix);

	        this.df = df;
	        this.name = 'matrix';
	    }

	    (0, _createClass3['default'])(Matrix, [{
	        key: 'isCommutative',

	        /**
	         * Check if two DataFrames are commutative, if both have the same dimensions.
	         * @param {DataFrame} df The second DataFrame to check.
	         * @param {Boolean} [reverse = false] Revert the second DataFrame before the comparison.
	         * @returns {Boolean} True if they are commutative, else false.
	         * @example
	         * df.matrix.isCommutative(df2)
	         */
	        value: function isCommutative(df) {
	            var reverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	            return (0, _reusables.arrayEqual)(this.df.dim(), reverse ? df.dim().reverse() : df.dim(), true);
	        }
	    }, {
	        key: 'add',

	        /**
	         * Provide an elements pairwise addition of two DataFrames having the same dimensions.
	         * @param {DataFrame} df The second DataFrame to add.
	         * @returns {DataFrame} A new DataFrame resulting to the addition two DataFrames.
	         * @example
	         * df.matrix.add(df2)
	         */
	        value: function add(df) {
	            var _this = this;

	            if (!this.isCommutative(df)) {
	                throw new _errors.WrongSchemaError(this.df.dim(), df.dim());
	            }
	            var columns = [].concat((0, _toConsumableArray3['default'])(Array(this.df.dim()[1]).keys()));
	            return this.df.__newInstance__([].concat((0, _toConsumableArray3['default'])((0, _reusables.iter)((0, _keys2['default'])([].concat((0, _toConsumableArray3['default'])(this.df))), function (rowKey) {
	                var a = [].concat((0, _toConsumableArray3['default'])(_this.df))[rowKey].toArray();
	                var b = [].concat((0, _toConsumableArray3['default'])(df))[rowKey].toArray();
	                return columns.map(function (column) {
	                    return a[column] + b[column];
	                });
	            }))), this.df.listColumns());
	        }
	    }, {
	        key: 'product',

	        /**
	         * Provide a scalar product between a number and a DataFrame.
	         * @param {Number} number The number to multiply.
	         * @returns {DataFrame} A new DataFrame resulting to the scalar product.
	         * @example
	         * df.matrix.product(6)
	         */
	        value: function product(number) {
	            return this.df.map(function (row) {
	                return row.toArray().map(function (column) {
	                    return column * number;
	                });
	            });
	        }
	    }, {
	        key: 'dot',

	        /**
	         * Multiply one DataFrame n x p and a second p x n.
	         * @param {DataFrame} df The second DataFrame to multiply.
	         * @returns {DataFrame} A new n x n DataFrame resulting to the product of two DataFrame.
	         * @example
	         * df.matrix.dot(df)
	         */
	        value: function dot(df) {
	            var _this2 = this;

	            if (!this.isCommutative(df, true)) {
	                throw new _errors.WrongSchemaError(this.df.dim(), df.dim().reverse());
	            }
	            var columns = [].concat((0, _toConsumableArray3['default'])(Array(this.df.dim()[0]).keys()));
	            return this.df.__newInstance__([].concat((0, _toConsumableArray3['default'])((0, _reusables.iter)((0, _keys2['default'])([].concat((0, _toConsumableArray3['default'])(this.df))), function (rowKey) {
	                var a = [].concat((0, _toConsumableArray3['default'])(_this2.df))[rowKey].toArray();
	                return [].concat((0, _toConsumableArray3['default'])((0, _reusables.iter)(columns, function (column) {
	                    var b = [].concat((0, _toConsumableArray3['default'])(df.transpose()))[column].toArray();
	                    return (0, _keys2['default'])(b).reduce(function (p, n) {
	                        return p + b[n] * a[n];
	                    }, 0);
	                })));
	            }))), columns);
	        }
	    }]);
	    return Matrix;
	}(), (_applyDecoratedDescriptor(_class.prototype, 'isCommutative', [_dec], (0, _getOwnPropertyDescriptor2['default'])(_class.prototype, 'isCommutative'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'add', [_dec2], (0, _getOwnPropertyDescriptor2['default'])(_class.prototype, 'add'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'product', [_dec3], (0, _getOwnPropertyDescriptor2['default'])(_class.prototype, 'product'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'dot', [_dec4], (0, _getOwnPropertyDescriptor2['default'])(_class.prototype, 'dot'), _class.prototype)), _class));
	exports['default'] = Matrix;

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getOwnPropertyDescriptor = __webpack_require__(2);

	var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

	var _keys = __webpack_require__(87);

	var _keys2 = _interopRequireDefault(_keys);

	var _classCallCheck2 = __webpack_require__(147);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(148);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _dec, _dec2, _desc, _value, _class;

	var _es7ChecktypesDecorator = __webpack_require__(149);

	var _sqlEngine = __webpack_require__(174);

	var _sqlEngine2 = _interopRequireDefault(_sqlEngine);

	var _errors = __webpack_require__(163);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	    var desc = {};
	    Object['ke' + 'ys'](descriptor).forEach(function (key) {
	        desc[key] = descriptor[key];
	    });
	    desc.enumerable = !!desc.enumerable;
	    desc.configurable = !!desc.configurable;

	    if ('value' in desc || desc.initializer) {
	        desc.writable = true;
	    }

	    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
	        return decorator(target, property, desc) || desc;
	    }, desc);

	    if (context && desc.initializer !== void 0) {
	        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
	        desc.initializer = undefined;
	    }

	    if (desc.initializer === void 0) {
	        Object['define' + 'Property'](target, property, desc);
	        desc = null;
	    }

	    return desc;
	}

	/**
	* SQL module for DataFrame, providing SQL-like syntax for data exploration in DataFrames.
	 */
	var SQL = (_dec = (0, _es7ChecktypesDecorator.checktypes)('String'), _dec2 = (0, _es7ChecktypesDecorator.checktypes)('DataFrame', 'String'), (_class = function () {
	    (0, _createClass3['default'])(SQL, null, [{
	        key: 'request',

	        /**
	         * Request on a SQL query.
	         * @param {String} query A SQL query to request.
	         * @returns The result of the query.
	         * @example
	         * DataFrame.request('SELECT * FROM tmp');
	         */
	        value: function request(query) {
	            return (0, _sqlEngine2['default'])(query, SQL.tables);
	        }

	        /**
	         * Drop or remove all registered tables.
	         * @example
	         * DataFrame.dropTables();
	         */

	    }, {
	        key: 'dropTables',
	        value: function dropTables() {
	            SQL.tables = {};
	        }

	        /**
	         * Drop or remove a registered table.
	         * @param {String} tableName The registered table to drop.
	         * @example
	         * DataFrame.dropTable('tmp1');
	         */

	    }, {
	        key: 'dropTable',
	        value: function dropTable(tableName) {
	            delete SQL.tables[tableName];
	        }

	        /**
	         * Rename a registered table.
	         * @param {String} tableName The registered table to rename.
	         * @param {String} replacement The new table name.
	         * @param {Boolean} [overwrite=false] Overwrite if the table already exists.
	         * @example
	         * DataFrame.renameTable('tmp1', 'notTmp1');
	         */

	    }, {
	        key: 'renameTable',
	        value: function renameTable(tableName, replacement) {
	            var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	            SQL.registerTable(SQL.tables[tableName], replacement, overwrite);
	            SQL.dropTable(tableName);
	        }

	        /**
	         * List all registered tables.
	         * @returns {Array} A list of the registered tables.
	         * @example
	         * DataFrame.listTables();
	         */

	    }, {
	        key: 'listTables',
	        value: function listTables() {
	            return (0, _keys2['default'])(SQL.tables);
	        }
	    }, {
	        key: 'registerTable',

	        /**
	         * Register a DataFrame as a temporary table.
	         * @param {DataFrame} df The DataFrame to register.
	         * @param {String} tableName The temporary table name.
	         * @param {Boolean} [overwrite=false] Overwrite if the table already exists.
	         * @example
	         * DataFrame.registerTable('tmp', df);
	         */
	        value: function registerTable(df, tableName) {
	            var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	            if (SQL.listTables().includes(tableName) && !overwrite) {
	                throw new _errors.TableAlreadyExistsError(tableName);
	            }
	            SQL.tables[tableName] = df;
	        }

	        /**
	         * Start the SQL module.
	         * @param {DataFrame} df An instance of DataFrame.
	         */

	    }]);

	    function SQL(df) {
	        (0, _classCallCheck3['default'])(this, SQL);

	        this.df = df;
	        this.name = 'sql';
	    }

	    /**
	     * Register the DataFrame as temporary table.
	     * @param {String} tableName The name of the table.
	     * @param {Boolean} [overwrite=false] Overwrite if the table already exists.
	     * @example
	     * df.sql.register('tmp');
	     */


	    (0, _createClass3['default'])(SQL, [{
	        key: 'register',
	        value: function register(tableName) {
	            var overwrite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	            SQL.registerTable(this.df, tableName, overwrite);
	            return this.df;
	        }
	    }]);
	    return SQL;
	}(), (_applyDecoratedDescriptor(_class, 'request', [_dec], (0, _getOwnPropertyDescriptor2['default'])(_class, 'request'), _class), _applyDecoratedDescriptor(_class, 'registerTable', [_dec2], (0, _getOwnPropertyDescriptor2['default'])(_class, 'registerTable'), _class)), _class));


	SQL.tables = {};

	exports['default'] = SQL;

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _slicedToArray2 = __webpack_require__(136);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	var _keys = __webpack_require__(87);

	var _keys2 = _interopRequireDefault(_keys);

	var _toConsumableArray2 = __webpack_require__(130);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	exports['default'] = sqlParser;

	var _reusables = __webpack_require__(161);

	var _errors = __webpack_require__(163);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var REPLACMENTS = [['INNER JOIN', 'INNERJOIN'], ['LEFT JOIN', 'LEFTJOIN'], ['RIGHT JOIN', 'RIGHTJOIN'], ['FULL JOIN', 'FULLJOIN'], ['GROUP BY', 'GROUPBY']];

	var WHERE_OPERATORS = {
	    'IN': function IN(a, b) {
	        return b.includes(a);
	    },
	    'LIKE': function LIKE(a, b) {
	        return b.includes(a) || a.includes(b);
	    },
	    '>=': function _(a, b) {
	        return a >= b;
	    },
	    '<=': function _(a, b) {
	        return a <= b;
	    },
	    '!=': function _(a, b) {
	        return a !== b;
	    },
	    '<': function _(a, b) {
	        return a < b;
	    },
	    '>': function _(a, b) {
	        return a > b;
	    },
	    '=': function _(a, b) {
	        return a === b;
	    },
	    'AND': function AND(a, b) {
	        return a && b;
	    },
	    'OR': function OR(a, b) {
	        return a || b;
	    }
	};

	var SELECT_FUNCTIONS = {
	    'COUNT': function COUNT(df) {
	        return df.count();
	    },
	    'SUM': function SUM(df, column) {
	        return df.stat.sum(column);
	    },
	    'MAX': function MAX(df, column) {
	        return df.stat.max(column);
	    },
	    'MIN': function MIN(df, column) {
	        return df.stat.min(column);
	    },
	    'AVG': function AVG(df, column) {
	        return df.stat.mean(column);
	    }
	};

	function sqlArgsToArray(args) {
	    return (0, _reusables.xReplace)(args.join(' '), [' ', '']).split(',');
	}

	function joinHandler(operation, tables, type) {
	    var ONKeywordLocation = operation.findIndex(function (word) {
	        return word.toUpperCase() === 'ON';
	    }) + 1;
	    return function (df) {
	        return df.join(tables[operation[0]], sqlArgsToArray(operation.filter(function (word, loc) {
	            return loc >= ONKeywordLocation;
	        })), type);
	    };
	}

	var OPERATIONS_HANDLER = {
	    'WHERE': function WHERE(operation) {
	        var operationalTerms = (0, _reusables.xSplit)(operation.join(' '), ' AND ', ' OR ');
	        return function (df) {
	            return df.filter(function (row) {
	                var conditionalOperators = operation.filter(function (term) {
	                    return ['AND', 'OR'].includes(term.toUpperCase());
	                });
	                return operationalTerms.map(function (operationalTerm) {
	                    var operatorToApply = _reusables.xContains.apply(undefined, [operationalTerm].concat((0, _toConsumableArray3['default'])((0, _keys2['default'])(WHERE_OPERATORS))))[0];
	                    var terms = operationalTerm.replace(' ', '').split(operatorToApply);
	                    return WHERE_OPERATORS[operatorToApply](String(row.get(terms[0])), (0, _reusables.xReplace)(terms[1].trim(), ['\"', ''], ['\'', ''], ['\`', '']));
	                }).reduce(function (prev, next) {
	                    return WHERE_OPERATORS[conditionalOperators.shift()](prev, next);
	                });
	            });
	        };
	    },
	    'JOIN': function JOIN(operation, tables) {
	        return joinHandler(operation, tables, 'inner');
	    },
	    'INNERJOIN': function INNERJOIN(operation, tables) {
	        return joinHandler(operation, tables, 'inner');
	    },
	    'LEFTJOIN': function LEFTJOIN(operation, tables) {
	        return joinHandler(operation, tables, 'left');
	    },
	    'RIGHTJOIN': function RIGHTJOIN(operation, tables) {
	        return joinHandler(operation, tables, 'right');
	    },
	    'FULLJOIN': function FULLJOIN(operation, tables) {
	        return joinHandler(operation, tables, 'full');
	    },
	    'UNION': function UNION(operation, tables) {
	        return function (df) {
	            return df.union(operation[0].toUpperCase().includes('SELECT') ? sqlParser(operation.join(' '), tables) : tables[operation[0]]);
	        };
	    },
	    'GROUPBY': function GROUPBY(operation) {
	        return function (df) {
	            return df.groupBy.apply(df, (0, _toConsumableArray3['default'])(sqlArgsToArray(operation)));
	        };
	    }
	};

	function replaceTermsInQuery(query) {
	    var replacedQuery = query;
	    REPLACMENTS.forEach(function (_ref) {
	        var _ref2 = (0, _slicedToArray3['default'])(_ref, 2),
	            joinType = _ref2[0],
	            replacment = _ref2[1];

	        replacedQuery = replacedQuery.replace(joinType, replacment).replace(joinType.toLowerCase(), replacment);
	    });
	    return replacedQuery;
	}

	function sqlSplitter(query) {
	    var splittedQuery = replaceTermsInQuery(query).split(' ');
	    var fromLoc = splittedQuery.findIndex(function (word) {
	        return word.toUpperCase() === 'FROM';
	    });
	    if (fromLoc === -1) {
	        throw new _errors.SQLParseError('Your query should contains FROM keyword');
	    }
	    return {
	        selections: splittedQuery.slice(0, fromLoc),
	        table: splittedQuery[fromLoc + 1],
	        operations: splittedQuery.slice(fromLoc + 2, splittedQuery.length)
	    };
	}

	function parseOperations(operations, tables) {
	    var operationsLoc = operations.map(function (word, index) {
	        return (0, _keys2['default'])(OPERATIONS_HANDLER).includes(word.toUpperCase()) ? index : undefined;
	    }).filter(function (loc) {
	        return loc !== undefined;
	    });

	    return operationsLoc.map(function (loc, index) {
	        return OPERATIONS_HANDLER[operations[loc].toUpperCase()](operations.slice(loc + 1, operationsLoc[index + 1] ? operationsLoc[index + 1] : operations.length), tables);
	    }).reduce(function (prev, next) {
	        return function (df) {
	            return next(prev(df));
	        };
	    }, function (df) {
	        return df;
	    });
	}

	function parseSelections(selections) {
	    if (selections[0].toUpperCase() !== 'SELECT') {
	        throw new _errors.SQLParseError('Your query should begin with SELECT keyword');
	    }
	    selections.shift();
	    return (0, _reusables.match)(selections.join(' ').split(',').map(function (selection) {
	        return selection.trim();
	    }), [function (value) {
	        return (0, _reusables.xReplace)(value[0], [' ', '']) === '*';
	    }, function () {
	        return function (df) {
	            return df;
	        };
	    }], [function (value) {
	        return value[0].toUpperCase().includes('DISTINCT');
	    }, function (value) {
	        var columnName = (0, _reusables.xReplace)(value[0].split(' AS ')[0], ['DISTINCT', ''], ['distinct', ''], [' ', '']);
	        return function (df) {
	            return df.distinct(columnName).rename(columnName, value[0].includes('AS') ? value[0].split('AS')[1].replace(' ', '') : columnName);
	        };
	    }], [function (value) {
	        return _reusables.xContains.apply(undefined, [value[0].toUpperCase()].concat((0, _toConsumableArray3['default'])((0, _keys2['default'])(SELECT_FUNCTIONS))))[0];
	    }, function (value) {
	        return function (df) {
	            var functionToApply = (0, _keys2['default'])(SELECT_FUNCTIONS).find(function (func) {
	                return value[0].toUpperCase().includes(func);
	            });
	            var applyFunction = function applyFunction(dfToImpact) {
	                return SELECT_FUNCTIONS[functionToApply](dfToImpact, (0, _reusables.xReplace)(value[0], [functionToApply.toLowerCase() + '(', ''], [functionToApply + '(', ''], ['(', ''], [')', '']));
	            };
	            return df.on && df.df ? df.aggregate(applyFunction) : applyFunction(df);
	        };
	    }], [function () {
	        return true;
	    }, function (value) {
	        return function (df) {
	            return df.select.apply(df, (0, _toConsumableArray3['default'])(value.map(function (column) {
	                return column.split(' AS ')[0].replace(' ', '');
	            }))).renameAll(value.map(function (column) {
	                return column.includes('AS') ? column.split('AS')[1].replace(' ', '') : column;
	            }));
	        };
	    }]);
	}

	function sqlParser(query, tables) {
	    var _sqlSplitter = sqlSplitter(query),
	        selections = _sqlSplitter.selections,
	        table = _sqlSplitter.table,
	        operations = _sqlSplitter.operations;

	    if (!table || !(0, _keys2['default'])(tables).includes(table)) {
	        throw new _errors.SQLParseError('Wrong table name in your query: ' + table);
	    }
	    var applyOperations = parseOperations(operations, tables);
	    var applySelections = parseSelections(selections);
	    return applySelections(applyOperations(tables[table]));
	}

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports['default'] = undefined;

	var _toConsumableArray2 = __webpack_require__(130);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _regenerator = __webpack_require__(119);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _getIterator2 = __webpack_require__(123);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(147);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(148);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var Benchmark = function () {
	    function Benchmark() {
	        (0, _classCallCheck3['default'])(this, Benchmark);
	    }

	    (0, _createClass3['default'])(Benchmark, [{
	        key: '__benchmarks__',
	        value: _regenerator2['default'].mark(function __benchmarks__(func, repeats) {
	            var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, bench, timer, diff;

	            return _regenerator2['default'].wrap(function __benchmarks__$(_context) {
	                while (1) {
	                    switch (_context.prev = _context.next) {
	                        case 0:
	                            _iteratorNormalCompletion = true;
	                            _didIteratorError = false;
	                            _iteratorError = undefined;
	                            _context.prev = 3;
	                            _iterator = (0, _getIterator3['default'])(Array(repeats));

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

	                            if (!_iteratorNormalCompletion && _iterator['return']) {
	                                _iterator['return']();
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
	            var benchmarkResult = this._mean([].concat((0, _toConsumableArray3['default'])(this.__benchmarks__(func, repeats))));
	            console.log('New benchmark: ' + benchmarkResult + ' nanoseconds');
	            return benchmarkResult;
	        }
	    }, {
	        key: 'compare',
	        value: function compare(func1, func2, repeats) {
	            var _ref = [this.start(func1, repeats), this.start(func2, repeats)],
	                benchmarkResult1 = _ref[0],
	                benchmarkResult2 = _ref[1];

	            console.log('Most rapid function: ' + (benchmarkResult1 > benchmarkResult2 ? 'func2' : 'func1'));
	            return [benchmarkResult1, benchmarkResult2];
	        }
	    }]);
	    return Benchmark;
	}();

	exports['default'] = Benchmark;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(122)))

/***/ }
/******/ ]);