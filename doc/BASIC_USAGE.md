## Basic Usage

### Import the library

```javascript
// es6
import DataFrame from 'dataframe-js';
import DataFrame, { Row } from 'dataframe-js';
// es5
var DataFrame = require('dataframe-js').DataFrame;
// Browser
var DataFrame = dfjs.DataFrame;
```

### Create a DataFrame

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
DataFrame.fromText('/my/absolue/path/myfile.txt').then(df => df);
DataFrame.fromDSV('/my/absolue/path/myfile.txt').then(df => df);
DataFrame.fromPSV('http://myurl/myfile.psv').then(df => df);
DataFrame.fromTSV('http://myurl/myfile.tsv').then(df => df);
DataFrame.fromCSV('http://myurl/myfile.csv').then(df => df);
DataFrame.fromJSON('http://myurl/myfile.json').then(df => df);
DataFrame.fromJSON(new File(...)).then(df => df);
```

### Export or Convert a DataFrame

In the same way, you can also export or convert your DataFrame in files or in JavaScript Objects:

```javascript
const df = new DataFrame(data, columns);

// To native objects
df.toCollection();
df.toArray();
df.toDict();

// To files
DataFrame.toText(true, ';', '/my/absolue/path/myfile.txt');
DataFrame.toDSV(true, ';', '/my/absolue/path/myfile.txt');
DataFrame.toCSV(true, '/my/absolue/path/myfile.csv');
DataFrame.toTSV(true, '/my/absolue/path/myfile.tsv');
DataFrame.toPSV(true, '/my/absolue/path/myfile.psv');
DataFrame.toJSON(true, '/my/absolue/path/myfile.json');
```

### DataFrame

The main Object of the dataframe-js library is the [DataFrame](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html).
It provides 3 types of methods:

Informations, giving details about your DataFrame.
````js
// Some examples
df.show();
df.dim();
````

Columns manipulations, which provide solutions to select, reorganize, cast, join or analyze your data...
````js
// Some examples
df.select('column1', 'column3');
df.cast('column3', String);
df.distinct('column2');
df.innerJoin(df2, ['column2', 'column3']);
````

Rows manipulations, which provide ways to filter, modify, join, complete your data...
````js
// Some examples
df.push([1, 2, 3], [4, 5, 6]);
df.map(row => row.set('column2', row.get('column1') * 2));
df.filter(row => row.get('column2') !== 4);
df.union(df2);
````


### Row

As you could see, the [Row](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/row.html) api is used for example with .map(), .filter() DataFrame methods DataFrame.

The Row API provides simple manipulations, to get, set delete or check data in each line of your DataFrames.
````js
// Some examples
row.get('column1');
row.set('column2', newValue);
````

### GroupedDataFrame

When you use the DataFrame .groupBy() method, new [GroupedDataFrame](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/groupedDataframe.html) object is created.
It can be used to create DataFrame aggregations (like SQL) in order to resume your data.

Each group in the GroupedDataFrame is a DataFrame. When you aggregate a GroupedDataFrame Object, you get a DataFrame with one line per group, and with a new column "aggregation".
````js
// Some examples
const groupedDF = df.groupBy('column1', 'column2');
groupedDF.aggregate(group => group.count()).rename('aggregation', 'groupCount');
df.groupBy('column2', 'column3').aggregate(group => group.stat.mean('column4')).rename('aggregation', 'groupMean');
````

### Stat Module

The [Stat](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/modules/stat.html)
 module provides basic statistical computations on a DataFrame columns.

````js
// Some examples
df.stat.max('column1');
df.stat.mean('column1');
````

### Matrix Module

The [Matrix](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/modules/matrix.html) module provides mathematical matrix operations between DataFrames.

````js
// Some examples
df.matrix.add(df2);
df.matrix.product(8);
df.matrix.dot(df2);
````

### SQL Module

To finish, the [SQL](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/modules/sql.html) module allows you to register temporary tables and to request on these, by using SQL syntax.

````js
// Some examples
// Register a tmp table
df.sql.register('tmp2')
DataFrame.sql.registerTable(df, 'tmp2')
// Request on Table
DataFrame.sql.request('SELECT * FROM tmp2 WHERE column1 = 6')
````
