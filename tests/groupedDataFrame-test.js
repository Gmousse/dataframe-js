import tape from 'tape';

import GroupedDataFrame from '../src/groupedDataframe.js';
import DataFrame from '../src/dataframe.js';

const test = tape;

test('GroupedDataFrame can ', (assert) => {
    const df = new DataFrame({
        column1: [3, 6, 8, 6, 8, 9],
        column2: ['3', '4', '5', '6'],
        column3: [1, 1, 2, 3, 3, 2],
    }, ['column1', 'column2', 'column3']);

    const gdf = new GroupedDataFrame(df, 'column3');

    console.log(gdf.aggregate((group) => group.stat.sum('column1')));
    gdf.show();
    assert.end();
});
