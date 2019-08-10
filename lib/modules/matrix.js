"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dataframe = _interopRequireDefault(require("../dataframe"));

var _errors = require("../errors");

var _reusables = require("../reusables");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Matrix = function () {
  function Matrix(df) {
    _classCallCheck(this, Matrix);

    this.df = df;
    this.name = "matrix";
  }

  _createClass(Matrix, [{
    key: "isCommutative",
    value: function isCommutative(df) {
      var reverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!(df instanceof _dataframe.default)) throw new _errors.ArgumentTypeError(df, "DataFrame");
      return (0, _reusables.arrayEqual)(this.df.dim(), reverse ? df.dim().reverse() : df.dim(), true);
    }
  }, {
    key: "add",
    value: function add(df) {
      var _this = this;

      if (!this.isCommutative(df)) {
        throw new _errors.WrongSchemaError(this.df.dim(), df.dim());
      }

      var columns = _toConsumableArray(Array(this.df.dim()[1]).keys());

      return this.df.__newInstance__(_toConsumableArray((0, _reusables.iter)(Object.keys(_toConsumableArray(this.df)), function (rowKey) {
        var a = _toConsumableArray(_this.df)[rowKey].toArray();

        var b = _toConsumableArray(df)[rowKey].toArray();

        return columns.map(function (column) {
          return a[column] + b[column];
        });
      })), this.df.listColumns());
    }
  }, {
    key: "product",
    value: function product(number) {
      if (!(typeof number === "number")) throw new _errors.ArgumentTypeError(number, "Number");
      return this.df.map(function (row) {
        return row.toArray().map(function (column) {
          return column * number;
        });
      });
    }
  }, {
    key: "dot",
    value: function dot(df) {
      var _this2 = this;

      if (!this.isCommutative(df, true)) {
        throw new _errors.WrongSchemaError(this.df.dim(), df.dim().reverse());
      }

      var columns = _toConsumableArray(Array(this.df.dim()[0]).keys());

      return this.df.__newInstance__(_toConsumableArray((0, _reusables.iter)(Object.keys(_toConsumableArray(this.df)), function (rowKey) {
        var a = _toConsumableArray(_this2.df)[rowKey].toArray();

        return _toConsumableArray((0, _reusables.iter)(columns, function (column) {
          var b = _toConsumableArray(df.transpose())[column].toArray();

          return Object.keys(b).reduce(function (p, n) {
            return p + b[n] * a[n];
          }, 0);
        }));
      })), columns);
    }
  }]);

  return Matrix;
}();

var _default = Matrix;
exports.default = _default;