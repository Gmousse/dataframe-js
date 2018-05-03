## Advanced Usage

### Module creation

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

### Module registration

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

### Reduce the bundle size

If you use webpack or other bundlers, and you only want the core of dataframe-js without additional modules (like sql, stat or other) you can use es6 imports in order to reduce your bundle size (https://github.com/Gmousse/dataframe-js/issues/25):

````js
import DataFrame from 'dataframe-js/lib/dataframe';
````
