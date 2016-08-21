import tape from 'tape';
const test = tape;

import { DataFrame } from '../src/index.js';

test('DataFrame sql module can ', (assert) => {
    const df = new DataFrame({
        id: [3, 6, 8],
        column1: [3, 9, 9],
        column2: ['car', 'on the road again again', 'the fly was crashing'],
    }, ['id', 'column1', 'column2']);

    const df2 = new DataFrame({
        id: [1, 0, 8],
        column3: [2, 1, 12],
        column4: ['bus', 'truck', 'train'],
    }, ['id', 'column3', 'column4']);


    df.sql.register('tmp');
    df2.sql.register('tmp2');

    assert.deepEqual(
        DataFrame.sql.listTables(), ['tmp', 'tmp2'], 'register temporary dataframes as tables and list them.'
    );
    assert.deepEqual(
        DataFrame.sql.request('SELECT * FROM tmp').toDict(), df.toDict(), 'select everything from a table.'
    );
    assert.deepEqual(
        DataFrame.sql.request('SELECT column3 AS column1, column4 AS column2 FROM tmp2').toDict(),
        df2.select('column3', 'column4').renameAll(['column1', 'column2']).toDict(),
        'select specific columns from a table and renamed them.'
    );
    assert.deepEqual(
        DataFrame.sql.request(
            'SELECT * FROM tmp WHERE column1 >= 2 AND column2 != "on the road again again"').toDict(),
        df.filter(row => row.get('column1') >= 2 && row.get('column2') !== 'on the road again again').toDict(),
        'select everything from a table and filter rows based on multiple conditions.'
    );
    assert.deepEqual(
        DataFrame.sql.request('SELECT * FROM tmp JOIN tmp2 ON id').toDict(),
        df.join(df2, 'id').toDict(),
        'select everything from a join (inner) between 2 tables.'
    );
    assert.deepEqual(
        DataFrame.sql.request('SELECT * FROM tmp JOIN tmp2 ON id WHERE column1 != undefined').toDict(),
        df.join(df2, 'id').filter(row => row.get('column1') !== undefined).toDict(),
        'select everything from a join chained with a filter.'
    );
    assert.deepEqual(
        DataFrame.sql.request(
            'SELECT * FROM tmp UNION SELECT id, column3 AS column1, column4 AS column2 FROM tmp2').toDict(),
        df.union(df2.renameAll(['id', 'column1', 'column2'])).toDict(),
        'select everything from an union between 2 queries.'
    );
    assert.deepEqual(
        DataFrame.sql.request('SELECT DISTINCT column1 AS distinctC1 FROM tmp').toDict(),
        df.distinct('column1').rename('column1', 'distinctC1').toDict(),
        'select column with distinct values and rename it.'
    );
    assert.deepEqual(
        DataFrame.sql.request('SELECT COUNT(column1) FROM tmp'),
        df.select('column1').count(),
        'count column rows.'
    );
    assert.deepEqual(
        DataFrame.sql.request('SELECT SUM(column1) FROM tmp'),
        df.stat.sum('column1'),
        'compute column sum.'
    );
    assert.deepEqual(
        DataFrame.sql.request('SELECT MAX(column1) FROM tmp'),
        df.stat.max('column1'),
        'compute column max.'
    );
    assert.deepEqual(
        DataFrame.sql.request('SELECT MIN(column1) FROM tmp'),
        df.stat.min('column1'),
        'compute column min.'
    );
    assert.deepEqual(
        DataFrame.sql.request('SELECT AVG(column1) FROM tmp'),
        df.stat.mean('column1'),
        'count column mean.'
    );

    assert.end();
});
