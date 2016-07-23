import tape from 'tape';
const test = tape;

import { DataFrame } from '../src/index.js';

test('DataFrame matrix module can ', (assert) => {
    const df = new DataFrame({
        column1: [3, 6, 8],
        column2: [3, 4, 9],
        column3: [0, 0, 0],
    }, ['column1', 'column2', 'column3']);

    const df2 = new DataFrame({
        column1: [1, 0, 8],
        column2: [2, 1, 12],
        column3: [6, 1, -1],
    }, ['column1', 'column2', 'column3']);

    const df3 = new DataFrame({
        column1: [1, 0],
        column2: [2, 1],
        column3: [6, 1],
    }, ['column1', 'column2', 'column3']);

    assert.equal(
        df.matrix.isCommutative(df2.dim()), true, 'check if two dataframes have the same structure'
    );
    assert.deepEqual(
        df.matrix.add(df2).toDict(), {
            column1: [4, 6, 16],
            column2: [5, 5, 21],
            column3: [6, 1, -1],
        }, 'realize a pairwise sum between 2 dataframes'
    );
    assert.deepEqual(
        df.matrix.dot(df2).toDict(), {
            '0': [3, 6, 8],
            '1': [9, 16, 25],
            '2': [21, 40, 57],
        }, 'realize a commutative matrix multiplication between 2 dataframes'
    );
    assert.deepEqual(
        df3.matrix.dot(df2.drop('column3')).toDict(), {
            '0': [49, 8],
            '1': [76, 13],
        }, 'realize a non-commutative matrix multiplication between 2 dataframes'
    );
    assert.end();
});
