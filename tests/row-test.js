import tape from 'tape';
const test = tape;

import Row from '../src/row.js';

function tryCatch(callback) {
    try {
        callback();
    } catch (err) {
        return err;
    }
}

test('Row can be created', (assert) => {
    assert.equal(
        new Row([1, 3, 6], [['c1', Number], ['c2', Number], ['c3', Number]]).size(),
        3, 'from array');
    assert.equal(
        new Row({c1: 2, c2: 2, c3: 4}, [['c1', Number], ['c2', Number], ['c3', Number]]).size(),
        3, 'from dict');
    assert.equal(
        new Row(
            new Row({c1: 2, c3: 4}, [['c1', Number], ['c3', Number]]),
            [['c1', Number], ['c2', Number], ['c3', Number]]).size(),
        3, 'from an other row');

    assert.end();
});

test('Row can\'t be created', (assert) => {
    assert.equal(
        tryCatch(() => new Row()).name,
        'SchemaError', 'from nothing, throwing SchemaError');
    assert.equal(
        tryCatch(() => new Row([1, 3, 6], ['c1', 'c2', 'c3'])).name, 'SchemaError',
        'from a wrong schema, throwing SchemaError');
    assert.equal(
        tryCatch(() => new Row([1, 3, 6], [['c1', 'number'], ['c2', 'number'], ['c3', 'number']])).name,
         'SchemaError', 'from a wrong schema (2), throwing SchemaError');
    assert.equal(
        tryCatch(() => new Row(1, [['c1', Number], ['c2', Number], ['c3', Number]])).name,
        'InputTypeError', 'from a wrong type, throwing InputTypeError');
    assert.equal(
        tryCatch(() => new Row(null, [['c1', Number], ['c2', Number], ['c3', Number]])).name,
        'InputTypeError', 'from a wrong type (2), throwing InputTypeError');

    assert.end();
});

test('Row can\'t be converted', (assert) => {
    assert.deepEqual(
        new Row([1, 3, 6], [['c1', Number], ['c2', Number], ['c3', Number]]).toDict(),
        {c1: 1, c2: 3, c3: 6}, 'into dict');
    assert.deepEqual(
        new Row([1, 3, 6], [['c1', Number], ['c2', Number], ['c3', Number]]).toArray(),
        [1, 3, 6], 'into array');

    assert.end();
});

test('Row can be modified', (assert) => {
    const df = new Row([1, 'yo', 9, ['yo']], [['c1', Number], ['c2', String], ['c3', Number], ['c4', Array]]);
    assert.deepEqual(df.select('c2', 'c4').toDict(), {c2: 'yo', c4: ['yo']}, 'via a selection');
    assert.deepEqual(df.select('c4', 'c1').toDict(), {c4: ['yo'], c1: 1}, 'via a selection, with respect of order');
    assert.deepEqual(df.select('c4', 'c#').toDict(), {c4: ['yo']}, 'via a selection, handling non-existing column');
    assert.deepEqual(df.set('c4', 18).toDict(), {c1: 1, c2: 'yo', c3: 9, c4: 18}, 'by setting a column value');
    assert.deepEqual(df.set('c5', 35).toDict(), {c1: 1, c2: 'yo', c3: 9, c4: ['yo'], c5: 35},
     'by setting a non-existing column resulting on a column creation');

    assert.end();
});
