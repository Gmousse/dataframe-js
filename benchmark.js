import DataFrame from './src/dataframe.js';

class Benchmark {

    * __benchmarks__(func, repeats) {
        for (const bench of Array(repeats)) {
            const timer = process.hrtime();
            func();
            const diff = process.hrtime(timer);
            yield diff[0] * 1e9 + diff[1];
        }
    }

    _mean(array) {
        return array.reduce((p, n) => p + n, 0) / array.length;
    }

    start(func, repeats) {
        const benchmarkResult = this._mean([...this.__benchmarks__(func, repeats)]);
        console.log(`New benchmark: ${benchmarkResult} nanoseconds`);
        return benchmarkResult;
    }

    compare(func1, func2, repeats) {
        const [benchmarkResult1, benchmarkResult2] = [this.start(func1, repeats), this.start(func2, repeats)];
        console.log(`Most rapid function: ${benchmarkResult1 > benchmarkResult2 ? 'func2' : 'func1'}`);
        return [benchmarkResult1, benchmarkResult2];
    }
}


const arr = [...Array(1000000).keys()].map(row => [row, row]);

const df = new DataFrame(
    arr,
    ['0', '1']
);

const bench = new Benchmark();

// bench.compare (
//     () => df.filter(line => line['0'] > 3),
//     () => df.____deprecatedFilter____(line => line['0'] > 3),
//     20
// );
//
// bench.compare (
//     () => df.map(line => line.set('0', 18)),
//     () => df.____deprecatedMap____(line => line.set('0', 18)),
//     20
// );

// bench.compare (
//     () => df.chain(
//         line => line['0'] > 40000,
//         line => line.set('0', 18)
//     ),
//     () => df.filter(line => line['0'] > 40000).map(line => line.set('0', 18)),
//     20
// );

bench.compare (
    () => df.chain(
        (line) => line['0'] > 40000,
        (line) => line.set('0', line['0'] + 18),
        (line) => line['0'] < 80000
    ),
    () => arr.filter(line => line[0] > 40000).map(line => [line[0] + 18, line[1]]).filter(line => line[0] < 80000),
    4
);
