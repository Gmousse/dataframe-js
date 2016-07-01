# dataframe-js
**v0.1.0**

## Presentation

dataframe-js provides another way to work with data by using DataFrame, a powerfull and immutable data structure already used in some languages (Spark, Python, R, ...).
The DataFrame uses 2 main concepts in its structure:
- Rows containing data and providing tools to manipulate these in a unit level (Row).
- Columns (labels) providing ways to select and manipulate data on a larger level (DataFrame).

````javascript

| column1   | column2   | column3   | <--- Columns
------------------------------------
| 3         | 3         | undefined | <--- Row
| 6         | 4         | undefined |
| 8         | 5         | undefined |
| undefined | 6         | undefined |
````

This structure is a wonderful way to work with machine learning or complex data treatments.

To resume:
-   dataframe-js provides a simple (and efficient) way to manipulate data in javascript (better in es6).
-   Moreover it's compatible with arrays and dictionnaries (hash, object) and you can switch from or to these structures when you want.

Discover this flexible data structure and become a contributor in order to make it smarter, stronger and easier.

## Installation

`npm install git+http://93.15.96.71:10080/odin/dataframe-js.git#feature/begin`

## Usage

To use it, simply import the library and use DataFrame.

```javascript
import { DataFrame } from 'dataframe-js';

df = new DataFrame(myData, myColumns);

```

## Modules

You can add modules on dataframe-js when creating DataFrame instance:

`const df = new DataFrame(obj, ['column1', 'column2', 'column3'], fakeModule, anotherModule)`

and you can call them by their name:

`df.fakemodule.test(4)`

If you want to create your own module, look at the Statisticical module (integrated by default) `./src/modules/stat.js` as example.

## API

The dataframe-js api provides some shortcuts to treat and manipulate data easily.
You can see additional use cases in `./tests/`.

[apiDoc](./doc/dataframe.md)
