"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupBy = groupBy;
exports.GroupedDataFrame = void 0;

require("regenerator-runtime/runtime");

var _symbol = require("./symbol");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GroupedDataFrame = function () {
  function GroupedDataFrame(df, columnNames, groups, hashes) {
    _classCallCheck(this, GroupedDataFrame);

    this[_symbol.__groups__] = groups;
    this[_symbol.__hashes__] = hashes;
    this.df = df;
    this.on = columnNames.length > 0 ? columnNames : df.listColumns();
  }

  _createClass(GroupedDataFrame, [{
    key: Symbol.iterator,
    value: regeneratorRuntime.mark(function value() {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, hash;

      return regeneratorRuntime.wrap(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 3;
              _iterator = this[_symbol.__hashes__][Symbol.iterator]();

            case 5:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 12;
                break;
              }

              hash = _step.value;
              _context.next = 9;
              return this[_symbol.__groups__][hash];

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
    key: "get",
    value: function get(hash) {
      return this[_symbol.__groups__][hash];
    }
  }, {
    key: "toCollection",
    value: function toCollection() {
      return _toConsumableArray(this);
    }
  }, {
    key: "show",
    value: function show() {
      var quiet = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return _toConsumableArray(this).map(function (_ref) {
        var group = _ref.group,
            groupKey = _ref.groupKey;
        var groupLog = "--\n[".concat(JSON.stringify(groupKey), "]\n--");

        if (!quiet) {
          console.log(groupLog);
        }

        return groupLog + "\n" + group.show(10, quiet);
      }).reduce(function (p, n) {
        return p + "\n" + n;
      });
    }
  }, {
    key: "listGroups",
    value: function listGroups() {
      return _toConsumableArray(this).map(function (_ref2) {
        var groupKey = _ref2.groupKey;
        return groupKey;
      });
    }
  }, {
    key: "listHashs",
    value: function listHashs() {
      return this[_symbol.__hashes__];
    }
  }, {
    key: "map",
    value: function map(func) {
      var _ref4;

      var mapped = _toConsumableArray(this).map(function (_ref3) {
        var group = _ref3.group;
        return group.map(func);
      });

      return this.df.__newInstance__((_ref4 = []).concat.apply(_ref4, _toConsumableArray(mapped.map(function (group) {
        return group.toCollection();
      }))), mapped[0].listColumns());
    }
  }, {
    key: "filter",
    value: function filter(condition) {
      var _ref6;

      var mapped = _toConsumableArray(this).map(function (_ref5) {
        var group = _ref5.group;
        return group.filter(condition);
      }).filter(function (group) {
        return group.listColumns().length > 0;
      });

      return mapped.length === 0 ? this.df.__newInstance__([], this.df.listColumns()) : this.df.__newInstance__((_ref6 = []).concat.apply(_ref6, _toConsumableArray(mapped.map(function (group) {
        return group.toCollection();
      }))), this.df.listColumns());
    }
  }, {
    key: "chain",
    value: function chain() {
      var _ref8;

      for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
        funcs[_key] = arguments[_key];
      }

      var mapped = _toConsumableArray(this).map(function (_ref7) {
        var group = _ref7.group;
        return group.chain.apply(group, funcs);
      });

      return this.df.__newInstance__((_ref8 = []).concat.apply(_ref8, _toConsumableArray(mapped.map(function (group) {
        return group.toCollection();
      }))), mapped[0].listColumns());
    }
  }, {
    key: "aggregate",
    value: function aggregate(func) {
      var columnName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "aggregation";
      return this.df.__newInstance__(_toConsumableArray(this).map(function (_ref9) {
        var group = _ref9.group,
            groupKey = _ref9.groupKey;
        return _objectSpread({}, groupKey, _defineProperty({}, columnName, func(group, groupKey)));
      }), [].concat(_toConsumableArray(this.on), [columnName]));
    }
  }, {
    key: "pivot",
    value: function pivot(columnToPivot) {
      var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (gdf) {
        return gdf.count();
      };
      var columns = [].concat(_toConsumableArray(this.on), _toConsumableArray(this.df.distinct(columnToPivot).toArray(columnToPivot)));
      return this.df.__newInstance__(this.aggregate(function (group) {
        return group.groupBy(columnToPivot).aggregate(function (gp, gk) {
          return _defineProperty({}, gk[columnToPivot], func(gp, gk));
        }).toArray("aggregation").reduce(function (p, n) {
          return _objectSpread({}, p, {}, n);
        }, {});
      }).toCollection().map(function (_ref11) {
        var aggregation = _ref11.aggregation,
            rest = _objectWithoutProperties(_ref11, ["aggregation"]);

        return _objectSpread({}, rest, {}, aggregation);
      }), columns);
    }
  }, {
    key: "melt",
    value: function melt() {
      var _this = this;

      var variableColumnName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "variable";
      var valueColumnName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "value";
      var columns = [].concat(_toConsumableArray(this.on), [variableColumnName, valueColumnName]);
      return this.df.__newInstance__(this.aggregate(function (group) {
        return Object.entries(group.toDict()).reduce(function (tidy, _ref12) {
          var _ref13 = _slicedToArray(_ref12, 2),
              key = _ref13[0],
              value = _ref13[1];

          return [].concat(_toConsumableArray(tidy), _toConsumableArray(value.reduce(function (p, n) {
            var _ref14;

            return !_this.on.includes(key) ? [].concat(_toConsumableArray(p), [(_ref14 = {}, _defineProperty(_ref14, variableColumnName, key), _defineProperty(_ref14, valueColumnName, n), _ref14)]) : p;
          }, [])));
        }, []);
      }).toCollection().reduce(function (p, _ref15) {
        var aggregation = _ref15.aggregation,
            rest = _objectWithoutProperties(_ref15, ["aggregation"]);

        return [].concat(_toConsumableArray(p), _toConsumableArray(aggregation.map(function (x) {
          return _objectSpread({}, rest, {}, x);
        })));
      }, []), columns);
    }
  }]);

  return GroupedDataFrame;
}();

exports.GroupedDataFrame = GroupedDataFrame;

function groupBy(df, columnNames) {
  var rowsByGroup = {};
  var hashes = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = df.toCollection(true)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var row = _step2.value;
      var hash = row.select.apply(row, _toConsumableArray(columnNames)).hash();

      if (!rowsByGroup[hash]) {
        hashes.push(hash);
        rowsByGroup[hash] = [];
      }

      rowsByGroup[hash].push(row);
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

  var groups = hashes.reduce(function (groups, hash) {
    var _rowsByGroup$hash$;

    groups[hash] = {
      groupKey: (_rowsByGroup$hash$ = rowsByGroup[hash][0]).select.apply(_rowsByGroup$hash$, _toConsumableArray(columnNames)).toDict(),
      hash: hash,
      group: new df.constructor(rowsByGroup[hash], df.listColumns())
    };
    return groups;
  }, {});
  return new GroupedDataFrame(df, columnNames, groups, hashes);
}