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

    console.log(dfFromArray);

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
    // console.log(df);
    // console.log(df.select('column2'));
    // console.log(df.count());
    // console.log(df.filter((line) => line.column1 > 3).count());
    // console.log(df.filter((line) => line.column2 <= 5).count());
    // console.log(df.withColumn('column2', (line) => line.column2 * 2));
    // console.log(df.withColumn('column3', (line) => line.column2 / 4));
    // console.log(df.withColumn('column4'));
    // console.log(df.withColumn('column5', (line, index) => index + 1));
    assert.end();
});
