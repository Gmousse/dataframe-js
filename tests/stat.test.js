import test from "ava";

import { DataFrame } from "../src/index";

test("DataFrame stat module can ", assert => {
    const df = new DataFrame(
        {
            column1: [3, 6, 8],
            column2: ["3", "4", "5", "6", "yolo"],
            column3: []
        },
        ["column1", "column2", "column3"]
    );

    assert.is(df.stat.sum("column1"), 17, "compute the sum of a column.");

    assert.is(
        df.stat.sum("column2"),
        18,
        "compute the sum a column ignoring non-numerical value."
    );

    assert.is(
        df.stat.max("column1"),
        8,
        "compute the maximal numerical value of a column."
    );

    assert.is(
        df.stat.max("column2"),
        6,
        "compute the maximal value of a column ignoring non-numerical value."
    );

    assert.is(
        df.stat.min("column1"),
        3,
        "compute the minimal numerical value of a column."
    );

    assert.is(
        df.stat.mean("column1"),
        5.666666666666667,
        "compute the mean of a column."
    );

    assert.is(
        df.stat.sd("column1"),
        2.516611478423583,
        "compute the standard deviation of a column."
    );

    assert.is(
        df.stat.sd("column1", true),
        2.0548046676563256,
        "compute the population standard deviation of a column."
    );

    assert.is(
        df.stat.var("column1"),
        6.333333333333333,
        "compute the variance of a column."
    );

    assert.is(
        df.stat.var("column1", true),
        4.222222222222222,
        "compute the population variance of a column."
    );

    assert.deepEqual(
        df.stat.stats("column1"),
        {
            sum: 17,
            mean: 5.666666666666667,
            min: 3,
            max: 8,
            var: 6.333333333333333,
            varpop: 4.222222222222222,
            sd: 2.516611478423583,
            sdpop: 2.0548046676563256
        },
        "compute all these stats for a column."
    );
});

test("DataFrame stat module works with negative values ", assert => {
    const df = new DataFrame(
        {
            column1: [-12, -4, -3],
            column2: [12, 0, 2, -4],
            column3: []
        },
        ["column1", "column2", "column3"]
    );

    assert.is(
        df.stat.max("column1"),
        -3,
        "compute the maximal numerical value of a column."
    );

    assert.is(
        df.stat.max("column2"),
        12,
        "compute the maximal numerical value of a column (2)."
    );

    assert.is(
        df.stat.min("column1"),
        -12,
        "compute the minimal numerical value of a column."
    );

    assert.is(
        df.stat.min("column2"),
        -4,
        "compute the minimal numerical value of a column (2)."
    );
});
