'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _is = require('babel-runtime/core-js/object/is');

var _is2 = _interopRequireDefault(_is);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _iterator2 = require('babel-runtime/core-js/symbol/iterator');

var _iterator3 = _interopRequireDefault(_iterator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _dec, _desc, _value, _class;

var _es7ChecktypesDecorator = require('es7-checktypes-decorator');

var _d3Request = require('d3-request');

var _d3Dsv = require('d3-dsv');

var _reusables = require('./reusables.js');

var _errors = require('./errors.js');

var _row = require('./row.js');

var _row2 = _interopRequireDefault(_row);

var _groupedDataframe = require('./groupedDataframe.js');

var _groupedDataframe2 = _interopRequireDefault(_groupedDataframe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var __columns__ = (0, _symbol2.default)('columns');
var __rows__ = (0, _symbol2.default)('rows');

/**
 * DataFrame data structure providing an immutable, flexible and powerfull way to manipulate data with columns and rows.
 */
var DataFrame = (_dec = (0, _es7ChecktypesDecorator.checktypes)(['DataFrame', Array, Object]), (_class = function () {
    (0, _createClass3.default)(DataFrame, null, [{
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

        /**
         * Create a DataFrame from a Text file. It returns a Promise.
         * @param {String} path A path to the file (url or local).
         * @param {String} sep The separator used to parse the file.
         * @param {Boolean} [header=true] A boolean indicating if the text has a header or not.
         * @example
         * DataFrame.fromText('http://myurl/myfile.txt').then(df => df.show())
         * DataFrame.fromText('file://my/absolue/path/myfile.txt').then(df => df.show())
         * DataFrame.fromText('file://my/absolue/path/myfile.txt', ';', true).then(df => df.show())
         */

    }, {
        key: 'fromText',
        value: function fromText(path) {
            var sep = arguments.length <= 1 || arguments[1] === undefined ? ';' : arguments[1];
            var header = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

            return new _promise2.default(function (resolve) {
                return (0, _d3Request.text)(path, function (response) {
                    var parser = (0, _d3Dsv.dsvFormat)(sep);
                    var data = header ? parser.parse(response) : parser.parseRows(response);
                    resolve(new DataFrame(data, data.columns));
                });
            });
        }

        /**
         * Create a DataFrame from a CSV file. It returns a Promise.
         * @param {String} path A path to the file (url or local).
         * @param {Boolean} [header=true] A boolean indicating if the csv has a header or not.
         * @example
         * DataFrame.fromCSV('http://myurl/myfile.csv').then(df => df.show())
         * DataFrame.fromCSV('file://my/absolue/path/myfile.csv').then(df => df.show())
         * DataFrame.fromCSV('file://my/absolue/path/myfile.csv', true).then(df => df.show())
         */

    }, {
        key: 'fromCSV',
        value: function fromCSV(path) {
            var header = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

            return new _promise2.default(function (resolve) {
                return (0, _d3Request.text)(path, function (response) {
                    var data = header ? (0, _d3Dsv.csvParse)(response) : (0, _d3Dsv.csvParseRows)(response);
                    resolve(new DataFrame(data, data.columns));
                });
            });
        }

        /**
         * Create a DataFrame from a JSON file. It returns a Promise.
         * @param {String} path A path to the file (url or local).
         * @example
         * DataFrame.fromJSON('http://myurl/myfile.json').then(df => df.show())
         * DataFrame.fromCSV('file://my/absolue/path/myfile.json').then(df => df.show())
         */

    }, {
        key: 'fromJSON',
        value: function fromJSON(path) {
            return new _promise2.default(function (resolve) {
                return (0, _d3Request.json)(path, function (response) {
                    resolve(new DataFrame(response));
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
        (0, _classCallCheck3.default)(this, DataFrame);

        var _build2 = this._build(data, this._dropSpacesInColumnNames(columns));

        var _build3 = (0, _slicedToArray3.default)(_build2, 2);

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
                return new (Function.prototype.bind.apply(DataFrame, [null].concat([data, this._dropSpacesInColumnNames(columns)], (0, _toConsumableArray3.default)(this.modules))))();
            }
            var newInstance = (0, _assign2.default)((0, _create2.default)((0, _getPrototypeOf2.default)(this)), this, (_Object$assign2 = {}, (0, _defineProperty3.default)(_Object$assign2, __rows__, [].concat((0, _toConsumableArray3.default)(data))), (0, _defineProperty3.default)(_Object$assign2, __columns__, [].concat((0, _toConsumableArray3.default)(this._dropSpacesInColumnNames(columns)))), _Object$assign2));
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
        key: '_dropSpacesInColumnNames',
        value: function _dropSpacesInColumnNames(columns) {
            return columns ? columns.map(function (column) {
                return String(column).replace(' ', '');
            }) : columns;
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
        key: '_joinByType',
        value: function _joinByType(gdf1, gdf2, type) {
            if (type === 'out' || type === 'in') {
                var _ret = function () {
                    var gdf2Groups = gdf2.listGroups().map(function (groupKey) {
                        return (0, _values2.default)(groupKey)[0];
                    });
                    return {
                        v: gdf1.toCollection().map(function (_ref2) {
                            var group = _ref2.group;
                            var groupKey = _ref2.groupKey;

                            var isContained = gdf2Groups.includes((0, _values2.default)(groupKey)[0]);
                            var filterCondition = function filterCondition(bool) {
                                return bool ? group : false;
                            };
                            return type === 'out' ? filterCondition(!isContained) : filterCondition(isContained);
                        }).filter(function (group) {
                            return group;
                        })
                    };
                }();

                if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
            }
            return gdf1.toCollection().map(function (_ref3) {
                var group = _ref3.group;
                return group;
            });
        }
    }, {
        key: '_join',
        value: function _join(dfToJoin, on, types) {
            var newColumns = [].concat((0, _toConsumableArray3.default)(new _set2.default([].concat((0, _toConsumableArray3.default)(this.listColumns()), (0, _toConsumableArray3.default)(dfToJoin.listColumns())))));
            var gdf = this.groupBy(on);
            var gdfToJoin = dfToJoin.groupBy(on);
            return [].concat((0, _toConsumableArray3.default)((0, _reusables.iter)([].concat((0, _toConsumableArray3.default)(this._joinByType(gdf, gdfToJoin, types[0])), (0, _toConsumableArray3.default)(this._joinByType(gdfToJoin, gdf, types[1]))), function (group) {
                return group.restructure(newColumns);
            }))).reduce(function (p, n) {
                return p.union(n);
            });
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
            var _this3 = this;

            return _assign2.default.apply(Object, [{}].concat((0, _toConsumableArray3.default)((0, _entries2.default)(this.transpose().toArray()).map(function (_ref4) {
                var _ref5 = (0, _slicedToArray3.default)(_ref4, 2);

                var index = _ref5[0];
                var column = _ref5[1];
                return (0, _defineProperty3.default)({}, _this3[__columns__][index], column);
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
            return columnName ? [].concat((0, _toConsumableArray3.default)(this)).map(function (row) {
                return row.get(columnName);
            }) : [].concat((0, _toConsumableArray3.default)(this)).map(function (row) {
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
            return ofRows ? [].concat((0, _toConsumableArray3.default)(this)) : [].concat((0, _toConsumableArray3.default)(this)).map(function (row) {
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
         * df.toText(';', true, '~/dataframe.txt')
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
         * @example
         * df.toCSV()
         * df.toCSV(true)
         * df.toCSV(true, '~/dataframe.csv')
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
         * @param {Boolean} [asCollection=true] Writing the JSON as collection of Object.
         * @param {String} [path] The path to save the file. /!\ Works only on node.js, not into the browser.
         * @returns {String} The json file in raw string.
         * @example
         * df.toJSON()
         * df.toJSON('~/dataframe.json')
         */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            var asCollection = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
            var path = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];

            var jsonContent = (0, _stringify2.default)(asCollection ? this.toCollection() : this.toDict());
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
         * df.show()
         * df.show(10)
         * const stringDF = df.show(10, true)
         */

    }, {
        key: 'show',
        value: function show() {
            var rows = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];
            var quiet = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            var makeRow = function makeRow(row) {
                return '| ' + row.map(function (column) {
                    var columnAsString = String(column);
                    return columnAsString.length > 9 ? columnAsString.substring(0, 6) + '...' : columnAsString + Array(10 - columnAsString.length).join(' ');
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
         * const [height, weight] = df.dim()
         */

    }, {
        key: 'dim',
        value: function dim() {
            return [this.count(), this[__columns__].length];
        }

        /**
         * Transpose a DataFrame. Rows become columns and conversely. n x p => p x n.
         * @returns {ÐataFrame} A new transpoded DataFrame.
         * @example
         * df.transpose()
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
         * @param {String} [columnName=this.listColumns()[0]] The column where found the value.
         * @returns {Int} The number of times the selected value appears.
         * @example
          * df.countValue(5, 'column2')
          * df.select('column1').countValue(5)
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
         * @param replacement The new value.
         * @param {...String} [columnNames=this.listColumns()] The columns where to apply the replacement.
         * @returns {DataFrame} A new DataFrame with replaced values.
         * @example
         * df.replace(undefined, 0, 'column1', 'column2')
         */

    }, {
        key: 'replace',
        value: function replace(value, replacement) {
            for (var _len4 = arguments.length, columnNames = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
                columnNames[_key4 - 2] = arguments[_key4];
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
         * df.distinct('column1')
         */

    }, {
        key: 'distinct',
        value: function distinct(columnName) {
            return this.__newInstance__((0, _defineProperty3.default)({}, columnName, [].concat((0, _toConsumableArray3.default)(new _set2.default(this.toArray(columnName))))), [columnName]);
        }

        /**
         * Compute unique values into a column.
         * Alias from .distinct()
         * @param {String} columnName The column to distinct.
         * @returns {Array} An Array containing distinct values of the column.
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
            return [].concat((0, _toConsumableArray3.default)(this[__columns__]));
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
         * df.withColumn('column4', () => 2)
         * df.withColumn('column2', (row) => row.get('column2') * 2)
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
            var _this5 = this;

            if (typeFunctions.length !== this[__columns__].length) {
                throw new _errors.WrongSchemaError(typeFunctions, this[__columns__]);
            }
            return this.map(function (row) {
                return new _row2.default(row.toArray().map(function (column, index) {
                    return typeFunctions[index](column);
                }), _this5[__columns__]);
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
                return row.delete(columnName);
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
            for (var _len6 = arguments.length, funcs = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                funcs[_key6] = arguments[_key6];
            }

            return this.__newInstance__([].concat((0, _toConsumableArray3.default)(_reusables.chain.apply(undefined, [this[__rows__]].concat(funcs)))), this[__columns__]);
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
            var func = (typeof condition === 'undefined' ? 'undefined' : (0, _typeof3.default)(condition)) === 'object' ? function (row) {
                return (0, _entries2.default)(condition).map(function (_ref7) {
                    var _ref8 = (0, _slicedToArray3.default)(_ref7, 2);

                    var column = _ref8[0];
                    var value = _ref8[1];
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
         * Return a shuffled DataFrame rows.
         * @returns {DataFrame} A shuffled DataFrame
         * @example
         * df.shuffle()
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
         * df.sample(0.3)
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
            return [this.__newInstance__([].concat((0, _toConsumableArray3.default)((0, _reusables.iter)(this.shuffle()[__rows__], function (row) {
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
            for (var _len7 = arguments.length, columnNames = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                columnNames[_key7] = arguments[_key7];
            }

            return new (Function.prototype.bind.apply(_groupedDataframe2.default, [null].concat([this], columnNames)))();
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
            var reverse = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            var sortedRows = this[__rows__].sort(function (p, n) {
                var pValue = p.get(columnName);
                var nValue = n.get(columnName);

                if ((typeof pValue === 'undefined' ? 'undefined' : (0, _typeof3.default)(pValue)) !== (typeof nValue === 'undefined' ? 'undefined' : (0, _typeof3.default)(nValue))) {
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
            return this.__newInstance__([].concat((0, _toConsumableArray3.default)(this), (0, _toConsumableArray3.default)(dfToUnion)), this[__columns__]);
        }

        /**
         * Join two DataFrames.
         * @param {DataFrame} dfToJoin The DataFrame to join.
         * @param {String} on The selected column for the join.
         * @param {String} [how='full'] The join mode. Can be: full, inner, outer, left, right.
         * @returns {DataFrame} The joined DataFrame.
         * @example
         * df.join(df2, 'column1', 'full')
         */

    }, {
        key: 'join',
        value: function join(dfToJoin, on) {
            var _this6 = this;

            var how = arguments.length <= 2 || arguments[2] === undefined ? 'inner' : arguments[2];

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
         * df.innerJoin(df2, 'id')
         * df.join(df2, 'id')
         * df.join(df2, 'id', 'inner')
         */

    }, {
        key: 'innerJoin',
        value: function innerJoin(dfToJoin, on) {
            return this._join(dfToJoin, on, ['in', 'in']);
        }

        /**
         * Join two DataFrames with full mode.
         * @param {DataFrame} dfToJoin The DataFrame to join.
         * @param {String} on The selected column for the join.
         * @returns {DataFrame} The joined DataFrame.
         * @example
         * df.fullJoin(df2, 'id')
         * df.join(df2, 'id', 'full')
         */

    }, {
        key: 'fullJoin',
        value: function fullJoin(dfToJoin, on) {
            return this._join(dfToJoin, on, ['', '']);
        }

        /**
         * Join two DataFrames with outer mode.
         * @param {DataFrame} dfToJoin The DataFrame to join.
         * @param {String} on The selected column for the join.
         * @returns {DataFrame} The joined DataFrame.
         * @example
         * df2.rightJoin(df2, 'id')
         * df2.join(df2, 'id', 'outer')
         */

    }, {
        key: 'outerJoin',
        value: function outerJoin(dfToJoin, on) {
            return this._join(dfToJoin, on, ['out', 'out']);
        }

        /**
         * Join two DataFrames with left mode.
         * @param {DataFrame} dfToJoin The DataFrame to join.
         * @param {String} on The selected column for the join.
         * @returns {DataFrame} The joined DataFrame.
         * @example
         * df.leftJoin(df2, 'id')
         * df.join(df2, 'id', 'left')
         */

    }, {
        key: 'leftJoin',
        value: function leftJoin(dfToJoin, on) {
            return this._join(dfToJoin, on, ['', 'in']);
        }

        /**
         * Join two DataFrames with right mode.
         * @param {DataFrame} dfToJoin The DataFrame to join.
         * @param {String} on The selected column for the join.
         * @returns {DataFrame} The joined DataFrame.
         * @example
         * df.rightJoin(df2, 'id')
         * df.join(df2, 'id', 'right')
         */

    }, {
        key: 'rightJoin',
        value: function rightJoin(dfToJoin, on) {
            return this._join(dfToJoin, on, ['in', '']);
        }
    }]);
    return DataFrame;
}(), (_applyDecoratedDescriptor(_class.prototype, '_build', [_dec], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, '_build'), _class.prototype)), _class));
exports.default = DataFrame;