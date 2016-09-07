## Classes

<dl>
<dt><a href="#Matrix">Matrix</a></dt>
<dd><p>Matrix module for DataFrame, providing basic mathematical matrix computations.</p>
</dd>
<dt><a href="#SQL">SQL</a></dt>
<dd><p>SQL module for DataFrame, providing SQL-like syntax for data exploration in DataFrames.</p>
</dd>
<dt><a href="#Stat">Stat</a></dt>
<dd><p>Stat module for DataFrame, providing basic statistical metrics for numeric columns.</p>
</dd>
</dl>

<a name="Matrix"></a>

## Matrix
Matrix module for DataFrame, providing basic mathematical matrix computations.

**Kind**: global class  

* [Matrix](#Matrix)
    * [new Matrix(df)](#new_Matrix_new)
    * [.isCommutative(df, [reverse])](#Matrix+isCommutative) ⇒ <code>Boolean</code>
    * [.add(df)](#Matrix+add) ⇒ <code>DataFrame</code>
    * [.product(number)](#Matrix+product) ⇒ <code>DataFrame</code>
    * [.dot(df)](#Matrix+dot) ⇒ <code>DataFrame</code>

<a name="new_Matrix_new"></a>

### new Matrix(df)
Start the Matrix module.


| Param | Type | Description |
| --- | --- | --- |
| df | <code>DataFrame</code> | An instance of DataFrame. |

<a name="Matrix+isCommutative"></a>

### matrix.isCommutative(df, [reverse]) ⇒ <code>Boolean</code>
Check if two DataFrames are commutative, if both have the same dimensions.

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>Boolean</code> - True if they are commutative, else false.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| df | <code>DataFrame</code> |  | The second DataFrame to check. |
| [reverse] | <code>Boolean</code> | <code>false</code> | Revert the second DataFrame before the comparison. |

**Example**  
```js
df.matrix.isCommutative(df2)
```
<a name="Matrix+add"></a>

### matrix.add(df) ⇒ <code>DataFrame</code>
Provide an elements pairwise addition of two DataFrames having the same dimensions.

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>DataFrame</code> - A new DataFrame resulting to the addition two DataFrames.  

| Param | Type | Description |
| --- | --- | --- |
| df | <code>DataFrame</code> | The second DataFrame to add. |

**Example**  
```js
df.matrix.add(df2)
```
<a name="Matrix+product"></a>

### matrix.product(number) ⇒ <code>DataFrame</code>
Provide a scalar product between a number and a DataFrame.

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>DataFrame</code> - A new DataFrame resulting to the scalar product.  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>Number</code> | The number to multiply. |

**Example**  
```js
df.matrix.product(6)
```
<a name="Matrix+dot"></a>

### matrix.dot(df) ⇒ <code>DataFrame</code>
Multiply one DataFrame n x p and a second p x n.

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>DataFrame</code> - A new n x n DataFrame resulting to the product of two DataFrame.  

| Param | Type | Description |
| --- | --- | --- |
| df | <code>DataFrame</code> | The second DataFrame to multiply. |

**Example**  
```js
df.matrix.dot(df)
```
<a name="SQL"></a>

## SQL
SQL module for DataFrame, providing SQL-like syntax for data exploration in DataFrames.

**Kind**: global class  

* [SQL](#SQL)
    * [new SQL(df)](#new_SQL_new)
    * _instance_
        * [.register(tableName, [overwrite])](#SQL+register)
    * _static_
        * [.request(query)](#SQL.request) ⇒
        * [.dropTables()](#SQL.dropTables)
        * [.dropTable(tableName)](#SQL.dropTable)
        * [.renameTable(tableName, replacement, [overwrite])](#SQL.renameTable)
        * [.listTables()](#SQL.listTables) ⇒ <code>Array</code>
        * [.registerTable(df, tableName, [overwrite])](#SQL.registerTable)

<a name="new_SQL_new"></a>

### new SQL(df)
Start the SQL module.


| Param | Type | Description |
| --- | --- | --- |
| df | <code>DataFrame</code> | An instance of DataFrame. |

<a name="SQL+register"></a>

### sqL.register(tableName, [overwrite])
Register the DataFrame as temporary table.

**Kind**: instance method of <code>[SQL](#SQL)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| tableName | <code>String</code> |  | The name of the table. |
| [overwrite] | <code>Boolean</code> | <code>false</code> | Overwrite if the table already exists. |

**Example**  
```js
df.sql.register('tmp');
```
<a name="SQL.request"></a>

### SQL.request(query) ⇒
Request on a SQL query.

**Kind**: static method of <code>[SQL](#SQL)</code>  
**Returns**: The result of the query.  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>String</code> | A SQL query to request. |

**Example**  
```js
DataFrame.request('SELECT * FROM tmp');
```
<a name="SQL.dropTables"></a>

### SQL.dropTables()
Drop or remove all registered tables.

**Kind**: static method of <code>[SQL](#SQL)</code>  
**Example**  
```js
DataFrame.dropTables();
```
<a name="SQL.dropTable"></a>

### SQL.dropTable(tableName)
Drop or remove a registered table.

**Kind**: static method of <code>[SQL](#SQL)</code>  

| Param | Type | Description |
| --- | --- | --- |
| tableName | <code>String</code> | The registered table to drop. |

**Example**  
```js
DataFrame.dropTable('tmp1');
```
<a name="SQL.renameTable"></a>

### SQL.renameTable(tableName, replacement, [overwrite])
Rename a registered table.

**Kind**: static method of <code>[SQL](#SQL)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| tableName | <code>String</code> |  | The registered table to rename. |
| replacement | <code>String</code> |  | The new table name. |
| [overwrite] | <code>Boolean</code> | <code>false</code> | Overwrite if the table already exists. |

**Example**  
```js
DataFrame.renameTable('tmp1', 'notTmp1');
```
<a name="SQL.listTables"></a>

### SQL.listTables() ⇒ <code>Array</code>
List all registered tables.

**Kind**: static method of <code>[SQL](#SQL)</code>  
**Returns**: <code>Array</code> - A list of the registered tables.  
**Example**  
```js
DataFrame.listTables();
```
<a name="SQL.registerTable"></a>

### SQL.registerTable(df, tableName, [overwrite])
Register a DataFrame as a temporary table.

**Kind**: static method of <code>[SQL](#SQL)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| df | <code>DataFrame</code> |  | The DataFrame to register. |
| tableName | <code>String</code> |  | The temporary table name. |
| [overwrite] | <code>Boolean</code> | <code>false</code> | Overwrite if the table already exists. |

**Example**  
```js
DataFrame.registerTable('tmp', df);
```
<a name="Stat"></a>

## Stat
Stat module for DataFrame, providing basic statistical metrics for numeric columns.

**Kind**: global class  

* [Stat](#Stat)
    * [new Stat(df)](#new_Stat_new)
    * [.sum(columnName)](#Stat+sum) ⇒ <code>Number</code>
    * [.max(columnName)](#Stat+max) ⇒ <code>Number</code>
    * [.min(columnName)](#Stat+min) ⇒ <code>Number</code>
    * [.mean(columnName)](#Stat+mean) ⇒ <code>Number</code>
    * [.average(columnName)](#Stat+average) ⇒ <code>Number</code>
    * [.var(columnName, [population])](#Stat+var) ⇒ <code>Number</code>
    * [.sd(columnName, [population])](#Stat+sd) ⇒ <code>Number</code>
    * [.stats(columnName)](#Stat+stats) ⇒ <code>Object</code>

<a name="new_Stat_new"></a>

### new Stat(df)
Start the Stat module.


| Param | Type | Description |
| --- | --- | --- |
| df | <code>DataFrame</code> | An instance of DataFrame. |

<a name="Stat+sum"></a>

### stat.sum(columnName) ⇒ <code>Number</code>
Compute the sum of a numeric column.

**Kind**: instance method of <code>[Stat](#Stat)</code>  
**Returns**: <code>Number</code> - The sum of the column.  

| Param | Type | Description |
| --- | --- | --- |
| columnName | <code>String</code> | The column to evaluate, containing Numbers. |

**Example**  
```js
df.stat.sum('column1')
```
<a name="Stat+max"></a>

### stat.max(columnName) ⇒ <code>Number</code>
Compute the maximal value into a numeric column.

**Kind**: instance method of <code>[Stat](#Stat)</code>  
**Returns**: <code>Number</code> - The maximal value into the column.  

| Param | Type | Description |
| --- | --- | --- |
| columnName | <code>String</code> | The column to evaluate, containing Numbers. |

**Example**  
```js
df.stat.max('column1')
```
<a name="Stat+min"></a>

### stat.min(columnName) ⇒ <code>Number</code>
Compute the minimal value into a numeric column.

**Kind**: instance method of <code>[Stat](#Stat)</code>  
**Returns**: <code>Number</code> - The minimal value into the column.  

| Param | Type | Description |
| --- | --- | --- |
| columnName | <code>String</code> | The column to evaluate, containing Numbers. |

**Example**  
```js
df.stat.min('column1')
```
<a name="Stat+mean"></a>

### stat.mean(columnName) ⇒ <code>Number</code>
Compute the mean value into a numeric column.

**Kind**: instance method of <code>[Stat](#Stat)</code>  
**Returns**: <code>Number</code> - The mean value into the column.  

| Param | Type | Description |
| --- | --- | --- |
| columnName | <code>String</code> | The column to evaluate, containing Numbers. |

**Example**  
```js
df.stat.mean('column1')
```
<a name="Stat+average"></a>

### stat.average(columnName) ⇒ <code>Number</code>
Compute the mean value into a numeric column.
Alias from mean.

**Kind**: instance method of <code>[Stat](#Stat)</code>  
**Returns**: <code>Number</code> - The mean value into the column.  

| Param | Type | Description |
| --- | --- | --- |
| columnName | <code>String</code> | The column to evaluate, containing Numbers. |

**Example**  
```js
df.stat.min('column1')
```
<a name="Stat+var"></a>

### stat.var(columnName, [population]) ⇒ <code>Number</code>
Compute the variance into a numeric column.

**Kind**: instance method of <code>[Stat](#Stat)</code>  
**Returns**: <code>Number</code> - The variance into the column.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| columnName | <code>String</code> |  | The column to evaluate, containing Numbers. |
| [population] | <code>Boolean</code> | <code>false</code> | Population mode. If true, provide the population variance, not the sample one. |

**Example**  
```js
df.stat.var('column1')
```
<a name="Stat+sd"></a>

### stat.sd(columnName, [population]) ⇒ <code>Number</code>
Compute the standard deviation into a numeric column.

**Kind**: instance method of <code>[Stat](#Stat)</code>  
**Returns**: <code>Number</code> - The standard deviation into the column.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| columnName | <code>String</code> |  | The column to evaluate, containing Numbers. |
| [population] | <code>Boolean</code> | <code>false</code> | Population mode. If true, provide the population standard deviation, not the sample one. |

**Example**  
```js
df.stat.sd('column1')
```
<a name="Stat+stats"></a>

### stat.stats(columnName) ⇒ <code>Object</code>
Compute all the stats available with the Stat module on a numeric column.

**Kind**: instance method of <code>[Stat](#Stat)</code>  
**Returns**: <code>Object</code> - An dictionnary containing all statistical metrics available.  

| Param | Type | Description |
| --- | --- | --- |
| columnName | <code>String</code> | The column to evaluate, containing Numbers. |

**Example**  
```js
df.stat.stats('column1')
```
