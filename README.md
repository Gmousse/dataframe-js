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
  * not minified: `<script src="https://cdn.rawgit.com/Gmousse/dataframe-js/feature/sql/lib/browser/dataframe.js"></script>`

  * minified: `<script src="https://cdn.rawgit.com/Gmousse/dataframe-js/feature/sql/lib/browser/dataframe-min.js"></script>`

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

// From files
DataFrame.fromText('file://my/absolue/path/myfile.txt').then(df => df)
DataFrame.fromCSV('http://myurl/myfile.csv').then(df => df)
DataFrame.fromJSON('http://myurl/myfile.json').then(df => df)
```

#### API detail

[Import](./doc/md-api/index.md#import)

[Export](./doc/md-api/index.md#export)

[Working with all the DataFrame](./doc/md-api/index.md#dataframe)

[Working with columns](./doc/md-api/index.md#columns)

[Working with Rows](./doc/md-api/index.md#rows)

#### Working with Rows


### Modules Usage

#### Default modules

**Stat** [api](./doc/md-api/index.md#stat)

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

**Matrix** [api](./doc/md-api/index.md#matrix)

This module provides matrix operations between DataFrames.

````js
df.matrix
````

[.isCommutative()](./doc/md-api/modules/matrix.md#iscommutative),
[.product()](./doc/md-api/modules/matrix.md#product),
[.dot()](./doc/md-api/modules/matrix.md#dot),
[.add()](./doc/md-api/modules/matrix.md#add)


**SQL** [api](./doc/md-api/index.md#sql)

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



## Contribution

[How to contribute ?](./CONTRIBUTING.md)
