import tape from 'tape';

import { DataFrame } from '../src/index.js';

const test = tape;

function tryCatch(callback) {
    try {
        callback();
    } catch (err) {
        return err;
    }
}

test('DataFrame can be created correctly', (assert) => {
    const ObjectOfArrays = {
        column1: [3, 6, 8],
        column2: [3, 4, 5, 6],
    };

    const ArrayOfArrays = [
        [1, 6, 9, 10, 12],
        [1, 2],
        [6, 6, 9, 8, 9, 12],
    ];

    const ArrayOfObjects = [{
        c1: 1,
        c2: 6,
        c3: 9,
        c4: 10,
        c5: 12,
    }, {
        c4: 1,
        c3: 2,
    }, {
        c1: 6,
        c5: 6,
        c2: 9,
        c4: 8,
        c3: 9,
        c6: 12,
    }];

    assert.deepEqual(
        new DataFrame(ObjectOfArrays, ['column1', 'column2']).dim(),
        [4, 2],
        'from Object of Arrays.'
    );

    assert.deepEqual(
        new DataFrame(ObjectOfArrays).dim(),
        [4, 2],
        'from Object of Arrays by infering columns.'
    );

    assert.deepEqual(
        new DataFrame(ArrayOfArrays, ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']).dim(),
        [3, 6],
        'from Array of Arrays.'
    );

    assert.deepEqual(
        new DataFrame(ArrayOfArrays).dim(),
        [3, 6],
        'from Array of Arrays by infering columns.'
    );

    assert.deepEqual(
        new DataFrame(ArrayOfObjects, ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']).dim(),
        [3, 6],
        'from Array of Objects.'
    );

    assert.deepEqual(
        new DataFrame(ArrayOfObjects).dim(),
        [3, 6],
        'from Array of Objects by infering columns.'
    );

    assert.deepEqual(
        new DataFrame(ArrayOfArrays).dim(),
        [3, 6],
        'from another DataFrame.'
    );

    assert.end();
});

test('DataFrame can\'t be created', (assert) => {
    assert.equal(tryCatch(() => new DataFrame('')).name, 'InputTypeError', 'from string, throwing InputTypeError.');

    assert.equal(tryCatch(() => new DataFrame()).name, 'InputTypeError', 'from nothing, throwing InputTypeError.');

    assert.equal(tryCatch(() => new DataFrame(445)).name, 'InputTypeError', 'from number, throwing InputTypeError.');
    assert.end();
});

test('DataFrame can be', (assert) => {
    const dfFromArrayOfArrays = new DataFrame([
        [1, 6, 9, 10, 12],
        [1, 2],
        [6, 6, 9, 8, 9, 12],
    ], ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']);

    assert.deepEqual(
        dfFromArrayOfArrays.dim(), [3, 6], 'measured, getting dimmensions.');

    assert.deepEqual(
        dfFromArrayOfArrays.toDict(), {
            c1: [1, 1, 6],
            c2: [6, 2, 6],
            c3: [9, undefined, 9],
            c4: [10, undefined, 8],
            c5: [12, undefined, 9],
            c6: [undefined, undefined, 12],
        }, 'converted into dict.');

    assert.deepEqual(
        dfFromArrayOfArrays.toArray(), [
            [1, 6, 9, 10, 12, undefined],
            [1, 2, undefined, undefined, undefined, undefined],
            [6, 6, 9, 8, 9, 12],
        ],
        'converted into array.');

    assert.equal(
        dfFromArrayOfArrays.toText(), 'c1;c2;c3;c4;c5;c6\n1;6;9;10;12;\n1;2;;;;\n6;6;9;8;9;12',
        'converted into text with header.');

    assert.equal(
        dfFromArrayOfArrays.toText(';', false), '1;6;9;10;12;\n1;2;;;;\n6;6;9;8;9;12',
        'converted into text without header.');

    assert.equal(
        dfFromArrayOfArrays.toCSV(false), '1,6,9,10,12,\n1,2,,,,\n6,6,9,8,9,12',
        'converted into csv without header.');

    assert.equal(
        dfFromArrayOfArrays.toCSV(), 'c1,c2,c3,c4,c5,c6\n1,6,9,10,12,\n1,2,,,,\n6,6,9,8,9,12',
        'converted into csv with header.');

    assert.equal(
        dfFromArrayOfArrays.toJSON(),
        '{"c1":[1,1,6],"c2":[6,2,6],"c3":[9,null,9],"c4":[10,null,8],"c5":[12,null,9],"c6":[null,null,12]}',
        'converted into json.');

    const dfFromDict = new DataFrame({
        column1: [3, 6, 8],
        column2: ['3', '4', '5', '6'],
        column3: [],
    }, ['column1', 'column2', 'column3']);

    const expectedShow = [
        '| column1   | column2   | column3   |',
        '------------------------------------',
        '| 3         | 3         | undefined |',
        '| 6         | 4         | undefined |',
        '| 8         | 5         | undefined |',
        '| undefined | 6         | undefined |',
    ].join('\n');

    assert.equal(dfFromDict.show(10, true), expectedShow, 'showed as string table.');

    const df = new DataFrame({
        column1: [3, 6, 8],
        column2: [3, 4, 9],
        column3: [0, 0, 0],
    }, ['column1', 'column2', 'column3']);

    assert.deepEqual(
        df.transpose().toDict(), {
            '0': [3, 3, 0],
            '1': [6, 4, 0],
            '2': [8, 9, 0],
        }, 'transposed.'
    );

    assert.end();
});

test('DataFrame columns can be', (assert) => {
    const df = new DataFrame([
        [1, 6, 9, 10, 12],
        [1, 2],
        [6, 6, 9, 8, 9, 12],
    ], ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']);

    assert.equal(df.listColumns().length, 6, 'counted.');

    assert.deepEqual(
        df.select('c2').toArray(), [
            [6],
            [2],
            [6],
        ], 'selected, with only one column.'
    );

    assert.deepEqual(
        df.select('c2', 'c3', 'c4').toDict(), {
            c2: [6, 2, 6],
            c3: [9, undefined, 9],
            c4: [10, undefined, 8],
        }, 'selected, with only multiple columns.'
    );

    assert.deepEqual(
        df.select('c2', 'c3', 'c4').withColumn('c5', (row) => row.get('c2') - 2).toDict(), {
            c2: [6, 2, 6],
            c3: [9, undefined, 9],
            c4: [10, undefined, 8],
            c5: [4, 0, 4],
        }, 'created.'
    );

    assert.deepEqual(
        df.select('c2', 'c3', 'c4').withColumn('c4', (row) => row.get('c2') ? row.get('c2') - 2 : 0 - 2).toDict(), {
            c2: [6, 2, 6],
            c3: [9, undefined, 9],
            c4: [4, 0, 4],
        }, 'modified.'
    );

    assert.deepEqual(
        df.select('c2', 'c3', 'c4').drop('c4').toDict(), {
            c2: [6, 2, 6],
            c3: [9, undefined, 9],
        }, 'deleted.'
    );

    assert.deepEqual(
        df.select('c2', 'c3', 'c4').renameAll(['c16', 'c17', 'c18']).listColumns(),
            ['c16', 'c17', 'c18'], 'renamed.'
    );

    assert.deepEqual(
        df.select('c2', 'c3', 'c4').rename('c2', 'cRenamed').listColumns(),
            ['cRenamed', 'c3', 'c4'], 'renamed individually.'
    );

    assert.deepEqual(
        df.restructure(['c2', 'c3', 'c36']).toDict(), {
            c2: [6, 2, 6],
            c3: [9, undefined, 9],
            c36: [undefined, undefined, undefined],
        }, 'restructured.'
    );

    assert.deepEqual(
        df.distinct('c1').toArray('c1'), [1, 6], 'distinct, giving an array of unique values.'
    );

    assert.deepEqual(
        df.select('c2', 'c3', 'c4').replace(undefined, 0).toDict(), {
            c2: [6, 2, 6],
            c3: [9, 0, 9],
            c4: [10, 0, 8],
        }, 'modified, replacing a value by another.'
    );

    assert.deepEqual(
        df.select('c2', 'c3', 'c4').replace(undefined, 0, 'c2', 'c3').toDict(), {
            c2: [6, 2, 6],
            c3: [9, 0, 9],
            c4: [10, undefined, 8],
        }, 'modified, replacing a value by another in given column2.'
    );

    assert.end();
});

test('DataFrame rows can be', (assert) => {
    const df = new DataFrame({
        column1: [3, 6, 8],
        column2: ['3', '4', '5', '6'],
        column3: [],
    }, ['column1', 'column2', 'column3']);

    assert.equal(df.count(), 4, 'counted.');

    assert.equal(df.countValue('4', 'column2'), 1, 'counted based on a specific value in a column.');

    assert.equal(df.countValue(9, 'column1'), 0, 'counted based on a specific value in a selected column.');

    assert.deepEqual(
        df.push([1, 9, 6]).toArray(), [
            [3, '3', undefined],
            [6, '4', undefined],
            [8, '5', undefined],
            [undefined, '6', undefined],
            [1, 9, 6],
        ], 'added to an existing DataFrame.'
    );

    assert.deepEqual(
        df.filter((line) => line.get('column1') > 3).toArray(), [
            [6, '4', undefined],
            [8, '5', undefined],
        ], 'filtered.'
    );

    assert.deepEqual(
        df.filter({column1: 6}).toArray(), [
            [6, '4', undefined],
        ], 'filtered by passing a column/value object.'
    );

    assert.deepEqual(
        df.find({column1: 6}).toArray(), [6, '4', undefined], 'found a row and returned it.'
    );

    assert.deepEqual(
        df.find({column1: 12}), undefined, 'found nothing and returned undefined.'
    );

    assert.deepEqual(
        df.map((line) => line.set('column1', 3)).toArray(), [
            [3, '3', undefined],
            [3, '4', undefined],
            [3, '5', undefined],
            [3, '6', undefined],
        ], 'modified.'
    );

    assert.deepEqual(
        df.filter((line) => line.get('column1') > 3).map((line) => line.set('column1', 3)).toArray(), [
            [3, '4', undefined],
            [3, '5', undefined],
        ], 'filtered and modified.'
    );

    assert.deepEqual(
        df.chain((line) => line.get('column1') > 3, (line) => line.set('column1', 3)).toArray(), [
            [3, '4', undefined],
            [3, '5', undefined],
        ], 'filtered and modified by chains (giving the same result, but faster).'
    );

    assert.deepEqual(
        df.chain((line) => line.get('column1') > 3, (line) => line.set('column1', 3), (line) => line.get('column2') === '5').toArray(), [
            [3, '5', undefined],
        ], 'filtered and modified and filtered (again) by chains.'
    );

    const df2 = df.withColumn('column1', (row) => row.get('column1') ? row.get('column1') : 0);

    assert.equal(
        df2.reduce((p, n) => n.get('column1') + p, 0), 17, 'reduced to obtain a value.'
    );

    assert.deepEqual(
        df2.reduce((p, n) => (
            n.set('column1', p.get('column1') + n.get('column1'))
            .set('column2', p.get('column2') + n.get('column2'))
        )).toArray(), [17, '3456', undefined], 'reduced to obtain a row.'
    );

    assert.deepEqual(
        df2.reduceRight((p, n) => (
            n.set('column1', p.get('column1') + n.get('column1'))
            .set('column2', p.get('column2') + n.get('column2'))
        )).toArray(), [17, '6543', undefined], 'reduced by right to obtain a row.'
    );

    const df3 = new DataFrame({
        id: [3, 6, 8, 1, 1, 3, 8],
        value: [1, 0, 1, 1, 1, 2, 4],
    }, ['id', 'value']);

    assert.deepEqual(
        df3.groupBy('id').aggregate(group => group.toDict()), {
            '1': {id: [1, 1], value: [1, 1]},
            '3': {id: [3, 3], value: [1, 2]},
            '6': {id: [6], value: [0]},
            '8': {id: [8, 8], value: [1, 4]},
        }, 'groupBy a column value.'
    );
    assert.deepEqual(
        df3.groupBy('id').aggregate(group => group.count()), {
            '1': 2,
            '3': 2,
            '6': 1,
            '8': 2,
        }, 'groupBy and compute the count by group.'
    );

    assert.deepEqual(
        df3.sortBy('id').toArray(), [
            [1, 1],
            [1, 1],
            [3, 1],
            [3, 2],
            [6, 0],
            [8, 1],
            [8, 4],
        ], 'sort by a column.'
    );

    assert.deepEqual(
        df3.sortBy('id', true).toArray(), [
            [8, 4],
            [8, 1],
            [6, 0],
            [3, 2],
            [3, 1],
            [1, 1],
            [1, 1],
        ], 'sort and reverse by a column.'
    );

    const df4 = new DataFrame({
        id: [3, 1, 8],
        value: [1, 0, 1],
    }, ['id', 'value']);

    assert.deepEqual(
        df3.union(df4).toArray(), [
            [8, 4],
            [8, 1],
            [6, 0],
            [3, 2],
            [3, 1],
            [1, 1],
            [1, 1],
            [3, 1],
            [1, 0],
            [8, 1],
        ], 'union with another DataFrame.'
    );

    const df5 = new DataFrame({
        id: [2, 1, 6, 8, 3],
        value: [1, 0, 1, 2, 6],
    }, ['id', 'value2']);

    assert.deepEqual(
        df4.join(df5, 'id', 'inner').toArray(), [
            [1, 0, undefined],
            [3, 1, undefined],
            [8, 1, undefined],
            [1, undefined, 0],
            [3, undefined, 6],
            [8, undefined, 2],
        ], 'inner joined.'
    );

    assert.deepEqual(
        df4.join(df5, 'id', 'full').toArray(), [
            [1, 0, undefined],
            [3, 1, undefined],
            [8, 1, undefined],
            [1, undefined, 0],
            [2, undefined, 1],
            [3, undefined, 6],
            [6, undefined, 1],
            [8, undefined, 2],
        ], 'full joined.'
    );
    assert.deepEqual(
        df4.join(df5, 'id', 'outer').toArray(), [
            [2, undefined, 1],
            [6, undefined, 1],
        ], 'outer joined.'
    );

    assert.deepEqual(
        df4.join(df5, 'id', 'left').toArray(), [
            [1, 0, undefined],
            [3, 1, undefined],
            [8, 1, undefined],
            [1, undefined, 0],
            [3, undefined, 6],
            [8, undefined, 2],
        ], 'left joined.'
    );

    assert.deepEqual(
        df4.join(df5, 'id', 'right').toArray(), [
            [1, 0, undefined],
            [3, 1, undefined],
            [8, 1, undefined],
            [1, undefined, 0],
            [2, undefined, 1],
            [3, undefined, 6],
            [6, undefined, 1],
            [8, undefined, 2],
        ], 'right joined.'
    );

    const dfToSample = new DataFrame([...Array(5000).keys()].map(row => [row]), ['c1']);
    const dfToShuffle = new DataFrame([...Array(20).keys()].map(row => [row]), ['c1']);

    assert.isNotDeepEqual(
        dfToShuffle.shuffle().toArray(),
        dfToShuffle.toArray(), 'randomly shuffled.'
    );

    assert.equal(
        dfToShuffle.shuffle().count(),
        dfToShuffle.count(), 'randomly shuffled and get the same length.'
    );

    assert.equal(
        dfToSample.sample(0.2).count(),
        1000, 'randomly sampled.'
    );

    assert.deepEqual(
        dfToSample.randomSplit(0.2).map(splittedDF => splittedDF.count()),
        [1000, 4000], 'be randomly splitted into 2 DataFrames.'
    );

    assert.end();
});

test('DataFrame modules can be', (assert) => {
    const obj = {
        column1: [3, 6, 8],
        column2: ['3', '4', '5', '6', 'yolo'],
        column3: [],
    };

    class fakeModule {
        constructor(dataframe) {
            this.df = dataframe;
            this.name = 'fakemodule';
        }

        test(x) {
            return x * 2;
        }
    }

    assert.equal(
        new DataFrame(obj, ['column1', 'column2', 'column3'], fakeModule).fakemodule.test(4),
        8, 'added and called.'
    );

    assert.end();
});

test('DataFrame is immutable', (assert) => {
    const dfFromArrayOfArrays = new DataFrame([
        [1, 6, 9, 10, 12],
        [1, 2],
        [6, 6, 9, 8, 9, 12],
    ], ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']);


    assert.equal(
        Object.is(dfFromArrayOfArrays.map(row => row.set('c1', 18)), dfFromArrayOfArrays),
        false, 'when modified.'
    );
    assert.equal(
        Object.is(dfFromArrayOfArrays.map(row => row), dfFromArrayOfArrays),
        false, 'when modified, even if nothing have changed.'
    );

    assert.end();
});
