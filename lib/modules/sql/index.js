'use strict';

exports.__esModule = true;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _sqlEngine = require('./sqlEngine');

var _sqlEngine2 = _interopRequireDefault(_sqlEngine);

var _dataframe = require('../../dataframe');

var _dataframe2 = _interopRequireDefault(_dataframe);

var _errors = require('../../errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var SQL = function () {
    (0, _createClass3['default'])(SQL, null, [{
        key: 'request',
        value: function request(query) {
            if (!(typeof query === 'string')) throw new _errors.ArgumentTypeError(query, 'Stri g');
            return (0, _sqlEngine2['default'])(query, SQL.tables);
        }
    }, {
        key: 'dropTables',
        value: function dropTables() {
            SQL.tables = {};
        }
    }, {
        key: 'dropTable',
        value: function dropTable(tableName) {
            delete SQL.tables[tableName];
        }
    }, {
        key: 'renameTable',
        value: function renameTable(tableName, replacement) {
            var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            SQL.registerTable(SQL.tables[tableName], replacement, overwrite);
            SQL.dropTable(tableName);
        }
    }, {
        key: 'listTables',
        value: function listTables() {
            return (0, _keys2['default'])(SQL.tables);
        }
    }, {
        key: 'registerTable',
        value: function registerTable(df, tableName) {
            var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            if (!(df instanceof _dataframe2['default'])) throw new _errors.ArgumentTypeError(df, 'DataFrame');
            var validation = new RegExp('^[a-zA-Z_][a-zA-Z0-9_]*$');
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
        (0, _classCallCheck3['default'])(this, SQL);

        this.df = df;
        this.name = 'sql';
    }

    (0, _createClass3['default'])(SQL, [{
        key: 'register',
        value: function register(tableName) {
            var overwrite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            SQL.registerTable(this.df, tableName, overwrite);
            return this.df;
        }
    }]);
    return SQL;
}();

SQL.tables = {};

exports['default'] = SQL;