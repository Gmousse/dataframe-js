import test from "ava";

import { DataFrame } from "../src/index";
import { tryCatch } from "./utils";

test("DataFrame columns can be", assert => {
    const df2 = new DataFrame(
        {
            column1: [3, 6, 8],
            column2: ["3", "4", "5", "6"],
            column3: []
        },
        ["column1", "column2", "column3"]
    );

    assert.deepEqual(
        df2.transpose().toDict(),
        {
            "0": [3, "3", undefined],
            "1": [6, "4", undefined],
            "2": [8, "5", undefined],
            "3": [undefined, "6", undefined]
        },
        "transposed."
    );

    assert.deepEqual(
        df2.transpose(true).toDict(),
        {
            rowNames: ["column1", "column2", "column3"],
            "0": [3, "3", undefined],
            "1": [6, "4", undefined],
            "2": [8, "5", undefined],
            "3": [undefined, "6", undefined]
        },
        "transposed, keeping columnNames as rowNames."
    );

    const df = new DataFrame(
        [[1, 6, 9, 10, 12], [1, 2], [6, 6, 9, 8, 9, 12]],
        ["c1", "c2", "c3", "c4", "c5", "c6"]
    );

    assert.deepEqual(
        df.listColumns(),
        ["c1", "c2", "c3", "c4", "c5", "c6"],
        "listed."
    );

    assert.is(df.listColumns().length, 6, "counted.");

    assert.deepEqual(
        df.select("c2", "c3", "c4").toDict(),
        {
            c2: [6, 2, 6],
            c3: [9, undefined, 9],
            c4: [10, undefined, 8]
        },
        "selected."
    );

    assert.deepEqual(
        df.select("c2").toArray(),
        [[6], [2], [6]],
        "selected individually."
    );

    assert.deepEqual(
        df
            .select("c2", "c3", "c4")
            .withColumn("c5", row => row.get("c2") - 2)
            .toDict(),
        {
            c2: [6, 2, 6],
            c3: [9, undefined, 9],
            c4: [10, undefined, 8],
            c5: [4, 0, 4]
        },
        "created."
    );

    assert.deepEqual(
        df
            .select("c2", "c3", "c4")
            .withColumn("c4", row =>
                row.get("c2") ? row.get("c2") - 2 : 0 - 2
            )
            .toDict(),
        {
            c2: [6, 2, 6],
            c3: [9, undefined, 9],
            c4: [4, 0, 4]
        },
        "modified."
    );

    assert.deepEqual(
        df
            .select("c2", "c3", "c4")
            .drop("c4")
            .toDict(),
        {
            c2: [6, 2, 6],
            c3: [9, undefined, 9]
        },
        "deleted."
    );

    assert.deepEqual(
        df
            .select("c2", "c3", "c4")
            .renameAll(["c16", "c17", "c18"])
            .listColumns(),
        ["c16", "c17", "c18"],
        "renamed."
    );

    assert.deepEqual(
        df
            .select("c2", "c3", "c4")
            .renameAll(["c16", "c17", "c18"])
            .toArray()[0],
        [6, 9, 10],
        "renamed without altering data."
    );

    assert.deepEqual(
        df
            .select("c2", "c3", "c4")
            .rename("c2", "cRenamed")
            .listColumns(),
        ["cRenamed", "c3", "c4"],
        "renamed individually."
    );

    function customFormat(valueToConvert) {
        return { value: String(Number(valueToConvert) * 10) };
    }

    assert.deepEqual(
        df
            .select("c1", "c2", "c3")
            .castAll([String, Number, customFormat])
            .toArray()[0],
        ["1", 6, { value: "90" }],
        "cast."
    );

    assert.deepEqual(
        df
            .select("c1", "c2", "c3")
            .cast("c2", String)
            .toArray()[0],
        [1, "6", 9],
        "cast individually."
    );

    assert.deepEqual(
        df.restructure(["c2", "c3", "c36"]).toDict(),
        {
            c2: [6, 2, 6],
            c3: [9, undefined, 9],
            c36: [undefined, undefined, undefined]
        },
        "restructured."
    );

    assert.deepEqual(
        df.restructure(["c2", "c3", "c1"]).toCollection(),
        [
            { c2: 6, c3: 9, c1: 1 },
            { c2: 2, c3: undefined, c1: 1 },
            { c2: 6, c3: 9, c1: 6 }
        ],
        "restructured to reorder existing columns."
    );

    assert.deepEqual(
        df.distinct("c1").toArray("c1"),
        [1, 6],
        "distinct, giving a column of unique values."
    );

    assert.deepEqual(
        df
            .select("c2", "c3", "c4")
            .replace(undefined, 0)
            .toDict(),
        {
            c2: [6, 2, 6],
            c3: [9, 0, 9],
            c4: [10, 0, 8]
        },
        "modified, replacing a value by another."
    );

    assert.deepEqual(
        df
            .select("c2", "c3", "c4")
            .replace([undefined, null, NaN], 0)
            .toDict(),
        {
            c2: [6, 2, 6],
            c3: [9, 0, 9],
            c4: [10, 0, 8]
        },
        "modified, replacing a value in a choice by another."
    );

    assert.deepEqual(
        df
            .select("c2", "c3", "c4")
            .dropMissingValues()
            .toDict(),
        {
            c2: [6, 6],
            c3: [9, 9],
            c4: [10, 8]
        },
        "modified, dropping missing values."
    );

    assert.deepEqual(
        df
            .select("c2", "c3", "c4")
            .dropMissingValues(["c3", "c2"])
            .toDict(),
        {
            c2: [6, 6],
            c3: [9, 9],
            c4: [10, 8]
        },
        "modified, dropping missing values in few columns."
    );

    assert.deepEqual(
        df
            .select("c2", "c3", "c4")
            .fillMissingValues(0)
            .toDict(),
        {
            c2: [6, 2, 6],
            c3: [9, 0, 9],
            c4: [10, 0, 8]
        },
        "modified, replacing missing values."
    );

    assert.deepEqual(
        df
            .select("c2", "c3", "c4")
            .replace(undefined, 0, ["c2", "c3"])
            .toDict(),
        {
            c2: [6, 2, 6],
            c3: [9, 0, 9],
            c4: [10, undefined, 8]
        },
        "modified, replacing a value by another in some columns."
    );

    assert.deepEqual(df.toArray("c2"), [6, 2, 6], "converted into Array.");
});

test("DataFrame columns can't be ", assert => {
    assert.is(
        tryCatch(() => new DataFrame([{ c1: 1, c2: 3 }]).renameAll(["c1"]))
            .name,
        "WrongSchemaError",
        "renamed when providing different columns number, throwing WrongSchemaError."
    );
});

test("DataFrame rows can be ", assert => {
    const df1 = new DataFrame(
        {
            column1: [3, 6, 8],
            column2: ["3", "4", "5", "6"],
            column3: []
        },
        ["column1", "column2", "column3"]
    );

    assert.is(df1.count(), 4, "counted.");

    assert.is(
        df1.countValue("4", "column2"),
        1,
        "counted based on a specific value in a column."
    );

    assert.is(
        df1.countValue(9, "column1"),
        0,
        "counted based on a specific value in a selected column."
    );

    assert.deepEqual(
        df1.push([1, 9, 6], [0, 5, 6]).toArray(),
        [
            [3, "3", undefined],
            [6, "4", undefined],
            [8, "5", undefined],
            [undefined, "6", undefined],
            [1, 9, 6],
            [0, 5, 6]
        ],
        "completed by pushing Arrays."
    );

    assert.deepEqual(
        df1
            .push(
                { column1: 1, column2: 9, column3: 6 },
                { column1: 0, column2: undefined, column3: 9 }
            )
            .toArray(),
        [
            [3, "3", undefined],
            [6, "4", undefined],
            [8, "5", undefined],
            [undefined, "6", undefined],
            [1, 9, 6],
            [0, undefined, 9]
        ],
        "completed by pushing dictionnaries."
    );

    assert.deepEqual(
        df1.push(...[...df1]).toArray(),
        [
            [3, "3", undefined],
            [6, "4", undefined],
            [8, "5", undefined],
            [undefined, "6", undefined],
            [3, "3", undefined],
            [6, "4", undefined],
            [8, "5", undefined],
            [undefined, "6", undefined]
        ],
        "completed by pushing rows."
    );

    assert.deepEqual(
        df1.filter(line => line.get("column1") > 3).toArray(),
        [[6, "4", undefined], [8, "5", undefined]],
        "filtered."
    );

    assert.deepEqual(
        df1.filter({ column1: 6 }).toArray(),
        [[6, "4", undefined]],
        "filtered by passing a column/value Object."
    );

    assert.deepEqual(
        df1.find({ column1: 6 }).toArray(),
        [6, "4", undefined],
        "found a row and returned it."
    );

    assert.deepEqual(
        df1.find({ column1: 12 }),
        undefined,
        "found nothing and returned undefined."
    );

    assert.deepEqual(
        df1.map(line => line.set("column1", 3)).toArray(),
        [
            [3, "3", undefined],
            [3, "4", undefined],
            [3, "5", undefined],
            [3, "6", undefined]
        ],
        "modified."
    );

    assert.deepEqual(
        df1
            .filter(line => line.get("column1") > 3)
            .map(line => line.set("column1", 3))
            .toArray(),
        [[3, "4", undefined], [3, "5", undefined]],
        "filtered and modified."
    );

    assert.deepEqual(
        df1
            .chain(
                line => line.get("column1") > 3,
                line => line.set("column1", 3)
            )
            .toArray(),
        [[3, "4", undefined], [3, "5", undefined]],
        "filtered and modified by chains (giving the same result, but faster)."
    );

    assert.deepEqual(
        df1
            .chain(
                line => line.get("column1") > 3,
                line => line.set("column1", 3),
                line => line.get("column2") === "5"
            )
            .toArray(),
        [[3, "5", undefined]],
        "filtered and modified and filtered (again) by chains."
    );

    const df2 = df1.withColumn("column1", row =>
        row.get("column1") ? row.get("column1") : 0
    );

    assert.is(
        df2.reduce((p, n) => n.get("column1") + p, 0),
        17,
        "reduced to obtain a value."
    );

    assert.deepEqual(
        df2
            .reduce((p, n) =>
                n
                    .set("column1", p.get("column1") + n.get("column1"))
                    .set("column2", p.get("column2") + n.get("column2"))
            )
            .toArray(),
        [17, "3456", undefined],
        "reduced to obtain a row."
    );

    assert.deepEqual(
        df2
            .reduceRight((p, n) =>
                n
                    .set("column1", p.get("column1") + n.get("column1"))
                    .set("column2", p.get("column2") + n.get("column2"))
            )
            .toArray(),
        [17, "6543", undefined],
        "reduced by right to obtain a row."
    );

    const df3 = new DataFrame(
        {
            id: [3, 6, 8, 1, 1, 3, 8],
            value: [1, 0, 1, 1, 1, 2, 4]
        },
        ["id", "value"]
    );

    const df4 = new DataFrame(
        {
            id: [3, 6, 8, 1, 1, 3, 8, 3],
            id2: ["a", "a", "b", "c", "b", "b", "b", "a"],
            value: [1, 0, 1, 1, 1, 2, 4, 6]
        },
        ["id", "id2", "value"]
    );

    const df4b = new DataFrame(
        {
            name: ["Henry", "Jess", "William", "Clair", "Barbara", "John"],
            test1: [95, 95, 95, 95, 94, 94],
            test2: [90, 90, 95, 89, 94, 98],
            test3: [76, 75, 76, 76, 99, 77],
            isTall: [false, true, false, true, true, false]
        },
        ["name", "test1", "test2", "test3", "isTall"]
    );

    assert.deepEqual(
        df3
            .groupBy("id")
            .toCollection()
            .map(({ groupKey, group }) => ({
                groupKey,
                group: group.toDict()
            })),
        [
            { groupKey: { id: 3 }, group: { id: [3, 3], value: [1, 2] } },
            { groupKey: { id: 6 }, group: { id: [6], value: [0] } },
            { groupKey: { id: 8 }, group: { id: [8, 8], value: [1, 4] } },
            { groupKey: { id: 1 }, group: { id: [1, 1], value: [1, 1] } }
        ],
        "groupBy on a column."
    );

    assert.deepEqual(
        df3
            .groupBy("id")
            .aggregate(group => group.count())
            .toDict(),
        {
            id: [3, 6, 8, 1],
            aggregation: [2, 1, 2, 2]
        },
        "groupBy and compute (by aggregation) the count by group."
    );

    assert.deepEqual(
        df4
            .groupBy("id", "id2")
            .aggregate(group => group.count())
            .toDict(),
        {
            id: [3, 6, 8, 1, 1, 3],
            id2: ["a", "a", "b", "c", "b", "b"],
            aggregation: [2, 1, 2, 1, 1, 1]
        },
        "groupBy on multiple columns and compute the count by group."
    );

    assert.deepEqual(
        new DataFrame(
            {
                id: [3, 6, 8, 1, 1, 3, 8],
                value: [1, 0, 1, 1, 1, 2, 4]
            },
            ["id", "value"]
        )
            .sortBy("id")
            .toArray(),
        [[1, 1], [1, 1], [3, 1], [3, 2], [6, 0], [8, 1], [8, 4]],
        "sorted by a column."
    );

    assert.deepEqual(
        new DataFrame(
            {
                id: [3, 6, 8, 1, 1, 3, 8],
                value: [1, 0, 1, 1, 1, 2, 4]
            },
            ["id", "value"]
        )
            .sortBy("id", true)
            .toArray(),
        [[8, 1], [8, 4], [6, 0], [3, 1], [3, 2], [1, 1], [1, 1]],
        "sorted and reverse by a column."
    );

    assert.deepEqual(
        df4b.sortBy(["test1", "test2", "isTall"]).toArray(),
        [
            ["Barbara", 94, 94, 99, true],
            ["John", 94, 98, 77, false],
            ["Clair", 95, 89, 76, true],
            ["Henry", 95, 90, 76, false],
            ["Jess", 95, 90, 75, true],
            ["William", 95, 95, 76, false]
        ],
        "sorted by multiple columns."
    );

    assert.deepEqual(
        df4b.sortBy(["test1", "test2", "isTall"], true).toArray(),
        [
            ["William", 95, 95, 76, false],
            ["Jess", 95, 90, 75, true],
            ["Henry", 95, 90, 76, false],
            ["Clair", 95, 89, 76, true],
            ["John", 94, 98, 77, false],
            ["Barbara", 94, 94, 99, true]
        ],
        "sorted and reverse by multiple columns."
    );

    assert.deepEqual(
        new DataFrame(
            {
                name: ["Henry", "Jess", "William", "Clair", "Barbara", "John"],
                test1: [NaN, 96, null, 95, 94, undefined],
                test2: [90, 90, 95, undefined, 94, 98],
                test3: [76, NaN, 76, 76, 99, 77]
            },
            ["name", "test1", "test2", "test3"]
        )
            .sortBy(["test1"], false, "first")
            .toArray()
            .slice(3, 6),
        [
            ["Barbara", 94, 94, 99],
            ["Clair", 95, undefined, 76],
            ["Jess", 96, 90, NaN]
        ],
        "sorted with missing values placed first."
    );

    assert.deepEqual(
        new DataFrame(
            {
                name: ["Henry", "Jess", "William", "Clair", "Barbara", "John"],
                test1: [NaN, 96, null, 95, 94, undefined],
                test2: [90, 90, 95, undefined, 94, 98],
                test3: [76, NaN, 76, 76, 99, 77]
            },
            ["name", "test1", "test2", "test3"]
        )
            .sortBy(["test1"], false, "last")
            .toArray()
            .slice(0, 3),
        [
            ["Barbara", 94, 94, 99],
            ["Clair", 95, undefined, 76],
            ["Jess", 96, 90, NaN]
        ],
        "sorted with missing values placed last."
    );

    assert.deepEqual(
        new DataFrame(
            {
                name: ["Henry", "Jess", "William", "Clair", "Barbara", "John"],
                test1: [NaN, 95, null, 95, 94, undefined],
                test2: [90, 90, 95, undefined, 94, 98],
                test3: [76, NaN, 76, 76, 99, 77]
            },
            ["name", "test1", "test2", "test3"]
        )
            .sortBy(["test1", "test2"], false, "first")
            .toArray()
            .slice(3, 6),
        [
            ["Clair", 95, undefined, 76],
            ["Barbara", 94, 94, 99],
            ["Jess", 95, 90, NaN]
        ],
        "sorted by multiple columns with missing values placed first."
    );

    assert.deepEqual(
        new DataFrame(
            {
                id: [3, 6, 8, 1, 1, 3, 8],
                value: [1, 0, 1, 1, 1, 2, 4]
            },
            ["id", "value"]
        )
            .union(
                new DataFrame(
                    {
                        id: [3, 1, 8],
                        value: [1, 0, 1]
                    },
                    ["id", "value"]
                )
            )
            .sortBy("id")
            .toArray(),
        [
            [1, 1],
            [1, 1],
            [1, 0],
            [3, 1],
            [3, 2],
            [3, 1],
            [6, 0],
            [8, 1],
            [8, 4],
            [8, 1]
        ],
        "concatenated with another DataFrame."
    );

    const df6 = new DataFrame(
        {
            id: [3, 3, 1, 8],
            id2: ["a", "b", "a", "c"],
            value: [1, 2, 0, 1]
        },
        ["id", "id2", "value"]
    );

    const df8 = new DataFrame([...Array(5000).keys()].map(row => [row]), [
        "c1"
    ]);

    assert.is(df8.sample(0.2).count(), 1000, "randomly sampled.");

    assert.deepEqual(
        df8.bisect(0.2).map(splittedDF => splittedDF.count()),
        [1000, 4000],
        "bisected by percentage into 2 DataFrames."
    );

    const pivotedDf6 = df6
        .groupBy("id")
        .pivot("id2", gdf => gdf.stat.sum("value"));

    assert.deepEqual(
        pivotedDf6.toCollection(),
        [
            { id: 3, a: 1, b: 2, c: undefined },
            { id: 1, a: 0, b: undefined, c: undefined },
            { id: 8, a: undefined, b: undefined, c: 1 }
        ],
        "pivoted."
    );

    assert.deepEqual(
        pivotedDf6
            .groupBy("id")
            .melt()
            .toCollection(),
        [
            { id: 3, variable: "a", value: 1 },
            { id: 3, variable: "b", value: 2 },
            { id: 3, variable: "c", value: undefined },
            { id: 1, variable: "a", value: 0 },
            { id: 1, variable: "b", value: undefined },
            { id: 1, variable: "c", value: undefined },
            { id: 8, variable: "a", value: undefined },
            { id: 8, variable: "b", value: undefined },
            { id: 8, variable: "c", value: 1 }
        ],
        "melted."
    );
});

test("DataFrame rows can't be ", assert => {
    assert.is(
        tryCatch(() =>
            new DataFrame([{ c1: 1, c2: 3 }]).union(
                new DataFrame([{ c1: 1, c4: 3 }])
            )
        ).name,
        "WrongSchemaError",
        "concatenated when providing different columns, throwing WrongSchemaError."
    );

    assert.is(
        tryCatch(() => new DataFrame([{ c1: 1, c2: 3 }]).union([])).name,
        "ArgumentTypeError",
        "concatened with not a DataFrame, throwing ArgumentTypeError."
    );

    assert.is(
        tryCatch(() => new DataFrame([{ c1: 1, c2: 3 }]).innerJoin([])).name,
        "ArgumentTypeError",
        "joined with not a DataFrame, throwing ArgumentTypeError."
    );

    assert.is(
        tryCatch(() =>
            new DataFrame([{ c1: 1, c2: 3 }, { c1: "test", c2: "4" }]).sortBy(
                "c1"
            )
        ).name,
        "MixedTypeError",
        "sortBy on a mixed types column, throwing MixedTypeError."
    );
});

test("DataFrame modules can be ", assert => {
    class FakeModule {
        constructor(dataframe) {
            this.df = dataframe;
            this.name = "fakemodule";
        }

        test(x) {
            return x * 2;
        }
    }

    const df = new DataFrame(
        {
            column1: [3, 6, 8],
            column2: ["3", "4", "5", "6", "yolo"],
            column3: []
        },
        ["column1", "column2", "column3"],
        { modules: [FakeModule] }
    );

    assert.is(
        df.fakemodule.test(4),
        8,
        "registered in an DataFrame instance and used."
    );

    assert.is(
        df.options.modules.length,
        DataFrame.defaultModules.length + 1,
        "listed from an instance where modules are changed from options."
    );

    assert.is(
        new DataFrame([], []).options.modules.length,
        3,
        "listed from an instance where modules are default modules."
    );

    assert.is(
        DataFrame.defaultModules.length,
        3,
        "listed from the default DataFrame static properties and counted."
    );

    DataFrame.setDefaultModules(...DataFrame.defaultModules, FakeModule);

    assert.is(
        new DataFrame(
            {
                column1: [3, 6, 8],
                column2: ["3", "4", "5", "6", "yolo"],
                column3: []
            },
            ["column1", "column2", "column3"]
        ).fakemodule.test(6),
        12,
        "registered as default DataFrame static properties and used."
    );
});

test("DataFrame stay immutable when", assert => {
    const df = new DataFrame(
        [[1, 6, 9, 10, 12], [1, 2], [6, 6, 9, 8, 9, 12]],
        ["c1", "c2", "c3", "c4", "c5", "c6"]
    );

    assert.is(
        Object.is(df.map(row => row.set("c1", 18)), df),
        false,
        "modified."
    );

    assert.is(
        Object.is(df.map(row => row), df),
        false,
        "modified, even if nothing have changed."
    );
});

test("Empty DataFrame", assert => {
    const df = new DataFrame(
        [[1, 6, 9, 10, 12], [1, 2], [6, 6, 9, 8, 9, 12]],
        ["c1", "c2", "c3", "c4", "c5", "c6"]
    );

    const emptyDF = new DataFrame([]);

    assert.is(
        emptyDF.join(df, "c1") instanceof DataFrame,
        true,
        "can be joined with another DataFrame."
    );

    assert.is(
        emptyDF.join(emptyDF, "col1") instanceof DataFrame,
        true,
        "can be joined with another empty DataFrame."
    );

    assert.is(
        emptyDF.union(emptyDF) instanceof DataFrame,
        true,
        "can be unioned with another empty DataFrame."
    );

    assert.deepEqual(
        emptyDF.shuffle() instanceof DataFrame,
        true,
        "can be shuffled."
    );
});

test("DataFrame can be shuffled", assert => {
    const df = new DataFrame([...Array(20).keys()].map(row => [row]), ["c1"]);

    assert.notDeepEqual(
        df.shuffle().toArray(),
        df.toArray(),
        "randomly shuffled."
    );

    assert.is(
        df.shuffle().count(),
        df.count(),
        "randomly shuffled and get the same length."
    );

    assert.is(
        new DataFrame([{ c1: "x" }], ["c1"]).shuffle().count(),
        1,
        "randomly shuffled and get the same length when having one row."
    );
});

test("DataFrame can be subsetted", assert => {
    const df = new DataFrame([...Array(20).keys()].map(row => [row]), ["c1"]);

    assert.deepEqual(
        df.slice(0, 10).toCollection(),
        [
            { c1: 0 },
            { c1: 1 },
            { c1: 2 },
            { c1: 3 },
            { c1: 4 },
            { c1: 5 },
            { c1: 6 },
            { c1: 7 },
            { c1: 8 },
            { c1: 9 }
        ],
        "slicing the dataframe between 0 and 10 index."
    );

    assert.deepEqual(
        df.slice(0, 10).toCollection(),
        [
            { c1: 0 },
            { c1: 1 },
            { c1: 2 },
            { c1: 3 },
            { c1: 4 },
            { c1: 5 },
            { c1: 6 },
            { c1: 7 },
            { c1: 8 },
            { c1: 9 }
        ],
        "slicing the dataframe out of index."
    );

    assert.deepEqual(
        df.head().toCollection(),
        [
            { c1: 0 },
            { c1: 1 },
            { c1: 2 },
            { c1: 3 },
            { c1: 4 },
            { c1: 5 },
            { c1: 6 },
            { c1: 7 },
            { c1: 8 },
            { c1: 9 }
        ],
        "getting a new dataframe with the first 10 elements."
    );

    assert.deepEqual(
        df.head(2).toCollection(),
        [{ c1: 0 }, { c1: 1 }],
        "getting a new dataframe with the first 2 elements."
    );

    assert.deepEqual(
        df.tail().toCollection(),
        [
            { c1: 10 },
            { c1: 11 },
            { c1: 12 },
            { c1: 13 },
            { c1: 14 },
            { c1: 15 },
            { c1: 16 },
            { c1: 17 },
            { c1: 18 },
            { c1: 19 }
        ],
        "getting a new dataframe with the last 10 elements."
    );

    assert.deepEqual(
        df.tail(2).toCollection(),
        [{ c1: 18 }, { c1: 19 }],
        "getting a new dataframe with the last 2 elements."
    );
});

test("DataFrame row", assert => {
    const df = new DataFrame([...Array(20).keys()].map(row => [row]), ["c1"]);

    assert.deepEqual(
        df.getRow(2).toDict(),
        { c1: 2 },
        "can be accessed by its index."
    );
    assert.deepEqual(
        df.getRow(300),
        undefined,
        "can be accessed by its index."
    );

    assert.deepEqual(
        df.setRow(2, row => row.set("c1", 656)).toCollection(),
        [
            { c1: 0 },
            { c1: 1 },
            { c1: 656 },
            { c1: 3 },
            { c1: 4 },
            { c1: 5 },
            { c1: 6 },
            { c1: 7 },
            { c1: 8 },
            { c1: 9 },
            { c1: 10 },
            { c1: 11 },
            { c1: 12 },
            { c1: 13 },
            { c1: 14 },
            { c1: 15 },
            { c1: 16 },
            { c1: 17 },
            { c1: 18 },
            { c1: 19 }
        ],
        "can be modified by its index."
    );
});

test("DataFrame filter with empty result", assert => {
    const df = new DataFrame([...Array(20).keys()].map(row => [row]), ["c1"]);

    assert.deepEqual(
        df.filter(row => row.get("c1") === 999).listColumns(),
        ["c1"],
        "should return an empty DataFrame with the same columns."
    );
});
