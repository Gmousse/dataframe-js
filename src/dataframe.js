import { transpose, chain, iter, arrayEqual } from "./reusables";
import { ArgumentTypeError, WrongSchemaError, MixedTypeError } from "./errors";
import Row from "./row";
import { groupBy } from "./group";
import { __columns__, __rows__ } from "./symbol";
import * as io from "./io";

/**
 * DataFrame data structure providing an immutable, flexible and powerfull way to manipulate data with columns and rows.
 */
class DataFrame {
    /**
     * Set the default modules used in DataFrame instances.
     * @param {...Object} defaultModules DataFrame modules used by default.
     * @example
     * DataFrame.setDefaultModules(SQL, Stat)
     */
    static setDefaultModules(...defaultModules) {
        DataFrame.defaultModules = defaultModules;
    }

    /**
     * Create a DataFrame from a delimiter separated values text file. It returns a Promise.
     * @param {String | File} pathOrFile A path to the file (url or local) or a browser File object.
     * @param {String} sep The separator used to parse the file.
     * @param {Boolean} [header=true] A boolean indicating if the text has a header or not.
     * @example
     * DataFrame.fromDSV('http://myurl/myfile.txt').then(df => df.show())
     * // In browser Only
     * DataFrame.fromDSV(myFile).then(df => df.show())
     * // From node.js only Only
     * DataFrame.fromDSV('/my/absolue/path/myfile.txt').then(df => df.show())
     * DataFrame.fromDSV('/my/absolue/path/myfile.txt', ';', true).then(df => df.show())
     */
    static fromDSV(...args) {
        return io.fromDSV(...args).then((content) => new DataFrame(content));
    }

    /**
     * Create a DataFrame from a delimiter separated values text file. It returns a Promise. Alias of DataFrame.fromDSV.
     * @param {String | File} pathOrFile A path to the file (url or local) or a browser File object.
     * @param {String} sep The separator used to parse the file.
     * @param {Boolean} [header=true] A boolean indicating if the text has a header or not.
     * @example
     * DataFrame.fromText('http://myurl/myfile.txt').then(df => df.show())
     * // In browser Only
     * DataFrame.fromText(myFile).then(df => df.show())
     * // From node.js only Only
     * DataFrame.fromText('/my/absolue/path/myfile.txt').then(df => df.show())
     * DataFrame.fromText('/my/absolue/path/myfile.txt', ';', true).then(df => df.show())
     */
    static fromText(...args) {
        return io.fromText(...args).then((content) => new DataFrame(content));
    }

    /**
     * Create a DataFrame from a comma separated values file. It returns a Promise.
     * @param {String | File} pathOrFile A path to the file (url or local) or a browser File object.
     * @param {Boolean} [header=true] A boolean indicating if the csv has a header or not.
     * @example
     * DataFrame.fromCSV('http://myurl/myfile.csv').then(df => df.show())
     * // For browser only
     * DataFrame.fromCSV(myFile).then(df => df.show())
     * // From node.js only
     * DataFrame.fromCSV('/my/absolue/path/myfile.csv').then(df => df.show())
     * DataFrame.fromCSV('/my/absolue/path/myfile.csv', true).then(df => df.show())
     */
    static fromCSV(...args) {
        return io.fromCSV(...args).then((content) => new DataFrame(content));
    }

    /**
     * Create a DataFrame from a tab separated values file. It returns a Promise.
     * @param {String | File} pathOrFile A path to the file (url or local) or a browser File object.
     * @param {Boolean} [header=true] A boolean indicating if the tsv has a header or not.
     * @example
     * DataFrame.fromTSV('http://myurl/myfile.tsv').then(df => df.show())
     * // For browser only
     * DataFrame.fromTSV(myFile).then(df => df.show())
     * // From node.js only
     * DataFrame.fromTSV('/my/absolue/path/myfile.tsv').then(df => df.show())
     * DataFrame.fromTSV('/my/absolue/path/myfile.tsv', true).then(df => df.show())
     */
    static fromTSV(...args) {
        return io.fromTSV(...args).then((content) => new DataFrame(content));
    }

    /**
     * Create a DataFrame from a pipe separated values file. It returns a Promise.
     * @param {String | File} pathOrFile A path to the file (url or local) or a browser File object.
     * @param {Boolean} [header=true] A boolean indicating if the psv has a header or not.
     * @example
     * DataFrame.fromPSV('http://myurl/myfile.psv').then(df => df.show())
     * // For browser only
     * DataFrame.fromPSV(myFile).then(df => df.show())
     * // From node.js only
     * DataFrame.fromPSV('/my/absolue/path/myfile.psv').then(df => df.show())
     * DataFrame.fromPSV('/my/absolue/path/myfile.psv', true).then(df => df.show())
     */
    static fromPSV(...args) {
        return io.fromPSV(...args).then((content) => new DataFrame(content));
    }

    /**
     * Create a DataFrame from a JSON file. It returns a Promise.
     * @param {String | File} pathOrFile A path to the file (url or local) or a browser File object.
     * @example
     * DataFrame.fromJSON('http://myurl/myfile.json').then(df => df.show())
     * // For browser only
     * DataFrame.fromJSON(myFile).then(df => df.show())
     * // From node.js only
     * DataFrame.fromJSON('/my/absolute/path/myfile.json').then(df => df.show())
     */
    static fromJSON(...args) {
        return io.fromJSON(...args).then((content) => new DataFrame(content));
    }

    /**
     * Create a new DataFrame.
     * @param {Array | Object | DataFrame} data The data of the DataFrame.
     * @param {Array} columns The DataFrame column names.
     * @param {Object} options Additional options. Example: modules.
     * @example
     * new DataFrame({
     *      'column1': [3, 6, 8],
     *      'column2': [3, 4, 5, 6],
     * }, ['column1', 'column2'])
     *
     * new Data Frame([
     *      [1, 6, 9, 10, 12],
     *      [1, 2],
     *      [6, 6, 9, 8, 9, 12],
     * ], ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'])
     *
     * new DataFrame([
     *      {c1: 1, c2: 6, c3: 9, c4: 10, c5: 12},
     *      {c4: 1, c3: 2},
     *      {c1: 6, c5: 6, c2: 9, c4: 8, c3: 9, c6: 12},
     * ], ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'])
     *
     * new DataFrame(df);
     *
     * new DataFrame(yourData, yourColumns, {modules: [MyOwnModule, MyOtherModule]})
     */
    constructor(data, columns, options = {}) {
        [this[__rows__], this[__columns__]] = this._build(data, columns);
        this.options = options;
        this.options.modules = [
            ...DataFrame.defaultModules,
            ...(this.options.modules || [])
        ];
        Object.assign(
            this,
            ...this.__instanciateModules__(this.options.modules)
        );
    }

    *[Symbol.iterator]() {
        for (const row of this[__rows__]) {
            yield row;
        }
    }

    _columnsAreEquals(columns, columns2 = this[__columns__]) {
        for (const key of Object.keys(columns)) {
            if (columns[key] !== columns2[key]) return false;
        }
        return true;
    }

    __newInstance__(data, columns) {
        if (!this._columnsAreEquals(columns) || !(data[0] instanceof Row)) {
            return new DataFrame(data, columns, this.options);
        }

        const firstRowColumns = Object.keys(data[0].toDict());
        if (!arrayEqual(firstRowColumns, this[__columns__], true)) {
            return new DataFrame(data, firstRowColumns, this.options);
        }

        const newInstance = new DataFrame([], [], this.options);
        newInstance[__rows__] = [...data];
        newInstance[__columns__] = [...columns];
        return newInstance;
    }

    __instanciateModules__(modules, df = undefined) {
        return modules.map((Plugin) => {
            const pluginInstance = new Plugin(df ? df : this);
            return { [pluginInstance.name]: pluginInstance };
        });
    }

    _build(data, columns) {
        if (data instanceof DataFrame) {
            return this._fromArray(
                Array.from(data[__rows__]),
                columns || data[__columns__]
            );
        }
        if (data instanceof Array && data.length > 0) {
            return this._fromArray(
                data,
                columns ||
                    Array.from(
                        new Set(
                            data
                                .slice(0, 10)
                                .concat(data.slice(-10, -1))
                                .map((row) => Object.keys(row))
                                .reduce((p, n) => p.concat(n))
                        )
                    )
            );
        }
        if (data instanceof Array && data.length === 0) {
            return this._fromArray(data, columns ? columns : []);
        }
        if (data instanceof Object) {
            return this._fromDict(data, columns || Object.keys(data));
        }
        throw new ArgumentTypeError(data, "DataFrame | Array | Object");
    }

    _fromDict(dict, columns) {
        return [
            transpose(Object.values(dict)).map((row) => new Row(row, columns)),
            columns
        ];
    }

    _fromArray(array, columns) {
        return [array.map((row) => new Row(row, columns)), columns];
    }

    _joinByType(gdf1, gdf2, type, newColumns) {
        const gdf2Hashs = gdf2.listHashs();
        return gdf1
            .toCollection()
            .map(({ group, hash }) => {
                const isContained = gdf2Hashs.includes(hash);
                let modifiedGroup = group;
                if (gdf2.get(hash)) {
                    const gdf2Collection = gdf2.get(hash).group.toCollection();
                    const combinedGroup = group
                        .toCollection()
                        .map((row) => {
                            return gdf2Collection.map((row2) =>
                                Object.assign({}, row2, row)
                            );
                        })
                        .reduce((p, n) => [...p, ...n], []);
                    modifiedGroup = this.__newInstance__(
                        combinedGroup,
                        newColumns
                    );
                }
                const filterCondition = (bool) =>
                    bool ? modifiedGroup : false;
                if (type === "full") return modifiedGroup;
                return type === "out"
                    ? filterCondition(!isContained)
                    : filterCondition(isContained);
            })
            .filter((group) => group);
    }

    _join(dfToJoin, columnNames, types) {
        if (!(dfToJoin instanceof DataFrame))
            throw new ArgumentTypeError(dfToJoin, "DataFrame");
        const newColumns = [
            ...new Set([...this.listColumns(), ...dfToJoin.listColumns()])
        ];
        const columns = Array.isArray(columnNames)
            ? columnNames
            : [columnNames];
        const gdf = this.groupBy(...columns);
        const gdfToJoin = dfToJoin.groupBy(...columns);
        return [
            this.__newInstance__([], newColumns),
            ...iter(
                [
                    ...(types[0]
                        ? this._joinByType(gdf, gdfToJoin, types[0], newColumns)
                        : []),
                    ...(types[1]
                        ? this._joinByType(gdfToJoin, gdf, types[1], newColumns)
                        : [])
                ],
                (group) => group.restructure(newColumns)
            )
        ]
            .reduce((p, n) => p.union(n))
            .dropDuplicates();
    }

    _cleanSavePath(path) {
        return path.replace("file://", "/");
    }

    /**
     * Convert the DataFrame into a text delimiter separated values. You can also save the file if you are using nodejs.
     * @param {String} [sep=' '] Column separator.
     * @param {Boolean} [header=true] Writing the header in the first line. If false, there will be no header.
     * @param {String} [path] The path to save the file. /!\ Works only on node.js, not into the browser.
     * @returns {String} The text file in raw string.
     * @example
     * df.toDSV()
     * df.toDSV(';')
     * df.toDSV(';', true)
     * // From node.js only
     * df.toDSV(';', true, '/my/absolute/path/dataframe.txt')
     */
    toDSV(...args) {
        return io.toDSV(this, ...args);
    }

    /**
     * Convert the DataFrame into a comma separated values string. You can also save the file if you are using nodejs.
     * @param {Boolean} [header=true] Writing the header in the first line. If false, there will be no header.
     * @param {String} [path] The path to save the file. /!\ Works only on node.js, not into the browser.
     * @returns {String} The csv file in raw string.
     * @example
     * df.toCSV()
     * df.toCSV(true)
     * // From node.js only
     * df.toCSV(true, '/my/absolute/path/dataframe.csv')
     */
    toCSV(...args) {
        return io.toCSV(this, ...args);
    }

    /**
     * Convert the DataFrame into a tab separated values string. You can also save the file if you are using nodejs.
     * @param {Boolean} [header=true] Writing the header in the first line. If false, there will be no header.
     * @param {String} [path] The path to save the file. /!\ Works only on node.js, not into the browser.
     * @returns {String} The csv file in raw string.
     * @example
     * df.toCSV()
     * df.toCSV(true)
     * // From node.js only
     * df.toCSV(true, '/my/absolute/path/dataframe.csv')
     */
    toTSV(...args) {
        return io.toTSV(this, ...args);
    }

    /**
     * Convert the DataFrame into a pipe separated values string. You can also save the file if you are using nodejs.
     * @param {Boolean} [header=true] Writing the header in the first line. If false, there will be no header.
     * @param {String} [path] The path to save the file. /!\ Works only on node.js, not into the browser.
     * @returns {String} The csv file in raw string.
     * @example
     * df.toPSV()
     * df.toPSV(true)
     * // From node.js only
     * df.toPSV(true, '/my/absolute/path/dataframe.csv')
     */
    toPSV(...args) {
        return io.toPSV(this, ...args);
    }

    /**
     * Convert the DataFrame into a text delimiter separated values. Alias for .toDSV. You can also save the file if you are using nodejs.
     * @param {String} [sep=' '] Column separator.
     * @param {Boolean} [header=true] Writing the header in the first line. If false, there will be no header.
     * @param {String} [path] The path to save the file. /!\ Works only on node.js, not into the browser.
     * @returns {String} The text file in raw string.
     * @example
     * df.toText()
     * df.toText(';')
     * df.toText(';', true)
     * // From node.js only
     * df.toText(';', true, '/my/absolute/path/dataframe.txt')
     */
    toText(...args) {
        return io.toText(this, ...args);
    }

    /**
     * Convert the DataFrame into a json string. You can also save the file if you are using nodejs.
     * @param {Boolean} [asCollection=false] Writing the JSON as collection of Object.
     * @param {String} [path] The path to save the file. /!\ Works only on node.js, not into the browser.
     * @returns {String} The json file in raw string.
     * @example
     * df.toJSON()
     * // From node.js only
     * df.toJSON('/my/absolute/path/dataframe.json')
     */
    toJSON(...args) {
        return io.toJSON(this, ...args);
    }

    /**
     * Convert DataFrame into dict / hash / object.
     * @returns {Object} The DataFrame converted into dict.
     * @example
     * df.toDict()
     */
    toDict() {
        return Object.assign(
            {},
            ...Object.entries(
                this.transpose().toArray()
            ).map(([index, column]) => ({ [this[__columns__][index]]: column }))
        );
    }

    /**
     * Convert DataFrame into Array of Arrays. You can also extract only one column as Array.
     * @param {String} [columnName] Column Name to extract. By default, all columns are transformed.
     * @returns {Array} The DataFrame (or the column) converted into Array.
     * @example
     * df.toArray()
     */
    toArray(columnName) {
        return columnName
            ? Array.from(this).map((row) => row.get(columnName))
            : Array.from(this).map((row) => row.toArray());
    }

    /**
     * Convert DataFrame into Array of dictionnaries. You can also return Rows instead of dictionnaries.
     * @param {Boolean} [ofRows] Return a collection of Rows instead of dictionnaries.
     * @returns {Array} The DataFrame converted into Array of dictionnaries (or Rows).
     * @example
     * df.toCollection()
     */
    toCollection(ofRows) {
        return ofRows
            ? Array.from(this)
            : Array.from(this).map((row) => row.toDict());
    }

    /**
     * Display the DataFrame as String Table. Can only return a sring instead of displaying the DataFrame.
     * @param {Number} [rows=10] The number of lines to display.
     * @param {Boolean} [quiet=false] Quiet mode. If true, only returns a string instead of console.log().
     * @returns {String} The DataFrame as String Table.
     * @example
     * df.show()
     * df.show(10)
     * const stringDF = df.show(10, true)
     */
    show(rows = 10, quiet = false) {
        const makeRow = (row) =>
            `| ${row
                .map((column) => {
                    const columnAsString = String(column);
                    return columnAsString.length > 9
                        ? columnAsString.substring(0, 6) + "..."
                        : columnAsString +
                              Array(10 - columnAsString.length).join(" ");
                })
                .join(" | ")} |`;
        const header = makeRow(this[__columns__]);
        let token = 0;
        const toShow = [
            header,
            Array(header.length).join("-"),
            ...iter(
                this[__rows__],
                (row) => {
                    token++;
                    return makeRow(row.toArray());
                },
                () => token >= rows
            )
        ].join("\n");
        if (!quiet) {
            console.log(toShow);
        }
        return toShow;
    }

    /**
     * Get the DataFrame dimensions.
     * @returns {Array} The DataFrame dimensions. [height, width]
     * @example
     * const [height, width] = df.dim()
     */
    dim() {
        return [this.count(), this[__columns__].length];
    }

    /**
     * Transpose a DataFrame. Rows become columns and conversely. n x p => p x n.
     * @param {Boolean} [transposeColumnNames=false] An option to transpose columnNames in a rowNames column.
     * @returns {ÐataFrame} A new transposed DataFrame.
     * @example
     * df.transpose()
     */
    transpose(tranposeColumnNames) {
        const newColumns = [
            ...(tranposeColumnNames ? ["rowNames"] : []),
            ...[...Array(this.count()).keys()].reverse()
        ];
        const transposedRows = transpose(
            (tranposeColumnNames
                ? this.push(this[__columns__])
                : this
            ).toArray()
        );
        return this.__newInstance__(
            transposedRows,
            newColumns.reverse()
        ).restructure(newColumns);
    }

    /**
     * Get the rows number.
     * @returns {Int} The number of DataFrame rows.
     * @example
     * df.count()
     */
    count() {
        return this[__rows__].length;
    }

    /**
     * Get the count of a value into a column.
     * @param valueToCount The value to count into the selected column.
     * @param {String} [columnName=this.listColumns()[0]] The column to count the value.
     * @returns {Int} The number of times the selected value appears.
     * @example
     * df.countValue(5, 'column2')
     * df.select('column1').countValue(5)
     */
    countValue(valueToCount, columnName = this[__columns__][0]) {
        return this.filter(
            (row) => row.get(columnName) === valueToCount
        ).count();
    }

    /**
     * Push new rows into the DataFrame.
     * @param {Array | Row} rows The rows to add.
     * @returns {DataFrame} A new DataFrame with the new rows.
     * @example
     * df.push([1,2,3], [1,4,9])
     */
    push(...rows) {
        return this.union(new DataFrame(rows, this[__columns__]));
    }

    /**
     * Replace a value by another in all the DataFrame or in a column.
     * @param value The value to replace.
     * @param replacement The new value.
     * @param {String | Array} [columnNames=this.listColumns()] The columns to apply the replacement.
     * @returns {DataFrame} A new DataFrame with replaced values.
     * @example
     * df.replace(undefined, 0, 'column1', 'column2')
     */
    replace(value, replacement, columnNames) {
        const columns =
            columnNames && columnNames.length > 0
                ? columnNames
                : this[__columns__];
        const values = Array.isArray(value) ? value : [value];
        return this.map((row) =>
            (columns.length > 0 ? columns : this[__columns__]).reduce(
                (p, n) =>
                    values.includes(p.get(n)) ? p.set(n, replacement) : p,
                row
            )
        );
    }

    /**
     * Compute unique values into a column.
     * @param {String} columnName The column to distinct.
     * @returns {DataFrame} A DataFrame containing the column with distinct values.
     * @example
     * df.distinct('column1')
     */
    distinct(columnName) {
        return this.__newInstance__(
            { [columnName]: [...new Set(this.toArray(columnName))] },
            [columnName]
        );
    }

    /**
     * Compute unique values into a column.
     * Alias from .distinct()
     * @param {String} columnName The column to distinct.
     * @returns {DataFrame} A DataFrame containing the column with distinct values.
     * @example
     * df.unique('column1')
     */
    unique(columnName) {
        return this.distinct(columnName);
    }

    /**
     * List DataFrame columns.
     * @returns {Array} An Array containing DataFrame columnNames.
     * @example
     * df.listColumns()
     */
    listColumns() {
        return [...this[__columns__]];
    }

    /**
     * Select columns in the DataFrame.
     * @param {...String} columnNames The columns to select.
     * @returns {DataFrame} A new DataFrame containing selected columns.
     * @example
     * df.select('column1', 'column3')
     */
    select(...columnNames) {
        return this.__newInstance__(
            this[__rows__].map((row) => row.select(...columnNames)),
            columnNames
        );
    }

    /**
     * Add a new column or set an existing one.
     * @param {String} columnName The column to modify or to create.
     * @param {Function} [func=(row, index) => undefined] The function to create the column.
     * @returns {DataFrame} A new DataFrame containing the new or modified column.
     * @example
     * df.withColumn('column4', () => 2)
     * df.withColumn('column2', (row) => row.get('column2') * 2)
     */
    withColumn(columnName, func = () => undefined) {
        return this.__newInstance__(
            this[__rows__].map((row, index) => {
                return row.set(columnName, func(row, index));
            }),
            this[__columns__].includes(columnName)
                ? this[__columns__]
                : [...this[__columns__], columnName]
        );
    }

    /**
     * Modify the structure of the DataFrame by changing columns order, creating new columns or removing some columns.
     * @param {Array} newColumnNames The new columns of the DataFrame.
     * @returns {DataFrame} A new DataFrame with restructured columns (renamed, add or deleted).
     * @example
     * df.restructure(['column1', 'column4', 'column2', 'column3'])
     * df.restructure(['column1', 'column4'])
     * df.restructure(['column1', 'newColumn', 'column4'])
     */
    restructure(newColumnNames) {
        return this.__newInstance__(this[__rows__], newColumnNames);
    }

    /**
     * Rename each column.
     * @param {Array} newColumnNames The new column names of the DataFrame.
     * @returns {DataFrame} A new DataFrame with the new column names.
     * @example
     * df.renameAll(['column1', 'column3', 'column4'])
     */
    renameAll(newColumnNames) {
        if (newColumnNames.length !== this[__columns__].length) {
            throw new WrongSchemaError(newColumnNames, this[__columns__]);
        }
        return this.__newInstance__(this.toArray(), newColumnNames);
    }

    /**
     * Rename a column.
     * @param {String} columnName The column to rename.
     * @param {String} replacement The new name for the column.
     * @returns {DataFrame} A new DataFrame with the new column name.
     * @example
     * df.rename('column1', 'columnRenamed')
     */
    rename(columnName, replacement) {
        const newColumnNames = this[__columns__].map((column) =>
            column === columnName ? replacement : column
        );
        return this.renameAll(newColumnNames);
    }

    /**
     * Cast each column into a given type.
     * @param {Array} typeFunctions The functions used to cast columns.
     * @returns {DataFrame} A new DataFrame with the columns having new types.
     * @example
     * df.castAll([Number, String, (val) => new CustomClass(val)])
     */
    castAll(typeFunctions) {
        if (typeFunctions.length !== this[__columns__].length) {
            throw new WrongSchemaError(typeFunctions, this[__columns__]);
        }
        return this.map(
            (row) =>
                new Row(
                    row
                        .toArray()
                        .map((column, index) => typeFunctions[index](column)),
                    this[__columns__]
                )
        );
    }

    /**
     * Cast a column into a given type.
     * @param {String} columnName The column to cast.
     * @param {Function} ObjectType The function used to cast the column.
     * @returns {DataFrame} A new DataFrame with the column having a new type.
     * @example
     * df.cast('column1', Number)
     * df.cast('column1', (val) => new MyCustomClass(val))
     */
    cast(columnName, typeFunction) {
        return this.withColumn(columnName, (row) =>
            typeFunction(row.get(columnName))
        );
    }

    /**
     * Remove a single column.
     * @param {String} columnName The column to drop.
     * @returns {DataFrame} A new DataFrame without the dropped column.
     * @example
     * df.drop('column2')
     */
    drop(columnName) {
        return this.__newInstance__(
            this[__rows__].map((row) => row.delete(columnName)),
            this[__columns__].filter((column) => column !== columnName)
        );
    }

    /**
     * Chain maps and filters functions on DataFrame by optimizing their executions.
     * If a function returns boolean, it's a filter. Else it's a map.
     * It can be 10 - 100 x faster than standard chains of .map() and .filter().
     * @param {...Function} funcs Functions to apply on the DataFrame rows taking the row as parameter.
     * @returns {DataFrame} A new DataFrame with modified rows.
     * @example
     * df.chain(
     *      row => row.get('column1') > 3, // filter
     *      row => row.set('column1', 3),  // map
     *      row => row.get('column2') === '5' // filter
     * )
     */
    chain(...funcs) {
        return this.__newInstance__(
            [...chain(this[__rows__], ...funcs)],
            this[__columns__]
        );
    }

    /**
     * Filter DataFrame rows.
     * @param {Function | Object} condition A filter function or a column/value object.
     * @returns {DataFrame} A new filtered DataFrame.
     * @example
     * df.filter(row => row.get('column1') >= 3)
     * df.filter({'column2': 5, 'column1': 3}))
     */
    filter(condition) {
        const func =
            typeof condition === "object"
                ? (row) =>
                      Object.entries(condition)
                          .map(([column, value]) =>
                              Object.is(row.get(column), value)
                          )
                          .reduce((p, n) => p && n)
                : condition;
        const filteredRows = iter(this[__rows__], (row, i) =>
            func(row, i) ? row : false
        );
        return this.__newInstance__(filteredRows, this[__columns__]);
    }

    /**
     * Filter DataFrame rows.
     * Alias of .filter()
     * @param {Function | Object} condition A filter function or a column/value object.
     * @returns {DataFrame} A new filtered DataFrame.
     * @example
     * df.where(row => row.get('column1') >= 3)
     * df.where({'column2': 5, 'column1': 3}))
     */
    where(condition) {
        return this.filter(condition);
    }

    /**
     * Find a row (the first met) based on a condition.
     * @param {Function | Object} condition A filter function or a column/value object.
     * @returns {Row} The targeted Row.
     * @example
     * df.find(row => row.get('column1') === 3)
     * df.find({'column1': 3})
     */
    find(condition) {
        return this.filter(condition)[__rows__][0];
    }

    /**
     * Map on DataFrame rows. /!\ Prefer to use .chain().
     * @param {Function} func A function to apply on each row taking the row as parameter.
     * @returns {DataFrame} A new DataFrame with modified rows.
     * @example
     * df.map(row => row.set('column1', row.get('column1') * 2))
     */
    map(func) {
        return this.__newInstance__(
            iter(this[__rows__], (row, i) => func(row, i)),
            this[__columns__]
        );
    }

    /**
     * Reduce DataFrame into a value.
     * @param {Function} func The reduce function taking 2 parameters, previous and next.
     * @param [init] The initial value of the reducer.
     * @returns A reduced value.
     * @example
     * df.reduce((p, n) => n.get('column1') + p, 0)
     * df2.reduce((p, n) => (
     *          n.set('column1', p.get('column1') + n.get('column1'))
     *           .set('column2', p.get('column2') + n.get('column2'))
     * ))
     */
    reduce(func, init) {
        return typeof init === "undefined"
            ? this[__rows__].reduce((p, n) => func(p, n))
            : this[__rows__].reduce((p, n) => func(p, n), init);
    }

    /**
     * Reduce DataFrame into a value, starting from the last row (see .reduce()).
     * @param {Function} func The reduce function taking 2 parameters, previous and next.
     * @param [init] The initial value of the reducer.
     * @returns A reduced value.
     * @example
     * df.reduceRight((p, n) => p > n ? p : n, 0)
     */
    reduceRight(func, init) {
        return typeof init === "undefined"
            ? this[__rows__].reduceRight((p, n) => func(p, n))
            : this[__rows__].reduceRight((p, n) => func(p, n), init);
    }

    /**
     * Return a DataFrame without duplicated columns.
     * @param {...String} columnNames The columns used to check unicity of rows. If omitted, unicity is checked on all columns.
     * @returns {DataFrame} A DataFrame without duplicated rows.
     * @example
     * df.dropDuplicates('id', 'name')
     */
    dropDuplicates(...columnNames) {
        const groupCols =
            columnNames && columnNames.length > 0
                ? columnNames
                : this[__columns__];
        return this.groupBy(...groupCols).filter((row, i) => i === 0);
    }

    /**
     * Return a DataFrame without rows containing missing values (undefined, NaN, null).
     * @param {Array} columnNames The columns to consider. All columns are considered by default.
     * @returns {DataFrame} A DataFrame without rows containing missing values.
     * @example
     * df.dropMissingValues(['id', 'name'])
     */
    dropMissingValues(columnNames) {
        const cols =
            columnNames && columnNames.length > 0
                ? columnNames
                : this[__columns__];

        return this.filter((row) => {
            for (const col of cols) {
                if ([NaN, undefined, null].includes(row.get(col))) {
                    return false;
                }
            }
            return true;
        });
    }

    /**
     * Return a DataFrame with missing values (undefined, NaN, null) fill with default value.
     * @param replacement The new value.
     * @param {Array} columnNames The columns to consider. All columns are considered by default.
     * @returns {DataFrame} A DataFrame with missing values replaced.
     * @example
     * df.fillMissingValues(0, ['id', 'name'])
     */
    fillMissingValues(replacement, columnNames) {
        return this.replace([NaN, undefined, null], replacement, columnNames);
    }

    /**
     * Return a shuffled DataFrame rows.
     * @returns {DataFrame} A shuffled DataFrame.
     * @example
     * df.shuffle()
     */
    shuffle() {
        if (this.count() < 2) return this;
        return this.__newInstance__(
            this.reduce((p, n) => {
                const index = Math.floor(Math.random() * (p.length - 1) + 1);
                return Array.isArray(p)
                    ? [...p.slice(index, p.length + 1), n, ...p.slice(0, index)]
                    : [p, n];
            }),
            this[__columns__]
        );
    }

    /**
     * Return a random sample of rows.
     * @param {Number} percentage A percentage of the orignal DataFrame giving the sample size.
     * @returns {DataFrame} A sample DataFrame
     * @example
     * df.sample(0.3)
     */
    sample(percentage) {
        const nRows = this.count() * percentage;
        let token = 0;
        return this.__newInstance__(
            iter(
                this.shuffle()[__rows__],
                (row) => {
                    token++;
                    return row;
                },
                () => token >= nRows
            ),
            this[__columns__]
        );
    }

    /**
     * Randomly split a DataFrame into 2 DataFrames.
     * @param {Number} percentage A percentage of the orignal DataFrame giving the first DataFrame size. The second takes the rest.
     * @returns {Array} An Array containing the two DataFrames. First, the X% DataFrame then the rest DataFrame.
     * @example
     * const [30DF, 70DF] = df.bisect(0.3)
     */
    bisect(percentage) {
        const nRows = this.count() * percentage;
        let token = 0;
        const restRows = [];
        return [
            this.__newInstance__(
                iter(this.shuffle()[__rows__], (row) => {
                    if (token < nRows) {
                        token++;
                        return row;
                    }
                    restRows.push(row);
                }),
                this[__columns__]
            ),
            this.__newInstance__(restRows, this[__columns__])
        ];
    }

    /**
     * Group DataFrame rows by columns giving a GroupedDataFrame object. See its doc for more examples.
     * @param {...String} columnNames The columns used for the groupBy.
     * @returns {GroupedDataFrame} A GroupedDataFrame object.
     * @example
     * df.groupBy('column1')
     * df.groupBy('column1', 'column2')
     * df.groupBy('column1', 'column2').listGroups()
     * df.groupBy('column1', 'column2').show()
     * df.groupBy('column1', 'column2').aggregate((group) => group.count())
     */
    groupBy(...args) {
        return groupBy(this, args);
    }

    /**
     * Sort DataFrame rows based on column values. The row should contains only one variable type. Columns are sorted left-to-right.
     * @param {String | Array<string>} columnNames The columns giving order.
     * @param {Boolean} [reverse=false] Reverse mode. Reverse the order if true.
     * @param {String} [missingValuesPosition='first'] Define the position of missing values (undefined, nulls and NaN) in the order.
     * @returns {DataFrame} An ordered DataFrame.
     * @example
     * df.sortBy('id')
     * df.sortBy(['id1', 'id2'])
     * df.sortBy(['id1'], true)
     */
    sortBy(columnNames, reverse = false, missingValuesPosition = "first") {
        if (!Array.isArray(columnNames)) {
            columnNames = [columnNames];
        }
        const _columnNames = columnNames;
        const _missingValuesPosition = ["first", "last"].includes(
            missingValuesPosition
        )
            ? missingValuesPosition
            : "first";

        const _checkMissingValue = (v) => [NaN, null, undefined].includes(v);

        const sortedRows = this[__rows__].sort((p, n) => {
            return _columnNames
                .map((col) => {
                    const [pValue, nValue] = [p.get(col), n.get(col)];
                    if (_checkMissingValue(pValue)) {
                        return _missingValuesPosition === "last" ? 1 : -1;
                    } else if (_checkMissingValue(nValue)) {
                        return _missingValuesPosition === "last" ? -1 : 1;
                    } else if (typeof pValue !== typeof nValue) {
                        throw new MixedTypeError([
                            typeof pValue,
                            typeof nValue
                        ]);
                    } else if (pValue > nValue) {
                        return reverse ? -1 : 1;
                    } else if (pValue < nValue) {
                        return reverse ? 1 : -1;
                    }
                    return 0;
                })
                .reduce((acc, curr) => {
                    return acc || curr;
                });
        });

        if (_columnNames.length > 1) {
            const sortedRowsWithMissingValues = [];
            const sortedRowsWithoutMissingValues = [];
            sortedRows.forEach((row) => {
                for (const col of _columnNames) {
                    if (_checkMissingValue(row.get(col))) {
                        sortedRowsWithMissingValues.push(row);
                        return;
                    }
                }
                sortedRowsWithoutMissingValues.push(row);
            });

            return this.__newInstance__(
                missingValuesPosition === "last"
                    ? sortedRowsWithoutMissingValues.concat(
                          sortedRowsWithMissingValues
                      )
                    : sortedRowsWithMissingValues.concat(
                          sortedRowsWithoutMissingValues
                      ),
                this[__columns__]
            );
        }

        return this.__newInstance__(sortedRows, this[__columns__]);
    }

    /**
     * Concat two DataFrames.
     * @param {DataFrame} dfToUnion The DataFrame to concat.
     * @returns {DataFrame} A new concatenated DataFrame resulting of the union.
     * @example
     * df.union(df2)
     */
    union(dfToUnion) {
        if (!(dfToUnion instanceof DataFrame))
            throw new ArgumentTypeError(dfToUnion, "DataFrame");
        if (!arrayEqual(this[__columns__], dfToUnion[__columns__])) {
            throw new WrongSchemaError(
                dfToUnion[__columns__],
                this[__columns__]
            );
        }
        return this.__newInstance__(
            [...this, ...dfToUnion.restructure(this[__columns__])],
            this[__columns__]
        );
    }

    /**
     * Join two DataFrames.
     * @param {DataFrame} dfToJoin The DataFrame to join.
     * @param {String | Array} columnNames The selected columns for the join.
     * @param {String} [how='inner'] The join mode. Can be: full, inner, outer, left, right.
     * @returns {DataFrame} The joined DataFrame.
     * @example
     * df.join(df2, 'column1', 'full')
     */
    join(dfToJoin, columnNames, how = "inner") {
        const joinMethods = {
            inner: () => this.innerJoin(dfToJoin, columnNames),
            full: () => this.fullJoin(dfToJoin, columnNames),
            outer: () => this.outerJoin(dfToJoin, columnNames),
            left: () => this.leftJoin(dfToJoin, columnNames),
            right: () => this.rightJoin(dfToJoin, columnNames)
        };
        return joinMethods[how]();
    }

    /**
     * Join two DataFrames with inner mode.
     * @param {DataFrame} dfToJoin The DataFrame to join.
     * @param {String | Array} columnNames The selected columns for the join.
     * @returns {DataFrame} The joined DataFrame.
     * @example
     * df.innerJoin(df2, 'id')
     * df.join(df2, 'id')
     * df.join(df2, 'id', 'inner')
     */
    innerJoin(dfToJoin, columnNames) {
        return this._join(dfToJoin, columnNames, ["in"]);
    }

    /**
     * Join two DataFrames with full mode.
     * @param {DataFrame} dfToJoin The DataFrame to join.
     * @param {String | Array} columnNames The selected columns for the join.
     * @returns {DataFrame} The joined DataFrame.
     * @example
     * df.fullJoin(df2, 'id')
     * df.join(df2, 'id', 'full')
     */
    fullJoin(dfToJoin, columnNames) {
        return this._join(dfToJoin, columnNames, ["full", "full"]);
    }

    /**
     * Join two DataFrames with outer mode.
     * @param {DataFrame} dfToJoin The DataFrame to join.
     * @param {String | Array} columnNames The selected columns for the join.
     * @returns {DataFrame} The joined DataFrame.
     * @example
     * df2.outerJoin(df2, 'id')
     * df2.join(df2, 'id', 'outer')
     */
    outerJoin(dfToJoin, columnNames) {
        return this.fullJoin(dfToJoin, columnNames);
    }

    /**
     * Join two DataFrames with left mode.
     * @param {DataFrame} dfToJoin The DataFrame to join.
     * @param {String | Array} columnNames The selected columns for the join.
     * @returns {DataFrame} The joined DataFrame.
     * @example
     * df.leftJoin(df2, 'id')
     * df.join(df2, 'id', 'left')
     */
    leftJoin(dfToJoin, columnNames) {
        return this._join(dfToJoin, columnNames, ["full", "in"]);
    }

    /**
     * Join two DataFrames with right mode.
     * @param {DataFrame} dfToJoin The DataFrame to join.
     * @param {String | Array} columnNames The selected columns for the join.
     * @returns {DataFrame} The joined DataFrame.
     * @example
     * df.rightJoin(df2, 'id')
     * df.join(df2, 'id', 'right')
     */
    rightJoin(dfToJoin, columnNames) {
        return this._join(dfToJoin, columnNames, ["in", "full"]);
    }

    /**
     * Find the differences between two DataFrames (reverse of join).
     * @param {DataFrame} dfToDiff The DataFrame to diff.
     * @param {String | Array} columnNames The selected columns for the diff.
     * @returns {DataFrame} The differences DataFrame.
     * @example
     * df2.diff(df2, 'id')
     */
    diff(dfToDiff, columnNames) {
        return this._join(dfToDiff, columnNames, ["out", "out"]);
    }

    /**
     * Create a new subset DataFrame based on the first rows.
     * @param {Number} [nRows=10] The number of first rows to get.
     * @returns {DataFrame} The subset DataFrame.
     * @example
     * df2.head()
     * df2.head(5)
     */
    head(nRows = 10) {
        return this.slice(0, nRows);
    }

    /**
     * Create a new subset DataFrame based on the last rows.
     * @param {Number} [nRows=10] The number of last rows to get.
     * @returns {DataFrame} The subset DataFrame.
     * @example
     * df2.tail()
     * df2.tail(5)
     */
    tail(nRows = 10) {
        return this.slice(-nRows);
    }

    /**
     * Create a new subset DataFrame based on given indexs. Similar to Array.slice.
     * @param {Number} [startIndex=0] The index to start the slice (included).
     * @param {Number} [endIndex=this.count()] The index to end the slice (excluded).
     * @returns {DataFrame} The subset DataFrame.
     * @example
     * df2.slice()
     * df2.slice(0)
     * df2.slice(0, 20)
     * df2.slice(10, 30)
     */
    slice(startIndex, endIndex) {
        return this.__newInstance__(
            this[__rows__].slice(
                startIndex || undefined,
                endIndex || undefined
            ),
            this[__columns__]
        );
    }

    /**
     * Return a Row by its index.
     * @param {Number} [index=0] The index to select the row.
     * @returns {Row} The Row.
     * @example
     * df2.getRow(1)
     */
    getRow(index) {
        return this[__rows__][index];
    }

    /**
     * Modify a Row a the given index.
     * @param {Number} [index=0] The index to select the row.
     * @returns {DataFrame} A new DataFrame with the modified Row.
     * @example
     * df2.setRowByIndex(1, row => row.set("column1", 33))
     */
    setRow(index, func = (row) => row) {
        const newRows = Array.from(this[__rows__]);
        newRows[index] = func(newRows[index]);
        return this.__newInstance__(newRows, this[__columns__]);
    }
}

DataFrame.defaultModules = [];

export default DataFrame;
