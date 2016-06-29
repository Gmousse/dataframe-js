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

    assert.equal(
        df.matrix.hasSameStruct(df2), true, 'check if two dataframes have the same structure'
    );
    assert.deepEqual(
        df.matrix.transpose().toDict(), {
            '0': [3, 3, 0],
            '1': [6, 4, 0],
            '2': [8, 9, 0],
        }, 'transpose dataframe'
    );
    assert.deepEqual(
        df.matrix.add(df2).toDict(), {
            column1: [4, 6, 16],
            column2: [5, 5, 21],
            column3: [6, 1, -1],
        }, 'realize a pairwise sum'
    );

    // df.matrix.add(df2).show();

    assert.end();
});
