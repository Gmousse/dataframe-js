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
console.log(df.columns);
// But nothing change in df.
// You didn't mutated it. You just have created a new instance of DataFrame.
// ['column1', 'column2', 'column3']

// Here you declare a new variable (const) to save the modified df.
const df2 = df.drop('column1');
console.log(df2.columns);
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

## Contribution
