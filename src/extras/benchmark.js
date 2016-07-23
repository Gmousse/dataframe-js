export default class Benchmark {

    * __benchmarks__(func, repeats) {
        for (const bench of Array(repeats)) {
            const timer = process.hrtime();
            func(bench);
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
