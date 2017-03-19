# dataframe-js

![](https://travis-ci.org/Gmousse/dataframe-js.svg?branch=develop)
![](https://coveralls.io/repos/github/Gmousse/dataframe-js/badge.svg?branch=master)

**Official Documentation**: <https://gmousse.gitbooks.io/dataframe-js/>

**Current Version**: [1.2.0](https://gmousse.gitbooks.io/dataframe-js/content/CHANGELOG.html)

**Compatibility**:
- Browsers (IE > 8, Edge, Firefox, Chrome...)
- NodeJS 0.10, 0.11, 0.12, 4.x.x, 5.x.x, 6.x.x

**License**: MIT

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

[Basic Usage](https://gmousse.gitbooks.io/dataframe-js/content/doc/BASIC_USAGE.html)
[Advanced Usage](https://gmousse.gitbooks.io/dataframe-js/content/doc/ADVANCED_USAGE.html)
[API Reference](https://gmousse.gitbooks.io/dataframe-js/content/doc/API_REFERENCE.html)

## Contribution

[How to contribute ?](https://gmousse.gitbooks.io/dataframe-js/content/CONTRIBUTING.html)
