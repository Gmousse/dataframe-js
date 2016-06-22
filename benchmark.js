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

// const df2 = new DataFrame(
//     [...Array(100000).keys()].map(row => [row])
// );


const df2 = new DataFrame([
        [1, 6, 9, 10, 12],
        [1, 2],
        [6, 6, 9, 8, 9, 12],
], [['c1', Number], ['c2', Number], ['c3', Number], ['c4', Number], ['c5', Number], ['c6', Number]]);

console.log(df2.chain(
        (line) => line['c1'] === 1,
        (line) => line.set('c1', 5),
    ))

// const bench = new Benchmark();
//
// bench.compare (
//     () => df2.filter((line) => line['0'] > 3),
//     () => df2.____deprecatedFilter____((line) => line['0'] > 3),
//     20
// );
//
// bench.compare (
//     () => df2.map(() => 18),
//     () => df2.____deprecatedMap____(() => 18),
//     20
// );
//
// bench.compare (
//     () => df2.chain(
//         (line) => line['0'] > 3,
//         (line) => typeof line
//     ),
//     () => df2.filter((line) => line['0'] > 40000).map((line) => typeof line),
//     20
// );
