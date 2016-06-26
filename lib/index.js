'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Row = exports.DataFrame = undefined;

var _dataframe = require('./dataframe.js');

var _dataframe2 = _interopRequireDefault(_dataframe);

var _row = require('./row.js');

var _row2 = _interopRequireDefault(_row);

var _math = require('./math.js');

var _math2 = _interopRequireDefault(_math);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataFrameWithBasicModules = function DataFrameWithBasicModules(data, columns) {
  for (var _len = arguments.length, plugins = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    plugins[_key - 2] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(_dataframe2.default, [null].concat([data, columns, _math2.default], plugins)))();
};

exports.DataFrame = DataFrameWithBasicModules;
exports.Row = _row2.default;