"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.reduce-right");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.array.sort");

require("core-js/modules/es.date.to-json");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.is");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.object.values");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.set");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/esnext.set.add-all");

require("core-js/modules/esnext.set.delete-all");

require("core-js/modules/esnext.set.difference");

require("core-js/modules/esnext.set.every");

require("core-js/modules/esnext.set.filter");

require("core-js/modules/esnext.set.find");

require("core-js/modules/esnext.set.intersection");

require("core-js/modules/esnext.set.is-disjoint-from");

require("core-js/modules/esnext.set.is-subset-of");

require("core-js/modules/esnext.set.is-superset-of");

require("core-js/modules/esnext.set.join");

require("core-js/modules/esnext.set.map");

require("core-js/modules/esnext.set.reduce");

require("core-js/modules/esnext.set.some");

require("core-js/modules/esnext.set.symmetric-difference");

require("core-js/modules/esnext.set.union");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

require("core-js/modules/web.url.to-json");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("regenerator-runtime/runtime");

var _reusables = require("./reusables");

var _errors = require("./errors");

var _row = _interopRequireDefault(require("./row"));

var _group = require("./group");

var _symbol = require("./symbol");

var io = _interopRequireWildcard(require("./io"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    value: function fromDSV() {
      return io.fromDSV.apply(io, arguments).then(function (content) {
        return new DataFrame(content);
      });
    }
  }, {
    key: "fromText",
    value: function fromText() {
      return io.fromText.apply(io, arguments).then(function (content) {
        return new DataFrame(content);
      });
    }
  }, {
    key: "fromCSV",
    value: function fromCSV() {
      return io.fromCSV.apply(io, arguments).then(function (content) {
        return new DataFrame(content);
      });
    }
  }, {
    key: "fromTSV",
    value: function fromTSV() {
      return io.fromTSV.apply(io, arguments).then(function (content) {
        return new DataFrame(content);
      });
    }
  }, {
    key: "fromPSV",
    value: function fromPSV() {
      return io.fromPSV.apply(io, arguments).then(function (content) {
        return new DataFrame(content);
      });
    }
  }, {
    key: "fromJSON",
    value: function fromJSON() {
      return io.fromJSON.apply(io, arguments).then(function (content) {
        return new DataFrame(content);
      });
    }
  }]);

  function DataFrame(data, columns) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, DataFrame);

    var _this$_build = this._build(data, columns);

    var _this$_build2 = _slicedToArray(_this$_build, 2);

    this[_symbol.__rows__] = _this$_build2[0];
    this[_symbol.__columns__] = _this$_build2[1];
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
              _iterator = this[_symbol.__rows__][Symbol.iterator]();

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
      var columns2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this[_symbol.__columns__];

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

      if (!(0, _reusables.arrayEqual)(firstRowColumns, this[_symbol.__columns__], true)) {
        return new DataFrame(data, firstRowColumns, this.options);
      }

      var newInstance = new DataFrame([], [], this.options);
      newInstance[_symbol.__rows__] = _toConsumableArray(data);
      newInstance[_symbol.__columns__] = _toConsumableArray(columns);
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
      if (data instanceof DataFrame) {
        return this._fromArray(Array.from(data[_symbol.__rows__]), columns || data[_symbol.__columns__]);
      }

      if (data instanceof Array && data.length > 0) {
        return this._fromArray(data, columns || Array.from(new Set(data.slice(0, 10).concat(data.slice(-10, -1)).map(function (row) {
          return Object.keys(row);
        }).reduce(function (p, n) {
          return p.concat(n);
        }))));
      }

      if (data instanceof Array && data.length === 0) {
        return this._fromArray(data, columns ? columns : []);
      }

      if (data instanceof Object) {
        return this._fromDict(data, columns || Object.keys(data));
      }

      throw new _errors.ArgumentTypeError(data, "DataFrame | Array | Object");
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
      var _this2 = this;

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
          modifiedGroup = _this2.__newInstance__(combinedGroup, newColumns);
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
    key: "toDSV",
    value: function toDSV() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return io.toDSV.apply(io, [this].concat(args));
    }
  }, {
    key: "toCSV",
    value: function toCSV() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return io.toCSV.apply(io, [this].concat(args));
    }
  }, {
    key: "toTSV",
    value: function toTSV() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return io.toTSV.apply(io, [this].concat(args));
    }
  }, {
    key: "toPSV",
    value: function toPSV() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return io.toPSV.apply(io, [this].concat(args));
    }
  }, {
    key: "toText",
    value: function toText() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return io.toText.apply(io, [this].concat(args));
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      return io.toJSON.apply(io, [this].concat(args));
    }
  }, {
    key: "toDict",
    value: function toDict() {
      var _this3 = this;

      return Object.assign.apply(Object, [{}].concat(_toConsumableArray(Object.entries(this.transpose().toArray()).map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            index = _ref4[0],
            column = _ref4[1];

        return _defineProperty({}, _this3[_symbol.__columns__][index], column);
      }))));
    }
  }, {
    key: "toArray",
    value: function toArray(columnName) {
      return columnName ? Array.from(this).map(function (row) {
        return row.get(columnName);
      }) : Array.from(this).map(function (row) {
        return row.toArray();
      });
    }
  }, {
    key: "toCollection",
    value: function toCollection(ofRows) {
      return ofRows ? Array.from(this) : Array.from(this).map(function (row) {
        return row.toDict();
      });
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

      var header = makeRow(this[_symbol.__columns__]);
      var token = 0;
      var toShow = [header, Array(header.length).join("-")].concat(_toConsumableArray((0, _reusables.iter)(this[_symbol.__rows__], function (row) {
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
      return [this.count(), this[_symbol.__columns__].length];
    }
  }, {
    key: "transpose",
    value: function transpose(tranposeColumnNames) {
      var newColumns = [].concat(_toConsumableArray(tranposeColumnNames ? ["rowNames"] : []), _toConsumableArray(_toConsumableArray(Array(this.count()).keys()).reverse()));
      var transposedRows = (0, _reusables.transpose)((tranposeColumnNames ? this.push(this[_symbol.__columns__]) : this).toArray());
      return this.__newInstance__(transposedRows, newColumns.reverse()).restructure(newColumns);
    }
  }, {
    key: "count",
    value: function count() {
      return this[_symbol.__rows__].length;
    }
  }, {
    key: "countValue",
    value: function countValue(valueToCount) {
      var columnName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this[_symbol.__columns__][0];
      return this.filter(function (row) {
        return row.get(columnName) === valueToCount;
      }).count();
    }
  }, {
    key: "push",
    value: function push() {
      for (var _len8 = arguments.length, rows = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        rows[_key8] = arguments[_key8];
      }

      return this.union(new DataFrame(rows, this[_symbol.__columns__]));
    }
  }, {
    key: "replace",
    value: function replace(value, replacement, columnNames) {
      var _this4 = this;

      var columns = columnNames && columnNames.length > 0 ? columnNames : this[_symbol.__columns__];
      var values = Array.isArray(value) ? value : [value];
      return this.map(function (row) {
        return (columns.length > 0 ? columns : _this4[_symbol.__columns__]).reduce(function (p, n) {
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
      return _toConsumableArray(this[_symbol.__columns__]);
    }
  }, {
    key: "select",
    value: function select() {
      for (var _len9 = arguments.length, columnNames = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        columnNames[_key9] = arguments[_key9];
      }

      return this.__newInstance__(this[_symbol.__rows__].map(function (row) {
        return row.select.apply(row, columnNames);
      }), columnNames);
    }
  }, {
    key: "withColumn",
    value: function withColumn(columnName) {
      var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
        return undefined;
      };
      return this.__newInstance__(this[_symbol.__rows__].map(function (row, index) {
        return row.set(columnName, func(row, index));
      }), this[_symbol.__columns__].includes(columnName) ? this[_symbol.__columns__] : [].concat(_toConsumableArray(this[_symbol.__columns__]), [columnName]));
    }
  }, {
    key: "restructure",
    value: function restructure(newColumnNames) {
      return this.__newInstance__(this[_symbol.__rows__], newColumnNames);
    }
  }, {
    key: "renameAll",
    value: function renameAll(newColumnNames) {
      if (newColumnNames.length !== this[_symbol.__columns__].length) {
        throw new _errors.WrongSchemaError(newColumnNames, this[_symbol.__columns__]);
      }

      return this.__newInstance__(this.toArray(), newColumnNames);
    }
  }, {
    key: "rename",
    value: function rename(columnName, replacement) {
      var newColumnNames = this[_symbol.__columns__].map(function (column) {
        return column === columnName ? replacement : column;
      });

      return this.renameAll(newColumnNames);
    }
  }, {
    key: "castAll",
    value: function castAll(typeFunctions) {
      var _this5 = this;

      if (typeFunctions.length !== this[_symbol.__columns__].length) {
        throw new _errors.WrongSchemaError(typeFunctions, this[_symbol.__columns__]);
      }

      return this.map(function (row) {
        return new _row.default(row.toArray().map(function (column, index) {
          return typeFunctions[index](column);
        }), _this5[_symbol.__columns__]);
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
      return this.__newInstance__(this[_symbol.__rows__].map(function (row) {
        return row.delete(columnName);
      }), this[_symbol.__columns__].filter(function (column) {
        return column !== columnName;
      }));
    }
  }, {
    key: "chain",
    value: function chain() {
      for (var _len10 = arguments.length, funcs = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        funcs[_key10] = arguments[_key10];
      }

      return this.__newInstance__(_toConsumableArray(_reusables.chain.apply(void 0, [this[_symbol.__rows__]].concat(funcs))), this[_symbol.__columns__]);
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
      var filteredRows = (0, _reusables.iter)(this[_symbol.__rows__], function (row, i) {
        return func(row, i) ? row : false;
      });
      return this.__newInstance__(filteredRows, this[_symbol.__columns__]);
    }
  }, {
    key: "where",
    value: function where(condition) {
      return this.filter(condition);
    }
  }, {
    key: "find",
    value: function find(condition) {
      return this.filter(condition)[_symbol.__rows__][0];
    }
  }, {
    key: "map",
    value: function map(func) {
      return this.__newInstance__((0, _reusables.iter)(this[_symbol.__rows__], function (row, i) {
        return func(row, i);
      }), this[_symbol.__columns__]);
    }
  }, {
    key: "reduce",
    value: function reduce(func, init) {
      return typeof init === "undefined" ? this[_symbol.__rows__].reduce(function (p, n) {
        return func(p, n);
      }) : this[_symbol.__rows__].reduce(function (p, n) {
        return func(p, n);
      }, init);
    }
  }, {
    key: "reduceRight",
    value: function reduceRight(func, init) {
      return typeof init === "undefined" ? this[_symbol.__rows__].reduceRight(function (p, n) {
        return func(p, n);
      }) : this[_symbol.__rows__].reduceRight(function (p, n) {
        return func(p, n);
      }, init);
    }
  }, {
    key: "dropDuplicates",
    value: function dropDuplicates() {
      for (var _len11 = arguments.length, columnNames = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        columnNames[_key11] = arguments[_key11];
      }

      var groupCols = columnNames && columnNames.length > 0 ? columnNames : this[_symbol.__columns__];
      return this.groupBy.apply(this, _toConsumableArray(groupCols)).filter(function (row, i) {
        return i === 0;
      });
    }
  }, {
    key: "dropMissingValues",
    value: function dropMissingValues(columnNames) {
      var cols = columnNames && columnNames.length > 0 ? columnNames : this[_symbol.__columns__];
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
      }), this[_symbol.__columns__]);
    }
  }, {
    key: "sample",
    value: function sample(percentage) {
      var nRows = this.count() * percentage;
      var token = 0;
      return this.__newInstance__((0, _reusables.iter)(this.shuffle()[_symbol.__rows__], function (row) {
        token++;
        return row;
      }, function () {
        return token >= nRows;
      }), this[_symbol.__columns__]);
    }
  }, {
    key: "bisect",
    value: function bisect(percentage) {
      var nRows = this.count() * percentage;
      var token = 0;
      var restRows = [];
      return [this.__newInstance__((0, _reusables.iter)(this.shuffle()[_symbol.__rows__], function (row) {
        if (token < nRows) {
          token++;
          return row;
        }

        restRows.push(row);
      }), this[_symbol.__columns__]), this.__newInstance__(restRows, this[_symbol.__columns__])];
    }
  }, {
    key: "groupBy",
    value: function groupBy() {
      for (var _len12 = arguments.length, args = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
        args[_key12] = arguments[_key12];
      }

      return (0, _group.groupBy)(this, args);
    }
  }, {
    key: "sortBy",
    value: function sortBy(columnNames) {
      var reverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var missingValuesPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "first";

      if (!Array.isArray(columnNames)) {
        columnNames = [columnNames];
      }

      var _columnNames = columnNames;

      var _missingValuesPosition = ["first", "last"].includes(missingValuesPosition) ? missingValuesPosition : "first";

      var _checkMissingValue = function _checkMissingValue(v) {
        return [NaN, null, undefined].includes(v);
      };

      var sortedRows = this[_symbol.__rows__].sort(function (p, n) {
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
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = _columnNames[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var col = _step3.value;

              if (_checkMissingValue(row.get(col))) {
                sortedRowsWithMissingValues.push(row);
                return;
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }

          sortedRowsWithoutMissingValues.push(row);
        });
        return this.__newInstance__(missingValuesPosition === "last" ? sortedRowsWithoutMissingValues.concat(sortedRowsWithMissingValues) : sortedRowsWithMissingValues.concat(sortedRowsWithoutMissingValues), this[_symbol.__columns__]);
      }

      return this.__newInstance__(sortedRows, this[_symbol.__columns__]);
    }
  }, {
    key: "union",
    value: function union(dfToUnion) {
      if (!(dfToUnion instanceof DataFrame)) throw new _errors.ArgumentTypeError(dfToUnion, "DataFrame");

      if (!(0, _reusables.arrayEqual)(this[_symbol.__columns__], dfToUnion[_symbol.__columns__])) {
        throw new _errors.WrongSchemaError(dfToUnion[_symbol.__columns__], this[_symbol.__columns__]);
      }

      return this.__newInstance__([].concat(_toConsumableArray(this), _toConsumableArray(dfToUnion.restructure(this[_symbol.__columns__]))), this[_symbol.__columns__]);
    }
  }, {
    key: "join",
    value: function join(dfToJoin, columnNames) {
      var _this6 = this;

      var how = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "inner";
      var joinMethods = {
        inner: function inner() {
          return _this6.innerJoin(dfToJoin, columnNames);
        },
        full: function full() {
          return _this6.fullJoin(dfToJoin, columnNames);
        },
        outer: function outer() {
          return _this6.outerJoin(dfToJoin, columnNames);
        },
        left: function left() {
          return _this6.leftJoin(dfToJoin, columnNames);
        },
        right: function right() {
          return _this6.rightJoin(dfToJoin, columnNames);
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
      return this.__newInstance__(this[_symbol.__rows__].slice(startIndex || undefined, endIndex || undefined), this[_symbol.__columns__]);
    }
  }, {
    key: "getRow",
    value: function getRow(index) {
      return this[_symbol.__rows__][index];
    }
  }, {
    key: "setRow",
    value: function setRow(index) {
      var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (row) {
        return row;
      };
      var newRows = Array.from(this[_symbol.__rows__]);
      newRows[index] = func(newRows[index]);
      return this.__newInstance__(newRows, this[_symbol.__columns__]);
    }
  }]);

  return DataFrame;
}();

DataFrame.defaultModules = [];
var _default = DataFrame;
exports.default = _default;