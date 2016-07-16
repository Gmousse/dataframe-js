import { Benchmark, DataFrame } from './src/index.js';
import { chain } from './src/reusables.js';

const bench = new Benchmark();

const data = [...Array(100000).keys()].map(r => ({c1: r}));
const data2 = [...Array(100000).keys()].map(r => [r]);
const df = new DataFrame(data, ['c1']);

bench.compare(
    () => df.chain(
        row => row.set('c1', row.get('c1') * 4),
        row => row.get('c1') > 30000,
        row => row.set('c1', Math.sqrt(row.get('c1')))
    ),
    () => data.map(row => (Object.assign({}, row, {c1: row.c1 * 4}))).filter(row => row.c1 > 30000).map(row => (Object.assign({}, row, {c1: Math.sqrt(row.c1)}))),
    20);

bench.compare(
    () => df.chain(
        row => row.set('c1', row.get('c1') * 4),
        row => row.get('c1') > 30000,
        row => row.set('c1', Math.sqrt(row.get('c1')))
    ),
    () => data.map(row => (Object.assign({}, row, {c1: row.c1 * 4}))).filter(row => row.c1 > 30000).map(row => (Object.assign({}, row, {c1: Math.sqrt(row.c1)}))),
    20);

bench.compare(
    () => df.chain(
        row => row.set('c1', row.get('c1') * 4),
        row => row.get('c1') > 30000,
        row => row.set('c1', Math.sqrt(row.get('c1')))
    ),
    () => df.map(row => row.set('c1', row.get('c1') * 4)).filter(row => row.get('c1') > 30000).map(row => row.set('c1', Math.sqrt(row.get('c1')))),
    20);

bench.compare(
    () => [...chain(data2,
        row => row * 4,
        row => row > 30000,
        row => Math.sqrt(row),
        row => row ** 2,
    )],
    () => data2.map(row => row * 4).filter(row => row > 30000).map(row => Math.sqrt(row)).map(row => row ** 2),
    20);
