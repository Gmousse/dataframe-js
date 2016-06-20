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

test('DataFrame rows can be', (assert) => {
    const df = new DataFrame({
        'column1': [3, 6, 8],
        'column2': ['3', '4', '5', '6'],
        'column3': [],
    }, [['column1', Number], ['column2', String], ['column3', Object]]);

    assert.equal(df.count(), 4, 'counted');
    assert.equal(df.filter((line) => line.column1 > 3).count(), 2, 'filtered');
    assert.equal(df.map((line) => line.set('column1', 3)).count(), 4, 'modified (but not mutated)');

    assert.end();
});


// test('DataFrame raise error when created', (assert) => {
//     assert.throws(() => new DataFrame(''), 'from string');
//     assert.equal(tryCatch(() => new DataFrame('')).name, 'InputTypeError', 'from string, of type InputTypeError');
//     assert.throws(() => new DataFrame(), 'from nothing');
//     assert.equal(tryCatch(() => new DataFrame()).name, 'InputTypeError', 'from nothing, of type InputTypeError');
//     assert.throws(() => new DataFrame(445), 'from number');
//     assert.equal(tryCatch(() => new DataFrame(445)).name, 'InputTypeError', 'from number, of type InputTypeError');
//     assert.throws(() => new DataFrame([]), 'from empty array');
//     assert.equal(tryCatch(() => new DataFrame([])).name, 'EmptyInputError', 'from empty array, of type EmptyInputError');
//     assert.throws(() => new DataFrame({}), 'from empty dict');
//     assert.equal(tryCatch(() => new DataFrame({})).name, 'EmptyInputError', 'from empty dict, of type EmptyInputError');
//
//     assert.end();
// });
//
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
