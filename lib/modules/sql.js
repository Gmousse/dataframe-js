'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _dec, _dec2, _desc, _value, _class;

var _es7ChecktypesDecorator = require('es7-checktypes-decorator');

var _sqlEngine = require('../sqlEngine.js');

var _sqlEngine2 = _interopRequireDefault(_sqlEngine);

var _errors = require('../errors.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

/**
* SQL module for DataFrame, providing SQL-like syntax for data exploration in DataFrames.
 */
var SQL = (_dec = (0, _es7ChecktypesDecorator.checktypes)('String'), _dec2 = (0, _es7ChecktypesDecorator.checktypes)('DataFrame', 'String'), (_class = function () {
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
            var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            SQL.registerTable(SQL.tables[tableName], replacement, overwrite);
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
    }, {
        key: 'registerTable',

        /**
         * Register a DataFrame as a temporary table.
         * @param {DataFrame} df The DataFrame to register.
         * @param {String} tableName The temporary table name.
         * @param {Boolean} [overwrite=false] Overwrite if the table already exists.
         * @example
         * DataFrame.registerTable('tmp', df);
         */
        value: function registerTable(df, tableName) {
            var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

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
     * @param {Boolean} [overwrite=false] Overwrite if the table already exists.
     * @example
     * df.sql.register('tmp');
     */


    (0, _createClass3.default)(SQL, [{
        key: 'register',
        value: function register(tableName) {
            var overwrite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            SQL.registerTable(this.df, tableName, overwrite);
            return this.df;
        }
    }]);
    return SQL;
}(), (_applyDecoratedDescriptor(_class, 'request', [_dec], (0, _getOwnPropertyDescriptor2.default)(_class, 'request'), _class), _applyDecoratedDescriptor(_class, 'registerTable', [_dec2], (0, _getOwnPropertyDescriptor2.default)(_class, 'registerTable'), _class)), _class));


SQL.tables = {};

exports.default = SQL;