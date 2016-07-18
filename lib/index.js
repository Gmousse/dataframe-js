'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Benchmark = exports.Row = exports.DataFrame = undefined;

var _dataframe = require('./dataframe.js');

var _dataframe2 = _interopRequireDefault(_dataframe);

var _row = require('./row.js');

var _row2 = _interopRequireDefault(_row);

var _stat = require('./modules/stat.js');

var _stat2 = _interopRequireDefault(_stat);

var _matrix = require('./modules/matrix.js');

var _matrix2 = _interopRequireDefault(_matrix);

var _benchmark = require('./extras/benchmark.js');

var _benchmark2 = _interopRequireDefault(_benchmark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataFrameWithDefaultModules = function DataFrameWithDefaultModules(data, columns) {
  for (var _len = arguments.length, modules = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    modules[_key - 2] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(_dataframe2.default, [null].concat([data, columns, _stat2.default, _matrix2.default], modules)))();
};

exports.DataFrame = DataFrameWithDefaultModules;
exports.Row = _row2.default;
exports.Benchmark = _benchmark2.default;