import test from "ava";

import DataFrame from "../src/dataframe";

test("Sort multiple cols with undefined ", assert => {
    const df = new DataFrame(
        [
            { col1: 1, col2: "A", },
            { col1: 2, col2: undefined },
            { col1: 3, col2: "B" },
            { col1: undefined, col2: "On the road" },
            { col1: undefined, col2: undefined },
            { col1: undefined, col2: "C" }
        ]
    );

    const sorted = df.sortBy(['col1', 'col2'], false, 'last');

    assert.deepEqual(
        sorted.toCollection(),
        [
            { col1: 1, col2: 'A' },
            { col1: 3, col2: 'B' },
            { col1: 2, col2: undefined },
            { col1: undefined, col2: 'C' },
            { col1: undefined, col2: 'On the road' },
            { col1: undefined, col2: undefined },
          ],
        "sort multiple undef cols"
    );
});