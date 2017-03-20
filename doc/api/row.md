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
