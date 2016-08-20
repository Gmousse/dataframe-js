import tape from 'tape';
const test = tape;

import { DataFrame } from '../src/index.js';

test('DataFrame sql module can ', (assert) => {
    const df = new DataFrame({
        id: [3, 6, 8],
        column1: [3, 4, 9],
        column2: [0, 0, 0],
    }, ['id', 'column1', 'column2']);

    const df2 = new DataFrame({
        id: [1, 0, 8],
        column3: [2, 1, 12],
        column4: [6, 1, -1],
    }, ['id', 'column3', 'column4']);


    df.sql.register('tmp');
    df2.sql.register('tmp2');

    console.log(DataFrame.sql.listTables());

    DataFrame.sql.request('SELECT * FROM tmp').show();
    DataFrame.sql.request('SELECT * FROM tmp WHERE column1 >= 2 AND column2 != 1').show();
    DataFrame.sql.request('SELECT column1, column2 FROM tmp WHERE column1 >= 2 AND column2 != 1').show();
    DataFrame.sql.request('SELECT * FROM tmp JOIN tmp2 ON id').show();
    DataFrame.sql.request('SELECT * FROM tmp JOIN tmp2 ON id WHERE column1 != undefined').show();
    DataFrame.sql.request('SELECT column1 AS columnRenamed, column2 AS columnRenamed2 FROM tmp').show();
    DataFrame.sql.request('SELECT column3 AS column1, column4 AS column2 FROM tmp2').show();
    DataFrame.sql.request('SELECT * FROM tmp UNION SELECT id, column3 AS column1, column4 AS column2 FROM tmp2').show();

    assert.end();
});
