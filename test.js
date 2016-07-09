import { Benchmark, DataFrame } from './src/index.js';

const bench = new Benchmark();

const data = [...Array(100000).keys()].map(r => [r]);
const df = new DataFrame(data, ['c1']);

bench.start(() => df.chain(
    (row) => row.set('c1', row.get('c1') * 4)
), 20);
