import sqlParser from "./sqlEngine";
import DataFrame from "../../dataframe";
import {
    ArgumentTypeError,
    TableAlreadyExistsError,
    WrongTableNameError
} from "../../errors";

/**
 * SQL module for DataFrame, providing SQL-like syntax for data exploration in DataFrames.
 */
class SQL {
    /**
     * Request on a SQL query.
     * @param {String} query A SQL query to request.
     * @returns The result of the query.
     * @example
     * DataFrame.request('SELECT * FROM tmp');
     */
    static request(query) {
        if (!(typeof query === "string"))
            throw new ArgumentTypeError(query, "Stri g");
        return sqlParser(query, SQL.tables);
    }

    /**
     * Drop or remove all registered tables.
     * @example
     * DataFrame.dropTables();
     */
    static dropTables() {
        SQL.tables = {};
    }

    /**
     * Drop or remove a registered table.
     * @param {String} tableName The registered table to drop.
     * @example
     * DataFrame.dropTable('tmp1');
     */
    static dropTable(tableName) {
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
    static renameTable(tableName, replacement, overwrite = false) {
        SQL.registerTable(SQL.tables[tableName], replacement, overwrite);
        SQL.dropTable(tableName);
    }

    /**
     * List all registered tables.
     * @returns {Array} A list of the registered tables.
     * @example
     * DataFrame.listTables();
     */
    static listTables() {
        return Object.keys(SQL.tables);
    }

    /**
     * Register a DataFrame as a temporary table.
     * @param {DataFrame} df The DataFrame to register.
     * @param {String} tableName The temporary table name.
     * @param {Boolean} [overwrite=false] Overwrite if the table already exists.
     * @example
     * DataFrame.registerTable('tmp', df);
     */
    static registerTable(df, tableName, overwrite = false) {
        if (!(df instanceof DataFrame))
            throw new ArgumentTypeError(df, "DataFrame");
        const validation = new RegExp("^[a-zA-Z_][a-zA-Z0-9_]*$");
        if (!validation.test(tableName)) {
            throw new WrongTableNameError(tableName);
        }
        if (SQL.listTables().includes(tableName) && !overwrite) {
            throw new TableAlreadyExistsError(tableName);
        }
        SQL.tables[tableName] = df;
    }

    /**
     * Start the SQL module.
     * @param {DataFrame} df An instance of DataFrame.
     */
    constructor(df) {
        this.df = df;
        this.name = "sql";
    }

    /**
     * Register the DataFrame as temporary table.
     * @param {String} tableName The name of the table.
     * @param {Boolean} [overwrite=false] Overwrite if the table already exists.
     * @example
     * df.sql.register('tmp');
     */
    register(tableName, overwrite = false) {
        SQL.registerTable(this.df, tableName, overwrite);
        return this.df;
    }
}

SQL.tables = {};

export default SQL;
