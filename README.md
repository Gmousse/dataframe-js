# dataframe-js
**v0.1.0**

## Presentation

dataframe-js provides another way to work with data by using DataFrame, a powerfull data structure already used in some languages (Spark, Python, R, ...).

A DataFrame is simply built on two concepts:
- **Columns** providing ways to select your data and reorganize them.
- **Rows** providing ways to modify or filter your data.

````javascript
// DataFrame example
| column1   | column2   | column3   | <--- Columns
------------------------------------
| 3         | 3         | undefined | <--- Row
| 6         | 4         | undefined |
| 8         | 5         | undefined |
| undefined | 6         | undefined |
````

**DataFrame is immutable** (lazy, for performance purposes). Then, each modification on DataFrame will return a new DataFrame decreasing bug risks and making your data more secure.

**DataFrame is easy to use** with a simple API (closed to Spark or SQL) designed to manipulate data faster and easier than ever.

**DataFrame is flexible** because you can switch from or to arrays and dictionnaries (hash, object) when you want.

**DataFrame is modulable** because you can use additional modules (Stat and Matrix by default) or create your own.

## Installation

`npm install git+http://93.15.96.71:10080/odin/dataframe-js.git#feature/begin`

## Manual

dataframe-js contains a **principal core (DataFrame and Row)** and **two default modules (Stat and Matrix)**. Refer to this manual to use them. You can also directly read unit tests in `./tests/` or documented code in `./src/`.

### Core

#### DataFrame and Row API documentation: [Core API](./doc/CORE_API.md)

#### Usage:

To use dataframe-js, simply import the library. Then you can use DataFrame, Row or other Core components.

```javascript
import { DataFrame } from 'dataframe-js';

const df = new DataFrame(myData, myColumns);
```

When you realize some operations on a DataFrame (or on a Row), it is never mutated. Indeed, when you modify a DataFrame (even if nothing change) you create a new instance of DataFrame. It's a bit slower but you avoid side effects.

Examples:
```javascript
// When you change the DataFrame structure, the original DataFrame doesn't change.
df.drop('column1'); // <--- Here you drop a column.
console.log(df.listColumns());
// But nothing change in df.
// You didn't mutated it. You just have created a new instance of DataFrame.
// ['column1', 'column2', 'column3']

// Here you declare a new variable (const) to save the modified df.
const df2 = df.drop('column1');
console.log(df2.listColumns());
// ['column2', 'column3']

console.log(Object.is(df2, df));
// false. df2 is no longer an instance of df.
console.log(
    Object.is(
        df.map(row => row.set('colum2', row.get('column2') + 8)),
        df2
    )
);
// false. a modification of df2 send another instance of DataFrame

```

#### List of available methods:

* [DataFrame](./doc/CORE_API.md#DataFrame)
    * [new DataFrame(data, columns, [...modules])](./doc/CORE_API.md#new_DataFrame_new)
    * [.toDict()](./doc/CORE_API.md#DataFrame+toDict) ⇒ <code>Object</code>
    * [.toArray()](./doc/CORE_API.md#DataFrame+toArray) ⇒ <code>Array</code>
    * [.show([rows], [quiet])](./doc/CORE_API.md#DataFrame+show) ⇒ <code>String</code>
    * [.dim()](./doc/CORE_API.md#DataFrame+dim) ⇒ <code>Array</code>
    * [.count()](./doc/CORE_API.md#DataFrame+count) ⇒ <code>Int</code>
    * [.countValue(valueToCount, [columnName])](./doc/CORE_API.md#DataFrame+countValue) ⇒ <code>Int</code>
    * [.replace(value, replacment, [...columnNames])](./doc/CORE_API.md#DataFrame+replace) ⇒ <code>[DataFrame](./doc/CORE_API.md#DataFrame)</code>
    * [.distinct(columnName)](./doc/CORE_API.md#DataFrame+distinct) ⇒ <code>Array</code>
    * [.listColumns()](./doc/CORE_API.md#DataFrame+listColumns) ⇒ <code>Array</code>
    * [.select(...columnNames)](./doc/CORE_API.md#DataFrame+select) ⇒ <code>[DataFrame](./doc/CORE_API.md#DataFrame)</code>
    * [.withColumn(columnName, [func])](./doc/CORE_API.md#DataFrame+withColumn) ⇒ <code>[DataFrame](./doc/CORE_API.md#DataFrame)</code>
    * [.restructure(...columnNames)](./doc/CORE_API.md#DataFrame+restructure) ⇒ <code>[DataFrame](./doc/CORE_API.md#DataFrame)</code>
    * [.rename(...columnNames)](./doc/CORE_API.md#DataFrame+rename) ⇒ <code>[DataFrame](./doc/CORE_API.md#DataFrame)</code>
    * [.drop(columnName)](./doc/CORE_API.md#DataFrame+drop) ⇒ <code>[DataFrame](./doc/CORE_API.md#DataFrame)</code>
    * [.chain(...funcs)](./doc/CORE_API.md#DataFrame+chain) ⇒ <code>[DataFrame](./doc/CORE_API.md#DataFrame)</code>
    * [.filter(func)](./doc/CORE_API.md#DataFrame+filter) ⇒ <code>[DataFrame](./doc/CORE_API.md#DataFrame)</code>
    * [.map(func)](./doc/CORE_API.md#DataFrame+map) ⇒ <code>[DataFrame](./doc/CORE_API.md#DataFrame)</code>
    * [.reduce(func, [init])](./doc/CORE_API.md#DataFrame+reduce) ⇒
    * [.reduceRight(func, [init])](./doc/CORE_API.md#DataFrame+reduceRight) ⇒
    * [.sample(percentage)](./doc/CORE_API.md#DataFrame+sample) ⇒ <code>[DataFrame](./doc/CORE_API.md#DataFrame)</code>
    * [.randomSplit(percentage)](./doc/CORE_API.md#DataFrame+randomSplit) ⇒ <code>Array</code>
    * [.groupBy(columnName)](./doc/CORE_API.md#DataFrame+groupBy) ⇒ <code>Array</code>
    * [.sortBy(columnName, [reverse])](./doc/CORE_API.md#DataFrame+sortBy) ⇒ <code>[DataFrame](./doc/CORE_API.md#DataFrame)</code>
    * [.union(dfToUnion)](./doc/CORE_API.md#DataFrame+union) ⇒ <code>[DataFrame](./doc/CORE_API.md#DataFrame)</code>
    * [.join(dfToJoin, on, [how])](./doc/CORE_API.md#DataFrame+join) ⇒ <code>[DataFrame](./doc/CORE_API.md#DataFrame)</code>
    * [.innerJoin(dfToJoin, on)](./doc/CORE_API.md#DataFrame+innerJoin) ⇒ <code>[DataFrame](./doc/CORE_API.md#DataFrame)</code>
    * [.fullJoin(dfToJoin, on)](./doc/CORE_API.md#DataFrame+fullJoin) ⇒ <code>[DataFrame](./doc/CORE_API.md#DataFrame)</code>
    * [.outerJoin(dfToJoin, on)](./doc/CORE_API.md#DataFrame+outerJoin) ⇒ <code>[DataFrame](./doc/CORE_API.md#DataFrame)</code>
    * [.leftJoin(dfToJoin, on)](./doc/CORE_API.md#DataFrame+leftJoin) ⇒ <code>[DataFrame](./doc/CORE_API.md#DataFrame)</code>
    * [.rightJoin(dfToJoin, on)](./doc/CORE_API.md#DataFrame+rightJoin) ⇒ <code>[DataFrame](./doc/CORE_API.md#DataFrame)</code>


* [Row](./doc/CORE_API.md./doc/MODULES_API.md#Row)
    * [new Row(data, columns)](./doc/CORE_API.md#new_Row_new)
    * [.toDict()](./doc/CORE_API.md#Row+toDict) ⇒ <code>Object</code>
    * [.toArray()](./doc/CORE_API.md#Row+toArray) ⇒ <code>Array</code>
    * [.size()](./doc/CORE_API.md#Row+size) ⇒ <code>Int</code>
    * [.select(...columnNames)](./doc/CORE_API.md#Row+select) ⇒ <code>[Row](./doc/CORE_API.md#Row)</code>
    * [.get(columnToGet)](./doc/CORE_API.md#Row+get) ⇒
    * [.set(columnToSet)](./doc/CORE_API.md#Row+set) ⇒ <code>[Row](./doc/CORE_API.md#Row)</code>
    * [.delete(columnToDel)](./doc/CORE_API.md#Row+delete) ⇒ <code>[Row](./doc/CORE_API.md#Row)</code>



### Modules

#### Stat and Matrix modules API documentation: [Modules API](./doc/MODULES_API.md)

#### Usage:

dataframe-js is designed to easily create and add modules in order to extends DataFrame tools.

When you start an instance of DataFrame you can also pass modules which be available by calling their names.

```javascript
// Here you add two modules on your DataFrame instance.
const df = new DataFrame(obj, ['column1', 'column2', 'column3'], fakeModule, anotherModule)
// You can call modules by their names
df.fakemodule.test(4)
```

Modules will be also available for each DataFrame created from your first instance, avoiding to redeclare your modules each time you create a DataFrame.

```javascript
// You create a second DataFrame from the last one.
const df2 = df.withColumn('column4', (row) => row.get('column2') * 2)
// This second DataFrame will have acces to the same modules.
df.fakemodule.test(8)
```

If you want to create your own module, look at the Statisticical module (integrated by default) `./src/modules/stat.js` as example.

A simple example of a module structure:

```javascript
class fakeModule {
    constructor(dataframe) {
        this.df = dataframe;
        this.name = 'fakemodule';
    }

    test(x) {
        return this.df.withColumn('test', row => row.set('test', x * 2));
    }
}
```

#### List of available modules

* [Matrix](./doc/MODULES_API.md#Matrix)
    * [new Matrix(dataframe)](./doc/MODULES_API.md#new_Matrix_new)
    * [.hasSameStruct(df)](./doc/MODULES_API.md#Matrix+hasSameStruct) ⇒ <code>Boolean</code>
    * [.hasSameTransposedStruct(df)](./doc/MODULES_API.md#Matrix+hasSameTransposedStruct) ⇒ <code>Boolean</code>
    * [.add(df)](./doc/MODULES_API.md#Matrix+add) ⇒ <code>DataFrame</code>
    * [.product(number)](./doc/MODULES_API.md#Matrix+product) ⇒ <code>DataFrame</code>
    * [.dot(df)](./doc/MODULES_API.md#Matrix+dot) ⇒ <code>DataFrame</code>
    * [.transpose()](./doc/MODULES_API.md#Matrix+transpose) ⇒ <code>ÐataFrame</code>

* [Stat](./doc/MODULES_API.md#Stat)
    * [new Stat(dataframe)](./doc/MODULES_API.md#new_Stat_new)
    * [.max(columnName)](./doc/MODULES_API.md#Stat+max) ⇒ <code>Number</code>
    * [.min(columnName)](./doc/MODULES_API.md#Stat+min) ⇒ <code>Number</code>²
    * [.mean(columnName)](./doc/MODULES_API.md#Stat+mean) ⇒ <code>Number</code>
    * [.var(columnName, [population])](./doc/MODULES_API.md#Stat+var) ⇒ <code>Number</code>
    * [.sd(columnName, [population])](./doc/MODULES_API.md#Stat+sd) ⇒ <code>Number</code>
    * [.stats(columnName)](./doc/MODULES_API.md#Stat+stats) ⇒ <code>Object</code>

## Contribution
