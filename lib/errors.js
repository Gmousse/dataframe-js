"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.map");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/esnext.map.delete-all");

require("core-js/modules/esnext.map.every");

require("core-js/modules/esnext.map.filter");

require("core-js/modules/esnext.map.find");

require("core-js/modules/esnext.map.find-key");

require("core-js/modules/esnext.map.includes");

require("core-js/modules/esnext.map.key-of");

require("core-js/modules/esnext.map.map-keys");

require("core-js/modules/esnext.map.map-values");

require("core-js/modules/esnext.map.merge");

require("core-js/modules/esnext.map.reduce");

require("core-js/modules/esnext.map.some");

require("core-js/modules/esnext.map.update");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrongTableNameError = exports.TableAlreadyExistsError = exports.SQLParseError = exports.ArgumentTypeError = exports.WrongSchemaError = exports.NoSuchColumnError = exports.MixedTypeError = exports.FileNotFoundError = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var FileNotFoundError = function (_Error) {
  _inherits(FileNotFoundError, _Error);

  function FileNotFoundError(fileName) {
    var _this;

    _classCallCheck(this, FileNotFoundError);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FileNotFoundError).call(this, Error));
    _this.message = "".concat(fileName, " not found. You maybe use a wrong path or url. Be sure you use absolute path, relative one being not supported.");
    _this.name = "FileNotFoundError";
    return _this;
  }

  return FileNotFoundError;
}(_wrapNativeSuper(Error));

exports.FileNotFoundError = FileNotFoundError;

var MixedTypeError = function (_TypeError) {
  _inherits(MixedTypeError, _TypeError);

  function MixedTypeError() {
    var _this2;

    _classCallCheck(this, MixedTypeError);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(MixedTypeError).call(this, TypeError));

    for (var _len = arguments.length, types = new Array(_len), _key = 0; _key < _len; _key++) {
      types[_key] = arguments[_key];
    }

    _this2.message = "can't work with multiple variable types: [".concat(types.join(","), "].");
    _this2.name = "MixedTypeError";
    return _this2;
  }

  return MixedTypeError;
}(_wrapNativeSuper(TypeError));

exports.MixedTypeError = MixedTypeError;

var NoSuchColumnError = function (_Error2) {
  _inherits(NoSuchColumnError, _Error2);

  function NoSuchColumnError(column, columns) {
    var _this3;

    _classCallCheck(this, NoSuchColumnError);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(NoSuchColumnError).call(this, Error));
    _this3.message = "".concat(column, " not found in [").concat(columns.join(", "), "].");
    _this3.name = "NoSuchColumnError";
    return _this3;
  }

  return NoSuchColumnError;
}(_wrapNativeSuper(Error));

exports.NoSuchColumnError = NoSuchColumnError;

var WrongSchemaError = function (_Error3) {
  _inherits(WrongSchemaError, _Error3);

  function WrongSchemaError(columns, expected) {
    var _this4;

    _classCallCheck(this, WrongSchemaError);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(WrongSchemaError).call(this, Error));
    _this4.message = "[".concat(columns.join(", "), "] while expecting [").concat(expected.join(", "), "].");
    _this4.name = "WrongSchemaError";
    return _this4;
  }

  return WrongSchemaError;
}(_wrapNativeSuper(Error));

exports.WrongSchemaError = WrongSchemaError;

var ArgumentTypeError = function (_TypeError2) {
  _inherits(ArgumentTypeError, _TypeError2);

  function ArgumentTypeError(input, expected) {
    var _this5;

    _classCallCheck(this, ArgumentTypeError);

    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(ArgumentTypeError).call(this, TypeError));
    _this5.message = "".concat(input && input.constructor ? input.constructor.name : _typeof(input), " while expecting ").concat(expected, ".");
    _this5.name = "ArgumentTypeError";
    return _this5;
  }

  return ArgumentTypeError;
}(_wrapNativeSuper(TypeError));

exports.ArgumentTypeError = ArgumentTypeError;

var SQLParseError = function (_Error4) {
  _inherits(SQLParseError, _Error4);

  function SQLParseError(message) {
    var _this6;

    _classCallCheck(this, SQLParseError);

    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(SQLParseError).call(this, Error));
    _this6.message = "".concat(message, ".");
    _this6.name = "SQLParseError";
    return _this6;
  }

  return SQLParseError;
}(_wrapNativeSuper(Error));

exports.SQLParseError = SQLParseError;

var TableAlreadyExistsError = function (_Error5) {
  _inherits(TableAlreadyExistsError, _Error5);

  function TableAlreadyExistsError(tableName) {
    var _this7;

    _classCallCheck(this, TableAlreadyExistsError);

    _this7 = _possibleConstructorReturn(this, _getPrototypeOf(TableAlreadyExistsError).call(this, Error));
    _this7.message = "The SQL temporary table ".concat(tableName, " already exits. Use overwrite = true to overwrite it.");
    _this7.name = "TableAlreadyExistsError";
    return _this7;
  }

  return TableAlreadyExistsError;
}(_wrapNativeSuper(Error));

exports.TableAlreadyExistsError = TableAlreadyExistsError;

var WrongTableNameError = function (_Error6) {
  _inherits(WrongTableNameError, _Error6);

  function WrongTableNameError(tableName) {
    var _this8;

    _classCallCheck(this, WrongTableNameError);

    _this8 = _possibleConstructorReturn(this, _getPrototypeOf(WrongTableNameError).call(this, Error));
    _this8.message = "The SQL temporary table ".concat(tableName, " is not allowed. Avoid to use Spaces, quotes, tabs....");
    _this8.name = "WrongTableNameError";
    return _this8;
  }

  return WrongTableNameError;
}(_wrapNativeSuper(Error));

exports.WrongTableNameError = WrongTableNameError;