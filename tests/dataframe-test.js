import tape from 'tape';
const test = tape;

import { DataFrame } from '../src/index.js';

function tryCatch(callback) {
    try {
        callback();
    } catch (err) {
        return err;
    }
}

test('DataFrame can be created correctly', (assert) => {
    const dfFromObjectOfArrays = new DataFrame({
        'column1': [3, 6, 8],
        'column2': [3, 4, 5, 6],
    }, ['column1', 'column2']);

    const dfFromArrayOfArrays = new DataFrame([
        [1, 6, 9, 10, 12],
        [1, 2],
        [6, 6, 9, 8, 9, 12],
    ], ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']);

    const dfFromArrayOfObjects = new DataFrame([{
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
    }], ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']);

    const dfFromDF = new DataFrame(dfFromArrayOfArrays);

    assert.deepEqual([dfFromObjectOfArrays.count(), dfFromObjectOfArrays.columns.length], [4, 2], 'from Object of Arrays');
    assert.deepEqual([dfFromArrayOfArrays.count(), dfFromArrayOfArrays.columns.length], [3, 6], 'from Array of Arrays');
    assert.deepEqual([dfFromArrayOfObjects.count(), dfFromArrayOfObjects.columns.length], [3, 6], 'from Array of Objects');
    assert.deepEqual([dfFromDF.count(), dfFromDF.columns.length], [3, 6], 'from an other Dataframe');

    assert.end();
});

test('DataFrame can\'t be created', (assert) => {
    assert.equal(tryCatch(() => new DataFrame('')).name, 'InputTypeError', 'from string, throwing InputTypeError');
    assert.equal(tryCatch(() => new DataFrame()).name, 'InputTypeError', 'from nothing, throwing InputTypeError');
    assert.equal(tryCatch(() => new DataFrame(445)).name, 'InputTypeError', 'from number, throwing InputTypeError');

    assert.end();
});

test('DataFrame can be', (assert) => {
    const dfFromArrayOfArrays = new DataFrame([
        [1, 6, 9, 10, 12],
        [1, 2],
        [6, 6, 9, 8, 9, 12],
    ], ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']);

    assert.deepEqual(
        dfFromArrayOfArrays.toDict(), {
            c1: [1, 1, 6],
            c2: [6, 2, 6],
            c3: [9, undefined, 9],
            c4: [10, undefined, 8],
            c5: [12, undefined, 9],
            c6: [undefined, undefined, 12],
        }, 'converted into dict');
    assert.deepEqual(
        dfFromArrayOfArrays.toArray(), [
            [1, 6, 9, 10, 12, undefined],
            [1, 2, undefined, undefined, undefined, undefined],
            [6, 6, 9, 8, 9, 12],
        ],
        'converted into array');

    const dfFromDict = new DataFrame({
        'column1': [3, 6, 8],
        'column2': ['3', '4', '5', '6'],
        'column3': [],
    }, ['column1', 'column2', 'column3']);

    const expectedShow = [
        '| column1   | column2   | column3   |',
        '------------------------------------',
        '| 3         | 3         | undefined |',
        '| 6         | 4         | undefined |',
        '| 8         | 5         | undefined |',
        '| undefined | 6         | undefined |',
    ].join('\n');

    assert.equal(dfFromDict.show(10, true), expectedShow, 'showed as string table');
    assert.deepEqual(dfFromDict.transpose().toDict(), {
        '0': [3, '3', undefined],
        '1': [6, '4', undefined],
        '2': [8, '5', undefined],
        '3': [undefined, '6', undefined],
    }, 'transposed');

    assert.end();
});

test('DataFrame columns can be', (assert) => {
    const df = new DataFrame([
        [1, 6, 9, 10, 12],
        [1, 2],
        [6, 6, 9, 8, 9, 12],
    ], ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']);

    assert.equal(df.columns.length, 6, 'counted');
    assert.deepEqual(
        df.select('c2').toArray(), [
            [6],
            [2],
            [6],
        ], 'selected, with only one column'
    );
    assert.deepEqual(
        df.select('c2', 'c3', 'c4').toDict(), {
            c2: [6, 2, 6],
            c3: [9, undefined, 9],
            c4: [10, undefined, 8],
        }, 'selected, with only multiple columns'
    );
    assert.deepEqual(
        df.select('c2', 'c3', 'c4').withColumn('c5', (row) => row.get('c2') - 2).toDict(), {
            c2: [6, 2, 6],
            c3: [9, undefined, 9],
            c4: [10, undefined, 8],
            c5: [4, 0, 4],
        }, 'created'
    );
    assert.deepEqual(
        df.select('c2', 'c3', 'c4').withColumn('c4', (row) => row.get('c2') ? row.get('c2') - 2 : 0 - 2).toDict(), {
            c2: [6, 2, 6],
            c3: [9, undefined, 9],
            c4: [4, 0, 4],
        }, 'modified'
    );
    assert.deepEqual(
        df.select('c2', 'c3', 'c4').drop('c4').toDict(), {
            c2: [6, 2, 6],
            c3: [9, undefined, 9],
        }, 'deleted'
    );
    assert.deepEqual(
        df.distinct('c1'), [1, 6], 'distinct, giving an array of unique values'
    );

    assert.end();
});

test('DataFrame rows can be', (assert) => {
    const df = new DataFrame({
        'column1': [3, 6, 8],
        'column2': ['3', '4', '5', '6'],
        'column3': [],
    }, ['column1', 'column2', 'column3']);

    assert.equal(df.count(), 4, 'counted');
    assert.equal(df.count('4', 'column2'), 1, 'counted based on a specific value in a column');
    assert.equal(df.count(9, 'column1'), 0, 'counted based on a specific value in a selected column');
    assert.deepEqual(
        df.filter((line) => line.get('column1') > 3).toArray(), [
            [6, '4', undefined],
            [8, '5', undefined],
        ], 'filtered'
    );
    assert.deepEqual(
        df.map((line) => line.set('column1', 3)).toArray(), [
            [3, '3', undefined],
            [3, '4', undefined],
            [3, '5', undefined],
            [3, '6', undefined],
        ], 'modified'
    );
    assert.deepEqual(
        df.filter((line) => line.get('column1') > 3).map((line) => line.set('column1', 3)).toArray(), [
            [3, '4', undefined],
            [3, '5', undefined],
        ], 'filtered and modified'
    );
    assert.deepEqual(
        df.chain((line) => line.get('column1') > 3, (line) => line.set('column1', 3)).toArray(), [
            [3, '4', undefined],
            [3, '5', undefined],
        ], 'filtered and modified by chains (giving the same result, but faster)'
    );
    assert.deepEqual(
        df.chain((line) => line.get('column1') > 3, (line) => line.set('column1', 3), (line) => line.get('column2') === '5').toArray(), [
            [3, '5', undefined],
        ], 'filtered and modified and filtered (again) by chains'
    );

    const df2 = df.withColumn('column1', (row) => row.get('column1') ? row.get('column1') : 0);

    assert.equal(
        df2.reduce((p, n) => n.get('column1') + p, 0), 17, 'reduced to obtain a value'
    );
    assert.deepEqual(
        df2.reduce((p, n) => (
            n.set('column1', p.get('column1') + n.get('column1'))
            .set('column2', p.get('column2') + n.get('column2'))
        )).toArray(), [17, '3456', undefined], 'reduced to obtain a row'
    );
    assert.deepEqual(
        df2.reduceRight((p, n) => (
            n.set('column1', p.get('column1') + n.get('column1'))
            .set('column2', p.get('column2') + n.get('column2'))
        )).toArray(), [17, '6543', undefined], 'reduced by right to obtain a row'
    );

    const df3 = new DataFrame({
        'id': [3, 6, 8, 1, 1, 3, 8],
        'value': [1, 0, 1, 1, 1, 2, 4],
    }, ['id', 'value']);

    assert.deepEqual(
        df3.groupBy('id').map(dfByValue => dfByValue.toDict()), [{
            id: [3, 3],
            value: [1, 2],
        }, {
            id: [6],
            value: [0],
        }, {
            id: [8, 8],
            value: [1, 4],
        }, {
            id: [1, 1],
            value: [1, 1],
        }], 'groupBy a column value'
    );
    assert.deepEqual(
        df3.groupBy('id').map(dfByValue => ({
            group: dfByValue.group,
            result: dfByValue.reduce((p, n) => p + n.get('value'), 0),
        })), [{
            group: 3,
            result: 3,
        }, {
            group: 6,
            result: 0,
        }, {
            group: 8,
            result: 5,
        }, {
            group: 1,
            result: 2,
        }], 'groupBy and compute the sum by group'
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
        ], 'sort by a column'
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
        ], 'sort and reverse by a column'
    );

    const df4 = new DataFrame({
        'id': [3, 1, 8],
        'value': [1, 0, 1],
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
        ], 'union with another DataFrame'
    );

    const df5 = new DataFrame({
        'id': [2, 1, 6, 8, 3],
        'value': [1, 0, 1, 2, 6],
    }, ['id', 'value2']);

    assert.deepEqual(
        df4.join(df5, 'id', 'inner').toArray(), [
            [3, 1, undefined],
            [1, 0, undefined],
            [8, 1, undefined],
            [1, undefined, 0],
            [8, undefined, 2],
            [3, undefined, 6],
        ], 'inner joined'
    );

    assert.deepEqual(
        df4.join(df5, 'id', 'full').toArray(), [
            [3, 1, undefined],
            [1, 0, undefined],
            [8, 1, undefined],
            [2, undefined, 1],
            [1, undefined, 0],
            [6, undefined, 1],
            [8, undefined, 2],
            [3, undefined, 6],
        ], 'full joined'
    );
    assert.deepEqual(
        df4.join(df5, 'id', 'outer').toArray(), [
            [2, undefined, 1],
            [6, undefined, 1],
        ], 'outer joined'
    );

    assert.deepEqual(
        df4.join(df5, 'id', 'left').toArray(), [
            [3, 1, undefined],
            [1, 0, undefined],
            [8, 1, undefined],
            [1, undefined, 0],
            [8, undefined, 2],
            [3, undefined, 6],
        ], 'left joined'
    );

    assert.deepEqual(
        df4.join(df5, 'id', 'right').toArray(), [
            [2, undefined, 1],
            [1, undefined, 0],
            [6, undefined, 1],
            [8, undefined, 2],
            [3, undefined, 6],
            [3, 1, undefined],
            [1, 0, undefined],
            [8, 1, undefined],
        ], 'right joined'
    );

    assert.end();
});

test('DataFrame modules can be', (assert) => {
    const obj = {
        'column1': [3, 6, 8],
        'column2': ['3', '4', '5', '6', 'yolo'],
        'column3': [],
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
        8, 'added and called'
    );

    assert.end();
});

test('DataFrame Math module can ', (assert) => {
    const df = new DataFrame({
        'column1': [3, 6, 8],
        'column2': ['3', '4', '5', '6', 'yolo'],
        'column3': [],
    }, ['column1', 'column2', 'column3']);

    assert.equal(
        df.math.max('column1'), 8, 'compute the maximal numeric value of a column'
    );
    assert.equal(
        df.math.max('column2'), 6, 'compute the maximal value of a column ignoring non-numeric value'
    );
    assert.equal(
        df.math.min('column1'), 3, 'compute the minimal numeric value of a column'
    );
    assert.equal(
        df.math.mean('column1'), 5.666666666666667, 'compute the mean of a column'
    );
    assert.equal(
        df.math.sd('column1'), 2.516611478423583, 'compute the standard deviation of a column'
    );
    assert.equal(
        df.math.sd('column1', true), 2.0548046676563256, 'compute the population standard deviation of a column'
    );
    assert.equal(
        df.math.var('column1'), 6.333333333333333, 'compute the variance of a column'
    );
    assert.equal(
        df.math.var('column1', true), 4.222222222222222, 'compute the population variance of a column'
    );
    assert.deepEqual(
        df.math.stats('column1'), {
            mean: 5.666666666666667,
            min: 3,
            max: 8,
            var: 6.333333333333333,
            varpop: 4.222222222222222,
            sd: 2.516611478423583,
            sdpop: 2.0548046676563256,
        }, 'compute all these stats for a column'
    );

    assert.end();
});
