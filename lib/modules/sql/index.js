"use strict";

require("core-js/modules/es.array.includes");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.regexp.constructor");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sqlEngine = _interopRequireDefault(require("./sqlEngine"));

var _dataframe = _interopRequireDefault(require("../../dataframe"));

var _errors = require("../../errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SQL = function () {
  _createClass(SQL, null, [{
    key: "request",
    value: function request(query) {
      if (!(typeof query === "string")) throw new _errors.ArgumentTypeError(query, "Stri g");
      return (0, _sqlEngine.default)(query, SQL.tables);
    }
  }, {
    key: "dropTables",
    value: function dropTables() {
      SQL.tables = {};
    }
  }, {
    key: "dropTable",
    value: function dropTable(tableName) {
      delete SQL.tables[tableName];
    }
  }, {
    key: "renameTable",
    value: function renameTable(tableName, replacement) {
      var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      SQL.registerTable(SQL.tables[tableName], replacement, overwrite);
      SQL.dropTable(tableName);
    }
  }, {
    key: "listTables",
    value: function listTables() {
      return Object.keys(SQL.tables);
    }
  }, {
    key: "registerTable",
    value: function registerTable(df, tableName) {
      var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (!(df instanceof _dataframe.default)) throw new _errors.ArgumentTypeError(df, "DataFrame");
      var validation = new RegExp("^[a-zA-Z_][a-zA-Z0-9_]*$");

      if (!validation.test(tableName)) {
        throw new _errors.WrongTableNameError(tableName);
      }

      if (SQL.listTables().includes(tableName) && !overwrite) {
        throw new _errors.TableAlreadyExistsError(tableName);
      }

      SQL.tables[tableName] = df;
    }
  }]);

  function SQL(df) {
    _classCallCheck(this, SQL);

    this.df = df;
    this.name = "sql";
  }

  _createClass(SQL, [{
    key: "register",
    value: function register(tableName) {
      var overwrite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      SQL.registerTable(this.df, tableName, overwrite);
      return this.df;
    }
  }]);

  return SQL;
}();

SQL.tables = {};
var _default = SQL;
exports.default = _default;