'use strict';

exports.__esModule = true;

var _is = require('babel-runtime/core-js/object/is');

var _is2 = _interopRequireDefault(_is);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _d3Request = require('d3-request');

var _d3Dsv = require('d3-dsv');

var _reusables = require('./reusables');

var _errors = require('./errors');

var _row = require('./row');

var _row2 = _interopRequireDefault(_row);

var _groupedDataframe = require('./groupedDataframe');

var _groupedDataframe2 = _interopRequireDefault(_groupedDataframe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __columns__ = (0, _symbol2['default'])('columns');
var __rows__ = (0, _symbol2['default'])('rows');

var DataFrame = function () {
    (0, _createClass3['default'])(DataFrame, null, [{
        key: 'setDefaultModules',
        value: function setDefaultModules() {
            for (var _len = arguments.length, defaultModules = Array(_len), _key = 0; _key < _len; _key++) {
                defaultModules[_key] = arguments[_key];
            }

            DataFrame.defaultModules = defaultModules;
        }
    }, {
        key: 'fromDSV',
        value: function fromDSV(pathOrFile) {
            var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ';';
            var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            var parser = (0, _d3Dsv.dsvFormat)(sep);
            return new _promise2['default'](function (resolve) {
                var parseText = function parseText(fileContent) {
                    if (fileContent.includes('Error: ENOENT')) return resolve(null);
                    var data = header ? parser.parse(fileContent) : parser.parseRows(fileContent);
                    return resolve(data);
                };
                return typeof pathOrFile === 'string' ? (0, _d3Request.text)((0, _reusables.addFileProtocol)(pathOrFile), parseText) : (0, _reusables.loadTextFile)(pathOrFile, parseText);
            }).then(function (fileContent) {
                if (fileContent === null) {
                    throw new _errors.FileNotFoundError(pathOrFile);
                }
                return new DataFrame(fileContent);
            });
        }
    }, {
        key: 'fromText',
        value: function fromText(pathOrFile) {
            var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ';';
            var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            return DataFrame.fromDSV(pathOrFile, sep, header);
        }
    }, {
        key: 'fromCSV',
        value: function fromCSV(pathOrFile) {
            var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            return DataFrame.fromDSV(pathOrFile, ',', header);
        }
    }, {
        key: 'fromTSV',
        value: function fromTSV(pathOrFile) {
            var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            return DataFrame.fromDSV(pathOrFile, '\t', header);
        }
    }, {
        key: 'fromPSV',
        value: function fromPSV(pathOrFile) {
            var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            return DataFrame.fromDSV(pathOrFile, '|', header);
        }
    }, {
        key: 'fromJSON',
        value: function fromJSON(pathOrFile) {
            return new _promise2['default'](function (resolve) {
                return typeof pathOrFile === 'string' ? (0, _d3Request.json)((0, _reusables.addFileProtocol)(pathOrFile), resolve) : (0, _reusables.loadTextFile)(pathOrFile, function (txt) {
                    return resolve(JSON.parse(txt));
                });
            }).then(function (fileContent) {
                if (fileContent === null) {
                    throw new _errors.FileNotFoundError(pathOrFile);
                }
                return new DataFrame(fileContent);
            });
        }
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
            var firstRowColumns = (0, _keys2['default'])(data[0].toDict());
            if (!(0, _reusables.arrayEqual)(firstRowColumns, this[__columns__], true)) {
                return new (Function.prototype.bind.apply(DataFrame, [null].concat([data, firstRowColumns], (0, _toConsumableArray3['default'])(this.modules))))();
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
            }], [function () {
                return true;
            }, function () {
                throw new _errors.ArgumentTypeError(data, 'DataFrame | Array | Object');
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
            if (!(dfToJoin instanceof DataFrame)) throw new _errors.ArgumentTypeError(dfToJoin, 'DataFrame');
            var newColumns = [].concat((0, _toConsumableArray3['default'])(new _set2['default']([].concat((0, _toConsumableArray3['default'])(this.listColumns()), (0, _toConsumableArray3['default'])(dfToJoin.listColumns())))));
            var columns = Array.isArray(columnNames) ? columnNames : [columnNames];
            var gdf = this.groupBy.apply(this, (0, _toConsumableArray3['default'])(columns));
            var gdfToJoin = dfToJoin.groupBy.apply(dfToJoin, (0, _toConsumableArray3['default'])(columns));
            return [this.__newInstance__([], newColumns)].concat((0, _toConsumableArray3['default'])((0, _reusables.iter)([].concat((0, _toConsumableArray3['default'])(types[0] ? this._joinByType(gdf, gdfToJoin, types[0], newColumns) : []), (0, _toConsumableArray3['default'])(types[1] ? this._joinByType(gdfToJoin, gdf, types[1], newColumns) : [])), function (group) {
                return group.restructure(newColumns);
            }))).reduce(function (p, n) {
                return p.union(n);
            }).dropDuplicates();
        }
    }, {
        key: '_cleanSavePath',
        value: function _cleanSavePath(path) {
            return path.replace('file://', '/');
        }
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
    }, {
        key: 'toArray',
        value: function toArray(columnName) {
            return columnName ? [].concat((0, _toConsumableArray3['default'])(this)).map(function (row) {
                return row.get(columnName);
            }) : [].concat((0, _toConsumableArray3['default'])(this)).map(function (row) {
                return row.toArray();
            });
        }
    }, {
        key: 'toCollection',
        value: function toCollection(ofRows) {
            return ofRows ? [].concat((0, _toConsumableArray3['default'])(this)) : [].concat((0, _toConsumableArray3['default'])(this)).map(function (row) {
                return row.toDict();
            });
        }
    }, {
        key: 'toDSV',
        value: function toDSV() {
            var sep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ';';
            var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

            var parser = (0, _d3Dsv.dsvFormat)(sep);
            var csvContent = header ? parser.format(this.toCollection(), this[__columns__]) : parser.formatRows(this.toArray());
            if (path) {
                (0, _reusables.saveFile)(this._cleanSavePath(path), csvContent);
            }
            return csvContent;
        }
    }, {
        key: 'toText',
        value: function toText() {
            var sep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ';';
            var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

            return this.toDSV(sep, header, path);
        }
    }, {
        key: 'toCSV',
        value: function toCSV() {
            var header = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
            var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

            return this.toDSV(',', header, path);
        }
    }, {
        key: 'toTSV',
        value: function toTSV() {
            var header = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
            var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

            return this.toDSV('\t', header, path);
        }
    }, {
        key: 'toPSV',
        value: function toPSV() {
            var header = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
            var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

            return this.toDSV('|', header, path);
        }
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
    }, {
        key: 'dim',
        value: function dim() {
            return [this.count(), this[__columns__].length];
        }
    }, {
        key: 'transpose',
        value: function transpose(tranposeColumnNames) {
            var newColumns = [].concat((0, _toConsumableArray3['default'])(tranposeColumnNames ? ['rowNames'] : []), (0, _toConsumableArray3['default'])([].concat((0, _toConsumableArray3['default'])(Array(this.count()).keys())).reverse()));
            var transposedRows = (0, _reusables.transpose)((tranposeColumnNames ? this.push(this[__columns__]) : this).toArray());
            return this.__newInstance__(transposedRows, newColumns.reverse()).restructure(newColumns);
        }
    }, {
        key: 'count',
        value: function count() {
            return this[__rows__].length;
        }
    }, {
        key: 'countValue',
        value: function countValue(valueToCount) {
            var columnName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this[__columns__][0];

            return this.filter(function (row) {
                return row.get(columnName) === valueToCount;
            }).count();
        }
    }, {
        key: 'push',
        value: function push() {
            for (var _len3 = arguments.length, rows = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rows[_key3] = arguments[_key3];
            }

            return this.union(new DataFrame(rows, this[__columns__]));
        }
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
    }, {
        key: 'distinct',
        value: function distinct(columnName) {
            return this.__newInstance__((0, _defineProperty3['default'])({}, columnName, [].concat((0, _toConsumableArray3['default'])(new _set2['default'](this.toArray(columnName))))), [columnName]);
        }
    }, {
        key: 'unique',
        value: function unique(columnName) {
            return this.distinct(columnName);
        }
    }, {
        key: 'listColumns',
        value: function listColumns() {
            return [].concat((0, _toConsumableArray3['default'])(this[__columns__]));
        }
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
    }, {
        key: 'restructure',
        value: function restructure(newColumnNames) {
            return this.__newInstance__(this[__rows__], newColumnNames);
        }
    }, {
        key: 'renameAll',
        value: function renameAll(newColumnNames) {
            if (newColumnNames.length !== this[__columns__].length) {
                throw new _errors.WrongSchemaError(newColumnNames, this[__columns__]);
            }
            return this.__newInstance__(this.toArray(), newColumnNames);
        }
    }, {
        key: 'rename',
        value: function rename(columnName, replacement) {
            var newColumnNames = this[__columns__].map(function (column) {
                return column === columnName ? replacement : column;
            });
            return this.renameAll(newColumnNames);
        }
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
    }, {
        key: 'cast',
        value: function cast(columnName, typeFunction) {
            return this.withColumn(columnName, function (row) {
                return typeFunction(row.get(columnName));
            });
        }
    }, {
        key: 'drop',
        value: function drop(columnName) {
            return this.__newInstance__(this[__rows__].map(function (row) {
                return row['delete'](columnName);
            }), this[__columns__].filter(function (column) {
                return column !== columnName;
            }));
        }
    }, {
        key: 'chain',
        value: function chain() {
            for (var _len5 = arguments.length, funcs = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                funcs[_key5] = arguments[_key5];
            }

            return this.__newInstance__([].concat((0, _toConsumableArray3['default'])(_reusables.chain.apply(undefined, [this[__rows__]].concat(funcs)))), this[__columns__]);
        }
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
    }, {
        key: 'where',
        value: function where(condition) {
            return this.filter(condition);
        }
    }, {
        key: 'find',
        value: function find(condition) {
            return this.filter(condition)[__rows__][0];
        }
    }, {
        key: 'map',
        value: function map(func) {
            return this.__newInstance__([].concat((0, _toConsumableArray3['default'])((0, _reusables.iter)(this[__rows__], function (row) {
                return func(row);
            }))), this[__columns__]);
        }
    }, {
        key: 'reduce',
        value: function reduce(func, init) {
            return typeof init === 'undefined' ? this[__rows__].reduce(function (p, n) {
                return func(p, n);
            }) : this[__rows__].reduce(function (p, n) {
                return func(p, n);
            }, init);
        }
    }, {
        key: 'reduceRight',
        value: function reduceRight(func, init) {
            return typeof init === 'undefined' ? this[__rows__].reduceRight(function (p, n) {
                return func(p, n);
            }) : this[__rows__].reduceRight(function (p, n) {
                return func(p, n);
            }, init);
        }
    }, {
        key: 'dropDuplicates',
        value: function dropDuplicates() {
            return this.groupBy.apply(this, (0, _toConsumableArray3['default'])(this[__columns__])).aggregate(function () {}).drop('aggregation');
        }
    }, {
        key: 'shuffle',
        value: function shuffle() {
            return this.__newInstance__(this.reduce(function (p, n) {
                var index = Math.floor(Math.random() * (p.length - 1) + 1);
                return Array.isArray(p) ? [].concat((0, _toConsumableArray3['default'])(p.slice(index, p.length + 1)), [n], (0, _toConsumableArray3['default'])(p.slice(0, index))) : [p, n];
            }), this[__columns__]);
        }
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
    }, {
        key: 'groupBy',
        value: function groupBy() {
            for (var _len6 = arguments.length, columnNames = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                columnNames[_key6] = arguments[_key6];
            }

            return new (Function.prototype.bind.apply(_groupedDataframe2['default'], [null].concat([this], columnNames)))();
        }
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
    }, {
        key: 'union',
        value: function union(dfToUnion) {
            if (!(dfToUnion instanceof DataFrame)) throw new _errors.ArgumentTypeError(dfToUnion, 'DataFrame');
            if (!(0, _reusables.arrayEqual)(this[__columns__], dfToUnion[__columns__])) {
                throw new _errors.WrongSchemaError(dfToUnion[__columns__], this[__columns__]);
            }
            return this.__newInstance__([].concat((0, _toConsumableArray3['default'])(this), (0, _toConsumableArray3['default'])(dfToUnion.restructure(this[__columns__]))), this[__columns__]);
        }
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
    }, {
        key: 'innerJoin',
        value: function innerJoin(dfToJoin, columnNames) {
            return this._join(dfToJoin, columnNames, ['in']);
        }
    }, {
        key: 'fullJoin',
        value: function fullJoin(dfToJoin, columnNames) {
            return this._join(dfToJoin, columnNames, ['full', 'full']);
        }
    }, {
        key: 'outerJoin',
        value: function outerJoin(dfToJoin, columnNames) {
            return this.fullJoin(dfToJoin, columnNames);
        }
    }, {
        key: 'leftJoin',
        value: function leftJoin(dfToJoin, columnNames) {
            return this._join(dfToJoin, columnNames, ['full', 'in']);
        }
    }, {
        key: 'rightJoin',
        value: function rightJoin(dfToJoin, columnNames) {
            return this._join(dfToJoin, columnNames, ['in', 'full']);
        }
    }, {
        key: 'diff',
        value: function diff(dfToDiff, columnNames) {
            return this._join(dfToDiff, columnNames, ['out', 'out']);
        }
    }]);
    return DataFrame;
}();

exports['default'] = DataFrame;