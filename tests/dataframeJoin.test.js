import test from "ava";

import { DataFrame } from "../src/index";

test("DataFrame can be joined", assert => {
    const df = new DataFrame(
        {
            id: [1, 2, 3, 5],
            value: [1.01, 2.01, 3.01, 5.01]
        },
        ["id", "value"]
    );

    const dfb = new DataFrame(
        {
            id: [1, 2, 3, 4],
            value2: [1.02, 2.02, 3.02, 4.02]
        },
        ["id", "value2"]
    );

    assert.deepEqual(
        df
            .innerJoin(dfb, "id")
            .sortBy("id")
            .toCollection(),
        [
            { id: 1, value: 1.01, value2: 1.02 },
            { id: 2, value: 2.01, value2: 2.02 },
            { id: 3, value: 3.01, value2: 3.02 }
        ],
        "inner."
    );
    assert.deepEqual(
        df
            .fullJoin(dfb, "id")
            .sortBy("id")
            .toCollection(),
        [
            { id: 1, value: 1.01, value2: 1.02 },
            { id: 2, value: 2.01, value2: 2.02 },
            { id: 3, value: 3.01, value2: 3.02 },
            { id: 4, value: undefined, value2: 4.02 },
            { id: 5, value: 5.01, value2: undefined }
        ],
        "full."
    );
    assert.deepEqual(
        df
            .outerJoin(dfb, "id")
            .sortBy("id")
            .toCollection(),
        [
            { id: 1, value: 1.01, value2: 1.02 },
            { id: 2, value: 2.01, value2: 2.02 },
            { id: 3, value: 3.01, value2: 3.02 },
            { id: 4, value: undefined, value2: 4.02 },
            { id: 5, value: 5.01, value2: undefined }
        ],
        "outer."
    );

    assert.deepEqual(
        df
            .leftJoin(dfb, "id")
            .sortBy("id")
            .toCollection(),
        [
            { id: 1, value: 1.01, value2: 1.02 },
            { id: 2, value: 2.01, value2: 2.02 },
            { id: 3, value: 3.01, value2: 3.02 },
            { id: 5, value: 5.01, value2: undefined }
        ],
        "left."
    );

    assert.deepEqual(
        df
            .rightJoin(dfb, "id")
            .sortBy("id")
            .toCollection(),
        [
            { id: 1, value: 1.01, value2: 1.02 },
            { id: 2, value: 2.01, value2: 2.02 },
            { id: 3, value: 3.01, value2: 3.02 },
            { id: 4, value: undefined, value2: 4.02 }
        ],
        "right."
    );

    const df2 = new DataFrame(
        {
            id: [3, 3, 1, 8],
            id2: ["a", "b", "a", "c"],
            value: [1, 2, 0, 1]
        },
        ["id", "id2", "value"]
    );

    const df2b = new DataFrame(
        {
            id: [2, 1, 6, 8, 3, 3],
            id2: ["a", "a", "c", "c", "b", "b"],
            value2: [1, 0, 1, 2, 6, 5]
        },
        ["id", "id2", "value2"]
    );

    assert.deepEqual(
        df2
            .innerJoin(df2b, "id")
            .sortBy("id")
            .toCollection(),
        [
            { id: 1, id2: "a", value: 0, value2: 0 },
            { id: 3, id2: "a", value: 1, value2: 6 },
            { id: 3, id2: "a", value: 1, value2: 5 },
            { id: 3, id2: "b", value: 2, value2: 6 },
            { id: 3, id2: "b", value: 2, value2: 5 },
            { id: 8, id2: "c", value: 1, value2: 2 }
        ],
        "inner (2)."
    );

    assert.deepEqual(
        df2
            .innerJoin(df2b, ["id", "id2"])
            .sortBy("id")
            .toCollection(),
        [
            { id: 1, id2: "a", value: 0, value2: 0 },
            { id: 3, id2: "b", value: 2, value2: 6 },
            { id: 3, id2: "b", value: 2, value2: 5 },
            { id: 8, id2: "c", value: 1, value2: 2 }
        ],
        "inner on multiple columns."
    );

    assert.deepEqual(
        df2
            .fullJoin(df2b, ["id", "id2"])
            .sortBy("id")
            .toCollection(),
        [
            { id: 1, id2: "a", value: 0, value2: 0 },
            { id: 2, id2: "a", value: undefined, value2: 1 },
            { id: 3, id2: "a", value: 1, value2: undefined },
            { id: 3, id2: "b", value: 2, value2: 6 },
            { id: 3, id2: "b", value: 2, value2: 5 },
            { id: 6, id2: "c", value: undefined, value2: 1 },
            { id: 8, id2: "c", value: 1, value2: 2 }
        ],
        "full on multiple columns."
    );

    assert.deepEqual(
        df2
            .outerJoin(df2b, ["id", "id2"])
            .sortBy("id")
            .toCollection(),
        [
            { id: 1, id2: "a", value: 0, value2: 0 },
            { id: 2, id2: "a", value: undefined, value2: 1 },
            { id: 3, id2: "a", value: 1, value2: undefined },
            { id: 3, id2: "b", value: 2, value2: 6 },
            { id: 3, id2: "b", value: 2, value2: 5 },
            { id: 6, id2: "c", value: undefined, value2: 1 },
            { id: 8, id2: "c", value: 1, value2: 2 }
        ],
        "outer on multiple columns."
    );

    assert.deepEqual(
        df2
            .leftJoin(df2b, ["id", "id2"])
            .sortBy("id")
            .toCollection(),
        [
            { id: 1, id2: "a", value: 0, value2: 0 },
            { id: 3, id2: "a", value: 1, value2: undefined },
            { id: 3, id2: "b", value: 2, value2: 6 },
            { id: 3, id2: "b", value: 2, value2: 5 },
            { id: 8, id2: "c", value: 1, value2: 2 }
        ],
        "left on multiple columns."
    );

    assert.deepEqual(
        df2
            .rightJoin(df2b, ["id", "id2"])
            .sortBy("id")
            .toCollection(),
        [
            { id: 1, id2: "a", value2: 0, value: 0 },
            { id: 2, id2: "a", value2: 1, value: undefined },
            { id: 3, id2: "b", value2: 6, value: 2 },
            { id: 3, id2: "b", value2: 5, value: 2 },
            { id: 6, id2: "c", value2: 1, value: undefined },
            { id: 8, id2: "c", value2: 2, value: 1 }
        ],
        "right on multiple columns."
    );
});

test("DataFrame can be diff", assert => {
    const df = new DataFrame(
        {
            id: [3, 3, 1, 8],
            id2: ["a", "b", "a", "c"],
            value: [1, 2, 0, 1]
        },
        ["id", "id2", "value"]
    );

    const dfb = new DataFrame(
        {
            id: [2, 1, 6, 8, 3, 3],
            id2: ["a", "a", "c", "c", "b", "b"],
            value2: [1, 0, 1, 2, 6, 5]
        },
        ["id", "id2", "value2"]
    );

    assert.deepEqual(
        df
            .diff(dfb, "id")
            .sortBy("id")
            .toCollection(),
        [
            { id: 2, id2: "a", value: undefined, value2: 1 },
            { id: 6, id2: "c", value: undefined, value2: 1 }
        ],
        "simply."
    );

    assert.deepEqual(
        df
            .diff(dfb, ["id", "id2"])
            .sortBy("id")
            .toCollection(),
        [
            { id: 2, id2: "a", value: undefined, value2: 1 },
            { id: 3, id2: "a", value: 1, value2: undefined },
            { id: 6, id2: "c", value: undefined, value2: 1 }
        ],
        "on multiple columns."
    );
});
