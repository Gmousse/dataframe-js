"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.freeze");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.object.values");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("regenerator-runtime/runtime");

var _reusables = require("./reusables");

var _errors = require("./errors");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __columns__ = Symbol("columns");

var __values__ = Symbol("values");

var Row = function () {
  function Row(data, columns) {
    _classCallCheck(this, Row);

    if (!data) throw new _errors.ArgumentTypeError(data, "Row | Array | Object");
    this[__columns__] = columns ? columns : Object.keys(data);
    this[__values__] = Object.freeze(this._build(data));
  }

  _createClass(Row, [{
    key: Symbol.iterator,
    value: regeneratorRuntime.mark(function value() {
      var _i, _Object$values, value;

      return regeneratorRuntime.wrap(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _i = 0, _Object$values = Object.values(this[__values__]);

            case 1:
              if (!(_i < _Object$values.length)) {
                _context.next = 8;
                break;
              }

              value = _Object$values[_i];
              _context.next = 5;
              return value;

            case 5:
              _i++;
              _context.next = 1;
              break;

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, value, this);
    })
  }, {
    key: "__newInstance__",
    value: function __newInstance__(data, columns) {
      var _Object$assign;

      if (!(0, _reusables.arrayEqual)(this[__columns__], columns)) {
        return new Row(data, columns);
      }

      return Object.assign(Object.create(Object.getPrototypeOf(this)), this, (_Object$assign = {}, _defineProperty(_Object$assign, __values__, data), _defineProperty(_Object$assign, __columns__, _toConsumableArray(columns)), _Object$assign));
    }
  }, {
    key: "_build",
    value: function _build(data) {
      if (data instanceof Array) return this._fromArray(data);
      if (data instanceof Row) return this._fromObject(data[__values__]);
      if (data instanceof Object && data !== null) return this._fromObject(data);
      throw new _errors.ArgumentTypeError(data, "Row | Array | Object");
    }
  }, {
    key: "_fromObject",
    value: function _fromObject(object) {
      return Object.assign.apply(Object, [{}].concat(_toConsumableArray(this[__columns__].map(function (column) {
        return _defineProperty({}, column, object[column]);
      }))));
    }
  }, {
    key: "_fromArray",
    value: function _fromArray(array) {
      return Object.assign.apply(Object, [{}].concat(_toConsumableArray(Object.entries(this[__columns__]).map(function (column) {
        return _defineProperty({}, column[1], array[column[0]]);
      }))));
    }
  }, {
    key: "toDict",
    value: function toDict() {
      return Object.assign({}, this[__values__]);
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return _toConsumableArray(this);
    }
  }, {
    key: "size",
    value: function size() {
      return this[__columns__].length;
    }
  }, {
    key: "hash",
    value: function hash() {
      return (0, _reusables.hashCode)(JSON.stringify(this[__values__]));
    }
  }, {
    key: "has",
    value: function has(columnName) {
      return this[__columns__].includes(columnName);
    }
  }, {
    key: "select",
    value: function select() {
      var _this = this;

      for (var _len = arguments.length, columnNames = new Array(_len), _key = 0; _key < _len; _key++) {
        columnNames[_key] = arguments[_key];
      }

      return this.__newInstance__(Object.assign.apply(Object, [{}].concat(_toConsumableArray(columnNames.map(function (column) {
        return _defineProperty({}, column, _this.get(column));
      })))), columnNames);
    }
  }, {
    key: "get",
    value: function get(columnToGet) {
      if (!this.has(columnToGet)) {
        throw new _errors.NoSuchColumnError(columnToGet, this[__columns__]);
      }

      return this[__values__][columnToGet];
    }
  }, {
    key: "set",
    value: function set(columnToSet, value) {
      var newRow = Object.assign({}, this[__values__], _defineProperty({}, columnToSet, value));
      return this.__newInstance__(newRow, Object.keys(newRow));
    }
  }, {
    key: "delete",
    value: function _delete(columnToDel) {
      if (!this.has(columnToDel)) {
        throw new _errors.NoSuchColumnError(columnToDel, this[__columns__]);
      }

      return this.select.apply(this, _toConsumableArray(this[__columns__].filter(function (column) {
        return column !== columnToDel;
      })));
    }
  }]);

  return Row;
}();

var _default = Row;
exports.default = _default;