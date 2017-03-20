'use strict';

exports.__esModule = true;
exports['default'] = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Benchmark = function () {
    function Benchmark() {
        (0, _classCallCheck3['default'])(this, Benchmark);
    }

    (0, _createClass3['default'])(Benchmark, [{
        key: '__benchmarks__',
        value: _regenerator2['default'].mark(function __benchmarks__(func, repeats) {
            var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, bench, timer, diff;

            return _regenerator2['default'].wrap(function __benchmarks__$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context.prev = 3;
                            _iterator = (0, _getIterator3['default'])(Array(repeats));

                        case 5:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _context.next = 15;
                                break;
                            }

                            bench = _step.value;
                            timer = process.hrtime();

                            func(bench);
                            diff = process.hrtime(timer);
                            _context.next = 12;
                            return diff[0] * 1e9 + diff[1];

                        case 12:
                            _iteratorNormalCompletion = true;
                            _context.next = 5;
                            break;

                        case 15:
                            _context.next = 21;
                            break;

                        case 17:
                            _context.prev = 17;
                            _context.t0 = _context['catch'](3);
                            _didIteratorError = true;
                            _iteratorError = _context.t0;

                        case 21:
                            _context.prev = 21;
                            _context.prev = 22;

                            if (!_iteratorNormalCompletion && _iterator['return']) {
                                _iterator['return']();
                            }

                        case 24:
                            _context.prev = 24;

                            if (!_didIteratorError) {
                                _context.next = 27;
                                break;
                            }

                            throw _iteratorError;

                        case 27:
                            return _context.finish(24);

                        case 28:
                            return _context.finish(21);

                        case 29:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, __benchmarks__, this, [[3, 17, 21, 29], [22,, 24, 28]]);
        })
    }, {
        key: '_mean',
        value: function _mean(array) {
            return array.reduce(function (p, n) {
                return p + n;
            }, 0) / array.length;
        }
    }, {
        key: 'start',
        value: function start(func, repeats) {
            var benchmarkResult = this._mean([].concat((0, _toConsumableArray3['default'])(this.__benchmarks__(func, repeats))));
            console.log('New benchmark: ' + benchmarkResult + ' nanoseconds');
            return benchmarkResult;
        }
    }, {
        key: 'compare',
        value: function compare(func1, func2, repeats) {
            var _ref = [this.start(func1, repeats), this.start(func2, repeats)],
                benchmarkResult1 = _ref[0],
                benchmarkResult2 = _ref[1];

            console.log('Most rapid function: ' + (benchmarkResult1 > benchmarkResult2 ? 'func2' : 'func1'));
            return [benchmarkResult1, benchmarkResult2];
        }
    }]);
    return Benchmark;
}();

exports['default'] = Benchmark;