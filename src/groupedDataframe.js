import { checktypes } from 'es7-checktypes-decorator';

import { combine, hashCode } from './reusables.js';

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
        this.df = df;
        this.on = columnNames;
        this[__groups__] = this._groupBy(df, columnNames);
    }

    * [Symbol.iterator]() {
        for (const group of this[__groups__]) {
            yield group;
        }
    }

    __hashKey__(groupKey) {
        return hashCode(Object.entries(groupKey).reduce((p, n) => [...p, ...n]).join(''));
    }

    @checktypes('DataFrame', Array)
    _groupBy(df, columnNames) {
        return combine(columnNames.map((column) => df.distinct(column).toArray(column))).map(
            combination => {
                const groupKey = Object.assign({}, ...combination.map((column, i) => ({[columnNames[i]]: column})));
                return ({
                    groupKey,
                    hash: this.__hashKey__(groupKey),
                    group: df.filter(
                        (row) => Object.entries(groupKey).reduce((p, n) => p && Object.is(row.get(n[0]), n[1]), true)
                    ),
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

    @checktypes('Function')
    /**
     * Create an aggregation from a function.
     * @param {Function} func The aggregation function.
     * @param {String} [columnName='aggregation'] The column name of the aggregation.
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

    @checktypes('String', 'Function')
    /**
     * Pivot a GroupedDataFrame.
     * @param {String} columnToColumns The column which will be transposed as columns.
     * @param {Function} [func=(df)=>df.stat.sum('value')] The function to define each column value from a DataFrame.
     * @returns {DataFrame} The pivot DataFrame.
     * @example
     * df.groupBy('carType').pivot('carModel', values => values.stat.sum('kms'))
     */
    pivot(columnToColumns, func) {
        const columns = [...this.on, ...this.df.distinct(columnToColumns).toArray(columnToColumns)];
        return this.df.__newInstance__(
            this.aggregate((group) => (
                group.groupBy(columnToColumns)
                     .aggregate((gp, gk) => ({[gk[columnToColumns]]: func(gp, gk)}))
                     .toArray('aggregation').reduce((p, n) => ({...p, ...n}), {})
            )).toCollection().map(({aggregation, ...rest}) => ({...rest, ...aggregation})),
            columns
        );
    }
}
