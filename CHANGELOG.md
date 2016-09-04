# Changelog

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
- Adding an optional parameter for DataFrame.toArray(), columnName, allowing to return only one column as Array. Related to issue [#11](https://github.com/Gmousse/dataframe-js/issues/11).
- Adding DataFrame.toCollection(), to return the DataFrame as a collection of dictionnaries (object). Related to issue [#9](https://github.com/Gmousse/dataframe-js/issues/9).
- Adding DataFrame.stat.sum() in the stat module. Related to issue [#10](https://github.com/Gmousse/dataframe-js/issues/10).
- Debbugging DataFrame.show(). Related to the issue [#7](https://github.com/Gmousse/dataframe-js/issues/7).
- Refactoring join methods.
- Adding unit tests to cover more cases.

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
