import DataFrame from './src/dataframe.js';

const df2 = new DataFrame(
    [...Array(100000).keys()].map(row => [row])
);

const t1 = process.hrtime();
df2.filterOld((line) => line['0'] > 3);
console.log(process.hrtime(t1));

const t2 = process.hrtime();
df2.filter((line) => line['0'] > 3);
console.log(process.hrtime(t2));
