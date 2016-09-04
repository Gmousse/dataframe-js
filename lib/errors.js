'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TableAlreadyExistsError = exports.SQLParseError = exports.WrongMatrixStructureError = exports.NotTheSameColumnLengthsError = exports.NotTheSameSchemaError = exports.NoSuchColumnError = exports.SchemaTypeError = exports.SchemaError = exports.EmptyInputError = exports.InputTypeError = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputTypeError = exports.InputTypeError = function (_TypeError) {
    (0, _inherits3.default)(InputTypeError, _TypeError);

    function InputTypeError(inputName, supportedTypes, inputType) {
        (0, _classCallCheck3.default)(this, InputTypeError);

        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(InputTypeError).call(this));

        _this.message = inputName + ' must be one of [' + supportedTypes.join(',') + '], not a ' + inputType + '.';
        return _this;
    }

    return InputTypeError;
}(TypeError);

var EmptyInputError = exports.EmptyInputError = function (_Error) {
    (0, _inherits3.default)(EmptyInputError, _Error);

    function EmptyInputError(input) {
        (0, _classCallCheck3.default)(this, EmptyInputError);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(EmptyInputError).call(this));

        _this2.message = input + ' is empty';
        _this2.name = 'EmptyInputError';
        return _this2;
    }

    return EmptyInputError;
}(Error);

var SchemaError = exports.SchemaError = function (_Error2) {
    (0, _inherits3.default)(SchemaError, _Error2);

    function SchemaError(schema) {
        (0, _classCallCheck3.default)(this, SchemaError);

        var _this3 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SchemaError).call(this));

        _this3.message = schema + ' found while expecting [[String, Object]]';
        _this3.name = 'SchemaError';
        return _this3;
    }

    return SchemaError;
}(Error);

var SchemaTypeError = exports.SchemaTypeError = function (_Error3) {
    (0, _inherits3.default)(SchemaTypeError, _Error3);

    function SchemaTypeError(type) {
        (0, _classCallCheck3.default)(this, SchemaTypeError);

        var _this4 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SchemaTypeError).call(this));

        _this4.message = type + ' while only supporting Array as Schema';
        _this4.name = 'SchemaTypeError';
        return _this4;
    }

    return SchemaTypeError;
}(Error);

var NoSuchColumnError = exports.NoSuchColumnError = function (_Error4) {
    (0, _inherits3.default)(NoSuchColumnError, _Error4);

    function NoSuchColumnError(column, columns) {
        (0, _classCallCheck3.default)(this, NoSuchColumnError);

        var _this5 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(NoSuchColumnError).call(this));

        _this5.message = column + ' not found in [' + columns.join(', ') + ']';
        _this5.name = 'NoSuchColumnError';
        return _this5;
    }

    return NoSuchColumnError;
}(Error);

var NotTheSameSchemaError = exports.NotTheSameSchemaError = function (_Error5) {
    (0, _inherits3.default)(NotTheSameSchemaError, _Error5);

    function NotTheSameSchemaError(columns, expected) {
        (0, _classCallCheck3.default)(this, NotTheSameSchemaError);

        var _this6 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(NotTheSameSchemaError).call(this));

        _this6.message = '[' + columns.join(', ') + '] while expecting [' + expected.join(', ') + ']';
        _this6.name = 'NotTheSameSchemaError';
        return _this6;
    }

    return NotTheSameSchemaError;
}(Error);

var NotTheSameColumnLengthsError = exports.NotTheSameColumnLengthsError = function (_Error6) {
    (0, _inherits3.default)(NotTheSameColumnLengthsError, _Error6);

    function NotTheSameColumnLengthsError(length, expected) {
        (0, _classCallCheck3.default)(this, NotTheSameColumnLengthsError);

        var _this7 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(NotTheSameColumnLengthsError).call(this));

        _this7.message = '[' + length + '] while expecting [' + expected + ']';
        _this7.name = 'NotTheSameColumnLengthsError';
        return _this7;
    }

    return NotTheSameColumnLengthsError;
}(Error);

var WrongMatrixStructureError = exports.WrongMatrixStructureError = function (_Error7) {
    (0, _inherits3.default)(WrongMatrixStructureError, _Error7);

    function WrongMatrixStructureError(structure, expected) {
        (0, _classCallCheck3.default)(this, WrongMatrixStructureError);

        var _this8 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(WrongMatrixStructureError).call(this));

        _this8.message = '[' + structure.join(', ') + '] while expecting [' + expected.join(', ') + ']';
        _this8.name = 'WrongMatrixStructureError';
        return _this8;
    }

    return WrongMatrixStructureError;
}(Error);

var SQLParseError = exports.SQLParseError = function (_Error8) {
    (0, _inherits3.default)(SQLParseError, _Error8);

    function SQLParseError(message) {
        (0, _classCallCheck3.default)(this, SQLParseError);

        var _this9 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SQLParseError).call(this));

        _this9.message = '' + message;
        _this9.name = 'SQLParseError';
        return _this9;
    }

    return SQLParseError;
}(Error);

var TableAlreadyExistsError = exports.TableAlreadyExistsError = function (_Error9) {
    (0, _inherits3.default)(TableAlreadyExistsError, _Error9);

    function TableAlreadyExistsError(tableName) {
        (0, _classCallCheck3.default)(this, TableAlreadyExistsError);

        var _this10 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(TableAlreadyExistsError).call(this));

        _this10.message = 'The SQL temporary table ' + tableName + ' already exits. Use overwrite = true to overwrite it';
        _this10.name = 'TableAlreadyExistsError';
        return _this10;
    }

    return TableAlreadyExistsError;
}(Error);