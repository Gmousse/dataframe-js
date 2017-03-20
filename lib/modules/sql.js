'use strict';

exports.__esModule = true;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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

var SQL = (_dec = (0, _es7ChecktypesDecorator.checktypes)('String'), _dec2 = (0, _es7ChecktypesDecorator.checktypes)('DataFrame', 'String'), (_class = function () {
    (0, _createClass3['default'])(SQL, null, [{
        key: 'request',
        value: function request(query) {
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
}(), (_applyDecoratedDescriptor(_class, 'request', [_dec], (0, _getOwnPropertyDescriptor2['default'])(_class, 'request'), _class), _applyDecoratedDescriptor(_class, 'registerTable', [_dec2], (0, _getOwnPropertyDescriptor2['default'])(_class, 'registerTable'), _class)), _class));


SQL.tables = {};

exports['default'] = SQL;