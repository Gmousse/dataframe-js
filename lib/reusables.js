'use strict';

exports.__esModule = true;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.asArray = asArray;
exports.isArrayOfType = isArrayOfType;
exports.isNumber = isNumber;
exports.arrayEqual = arrayEqual;
exports.transpose = transpose;
exports.makeGenerator = makeGenerator;
exports.match = match;
exports.iter = iter;
exports.chain = chain;
exports.saveFile = saveFile;
exports.loadTextFile = loadTextFile;
exports.addFileProtocol = addFileProtocol;
exports.xSplit = xSplit;
exports.xReplace = xReplace;
exports.xContains = xContains;
exports.compare = compare;
exports.hashCode = hashCode;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _marked = _regenerator2['default'].mark(makeGenerator),
    _marked2 = _regenerator2['default'].mark(iter);

function asArray(x) {
    if (!x) return [];
    return Array.isArray(x) ? x : [x];
}

function isArrayOfType(value, ofType) {
    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    return value instanceof Array && value.hasOwnProperty(index) && (ofType === String ? typeof value[index] === 'string' : value[index] instanceof ofType) ? true : false;
}

function isNumber(x) {
    return !isNaN(parseFloat(x)) && isFinite(x);
}

function arrayEqual(a, b) {
    var byOrder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    return byOrder ? (0, _keys2['default'])(a).map(function (x) {
        return a[x] === b[x];
    }).reduce(function (p, n) {
        return p ? n : p;
    }, true) : [].concat((0, _toConsumableArray3['default'])(new _set2['default'](a.filter(function (x) {
        return !new _set2['default'](b).has(x);
    })))).length === 0;
}

function transpose(table) {
    var tableSize = table.map(function (row) {
        return row.length;
    }).reduce(function (p, n) {
        return Math.max(p, n);
    }, 0);
    return [].concat((0, _toConsumableArray3['default'])(Array(tableSize).keys())).map(function (index) {
        return table.map(function (row) {
            return row[index];
        });
    });
}

function makeGenerator(x) {
    return _regenerator2['default'].wrap(function makeGenerator$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    return _context.delegateYield(x, 't0', 1);

                case 1:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
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
    var abort = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
        return false;
    };

    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, iteration, modifiedRow;

    return _regenerator2['default'].wrap(function iter$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context2.prev = 3;
                    _iterator = (0, _getIterator3['default'])(data);

                case 5:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                        _context2.next = 16;
                        break;
                    }

                    iteration = _step.value;

                    if (!abort()) {
                        _context2.next = 9;
                        break;
                    }

                    return _context2.abrupt('return');

                case 9:
                    modifiedRow = func(iteration);

                    if (!modifiedRow) {
                        _context2.next = 13;
                        break;
                    }

                    _context2.next = 13;
                    return modifiedRow;

                case 13:
                    _iteratorNormalCompletion = true;
                    _context2.next = 5;
                    break;

                case 16:
                    _context2.next = 22;
                    break;

                case 18:
                    _context2.prev = 18;
                    _context2.t0 = _context2['catch'](3);
                    _didIteratorError = true;
                    _iteratorError = _context2.t0;

                case 22:
                    _context2.prev = 22;
                    _context2.prev = 23;

                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }

                case 25:
                    _context2.prev = 25;

                    if (!_didIteratorError) {
                        _context2.next = 28;
                        break;
                    }

                    throw _iteratorError;

                case 28:
                    return _context2.finish(25);

                case 29:
                    return _context2.finish(22);

                case 30:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked2, this, [[3, 18, 22, 30], [23,, 25, 29]]);
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

function saveFile(path, content) {
    try {
        require('fs').writeFileSync(path, content);
    } catch (e) {
        console.warn('File system module is not available.');
    }
}

function loadTextFile(file, func) {
    if (FileReader && File) {
        var reader = new FileReader();
        reader.onload = function (event) {
            return func(event.target.result);
        };
        reader.readAsText(file);
    }
}

function addFileProtocol(path) {
    return path.startsWith('/') || path.startsWith('./') ? 'file://' + path : path;
}

function xSplit(stringToSplit) {
    for (var _len3 = arguments.length, patterns = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        patterns[_key3 - 1] = arguments[_key3];
    }

    return patterns.reduce(function (prev, next) {
        return prev.map(function (str) {
            return str.split(next);
        }).reduce(function (p, n) {
            return [].concat((0, _toConsumableArray3['default'])(p), (0, _toConsumableArray3['default'])(n));
        }, []);
    }, [stringToSplit]);
}

function xReplace(stringToReplace) {
    for (var _len4 = arguments.length, patterns = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        patterns[_key4 - 1] = arguments[_key4];
    }

    return patterns.reduce(function (prev, next) {
        return prev.split(next[0]).join(next[1]);
    }, stringToReplace);
}

function xContains(stringToFilter) {
    for (var _len5 = arguments.length, patterns = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        patterns[_key5 - 1] = arguments[_key5];
    }

    return patterns.filter(function (pattern) {
        return stringToFilter.includes(pattern);
    });
}

function compare(firstElem, secondElem) {
    var reverse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (firstElem > secondElem) {
        return reverse ? -1 : 1;
    } else if (firstElem < secondElem) {
        return reverse ? 1 : -1;
    }
    return 0;
}

function hashCode(str) {
    var hash = 0;
    var char = void 0;
    if (str.length === 0) return hash;
    for (var i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return hash;
}