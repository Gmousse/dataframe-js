const Benchmark = require('simple-benchmark');
const DataFrame = require('../lib').default;
const DataFrameOld = require('../lib/dataframe_old').default;

const fakeData = Array.from(Array(10000)).map((_, i) => ({key: i, name: `FAKE-${i}`}));

const creation = new Benchmark('Creation', 10)
    .addFunction('With schema [new]', () => new DataFrame(fakeData, ['key', 'name']).toCollection())
    .addFunction('With schema [new]', () => new DataFrame(fakeData, ['key', 'name']).toCollection())
    .addFunction('Without schema [new]', () => new DataFrame(fakeData).toCollection())
    .addFunction('With schema [v1.2.7]', () => new DataFrameOld(fakeData, ['key', 'name']).toCollection())
    .addFunction('Without schema [v1.2.7]', () => new DataFrameOld(fakeData).toCollection())
    .computeReport();

console.log(creation);

const instance = new Benchmark('New instance', 10)
    .addFunction('Create a new instance [new]', () => (
        new DataFrame(fakeData, ['key', 'name'])
            .withColumn('clean-name', row => row.get('name').split('-')[0])
            .toCollection()
    ))
    .addFunction('Create a new instance [new]', () => (
        new DataFrame(fakeData, ['key', 'name'])
            .withColumn('clean-name', row => row.get('name').split('-')[0])
            .toCollection()
    ))
    .addFunction('Create a new instance [1.2.7]', () => (
        new DataFrame(fakeData, ['key', 'name'])
            .withColumn('clean-name', row => row.get('name').split('-')[0])
            .toCollection()
    ))
    .computeReport();

console.log(instance);
