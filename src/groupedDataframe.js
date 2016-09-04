import { combine } from './reusables.js';

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

    _groupBy(df, columnNames) {
        return combine(columnNames.map((column) => df.distinct(column).toArray(column))).map(
            combination => {
                const groupKey = Object.assign({}, ...combination.map((column, i) => ({[columnNames[i]]: column})));
                return ({
                    groupKey,
                    group: df.filter(
                        (row) => Object.entries(groupKey).reduce((p, n) => p && Object.is(row.get(n[0]), n[1]), true)
                    ),
                });
            }
        ).filter(({group}) => group.count() > 0);
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
     * @returns {Array} An Array containing GroupedDataFrame groupNames.
     * @example
     * gdf.listGroups()
     */
    listGroups() {
        return [...this].map(({groupKey}) => groupKey);
    }

    /**
     * Create an aggregation from a function.
     * @param {Function} func The aggregation function.
     * @returns {DataFrame} A new DataFrame with a column aggregation containing the result.
     * @example
     * groupedDF.aggregate(group => group.sql.sum('column1'));
     */
    aggregate(func) {
        return this.df.__newInstance__(
            [...this].map(({group, groupKey}) => ({...groupKey, aggregation: func(group, groupKey)})),
            [...this.on, 'aggregation']
        );
    }
}
