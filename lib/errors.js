'use strict';

exports.__esModule = true;
exports.TableAlreadyExistsError = exports.SQLParseError = exports.WrongSchemaError = exports.NoSuchColumnError = exports.MixedTypeError = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var MixedTypeError = exports.MixedTypeError = function (_TypeError) {
    (0, _inherits3['default'])(MixedTypeError, _TypeError);

    function MixedTypeError() {
        (0, _classCallCheck3['default'])(this, MixedTypeError);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (MixedTypeError.__proto__ || (0, _getPrototypeOf2['default'])(MixedTypeError)).call(this, TypeError));

        for (var _len = arguments.length, types = Array(_len), _key = 0; _key < _len; _key++) {
            types[_key] = arguments[_key];
        }

        _this.message = 'can\'t work with multiple variable types: [' + types.join(',') + '].';
        _this.name = 'MixedTypeError';
        return _this;
    }

    return MixedTypeError;
}(TypeError);

var NoSuchColumnError = exports.NoSuchColumnError = function (_Error) {
    (0, _inherits3['default'])(NoSuchColumnError, _Error);

    function NoSuchColumnError(column, columns) {
        (0, _classCallCheck3['default'])(this, NoSuchColumnError);

        var _this2 = (0, _possibleConstructorReturn3['default'])(this, (NoSuchColumnError.__proto__ || (0, _getPrototypeOf2['default'])(NoSuchColumnError)).call(this, Error));

        _this2.message = column + ' not found in [' + columns.join(', ') + '].';
        _this2.name = 'NoSuchColumnError';
        return _this2;
    }

    return NoSuchColumnError;
}(Error);

var WrongSchemaError = exports.WrongSchemaError = function (_Error2) {
    (0, _inherits3['default'])(WrongSchemaError, _Error2);

    function WrongSchemaError(columns, expected) {
        (0, _classCallCheck3['default'])(this, WrongSchemaError);

        var _this3 = (0, _possibleConstructorReturn3['default'])(this, (WrongSchemaError.__proto__ || (0, _getPrototypeOf2['default'])(WrongSchemaError)).call(this, Error));

        _this3.message = '[' + columns.join(', ') + '] while expecting [' + expected.join(', ') + '].';
        _this3.name = 'WrongSchemaError';
        return _this3;
    }

    return WrongSchemaError;
}(Error);

var SQLParseError = exports.SQLParseError = function (_Error3) {
    (0, _inherits3['default'])(SQLParseError, _Error3);

    function SQLParseError(message) {
        (0, _classCallCheck3['default'])(this, SQLParseError);

        var _this4 = (0, _possibleConstructorReturn3['default'])(this, (SQLParseError.__proto__ || (0, _getPrototypeOf2['default'])(SQLParseError)).call(this, Error));

        _this4.message = message + '.';
        _this4.name = 'SQLParseError';
        return _this4;
    }

    return SQLParseError;
}(Error);

var TableAlreadyExistsError = exports.TableAlreadyExistsError = function (_Error4) {
    (0, _inherits3['default'])(TableAlreadyExistsError, _Error4);

    function TableAlreadyExistsError(tableName) {
        (0, _classCallCheck3['default'])(this, TableAlreadyExistsError);

        var _this5 = (0, _possibleConstructorReturn3['default'])(this, (TableAlreadyExistsError.__proto__ || (0, _getPrototypeOf2['default'])(TableAlreadyExistsError)).call(this, Error));

        _this5.message = 'The SQL temporary table ' + tableName + ' already exits. Use overwrite = true to overwrite it.';
        _this5.name = 'TableAlreadyExistsError';
        return _this5;
    }

    return TableAlreadyExistsError;
}(Error);