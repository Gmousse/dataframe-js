import DataFrame from './dataframe.js';
import Row from './row.js';
import Stat from './modules/stat.js';
import Matrix from './modules/matrix.js';
import Benchmark from './extras/benchmark.js';

DataFrame.defaultModules = [Stat, Matrix];

export { DataFrame, Row, Benchmark };
