# dataframe-js
**v1.0.0**

![](https://travis-ci.org/Gmousse/dataframe-js.svg?branch=develop)


**Official Website**: <https://gmousse.github.io/dataframe-js/>

**Changelog**: [1.0.0](https://github.com/Gmousse/dataframe-js/blob/master/CHANGELOG.md)


## Presentation

dataframe-js provides another way to work with data in javascript (browser or server side) by using DataFrame, a data structure already used in some languages (Spark, Python, R, ...).

A DataFrame is simply built on two concepts:
- **Columns** provide ways to select your data and reorganize them.
- **Rows** provide ways to modify or filter your data.

````javascript
const df = new DataFrame(data, columns)
df.show()
// DataFrame example
| column1   | column2   | column3   | // <--- Columns
------------------------------------
| 3         | 3         | undefined | // <--- Row
| 6         | 4         | undefined |
| 8         | 5         | undefined |
| undefined | 6         | undefined |
````

dataframe-js provides some **immutable objects** (DataFrame, Row...) and an API closed to **functional** programming and **SQL syntax**. You can sort, groupBy, join, and do complex manipulations with a simple sintax.

It is also compatible (import / export) with native JavaScript objects (Array, Hash...) and other formats (csv, json...).

To resume, dataframe-js contains:
  * A core:
    * DataFrame: Main Object, similar to sql table providing methods to manipulate and transform data.
    * Row: Object contained into a DataFrame, providing lower level manipulations.
    * GroupedDataFrame: DataFrame grouped by columns.


  * Some modules:
    * Stat: Basic statistics computations on DataFrame columns.
    * Matrix: Matrix computations (scalar products, ...).
    * SQL: SQL requests on DataFrame.

## Installation
via git: `npm install git+https://github.com/Gmousse/dataframe-js.git`

via npm: `npm install dataframe-js`

in the browser:
  * not minified: `<script src="https://cdn.rawgit.com/Gmousse/dataframe-js/master/lib/browser/dataframe.js"></script>`

  * minified: `<script src="https://cdn.rawgit.com/Gmousse/dataframe-js/master/lib/browser/dataframe-min.js"></script>`

## Usage

### Complete API documentation: [Index](https://gmousse.github.io/dataframe-js/doc/api.html)
  * Core: [DataFrame](https://gmousse.github.io/dataframe-js/doc/api.html#dataframe), [Row](https://gmousse.github.io/dataframe-js/doc/api.html#row), [GroupedDataFrame](https://gmousse.github.io/dataframe-js/doc/api.html#groupeddataframe)
  * Modules: [Stat](https://gmousse.github.io/dataframe-js/doc/api.html#stat), [Matrix](https://gmousse.github.io/dataframe-js/doc/api.html#matrix), [SQL](https://gmousse.github.io/dataframe-js/doc/api.html#sql)

### Examples

[A simple use of DataFrame for data exploration tasks](https://github.com/Gmousse/dataframe-js/blob/master/examples/titanic_analysis.js)

[Unit tests](https://github.com/Gmousse/dataframe-js/blob/master/tests/)

### Import

```javascript
// es6
import { DataFrame, Row } from 'dataframe-js';
// es5
var DataFrame = require('dataframe-js').DataFrame;
// Browser
var DataFrame = dfjs.DataFrame;
```

### Core usage

#### DataFrame Creation

You can create a DataFrame by using mutiple ways:

```javascript
const df = new DataFrame(data, columns);

// From a collection (easier)
const df = new DataFrame([
    {c1: 1, c2: 6}, // <------- A row
    {c4: 1, c3: 2}
], ['c1', 'c2', 'c3', 'c4']);

// From a table
const df = new DataFrame([
    [1, 6, 9, 10, 12], // <------- A row
    [1, 2],
    [6, 6, 9, 8, 9, 12],
], ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']);

// From a dictionnary (Hash)
const df = new DataFrame({
    column1: [3, 6, 8], // <------ A column
    column2: [3, 4, 5, 6],
}, ['column1', 'column2']);

// From files
DataFrame.fromText('file://my/absolue/path/myfile.txt').then(df => df);
DataFrame.fromCSV('http://myurl/myfile.csv').then(df => df);
DataFrame.fromJSON('http://myurl/myfile.json').then(df => df);
```
Complete list:
[DataFrame](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#constructor)
[DataFrame.fromText()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame.fromText),
[DataFrame.fromCSV()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame.fromCSV),
[DataFrame.fromJSON()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame.fromJSON)

#### DataFrame Export

In the same way, you can also export or convert your DataFrame in files or in JavaScript Objects:

```javascript
const df = new DataFrame(data, columns);

// To native objects
df.toCollection();
df.toArray();
df.toDict();

// To files
DataFrame.toText(true, ';', '/my/absolue/path/myfile.txt');
DataFrame.toCSV('file://my/absolue/path/myfile.csv');
DataFrame.toJSON('/my/absolue/path/myfile.json');
```
Complete list:
[.toDict()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#toDict),
[.toArray()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#toArray),
[.toCollection()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#toCollection),
[.toText()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#toText),
[.toCSV()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#toCSV),
[.toJSON()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#toJSON)

#### DataFrame usage

The main Object of the dataframe-js library is the [DataFrame](https://gmousse.github.io/dataframe-js/doc/api.html#dataframe).
It provides 3 types of methods:

Informations, giving details about your DataFrame.
````js
// Some examples
df.show();
df.dim();
````
Complete list:
[.show()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#show),
[.dim()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#dim),
[.count()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#count),
[.listColumns()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#listColumns)

Columns manipulations, which provide solutions to select, reorganize, cast, join or analyze your data...
````js
// Some examples
df.select('column1', 'column3');
df.cast('column3', String);
df.distinct('column2');
df.innerJoin(df2, ['column2', 'column3']);
````
Complete list:
[.select()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#select),
[.withColumn()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#withColumn),
[.countValue()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#countValue),
[.distinct()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#distinct),
[.unique()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#unique),
[.restructure()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#restructure),
[.rename()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#rename),
[.renameAll()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#renameAll),
[.cast()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#cast),
[.castAll()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#castAll),
[.drop()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#drop),
[.groupBy()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#groupBy),
[.sortBy()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#sortBy),
[.join()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#join),
[.innerJoin()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#innerJoin),
[.outerJoin()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#outerJoin),
[.fullJoin()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#fullJoin),
[.leftJoin()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#leftJoin),
[.rightJoin()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#rightJoin)

Rows manipulations, which provide ways to filter, modify, join, complete your data...
````js
// Some examples
df.push([1, 2, 3], [4, 5, 6]);
df.map(row => row.set('column2', row.get('column1') * 2));
df.filter(row => row.get('column2') !== 4);
df.union(df2);
````
Complete list:
[.transpose()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#transpose),
[.push()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#push),
[.replace()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#replace),
[.chain()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#chain),
[.map()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#map),
[.filter()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#filter),
[.where()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#where),
[.find()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#find),
[.reduce()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#reduce),
[.reduceRight()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#reduceRight),
[.dropDuplicates()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#dropDuplicates),
[.shuffle()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#shuffle),
[.sample()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#sample),
[.union()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#union)

#### Rows Usage

As you could see, the Row api is used for example with [.map()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#map),
, [.filter()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#filter) DataFrame Rows methods.

The Row API provides simple manipulations, to get, set delete or check data in each line of your DataFrames.
````js
// Some examples
row.get('column1');
row.set('column2', newValue);
````
Complete list:
[Row](https://gmousse.github.io/dataframe-js/doc/api.html#Row#constructor),
[.get()](https://gmousse.github.io/dataframe-js/doc/api.html#Row#get),
[.set()](https://gmousse.github.io/dataframe-js/doc/api.html#Row#set),
[.select()](https://gmousse.github.io/dataframe-js/doc/api.html#Row#select),
[.delete()](https://gmousse.github.io/dataframe-js/doc/api.html#Row#delete),
[.has()](https://gmousse.github.io/dataframe-js/doc/api.html#Row#has),
[.toDict()](https://gmousse.github.io/dataframe-js/doc/api.html#Row#todict),
[.toArray()](https://gmousse.github.io/dataframe-js/doc/api.html#Row#toarray)

#### GroupedDataFrame Usage

When you use the DataFrame [.groupBy()](https://gmousse.github.io/dataframe-js/doc/api.html#DataFrame#groupBy) method,  a new GroupedDataFrame object is created.
It can be used to create DataFrame aggregations (like SQL) in order to resume your data.

Each group in the GroupedDataFrame is a DataFrame. When you aggregate a GroupedDataFrame Object, you get a DataFrame with one line per group, and with a new column "aggregation".
````js
// Some examples
const groupedDF = df.groupBy('column1', 'column2');
groupedDF.aggregate(group => group.count()).rename('aggregation', 'groupCount');
df.groupBy('column2', 'column3').aggregate(group => group.stat.mean('column4')).rename('aggregation', 'groupMean');
````
Complete list:
[GroupedDataFrame](https://gmousse.github.io/dataframe-js/doc/api.html#GroupedDataFrame#constructor),
[.toCollection()](https://gmousse.github.io/dataframe-js/doc/api.html#GroupedDataFrame#toCollection),
[.show()](https://gmousse.github.io/dataframe-js/doc/api.html#GroupedDataFrame#show),
[.listGroups()](https://gmousse.github.io/dataframe-js/doc/api.html#GroupedDataFrame#listGroups),
[.listHashs()](https://gmousse.github.io/dataframe-js/doc/api.html#GroupedDataFrame#listHashs),
[.aggregate()](https://gmousse.github.io/dataframe-js/doc/api.html#GroupedDataFrame#aggregate)


### Modules Usage

dataframe-js can increase DataFrame API by using modules. Some modules are included by default, but you can also create your own.

#### Default modules usage

The [Stat](https://gmousse.github.io/dataframe-js/doc/api.html#stat)
 module provides basic statistical computations on a DataFrame columns.

````js
// Some examples
df.stat.max('column1');
df.stat.mean('column1');
````
Complete list:
[.min()](https://gmousse.github.io/dataframe-js/doc/api.html#Stat#min),
[.max()](https://gmousse.github.io/dataframe-js/doc/api.html#Stat#max),
[.sum()](https://gmousse.github.io/dataframe-js/doc/api.html#Stat#sum),
[.mean()](https://gmousse.github.io/dataframe-js/doc/api.html#Stat#mean),
[.average()](https://gmousse.github.io/dataframe-js/doc/api.html#Stat#average),
[.var()](https://gmousse.github.io/dataframe-js/doc/api.html#Stat#var),
[.sd()](https://gmousse.github.io/dataframe-js/doc/api.html#Stat#sd),
[.stats()](https://gmousse.github.io/dataframe-js/doc/api.html#Stat#stats)


The [Matrix](https://gmousse.github.io/dataframe-js/doc/api.html#matrix) module provides mathematical matrix operations between DataFrames.

````js
// Some examples
df.matrix.add(df2);
df.matrix.product(8);
df.matrix.dot(df2);
````
Complete list:
[.isCommutative()](https://gmousse.github.io/dataframe-js/doc/api.html#Matrix#isCommutative),
[.product()](https://gmousse.github.io/dataframe-js/doc/api.html#Matrix#product),
[.dot()](https://gmousse.github.io/dataframe-js/doc/api.html#Matrix#dot),
[.add()](https://gmousse.github.io/dataframe-js/doc/api.html#Matrix#add)

To finish, the [SQL](https://gmousse.github.io/dataframe-js/doc/api.html#sql) module allows you to register temporary tables and to request on these, by using SQL syntax.

````js
// Some examples
// Register a tmp table
df.sql.register('tmp2')
DataFrame.sql.registerTable(df, 'tmp2')
// Request on Table
DataFrame.sql.request('SELECT * FROM tmp2 WHERE column1 = 6')
````
Complete list:
[.register()](https://gmousse.github.io/dataframe-js/doc/api.html#SQL#register),
[DataFrame.registerTable()](https://gmousse.github.io/dataframe-js/doc/api.html#SQL.registerTable),
[DataFrame.request()](https://gmousse.github.io/dataframe-js/doc/api.html#SQL.request),
[DataFrame.listTables()](https://gmousse.github.io/dataframe-js/doc/api.html#SQL.listTables),
[DataFrame.dropTable()](https://gmousse.github.io/dataframe-js/doc/api.html#SQL.dropTable),
[DataFrame.dropTables()](https://gmousse.github.io/dataframe-js/doc/api.html#SQL.dropTables),
[DataFrame.renameTable()](https://gmousse.github.io/dataframe-js/doc/api.html#SQL.renameTable)

#### Modules creation

Each module is a class with a constructor taking dataframe as parameter, and having a df and a name properties:

```javascript
class FakeModule {
    constructor(dataframe) {
        this.df = dataframe;
        this.name = 'fakemodule';
    }

    test(x) {
        return this.df.withColumn('test', row => row.set('test', x * 2));
    }
}
```

#### Modules registration

You can register modules when you instantiate a DataFrame:

```javascript
const df = new DataFrame(data, ['column1', 'column2', 'column3'], FakeModule, AnotherModule)
// You can call module by its name
df.fakemodule.test(4)

console.log(df.modules);
// [SQL, Matrix, Stat, FakeModule, AnotherModule]
```

You can also set default modules:

````javascript
DataFrame.setDefaultModules(FakeModule, Matrix);
const df = new DataFrame(data, ['column1', 'column2', 'column3'])

console.log(df.modules);
// [FakeModule, Matrix]
````


## Contribution

[How to contribute ?](https://github.com/Gmousse/dataframe-js/blob/master/CONTRIBUTING.md)
