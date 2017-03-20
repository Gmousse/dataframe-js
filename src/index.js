import 'babel-polyfill';

import DataFrame from './dataframe.js';
import Row from './row.js';
import Stat from './modules/stat.js';
import Matrix from './modules/matrix.js';
import SQL from './modules/sql.js';
import Benchmark from './extras/benchmark.js';

DataFrame.setDefaultModules(Stat, Matrix, SQL);
DataFrame.sql = SQL;

export { DataFrame, Row, Benchmark };
