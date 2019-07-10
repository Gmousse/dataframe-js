"use strict";

require("core-js/modules/es6.regexp.match");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.object.is");

require("core-js/modules/es7.object.entries");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es7.object.values");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.set");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/web.dom.iterable");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.promise");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

var _d3Request = require("d3-request");

var _d3Dsv = require("d3-dsv");

var _reusables = require("./reusables");

var _errors = require("./errors");

var _row = _interopRequireDefault(require("./row"));

var _groupedDataframe = _interopRequireDefault(require("./groupedDataframe"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __columns__ = Symbol("columns");

var __rows__ = Symbol("rows");

var DataFrame = function () {
  _createClass(DataFrame, null, [{
    key: "setDefaultModules",
    value: function setDefaultModules() {
      for (var _len = arguments.length, defaultModules = new Array(_len), _key = 0; _key < _len; _key++) {
        defaultModules[_key] = arguments[_key];
      }

      DataFrame.defaultModules = defaultModules;
    }
  }, {
    key: "fromDSV",
    value: function fromDSV(pathOrFile) {
      var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ";";
      var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var parser = (0, _d3Dsv.dsvFormat)(sep);
      return new Promise(function (resolve) {
        var parseText = function parseText(fileContent) {
          if (fileContent.includes("Error: ENOENT")) return resolve(null);
          var data = header ? parser.parse(fileContent) : parser.parseRows(fileContent);
          return resolve(data);
        };

        return typeof pathOrFile === "string" ? (0, _d3Request.text)((0, _reusables.addFileProtocol)(pathOrFile), parseText) : (0, _reusables.loadTextFile)(pathOrFile, parseText);
      }).then(function (fileContent) {
        if (fileContent === null) {
          throw new _errors.FileNotFoundError(pathOrFile);
        }

        return new DataFrame(fileContent);
      });
    }
  }, {
    key: "fromText",
    value: function fromText(pathOrFile) {
      var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ";";
      var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return DataFrame.fromDSV(pathOrFile, sep, header);
    }
  }, {
    key: "fromCSV",
    value: function fromCSV(pathOrFile) {
      var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return DataFrame.fromDSV(pathOrFile, ",", header);
    }
  }, {
    key: "fromTSV",
    value: function fromTSV(pathOrFile) {
      var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return DataFrame.fromDSV(pathOrFile, "\t", header);
    }
  }, {
    key: "fromPSV",
    value: function fromPSV(pathOrFile) {
      var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return DataFrame.fromDSV(pathOrFile, "|", header);
    }
  }, {
    key: "fromJSON",
    value: function fromJSON(pathOrFile) {
      return new Promise(function (resolve) {
        return typeof pathOrFile === "string" ? (0, _d3Request.json)((0, _reusables.addFileProtocol)(pathOrFile), resolve) : (0, _reusables.loadTextFile)(pathOrFile, function (txt) {
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
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, DataFrame);

    var _this$_build = this._build(data, columns);

    var _this$_build2 = _slicedToArray(_this$_build, 2);

    this[__rows__] = _this$_build2[0];
    this[__columns__] = _this$_build2[1];
    this.options = options;
    this.options.modules = [].concat(_toConsumableArray(DataFrame.defaultModules), _toConsumableArray(this.options.modules || []));
    Object.assign.apply(Object, [this].concat(_toConsumableArray(this.__instanciateModules__(this.options.modules))));
  }

  _createClass(DataFrame, [{
    key: Symbol.iterator,
    value: regeneratorRuntime.mark(function value() {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, row;

      return regeneratorRuntime.wrap(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 3;
              _iterator = this[__rows__][Symbol.iterator]();

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
              _context.t0 = _context["catch"](3);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 18:
              _context.prev = 18;
              _context.prev = 19;

              if (!_iteratorNormalCompletion && _iterator.return != null) {
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
            case "end":
              return _context.stop();
          }
        }
      }, value, this, [[3, 14, 18, 26], [19,, 21, 25]]);
    })
  }, {
    key: "_columnsAreEquals",
    value: function _columnsAreEquals(columns) {
      var columns2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this[__columns__];

      for (var _i2 = 0, _Object$keys = Object.keys(columns); _i2 < _Object$keys.length; _i2++) {
        var key = _Object$keys[_i2];
        if (columns[key] !== columns2[key]) return false;
      }

      return true;
    }
  }, {
    key: "__newInstance__",
    value: function __newInstance__(data, columns) {
      if (!this._columnsAreEquals(columns) || !(data[0] instanceof _row.default)) {
        return new DataFrame(data, columns, this.options);
      }

      var firstRowColumns = Object.keys(data[0].toDict());

      if (!(0, _reusables.arrayEqual)(firstRowColumns, this[__columns__], true)) {
        return new DataFrame(data, firstRowColumns, this.options);
      }

      var newInstance = new DataFrame([], [], this.options);
      newInstance[__rows__] = _toConsumableArray(data);
      newInstance[__columns__] = _toConsumableArray(columns);
      return newInstance;
    }
  }, {
    key: "__instanciateModules__",
    value: function __instanciateModules__(modules) {
      var _this = this;

      var df = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      return modules.map(function (Plugin) {
        var pluginInstance = new Plugin(df ? df : _this);
        return _defineProperty({}, pluginInstance.name, pluginInstance);
      });
    }
  }, {
    key: "_build",
    value: function _build(data, columns) {
      var _this2 = this;

      return (0, _reusables.match)(data, [function (value) {
        return value instanceof DataFrame;
      }, function () {
        return _this2._fromArray(_toConsumableArray(data[__rows__]), columns ? columns : data[__columns__]);
      }], [function (value) {
        return value instanceof Array && value.length !== 0;
      }, function () {
        return _this2._fromArray(data, columns ? columns : _toConsumableArray(new Set([].concat(_toConsumableArray(data.slice(0, 10)), _toConsumableArray(data.slice(-10, -1))).map(function (row) {
          return Object.keys(row);
        }).reduce(function (p, n) {
          return [].concat(_toConsumableArray(p), _toConsumableArray(n));
        }))));
      }], [function (value) {
        return value instanceof Array && value.length === 0;
      }, function () {
        return _this2._fromArray(data, columns ? columns : []);
      }], [function (value) {
        return value instanceof Object;
      }, function () {
        return _this2._fromDict(data, columns ? columns : Object.keys(data));
      }], [function () {
        return true;
      }, function () {
        throw new _errors.ArgumentTypeError(data, "DataFrame | Array | Object");
      }]);
    }
  }, {
    key: "_fromDict",
    value: function _fromDict(dict, columns) {
      return [(0, _reusables.transpose)(Object.values(dict)).map(function (row) {
        return new _row.default(row, columns);
      }), columns];
    }
  }, {
    key: "_fromArray",
    value: function _fromArray(array, columns) {
      return [array.map(function (row) {
        return new _row.default(row, columns);
      }), columns];
    }
  }, {
    key: "_joinByType",
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
              return Object.assign({}, row2, row);
            });
          }).reduce(function (p, n) {
            return [].concat(_toConsumableArray(p), _toConsumableArray(n));
          }, []);
          modifiedGroup = _this3.__newInstance__(combinedGroup, newColumns);
        }

        var filterCondition = function filterCondition(bool) {
          return bool ? modifiedGroup : false;
        };

        if (type === "full") return modifiedGroup;
        return type === "out" ? filterCondition(!isContained) : filterCondition(isContained);
      }).filter(function (group) {
        return group;
      });
    }
  }, {
    key: "_join",
    value: function _join(dfToJoin, columnNames, types) {
      if (!(dfToJoin instanceof DataFrame)) throw new _errors.ArgumentTypeError(dfToJoin, "DataFrame");

      var newColumns = _toConsumableArray(new Set([].concat(_toConsumableArray(this.listColumns()), _toConsumableArray(dfToJoin.listColumns()))));

      var columns = Array.isArray(columnNames) ? columnNames : [columnNames];
      var gdf = this.groupBy.apply(this, _toConsumableArray(columns));
      var gdfToJoin = dfToJoin.groupBy.apply(dfToJoin, _toConsumableArray(columns));
      return [this.__newInstance__([], newColumns)].concat(_toConsumableArray((0, _reusables.iter)([].concat(_toConsumableArray(types[0] ? this._joinByType(gdf, gdfToJoin, types[0], newColumns) : []), _toConsumableArray(types[1] ? this._joinByType(gdfToJoin, gdf, types[1], newColumns) : [])), function (group) {
        return group.restructure(newColumns);
      }))).reduce(function (p, n) {
        return p.union(n);
      }).dropDuplicates();
    }
  }, {
    key: "_cleanSavePath",
    value: function _cleanSavePath(path) {
      return path.replace("file://", "/");
    }
  }, {
    key: "toDict",
    value: function toDict() {
      var _this4 = this;

      return Object.assign.apply(Object, [{}].concat(_toConsumableArray(Object.entries(this.transpose().toArray()).map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            index = _ref4[0],
            column = _ref4[1];

        return _defineProperty({}, _this4[__columns__][index], column);
      }))));
    }
  }, {
    key: "toArray",
    value: function toArray(columnName) {
      return columnName ? _toConsumableArray(this).map(function (row) {
        return row.get(columnName);
      }) : _toConsumableArray(this).map(function (row) {
        return row.toArray();
      });
    }
  }, {
    key: "toCollection",
    value: function toCollection(ofRows) {
      return ofRows ? _toConsumableArray(this) : _toConsumableArray(this).map(function (row) {
        return row.toDict();
      });
    }
  }, {
    key: "toDSV",
    value: function toDSV() {
      var sep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ";";
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
    key: "toText",
    value: function toText() {
      var sep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ";";
      var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      return this.toDSV(sep, header, path);
    }
  }, {
    key: "toCSV",
    value: function toCSV() {
      var header = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      return this.toDSV(",", header, path);
    }
  }, {
    key: "toTSV",
    value: function toTSV() {
      var header = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      return this.toDSV("\t", header, path);
    }
  }, {
    key: "toPSV",
    value: function toPSV() {
      var header = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      return this.toDSV("|", header, path);
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var asCollection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var jsonContent = JSON.stringify(asCollection ? this.toCollection() : this.toDict());

      if (path) {
        (0, _reusables.saveFile)(this._cleanSavePath(path), jsonContent);
      }

      return jsonContent;
    }
  }, {
    key: "show",
    value: function show() {
      var rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      var quiet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var makeRow = function makeRow(row) {
        return "| ".concat(row.map(function (column) {
          var columnAsString = String(column);
          return columnAsString.length > 9 ? columnAsString.substring(0, 6) + "..." : columnAsString + Array(10 - columnAsString.length).join(" ");
        }).join(" | "), " |");
      };

      var header = makeRow(this[__columns__]);
      var token = 0;
      var toShow = [header, Array(header.length).join("-")].concat(_toConsumableArray((0, _reusables.iter)(this[__rows__], function (row) {
        token++;
        return makeRow(row.toArray());
      }, function () {
        return token >= rows;
      }))).join("\n");

      if (!quiet) {
        console.log(toShow);
      }

      return toShow;
    }
  }, {
    key: "dim",
    value: function dim() {
      return [this.count(), this[__columns__].length];
    }
  }, {
    key: "transpose",
    value: function transpose(tranposeColumnNames) {
      var newColumns = [].concat(_toConsumableArray(tranposeColumnNames ? ["rowNames"] : []), _toConsumableArray(_toConsumableArray(Array(this.count()).keys()).reverse()));
      var transposedRows = (0, _reusables.transpose)((tranposeColumnNames ? this.push(this[__columns__]) : this).toArray());
      return this.__newInstance__(transposedRows, newColumns.reverse()).restructure(newColumns);
    }
  }, {
    key: "count",
    value: function count() {
      return this[__rows__].length;
    }
  }, {
    key: "countValue",
    value: function countValue(valueToCount) {
      var columnName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this[__columns__][0];
      return this.filter(function (row) {
        return row.get(columnName) === valueToCount;
      }).count();
    }
  }, {
    key: "push",
    value: function push() {
      for (var _len2 = arguments.length, rows = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        rows[_key2] = arguments[_key2];
      }

      return this.union(new DataFrame(rows, this[__columns__]));
    }
  }, {
    key: "replace",
    value: function replace(value, replacement, columnNames) {
      var _this5 = this;

      var columns = columnNames && columnNames.length > 0 ? columnNames : this[__columns__];
      var values = Array.isArray(value) ? value : [value];
      return this.map(function (row) {
        return (columns.length > 0 ? columns : _this5[__columns__]).reduce(function (p, n) {
          return values.includes(p.get(n)) ? p.set(n, replacement) : p;
        }, row);
      });
    }
  }, {
    key: "distinct",
    value: function distinct(columnName) {
      return this.__newInstance__(_defineProperty({}, columnName, _toConsumableArray(new Set(this.toArray(columnName)))), [columnName]);
    }
  }, {
    key: "unique",
    value: function unique(columnName) {
      return this.distinct(columnName);
    }
  }, {
    key: "listColumns",
    value: function listColumns() {
      return _toConsumableArray(this[__columns__]);
    }
  }, {
    key: "select",
    value: function select() {
      for (var _len3 = arguments.length, columnNames = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        columnNames[_key3] = arguments[_key3];
      }

      return this.__newInstance__(this[__rows__].map(function (row) {
        return row.select.apply(row, columnNames);
      }), columnNames);
    }
  }, {
    key: "withColumn",
    value: function withColumn(columnName) {
      var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
        return undefined;
      };
      return this.__newInstance__(this[__rows__].map(function (row, index) {
        return row.set(columnName, func(row, index));
      }), this[__columns__].includes(columnName) ? this[__columns__] : [].concat(_toConsumableArray(this[__columns__]), [columnName]));
    }
  }, {
    key: "restructure",
    value: function restructure(newColumnNames) {
      return this.__newInstance__(this[__rows__], newColumnNames);
    }
  }, {
    key: "renameAll",
    value: function renameAll(newColumnNames) {
      if (newColumnNames.length !== this[__columns__].length) {
        throw new _errors.WrongSchemaError(newColumnNames, this[__columns__]);
      }

      return this.__newInstance__(this.toArray(), newColumnNames);
    }
  }, {
    key: "rename",
    value: function rename(columnName, replacement) {
      var newColumnNames = this[__columns__].map(function (column) {
        return column === columnName ? replacement : column;
      });

      return this.renameAll(newColumnNames);
    }
  }, {
    key: "castAll",
    value: function castAll(typeFunctions) {
      var _this6 = this;

      if (typeFunctions.length !== this[__columns__].length) {
        throw new _errors.WrongSchemaError(typeFunctions, this[__columns__]);
      }

      return this.map(function (row) {
        return new _row.default(row.toArray().map(function (column, index) {
          return typeFunctions[index](column);
        }), _this6[__columns__]);
      });
    }
  }, {
    key: "cast",
    value: function cast(columnName, typeFunction) {
      return this.withColumn(columnName, function (row) {
        return typeFunction(row.get(columnName));
      });
    }
  }, {
    key: "drop",
    value: function drop(columnName) {
      return this.__newInstance__(this[__rows__].map(function (row) {
        return row.delete(columnName);
      }), this[__columns__].filter(function (column) {
        return column !== columnName;
      }));
    }
  }, {
    key: "chain",
    value: function chain() {
      for (var _len4 = arguments.length, funcs = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        funcs[_key4] = arguments[_key4];
      }

      return this.__newInstance__(_toConsumableArray(_reusables.chain.apply(void 0, [this[__rows__]].concat(funcs))), this[__columns__]);
    }
  }, {
    key: "filter",
    value: function filter(condition) {
      var func = _typeof(condition) === "object" ? function (row) {
        return Object.entries(condition).map(function (_ref6) {
          var _ref7 = _slicedToArray(_ref6, 2),
              column = _ref7[0],
              value = _ref7[1];

          return Object.is(row.get(column), value);
        }).reduce(function (p, n) {
          return p && n;
        });
      } : condition;
      var filteredRows = (0, _reusables.iter)(this[__rows__], function (row, i) {
        return func(row, i) ? row : false;
      });
      return this.__newInstance__(filteredRows, this[__columns__]);
    }
  }, {
    key: "where",
    value: function where(condition) {
      return this.filter(condition);
    }
  }, {
    key: "find",
    value: function find(condition) {
      return this.filter(condition)[__rows__][0];
    }
  }, {
    key: "map",
    value: function map(func) {
      return this.__newInstance__((0, _reusables.iter)(this[__rows__], function (row, i) {
        return func(row, i);
      }), this[__columns__]);
    }
  }, {
    key: "reduce",
    value: function reduce(func, init) {
      return typeof init === "undefined" ? this[__rows__].reduce(function (p, n) {
        return func(p, n);
      }) : this[__rows__].reduce(function (p, n) {
        return func(p, n);
      }, init);
    }
  }, {
    key: "reduceRight",
    value: function reduceRight(func, init) {
      return typeof init === "undefined" ? this[__rows__].reduceRight(function (p, n) {
        return func(p, n);
      }) : this[__rows__].reduceRight(function (p, n) {
        return func(p, n);
      }, init);
    }
  }, {
    key: "dropDuplicates",
    value: function dropDuplicates() {
      for (var _len5 = arguments.length, columnNames = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        columnNames[_key5] = arguments[_key5];
      }

      var groupCols = columnNames && columnNames.length > 0 ? columnNames : this[__columns__];
      return this.groupBy.apply(this, _toConsumableArray(groupCols)).filter(function (row, i) {
        return i === 0;
      });
    }
  }, {
    key: "dropMissingValues",
    value: function dropMissingValues(columnNames) {
      var cols = columnNames && columnNames.length > 0 ? columnNames : this[__columns__];
      return this.filter(function (row) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = cols[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var col = _step2.value;

            if ([NaN, undefined, null].includes(row.get(col))) {
              return false;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        return true;
      });
    }
  }, {
    key: "fillMissingValues",
    value: function fillMissingValues(replacement, columnNames) {
      return this.replace([NaN, undefined, null], replacement, columnNames);
    }
  }, {
    key: "shuffle",
    value: function shuffle() {
      if (this.count() < 2) return this;
      return this.__newInstance__(this.reduce(function (p, n) {
        var index = Math.floor(Math.random() * (p.length - 1) + 1);
        return Array.isArray(p) ? [].concat(_toConsumableArray(p.slice(index, p.length + 1)), [n], _toConsumableArray(p.slice(0, index))) : [p, n];
      }), this[__columns__]);
    }
  }, {
    key: "sample",
    value: function sample(percentage) {
      var nRows = this.count() * percentage;
      var token = 0;
      return this.__newInstance__((0, _reusables.iter)(this.shuffle()[__rows__], function (row) {
        token++;
        return row;
      }, function () {
        return token >= nRows;
      }), this[__columns__]);
    }
  }, {
    key: "bisect",
    value: function bisect(percentage) {
      var nRows = this.count() * percentage;
      var token = 0;
      var restRows = [];
      return [this.__newInstance__((0, _reusables.iter)(this.shuffle()[__rows__], function (row) {
        if (token < nRows) {
          token++;
          return row;
        }

        restRows.push(row);
      }), this[__columns__]), this.__newInstance__(restRows, this[__columns__])];
    }
  }, {
    key: "groupBy",
    value: function groupBy() {
      for (var _len6 = arguments.length, columnNames = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        columnNames[_key6] = arguments[_key6];
      }

      return _construct(_groupedDataframe.default, [this].concat(columnNames));
    }
  }, {
    key: "sortBy",
    value: function sortBy(columnNames) {
      var reverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var missingValuesPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "first";

      var _columnNames = Array.from(new Set((0, _reusables.asArray)(columnNames)));

      var _missingValuesPosition = ["first", "last"].includes(missingValuesPosition) ? missingValuesPosition : "first";

      var _checkMissingValue = function _checkMissingValue(v) {
        return [NaN, null, undefined].includes(v);
      };

      var sortedRows = this[__rows__].sort(function (p, n) {
        return _columnNames.map(function (col) {
          var _ref8 = [p.get(col), n.get(col)],
              pValue = _ref8[0],
              nValue = _ref8[1];

          if (_checkMissingValue(pValue)) {
            return _missingValuesPosition === "last" ? 1 : -1;
          } else if (_checkMissingValue(nValue)) {
            return _missingValuesPosition === "last" ? -1 : 1;
          } else if (_typeof(pValue) !== _typeof(nValue)) {
            throw new _errors.MixedTypeError([_typeof(pValue), _typeof(nValue)]);
          } else if (pValue > nValue) {
            return reverse ? -1 : 1;
          } else if (pValue < nValue) {
            return reverse ? 1 : -1;
          }

          return 0;
        }).reduce(function (acc, curr) {
          return acc || curr;
        });
      });

      if (_columnNames.length > 1) {
        var sortedRowsWithMissingValues = [];
        var sortedRowsWithoutMissingValues = [];
        sortedRows.forEach(function (row) {
          for (var _i3 = 0, _columnNames2 = _columnNames; _i3 < _columnNames2.length; _i3++) {
            var col = _columnNames2[_i3];

            if (_checkMissingValue(row.get(col))) {
              sortedRowsWithMissingValues.push(row);
              return;
            }
          }

          sortedRowsWithoutMissingValues.push(row);
        });
        return this.__newInstance__(missingValuesPosition === "last" ? sortedRowsWithoutMissingValues.concat(sortedRowsWithMissingValues) : sortedRowsWithMissingValues.concat(sortedRowsWithoutMissingValues), this[__columns__]);
      }

      return this.__newInstance__(sortedRows, this[__columns__]);
    }
  }, {
    key: "union",
    value: function union(dfToUnion) {
      if (!(dfToUnion instanceof DataFrame)) throw new _errors.ArgumentTypeError(dfToUnion, "DataFrame");

      if (!(0, _reusables.arrayEqual)(this[__columns__], dfToUnion[__columns__])) {
        throw new _errors.WrongSchemaError(dfToUnion[__columns__], this[__columns__]);
      }

      return this.__newInstance__([].concat(_toConsumableArray(this), _toConsumableArray(dfToUnion.restructure(this[__columns__]))), this[__columns__]);
    }
  }, {
    key: "join",
    value: function join(dfToJoin, columnNames) {
      var _this7 = this;

      var how = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "inner";
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
    key: "innerJoin",
    value: function innerJoin(dfToJoin, columnNames) {
      return this._join(dfToJoin, columnNames, ["in"]);
    }
  }, {
    key: "fullJoin",
    value: function fullJoin(dfToJoin, columnNames) {
      return this._join(dfToJoin, columnNames, ["full", "full"]);
    }
  }, {
    key: "outerJoin",
    value: function outerJoin(dfToJoin, columnNames) {
      return this.fullJoin(dfToJoin, columnNames);
    }
  }, {
    key: "leftJoin",
    value: function leftJoin(dfToJoin, columnNames) {
      return this._join(dfToJoin, columnNames, ["full", "in"]);
    }
  }, {
    key: "rightJoin",
    value: function rightJoin(dfToJoin, columnNames) {
      return this._join(dfToJoin, columnNames, ["in", "full"]);
    }
  }, {
    key: "diff",
    value: function diff(dfToDiff, columnNames) {
      return this._join(dfToDiff, columnNames, ["out", "out"]);
    }
  }, {
    key: "head",
    value: function head() {
      var nRows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      return this.slice(0, nRows);
    }
  }, {
    key: "tail",
    value: function tail() {
      var nRows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      return this.slice(-nRows);
    }
  }, {
    key: "slice",
    value: function slice(startIndex, endIndex) {
      return this.__newInstance__(this[__rows__].slice(startIndex || undefined, endIndex || undefined), this[__columns__]);
    }
  }, {
    key: "getRow",
    value: function getRow(index) {
      return this[__rows__][index];
    }
  }, {
    key: "setRow",
    value: function setRow(index) {
      var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (row) {
        return row;
      };
      var newRows = Array.from(this[__rows__]);
      newRows[index] = func(newRows[index]);
      return this.__newInstance__(newRows, this[__columns__]);
    }
  }]);

  return DataFrame;
}();

DataFrame.defaultModules = [];
var _default = DataFrame;
exports.default = _default;