# dataframe-js
**v0.2.0**

## Presentation

dataframe-js provides another way to work with data in javascript (browser or nodejs) by using DataFrame, a powerfull data structure already used in some languages (Spark, Python, R, ...).

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

**DataFrame is immutable** (lazy, for performance purposes). Then, each modification on DataFrame will return a new DataFrame decreasing side effects and making your data more secure.

**DataFrame is easy to use** with a simple API (closed to Spark or SQL) designed to manipulate data faster and easier than ever.

**DataFrame is flexible** because you can create DataFrames from multiple data format (array, object) and you can export your DataFrames into these (array, object, csv, json...).

**DataFrame is modulable** because you can use additional modules (Stat and Matrix by default) or create your own.

## Installation
via git:
`npm install git+https://github.com/Gmousse/dataframe-js.git`

via npm:
`npm install dataframe-js`

## Manual

dataframe-js contains a **principal core (DataFrame and Row)** and **two default modules (Stat and Matrix)**. Refer to this manual to use them. You can also directly read unit tests in `./tests/` or documented code in `./src/`.

### Core

#### DataFrame and Row API documentation: [Core API](./doc/CORE_API.md)

#### Usage:

To use dataframe-js, simply import the library. Then you can use DataFrame, Row or other Core components.

```javascript
import { DataFrame, Row } from 'dataframe-js';
```

To create a DataFrame, you have to pass your data and your column names. You can use different data structures as below:

```javascript
const df = new DataFrame(myData, myColumns);

const dfFromObjectOfArrays = new DataFrame({
    column1: [3, 6, 8], //<------ A column
    column2: [3, 4, 5, 6],
}, ['column1', 'column2']);

const dfFromArrayOfArrays = new DataFrame([
    [1, 6, 9, 10, 12], // <------- A row
    [1, 2],
    [6, 6, 9, 8, 9, 12],
], ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']);

const dfFromArrayOfObjects = new DataFrame([
    {c1: 1, c2: 6}, // <--- A row
    {c4: 1, c3: 2}
], ['c1', 'c2', 'c3', 'c4']);
```

If you don't pass column names, they will be infered from your data but **it's slower**:

```javascript
// here you don't pass column names
const dfFromObjectOfArrays = new DataFrame({
    column1: [3, 6, 8], //<------ A column
    column2: [3, 4, 5, 6],
});

console.log(dfFromObjectOfArrays.listColumns())
// ['column1', 'column2']

const dfFromArrayOfArrays = new DataFrame([
    [1, 6, 9, 10, 12], // <------- A row
    [1, 2],
    [6, 6, 9, 8, 9, 12],
]);

console.log(dfFromArrayOfArrays.listColumns())
// ['0', '1', '2', '3', '4', '5']


const dfFromArrayOfObjects = new DataFrame([
    {c1: 1, c2: 6}, // <--- A row
    {c4: 1, c3: 2}
]);

console.log(dfFromArrayOfObjects.listColumns())
// ['c1', 'c2', 'c3', 'c4']
```

Of course, you can do the reverse by exporting your DataFrame in another format by using:
* [.toDict()](./doc/CORE_API.md#DataFrame+toDict) ⇒ <code>Object</code>
* [.toArray()](./doc/CORE_API.md#DataFrame+toArray) ⇒ <code>Array</code>
* [.toText([sep], [header], [path])](./doc/CORE_API.md#DataFrame+toText) ⇒ <code>String</code>
* [.toCSV([header], [path])](./doc/CORE_API.md#DataFrame+toCSV) ⇒ <code>String</code>
* [.toJSON([path])](./doc/CORE_API.md#DataFrame+toJSON) ⇒ <code>String</code>

or you can debug by using:
* [.show([rows], [quiet])](./doc/CORE_API.md#DataFrame+show) ⇒ <code>String</code>

When you realize some operations on a DataFrame (or on a Row), it is never mutated. Indeed, when you modify a DataFrame (even if nothing change) you create a new instance of DataFrame. It's a bit slower but you avoid side effects:

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

console.log(Object.is(df2.dim(), df.dim()));
// false, they didn't have the same dimensions. df2 is no longer an instance of df.
console.log(
    Object.is(
        df2.map(row => row),
        df2
    )
);
// false. a modification of df2 send another instance of DataFrame, even if nothing change.

// if we create a new column
df2.withColumn('anewcolumn', row => row.get('column2') + 8);
console.log(
    df2.select('anewcolumn')
);
// NoSuchColumnError
// df2 wasn't mutated

```

For more informations about all DataFrame manipulations you can find the API below.

#### List of available methods and their examples:

* [DataFrame](./doc/CORE_API.md#DataFrame)
    * [new DataFrame(data, columns, [...modules])](#new_DataFrame_new)
    * [.toDict()](./doc/CORE_API.md#DataFrame+toDict) ⇒ <code>Object</code>
    * [.toArray()](./doc/CORE_API.md#DataFrame+toArray) ⇒ <code>Array</code>
    * [.toText([sep], [header], [path])](./doc/CORE_API.md#DataFrame+toText) ⇒ <code>String</code>
    * [.toCSV([header], [path])](./doc/CORE_API.md#DataFrame+toCSV) ⇒ <code>String</code>
    * [.toJSON([path])](./doc/CORE_API.md#DataFrame+toJSON) ⇒ <code>String</code>
    * [.push(...rows)](#DataFrame+push) ⇒ <code>[DataFrame](#DataFrame)</code>
    * [.dim()](./doc/CORE_API.md#DataFrame+dim) ⇒ <code>Array</code>
    * [.transpose()](./doc/CORE_API.md#DataFrame+transpose) ⇒ <code>ÐataFrame</code>
    * [.count()](./doc/CORE_API.md#DataFrame+count) ⇒ <code>Int</code>
    * [.countValue(valueToCount, [columnName])](./doc/CORE_API.md#DataFrame+countValue) ⇒ <code>Int</code>
    * [.show([rows], [quiet])](./doc/CORE_API.md#DataFrame+show) ⇒ <code>String</code>
    * [.replace(value, replacment, [...columnNames])](./doc/CORE_API.md#DataFrame+replace) ⇒ <code>[DataFrame](./doc/CORE_API.md#DataFrame)</code>
    * [.distinct(columnName)](./doc/CORE_API.md#DataFrame+distinct) ⇒ <code>Array</code>
    * [.unique(columnName)](./doc/CORE_API.md#DataFrame+unique) ⇒ <code>Array</code>
    * [.listColumns()](./doc/CORE_API.md#DataFrame+listColumns) ⇒ <code>Array</code>
    * [.select(...columnNames)](./doc/CORE_API.md#DataFrame+select) ⇒ <code>[DataFrame](./doc/CORE_API.md#DataFrame)</code>
    * [.withColumn(columnName, [func])](./doc/CORE_API.md#DataFrame+withColumn) ⇒ <code>[DataFrame](./doc/CORE_API.md#DataFrame)</code>
    * [.restructure(newColumnNames)](./doc/CORE_API.md#DataFrame+restructure) ⇒ <code>[DataFrame](./doc/CORE_API.md#DataFrame)</code>
    * [.rename(newColumnNames)](./doc/CORE_API.md#DataFrame+rename) ⇒ <code>[DataFrame](./doc/CORE_API.md#DataFrame)</code>
    * [.drop(columnName)](./doc/CORE_API.md#DataFrame+drop) ⇒ <code>[DataFrame](./doc/CORE_API.md#DataFrame)</code>
    * [.chain(...funcs)](./doc/CORE_API.md#DataFrame+chain) ⇒ <code>[DataFrame](./doc/CORE_API.md#DataFrame)</code>
    * [.filter(func)](./doc/CORE_API.md#DataFrame+filter) ⇒ <code>[DataFrame](./doc/CORE_API.md#DataFrame)</code>
    * [.where(func)](./doc/CORE_API.md#DataFrame+where) ⇒ <code>[DataFrame](./doc/CORE_API.md#DataFrame)</code>
    * [.find(condition)](./doc/CORE_API.md#DataFrame+find) ⇒ <code>[Row](./doc/CORE_API.md#Row)</code>
    * [.map(func)](./doc/CORE_API.md#DataFrame+map) ⇒ <code>[DataFrame](./doc/CORE_API.md#DataFrame)</code>
    * [.reduce(func, [init])](./doc/CORE_API.md#DataFrame+reduce) ⇒
    * [.reduceRight(func, [init])](./doc/CORE_API.md#DataFrame+reduceRight) ⇒
    * [.shuffle()](./doc/CORE_API.md#DataFrame+shuffle) ⇒ <code>[DataFrame](./doc/CORE_API.md#DataFrame)</code>
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


* [Row](./doc/CORE_API.md#Row)
    * [new Row(data, columns)](#new_Row_new)
    * [.toDict()](./doc/CORE_API.md#Row+toDict) ⇒ <code>Object</code>
    * [.toArray()](./doc/CORE_API.md#Row+toArray) ⇒ <code>Array</code>
    * [.size()](./doc/CORE_API.md#Row+size) ⇒ <code>Int</code>
    * [.has(columnName)](./doc/CORE_API.md#Row+has) ⇒ <code>Boolean</code>
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

If you want to change default modules (modules enabled in each DataFrame instance, such as Matrix and Stat) you can define them by a static method:

```javascript
DataFrame.setDefaultModules(fakeModule, Matrix);
```

If you want to create your own module, take a look at the Statisticical module (integrated by default) `./src/modules/stat.js` as example.

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
    * [.isCommutative(dfDim)](./doc/MODULES_API.md#Matrix+isCommutative) ⇒ <code>Boolean</code>
    * [.add(df)](./doc/MODULES_API.md#Matrix+add) ⇒ <code>DataFrame</code>
    * [.product(number)](./doc/MODULES_API.md#Matrix+product) ⇒ <code>DataFrame</code>
    * [.dot(df)](./doc/MODULES_API.md#Matrix+dot) ⇒ <code>DataFrame</code>

* [Stat](./doc/MODULES_API.md#Stat)
    * [new Stat(dataframe)](./doc/MODULES_API.md#new_Stat_new)
    * [.max(columnName)](./doc/MODULES_API.md#Stat+max) ⇒ <code>Number</code>
    * [.min(columnName)](./doc/MODULES_API.md#Stat+min) ⇒ <code>Number</code>²
    * [.mean(columnName)](./doc/MODULES_API.md#Stat+mean) ⇒ <code>Number</code>
    * [.var(columnName, [population])](./doc/MODULES_API.md#Stat+var) ⇒ <code>Number</code>
    * [.sd(columnName, [population])](./doc/MODULES_API.md#Stat+sd) ⇒ <code>Number</code>
    * [.stats(columnName)](./doc/MODULES_API.md#Stat+stats) ⇒ <code>Object</code>

## Contribution

[How to contribute ?](./CONTRIBUTING.md)
