# dataframe-js
**v0.1.0**

## Presentation

dataframe-js provides another way to work with data by using DataFrame, a powerfull and immutable data structure already used in some languages (Spark, Python, R, ...).
The DataFrame uses 2 main concepts in its structure:
- Rows containing data and providing tools to manipulate these in a unit level (Row).
- Columns (labels) providing ways to select and manipulate data on a larger level (DataFrame).

A simple example:
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

Discover this flexible data structure and / or contribute to in order to make it smarter, stronger and easier.

## Installation

`npm install git+http://93.15.96.71:10080/odin/dataframe-js.git#feature/begin`

## Modules

You can add modules on dataframe-js when creating DataFrame instance:

`const df = new DataFrame(obj, ['column1', 'column2', 'column3'], fakeModule, anotherModule)`

and you can call them by their name:

`df.fakemodule.test(4)`

If you want to create your own module, look at the MathModule (integrated by default) `./src/math.js` as example.

## API

The dataframe-js api provides some shortcuts to treat and manipulate easily.
You can see additional use cases in `./tests/`.

#### Create DataFrame

**Create Dataframe from Object (dictionnary) or Array:**

`new DataFrame(data: Array || Object || DataFrame, columns: Array)`

Missing data are replaced by `undefined`.

````javascript
// From Object
const dfFromObjectOfArrays = new DataFrame({
    'column1': [3, 6, 8],  // Column Data
    'column2': [3, 4, 5, 6], // Column Data
}, ['column1', 'column2']); // Columns

// From Array of Arrays
const dfFromArrayOfArrays = new DataFrame([
    [1, 6, 9, 10, 12],  // Row Data
    [1, 2],             // Row Data
    [6, 6, 9, 8, 9, 12], // Row Data
], ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']); // Columns

// From Array of Objects -- THE BETTER WAY --
const dfFromArrayOfObjects = new DataFrame([
    {c1: 1, c2: 6, c3: 9, c4: 10, c5: 12},  // Row Data
    {c4: 1, c3: 2},                         // Row Data
    {c1: 6, c5: 6, c2: 9, c4: 8, c3: 9, c6: 12}, // Row Data
], ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']); // Columns

// From DataFrame
const dfFromDF = new DataFrame(dfFromArrayOfArrays);

````

#### Conversion

**Convert into dict:**

`df.toDict()`

```javascript
const df = new DataFrame([
    {c1: 1, c2: 6, c3: 9, c4: 10, c5: 12},  // Row Data
    {c4: 1, c3: 2},                         // Row Data
    {c1: 6, c5: 6, c2: 9, c4: 8, c3: 9, c6: 12}, // Row Data
], ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']); // Columns

df.toDict()

{ c1: [ 1, undefined, 6 ],
  c2: [ 6, undefined, 9 ],
  c3: [ 9, 2, 9 ],
  c4: [ 10, 1, 8 ],
  c5: [ 12, undefined, 6 ],
  c6: [ undefined, undefined, 12 ] }
```

**Convert into Array:**

`df.toArray()`

```javascript
df.toArray()

[ [ 1, 6, 9, 10, 12, undefined ],
  [ undefined, undefined, 2, 1, undefined, undefined ],
  [ 6, 9, 9, 8, 6, 12 ] ]

```

#### Display

**Display some rows as String:**

`df.show(rows : Number, onlyReturn : Boolean)`

```javascript
df.show() // console.log the DataFrame with the first 10nth rows
df.show(30) // with the first 30nth rows

const strDF = df.show(20, true) // return the string without console.log
```

#### Manipulate DataFrame with columns

By working on columns, you will modify the structure of the DataFrame (returning a new DataFrame).

All examples will use this DataFrame:

```javascript
df.show()

| column1   | column2   | column3   |
------------------------------------
| 3         | 3         | undefined |
| 6         | 4         | undefined |
| 8         | 5         | undefined |
| undefined | 6         | undefined |

```

**Transpose DataFrame (columns become rows and conversely):**

`df.transpose()`

```javascript
df.tranpose().show()

| 0         | 1         | 2         | 3         |
------------------------------------------------
| 3         | 6         | 8         | undefined |
| 3         | 4         | 5         | 6         |
| undefined | undefined | undefined | undefined |

```

**Select Columns:**

`df.select(...columns : String)`

```javascript
df.select('column1', 'column3').show()

| column1   | column3   |
------------------------
| 3         | undefined |
| 6         | undefined |
| 8         | undefined |
| undefined | undefined |
```

**Add or Modify Column:**

`df.withColumn(columnName : String, func: function)`

```javascript
// Add a new column
df.withColumn('column4', () => 2).show()

| column1   | column2   | column3   | column4   |
------------------------------------------------
| 3         | 3         | undefined | 2         |
| 6         | 4         | undefined | 2         |
| 8         | 5         | undefined | 2         |
| undefined | 6         | undefined | 2         |

// Modify a column
df.withColumn('column2', (row) => row.get('column2') * 2).show()

| column1   | column2   | column3   |
------------------------------------
| 3         | 6         | undefined |
| 6         | 8         | undefined |
| 8         | 10        | undefined |
| undefined | 12        | undefined |
```

**Drop a Column:**

`df.drop(columnName : String)`

```javascript
df.drop('d2').show()

| column1   | column3   |
------------------------
| 3         | undefined |
| 6         | undefined |
| 8         | undefined |
| undefined | undefined |
```

**Get distinct values in a Column:**

`df.distinct(columnName : String)`

```javascript
df.distinct('d2')

[3, 4, 15, 6]
```

#### Working with rows

By working on rows, you will modify the each row on your DataFrame.
This way uses common functional tools: map, filter, reduce.

All examples will use this DataFrame:

```javascript
df.show()

| column1   | column2   | column3   |
------------------------------------
| 3         | 3         | undefined |
| 6         | 4         | undefined |
| 8         | 5         | undefined |
| undefined | 6         | undefined |
```

**Count rows:**

`df.count()`
`df.count(valueToCount : Any, columnName = this.columns[0] : String)`

```javascript
// Counting rows
df.count()

4

// Counting specific value in a column
df.count(5, 'column2')

1

// Counting specific value in a selected column
df.select('column1').count(5)

0
```

**Filter or/and Modify rows (FASTER METHOD):**

`df.chain(...funcs : Function)`

Chain is an *optimized way to make sequences of filters and maps* on DataFrame.
It can be 10 - 100 x faster than standard chains of .map() and .filter().
In filters and maps, you can use Row Api in order to get or set Row data.

```javascript
// 1 filter ==> 1 map ==> 1 filter
df.chain(
    line => line.get('column1') > 3, // Filter sending boolean. If true the chain continue. Else it breaks and the row is not send.
    line => line.set('column1', 3),  // Map sending modification
    line => line.get('column2') === '5' // Filter sending boolean. If true the row is send.
).show();

| column1   | column2   | column3   |
------------------------------------
| 3         | 5         | undefined |


// 1 map ==> 1 map ==> 1 map
// Each map will use previous map results.
df.chain(
    line => line.set('column1', line.get('column1') * 2),
    line => line.set('column2', line.get('column1') - 2),
    line => line.set('column3', 3),
).show();

| column1   | column2   | column3   |
------------------------------------
| 6         | 4         | 3         |
| 12        | 10        | 3         |
| 16        | 14        | 3         |
| NaN       | NaN       | 3         |
```

For some operations you can use the standard way:

`df.map(func : Function)`

`df.filter(func : Function)`

**Reduce rows:**

Exactly the same than Array.reduce().

`df.reduce(func : Function, init : Any)`

```javascript
// Compute a value from rows, starting from value 0
df.reduce((p, n) => n.get('column1') + p, 0)

// Compute a row from rows
df2.reduce((p, n) => (
        n.set('column1', p.get('column1') + n.get('column1'))
         .set('column2', p.get('column2') + n.get('column2'))
))
```

**Group rows by column values:**

Create an Array of DataFrame based on a column value and do whatever you want on these.
Each DataFrame has an additional property `.group` giving the value using to make the group.
`df.groupBy(columnName : String)`

```javascript
const df = new DataFrame({
    'id': [3, 6, 8, 1, 1, 3, 8],
    'value': [1, 0, 1, 1, 1, 2, 4],
}, ['id', 'value']);

// Group By id and show each dataframe
df.groupBy('id').forEach(dfByValue => dfByValue.show(10, true))

| id        | value     |
------------------------
| 3         | 1         |
| 3         | 2         |

| id        | value     |
------------------------
| 6         | 0         |

| id        | value     |
------------------------
| 8         | 1         |
| 8         | 4         |

| id        | value     |
------------------------
| 1         | 1         |
| 1         | 1         |

// Group By id and return an object containing group and dataframe
df.groupBy('id').map(dfByValue => ({group: dfByValue.group, df: dfByValue.toDict()}))

[ { group: 3, df: { id: [Object], value: [Object] } },
  { group: 6, df: { id: [Object], value: [Object] } },
  { group: 8, df: { id: [Object], value: [Object] } },
  { group: 1, df: { id: [Object], value: [Object] } } ]

// Get sum of value by id with a simple formating
df.groupBy('id').map(dfByValue => (
    {group: dfByValue.group, result: dfByValue.reduce((p, n) => p + n.get('value'), 0)})
)

[ { group: 3, result: 3 },
  { group: 6, result: 0 },
  { group: 8, result: 5 },
  { group: 1, result: 2 } ]

```

**Sort rows by column:**

`df.sortBy(columnName : String, reverse = false : Boolean)`

```javascript
const df = new DataFrame({
    'id': [3, 6, 8, 1, 1, 3, 8],
    'value': [1, 0, 1, 1, 1, 2, 4],
}, ['id', 'value']);

// Sort DataFrame by id
df.sortBy('id').toArray()

[
    [1, 1],
    [1, 1],
    [3, 1],
    [3, 2],
    [6, 0],
    [8, 1],
    [8, 4],
]

// Sort DataFrame by id and reverse
df.sortBy('id', true).toArray()
[
    [8, 4],
    [8, 1],
    [6, 0],
    [3, 2],
    [3, 1],
    [1, 1],
    [1, 1],
]

```

**Math Module:**

Get the max value of a column:

`df.math.max(columnName : String)`

Get the min value of a column:

`df.math.min(columnName : String)`

Get the mean of a column:

`df.math.mean(columnName : String)`

Get the standard deviation of a column:

`df.math.sd(columnName : String, population = true : Boolean)`

Get the variance of a column:

`df.math.var(columnName : String, population = true : Boolean)`

Get all these stats of a column:

`df.math.stats(columnName : String)`
