import 'babel-polyfill';

import DataFrame from './dataframe';
import Row from './row';
import * as Errors from './errors';
import Stat from './modules/stat';
import Matrix from './modules/matrix';
import SQL from './modules/sql';
import Benchmark from './extras/benchmark';

DataFrame.setDefaultModules(Stat, Matrix, SQL);
DataFrame.sql = SQL;

export { DataFrame, Row, Benchmark, Errors};
export default DataFrame;
