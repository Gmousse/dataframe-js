import DataFrame from './dataframe';
import { ArgumentTypeError } from './errors';

const __groups__ = Symbol('groups');

/**
 * Grouped DataFrame structure grouping DataFrame rows by column value.
 */
export default class GroupedDataFrame {

    /**
     * Create a GroupedDataFrame. Used in DataFrame.groupBy('columnName').
     * @param {DataFrame} df The DataFrame to group by.
     * @param {String} columnName The column used for the group by.
     * @example
     * df.groupBy('column1');
     * //or
     * new GroupedDataFrame(df, 'column1');
     */
    constructor(df, ...columnNames) {
        if (!(df instanceof DataFrame)) throw new ArgumentTypeError(df, 'DataFrame');
        this[__groups__] = this._groupBy(df, columnNames);
        this.df = df;
        this.on = columnNames.length > 0 ? columnNames : df.listColumns();
    }

    * [Symbol.iterator]() {
        for (const group of this[__groups__]) {
            yield group;
        }
    }

    _groupBy(df, columnNames) {
        const hashedDF = df.withColumn('hash', row => row.select(...columnNames).hash());
        return hashedDF.distinct('hash').toArray('hash').map(
            hash => {
                const group = hashedDF
                    .filter((row) => row.get('hash') === hash)
                    .drop('hash');
                return ({
                    groupKey: group.toCollection(true)[0].select(...columnNames).toDict(),
                    hash,
                    group,
                });
            }
        ).filter(({group}) => group.count() > 0);
    }

    get(hash) {
        return this.toCollection().find(group => group.hash === hash);
    }

    /**
     * Convert GroupedDataFrame into collection (Array) of dictionnaries (Object).
     * @returns {Array} An Array containing group: {groupKey, group}.
     * @example
     * groupedDF.toCollection();
     */
    toCollection() {
        return [...this];
    }

    /**
    * Display the GroupedDataFrame as String Table.
    * @param {Boolean} [quiet=false] Quiet mode. If true, it doesn't trigger console.log().
    * @returns {String} The GroupedDataFrame as String Table.
    * @example
    * groupedDf.show()
    */
    show(quiet = false) {
        return [...this].map(({group, groupKey}) => {
            const groupLog = `--\n[${JSON.stringify(groupKey)}]\n--`;
            if (!quiet) {
                console.log(groupLog);
            }
            return groupLog + '\n' + group.show(10, quiet);
        }).reduce((p, n) => p + '\n' + n);
    }

    /**
     * List GroupedDataFrame groups.
     * @returns {Array} An Array containing GroupedDataFrame group names.
     * @example
     * gdf.listGroups()
     */
    listGroups() {
        return [...this].map(({groupKey}) => groupKey);
    }

    /**
     * List GroupedDataFrame groups as a hashCode.
     * @returns {Array} An Array containing GroupedDataFrame hash codes.
     * @example
     * gdf.listHashCodes()
     */
    listHashs() {
        return [...this].map(({hash}) => hash);
    }

    /**
     * Create an aggregation from a function.
     * @param {Function} func The aggregation function.
     * @param {String} [columnName='aggregation'] The column name created by the aggregation.
     * @returns {DataFrame} A new DataFrame with a column 'aggregation' containing the result.
     * @example
     * groupedDF.aggregate(group => group.stat.sum('column1'));
     */
    aggregate(func, columnName = 'aggregation') {
        return this.df.__newInstance__(
            [...this].map(({group, groupKey}) => ({...groupKey, [columnName]: func(group, groupKey)})),
            [...this.on, columnName]
        );
    }

    /**
     * Pivot a GroupedDataFrame.
     * @param {String} columnToPivot The column which will be transposed as columns.
     * @param {Function} [func=(gdf) => gdf.count()] The function to define each column value from a DataFrame.
     * @returns {DataFrame} The pivot DataFrame.
     * @example
     * df.groupBy('carType').pivot('carModel', values => values.stat.sum('kms'))
     */
    pivot(columnToPivot, func = (gdf) => gdf.count()) {
        const columns = [...this.on, ...this.df.distinct(columnToPivot).toArray(columnToPivot)];
        return this.df.__newInstance__(
            this.aggregate((group) => (
                group.groupBy(columnToPivot)
                     .aggregate((gp, gk) => ({[gk[columnToPivot]]: func(gp, gk)}))
                     .toArray('aggregation').reduce((p, n) => ({...p, ...n}), {})
            )).toCollection().map(({aggregation, ...rest}) => ({...rest, ...aggregation})),
            columns
        );
    }

    /**
     * Melt a DataFrame to make it tidy. It's the reverse of GroupedDataFrame.pivot().
     * @param {String} [variableColumnName='variable'] The column name containing columns.
     * @param {String} [variableColumnName='value'] The column name containing values.
     * @returns {DataFrame} The tidy DataFrame.
     * @example
     * df.groupBy('carType').melt('kms')
     */
    melt(variableColumnName = 'variable', valueColumnName = 'value') {
        const columns = [...this.on, variableColumnName, valueColumnName];
        return this.df.__newInstance__(
            this.aggregate((group) => (
                Object.entries(group.toDict())
                      .reduce(
                          (tidy, [key, value]) => (
                              [
                                  ...tidy,
                                  ...value.reduce((p, n) => !this.on.includes(key) ?
                                    [...p, {[variableColumnName]: key, [valueColumnName]: n}] : p, []),
                              ]
                          ),
                          []
                      )
            ))
            .toCollection()
            .reduce(
                (p, {aggregation, ...rest}) => [...p, ...aggregation.map(x => ({...rest, ...x}))], []
            ),
            columns
        );
    }
}
