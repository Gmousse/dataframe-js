'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _sqlEngine = require('../sqlEngine.js');

var _sqlEngine2 = _interopRequireDefault(_sqlEngine);

var _errors = require('../errors.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* SQL module for DataFrame, providing SQL-like syntax for data exploration in DataFrames.
 */
var SQL = function () {
    (0, _createClass3.default)(SQL, null, [{
        key: 'request',


        /**
         * Request on a SQL query.
         * @param {String} query A SQL query to request.
         * @returns The result of the query.
         * @example
         * DataFrame.request('SELECT * FROM tmp');
         */
        value: function request(query) {
            if (!(typeof query === 'string')) {
                throw new _errors.InputTypeError('query', ['String'], typeof query === 'undefined' ? 'undefined' : (0, _typeof3.default)(query));
            }
            return (0, _sqlEngine2.default)(query, SQL.tables);
        }

        /**
         * Drop or remove all registered tables.
         * @example
         * DataFrame.dropTables();
         */

    }, {
        key: 'dropTables',
        value: function dropTables() {
            SQL.tables = {};
        }

        /**
         * Drop or remove a registered table.
         * @param {String} tableName The registered table to drop.
         * @example
         * DataFrame.dropTable('tmp1');
         */

    }, {
        key: 'dropTable',
        value: function dropTable(tableName) {
            delete SQL.tables[tableName];
        }

        /**
         * Rename a registered table.
         * @param {String} tableName The registered table to rename.
         * @param {String} replacement The new table name.
         * @param {Boolean} [overwrite=false] Overwrite if the table already exists.
         * @example
         * DataFrame.renameTable('tmp1', 'notTmp1');
         */

    }, {
        key: 'renameTable',
        value: function renameTable(tableName, replacement) {
            var overwrite = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

            if (SQL.listTables().includes(replacement) && !overwrite) {
                throw new _errors.TableAlreadyExistsError(replacement);
            }
            SQL.addTable(SQL.tables[tableName], replacement);
            SQL.dropTable(tableName);
        }

        /**
         * List all registered tables.
         * @returns {Array} A list of the registered tables.
         * @example
         * DataFrame.listTables();
         */

    }, {
        key: 'listTables',
        value: function listTables() {
            return (0, _keys2.default)(SQL.tables);
        }

        /**
         * Register a DataFrame as a temporary table.
         * @param {DataFrame} df The DataFrame to register.
         * @param {String} tableName The temporary table name.
         * @param {Boolean} [overwrite=false] Overwrite if the table already exists.
         * @example
         * DataFrame.registerTable('tmp', df);
         */

    }, {
        key: 'registerTable',
        value: function registerTable(df, tableName) {
            var overwrite = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

            if (!(df.constructor.name === 'DataFrame')) {
                throw new _errors.InputTypeError('df', ['DataFrame'], df.constructor.name);
            }
            if (SQL.listTables().includes(tableName) && !overwrite) {
                throw new _errors.TableAlreadyExistsError(tableName);
            }
            SQL.tables[tableName] = df;
        }

        /**
         * Start the SQL module.
         * @param {DataFrame} df An instance of DataFrame.
         */

    }]);

    function SQL(df) {
        (0, _classCallCheck3.default)(this, SQL);

        this.df = df;
        this.name = 'sql';
    }

    /**
     * Register the DataFrame as temporary table.
     * @param {String} tableName The name of the table.
     * @example
     * df.sql.register('tmp');
     */


    (0, _createClass3.default)(SQL, [{
        key: 'register',
        value: function register(tableName) {
            SQL.registerTable(this.df, tableName);
            return this.df;
        }
    }]);
    return SQL;
}();

SQL.tables = {};

exports.default = SQL;