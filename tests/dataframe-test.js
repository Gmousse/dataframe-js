import tape from 'tape';
const test = tape;

import DataFrame from '../src/dataframe.js';

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
    }, [['column1', Number], ['column2', Number]]);

    const dfFromArrayOfArrays = new DataFrame([
        [1, 6, 9, 10, 12],
        [1, 2],
        [6, 6, 9, 8, 9, 12],
    ], [['c1', Number], ['c2', Number], ['c3', Number], ['c4', Number], ['c5', Number], ['c6', Number]]);

    const dfFromArrayOfObjects = new DataFrame([
        {c1: 1, c2: 6, c3: 9, c4: 10, c5: 12},
        {c4: 1, c3: 2},
        {c1: 6, c5: 6, c2: 9, c4: 8, c3: 9, c6: 12},
    ], [['c1', Number], ['c2', Number], ['c3', Number], ['c4', Number], ['c5', Number], ['c6', Number]]);

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
    assert.equal(tryCatch(() => new DataFrame([])).name, 'EmptyInputError', 'from empty array, throwing EmptyInputError');
    assert.equal(tryCatch(() => new DataFrame({})).name, 'EmptyInputError', 'from empty dict, throwing EmptyInputError');

    assert.end();
});

test('DataFrame can\'t be', (assert) => {
    const dfFromArrayOfArrays = new DataFrame([
        [1, 6, 9, 10, 12],
        [1, 2],
        [6, 6, 9, 8, 9, 12],
    ], [['c1', Number], ['c2', Number], ['c3', Number], ['c4', Number], ['c5', Number], ['c6', Number]]);

    assert.deepEqual(
        dfFromArrayOfArrays.toDict(),
        {
            c1: [1, 1, 6],
            c2: [6, 2, 6],
            c3: [9, undefined, 9],
            c4: [10, undefined, 8],
            c5: [12, undefined, 9],
            c6: [undefined, undefined, 12],
        }, 'converted into dict');
    assert.deepEqual(
        dfFromArrayOfArrays.toArray(),
        [[1, 6, 9, 10, 12, undefined], [1, 2, undefined, undefined, undefined, undefined], [6, 6, 9, 8, 9, 12]], 'converted into array');

    const dfFromDict = new DataFrame({
        'column1': [3, 6, 8],
        'column2': ['3', '4', '5', '6'],
        'column3': [],
    }, [['column1', Number], ['column2', String], ['column3', Object]]);

    const expectedShow = [
        '| column1   | column2   | column3   |',
        '------------------------------------',
        '| 3         | 3         | undefined |',
        '| 6         | 4         | undefined |',
        '| 8         | 5         | undefined |',
        '| undefined | 6         | undefined |',
    ].join('\n');

    assert.equal(dfFromDict.show(10, true), expectedShow, 'showed as string table');

    assert.end();
});

test('DataFrame columns can be', (assert) => {
    const df = new DataFrame([
        [1, 6, 9, 10, 12],
        [1, 2],
        [6, 6, 9, 8, 9, 12],
    ], [['c1', Number], ['c2', Number], ['c3', Number], ['c4', Number], ['c5', Number], ['c6', Number]]);

    assert.equal(df.columns.length, 6, 'counted');
    assert.deepEqual(
        df.select('c2').toArray(),
        [[6], [2], [6]], 'selected, with only one column'
    );
    assert.deepEqual(
        df.select('c2', 'c3', 'c4').toDict(),
        {c2: [6, 2, 6], c3: [9, undefined, 9], c4: [10, undefined, 8]}, 'selected, with only multiple columns'
    );
    assert.deepEqual(
        df.select('c2', 'c3', 'c4').withColumn('c5', (row) => row.c2 - 2).toDict(),
        {c2: [6, 2, 6], c3: [9, undefined, 9], c4: [10, undefined, 8], c5: [4, 0, 4]}, 'created'
    );
    assert.deepEqual(
        df.select('c2', 'c3', 'c4').withColumn('c4', (row) => row.c4 ? row.c4 - 2 : 0 - 2).toDict(),
        {c2: [6, 2, 6], c3: [9, undefined, 9], c4: [8, -2, 6]}, 'modified'
    );
    assert.deepEqual(
        df.select('c2', 'c3', 'c4').drop('c4').toDict(),
        {c2: [6, 2, 6], c3: [9, undefined, 9]}, 'deleted'
    );

    assert.end();
});

test('DataFrame rows can be', (assert) => {
    const df = new DataFrame({
        'column1': [3, 6, 8],
        'column2': ['3', '4', '5', '6'],
        'column3': [],
    }, [['column1', Number], ['column2', String], ['column3', Object]]);

    assert.equal(df.count(), 4, 'counted');
    assert.deepEqual(
        df.filter((line) => line.column1 > 3).toArray(),
        [[6, '4', undefined], [8, '5', undefined]], 'filtered'
    );
    assert.deepEqual(
        df.map((line) => line.set('column1', 3)).toArray(),
        [[3, '3', undefined], [3, '4', undefined], [3, '5', undefined], [3, '6', undefined]], 'modified'
    );
    assert.deepEqual(
        df.filter((line) => line.column1 > 3).map((line) => line.set('column1', 3)).toArray(),
         [[3, '4', undefined], [3, '5', undefined]], 'filtered and modified'
     );

    console.log(df.chain((line) => line.column1 > 3, (line) => line.set('column1', 3)).toArray());
    assert.deepEqual(
        df.chain((line) => line.column1 > 3, (line) => line.set('column1', 3)).toArray(),
         [[3, '4', undefined], [3, '5', undefined]], 'filtered and modified by chains (giving the same result, but faster)'
     );
    assert.deepEqual(
        df.chain((line) => line.column1 > 3, (line) => line.set('column1', 3), (line) => line.column2 === '5').toArray(),
         [[3, '5', undefined]], 'filtered and modified and filtered (again) by chains'
     );

    assert.end();
});

// test('DataFrame has a valid schema', (assert) => {
//     const dfWithoutSchema = new DataFrame({
//         'column1': [3, 6, 8],
//         'column2': ['3', '4', '5', '6'],
//     });
//
//     const object = {
//         'column1': [3, 6, 8],
//         'column2': [3, 4, 5, 6],
//     };
//
//     const dfWithSchema = new DataFrame(object, [['c1', 'number'], ['c2', 'number']]);
//     const dfWithTooLargeSchema = new DataFrame(object, [['c1', 'number'], ['c2', 'number'], ['c3', 'any'], ['c4', 'any']]);
//     const dfWithTooLittleSchema = new DataFrame(object, [['c1', 'number']]);
//     const dfWithOnlyColumns = new DataFrame(object, ['c1', 'c2']);
//
//     assert.deepEqual(dfWithoutSchema.__schema__, [['column1', 'number'], ['column2', 'string']], 'infered from data');
//     assert.deepEqual(dfWithSchema.__schema__, [['c1', 'number'], ['c2', 'number']], 'given when created');
//     assert.deepEqual(dfWithTooLargeSchema.__schema__, [['c1', 'number'], ['c2', 'number'], ['c3', 'any'], ['c4', 'any']], 'even giving too much columns when created');
//     assert.deepEqual(dfWithTooLittleSchema.__schema__, [['c1', 'number']], 'even giving too few columns when created');
//     assert.deepEqual(dfWithOnlyColumns.__schema__, [['c1', 'any'], ['c2', 'any']], 'even giving only columns names');
//     assert.deepEqual(new DataFrame(object, []).__schema__, [], 'even giving only empty schema');
//     assert.deepEqual(dfWithSchema.select('c2').__schema__, [['c2', 'number']], 'after selecting columns');
//
//     assert.end();
// });
//
//
// // test('DataFrame has an invalid schema, throwing a SchemaError', (assert) => {
// //     const object = {
// //         'column1': [3, 6, 8],
// //         'column2': ['3', '4', '5', '6'],
// //     };
// //     console.log(new DataFrame(object, ['yo', 'yi', 'yu']));
// //
// //     assert.equal(tryCatch(() => new DataFrame(object, ['yo', '2', '3'])).name, 'SchemaError', 'when given too much columns');
// //
// //     assert.end();
// // });
