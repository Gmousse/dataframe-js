# Changelog

---

## v1.2.7


**Author**: Guillaume Mousnier.

**Type**: Hotfix

**Changes**:
- Row.set and Row.delete now changes DataFrame schema. See [](https://github.com/Gmousse/dataframe-js/issues/30)
- Fixing d3-requests to avoid build error. See [](https://github.com/d3/d3-request/issues/24)

---

## v1.2.6


**Author**: Guillaume Mousnier.

**Type**: Hotfix

**Changes**:
- Removing the file /lib/modules/sql.js (present due to a bug of npm run build).
- The code doesn't need es7-checktypes anymore.

---

## v1.2.5


**Author**: Guillaume Mousnier.

**Type**: Hotfix

**Changes**:
- Removing checktypes. (https://github.com/Gmousse/dataframe-js/pull/27)
- Adding some documentation.

---

## v1.2.4

**Author**: Guillaume Mousnier.

**Type**: Hotfix

**Changes**:
- Debugging SQL module in order to handle correctly IN operator.
- Adding validation on SQL module table names. Spaces, tabs, ... are not valid anymore.
- Debugging SQL module in order to work properly with column names having spaces...
- Adding tests on SQL module.
- Debugging file import (JSON, CSVs) unit tests (promises were bugged in the test).
- Adding a FileNotFoundError.
- Wrong file paths or relative paths are now correctly catched and throw an FileNotFoundError.
- Refactoring file imports.
- Adding yarn documentation in the README.
- Adding DataFrame.fromDSV (alias of fromText, to be more precise).
- Adding DataFrame.fromPSV.
- Adding DataFrame.fromTSV.
- Now using d3.format to handle DataFrame.toDSV, DataFrame.toText, DataFrame.toCSV...
- Adding DataFrame.toDSV (alias of toText, to be more precise).
- Adding DataFrame.toPSV.
- Adding DataFrame.toTSV.
- Adding tests on different file formats.
- Catching strange behaviour of csv loading in nodejs 0.10.0 and 0.12.0.

---

## v1.2.3

**Author**: Guillaume Mousnier.

**Type**: Hotfix

**Changes**:
- A critical performance issue related to GroupedDataFrame is now resolved. Related to [#21](https://github.com/Gmousse/dataframe-js/issues/21). **GroupedDataFrame, DataFrame.groupBy, DataFrame.join(s), DataFrame.diff, DataFrame.dropDuplicates are now 10000 x faster** than previously. See below for the detail:
    - Removing shitty combine function which was the cause of the performance issue.
    - Adding a Row.hash generating the hash id for a row.
    - Modifying GroupedDataFrame._groupBy to resolve the performance issue.
- Error messages are now displayed correctly.
- NoSuchColumnError is now correctly typed (not TypeError) but simply an Error.
- DataFrame Errors are now exported in the Errors module.
- Updating es7-checktypes-decorator to 0.2.1 for the same purpose.
- Better Error handling on missing or wrong parameters.
- Using custom webpack.optimize.UglifyJsPlugin in webpack.config.js instead of webpack -p.
- Adding option keep_fnames on uglify (see above) to repair checktypes decorator after minification. Related to [#21](https://github.com/Gmousse/dataframe-js/issues/21) and [#23](https://github.com/Gmousse/dataframe-js/issues/23).
- Adding check-node-version --node '>= 4' before npm run lint to avoid CI fails on old node versions. Indeed, eslint doesn't support node < 4 anymore.
- Refactor on npm scripts.

---

## v1.2.2

**Author**: Guillaume Mousnier.

**Type**: Hotfix

**Changes**:
- Bugfix on join methods. They have now a correct behaviour. Thanks to @PaulMest
- .outerJoin had a wrong behaviour. It would show the difference between dataframes. .outerJoin is now an alias for .fullJoin. The old behaviour can now be found in .diff.
- Tests on join methods are now splitted into a single file dataframe_join-test.js. In the future, each test will be splitted by category of functions.

---

## v1.2.1

**Author**: Guillaume Mousnier.

**Type**: Hotfix

**Changes**:
- Modify gitbook and link in npm.

---

## v1.2.0

**Author**: Guillaume Mousnier.

**Type**: Feature

**Changes**:
- Adding .pivot().
- Adding .melt().
- Better umd code compression.
- Cleaning the repo.
- The documentation is now under gitbook.

---

## v1.1.5

**Author**: Guillaume Mousnier.

**Type**: Hotfix

**Changes**:
- Replacing fs writeFile by writeFileSync.

---

## v1.1.4

**Author**: Guillaume Mousnier.

**Type**: Hotfix

**Changes**:
- Contributing.

---

## v1.1.3

**Author**: Guillaume Mousnier.

**Type**: Hotfix

**Changes**:
- Adding code coverage.

---

## v1.1.2

**Author**: Guillaume Mousnier. Thanks to @lmeyerov

**Type**: Hotfix

**Changes**:
- Deleting withespaces removal in DataFrame. [#14](https://github.com/Gmousse/dataframe-js/issues/14).
- Fixing withespaces bugs in SQL. [#14](https://github.com/Gmousse/dataframe-js/issues/14).
- Fixing DataFrame.union() bug when columns aren't in the same order.
[#15](https://github.com/Gmousse/dataframe-js/issues/15).

---

## v1.1.1

**Author**: Guillaume Mousnier.

**Type**: Feature

**Changes**:
- Fixing a doc issue related to [#13](https://github.com/Gmousse/dataframe-js/issues/13).

---

## v1.1.0

**Author**: Guillaume Mousnier.

**Type**: Feature

**Changes**:
- (Optional) Adding a support for .fromCSV, .fromText, .fromJSON to use browser File object.

---

## v1.0.2

**Author**: Guillaume Mousnier.

**Type**: Hotfix

**Changes**:
- Try catching the fs module for browsers.

---

## v1.0.0

**Author**: Guillaume Mousnier

**Type**: Major Release

**Changes**:
- Adding the sql module. Related to the issue [#5](https://github.com/Gmousse/dataframe-js/issues/5).
- Adding a GroupedDataFrame object (obtained when group by) with aggregates. Related to the issue [#8](https://github.com/Gmousse/dataframe-js/issues/8).
- DataFrame.groupBy aggregates now returns a DataFrame with an aggregation column. Related to the issue [#8](https://github.com/Gmousse/dataframe-js/issues/8). /!\ Incompatible with older versions.
- DataFrame.groupBy can be used on multiple columns. ex: df.groupBy('col1', 'col2'). Related to the issues [#4](https://github.com/Gmousse/dataframe-js/issues/4) and [#8](https://github.com/Gmousse/dataframe-js/issues/8).
- Adding DataFrame.renameAll() to rename each columns of the DataFrame (current .rename()). Related to issue [#12](https://github.com/Gmousse/dataframe-js/issues/12).
- Changing DataFrame.rename() which now renames only one column (see .renameAll()). Related to issue [#12](https://github.com/Gmousse/dataframe-js/issues/12). /!\ Incompatible with older versions.
- Changing DataFrame.matrix.isCommutative() which now receives DataFrame as parameter and not an Array, in order to be more consistant with all the API. /!\ Incompatible with older versions.
- Adding an optional parameter for DataFrame.toArray(), columnName, allowing to return only one column as Array. Related to issue [#11](https://github.com/Gmousse/dataframe-js/issues/11).
- Adding DataFrame.toCollection(), to return the DataFrame as a collection of dictionnaries (object). Related to issue [#9](https://github.com/Gmousse/dataframe-js/issues/9).
- Adding an optional parameter to DataFrame.toJSON(asCollection) to build a JSON object containing a collection of Object.
- Adding DataFrame.stat.sum() in the stat module. Related to issue [#10](https://github.com/Gmousse/dataframe-js/issues/10).
- Adding static DataFrame.fromCSV(), .fromText() and .fromJSON() method, allowing to create a DataFrame (via a Promise) from files (path or url).
- Adding DataFrame.dropDuplicates() which removes duplicated rows.
- DataFrame.randomSplit() is renamed in DataFrame.bisect(). /!\ Incompatible with older versions.
- Debbugging DataFrame.show(). Related to the issue [#7](https://github.com/Gmousse/dataframe-js/issues/7).
- Debbugging DataFrame.sortBy(). Now, it returns an error when applied on a mixed type column. Related to the issues [#3](https://github.com/Gmousse/dataframe-js/issues/3) and [#6](https://github.com/Gmousse/dataframe-js/issues/6).
- Debbugging DataFrame.sortBy() when used with string.
- DataFrame.distinct() now throw correctly NoSuchColumnError when passing an incorrect columnName.
- Adding Error messages on Row, DataFrame, GroupedDataFrame and modules...
- join methods are completely revisited, providing a result near from sql. Moreover you can join on multiple columns.
- DataFrame.replace() columnNames arguments are now passed as String (for a single column) or in Array (for multiple ones).
- DataFrame.transpose() has now an optional argument, transposeColumnNames which place columnNames as rowNames.
- Adding unit tests to cover more cases.
- Unit tests are now realized on es5 compiled version.
- Clarifying error messages.
- Adding `@checktypes` (see [es7-checktypes-decorator](https://github.com/Gmousse/es7-checktypes-decorator)) to handle wrong arguments types.
- Removing InputTypeError, now replaced by `@checktypes`. /!\ Incompatible with older versions.

---

## v0.2.9

**Author**: Guillaume Mousnier

**Type**: Hotfix

**Changes**:
- Fixing issue [#2](https://github.com/Gmousse/dataframe-js/issues/2).
- Defined as first real stable version.

---

## v0.2.7

**Author**: Guillaume Mousnier

**Type**: Hotfix

**Changes**:
- Updating keywords and presentation.

---

## v0.2.6

**Author**: Guillaume Mousnier.

**Type**: Hotfix

**Changes**:
- Just some docs.

---

## v0.2.5

**Author**: Guillaume Mousnier

**Type**: Hotfix

**Changes**:
- Correcting commonjs lib.

---

## v0.2.4

**Author**: Guillaume Mousnier

**Type**: Hotfix

**Changes**:
- Correcting (maybe more an alternative) for babel related static method error.
- Adding webpack to compile browser version.

---

## v0.2.3

**Author**: Guillaume Mousnier

**Type**: Hotfix

**Changes**:
- Adding minify version of the compiled code.
- PR from GuillaumeAmat: https://github.com/Gmousse/dataframe-js/pull/1

---

## v0.2.2

**Author**: Guillaume Mousnier

**Type**: Hotfix

**Changes**:
- Removing jquery in dependencies.

---

## v0.2.1

**Author**: Guillaume Mousnier

**Type**: Feature

**Changes**:
- First functional version.

---

## v0.1.0

**Author**: Guillaume Mousnier

**Type**: Feature

**Changes**:
- Init the repo.

---
