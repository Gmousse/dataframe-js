import DataFrame from "./dataframe";
import Row from "./row";
import * as Errors from "./errors";
import Stat from "./modules/stat";
import Matrix from "./modules/matrix";
import SQL from "./modules/sql/index.js";

DataFrame.setDefaultModules(Stat, Matrix, SQL);
DataFrame.sql = SQL;

export { DataFrame, Row, Errors };
export default DataFrame;
