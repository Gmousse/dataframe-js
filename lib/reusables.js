'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.returnArray = returnArray;
exports.transpose = transpose;
exports.isArrayOfType = isArrayOfType;
exports.makeGenerator = makeGenerator;
exports.opMax = opMax;
exports.match = match;
exports.iter = iter;
exports.chain = chain;
exports.isNumber = isNumber;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [makeGenerator, iter].map(_regenerator2.default.mark);

function returnArray(thing) {
    return Array.isArray(thing) ? thing : [thing];
}

function transpose(table) {
    var tableSize = table.map(function (row) {
        return row.length;
    }).reduce(function (p, n) {
        return Math.max(p, n);
    }, 0);
    return [].concat((0, _toConsumableArray3.default)(Array(tableSize).keys())).map(function (index) {
        return table.map(function (row) {
            return row[index];
        });
    });
}

function isArrayOfType(value, ofType) {
    var index = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

    return value instanceof Array && value.hasOwnProperty(index) && (ofType === String ? typeof value[index] === 'string' : value[index] instanceof ofType) ? true : false;
}

function makeGenerator(thing) {
    return _regenerator2.default.wrap(function makeGenerator$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    return _context.delegateYield(thing, 't0', 1);

                case 1:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked[0], this);
}

function opMax(values) {
    return values.reduce(function (p, n) {
        return Math.max(p, n);
    }, 0);
}

function match(value) {
    for (var _len = arguments.length, cases = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        cases[_key - 1] = arguments[_key];
    }

    var casesGen = makeGenerator(cases);
    var checker = function checker(nextCase) {
        return nextCase[0](value) ? nextCase[1](value) : checker(casesGen.next().value);
    };
    return checker(casesGen.next().value);
}

function iter(data, func) {
    var limit = arguments.length <= 2 || arguments[2] === undefined ? Infinity : arguments[2];

    var token, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, row, modifiedRow;

    return _regenerator2.default.wrap(function iter$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    token = limit;
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context2.prev = 4;
                    _iterator = (0, _getIterator3.default)(data);

                case 6:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                        _context2.next = 18;
                        break;
                    }

                    row = _step.value;

                    if (!(token <= 0)) {
                        _context2.next = 10;
                        break;
                    }

                    return _context2.abrupt('return');

                case 10:
                    token--;
                    modifiedRow = func(row);

                    if (!modifiedRow) {
                        _context2.next = 15;
                        break;
                    }

                    _context2.next = 15;
                    return modifiedRow;

                case 15:
                    _iteratorNormalCompletion = true;
                    _context2.next = 6;
                    break;

                case 18:
                    _context2.next = 24;
                    break;

                case 20:
                    _context2.prev = 20;
                    _context2.t0 = _context2['catch'](4);
                    _didIteratorError = true;
                    _iteratorError = _context2.t0;

                case 24:
                    _context2.prev = 24;
                    _context2.prev = 25;

                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }

                case 27:
                    _context2.prev = 27;

                    if (!_didIteratorError) {
                        _context2.next = 30;
                        break;
                    }

                    throw _iteratorError;

                case 30:
                    return _context2.finish(27);

                case 31:
                    return _context2.finish(24);

                case 32:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked[1], this, [[4, 20, 24, 32], [25,, 27, 31]]);
}

function chain(data) {
    for (var _len2 = arguments.length, operations = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        operations[_key2 - 1] = arguments[_key2];
    }

    return iter(data, operations.reduce(function (p, n) {
        return function (x) {
            var prev = p(x);
            var next = prev ? n(prev) : false;
            return next === true ? prev : next;
        };
    }, function (x) {
        return x;
    }));
}

function isNumber(x) {
    return !isNaN(parseFloat(x)) && isFinite(x);
}