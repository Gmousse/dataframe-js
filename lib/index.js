'use strict';

exports.__esModule = true;
exports.Errors = exports.Benchmark = exports.Row = exports.DataFrame = undefined;

require('babel-polyfill');

var _dataframe = require('./dataframe');

var _dataframe2 = _interopRequireDefault(_dataframe);

var _row = require('./row');

var _row2 = _interopRequireDefault(_row);

var _errors = require('./errors');

var Errors = _interopRequireWildcard(_errors);

var _stat = require('./modules/stat');

var _stat2 = _interopRequireDefault(_stat);

var _matrix = require('./modules/matrix');

var _matrix2 = _interopRequireDefault(_matrix);

var _sql = require('./modules/sql');

var _sql2 = _interopRequireDefault(_sql);

var _benchmark = require('./extras/benchmark');

var _benchmark2 = _interopRequireDefault(_benchmark);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_dataframe2['default'].setDefaultModules(_stat2['default'], _matrix2['default'], _sql2['default']);
_dataframe2['default'].sql = _sql2['default'];

exports.DataFrame = _dataframe2['default'];
exports.Row = _row2['default'];
exports.Benchmark = _benchmark2['default'];
exports.Errors = Errors;
exports['default'] = _dataframe2['default'];