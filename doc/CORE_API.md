## Classes

<dl>
<dt><a href="#DataFrame">DataFrame</a></dt>
<dd><p>DataFrame data structure providing an immutable, flexible and powerfull way to manipulate data with columns and rows.</p>
</dd>
<dt><a href="#Row">Row</a></dt>
<dd><p>Row data structure used into the dataframe-js.</p>
</dd>
</dl>

<a name="DataFrame"></a>

## DataFrame
DataFrame data structure providing an immutable, flexible and powerfull way to manipulate data with columns and rows.

**Kind**: global class  

* [DataFrame](#DataFrame)
    * [new DataFrame(data, columns, [...modules])](#new_DataFrame_new)
    * [.toDict()](#DataFrame+toDict) ⇒ <code>Object</code>
    * [.toArray()](#DataFrame+toArray) ⇒ <code>Array</code>
    * [.toText([sep], [header], [path])](#DataFrame+toText) ⇒ <code>String</code>
    * [.toCSV([header], [path])](#DataFrame+toCSV) ⇒ <code>String</code>
    * [.toJSON([path])](#DataFrame+toJSON) ⇒ <code>String</code>
    * [.show([rows], [quiet])](#DataFrame+show) ⇒ <code>String</code>
    * [.dim()](#DataFrame+dim) ⇒ <code>Array</code>
    * [.transpose()](#DataFrame+transpose) ⇒ <code>ÐataFrame</code>
    * [.count()](#DataFrame+count) ⇒ <code>Int</code>
    * [.countValue(valueToCount, [columnName])](#DataFrame+countValue) ⇒ <code>Int</code>
    * [.push(...rows)](#DataFrame+push) ⇒ <code>[DataFrame](#DataFrame)</code>
    * [.replace(value, replacment, [...columnNames])](#DataFrame+replace) ⇒ <code>[DataFrame](#DataFrame)</code>
    * [.distinct(columnName)](#DataFrame+distinct) ⇒ <code>Array</code>
    * [.unique(columnName)](#DataFrame+unique) ⇒ <code>Array</code>
    * [.listColumns()](#DataFrame+listColumns) ⇒ <code>Array</code>
    * [.select(...columnNames)](#DataFrame+select) ⇒ <code>[DataFrame](#DataFrame)</code>
    * [.withColumn(columnName, [func])](#DataFrame+withColumn) ⇒ <code>[DataFrame](#DataFrame)</code>
    * [.restructure(newColumnNames)](#DataFrame+restructure) ⇒ <code>[DataFrame](#DataFrame)</code>
    * [.rename(newColumnNames)](#DataFrame+rename) ⇒ <code>[DataFrame](#DataFrame)</code>
    * [.drop(columnName)](#DataFrame+drop) ⇒ <code>[DataFrame](#DataFrame)</code>
    * [.chain(...funcs)](#DataFrame+chain) ⇒ <code>[DataFrame](#DataFrame)</code>
    * [.filter(condition)](#DataFrame+filter) ⇒ <code>[DataFrame](#DataFrame)</code>
    * [.find(condition)](#DataFrame+find) ⇒ <code>[Row](#Row)</code>
    * [.where(condition)](#DataFrame+where) ⇒ <code>[DataFrame](#DataFrame)</code>
    * [.map(func)](#DataFrame+map) ⇒ <code>[DataFrame](#DataFrame)</code>
    * [.reduce(func, [init])](#DataFrame+reduce) ⇒
    * [.reduceRight(func, [init])](#DataFrame+reduceRight) ⇒
    * [.shuffle()](#DataFrame+shuffle) ⇒ <code>[DataFrame](#DataFrame)</code>
    * [.sample(percentage)](#DataFrame+sample) ⇒ <code>[DataFrame](#DataFrame)</code>
    * [.randomSplit(percentage)](#DataFrame+randomSplit) ⇒ <code>Array</code>
    * [.groupBy(columnName)](#DataFrame+groupBy) ⇒ <code>Array</code>
    * [.sortBy(columnName, [reverse])](#DataFrame+sortBy) ⇒ <code>[DataFrame](#DataFrame)</code>
    * [.union(dfToUnion)](#DataFrame+union) ⇒ <code>[DataFrame](#DataFrame)</code>
    * [.join(dfToJoin, on, [how])](#DataFrame+join) ⇒ <code>[DataFrame](#DataFrame)</code>
    * [.innerJoin(dfToJoin, on)](#DataFrame+innerJoin) ⇒ <code>[DataFrame](#DataFrame)</code>
    * [.fullJoin(dfToJoin, on)](#DataFrame+fullJoin) ⇒ <code>[DataFrame](#DataFrame)</code>
    * [.outerJoin(dfToJoin, on)](#DataFrame+outerJoin) ⇒ <code>[DataFrame](#DataFrame)</code>
    * [.leftJoin(dfToJoin, on)](#DataFrame+leftJoin) ⇒ <code>[DataFrame](#DataFrame)</code>
    * [.rightJoin(dfToJoin, on)](#DataFrame+rightJoin) ⇒ <code>[DataFrame](#DataFrame)</code>

<a name="new_DataFrame_new"></a>

### new DataFrame(data, columns, [...modules])
Create a new DataFrame.


| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array</code> &#124; <code>Object</code> &#124; <code>[DataFrame](#DataFrame)</code> | The data of the DataFrame. |
| columns | <code>Array</code> | The DataFrame column names. |
| [...modules] | <code>Object</code> | Additional modules. |

**Example**  
```js
// From Object
const dfFromObjectOfArrays = new DataFrame({
     'column1': [3, 6, 8],  // Column Data
     'column2': [3, 4, 5, 6], // Column Data
}, ['column1', 'column2']); // Columns

// From Array of Arrays
const dfFromArrayOfArrays = new DataFrame([
     [1, 6, 9, 10, 12],  // Row Data
     [1, 2],             // Row Data
     [6, 6, 9, 8, 9, 12], // Row Data
], ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']); // Columns

// From Array of Objects -- THE BETTER WAY --
const dfFromArrayOfObjects = new DataFrame([
     {c1: 1, c2: 6, c3: 9, c4: 10, c5: 12},  // Row Data
     {c4: 1, c3: 2},                         // Row Data
     {c1: 6, c5: 6, c2: 9, c4: 8, c3: 9, c6: 12}, // Row Data
], ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']); // Columns

// From DataFrame
const dfFromDF = new DataFrame(dfFromArrayOfArrays);
```
<a name="DataFrame+toDict"></a>

### dataFrame.toDict() ⇒ <code>Object</code>
Convert DataFrame into dict / hash / object.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>Object</code> - The DataFrame converted into dict.  
**Example**  
```js
df.toDict()

{ c1: [ 1, undefined, 6 ], // one array by column
  c2: [ 6, undefined, 9 ],
  c3: [ 9, 2, 9 ],
  c4: [ 10, 1, 8 ],
  c5: [ 12, undefined, 6 ],
  c6: [ undefined, undefined, 12 ] }
```
<a name="DataFrame+toArray"></a>

### dataFrame.toArray() ⇒ <code>Array</code>
Convert DataFrame into Array.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>Array</code> - The DataFrame converted into dict.  
**Example**  
```js
df.toArray()

[ [ 1, 6, 9, 10, 12, undefined ], // one array by row
  [ undefined, undefined, 2, 1, undefined, undefined ],
  [ 6, 9, 9, 8, 6, 12 ] ]
```
<a name="DataFrame+toText"></a>

### dataFrame.toText([sep], [header], [path]) ⇒ <code>String</code>
Convert the DataFrame into a text string. You can also save the file if you are using nodejs.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>String</code> - The text file in raw string.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [sep] | <code>String</code> | <code>&#x27; &#x27;</code> | Column separator. |
| [header] | <code>Boolean</code> | <code>true</code> | Writing the header in the first line. If false, there will be no header. |
| [path] | <code>String</code> |  | The path to save the file. /!\ Works only on node.js, not into the browser. |

<a name="DataFrame+toCSV"></a>

### dataFrame.toCSV([header], [path]) ⇒ <code>String</code>
Convert the DataFrame into a csv string. You can also save the file if you are using nodejs.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>String</code> - The csv file in raw string.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [header] | <code>Boolean</code> | <code>true</code> | Writing the header in the first line. If false, there will be no header. |
| [path] | <code>String</code> |  | The path to save the file. /!\ Works only on node.js, not into the browser. |

<a name="DataFrame+toJSON"></a>

### dataFrame.toJSON([path]) ⇒ <code>String</code>
Convert the DataFrame into a json string. You can also save the file if you are using nodejs.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>String</code> - The json file in raw string.  

| Param | Type | Description |
| --- | --- | --- |
| [path] | <code>String</code> | The path to save the file. /!\ Works only on node.js, not into the browser. |

<a name="DataFrame+show"></a>

### dataFrame.show([rows], [quiet]) ⇒ <code>String</code>
Display the DataFrame as String Table. Can only return a sring instead of displaying the DataFrame.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>String</code> - The DataFrame as String Table.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [rows] | <code>Number</code> | <code>10</code> | The number of lines to display. |
| [quiet] | <code>Boolean</code> | <code>false</code> | Quiet mode. If true, only returns a string instead of console.log(). |

**Example**  
```js
df.show() // console.log the DataFrame with the first 10nth rows

| column1   | column2   | column3   |
------------------------------------
| 3         | 3         | undefined |
| 6         | 4         | undefined |
| 8         | 5         | undefined |
| undefined | 6         | undefined |
```
<a name="DataFrame+dim"></a>

### dataFrame.dim() ⇒ <code>Array</code>
Get the DataFrame dimensions.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>Array</code> - The DataFrame dimensions. [height, weight]  
**Example**  
```js
df.dim()
[4, 3] // [height, weight]
```
<a name="DataFrame+transpose"></a>

### dataFrame.transpose() ⇒ <code>ÐataFrame</code>
Transpose a DataFrame. Rows become columns and conversely. n x p => p x n.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>ÐataFrame</code> - A new transpoded DataFrame.  
<a name="DataFrame+count"></a>

### dataFrame.count() ⇒ <code>Int</code>
Get the rows number.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>Int</code> - The number of DataFrame rows.  
**Example**  
```js
// Counting rows
df.count()

4
```
<a name="DataFrame+countValue"></a>

### dataFrame.countValue(valueToCount, [columnName]) ⇒ <code>Int</code>
Get the count of a value into a column.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>Int</code> - The number of times the selected value appears.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| valueToCount |  |  | The value to count into the selected column. |
| [columnName] | <code>String</code> | <code>this[__columns__][0]</code> | The column where found the value. |

**Example**  
```js
// Counting specific value in a column
df.countValue(5, 'column2')

1

// Counting specific value in a selected column
df.select('column1').countValue(5)

0
```
<a name="DataFrame+push"></a>

### dataFrame.push(...rows) ⇒ <code>[DataFrame](#DataFrame)</code>
Push new rows into the DataFrame.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>[DataFrame](#DataFrame)</code> - A new DataFrame with the new rows.  

| Param | Type | Description |
| --- | --- | --- |
| ...rows | <code>Array</code> &#124; <code>[Row](#Row)</code> | The rows to add. |

**Example**  
```js
df.push([1,2,3], [1,4,9])
```
<a name="DataFrame+replace"></a>

### dataFrame.replace(value, replacment, [...columnNames]) ⇒ <code>[DataFrame](#DataFrame)</code>
Replace a value by another in the DataFrame or in a column.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>[DataFrame](#DataFrame)</code> - A new DataFrame with replaced values.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value |  |  | The value to replace. |
| replacment |  |  | The new value. |
| [...columnNames] | <code>String</code> | <code>this[__columns__]</code> | The columns to apply the replacment. |

<a name="DataFrame+distinct"></a>

### dataFrame.distinct(columnName) ⇒ <code>Array</code>
Compute unique values into a column.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>Array</code> - An Array containing distinct values of the column.  

| Param | Type | Description |
| --- | --- | --- |
| columnName | <code>String</code> | The column to distinct. |

**Example**  
```js
df.distinct('d2')

[3, 4, 15, 6]
```
<a name="DataFrame+unique"></a>

### dataFrame.unique(columnName) ⇒ <code>Array</code>
Compute unique values into a column.
Alias from .distinct()

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>Array</code> - An Array containing distinct values of the column.  

| Param | Type | Description |
| --- | --- | --- |
| columnName | <code>String</code> | The column to distinct. |

**Example**  
```js
df.unique('d2')

[3, 4, 15, 6]
```
<a name="DataFrame+listColumns"></a>

### dataFrame.listColumns() ⇒ <code>Array</code>
List DataFrame columns.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>Array</code> - An Array containing DataFrame column Names.  
**Example**  
```js
df.listColumns()

['c1', 'c2', 'c3', 'c4']
```
<a name="DataFrame+select"></a>

### dataFrame.select(...columnNames) ⇒ <code>[DataFrame](#DataFrame)</code>
Select columns in the DataFrame.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>[DataFrame](#DataFrame)</code> - A new DataFrame containing selected columns.  

| Param | Type | Description |
| --- | --- | --- |
| ...columnNames | <code>String</code> | The columns to select. |

**Example**  
```js
df.select('column1', 'column3').show()

| column1   | column3   |
------------------------
| 3         | undefined |
| 6         | undefined |
| 8         | undefined |
| undefined | undefined |
```
<a name="DataFrame+withColumn"></a>

### dataFrame.withColumn(columnName, [func]) ⇒ <code>[DataFrame](#DataFrame)</code>
Add a new column or set an existing one.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>[DataFrame](#DataFrame)</code> - A new DataFrame containing the new or modified column.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| columnName | <code>String</code> |  | The column to modify or to create. |
| [func] | <code>function</code> | <code>(row, index) =&gt; undefined</code> | The function to create the column. |

**Example**  
```js
// Add a new column
df.withColumn('column4', () => 2).show()

| column1   | column2   | column3   | column4   |
------------------------------------------------
| 3         | 3         | undefined | 2         |
| 6         | 4         | undefined | 2         |
| 8         | 5         | undefined | 2         |
| undefined | 6         | undefined | 2         |

// Modify a column
df.withColumn('column2', (row) => row.get('column2') * 2).show()

| column1   | column2   | column3   |
------------------------------------
| 3         | 6         | undefined |
| 6         | 8         | undefined |
| 8         | 10        | undefined |
| undefined | 12        | undefined |
```
<a name="DataFrame+restructure"></a>

### dataFrame.restructure(newColumnNames) ⇒ <code>[DataFrame](#DataFrame)</code>
Modify the structure of the DataFrame by changing columns order, creating new columns or removing some columns.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>[DataFrame](#DataFrame)</code> - A new DataFrame with different columns (renamed, add or deleted).  

| Param | Type | Description |
| --- | --- | --- |
| newColumnNames | <code>Array</code> | The new columns of the DataFrame. |

**Example**  
```js
df[__columns__]

['column1', 'column2', 'column3']

// Adding one empty column and removing one
df.restructure('column1', 'column3', 'column4')

| column1   | column3   | column4   |
------------------------------------
| 3         | undefined | undefined |
| 6         | undefined | undefined |
| 8         | undefined | undefined |
| undefined | undefined | undefined |
```
<a name="DataFrame+rename"></a>

### dataFrame.rename(newColumnNames) ⇒ <code>[DataFrame](#DataFrame)</code>
Rename columns.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>[DataFrame](#DataFrame)</code> - A new DataFrame with the new column names.  

| Param | Type | Description |
| --- | --- | --- |
| newColumnNames | <code>Array</code> | The new column names of the DataFrame. |

**Example**  
```js
df[__columns__]

['column1', 'column2', 'column3']

df.rename('column1', 'column3', 'column4')[__columns__]

['column1', 'column3', 'column4']
```
<a name="DataFrame+drop"></a>

### dataFrame.drop(columnName) ⇒ <code>[DataFrame](#DataFrame)</code>
Remove a single column.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>[DataFrame](#DataFrame)</code> - A new DataFrame without the dropped column.  

| Param | Type | Description |
| --- | --- | --- |
| columnName | <code>String</code> | The column to drop. |

**Example**  
```js
df.drop('d2').show()

| column1   | column3   |
------------------------
| 3         | undefined |
| 6         | undefined |
| 8         | undefined |
| undefined | undefined |
```
<a name="DataFrame+chain"></a>

### dataFrame.chain(...funcs) ⇒ <code>[DataFrame](#DataFrame)</code>
Chain multiple functions on DataFrame (filters, maps) and optimized their executions.
If a function returns boolean, it's a filter. Else it's a map.
It can be 10 - 100 x faster than standard chains of .map() and .filter().

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>[DataFrame](#DataFrame)</code> - A new DataFrame with modified rows.  

| Param | Type | Description |
| --- | --- | --- |
| ...funcs | <code>function</code> | Functions to apply on the DataFrame rows taking the row as parameter. |

**Example**  
```js
// 1 filter ==> 1 map ==> 1 filter
df.chain(
     line => line.get('column1') > 3, // Filter sending boolean. If true the chain continue. Else it breaks and the row is not send.
     line => line.set('column1', 3),  // Map sending modification
     line => line.get('column2') === '5' // Filter sending boolean. If true the row is send.
).show();

| column1   | column2   | column3   |
------------------------------------
| 3         | 5         | undefined |
```
<a name="DataFrame+filter"></a>

### dataFrame.filter(condition) ⇒ <code>[DataFrame](#DataFrame)</code>
Filter DataFrame rows.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>[DataFrame](#DataFrame)</code> - A new filtered DataFrame.  

| Param | Type | Description |
| --- | --- | --- |
| condition | <code>function</code> | A function sending a boolean taking the row as parameter or a column/value object. |

**Example**  
```js
df.filter(
     line => line.get('column1') >= 3
).show();

| column1   | column2   | column3   |
------------------------------------
| 3         | 5         | undefined |

df.filter(
     {'column2': 5, 'column1': 3}
).show();

| column1   | column2   | column3   |
------------------------------------
| 3         | 5         | undefined |
```
<a name="DataFrame+find"></a>

### dataFrame.find(condition) ⇒ <code>[Row](#Row)</code>
Find a row (the first met) based on a condition.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>[Row](#Row)</code> - The targeted Row.  

| Param | Type | Description |
| --- | --- | --- |
| condition | <code>function</code> | A function sending a boolean taking the row as parameter or a column/value object.. |

**Example**  
```js
df.find(
     line => line.get('column1') == 3
);
df.find(
     {'id': 958998}
);
```
<a name="DataFrame+where"></a>

### dataFrame.where(condition) ⇒ <code>[DataFrame](#DataFrame)</code>
Filter DataFrame rows.
Alias of .filter()

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>[DataFrame](#DataFrame)</code> - A new filtered DataFrame.  

| Param | Type | Description |
| --- | --- | --- |
| condition | <code>function</code> | A function sending a boolean taking the row as parameter or a column/value object. |

**Example**  
```js
df.filter(
     line => line.get('column1') >= 3
).show();

| column1   | column2   | column3   |
------------------------------------
| 3         | 5         | undefined |

df.filter(
     {'column2': 5, 'column1': 3}
).show();

| column1   | column2   | column3   |
------------------------------------
| 3         | 5         | undefined |
```
<a name="DataFrame+map"></a>

### dataFrame.map(func) ⇒ <code>[DataFrame](#DataFrame)</code>
Map on DataFrame rows. /!\ Prefer to use .chain().

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>[DataFrame](#DataFrame)</code> - A new DataFrame with modified rows.  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | A function to apply on each row taking the row as parameter. |

<a name="DataFrame+reduce"></a>

### dataFrame.reduce(func, [init]) ⇒
Reduce DataFrame into a value.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: A reduced value.  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | The reduce function taking 2 parameters, previous and next. |
| [init] |  | The initial value of the reducer. |

**Example**  
```js
// Compute a value from rows, starting from value 0
df.reduce((p, n) => n.get('column1') + p, 0)

// Compute a row from rows
df2.reduce((p, n) => (
         n.set('column1', p.get('column1') + n.get('column1'))
          .set('column2', p.get('column2') + n.get('column2'))
))
```
<a name="DataFrame+reduceRight"></a>

### dataFrame.reduceRight(func, [init]) ⇒
Reduce DataFrame into a value, starting from the last row (see .reduce()).

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: A reduced value.  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | The reduce function taking 2 parameters, previous and next. |
| [init] |  | The initial value of the reducer. |

<a name="DataFrame+shuffle"></a>

### dataFrame.shuffle() ⇒ <code>[DataFrame](#DataFrame)</code>
Return a shuffled DataFrame rows.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>[DataFrame](#DataFrame)</code> - A shuffled DataFrame  
**Example**  
```js
df.shuffle() // Return a DataFrame with shuffled rows.
```
<a name="DataFrame+sample"></a>

### dataFrame.sample(percentage) ⇒ <code>[DataFrame](#DataFrame)</code>
Return a random sample of rows.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>[DataFrame](#DataFrame)</code> - A sample DataFrame  

| Param | Type | Description |
| --- | --- | --- |
| percentage | <code>Number</code> | A percentage of the orignal DataFrame giving the sample size. |

**Example**  
```js
df.sample(0.3) // Return a DataFrame with 30% of the original size.
```
<a name="DataFrame+randomSplit"></a>

### dataFrame.randomSplit(percentage) ⇒ <code>Array</code>
Randomly split a DataFrame into 2 DataFrames.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>Array</code> - An Array containing the two DataFrames.  

| Param | Type | Description |
| --- | --- | --- |
| percentage | <code>Number</code> | A percentage of the orignal DataFrame giving the first DataFrame size. The second takes the rest. |

**Example**  
```js
df.randomSplit(0.3) // Return a DataFrame with 30% of the original size and a second with the rest (70%).
```
<a name="DataFrame+groupBy"></a>

### dataFrame.groupBy(columnName) ⇒ <code>Array</code>
Group DataFrame rows by a column values.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>Array</code> - An Array containing a DataFrame by group. The group value can be accessed via df.group.  

| Param | Type | Description |
| --- | --- | --- |
| columnName | <code>String</code> | The column giving groups (distinct values). |

**Example**  
```js
// Group By id and return an object containing group and dataframe
df.groupBy('id').map(dfByValue => ({group: dfByValue.group, df: dfByValue.toDict()}))

[ { group: 3, df: { id: [Object], value: [Object] } },
  { group: 6, df: { id: [Object], value: [Object] } },
  { group: 8, df: { id: [Object], value: [Object] } },
  { group: 1, df: { id: [Object], value: [Object] } } ]

// Get sum of value by id with a simple formating
df.groupBy('id').map(dfByValue => (
     {group: dfByValue.group, result: dfByValue.reduce((p, n) => p + n.get('value'), 0)})
)

[ { group: 3, result: 3 },
  { group: 6, result: 0 },
  { group: 8, result: 5 },
  { group: 1, result: 2 } ]
```
<a name="DataFrame+sortBy"></a>

### dataFrame.sortBy(columnName, [reverse]) ⇒ <code>[DataFrame](#DataFrame)</code>
Sort DataFrame rows based on a column values. The row should contains only one type. (numerical or string).

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>[DataFrame](#DataFrame)</code> - An ordered DataFrame.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| columnName | <code>String</code> |  | The column giving order. |
| [reverse] | <code>Boolean</code> | <code>false</code> | Reverse mode. Reverse the order if true. |

**Example**  
```js
// Sort DataFrame by id
df.sortBy('id').toArray()

[
     [1, 1],
     [1, 1],
     [3, 1],
     [3, 2],
     [6, 0],
     [8, 1],
     [8, 4],
]

// Sort DataFrame by id and reverse
df.sortBy('id', true).toArray()

[
     [8, 4],
     [8, 1],
     [6, 0],
     [3, 2],
     [3, 1],
     [1, 1],
     [1, 1],
]
```
<a name="DataFrame+union"></a>

### dataFrame.union(dfToUnion) ⇒ <code>[DataFrame](#DataFrame)</code>
Concat two DataFrames.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>[DataFrame](#DataFrame)</code> - A new DataFrame resulting of the union.  

| Param | Type | Description |
| --- | --- | --- |
| dfToUnion | <code>[DataFrame](#DataFrame)</code> | The DataFrame to concat. |

**Example**  
```js
df.union(df2).toArray()

[
     [8, 4],
     [8, 1],
     [6, 0],
     [3, 2],
     [3, 1],
     [1, 1],
     [1, 1],
     [3, 1],
     [1, 0],
     [8, 1],
]
```
<a name="DataFrame+join"></a>

### dataFrame.join(dfToJoin, on, [how]) ⇒ <code>[DataFrame](#DataFrame)</code>
Join two DataFrames.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>[DataFrame](#DataFrame)</code> - The joined DataFrame.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| dfToJoin | <code>[DataFrame](#DataFrame)</code> |  | The DataFrame to join. |
| on | <code>String</code> |  | The selected column for the join. |
| [how] | <code>String</code> | <code>&#x27;full&#x27;</code> | The join mode. Can be: full, inner, outer, left, right. |

<a name="DataFrame+innerJoin"></a>

### dataFrame.innerJoin(dfToJoin, on) ⇒ <code>[DataFrame](#DataFrame)</code>
Join two DataFrames with inner mode.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>[DataFrame](#DataFrame)</code> - The joined DataFrame.  

| Param | Type | Description |
| --- | --- | --- |
| dfToJoin | <code>[DataFrame](#DataFrame)</code> | The DataFrame to join. |
| on | <code>String</code> | The selected column for the join. |

**Example**  
```js
df1.join(df2, 'id', 'inner')

| id        | value     | value2    |
------------------------------------
| 3         | 1         | undefined |
| 1         | 0         | undefined |
| 8         | 1         | undefined |
| 1         | undefined | 0         |
| 8         | undefined | 2         |
| 3         | undefined | 6         |
```
<a name="DataFrame+fullJoin"></a>

### dataFrame.fullJoin(dfToJoin, on) ⇒ <code>[DataFrame](#DataFrame)</code>
Join two DataFrames with full mode.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>[DataFrame](#DataFrame)</code> - The joined DataFrame.  

| Param | Type | Description |
| --- | --- | --- |
| dfToJoin | <code>[DataFrame](#DataFrame)</code> | The DataFrame to join. |
| on | <code>String</code> | The selected column for the join. |

**Example**  
```js
df1.join(df2, 'id', 'full')

| id        | value     | value2    |
------------------------------------
| 3         | 1         | undefined |
| 1         | 0         | undefined |
| 8         | 1         | undefined |
| 2         | undefined | 1         |
| 1         | undefined | 0         |
| 6         | undefined | 1         |
| 8         | undefined | 2         |
| 3         | undefined | 6         |
```
<a name="DataFrame+outerJoin"></a>

### dataFrame.outerJoin(dfToJoin, on) ⇒ <code>[DataFrame](#DataFrame)</code>
Join two DataFrames with outer mode.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>[DataFrame](#DataFrame)</code> - The joined DataFrame.  

| Param | Type | Description |
| --- | --- | --- |
| dfToJoin | <code>[DataFrame](#DataFrame)</code> | The DataFrame to join. |
| on | <code>String</code> | The selected column for the join. |

**Example**  
```js
df1.join(df2, 'id', 'outer')

| id        | value     | value2    |
------------------------------------
| 2         | undefined | 1         |
| 6         | undefined | 1         |
```
<a name="DataFrame+leftJoin"></a>

### dataFrame.leftJoin(dfToJoin, on) ⇒ <code>[DataFrame](#DataFrame)</code>
Join two DataFrames with left mode.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>[DataFrame](#DataFrame)</code> - The joined DataFrame.  

| Param | Type | Description |
| --- | --- | --- |
| dfToJoin | <code>[DataFrame](#DataFrame)</code> | The DataFrame to join. |
| on | <code>String</code> | The selected column for the join. |

**Example**  
```js
df1.join(df2, 'id', 'left')

| id        | value     | value2    |
------------------------------------
| 3         | 1         | undefined |
| 1         | 0         | undefined |
| 8         | 1         | undefined |
| 1         | undefined | 0         |
| 8         | undefined | 2         |
| 3         | undefined | 6         |
```
<a name="DataFrame+rightJoin"></a>

### dataFrame.rightJoin(dfToJoin, on) ⇒ <code>[DataFrame](#DataFrame)</code>
Join two DataFrames with right mode.

**Kind**: instance method of <code>[DataFrame](#DataFrame)</code>  
**Returns**: <code>[DataFrame](#DataFrame)</code> - The joined DataFrame.  

| Param | Type | Description |
| --- | --- | --- |
| dfToJoin | <code>[DataFrame](#DataFrame)</code> | The DataFrame to join. |
| on | <code>String</code> | The selected column for the join. |

**Example**  
```js
df1.join(df2, 'id', 'right')

| id        | value     | value2    |
------------------------------------
| 2         | undefined | 1         |
| 1         | undefined | 0         |
| 6         | undefined | 1         |
| 8         | undefined | 2         |
| 3         | undefined | 6         |
| 3         | 1         | undefined |
| 1         | 0         | undefined |
| 8         | 1         | undefined |
```
<a name="Row"></a>

## Row
Row data structure used into the dataframe-js.

**Kind**: global class  

* [Row](#Row)
    * [new Row(data, columns)](#new_Row_new)
    * [.toDict()](#Row+toDict) ⇒ <code>Object</code>
    * [.toArray()](#Row+toArray) ⇒ <code>Array</code>
    * [.size()](#Row+size) ⇒ <code>Int</code>
    * [.has(columnName)](#Row+has) ⇒ <code>Boolean</code>
    * [.select(...columnNames)](#Row+select) ⇒ <code>[Row](#Row)</code>
    * [.get(columnToGet)](#Row+get) ⇒
    * [.set(columnToSet)](#Row+set) ⇒ <code>[Row](#Row)</code>
    * [.delete(columnToDel)](#Row+delete) ⇒ <code>[Row](#Row)</code>

<a name="new_Row_new"></a>

### new Row(data, columns)
Create a new Row.


| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array</code> &#124; <code>Object</code> &#124; <code>[Row](#Row)</code> | The data of the Row. |
| columns | <code>Array</code> | The DataFrame column names. |

<a name="Row+toDict"></a>

### row.toDict() ⇒ <code>Object</code>
Convert Row into dict / hash / object.

**Kind**: instance method of <code>[Row](#Row)</code>  
**Returns**: <code>Object</code> - The Row converted into dict.  
<a name="Row+toArray"></a>

### row.toArray() ⇒ <code>Array</code>
Convert Row into Array, loosing column names.

**Kind**: instance method of <code>[Row](#Row)</code>  
**Returns**: <code>Array</code> - The Row values converted into Array.  
<a name="Row+size"></a>

### row.size() ⇒ <code>Int</code>
Get the Row size.

**Kind**: instance method of <code>[Row](#Row)</code>  
**Returns**: <code>Int</code> - The Row length.  
<a name="Row+has"></a>

### row.has(columnName) ⇒ <code>Boolean</code>
Check if row contains a column.

**Kind**: instance method of <code>[Row](#Row)</code>  
**Returns**: <code>Boolean</code> - The presence or not of the column.  

| Param | Type | Description |
| --- | --- | --- |
| columnName | <code>String</code> | The column to check. |

<a name="Row+select"></a>

### row.select(...columnNames) ⇒ <code>[Row](#Row)</code>
Select columns into the Row.

**Kind**: instance method of <code>[Row](#Row)</code>  
**Returns**: <code>[Row](#Row)</code> - A new Row containing only the selected columns.  

| Param | Type | Description |
| --- | --- | --- |
| ...columnNames | <code>String</code> | The columns to select. |

<a name="Row+get"></a>

### row.get(columnToGet) ⇒
Get a Row value by its column.

**Kind**: instance method of <code>[Row](#Row)</code>  
**Returns**: The selected value.  

| Param | Type | Description |
| --- | --- | --- |
| columnToGet | <code>String</code> | The column value to get. |

<a name="Row+set"></a>

### row.set(columnToSet) ⇒ <code>[Row](#Row)</code>
Set a Row value by its column, or create a new value if column doesn't exist.

**Kind**: instance method of <code>[Row](#Row)</code>  
**Returns**: <code>[Row](#Row)</code> - A new Row with the modified / new value.  

| Param | Type | Description |
| --- | --- | --- |
| columnToSet | <code>String</code> | The column value to set. |

<a name="Row+delete"></a>

### row.delete(columnToDel) ⇒ <code>[Row](#Row)</code>
Delete a Row value by its column.

**Kind**: instance method of <code>[Row](#Row)</code>  
**Returns**: <code>[Row](#Row)</code> - A new Row without the deleted value.  

| Param | Type | Description |
| --- | --- | --- |
| columnToDel | <code>String</code> | The column value to delete. |

