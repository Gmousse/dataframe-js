# SQL

[src/modules/sql.js:9-102](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/modules/sql.js#L9-L102 "Source code on GitHub")

SQL module for DataFrame, providing SQL-like syntax for data exploration in DataFrames.

## constructor

[src/modules/sql.js:85-88](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/modules/sql.js#L85-L88 "Source code on GitHub")

Start the SQL module.

**Parameters**

-   `df` **DataFrame** An instance of DataFrame.

## register

[src/modules/sql.js:97-100](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/modules/sql.js#L97-L100 "Source code on GitHub")

Register the DataFrame as temporary table.

**Parameters**

-   `tableName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The name of the table.
-   `overwrite` **\[[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** Overwrite if the table already exists. (optional, default `false`)

**Examples**

```javascript
df.sql.register('tmp');
```

## request

[src/modules/sql.js:19-21](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/modules/sql.js#L19-L21 "Source code on GitHub")

Request on a SQL query.

**Parameters**

-   `query` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** A SQL query to request.

**Examples**

```javascript
DataFrame.request('SELECT * FROM tmp');
```

Returns **Any** The result of the query.

## dropTables

[src/modules/sql.js:28-30](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/modules/sql.js#L28-L30 "Source code on GitHub")

Drop or remove all registered tables.

**Examples**

```javascript
DataFrame.dropTables();
```

## dropTable

[src/modules/sql.js:38-40](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/modules/sql.js#L38-L40 "Source code on GitHub")

Drop or remove a registered table.

**Parameters**

-   `tableName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The registered table to drop.

**Examples**

```javascript
DataFrame.dropTable('tmp1');
```

## renameTable

[src/modules/sql.js:50-53](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/modules/sql.js#L50-L53 "Source code on GitHub")

Rename a registered table.

**Parameters**

-   `tableName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The registered table to rename.
-   `replacement` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The new table name.
-   `overwrite` **\[[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** Overwrite if the table already exists. (optional, default `false`)

**Examples**

```javascript
DataFrame.renameTable('tmp1', 'notTmp1');
```

## listTables

[src/modules/sql.js:61-63](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/modules/sql.js#L61-L63 "Source code on GitHub")

List all registered tables.

**Examples**

```javascript
DataFrame.listTables();
```

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** A list of the registered tables.

## registerTable

[src/modules/sql.js:74-79](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/modules/sql.js#L74-L79 "Source code on GitHub")

Register a DataFrame as a temporary table.

**Parameters**

-   `df` **DataFrame** The DataFrame to register.
-   `tableName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The temporary table name.
-   `overwrite` **\[[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** Overwrite if the table already exists. (optional, default `false`)

**Examples**

```javascript
DataFrame.registerTable('tmp', df);
```
