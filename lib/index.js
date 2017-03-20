'use strict';

exports.__esModule = true;
exports.Benchmark = exports.Row = exports.DataFrame = undefined;

require('babel-polyfill');

var _dataframe = require('./dataframe.js');

var _dataframe2 = _interopRequireDefault(_dataframe);

var _row = require('./row.js');

var _row2 = _interopRequireDefault(_row);

var _stat = require('./modules/stat.js');

var _stat2 = _interopRequireDefault(_stat);

var _matrix = require('./modules/matrix.js');

var _matrix2 = _interopRequireDefault(_matrix);

var _sql = require('./modules/sql.js');

var _sql2 = _interopRequireDefault(_sql);

var _benchmark = require('./extras/benchmark.js');

var _benchmark2 = _interopRequireDefault(_benchmark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_dataframe2['default'].setDefaultModules(_stat2['default'], _matrix2['default'], _sql2['default']);
_dataframe2['default'].sql = _sql2['default'];

exports.DataFrame = _dataframe2['default'];
exports.Row = _row2['default'];
exports.Benchmark = _benchmark2['default'];