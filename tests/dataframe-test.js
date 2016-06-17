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
    const dfFromObject = new DataFrame({
        'column1': [3, 6, 8],
        'column2': [3, 4, 5, 6],
    });

    const dfFromArray = new DataFrame([
        [1, 6, 9, 10, 12],
        [1, 2],
        [6, 6, 9, 8, 9, 12],
    ]);

    const dfFromDF = new DataFrame(dfFromArray);

    assert.deepEqual([dfFromObject.count(), dfFromObject.columns.length], [4, 2], 'from object');
    assert.deepEqual([dfFromArray.count(), dfFromArray.columns.length], [3, 6], 'from array');
    assert.deepEqual([dfFromDF.count(), dfFromDF.columns.length], [3, 6], 'from dataframe');

    assert.end();
});

test('DataFrame raise error when created', (assert) => {
    assert.throws(() => new DataFrame(''), 'from string');
    assert.equal(tryCatch(() => new DataFrame('')).name, 'InputTypeError', 'from string, of type InputTypeError');

    assert.throws(() => new DataFrame(), 'from nothing');
    assert.equal(tryCatch(() => new DataFrame()).name, 'InputTypeError', 'from nothing, of type InputTypeError');

    assert.throws(() => new DataFrame(445), 'from number');
    assert.equal(tryCatch(() => new DataFrame(445)).name, 'InputTypeError', 'from number, of type InputTypeError');

    assert.throws(() => new DataFrame([]), 'from empty array');
    assert.equal(tryCatch(() => new DataFrame([])).name, 'EmptyInputError', 'from empty array, of type EmptyInputError');
    assert.throws(() => new DataFrame({}), 'from empty dict');
    assert.equal(tryCatch(() => new DataFrame({})).name, 'EmptyInputError', 'from empty dict, of type EmptyInputError');

    assert.end();
});

test('DataFrame has a valid schema', (assert) => {
    const dfWithoutSchema = new DataFrame({
        'column1': [3, 6, 8],
        'column2': ['3', '4', '5', '6'],
    });

    const object = {
        'column1': [3, 6, 8],
        'column2': [3, 4, 5, 6],
    };

    const dfWithSchema = new DataFrame(object, [['c1', 'number'], ['c2', 'number']]);

    const dfWithTooLargeSchema = new DataFrame(object, [['c1', 'number'], ['c2', 'number'], ['c3', 'any'], ['c4', 'any']]);

    const dfWithTooLittleSchema = new DataFrame(object, [['c1', 'number']]);

    const dfWithOnlyColumns = new DataFrame(object, ['c1', 'c2']);

    assert.deepEqual(dfWithoutSchema.__schema__, [['column1', 'number'], ['column2', 'string']], 'infered from data');
    assert.deepEqual(dfWithSchema.__schema__, [['c1', 'number'], ['c2', 'number']], 'given when created');
    assert.deepEqual(dfWithTooLargeSchema.__schema__, [['c1', 'number'], ['c2', 'number'], ['c3', 'any'], ['c4', 'any']], 'even giving too much columns when created');
    assert.deepEqual(dfWithTooLittleSchema.__schema__, [['c1', 'number']], 'even giving too few columns when created');
    assert.deepEqual(dfWithOnlyColumns.__schema__, [['c1', 'any'], ['c2', 'any']], 'even giving only columns names');
    assert.deepEqual(new DataFrame(object, []).__schema__, [], 'even giving only empty schema');

    assert.end();
});

// test('DataFrame has an invalid schema, throwing a SchemaError', (assert) => {
//     const object = {
//         'column1': [3, 6, 8],
//         'column2': ['3', '4', '5', '6'],
//     };
//     console.log(new DataFrame(object, ['yo', 'yi', 'yu']));
//
//     assert.equal(tryCatch(() => new DataFrame(object, ['yo', '2', '3'])).name, 'SchemaError', 'when given too much columns');
//
//     assert.end();
// });

// console.log(df);
// console.log(df.select('column2'));
// console.log(df.count());
// console.log(df.filter((line) => line.column1 > 3).count());
// console.log(df.filter((line) => line.column2 <= 5).count());
// console.log(df.withColumn('column2', (line) => line.column2 * 2));
// console.log(df.withColumn('column3', (line) => line.column2 / 4));
// console.log(df.withColumn('column4'));
// console.log(df.withColumn('column5', (line, index) => index + 1));
