# Changelog

---

## v0.3.0

**Author**: Guillaume Mousnier.

**Type**: Feature

**Changes**:
- Adding the sql module.
- Adding a GroupedDataFrame object (obtained when group by) with aggregates.
- DataFrame.groupBy aggregates now returns a DataFrame with an aggregation column.
- DataFrame.groupBy can be used on multiple columns. ex: df.groupBy('col1', 'col2').
- Adding DataFrame.renameAll() to rename each columns of the DataFrame (current .rename()).
- Changing DataFrame.rename() which now renames only one column (see .renameAll()).
- Adding an optional parameter for DataFrame.toArray(), columnName allowing to return only one column as Array.
- Adding DataFrame.stat.sum() in the stat module.
- Debbugging DataFrame.show().
- Refactoring join methods.

---

## v0.2.9

**Author**: Guillaume Mousnier.

**Type**: Hotfix

**Changes**:
- Fixing issue [#2](https://github.com/Gmousse/dataframe-js/issues/2)
- Defined as first real stable version

---

## v0.2.7

**Author**: Guillaume Mousnier.

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

**Author**: Guillaume Mousnier.

**Type**: Hotfix

**Changes**:
- Correcting commonjs lib.

---

## v0.2.4

**Author**: Guillaume Mousnier.

**Type**: Hotfix

**Changes**:
- Correcting (maybe more an alternative) for babel related static method error.
- Adding webpack to compile browser version.

---

## v0.2.3

**Author**: Guillaume Mousnier.

**Type**: Hotfix

**Changes**:
- Adding minify version of the compiled code.
- PR from GuillaumeAmat: https://github.com/Gmousse/dataframe-js/pull/1

---

## v0.2.2

**Author**: Guillaume Mousnier.

**Type**: Hotfix

**Changes**:
- Removing jquery in dependencies

---

## v0.2.1

**Author**: Guillaume Mousnier.

**Type**: Feature

**Changes**:
- First functional version

---

## v0.1.0

**Author**: Guillaume Mousnier.

**Type**: Feature

**Changes**:
- Init the repo

---
