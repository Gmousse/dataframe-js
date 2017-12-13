'use strict';

exports.__esModule = true;
exports.WrongTableNameError = exports.TableAlreadyExistsError = exports.SQLParseError = exports.ArgumentTypeError = exports.WrongSchemaError = exports.NoSuchColumnError = exports.MixedTypeError = exports.FileNotFoundError = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var FileNotFoundError = exports.FileNotFoundError = function (_Error) {
    (0, _inherits3['default'])(FileNotFoundError, _Error);

    function FileNotFoundError(fileName) {
        (0, _classCallCheck3['default'])(this, FileNotFoundError);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (FileNotFoundError.__proto__ || (0, _getPrototypeOf2['default'])(FileNotFoundError)).call(this, Error));

        _this.message = fileName + ' not found. You maybe use a wrong path or url. Be sure you use absolute path, relative one being not supported.';
        _this.name = 'FileNotFoundError';
        return _this;
    }

    return FileNotFoundError;
}(Error);

var MixedTypeError = exports.MixedTypeError = function (_TypeError) {
    (0, _inherits3['default'])(MixedTypeError, _TypeError);

    function MixedTypeError() {
        (0, _classCallCheck3['default'])(this, MixedTypeError);

        var _this2 = (0, _possibleConstructorReturn3['default'])(this, (MixedTypeError.__proto__ || (0, _getPrototypeOf2['default'])(MixedTypeError)).call(this, TypeError));

        for (var _len = arguments.length, types = Array(_len), _key = 0; _key < _len; _key++) {
            types[_key] = arguments[_key];
        }

        _this2.message = 'can\'t work with multiple variable types: [' + types.join(',') + '].';
        _this2.name = 'MixedTypeError';
        return _this2;
    }

    return MixedTypeError;
}(TypeError);

var NoSuchColumnError = exports.NoSuchColumnError = function (_Error2) {
    (0, _inherits3['default'])(NoSuchColumnError, _Error2);

    function NoSuchColumnError(column, columns) {
        (0, _classCallCheck3['default'])(this, NoSuchColumnError);

        var _this3 = (0, _possibleConstructorReturn3['default'])(this, (NoSuchColumnError.__proto__ || (0, _getPrototypeOf2['default'])(NoSuchColumnError)).call(this, Error));

        _this3.message = column + ' not found in [' + columns.join(', ') + '].';
        _this3.name = 'NoSuchColumnError';
        return _this3;
    }

    return NoSuchColumnError;
}(Error);

var WrongSchemaError = exports.WrongSchemaError = function (_Error3) {
    (0, _inherits3['default'])(WrongSchemaError, _Error3);

    function WrongSchemaError(columns, expected) {
        (0, _classCallCheck3['default'])(this, WrongSchemaError);

        var _this4 = (0, _possibleConstructorReturn3['default'])(this, (WrongSchemaError.__proto__ || (0, _getPrototypeOf2['default'])(WrongSchemaError)).call(this, Error));

        _this4.message = '[' + columns.join(', ') + '] while expecting [' + expected.join(', ') + '].';
        _this4.name = 'WrongSchemaError';
        return _this4;
    }

    return WrongSchemaError;
}(Error);

var ArgumentTypeError = exports.ArgumentTypeError = function (_TypeError2) {
    (0, _inherits3['default'])(ArgumentTypeError, _TypeError2);

    function ArgumentTypeError(input, expected) {
        (0, _classCallCheck3['default'])(this, ArgumentTypeError);

        var _this5 = (0, _possibleConstructorReturn3['default'])(this, (ArgumentTypeError.__proto__ || (0, _getPrototypeOf2['default'])(ArgumentTypeError)).call(this, TypeError));

        _this5.message = (input && input.constructor ? input.constructor.name : typeof input === 'undefined' ? 'undefined' : (0, _typeof3['default'])(input)) + ' while expecting ' + expected + '.';
        _this5.name = 'ArgumentTypeError';
        return _this5;
    }

    return ArgumentTypeError;
}(TypeError);

var SQLParseError = exports.SQLParseError = function (_Error4) {
    (0, _inherits3['default'])(SQLParseError, _Error4);

    function SQLParseError(message) {
        (0, _classCallCheck3['default'])(this, SQLParseError);

        var _this6 = (0, _possibleConstructorReturn3['default'])(this, (SQLParseError.__proto__ || (0, _getPrototypeOf2['default'])(SQLParseError)).call(this, Error));

        _this6.message = message + '.';
        _this6.name = 'SQLParseError';
        return _this6;
    }

    return SQLParseError;
}(Error);

var TableAlreadyExistsError = exports.TableAlreadyExistsError = function (_Error5) {
    (0, _inherits3['default'])(TableAlreadyExistsError, _Error5);

    function TableAlreadyExistsError(tableName) {
        (0, _classCallCheck3['default'])(this, TableAlreadyExistsError);

        var _this7 = (0, _possibleConstructorReturn3['default'])(this, (TableAlreadyExistsError.__proto__ || (0, _getPrototypeOf2['default'])(TableAlreadyExistsError)).call(this, Error));

        _this7.message = 'The SQL temporary table ' + tableName + ' already exits. Use overwrite = true to overwrite it.';
        _this7.name = 'TableAlreadyExistsError';
        return _this7;
    }

    return TableAlreadyExistsError;
}(Error);

var WrongTableNameError = exports.WrongTableNameError = function (_Error6) {
    (0, _inherits3['default'])(WrongTableNameError, _Error6);

    function WrongTableNameError(tableName) {
        (0, _classCallCheck3['default'])(this, WrongTableNameError);

        var _this8 = (0, _possibleConstructorReturn3['default'])(this, (WrongTableNameError.__proto__ || (0, _getPrototypeOf2['default'])(WrongTableNameError)).call(this, Error));

        _this8.message = 'The SQL temporary table ' + tableName + ' is not allowed. Avoid to use Spaces, quotes, tabs....';
        _this8.name = 'WrongTableNameError';
        return _this8;
    }

    return WrongTableNameError;
}(Error);