import DataFrame from './dataframe.js';
import Row from './row.js';
import MathModule from './math.js';

const DataFrameWithBasicModules = (data, columns, ...plugins) => new DataFrame(data, columns, MathModule, ...plugins);

export { DataFrameWithBasicModules as DataFrame, Row };
