import sqlParser from '../sqlEngine.js';
import DataFrame from '../dataframe.js';

/**
* SQL module for DataFrame, providing SQL-like syntax for data exploration in DataFrames.
 */
class SQL {

    static tables = {};

    /**
     * Request on a SQL query.
     * @param {String} query A SQL query to request.
     * @returns The result of the query.
     * @example DataFrame.request('SELECT * FROM tmp');
     */
    static request(query) {
        return sqlParser(query, SQL.tables);
    }

    /**
     * Drop or remove all registered tables.
     * @example DataFrame.dropTables();
     */
    static dropTables() {
        SQL.tables = {};
    }

    /**
     * Drop or remove a registered table.
     * @param {String} tableName The registered table to drop.
     * @example DataFrame.dropTables();
     */
    static dropTable(tableName) {
        delete SQL.tables[tableName];
    }

    /**
     * List all registered tables.
     * @returns {Array} A list of the registered tables.
     * @example DataFrame.listTables();
     */
    static listTables() {
        return Object.keys(SQL.tables);
    }

    /**
     * Register a DataFrame as temporary table.
     * @param {String} tableName The temporary table name.
     * @param {DataFrame} df The DataFrame to register.
     * @example DataFrame.addTable('tmp', df);
     */
    static addTable(df, tableName) {
        if (!DataFrame.isDataFrame(df) || !(typeof tableName === 'string')) {
            throw new TypeError(
                'df must be a DataFrame and tableName a string'
            );
        }
        SQL.tables[tableName] = df;
    }

    /**
     * Start the SQL module.
     * @param {DataFrame} df An instance of DataFrame.
     */
    constructor(df) {
        this.df = df;
        this.name = 'sql';
    }

    /**
     * Register the DataFrame as temporary table.
     * @param {String} tableName The name of the table.
     * @example df.sql.register('tmp');
     */
    register(tableName) {
        SQL.addTable(this.df, tableName);
        return this.df;
    }

}

export default SQL;
