import test from "ava";

import { DataFrame } from "../src/index";

test("DataFrame can be empty", assert => {
    try {
        /* eslint-disable */
        const df = new DataFrame([]);
        /* eslint-enable */
        assert.pass("without throwing error while passing no columns");
        assert.deepEqual(
            df.listColumns(),
            [],
            "with having no columns while passing no columns."
        );
    } catch (e) {
        assert.fail("without throwing error while passing no columns");
    }

    try {
        /* eslint-disable */
        const df = new DataFrame([], ["1", "2"]);
        /* eslint-enable */
        assert.pass("without throwing error while passing columns");
        assert.deepEqual(
            df.listColumns(),
            ["1", "2"],
            "with having columns while passing columns."
        );
    } catch (e) {
        assert.fail("without throwing error while passing columns");
    }

    try {
        /* eslint-disable */
        const df = new DataFrame([], []);
        /* eslint-enable */
        assert.pass("without throwing error while passing empty columns");
        assert.deepEqual(
            df.listColumns(),
            [],
            "with having no columns while passing empty columns."
        );
    } catch (e) {
        assert.fail("without throwing error while passing empty columns");
    }
});

test("DataFrame can detect schema changes", assert => {
    const df = new DataFrame(
        [
            { c1: 1, c2: "A", c3: 2.144 },
            { c1: 2, c2: "B", c3: 5.6 },
            { c1: 0, c2: "A", c3: 0 }
        ],
        ["c1", "c2", "c3"]
    );

    const dfWithAdditionalColumnUsual = df.withColumn(
        "c4",
        row => row.get("c1") * 2
    );

    assert.deepEqual(
        dfWithAdditionalColumnUsual.listColumns(),
        ["c1", "c2", "c3", "c4"],
        "with one column added using .withColumn()."
    );

    assert.deepEqual(
        dfWithAdditionalColumnUsual.toArray(),
        [[1, "A", 2.144, 2], [2, "B", 5.6, 4], [0, "A", 0, 0]],
        "with one column added using .withColumn() without changing structure."
    );

    const dfWithRemovalColumnUsual = df.drop("c2");

    assert.deepEqual(
        dfWithRemovalColumnUsual.listColumns(),
        ["c1", "c3"],
        "without one column removed using .drop()."
    );

    assert.deepEqual(
        dfWithRemovalColumnUsual.toArray(),
        [[1, 2.144], [2, 5.6], [0, 0]],
        "without one column removed using .drop() without changing structure."
    );

    const dfWithAdditionalColumn = df.map(row =>
        row.set("c4", row.get("c1") * 2)
    );

    assert.deepEqual(
        dfWithAdditionalColumn.listColumns(),
        ["c1", "c2", "c3", "c4"],
        "with one column added using Row.set()."
    );

    assert.deepEqual(
        dfWithAdditionalColumn.toArray(),
        [[1, "A", 2.144, 2], [2, "B", 5.6, 4], [0, "A", 0, 0]],
        "with one column added using Row.set() without changing structure."
    );

    const dfWithRemovalColumn = df.map(row => row.delete("c2"));

    assert.deepEqual(
        dfWithRemovalColumn.listColumns(),
        ["c1", "c3"],
        "without one column removed using Row.delete()."
    );

    assert.deepEqual(
        dfWithRemovalColumn.toArray(),
        [[1, 2.144], [2, 5.6], [0, 0]],
        "without one column removed using Row.delete() without changing structure."
    );

    const dfWithAdditionalColumns = df.map(row =>
        row.set("c4", row.get("c1") * 2).set("c5", 8)
    );

    assert.deepEqual(
        dfWithAdditionalColumns.listColumns(),
        ["c1", "c2", "c3", "c4", "c5"],
        "with multiple columns added using Row.set()."
    );
    assert.deepEqual(
        dfWithAdditionalColumns.toArray(),
        [[1, "A", 2.144, 2, 8], [2, "B", 5.6, 4, 8], [0, "A", 0, 0, 8]],
        "with multiple column added using Row.set() without changing structure."
    );
});
