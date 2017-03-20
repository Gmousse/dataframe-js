# DataFrame

[src/dataframe.js:16-865](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L16-L865 "Source code on GitHub")

DataFrame data structure providing an immutable, flexible and powerfull way to manipulate data with columns and rows.

## constructor

[src/dataframe.js:125-135](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L125-L135 "Source code on GitHub")

Create a new DataFrame.

**Parameters**

-   `data` **([Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) \| [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [DataFrame](#dataframe))** The data of the DataFrame.
-   `columns` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** The DataFrame column names.
-   `modules` **\[...[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)]** Additional modules.

**Examples**

```javascript
new DataFrame({
     'column1': [3, 6, 8],
     'column2': [3, 4, 5, 6],
}, ['column1', 'column2'])

new Data Frame([
     [1, 6, 9, 10, 12],
     [1, 2],
     [6, 6, 9, 8, 9, 12],
], ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'])

new DataFrame([
     {c1: 1, c2: 6, c3: 9, c4: 10, c5: 12},
     {c4: 1, c3: 2},
     {c1: 6, c5: 6, c2: 9, c4: 8, c3: 9, c6: 12},
], ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'])

new DataFrame(df);
```

## toDict

[src/dataframe.js:232-236](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L232-L236 "Source code on GitHub")

Convert DataFrame into dict / hash / object.

**Examples**

```javascript
df.toDict()
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** The DataFrame converted into dict.

## toArray

[src/dataframe.js:245-247](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L245-L247 "Source code on GitHub")

Convert DataFrame into Array of Arrays. You can also extract only one column as Array.

**Parameters**

-   `columnName` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** Column Name to extract. By default, all columns are transformed.

**Examples**

```javascript
df.toArray()
```

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** The DataFrame (or the column) converted into Array.

## toCollection

[src/dataframe.js:256-258](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L256-L258 "Source code on GitHub")

Convert DataFrame into Array of dictionnaries. You can also return Rows instead of dictionnaries.

**Parameters**

-   `ofRows` **\[[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** Return a collection of Rows instead of dictionnaries.

**Examples**

```javascript
df.toCollection()
```

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** The DataFrame converted into Array of dictionnaries (or Rows).

## toText

[src/dataframe.js:273-280](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L273-L280 "Source code on GitHub")

Convert the DataFrame into a text string. You can also save the file if you are using nodejs.

**Parameters**

-   `sep` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** Column separator. (optional, default `' '`)
-   `header` **\[[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** Writing the header in the first line. If false, there will be no header. (optional, default `true`)
-   `path` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** The path to save the file. /!\\ Works only on node.js, not into the browser.

**Examples**

```javascript
df.toText()
df.toText(';')
df.toText(';', true)
// From node.js only
df.toText(';', true, '/my/absolute/path/dataframe.txt')
```

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The text file in raw string.

## toCSV

[src/dataframe.js:293-295](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L293-L295 "Source code on GitHub")

Convert the DataFrame into a csv string. You can also save the file if you are using nodejs.

**Parameters**

-   `header` **\[[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** Writing the header in the first line. If false, there will be no header. (optional, default `true`)
-   `path` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** The path to save the file. /!\\ Works only on node.js, not into the browser.

**Examples**

```javascript
df.toCSV()
df.toCSV(true)
// From node.js only
df.toCSV(true, '/my/absolute/path/dataframe.csv')
```

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The csv file in raw string.

## toJSON

[src/dataframe.js:307-311](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L307-L311 "Source code on GitHub")

Convert the DataFrame into a json string. You can also save the file if you are using nodejs.

**Parameters**

-   `asCollection` **\[[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** Writing the JSON as collection of Object. (optional, default `true`)
-   `path` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** The path to save the file. /!\\ Works only on node.js, not into the browser.

**Examples**

```javascript
df.toJSON()
// From node.js only
df.toJSON('/my/absolute/path/dataframe.json')
```

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The json file in raw string.

## show

[src/dataframe.js:323-342](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L323-L342 "Source code on GitHub")

Display the DataFrame as String Table. Can only return a sring instead of displaying the DataFrame.

**Parameters**

-   `rows` **\[[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)]** The number of lines to display. (optional, default `10`)
-   `quiet` **\[[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** Quiet mode. If true, only returns a string instead of console.log(). (optional, default `false`)

**Examples**

```javascript
df.show()
df.show(10)
const stringDF = df.show(10, true)
```

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The DataFrame as String Table.

## dim

[src/dataframe.js:350-352](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L350-L352 "Source code on GitHub")

Get the DataFrame dimensions.

**Examples**

```javascript
const [height, weight] = df.dim()
```

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** The DataFrame dimensions. [height, weight]

## transpose

[src/dataframe.js:361-366](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L361-L366 "Source code on GitHub")

Transpose a DataFrame. Rows become columns and conversely. n x p => p x n.

**Parameters**

-   `transposeColumnNames` **\[[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** An option to transpose columnNames in a rowNames column. (optional, default `false`)
-   `tranposeColumnNames`  

**Examples**

```javascript
df.transpose()
```

Returns **ÐataFrame** A new transposed DataFrame.

## count

[src/dataframe.js:374-376](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L374-L376 "Source code on GitHub")

Get the rows number.

**Examples**

```javascript
df.count()
```

Returns **Int** The number of DataFrame rows.

## countValue

[src/dataframe.js:387-389](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L387-L389 "Source code on GitHub")

Get the count of a value into a column.

**Parameters**

-   `valueToCount`  The value to count into the selected column.
-   `columnName` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** The column to count the value. (optional, default `this.listColumns()[0]`)

**Examples**

```javascript
df.countValue(5, 'column2')
df.select('column1').countValue(5)
```

Returns **Int** The number of times the selected value appears.

## push

[src/dataframe.js:398-400](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L398-L400 "Source code on GitHub")

Push new rows into the DataFrame.

**Parameters**

-   `rows` **([Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) \| [Row](#row))** The rows to add.

**Examples**

```javascript
df.push([1,2,3], [1,4,9])
```

Returns **[DataFrame](#dataframe)** A new DataFrame with the new rows.

## replace

[src/dataframe.js:411-416](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L411-L416 "Source code on GitHub")

Replace a value by another in all the DataFrame or in a column.

**Parameters**

-   `value`  The value to replace.
-   `replacement`  The new value.
-   `columnNames` **\[([String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array))]** The columns to apply the replacement. (optional, default `this.listColumns()`)

**Examples**

```javascript
df.replace(undefined, 0, 'column1', 'column2')
```

Returns **[DataFrame](#dataframe)** A new DataFrame with replaced values.

## distinct

[src/dataframe.js:425-429](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L425-L429 "Source code on GitHub")

Compute unique values into a column.

**Parameters**

-   `columnName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The column to distinct.

**Examples**

```javascript
df.distinct('column1')
```

Returns **[DataFrame](#dataframe)** A DataFrame containing the column with distinct values.

## unique

[src/dataframe.js:439-441](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L439-L441 "Source code on GitHub")

Compute unique values into a column.
Alias from .distinct()

**Parameters**

-   `columnName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The column to distinct.

**Examples**

```javascript
df.unique('column1')
```

Returns **[DataFrame](#dataframe)** A DataFrame containing the column with distinct values.

## listColumns

[src/dataframe.js:449-451](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L449-L451 "Source code on GitHub")

List DataFrame columns.

**Examples**

```javascript
df.listColumns()
```

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** An Array containing DataFrame columnNames.

## select

[src/dataframe.js:460-464](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L460-L464 "Source code on GitHub")

Select columns in the DataFrame.

**Parameters**

-   `columnNames` **...[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The columns to select.

**Examples**

```javascript
df.select('column1', 'column3')
```

Returns **[DataFrame](#dataframe)** A new DataFrame containing selected columns.

## withColumn

[src/dataframe.js:475-481](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L475-L481 "Source code on GitHub")

Add a new column or set an existing one.

**Parameters**

-   `columnName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The column to modify or to create.
-   `func` **\[[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)]** The function to create the column. (optional, default `(row,index)`)

**Examples**

```javascript
df.withColumn('column4', () => 2)
df.withColumn('column2', (row) => row.get('column2') * 2)
```

Returns **[DataFrame](#dataframe)** A new DataFrame containing the new or modified column.

## restructure

[src/dataframe.js:492-494](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L492-L494 "Source code on GitHub")

Modify the structure of the DataFrame by changing columns order, creating new columns or removing some columns.

**Parameters**

-   `newColumnNames` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** The new columns of the DataFrame.

**Examples**

```javascript
df.restructure(['column1', 'column4', 'column2', 'column3'])
df.restructure(['column1', 'column4'])
df.restructure(['column1', 'newColumn', 'column4'])
```

Returns **[DataFrame](#dataframe)** A new DataFrame with restructured columns (renamed, add or deleted).

## renameAll

[src/dataframe.js:503-508](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L503-L508 "Source code on GitHub")

Rename each column.

**Parameters**

-   `newColumnNames` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** The new column names of the DataFrame.

**Examples**

```javascript
df.renameAll(['column1', 'column3', 'column4'])
```

Returns **[DataFrame](#dataframe)** A new DataFrame with the new column names.

## rename

[src/dataframe.js:518-521](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L518-L521 "Source code on GitHub")

Rename a column.

**Parameters**

-   `columnName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The column to rename.
-   `replacement` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The new name for the column.

**Examples**

```javascript
df.rename('column1', 'columnRenamed')
```

Returns **[DataFrame](#dataframe)** A new DataFrame with the new column name.

## castAll

[src/dataframe.js:530-537](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L530-L537 "Source code on GitHub")

Cast each column into a given type.

**Parameters**

-   `typeFunctions` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** The functions used to cast columns.

**Examples**

```javascript
df.castAll([Number, String, (val) => new CustomClass(val)])
```

Returns **[DataFrame](#dataframe)** A new DataFrame with the columns having new types.

## cast

[src/dataframe.js:548-550](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L548-L550 "Source code on GitHub")

Cast a column into a given type.

**Parameters**

-   `columnName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The column to cast.
-   `ObjectType` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** The function used to cast the column.
-   `typeFunction`  

**Examples**

```javascript
df.cast('column1', Number)
df.cast('column1', (val) => new MyCustomClass(val))
```

Returns **[DataFrame](#dataframe)** A new DataFrame with the column having a new type.

## drop

[src/dataframe.js:559-563](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L559-L563 "Source code on GitHub")

Remove a single column.

**Parameters**

-   `columnName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The column to drop.

**Examples**

```javascript
df.drop('column2')
```

Returns **[DataFrame](#dataframe)** A new DataFrame without the dropped column.

## chain

[src/dataframe.js:578-580](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L578-L580 "Source code on GitHub")

Chain maps and filters functions on DataFrame by optimizing their executions.
If a function returns boolean, it's a filter. Else it's a map.
It can be 10 - 100 x faster than standard chains of .map() and .filter().

**Parameters**

-   `funcs` **...[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Functions to apply on the DataFrame rows taking the row as parameter.

**Examples**

```javascript
df.chain(
     row => row.get('column1') > 3, // filter
     row => row.set('column1', 3),  // map
     row => row.get('column2') === '5' // filter
)
```

Returns **[DataFrame](#dataframe)** A new DataFrame with modified rows.

## filter

[src/dataframe.js:590-596](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L590-L596 "Source code on GitHub")

Filter DataFrame rows.

**Parameters**

-   `condition` **([Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function) \| [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))** A filter function or a column/value object.

**Examples**

```javascript
df.filter(row => row.get('column1') >= 3)
df.filter({'column2': 5, 'column1': 3}))
```

Returns **[DataFrame](#dataframe)** A new filtered DataFrame.

## where

[src/dataframe.js:607-609](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L607-L609 "Source code on GitHub")

Filter DataFrame rows.
Alias of .filter()

**Parameters**

-   `condition` **([Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function) \| [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))** A filter function or a column/value object.

**Examples**

```javascript
df.where(row => row.get('column1') >= 3)
df.where({'column2': 5, 'column1': 3}))
```

Returns **[DataFrame](#dataframe)** A new filtered DataFrame.

## find

[src/dataframe.js:619-621](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L619-L621 "Source code on GitHub")

Find a row (the first met) based on a condition.

**Parameters**

-   `condition` **([Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function) \| [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))** A filter function or a column/value object.

**Examples**

```javascript
df.find(row => row.get('column1') === 3)
df.find({'column1': 3})
```

Returns **[Row](#row)** The targeted Row.

## map

[src/dataframe.js:630-632](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L630-L632 "Source code on GitHub")

Map on DataFrame rows. /!\\ Prefer to use .chain().

**Parameters**

-   `func` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** A function to apply on each row taking the row as parameter.

**Examples**

```javascript
df.map(row => row.set('column1', row.get('column1') * 2))
```

Returns **[DataFrame](#dataframe)** A new DataFrame with modified rows.

## reduce

[src/dataframe.js:646-649](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L646-L649 "Source code on GitHub")

Reduce DataFrame into a value.

**Parameters**

-   `func` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** The reduce function taking 2 parameters, previous and next.
-   `init`  The initial value of the reducer.

**Examples**

```javascript
df.reduce((p, n) => n.get('column1') + p, 0)
df2.reduce((p, n) => (
         n.set('column1', p.get('column1') + n.get('column1'))
          .set('column2', p.get('column2') + n.get('column2'))
))
```

Returns **Any** A reduced value.

## reduceRight

[src/dataframe.js:659-662](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L659-L662 "Source code on GitHub")

Reduce DataFrame into a value, starting from the last row (see .reduce()).

**Parameters**

-   `func` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** The reduce function taking 2 parameters, previous and next.
-   `init`  The initial value of the reducer.

**Examples**

```javascript
df.reduceRight((p, n) => p > n ? p : n, 0)
```

Returns **Any** A reduced value.

## dropDuplicates

[src/dataframe.js:670-672](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L670-L672 "Source code on GitHub")

Return a DataFrame without duplicated columns.

**Examples**

```javascript
df.dropDuplicates()
```

Returns **[DataFrame](#dataframe)** A DataFrame without duplicated rows.

## shuffle

[src/dataframe.js:680-691](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L680-L691 "Source code on GitHub")

Return a shuffled DataFrame rows.

**Examples**

```javascript
df.shuffle()
```

Returns **[DataFrame](#dataframe)** A shuffled DataFrame.

## sample

[src/dataframe.js:700-709](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L700-L709 "Source code on GitHub")

Return a random sample of rows.

**Parameters**

-   `percentage` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** A percentage of the orignal DataFrame giving the sample size.

**Examples**

```javascript
df.sample(0.3)
```

Returns **[DataFrame](#dataframe)** A sample DataFrame

## bisect

[src/dataframe.js:718-732](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L718-L732 "Source code on GitHub")

Randomly split a DataFrame into 2 DataFrames.

**Parameters**

-   `percentage` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** A percentage of the orignal DataFrame giving the first DataFrame size. The second takes the rest.

**Examples**

```javascript
const [30DF, 70DF] = df.bisect(0.3)
```

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** An Array containing the two DataFrames. First, the X% DataFrame then the rest DataFrame.

## groupBy

[src/dataframe.js:745-747](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L745-L747 "Source code on GitHub")

Group DataFrame rows by columns giving a GroupedDataFrame object. See its doc for more examples.

**Parameters**

-   `columnNames` **...[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The columns used for the groupBy.

**Examples**

```javascript
df.groupBy('column1')
df.groupBy('column1', 'column2')
df.groupBy('column1', 'column2').listGroups()
df.groupBy('column1', 'column2').show()
df.groupBy('column1', 'column2').aggregate((group) => group.count())
```

Returns **GroupedDataFrame** A GroupedDataFrame object.

## sortBy

[src/dataframe.js:757-764](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L757-L764 "Source code on GitHub")

Sort DataFrame rows based on a column values. The row should contains only one variable type.

**Parameters**

-   `columnName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The column giving order.
-   `reverse` **\[[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** Reverse mode. Reverse the order if true. (optional, default `false`)

**Examples**

```javascript
df.sortBy('id')
```

Returns **[DataFrame](#dataframe)** An ordered DataFrame.

## union

[src/dataframe.js:773-778](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L773-L778 "Source code on GitHub")

Concat two DataFrames.

**Parameters**

-   `dfToUnion` **[DataFrame](#dataframe)** The DataFrame to concat.

**Examples**

```javascript
df.union(df2)
```

Returns **[DataFrame](#dataframe)** A new concatenated DataFrame resulting of the union.

## join

[src/dataframe.js:789-798](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L789-L798 "Source code on GitHub")

Join two DataFrames.

**Parameters**

-   `dfToJoin` **[DataFrame](#dataframe)** The DataFrame to join.
-   `columnNames` **([String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array))** The selected columns for the join.
-   `how` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** The join mode. Can be: full, inner, outer, left, right. (optional, default `'inner'`)

**Examples**

```javascript
df.join(df2, 'column1', 'full')
```

Returns **[DataFrame](#dataframe)** The joined DataFrame.

## innerJoin

[src/dataframe.js:810-812](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L810-L812 "Source code on GitHub")

Join two DataFrames with inner mode.

**Parameters**

-   `dfToJoin` **[DataFrame](#dataframe)** The DataFrame to join.
-   `columnNames` **([String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array))** The selected columns for the join.

**Examples**

```javascript
df.innerJoin(df2, 'id')
df.join(df2, 'id')
df.join(df2, 'id', 'inner')
```

Returns **[DataFrame](#dataframe)** The joined DataFrame.

## fullJoin

[src/dataframe.js:823-825](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L823-L825 "Source code on GitHub")

Join two DataFrames with full mode.

**Parameters**

-   `dfToJoin` **[DataFrame](#dataframe)** The DataFrame to join.
-   `columnNames` **([String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array))** The selected columns for the join.

**Examples**

```javascript
df.fullJoin(df2, 'id')
df.join(df2, 'id', 'full')
```

Returns **[DataFrame](#dataframe)** The joined DataFrame.

## outerJoin

[src/dataframe.js:836-838](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L836-L838 "Source code on GitHub")

Join two DataFrames with outer mode.

**Parameters**

-   `dfToJoin` **[DataFrame](#dataframe)** The DataFrame to join.
-   `columnNames` **([String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array))** The selected columns for the join.

**Examples**

```javascript
df2.rightJoin(df2, 'id')
df2.join(df2, 'id', 'outer')
```

Returns **[DataFrame](#dataframe)** The joined DataFrame.

## leftJoin

[src/dataframe.js:849-851](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L849-L851 "Source code on GitHub")

Join two DataFrames with left mode.

**Parameters**

-   `dfToJoin` **[DataFrame](#dataframe)** The DataFrame to join.
-   `columnNames` **([String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array))** The selected columns for the join.

**Examples**

```javascript
df.leftJoin(df2, 'id')
df.join(df2, 'id', 'left')
```

Returns **[DataFrame](#dataframe)** The joined DataFrame.

## rightJoin

[src/dataframe.js:862-864](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L862-L864 "Source code on GitHub")

Join two DataFrames with right mode.

**Parameters**

-   `dfToJoin` **[DataFrame](#dataframe)** The DataFrame to join.
-   `columnNames` **([String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array))** The selected columns for the join.

**Examples**

```javascript
df.rightJoin(df2, 'id')
df.join(df2, 'id', 'right')
```

Returns **[DataFrame](#dataframe)** The joined DataFrame.

## setDefaultModules

[src/dataframe.js:24-26](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L24-L26 "Source code on GitHub")

Set the default modules used in DataFrame instances.

**Parameters**

-   `defaultModules` **...[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** DataFrame modules used by default.

**Examples**

```javascript
DataFrame.setDefaultModules(SQL, Stat)
```

## fromText

[src/dataframe.js:42-53](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L42-L53 "Source code on GitHub")

Create a DataFrame from a Text file. It returns a Promise.

**Parameters**

-   `pathOrFile` **([String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | File)** A path to the file (url or local) or a browser File object.
-   `sep` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)](default ';')** The separator used to parse the file.
-   `header` **\[[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** A boolean indicating if the text has a header or not. (optional, default `true`)

**Examples**

```javascript
DataFrame.fromText('http://myurl/myfile.txt').then(df => df.show())
// In browser Only
DataFrame.fromText(myFile).then(df => df.show())
// From node.js only Only
DataFrame.fromText('/my/absolue/path/myfile.txt').then(df => df.show())
DataFrame.fromText('/my/absolue/path/myfile.txt', ';', true).then(df => df.show())
```

## fromCSV

[src/dataframe.js:68-78](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L68-L78 "Source code on GitHub")

Create a DataFrame from a CSV file. It returns a Promise.

**Parameters**

-   `pathOrFile` **([String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | File)** A path to the file (url or local) or a browser File object.
-   `header` **\[[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** A boolean indicating if the csv has a header or not. (optional, default `true`)

**Examples**

```javascript
DataFrame.fromCSV('http://myurl/myfile.csv').then(df => df.show())
// For browser only
DataFrame.fromCSV(myFile).then(df => df.show())
// From node.js only
DataFrame.fromCSV('/my/absolue/path/myfile.csv').then(df => df.show())
DataFrame.fromCSV('/my/absolue/path/myfile.csv', true).then(df => df.show())
```

## fromJSON

[src/dataframe.js:91-98](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/dataframe.js#L91-L98 "Source code on GitHub")

Create a DataFrame from a JSON file. It returns a Promise.

**Parameters**

-   `pathOrFile` **([String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | File)** A path to the file (url or local) or a browser File object.

**Examples**

```javascript
DataFrame.fromJSON('http://myurl/myfile.json').then(df => df.show())
// For browser only
DataFrame.fromJSON(myFile).then(df => df.show())
// From node.js only
DataFrame.fromJSON('/my/absolute/path/myfile.json').then(df => df.show())
```

# Row

[src/row.js:12-155](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/row.js#L12-L155 "Source code on GitHub")

Row data structure used into the dataframe-js.

## constructor

[src/row.js:27-30](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/row.js#L27-L30 "Source code on GitHub")

Create a new Row.

**Parameters**

-   `data` **([Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) \| [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [Row](#row))** The data of the Row.
-   `columns` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** The DataFrame column names.

**Examples**

```javascript
new Row({
     'column1': 3,
     'column2': 6,
})

new Row([3, 6], ['column1', 'column2'])

new Row(Row, ['column1', 'column3'])
```

## toDict

[src/row.js:70-72](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/row.js#L70-L72 "Source code on GitHub")

Convert Row into dict / hash / object.

**Examples**

```javascript
row.toDict()
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** The Row converted into dict.

## toArray

[src/row.js:80-82](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/row.js#L80-L82 "Source code on GitHub")

Convert Row into Array, loosing column names.

**Examples**

```javascript
row.toArray()
```

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** The Row values converted into Array.

## size

[src/row.js:90-92](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/row.js#L90-L92 "Source code on GitHub")

Get the Row size.

**Examples**

```javascript
row.size()
```

Returns **Int** The Row length.

## has

[src/row.js:101-103](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/row.js#L101-L103 "Source code on GitHub")

Check if row contains a column.

**Parameters**

-   `columnName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The column to check.

**Examples**

```javascript
row.has('column1')
```

Returns **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** The presence or not of the column.

## select

[src/row.js:112-118](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/row.js#L112-L118 "Source code on GitHub")

Select columns into the Row.

**Parameters**

-   `columnNames` **...[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The columns to select.

**Examples**

```javascript
row.select('column1', 'column2')
```

Returns **[Row](#row)** A new Row containing only the selected columns.

## get

[src/row.js:127-130](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/row.js#L127-L130 "Source code on GitHub")

Get a Row value by its column.

**Parameters**

-   `columnToGet` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The column value to get.

**Examples**

```javascript
row.get('column1')
```

Returns **Any** The selected value.

## set

[src/row.js:139-142](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/row.js#L139-L142 "Source code on GitHub")

Set a Row value by its column, or create a new value if column doesn't exist.

**Parameters**

-   `columnToSet` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The column value to set.
-   `value`  

**Examples**

```javascript
row.set('column1', 6)
```

Returns **[Row](#row)** A new Row with the modified / new value.

## delete

[src/row.js:151-154](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/row.js#L151-L154 "Source code on GitHub")

Delete a Row value by its column.

**Parameters**

-   `columnToDel` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The column value to delete.

**Examples**

```javascript
row.delete('column1')
```

Returns **[Row](#row)** A new Row without the deleted value.

# groupedDataframe

[src/groupedDataframe.js:10-172](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/groupedDataframe.js#L10-L172 "Source code on GitHub")

Grouped DataFrame structure grouping DataFrame rows by column value.

# constructor

[src/groupedDataframe.js:21-25](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/groupedDataframe.js#L21-L25 "Source code on GitHub")

Create a GroupedDataFrame. Used in DataFrame.groupBy('columnName').

**Parameters**

-   `df` **[DataFrame](#dataframe)** The DataFrame to group by.
-   `columnName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The column used for the group by.
-   `columnNames` **...Any** 

**Examples**

```javascript
df.groupBy('column1');
//or
new GroupedDataFrame(df, 'column1');
```

# toCollection

[src/groupedDataframe.js:63-65](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/groupedDataframe.js#L63-L65 "Source code on GitHub")

Convert GroupedDataFrame into collection (Array) of dictionnaries (Object).

**Examples**

```javascript
groupedDF.toCollection();
```

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** An Array containing group: {groupKey, group}.

# show

[src/groupedDataframe.js:74-82](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/groupedDataframe.js#L74-L82 "Source code on GitHub")

Display the GroupedDataFrame as String Table.

**Parameters**

-   `quiet` **\[[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** Quiet mode. If true, it doesn't trigger console.log(). (optional, default `false`)

**Examples**

```javascript
groupedDf.show()
```

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The GroupedDataFrame as String Table.

# listGroups

[src/groupedDataframe.js:90-92](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/groupedDataframe.js#L90-L92 "Source code on GitHub")

List GroupedDataFrame groups.

**Examples**

```javascript
gdf.listGroups()
```

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** An Array containing GroupedDataFrame group names.

# listHashs

[src/groupedDataframe.js:100-102](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/groupedDataframe.js#L100-L102 "Source code on GitHub")

List GroupedDataFrame groups as a hashCode.

**Examples**

```javascript
gdf.listHashCodes()
```

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** An Array containing GroupedDataFrame hash codes.

# aggregate

[src/groupedDataframe.js:113-118](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/groupedDataframe.js#L113-L118 "Source code on GitHub")

Create an aggregation from a function.

**Parameters**

-   `func` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** The aggregation function.
-   `columnName` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** The column name created by the aggregation. (optional, default `'aggregation'`)

**Examples**

```javascript
groupedDF.aggregate(group => group.stat.sum('column1'));
```

Returns **[DataFrame](#dataframe)** A new DataFrame with a column 'aggregation' containing the result.

# pivot

[src/groupedDataframe.js:129-139](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/groupedDataframe.js#L129-L139 "Source code on GitHub")

Pivot a GroupedDataFrame.

**Parameters**

-   `columnToPivot` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The column which will be transposed as columns.
-   `func` **\[[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)]** The function to define each column value from a DataFrame. (optional, default `(gdf)`)

**Examples**

```javascript
df.groupBy('carType').pivot('carModel', values => values.stat.sum('kms'))
```

Returns **[DataFrame](#dataframe)** The pivot DataFrame.

# melt

[src/groupedDataframe.js:149-171](https://github.com/Gmousse/dataframe-js/blob/a0683cbf6edf3fbb2b24c6140aba7b05fa0869e2/src/groupedDataframe.js#L149-L171 "Source code on GitHub")

Melt a DataFrame to make it tidy. It's the reverse of GroupedDataFrame.pivot().

**Parameters**

-   `variableColumnName` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** The column name containing columns. (optional, default `'variable'`)
-   `variableColumnName` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** The column name containing values. (optional, default `'value'`)
-   `valueColumnName`   (optional, default `'value'`)

**Examples**

```javascript
df.groupBy('carType').melt('kms')
```

Returns **[DataFrame](#dataframe)** The tidy DataFrame.
