import test from "ava";

import { DataFrame } from "../src/index";
import { tryCatch } from "./utils";

test("DataFrame sql module can ", assert => {
    const df1 = new DataFrame(
        {
            id: [3, 6, 8],
            id2: [3, 6, 8],
            column1: [3, 9, 9],
            column2: ["car", "on the road again again", "the fly was crashing"]
        },
        ["id", "id2", "column1", "column2"]
    );

    const df2 = new DataFrame(
        {
            id: [1, 0, 8],
            id2: [3, 6, 8],
            column3: [2, 1, 12],
            column4: ["bus", "truck", "train"]
        },
        ["id", "id2", "column3", "column4"]
    );

    df1.sql.register("tmp");
    df2.sql.register("tmp2");

    assert.deepEqual(
        DataFrame.sql.listTables(),
        ["tmp", "tmp2"],
        "list registered tables."
    );

    DataFrame.sql.registerTable(df1, "tmp3");
    assert.deepEqual(
        DataFrame.sql.listTables(),
        ["tmp", "tmp2", "tmp3"],
        "register a table."
    );

    DataFrame.sql.dropTable("tmp3");
    assert.deepEqual(
        DataFrame.sql.listTables(),
        ["tmp", "tmp2"],
        "drop a table."
    );

    DataFrame.sql.registerTable(df1, "tmp4");
    DataFrame.sql.registerTable(df1, "tmp5");
    DataFrame.sql.renameTable("tmp4", "tmp6");
    assert.deepEqual(
        DataFrame.sql.listTables(),
        ["tmp", "tmp2", "tmp5", "tmp6"],
        "rename a table."
    );

    DataFrame.sql.renameTable("tmp5", "tmp6", true);
    assert.deepEqual(
        DataFrame.sql.listTables(),
        ["tmp", "tmp2", "tmp6"],
        "rename a table by using the an existing table name, overwriting it."
    );

    DataFrame.sql.dropTables();
    assert.deepEqual(DataFrame.sql.listTables(), [], "drop all tables.");

    df1.sql.register("tmp");
    assert.deepEqual(
        DataFrame.sql.request("SELECT * FROM tmp").toDict(),
        df1.toDict(),
        "select everything from a table."
    );

    df1.sql.register("tmp2");
    df2.sql.register("tmp2", true);
    assert.deepEqual(
        DataFrame.sql.request("SELECT * FROM tmp2").toDict(),
        df2.toDict(),
        "overwrite an existing table."
    );

    assert.deepEqual(
        DataFrame.sql
            .request("SELECT column3 AS column1, column4 AS column2 FROM tmp2")
            .toDict(),
        df2
            .select("column3", "column4")
            .renameAll(["column1", "column2"])
            .toDict(),
        "select specific columns from a table and renamed them."
    );

    assert.deepEqual(
        DataFrame.sql
            .request(
                'SELECT * FROM tmp WHERE column1 >= 2 AND column2 != "on the road again again"'
            )
            .toDict(),
        df1
            .filter(
                row =>
                    row.get("column1") >= 2 &&
                    row.get("column2") !== "on the road again again"
            )
            .toDict(),
        "select everything from a table and filter rows based on multiple conditions."
    );

    assert.deepEqual(
        DataFrame.sql
            .request("SELECT * FROM tmp WHERE column1 IN (2, 3, 4)")
            .toDict(),
        df1.filter(row => [2, 3, 4].includes(row.get("column1"))).toDict(),
        "select everything from a table and filter rows with numbers."
    );

    assert.deepEqual(
        DataFrame.sql
            .request("SELECT * FROM tmp WHERE column1 >= 2 AND column1 <= 1138")
            .toDict(),
        df1
            .filter(
                row => row.get("column1") >= 2 && row.get("column1") <= 1138
            )
            .toDict(),
        "select everything from a table and filter rows with numbers (2)."
    );

    assert.deepEqual(
        DataFrame.sql.request("SELECT * FROM tmp JOIN tmp2 ON id").toDict(),
        df1.innerJoin(df2, "id").toDict(),
        "select everything from a join (inner) between 2 tables."
    );

    assert.deepEqual(
        DataFrame.sql
            .request("SELECT * FROM tmp JOIN tmp2 ON id, id2")
            .toDict(),
        df1.innerJoin(df2, ["id", "id2"]).toDict(),
        "select everything from a join (inner on two columns) between 2 tables."
    );

    assert.deepEqual(
        DataFrame.sql
            .request(
                "SELECT * FROM tmp JOIN tmp2 ON id WHERE column1 != undefined"
            )
            .toDict(),
        df1
            .innerJoin(df2, "id")
            .filter(row => row.get("column1") !== undefined)
            .toDict(),
        "select everything from a join chained with a filter."
    );

    assert.deepEqual(
        DataFrame.sql
            .request(
                "SELECT * FROM tmp UNION SELECT id, id2, column3 AS column1, column4 AS column2 FROM tmp2"
            )
            .toDict(),
        df1.union(df2.renameAll(["id", "id2", "column1", "column2"])).toDict(),
        "select everything from an union between 2 queries."
    );

    assert.deepEqual(
        DataFrame.sql
            .request("SELECT DISTINCT column1 AS distinctC1 FROM tmp")
            .toDict(),
        df1
            .distinct("column1")
            .rename("column1", "distinctC1")
            .toDict(),
        "select column with distinct values and rename it."
    );

    assert.deepEqual(
        DataFrame.sql
            .request('SELECT * FROM tmp WHERE "road" IN column2')
            .toDict(),
        df1.filter(row => row.get("column2").includes("road")).toDict(),
        "select column by finding a string in reach row."
    );

    assert.deepEqual(
        DataFrame.sql.request("SELECT COUNT(column1) FROM tmp"),
        df1.select("column1").count(),
        "count column rows."
    );

    assert.deepEqual(
        DataFrame.sql.request("SELECT SUM(column1) FROM tmp"),
        df1.stat.sum("column1"),
        "compute column sum."
    );

    assert.deepEqual(
        DataFrame.sql.request("SELECT MAX(column1) FROM tmp"),
        df1.stat.max("column1"),
        "compute column max."
    );

    assert.deepEqual(
        DataFrame.sql.request("SELECT MIN(column1) FROM tmp"),
        df1.stat.min("column1"),
        "compute column min."
    );

    assert.deepEqual(
        DataFrame.sql.request("SELECT AVG(column1) FROM tmp"),
        df1.stat.mean("column1"),
        "count column mean."
    );

    assert.deepEqual(
        DataFrame.sql
            .request("SELECT * FROM tmp GROUP BY column1")
            .listGroups(),
        df1.groupBy("column1").listGroups(),
        "groupBy which returns a GroupedDataFrame"
    );

    assert.deepEqual(
        DataFrame.sql
            .request("SELECT AVG(column1) FROM tmp GROUP BY column1")
            .toDict(),
        df1
            .groupBy("column1")
            .aggregate(group => group.stat.mean("column1"))
            .toDict(),
        "groupBy on a column and compute an aggregation."
    );

    assert.deepEqual(
        DataFrame.sql
            .request("SELECT COUNT(column1) FROM tmp GROUP BY column1, column2")
            .toDict(),
        df1
            .groupBy("column1", "column2")
            .aggregate(group => group.count())
            .toDict(),
        "groupBy on multiple columns and compute an aggregation."
    );

    const df3 = new DataFrame(
        {
            id: [1, 0, 8],
            "column 1": ["hello", "world", "hello world"]
        },
        ["id", "column 1"]
    );

    df3.sql.register("my_table");

    assert.deepEqual(
        DataFrame.sql
            .request('SELECT * FROM my_table WHERE column 1 = "hello"')
            .toDict(),
        df3.filter(row => row.get("column 1") === "hello").toDict(),
        "filter on column name having space."
    );

    assert.deepEqual(
        DataFrame.sql
            .request('SELECT * FROM my_table WHERE "hello world" IN column 1')
            .toDict(),
        df3.filter(row => row.get("column 1").includes("hello world")).toDict(),
        "filter on column name having space with a string having space."
    );
});

test("DataFrame sql module can't ", assert => {
    assert.is(
        tryCatch(() => DataFrame.sql.registerTable([], "tmp3")).name,
        "ArgumentTypeError",
        "register a table which is not a DataFrame."
    );

    assert.is(
        tryCatch(() => DataFrame.sql.request()).name,
        "ArgumentTypeError",
        "execute a query which is not a String, throwing ArgumentTypeError."
    );

    assert.is(
        tryCatch(() =>
            DataFrame.sql.registerTable(new DataFrame([{ c1: 1 }]), "tmp")
        ).name,
        "TableAlreadyExistsError",
        "register a table when the name already exists without using overwrite mode, throwing TableAlreadyExistsError."
    );

    assert.is(
        tryCatch(() => DataFrame.sql.renameTable("tmp2", "tmp")).name,
        "TableAlreadyExistsError",
        "rename a table by using a table name already used without using overwrite mode, throwing TableAlreadyExistsError."
    );

    assert.deepEqual(
        tryCatch(() => DataFrame.sql.request("COUNT(column1) FROM tmp")).name,
        "SQLParseError",
        "execute a query without SELECT, throwing SQLParseError."
    );

    assert.deepEqual(
        tryCatch(() => DataFrame.sql.request("SELECT COUNT(column1) tmp")).name,
        "SQLParseError",
        "execute a query without FROM, throwing SQLParseError."
    );

    assert.deepEqual(
        tryCatch(() => DataFrame.sql.request("SELECT COUNT(column1) FROM"))
            .name,
        "SQLParseError",
        "execute a query without table name, throwing SQLParseError."
    );

    assert.deepEqual(
        tryCatch(() =>
            DataFrame.sql.request("SELECT COUNT(column1) FROM tmp404")
        ).name,
        "SQLParseError",
        "execute a query with a wrong table name, throwing SQLParseError."
    );

    assert.deepEqual(
        tryCatch(() => DataFrame.sql.request("SELECT FROM tmp2")).name,
        "NoSuchColumnError",
        "execute a query without a column name, throwing NoSuchColumnError."
    );

    assert.deepEqual(
        tryCatch(() => DataFrame.sql.request("SELECT column1 FROM tmp2")).name,
        "NoSuchColumnError",
        "execute a query with a wrong column name, throwing NoSuchColumnError."
    );

    assert.deepEqual(
        tryCatch(() =>
            DataFrame.sql.request("SELECT * FROM tmp2").sql.register("my table")
        ).name,
        "WrongTableNameError",
        "register a bad formatted table name, throwing WrongTableNameError."
    );

    assert.deepEqual(
        tryCatch(() => DataFrame.sql.renameTable("tmp2", "my table")).name,
        "WrongTableNameError",
        "rename a bad formatted table name, throwing WrongTableNameError."
    );
});
