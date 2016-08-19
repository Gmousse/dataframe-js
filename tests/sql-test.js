import tape from 'tape';
const test = tape;

import { DataFrame } from '../src/index.js';

test('DataFrame sql module can ', (assert) => {
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


    df.sql.register('tmp');

    df2.sql.register('tmp2');

    console.log(DataFrame.sql.listTables());

    DataFrame.sql.request('SELECT * FROM tmp2').show();
    DataFrame.sql.request('SELECT * FROM tmp2 WHERE column2 >= 2 AND column3 != 1').show();



    assert.end();
});
