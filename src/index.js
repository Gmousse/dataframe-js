import DataFrame from './dataframe.js';
import Row from './row.js';
import Stat from './modules/stat.js';
import Matrix from './modules/matrix.js';
import Benchmark from './extras/benchmark.js';

const DataFrameWithBasicModules = (data, columns, ...modules) => new DataFrame(data, columns, Stat, Matrix, ...modules);

export { DataFrameWithBasicModules as DataFrame, Row, Benchmark };
