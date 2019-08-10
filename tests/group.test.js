import test from "ava";

import { groupBy, GroupedDataFrame } from "../src/group";
import DataFrame from "../src/dataframe";

test("GroupedDataFrame can be ", assert => {
    const df = new DataFrame(
        [
            { column1: 1, column2: "On the road", column3: undefined },
            { column1: 3, column2: "again", column3: undefined },
            { column1: 1, column2: "again", column3: NaN },
            { column1: 3, column2: "On the road", column3: undefined },
            { column1: 1, column2: "On the road", column3: NaN },
            { column1: 2, column2: "again", column3: undefined }
        ],
        ["column1", "column2", "column3"]
    );

    assert.deepEqual(
        Array.from(groupBy(df, ["column3"])).map(({ group }) =>
            group.toCollection()
        )[0],
        [
            { column1: 1, column2: "On the road", column3: undefined },
            { column1: 3, column2: "again", column3: undefined },
            { column1: 3, column2: "On the road", column3: undefined },
            { column1: 2, column2: "again", column3: undefined }
        ],
        "created on a column."
    );

    assert.deepEqual(
        Array.from(groupBy(df, ["column3", "column2"])).map(({ group }) =>
            group.toCollection()
        )[0],
        [
            { column1: 1, column2: "On the road", column3: undefined },
            { column1: 3, column2: "On the road", column3: undefined }
        ],
        "created on multiple columns."
    );

    assert.deepEqual(
        groupBy(df, ["column1"])
            .toCollection()
            .map(x => Object.keys(x)),
        [
            ["groupKey", "hash", "group"],
            ["groupKey", "hash", "group"],
            ["groupKey", "hash", "group"]
        ],
        "converted into a collection of dictionnaries containing each group."
    );
    assert.deepEqual(
        Array.from(groupBy(df, ["column1"])).map(x => Object.keys(x)),
        [
            ["groupKey", "hash", "group"],
            ["groupKey", "hash", "group"],
            ["groupKey", "hash", "group"]
        ],
        "converted into a collection of dictionnaries containing each group when destructured."
    );
    assert.deepEqual(
        groupBy(df, ["column1", "column3"]).show(true),
        [
            '--\n[{"column1":1}]\n--',
            "| column1   | column2   | column3   |",
            "------------------------------------",
            "| 1         | On the... | undefined |",
            '--\n[{"column1":3}]\n--',
            "| column1   | column2   | column3   |",
            "------------------------------------",
            "| 3         | again     | undefined |",
            "| 3         | On the... | undefined |",
            '--\n[{"column1":1,"column3":null}]\n--',
            "| column1   | column2   | column3   |",
            "------------------------------------",
            "| 1         | again     | NaN       |",
            "| 1         | On the... | NaN       |",
            '--\n[{"column1":2}]\n--',
            "| column1   | column2   | column3   |",
            "------------------------------------",
            "| 2         | again     | undefined |"
        ].join("\n"),
        "showed as a String."
    );

    assert.deepEqual(
        groupBy(df, ["column1"])
            .map((row, i) => row.set("idx", i))
            .drop("column3")
            .toCollection(),
        [
            { column1: 1, column2: "On the road", idx: 0 },
            { column1: 1, column2: "again", idx: 1 },
            { column1: 1, column2: "On the road", idx: 2 },
            { column1: 3, column2: "again", idx: 0 },
            { column1: 3, column2: "On the road", idx: 1 },
            { column1: 2, column2: "again", idx: 0 }
        ],
        "mapped with row index"
    );

    assert.deepEqual(
        groupBy(df, ["column1"])
            .filter((row, i) => i === 0)
            .drop("column3")
            .toCollection(),
        [
            { column1: 1, column2: "On the road" },
            { column1: 3, column2: "again" },
            { column1: 2, column2: "again" }
        ],
        "filtered based on index"
    );

    assert.deepEqual(
        groupBy(df, ["column1"])
            .chain(
                (row, i) => i === 0,
                row => row.set("column4", row.get("column1") * 2)
            )
            .drop("column3")
            .toCollection(),
        [
            { column1: 1, column2: "On the road", column4: 2 },
            { column1: 3, column2: "again", column4: 6 },
            { column1: 2, column2: "again", column4: 4 }
        ],
        "filtered based on index"
    );
});

test("GroupedDataFrame groups can be ", assert => {
    const df = new DataFrame(
        [
            { column1: 1, column2: "On the road", column3: undefined },
            { column1: 3, column2: "again", column3: undefined },
            { column1: 1, column2: "again", column3: NaN },
            { column1: 3, column2: "On the road", column3: undefined },
            { column1: 1, column2: "On the road", column3: NaN },
            { column1: 2, column2: "again", column3: undefined }
        ],
        ["column1", "column2", "column3"]
    );

    assert.deepEqual(
        groupBy(df, ["column1", "column2"]).listGroups(),
        [
            { column1: 1, column2: "On the road" },
            { column1: 3, column2: "again" },
            { column1: 1, column2: "again" },
            { column1: 3, column2: "On the road" },
            { column1: 2, column2: "again" }
        ],
        "listed."
    );

    assert.deepEqual(
        groupBy(df, ["column3", "column2"])
            .aggregate(group => group.count())
            .toCollection()[0],
        { column3: undefined, column2: "On the road", aggregation: 2 },
        "aggregated, rendering a DataFrame with a column aggregation."
    );
});
