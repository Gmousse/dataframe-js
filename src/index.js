import DataFrame from './dataframe.js';
import Row from './row.js';
import MathModule from './math.js';

const DataFrameWithBasicsModules = (data, columns, ...plugins) => new DataFrame(data, columns, MathModule, ...plugins);

export { DataFrameWithBasicsModules as DataFrame, Row };
