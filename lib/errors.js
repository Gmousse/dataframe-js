'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WrongMatrixStructureError = exports.NotTheSameSchemaError = exports.NoSuchColumnError = exports.SchemaTypeError = exports.SchemaError = exports.EmptyInputError = exports.InputTypeError = undefined;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputTypeError = exports.InputTypeError = function (_Error) {
    (0, _inherits3.default)(InputTypeError, _Error);

    function InputTypeError(type, supportedTypes) {
        (0, _classCallCheck3.default)(this, InputTypeError);

        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(InputTypeError).call(this));

        _this.message = 'InputTypeError: ' + (typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) + ' while only suppporting ' + supportedTypes.join(', ');
        _this.name = 'InputTypeError';
        return _this;
    }

    return InputTypeError;
}(Error);

var EmptyInputError = exports.EmptyInputError = function (_Error2) {
    (0, _inherits3.default)(EmptyInputError, _Error2);

    function EmptyInputError(input) {
        (0, _classCallCheck3.default)(this, EmptyInputError);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(EmptyInputError).call(this));

        _this2.message = 'EmptyInputError: ' + input + ' is empty';
        _this2.name = 'EmptyInputError';
        return _this2;
    }

    return EmptyInputError;
}(Error);

var SchemaError = exports.SchemaError = function (_Error3) {
    (0, _inherits3.default)(SchemaError, _Error3);

    function SchemaError(schema) {
        (0, _classCallCheck3.default)(this, SchemaError);

        var _this3 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SchemaError).call(this));

        _this3.message = 'ShemaError: ' + schema + ' found while expecting [[String, Object]]';
        _this3.name = 'SchemaError';
        return _this3;
    }

    return SchemaError;
}(Error);

var SchemaTypeError = exports.SchemaTypeError = function (_Error4) {
    (0, _inherits3.default)(SchemaTypeError, _Error4);

    function SchemaTypeError(type) {
        (0, _classCallCheck3.default)(this, SchemaTypeError);

        var _this4 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SchemaTypeError).call(this));

        _this4.message = 'SchemaTypeError: ' + type + ' while only supporting Array as Schema';
        _this4.name = 'SchemaTypeError';
        return _this4;
    }

    return SchemaTypeError;
}(Error);

var NoSuchColumnError = exports.NoSuchColumnError = function (_Error5) {
    (0, _inherits3.default)(NoSuchColumnError, _Error5);

    function NoSuchColumnError(column, columns) {
        (0, _classCallCheck3.default)(this, NoSuchColumnError);

        var _this5 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(NoSuchColumnError).call(this));

        _this5.message = 'NoSuchColumnError: ' + column + ' not found in [' + columns.join(', ') + ']';
        _this5.name = 'NoSuchColumnError';
        return _this5;
    }

    return NoSuchColumnError;
}(Error);

var NotTheSameSchemaError = exports.NotTheSameSchemaError = function (_Error6) {
    (0, _inherits3.default)(NotTheSameSchemaError, _Error6);

    function NotTheSameSchemaError(columns, expected) {
        (0, _classCallCheck3.default)(this, NotTheSameSchemaError);

        var _this6 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(NotTheSameSchemaError).call(this));

        _this6.message = 'NotTheSameSchemaError: [' + columns.join(', ') + '] while expecting [' + expected.join(', ') + ']';
        _this6.name = 'NotTheSameSchemaError';
        return _this6;
    }

    return NotTheSameSchemaError;
}(Error);

var WrongMatrixStructureError = exports.WrongMatrixStructureError = function (_Error7) {
    (0, _inherits3.default)(WrongMatrixStructureError, _Error7);

    function WrongMatrixStructureError(structure, expected) {
        (0, _classCallCheck3.default)(this, WrongMatrixStructureError);

        var _this7 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(WrongMatrixStructureError).call(this));

        _this7.message = 'WrongMatrixStructureError: [' + structure.join(', ') + '] while expecting [' + expected.join(', ') + ']';
        _this7.name = 'WrongMatrixStructureError';
        return _this7;
    }

    return WrongMatrixStructureError;
}(Error);