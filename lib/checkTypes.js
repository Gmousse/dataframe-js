'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

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

exports.checkArgumentsTypes = checkArgumentsTypes;
exports.checktypes = checktypes;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ArgumentTypeError = function (_TypeError) {
    (0, _inherits3.default)(ArgumentTypeError, _TypeError);

    function ArgumentTypeError(arg, argName, supportedTypes) {
        (0, _classCallCheck3.default)(this, ArgumentTypeError);

        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ArgumentTypeError).call(this));

        _this.message = argName + ' must be one of [' + supportedTypes.join(',') + '],\n            not a ' + (typeof arg === 'undefined' ? 'undefined' : (0, _typeof3.default)(arg)) + ' ' + (arg.constructor ? arg.constructor.name : '') + '.';
        return _this;
    }

    return ArgumentTypeError;
}(TypeError);

function getParamNames(func) {
    if (!func.hasOwnProperty('prototype')) {
        throw new TypeError('getParamNames only works with unbound functions.');
    }
    var funcString = func.toString();
    return funcString.slice(funcString.indexOf('(') + 1, funcString.indexOf(')')).match(/([^\s,]+)/g);
}

function isOfType(variable, type) {
    return typeof type === 'string' ? variable.constructor && variable.constructor.name === type || (typeof variable === 'undefined' ? 'undefined' : (0, _typeof3.default)(variable)) === type.toLowerCase() : variable instanceof type;
}

function checkArgType(arg, argName, expectedTypes) {
    if (!expectedTypes.reduce(function (p, n) {
        return p && isOfType(arg, n);
    }, true)) {
        throw new ArgumentTypeError(arg, argName, expectedTypes);
    }
}

function checkArgumentsTypes(func, types) {
    var _this2 = this;

    var argNames = getParamNames(func);
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        args.forEach(function (arg, index) {
            if (types[index]) {
                checkArgType(arg, argNames[index], Array.isArray(types[index]) ? types[index] : [types[index]]);
            }
        });
        return func.call.apply(func, [_this2].concat(args));
    };
}

function checktypes() {
    for (var _len2 = arguments.length, types = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        types[_key2] = arguments[_key2];
    }

    return function (target, name, descriptor) {
        return {
            configurable: true,
            get: function get() {
                var func = checkArgumentsTypes.call(this, descriptor.value, types);
                (0, _defineProperty2.default)(this, name, {
                    value: func,
                    configurable: true,
                    writable: true
                });
                return func;
            }
        };
    };
}