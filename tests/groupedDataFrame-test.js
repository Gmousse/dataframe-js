import tape from 'tape';

import GroupedDataFrame from '../src/groupedDataframe';
import DataFrame from '../src/dataframe';
import { tryCatch } from './utils';

const test = tape;

test('GroupedDataFrame can be ', (assert) => {
    const df = new DataFrame([
        {'column1': 1, 'column2': 'On the road', 'column3': undefined},
        {'column1': 3, 'column2': 'again', 'column3': undefined},
        {'column1': 1, 'column2': 'again', 'column3': NaN},
        {'column1': 3, 'column2': 'On the road', 'column3': undefined},
        {'column1': 1, 'column2': 'On the road', 'column3': NaN},
        {'column1': 2, 'column2': 'again', 'column3': undefined},
    ], ['column1', 'column2', 'column3']);

    assert.deepEqual(
        [...new GroupedDataFrame(df, 'column3')].map(({group}) => group.toCollection())[0], [
            { column1: 1, column2: 'On the road', column3: undefined },
            { column1: 3, column2: 'again', column3: undefined },
            { column1: 3, column2: 'On the road', column3: undefined },
            { column1: 2, column2: 'again', column3: undefined },
        ], 'created on a column.'
    );

    assert.deepEqual(
        [...new GroupedDataFrame(df, 'column3', 'column2')].map(({group}) => group.toCollection())[0], [
            { column1: 1, column2: 'On the road', column3: undefined },
            { column1: 3, column2: 'On the road', column3: undefined },
        ], 'created on multiple columns.'
    );

    assert.deepEqual(new GroupedDataFrame(df, 'column1').toCollection().map(x => Object.keys(x)),
        [['groupKey', 'hash', 'group'], ['groupKey', 'hash', 'group'], ['groupKey', 'hash', 'group']],
        'converted into a collection of dictionnaries containing each group.'
    );
    assert.deepEqual([...new GroupedDataFrame(df, 'column1')].map(x => Object.keys(x)),
        [['groupKey', 'hash', 'group'], ['groupKey', 'hash', 'group'], ['groupKey', 'hash', 'group']],
        'converted into a collection of dictionnaries containing each group when destructured.'
    );
    assert.deepEqual(
        new GroupedDataFrame(df, 'column1', 'column3').show(true), [
            '--\n[{"column1":1}]\n--',
            '| column1   | column2   | column3   |',
            '------------------------------------',
            '| 1         | On the... | undefined |',
            '--\n[{"column1":3}]\n--',
            '| column1   | column2   | column3   |',
            '------------------------------------',
            '| 3         | again     | undefined |',
            '| 3         | On the... | undefined |',
            '--\n[{"column1":1,"column3":null}]\n--',
            '| column1   | column2   | column3   |',
            '------------------------------------',
            '| 1         | again     | NaN       |',
            '| 1         | On the... | NaN       |',
            '--\n[{"column1":2}]\n--',
            '| column1   | column2   | column3   |',
            '------------------------------------',
            '| 2         | again     | undefined |',
        ].join('\n'),
        'showed as a String.'
    );

    assert.end();
});

test('GroupedDataFrame can\'t be ', (assert) => {
    assert.equal(tryCatch(() => new GroupedDataFrame()).name,
        'ArgumentTypeError',
        'created without DataFrame.'
    );

    assert.end();
});

test('GroupedDataFrame groups can be ', (assert) => {
    const df = new DataFrame([
        {'column1': 1, 'column2': 'On the road', 'column3': undefined},
        {'column1': 3, 'column2': 'again', 'column3': undefined},
        {'column1': 1, 'column2': 'again', 'column3': NaN},
        {'column1': 3, 'column2': 'On the road', 'column3': undefined},
        {'column1': 1, 'column2': 'On the road', 'column3': NaN},
        {'column1': 2, 'column2': 'again', 'column3': undefined},
    ], ['column1', 'column2', 'column3']);

    assert.deepEqual(
        new GroupedDataFrame(df, 'column1', 'column2').listGroups(), [
            { column1: 1, column2: 'On the road' },
            { column1: 3, column2: 'again' },
            { column1: 1, column2: 'again' },
            { column1: 3, column2: 'On the road' },
            { column1: 2, column2: 'again' },
        ],
        'listed.'
    );

    assert.deepEqual(
        new GroupedDataFrame(df, 'column3', 'column2').aggregate((group) => group.count()).toCollection()[0],
        { column3: undefined, column2: 'On the road', aggregation: 2 },
        'aggregated, rendering a DataFrame with a column aggregation.'
    );

    assert.end();
});
