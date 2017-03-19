# groupedDataframe

[src/groupedDataframe.js:10-172](https://github.com/Gmousse/dataframe-js/blob/e94a9f98ab27367bfc487f364b54b02bf0e77bd1/src/groupedDataframe.js#L10-L172 "Source code on GitHub")

Grouped DataFrame structure grouping DataFrame rows by column value.

# constructor

[src/groupedDataframe.js:21-25](https://github.com/Gmousse/dataframe-js/blob/e94a9f98ab27367bfc487f364b54b02bf0e77bd1/src/groupedDataframe.js#L21-L25 "Source code on GitHub")

Create a GroupedDataFrame. Used in DataFrame.groupBy('columnName').

**Parameters**

-   `df` **DataFrame** The DataFrame to group by.
-   `columnName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The column used for the group by.
-   `columnNames` **...Any** 

**Examples**

```javascript
df.groupBy('column1');
//or
new GroupedDataFrame(df, 'column1');
```

# toCollection

[src/groupedDataframe.js:63-65](https://github.com/Gmousse/dataframe-js/blob/e94a9f98ab27367bfc487f364b54b02bf0e77bd1/src/groupedDataframe.js#L63-L65 "Source code on GitHub")

Convert GroupedDataFrame into collection (Array) of dictionnaries (Object).

**Examples**

```javascript
groupedDF.toCollection();
```

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** An Array containing group: {groupKey, group}.

# show

[src/groupedDataframe.js:74-82](https://github.com/Gmousse/dataframe-js/blob/e94a9f98ab27367bfc487f364b54b02bf0e77bd1/src/groupedDataframe.js#L74-L82 "Source code on GitHub")

Display the GroupedDataFrame as String Table.

**Parameters**

-   `quiet` **\[[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** Quiet mode. If true, it doesn't trigger console.log(). (optional, default `false`)

**Examples**

```javascript
groupedDf.show()
```

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The GroupedDataFrame as String Table.

# listGroups

[src/groupedDataframe.js:90-92](https://github.com/Gmousse/dataframe-js/blob/e94a9f98ab27367bfc487f364b54b02bf0e77bd1/src/groupedDataframe.js#L90-L92 "Source code on GitHub")

List GroupedDataFrame groups.

**Examples**

```javascript
gdf.listGroups()
```

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** An Array containing GroupedDataFrame group names.

# listHashs

[src/groupedDataframe.js:100-102](https://github.com/Gmousse/dataframe-js/blob/e94a9f98ab27367bfc487f364b54b02bf0e77bd1/src/groupedDataframe.js#L100-L102 "Source code on GitHub")

List GroupedDataFrame groups as a hashCode.

**Examples**

```javascript
gdf.listHashCodes()
```

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** An Array containing GroupedDataFrame hash codes.

# aggregate

[src/groupedDataframe.js:113-118](https://github.com/Gmousse/dataframe-js/blob/e94a9f98ab27367bfc487f364b54b02bf0e77bd1/src/groupedDataframe.js#L113-L118 "Source code on GitHub")

Create an aggregation from a function.

**Parameters**

-   `func` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** The aggregation function.
-   `columnName` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** The column name created by the aggregation. (optional, default `'aggregation'`)

**Examples**

```javascript
groupedDF.aggregate(group => group.stat.sum('column1'));
```

Returns **DataFrame** A new DataFrame with a column 'aggregation' containing the result.

# pivot

[src/groupedDataframe.js:129-139](https://github.com/Gmousse/dataframe-js/blob/e94a9f98ab27367bfc487f364b54b02bf0e77bd1/src/groupedDataframe.js#L129-L139 "Source code on GitHub")

Pivot a GroupedDataFrame.

**Parameters**

-   `columnToPivot` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The column which will be transposed as columns.
-   `func` **\[[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)]** The function to define each column value from a DataFrame. (optional, default `(gdf)`)

**Examples**

```javascript
df.groupBy('carType').pivot('carModel', values => values.stat.sum('kms'))
```

Returns **DataFrame** The pivot DataFrame.

# melt

[src/groupedDataframe.js:149-171](https://github.com/Gmousse/dataframe-js/blob/e94a9f98ab27367bfc487f364b54b02bf0e77bd1/src/groupedDataframe.js#L149-L171 "Source code on GitHub")

Melt a DataFrame to make it tidy. It's the reverse of GroupedDataFrame.pivot().

**Parameters**

-   `variableColumnName` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** The column name containing columns. (optional, default `'variable'`)
-   `variableColumnName` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** The column name containing values. (optional, default `'value'`)
-   `valueColumnName`   (optional, default `'value'`)

**Examples**

```javascript
df.groupBy('carType').melt('kms')
```

Returns **DataFrame** The tidy DataFrame.
