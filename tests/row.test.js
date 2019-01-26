import test from "ava";

import { Row } from "../src/index";
import { tryCatch } from "./utils";

test("Row can be ", assert => {
    assert.is(
        new Row([1, 3, 6], ["c1", "c2", "c3"]).constructor.name,
        "Row",
        "created from an Array."
    );

    assert.is(
        new Row({ c1: 2, c2: 2, c3: 4 }, ["c1", "c2", "c3"]).constructor.name,
        "Row",
        "created from a dictionnary."
    );

    assert.is(
        new Row(new Row({ c1: 2, c3: 4 }, ["c1", "c2"]), ["c1", "c2", "c3"])
            .constructor.name,
        "Row",
        "from an other Row."
    );

    assert.deepEqual(
        new Row([1, 3, 6], ["c1", "c2", "c3"]).toDict(),
        { c1: 1, c2: 3, c3: 6 },
        "converted into a dictionnary."
    );

    assert.deepEqual(
        new Row([1, 3, 6], ["c1", "c2", "c3"]).toArray(),
        [1, 3, 6],
        "converted into an Array."
    );
});

test("Row can't be ", assert => {
    assert.is(
        tryCatch(() => new Row()).name,
        "ArgumentTypeError",
        "created from nothing, throwing ArgumentTypeError."
    );

    assert.is(
        tryCatch(() => new Row(1, ["c1", "c2", "c3"])).name,
        "ArgumentTypeError",
        "created from a wrong type, throwing ArgumentTypeError."
    );

    assert.is(
        tryCatch(() => new Row(null, ["c1", "c2", "c3"])).name,
        "ArgumentTypeError",
        "created from a wrong type (2), throwing ArgumentTypeError."
    );
});

test("Row columns can be ", assert => {
    const row = new Row([1, "yo", 9, ["yo"]], ["c1", "c2", "c3", "c4"]);

    assert.deepEqual(
        row.select("c2", "c4").toDict(),
        { c2: "yo", c4: ["yo"] },
        "selected."
    );

    assert.deepEqual(
        row.select("c4", "c1").toDict(),
        { c4: ["yo"], c1: 1 },
        "selected, with respect of order."
    );

    assert.deepEqual(
        row.delete("c2").toDict(),
        { c1: 1, c3: 9, c4: ["yo"] },
        "deleted."
    );

    assert.is(row.get("c2"), "yo", "get.");

    assert.deepEqual(
        row.set("c4", 18).toDict(),
        { c1: 1, c2: "yo", c3: 9, c4: 18 },
        "set."
    );

    assert.deepEqual(
        row.set("c5", 35).toDict(),
        { c1: 1, c2: "yo", c3: 9, c4: ["yo"], c5: 35 },
        "created."
    );

    assert.deepEqual(row.has("c4"), true, "verified, to see if they exist.");

    assert.deepEqual(
        row.has("c5"),
        false,
        "verified, to see if they don't exist."
    );
});

test("Row columns can't be ", assert => {
    const row = new Row(
        [1, "yo", 9, ["yo"]],
        [["c1", Number], ["c2", String], ["c3", Number], ["c4", Array]]
    );

    assert.is(
        tryCatch(() => row.get("c#")).name,
        "NoSuchColumnError",
        "get when a column doesn't exist, throwing NoSuchColumnError."
    );

    assert.is(
        tryCatch(() => row.select("c4", "c#").toDict()).name,
        "NoSuchColumnError",
        "selected when a column doesn't exist, throwing NoSuchColumnError."
    );

    assert.is(
        tryCatch(() => row.delete("c#").toDict()).name,
        "NoSuchColumnError",
        "deleted when a column doesn't exist, throwing NoSuchColumnError."
    );
});
