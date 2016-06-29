import DataFrame from './dataframe.js';
import Row from './row.js';
import MathModule from './modules/math.js';
import Benchmark from './extras/benchmark.js';

const DataFrameWithBasicModules = (data, columns, ...modules) => new DataFrame(data, columns, MathModule, ...modules);

export { DataFrameWithBasicModules as DataFrame, Row, Benchmark };
