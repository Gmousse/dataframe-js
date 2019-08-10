"use strict";

require("core-js/modules/es.object.get-own-property-descriptor");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DataFrame", {
  enumerable: true,
  get: function get() {
    return _dataframe.default;
  }
});
Object.defineProperty(exports, "Row", {
  enumerable: true,
  get: function get() {
    return _row.default;
  }
});
exports.Errors = exports.default = void 0;

var _dataframe = _interopRequireDefault(require("./dataframe"));

var _row = _interopRequireDefault(require("./row"));

var Errors = _interopRequireWildcard(require("./errors"));

exports.Errors = Errors;

var _stat = _interopRequireDefault(require("./modules/stat"));

var _matrix = _interopRequireDefault(require("./modules/matrix"));

var _index = _interopRequireDefault(require("./modules/sql/index.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dataframe.default.setDefaultModules(_stat.default, _matrix.default, _index.default);

_dataframe.default.sql = _index.default;
var _default = _dataframe.default;
exports.default = _default;