import test from "ava";

import { DataFrame } from "../src/index";
import { tryCatch } from "./utils";

test("DataFrame matrix module can ", assert => {
    const df1 = new DataFrame(
        {
            column1: [3, 6, 8],
            column2: [3, 4, 9],
            column3: [0, 0, 0]
        },
        ["column1", "column2", "column3"]
    );

    const df2 = new DataFrame(
        {
            column1: [1, 0, 8],
            column2: [2, 1, 12],
            column3: [6, 1, -1]
        },
        ["column1", "column2", "column3"]
    );

    const df3 = new DataFrame(
        {
            column1: [1, 0],
            column2: [2, 1],
            column3: [6, 1]
        },
        ["column1", "column2", "column3"]
    );

    assert.is(
        df1.matrix.isCommutative(df2),
        true,
        "check if two DataFrames have the same structure."
    );

    assert.is(
        df1.matrix.isCommutative(df2, true),
        true,
        "check if two DataFrames have the same transposed structure."
    );

    assert.deepEqual(
        df1.matrix.add(df2).toDict(),
        {
            column1: [4, 6, 16],
            column2: [5, 5, 21],
            column3: [6, 1, -1]
        },
        "realize a pairwise sum between 2 DataFrames."
    );

    assert.deepEqual(
        df1.matrix.product(8).toDict(),
        {
            column1: [24, 48, 64],
            column2: [24, 32, 72],
            column3: [0, 0, 0]
        },
        "realize a scalar product a DataFrame and a Number."
    );

    assert.deepEqual(
        df1.matrix.dot(df2).toDict(),
        {
            "0": [3, 6, 8],
            "1": [9, 16, 25],
            "2": [21, 40, 57]
        },
        "realize a commutative matrix multiplication between 2 DataFrames."
    );

    assert.deepEqual(
        df3.matrix.dot(df2.drop("column3")).toDict(),
        {
            "0": [49, 8],
            "1": [76, 13]
        },
        "realize a non-commutative matrix multiplication between 2 DataFrames."
    );
});

test("DataFrame matrix module can't", assert => {
    const df1 = new DataFrame(
        {
            column1: [3, 6, 8],
            column2: [3, 4, 9],
            column3: [0, 0, 0]
        },
        ["column1", "column2", "column3"]
    );

    const df2 = new DataFrame(
        {
            column1: [1, 0, 8],
            column2: [2, 1, 12]
        },
        ["column1", "column2"]
    );

    assert.is(
        tryCatch(() => df1.matrix.add(df2).toDict()).name,
        "WrongSchemaError",
        "realize a pairwise sum between 2 DataFrames with different structure, throwing WrongSchemaError."
    );

    assert.is(
        tryCatch(() => df1.matrix.add().toDict()).name,
        "ArgumentTypeError",
        "realize a pairwise sum between a DataFrame and another type, throwing ArgumentTypeError."
    );

    assert.is(
        tryCatch(() => df1.matrix.isCommutative().toDict()).name,
        "ArgumentTypeError",
        "realize a commutative check between a DataFrame and another type, throwing ArgumentTypeError."
    );

    assert.is(
        tryCatch(() => df1.matrix.product("yolo").toDict()).name,
        "ArgumentTypeError",
        "realize a scalar product between a DataFrame and not a Number, throwing ArgumentTypeError."
    );

    assert.is(
        tryCatch(() => df1.matrix.dot().toDict()).name,
        "ArgumentTypeError",
        "realize a matrix multiplication between a DataFrame and another type, throwing ArgumentTypeError."
    );
});
