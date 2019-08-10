"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.parse-float");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.set");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.split");

require("core-js/modules/esnext.set.add-all");

require("core-js/modules/esnext.set.delete-all");

require("core-js/modules/esnext.set.difference");

require("core-js/modules/esnext.set.every");

require("core-js/modules/esnext.set.filter");

require("core-js/modules/esnext.set.find");

require("core-js/modules/esnext.set.intersection");

require("core-js/modules/esnext.set.is-disjoint-from");

require("core-js/modules/esnext.set.is-subset-of");

require("core-js/modules/esnext.set.is-superset-of");

require("core-js/modules/esnext.set.join");

require("core-js/modules/esnext.set.map");

require("core-js/modules/esnext.set.reduce");

require("core-js/modules/esnext.set.some");

require("core-js/modules/esnext.set.symmetric-difference");

require("core-js/modules/esnext.set.union");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArrayOfType = isArrayOfType;
exports.isNumber = isNumber;
exports.arrayEqual = arrayEqual;
exports.transpose = transpose;
exports.makeGenerator = makeGenerator;
exports.iter = iter;
exports.chain = chain;
exports.xSplit = xSplit;
exports.xReplace = xReplace;
exports.xContains = xContains;
exports.hashCode = hashCode;

require("regenerator-runtime/runtime");

var _marked = regeneratorRuntime.mark(makeGenerator),
    _marked2 = regeneratorRuntime.mark(createIterGenerator);

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function isArrayOfType(value, ofType) {
  var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return value instanceof Array && value.hasOwnProperty(index) && (ofType === String ? typeof value[index] === "string" : value[index] instanceof ofType) ? true : false;
}

function isNumber(x) {
  return !isNaN(parseFloat(x)) && isFinite(x);
}

function arrayEqual(a, b) {
  var byOrder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return byOrder ? Object.keys(a).map(function (x) {
    return a[x] === b[x];
  }).reduce(function (p, n) {
    return p ? n : p;
  }, true) : _toConsumableArray(new Set(a.filter(function (x) {
    return !new Set(b).has(x);
  }))).length === 0;
}

function transpose(table) {
  var tableSize = table.map(function (row) {
    return row.length;
  }).reduce(function (p, n) {
    return Math.max(p, n);
  }, 0);
  return _toConsumableArray(Array(tableSize).keys()).map(function (index) {
    return table.map(function (row) {
      return row[index];
    });
  });
}

function makeGenerator(x) {
  return regeneratorRuntime.wrap(function makeGenerator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.delegateYield(x, "t0", 1);

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

function createIterGenerator(data, func) {
  var abort,
      i,
      _iteratorNormalCompletion,
      _didIteratorError,
      _iteratorError,
      _iterator,
      _step,
      iteration,
      modifiedRow,
      _args2 = arguments;

  return regeneratorRuntime.wrap(function createIterGenerator$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          abort = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : function () {
            return false;
          };
          i = 0;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context2.prev = 5;
          _iterator = data[Symbol.iterator]();

        case 7:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context2.next = 18;
            break;
          }

          iteration = _step.value;

          if (!abort()) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt("return");

        case 11:
          modifiedRow = func(iteration, i++);

          if (!modifiedRow) {
            _context2.next = 15;
            break;
          }

          _context2.next = 15;
          return modifiedRow;

        case 15:
          _iteratorNormalCompletion = true;
          _context2.next = 7;
          break;

        case 18:
          _context2.next = 24;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](5);
          _didIteratorError = true;
          _iteratorError = _context2.t0;

        case 24:
          _context2.prev = 24;
          _context2.prev = 25;

          if (!_iteratorNormalCompletion && _iterator.return != null) {
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
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, null, [[5, 20, 24, 32], [25,, 27, 31]]);
}

function iter(data, func) {
  var abort = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
    return false;
  };
  return Array.from(createIterGenerator(data, func, abort));
}

function chain(data) {
  for (var _len = arguments.length, operations = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    operations[_key - 1] = arguments[_key];
  }

  return Array.from(iter(data, operations.reduce(function (p, n) {
    return function (x, i) {
      var prev = p(x, i);
      var next = prev ? n(prev, i) : false;
      return next === true ? prev : next;
    };
  }, function (x) {
    return x;
  })));
}

function xSplit(stringToSplit) {
  for (var _len2 = arguments.length, patterns = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    patterns[_key2 - 1] = arguments[_key2];
  }

  return patterns.reduce(function (prev, next) {
    return prev.map(function (str) {
      return str.split(next);
    }).reduce(function (p, n) {
      return [].concat(_toConsumableArray(p), _toConsumableArray(n));
    }, []);
  }, [stringToSplit]);
}

function xReplace(stringToReplace) {
  for (var _len3 = arguments.length, patterns = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    patterns[_key3 - 1] = arguments[_key3];
  }

  return patterns.reduce(function (prev, next) {
    return prev.split(next[0]).join(next[1]);
  }, stringToReplace);
}

function xContains(stringToFilter) {
  for (var _len4 = arguments.length, patterns = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    patterns[_key4 - 1] = arguments[_key4];
  }

  return patterns.filter(function (pattern) {
    return stringToFilter.includes(pattern);
  });
}

function hashCode(str) {
  var hash = 0;
  var char;
  if (str.length === 0) return hash;

  for (var i = 0; i < str.length; i++) {
    char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return hash;
}