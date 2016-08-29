const __groups__ = Symbol('groups');

/**
 * Grouped DataFrame structure grouping DataFrames by column value.
 */
export default class GroupedDataFrame {

    /**
     * Create a GroupedDataFrame. Used in df.groupBy('columnName').
     * @param {DataFrame} df The DataFrame to group by.
     * @param {String} columnName The column used for the group by.
     * @example
     * df.groupBy('column1');
     * //or
     * new GroupedDataFrame(df, 'column1');
     */
    constructor(df, columnName) {
        this[__groups__] = Object.assign(
            {},
            ...df.distinct(columnName).map(
                groupName => {
                    const group = groupName.get(columnName);
                    return groupName.set(columnName, {[group]: df.filter(row => row.get(columnName) === group)});
                }
            ).toArray(columnName)
        );
    }

    * [Symbol.iterator]() {
        for (const [groupName, group] of Object.entries(this[__groups__])) {
            yield [group, groupName];
        }
    }

    /**
     * Convert GroupedDataFrame into dict / hash / object.
     * @returns {Object} A dict / hash containing each group as key / value pair.
     * @example
     * groupedDF.toDict();
     */
    toDict() {
        return Object.assign({}, this[__groups__]);
    }

    /**
     * Convert GroupedDataFrame into array.
     * @returns {Array} An array containing each group.
     * @example
     * groupedDf.toArray()
     */
    toArray() {
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
        return this.aggregate((group, groupName) => {
            const groupLog = `--\n[${groupName}]\n--`;
            if (!quiet) {
                console.log(groupLog);
            }
            return groupLog + group.show(10, quiet);
        });
    }

    /**
     * List GroupedDataFrame groups.
     * @returns {Array} An Array containing GroupedDataFrame groupNames.
     * @example
     * gdf.listGroups()
     */
    listGroups() {
        return Object.keys(this[__groups__]);
    }

    /**
     * Create an aggregation from a custom function.
     * @param {Function} func The aggregation function.
     * @returns {Object} The result of the aggregation with the group as key and the aggregate as value.
     * @example
     * groupedDF.aggregate(group => group.sql.sum('column1'));
     */
    aggregate(func) {
        return Object.assign({}, ...[...this].map(([group, groupName]) => ({[groupName]: func(group, groupName)})));
    }
}
