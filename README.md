# dataframe-js
**v1.0.0**

## Presentation

dataframe-js provides another way to work with data in javascript (browser or server side) by using DataFrame, a data structure already used in some languages (Python, R, ...).

A DataFrame is simply built on two concepts:
- **Columns** providing ways to select your data and reorganize them.
- **Rows** providing ways to modify or filter your data.

````javascript
const df = new DataFrame(rawData, columns)
df.show()
// DataFrame example
| column1   | column2   | column3   | <--- Columns
------------------------------------
| 3         | 3         | undefined | <--- Row
| 6         | 4         | undefined |
| 8         | 5         | undefined |
| undefined | 6         | undefined |
````

dataframe-js provides some **immutable objects** (DataFrame, Row...) and an API closed to **functional** programming and **SQL syntax**.

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
  * not mifinied: `<script src="https://raw.githubusercontent.com/Gmousse/dataframe-js/master/lib/browser/dataframe.js"></script>`

  * minified: `<script src="https://raw.githubusercontent.com/Gmousse/dataframe-js/master/lib/browser/dataframe-min.js"></script>`

## Usage

Complete API documentation:
  * Core: [DataFrame](./doc/md-api/dataframe.md#DataFrame), [Row](./doc/md-api/row.md#Row), [GroupedDataFrame](./doc/md-api/groupedDataframe.md#GroupedDataFrame)
  * Modules: [Stat](./doc/md-api/modules/stat.md#Stat), [Matrix](./doc/md-api/modules/matrix.md#Matrix), [SQL](./doc/md-api/modules/sql.md#SQL)

### Import

```javascript
// es6
import { DataFrame, Row } from 'dataframe-js';
// es5
var DataFrame = require('dataframe-js').DataFrame;
// Browser
var DataFrame = dfjs.DataFrame;
```

### DataFrame usage

#### Creation

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
const dfFromObjectOfArrays = new DataFrame({
    column1: [3, 6, 8], // <------ A column
    column2: [3, 4, 5, 6],
}, ['column1', 'column2']);
```

#### Export

[.toDict()](./doc/md-api/dataframe.md#todict),
[.toArray()](./doc/md-api/dataframe.md#toarray),
[.toCollection()](./doc/md-api/dataframe.md#tocollection),
[.toText()](./doc/md-api/dataframe.md#totext),
[.toCSV()](./doc/md-api/dataframe.md#tocsv),
[.toJSON()](./doc/md-api/dataframe.md#tojson)

#### Working with all the DataFrame

[.show()](./doc/md-api/dataframe.md#show),
[.dim()](./doc/md-api/dataframe.md#dim),
[.transpose()](./doc/md-api/dataframe.md#transpose)

#### Working with columns

[.listColumns()](./doc/md-api/dataframe.md#listcolumns),
[.select()](./doc/md-api/dataframe.md#select),
[.withColumn()](./doc/md-api/dataframe.md#withcolumn),
[.countValue()](./doc/md-api/dataframe.md#countvalue),
[.distinct()](./doc/md-api/dataframe.md#distinct),
[.unique()](./doc/md-api/dataframe.md#unique),
[.restructure()](./doc/md-api/dataframe.md#restructure),
[.rename()](./doc/md-api/dataframe.md#rename),
[.renameAll()](./doc/md-api/dataframe.md#renameall),
[.cast()](./doc/md-api/dataframe.md#cast),
[.castAll()](./doc/md-api/dataframe.md#castall),
[.drop()](./doc/md-api/dataframe.md#drop),

#### Working with Rows

[.count()](./doc/md-api/dataframe.md#count),
[.push()](./doc/md-api/dataframe.md#push),
[.replace()](./doc/md-api/dataframe.md#replace),
[.chain()](./doc/md-api/dataframe.md#chain),
[.map()](./doc/md-api/dataframe.md#map),
[.filter()](./doc/md-api/dataframe.md#filter),
[.where()](./doc/md-api/dataframe.md#where),
[.find()](./doc/md-api/dataframe.md#find),
[.reduce()](./doc/md-api/dataframe.md#reduce),
[.reduceRight()](./doc/md-api/dataframe.md#reducebight),
[.shuffle()](./doc/md-api/dataframe.md#shuffle),
[.sample()](./doc/md-api/dataframe.md#sample),
[.groupBy()](./doc/md-api/dataframe.md#groupby),
[.sortBy()](./doc/md-api/dataframe.md#sortby),
[.union()](./doc/md-api/dataframe.md#union),
[.join()](./doc/md-api/dataframe.md#join),
[.innerJoin()](./doc/md-api/dataframe.md#innerjoin),
[.outerJoin()](./doc/md-api/dataframe.md#outerjoin),
[.fullJoin()](./doc/md-api/dataframe.md#fulljoin),
[.leftJoin()](./doc/md-api/dataframe.md#leftjoin),
[.rightJoin()](./doc/md-api/dataframe.md#rightjoin)

#### Working with default modules

**Stat**

This module provides basic statistics computations on a DataFrame columns.

````js
df.stat
````

[.min()](./doc/md-api/modules/sql.md#min),
[.max()](./doc/md-api/modules/sql.md#max),
[.sum()](./doc/md-api/modules/sql.md#sum),
[.mean()](./doc/md-api/modules/sql.md#mean),
[.average()](./doc/md-api/modules/sql.md#average),
[.var()](./doc/md-api/modules/sql.md#var),
[.sd()](./doc/md-api/modules/sql.md#sd)
[.stats()](./doc/md-api/modules/sql.md#stats)

**Matrix**

This module provides matrix operations between DataFrames.

````js
df.matrix
````

[.isCommutative()](./doc/md-api/modules/matrix.md#iscommutative),
[.product()](./doc/md-api/modules/matrix.md#product),
[.dot()](./doc/md-api/modules/matrix.md#dot),
[.add()](./doc/md-api/modules/matrix.md#add)


**SQL**

This module allows you to register temporary tables and to request on these, by using SQL syntax.

````js
df.sql

// Register a tmp table
df.sql.register('tmp2')
DataFrame.sql.registerTable(df, 'tmp2')

// Request on Table
DataFrame.sql.request('SELECT * FROM tmp2 WHERE column1 = 6')
````

[.register()](./doc/md-api/modules/sql.md#register),
[DataFrame.registerTable()](./doc/md-api/modules/sql.md#registerTable),
[DataFrame.request()](./doc/md-api/modules/sql.md#request),
[DataFrame.listTables()](./doc/md-api/modules/sql.md#listtables),
[DataFrame.dropTable()](./doc/md-api/modules/sql.md#droptable),
[DataFrame.dropTables()](./doc/md-api/modules/sql.md#droptables),
[DataFrame.renameTable()](./doc/md-api/modules/sql.md#renametable)


### Modules Usage

#### Modules registration

You can register modules when you instanciate a DataFrame:

```javascript
const df = new DataFrame(data, ['column1', 'column2', 'column3'], FakeModule, AnotherModule)
// You can call module by its name
df.fakemodule.test(4)

console.log(df.modules);
// [SQL, Matrix, Stat, FakeModule, AnotherModule]
```

You can also set defaultModules:

````javascript
DataFrame.setDefaultModules(FakeModule, Matrix);
const df = new DataFrame(data, ['column1', 'column2', 'column3'])

console.log(df.modules);
// [FakeModule, Matrix]
````

#### Modules creation

Each module is a class with a constructor taking dataframe as parameter, and having df and name properties:

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

## Contribution

[How to contribute ?](./CONTRIBUTING.md)
