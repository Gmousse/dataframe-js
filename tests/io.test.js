import test from "ava";

import path from "path";
import { DataFrame } from "../src/index";
import { tryCatch } from "./utils";

test("DataFrame can be", assert => {
    const df1 = new DataFrame(
        [[1, 6, 9, 10, 12], [1, 2], [6, 6, 9, 8, 9, 12]],
        ["c1", "c2", "c3", "c4", "c5", "c6"]
    );

    assert.deepEqual(df1.dim(), [3, 6], "measured, getting dimensions.");

    assert.deepEqual(
        df1.toCollection(true).map(row => row.toDict()),
        [
            { c1: 1, c2: 6, c3: 9, c4: 10, c5: 12, c6: undefined },
            {
                c1: 1,
                c2: 2,
                c3: undefined,
                c4: undefined,
                c5: undefined,
                c6: undefined
            },
            { c1: 6, c2: 6, c3: 9, c4: 8, c5: 9, c6: 12 }
        ],
        "converted into a collection of rows."
    );

    assert.deepEqual(
        [...df1].map(row => row.toDict()),
        [
            { c1: 1, c2: 6, c3: 9, c4: 10, c5: 12, c6: undefined },
            {
                c1: 1,
                c2: 2,
                c3: undefined,
                c4: undefined,
                c5: undefined,
                c6: undefined
            },
            { c1: 6, c2: 6, c3: 9, c4: 8, c5: 9, c6: 12 }
        ],
        "converted into a collection of rows by destructuring."
    );

    assert.deepEqual(
        df1.toCollection(),
        [
            { c1: 1, c2: 6, c3: 9, c4: 10, c5: 12, c6: undefined },
            {
                c1: 1,
                c2: 2,
                c3: undefined,
                c4: undefined,
                c5: undefined,
                c6: undefined
            },
            { c1: 6, c2: 6, c3: 9, c4: 8, c5: 9, c6: 12 }
        ],
        "converted into a collection of dictionnaries."
    );

    assert.deepEqual(
        df1.toDict(),
        {
            c1: [1, 1, 6],
            c2: [6, 2, 6],
            c3: [9, undefined, 9],
            c4: [10, undefined, 8],
            c5: [12, undefined, 9],
            c6: [undefined, undefined, 12]
        },
        "converted into a dictionnary."
    );

    assert.deepEqual(
        df1.toArray(),
        [
            [1, 6, 9, 10, 12, undefined],
            [1, 2, undefined, undefined, undefined, undefined],
            [6, 6, 9, 8, 9, 12]
        ],
        "converted into an Array."
    );

    assert.is(
        df1.toDSV(),
        "c1;c2;c3;c4;c5;c6\n1;6;9;10;12;\n1;2;;;;\n6;6;9;8;9;12",
        "converted into a dsv with header."
    );

    assert.is(
        df1.toText(),
        "c1;c2;c3;c4;c5;c6\n1;6;9;10;12;\n1;2;;;;\n6;6;9;8;9;12",
        "converted into a text (or dsv) with header."
    );

    assert.is(
        df1.toDSV(";", false),
        "1;6;9;10;12;\n1;2;;;;\n6;6;9;8;9;12",
        "converted into a dsv without header."
    );

    assert.is(
        df1.toCSV(false),
        "1,6,9,10,12,\n1,2,,,,\n6,6,9,8,9,12",
        "converted into a csv without header."
    );

    assert.is(
        df1.toCSV(),
        "c1,c2,c3,c4,c5,c6\n1,6,9,10,12,\n1,2,,,,\n6,6,9,8,9,12",
        "converted into a csv with header."
    );

    assert.is(
        df1.toPSV(),
        "c1|c2|c3|c4|c5|c6\n1|6|9|10|12|\n1|2||||\n6|6|9|8|9|12",
        "converted into a psv with header."
    );

    assert.is(
        df1.toTSV(),
        "c1\tc2\tc3\tc4\tc5\tc6\n1\t6\t9\t10\t12\t\n1\t2\t\t\t\t\n6\t6\t9\t8\t9\t12",
        "converted into a tsv with header."
    );

    assert.is(
        df1.toJSON(),
        '{"c1":[1,1,6],"c2":[6,2,6],"c3":[9,null,9],"c4":[10,null,8],"c5":[12,null,9],"c6":[null,null,12]}',
        "converted into a json."
    );

    assert.is(
        df1.toJSON(true),
        '[{"c1":1,"c2":6,"c3":9,"c4":10,"c5":12},{"c1":1,"c2":2},{"c1":6,"c2":6,"c3":9,"c4":8,"c5":9,"c6":12}]',
        "converted into a json as a collection of Object."
    );

    const df2 = new DataFrame(
        {
            column1: [3, 6, 8],
            column2: ["3", "4", "5", "6"],
            column3: []
        },
        ["column1", "column2", "column3"]
    );

    const expectedShow = [
        "| column1   | column2   | column3   |",
        "------------------------------------",
        "| 3         | 3         | undefined |",
        "| 6         | 4         | undefined |",
        "| 8         | 5         | undefined |",
        "| undefined | 6         | undefined |"
    ].join("\n");

    assert.is(df2.show(10, true), expectedShow, "showed as a String table.");
});

test.cb("DataFrame can be created from", assert => {
    assert.plan(15);

    const dict = {
        column1: [3, 6, 8],
        column2: [3, 4, 5, 6]
    };

    const table = [[1, 6, 9, 10, 12], [1, 2], [6, 6, 9, 8, 9, 12]];

    const collection = [
        {
            c1: 1,
            c2: 6,
            c3: 9,
            c4: 10,
            c5: 12
        },
        {
            c4: 1,
            c3: 2
        },
        {
            c1: 6,
            c5: 6,
            c2: 9,
            c4: 8,
            c3: 9,
            c6: 12
        }
    ];

    assert.is(
        new DataFrame(dict, ["column1", "column2"]).constructor.name,
        "DataFrame",
        "Object of Arrays."
    );

    assert.is(
        new DataFrame(dict).constructor.name,
        "DataFrame",
        "Object of Arrays by infering columns."
    );

    assert.deepEqual(
        new DataFrame(table, ["c1", "c2", "c3", "c4", "c5", "c6"]).constructor
            .name,
        "DataFrame",
        "Array of Arrays."
    );

    assert.deepEqual(
        new DataFrame(table).constructor.name,
        "DataFrame",
        "Array of Arrays by infering columns."
    );

    assert.deepEqual(
        new DataFrame(collection, ["c1", "c2", "c3", "c4", "c5", "c6"])
            .constructor.name,
        "DataFrame",
        "Array of Objects."
    );

    assert.deepEqual(
        new DataFrame(collection).constructor.name,
        "DataFrame",
        "Array of Objects by infering columns."
    );

    assert.deepEqual(
        new DataFrame(new DataFrame(collection)).constructor.name,
        "DataFrame",
        "another DataFrame."
    );

    const currentPath = path.resolve(__dirname) + "/data";

    DataFrame.fromCSV(`${currentPath}/Titanic.csv`, true).then(value =>
        assert.deepEqual(
            value.toCollection()[0],
            {
                "": "1",
                Age: "Child",
                Class: "1st",
                Freq: "0",
                Sex: "Male",
                Survived: "No"
            },
            "a csv file with header."
        )
    );

    DataFrame.fromCSV(`${currentPath}/Titanic_2.csv`, false).then(value =>
        assert.deepEqual(
            value.toCollection()[0],
            {
                "0": "1",
                "1": "1st",
                "2": "Male",
                "3": "Child",
                "4": "No",
                "5": "0"
            },
            "a csv file without header."
        )
    );

    DataFrame.fromTSV(`${currentPath}/Titanic.tsv`, true).then(value =>
        assert.deepEqual(
            value.toCollection()[0],
            {
                "": "1",
                Age: "Child",
                Class: "1st",
                Freq: "0",
                Sex: "Male",
                Survived: "No"
            },
            "a tsv file."
        )
    );

    DataFrame.fromPSV(`${currentPath}/Titanic.psv`, true).then(value =>
        assert.deepEqual(
            value.toCollection()[0],
            {
                "": "1",
                Age: "Child",
                Class: "1st",
                Freq: "0",
                Sex: "Male",
                Survived: "No"
            },
            "a psv file."
        )
    );

    DataFrame.fromDSV(`${currentPath}/Titanic_2.csv`, "", false).then(value =>
        assert.deepEqual(
            value.toCollection()[0],
            {
                "0": "1",
                "1": "1st",
                "2": "Male",
                "3": "Child",
                "4": "No",
                "5": "0"
            },
            "a dsv file with a custom seprator."
        )
    );

    DataFrame.fromDSV(`${currentPath}/Titanic_2.csv`, "", false).then(value =>
        assert.deepEqual(
            value.toCollection()[0],
            {
                "0": "1",
                "1": "1st",
                "2": "Male",
                "3": "Child",
                "4": "No",
                "5": "0"
            },
            "a text file (or dsv) with a custom seprator."
        )
    );

    DataFrame.fromJSON(`${currentPath}/Titanic.json`).then(value =>
        assert.deepEqual(
            value.toCollection()[0],
            {
                "": 1,
                Age: "Child",
                Class: "1st",
                Freq: 0,
                Sex: "Male",
                Survived: "No"
            },
            "a JSON containing a column by key."
        )
    );

    DataFrame.fromJSON(`${currentPath}/Titanic_2.json`).then(value =>
        assert.deepEqual(
            value.toCollection()[0],
            {
                FIELD1: 1,
                Age: "Child",
                Class: "1st",
                Freq: 0,
                Sex: "Male",
                Survived: "No"
            },
            "a JSON from relative import."
        )
    );

    setTimeout(assert.end, 400);
});

test.cb("DataFrame can't be created from", assert => {
    assert.plan(6);

    assert.is(
        tryCatch(() => new DataFrame("")).name,
        "ArgumentTypeError",
        "a String, throwing ArgumentTypeError."
    );

    assert.is(
        tryCatch(() => new DataFrame()).name,
        "ArgumentTypeError",
        "a nothing, throwing ArgumentTypeError."
    );

    assert.is(
        tryCatch(() => new DataFrame(445)).name,
        "ArgumentTypeError",
        "a Number, throwing ArgumentTypeError."
    );

    DataFrame.fromText(`./data/Titanic_2.csv`, "", false)
        .then(() => assert.fail())
        .catch(err => {
            assert.is(
                err.name,
                "FileNotFoundError",
                "a wrong text path (or relative), throwing a FileNotFoundError."
            );
        });

    DataFrame.fromCSV(`./data/Titanic_2.csv`, false)
        .then(() => assert.fail())
        .catch(err => {
            assert.is(
                err.name,
                "FileNotFoundError",
                "a wrong csv path (or relative), throwing a FileNotFoundError."
            );
        });

    DataFrame.fromJSON("./data/Titanic_2.json")
        .then(() => assert.fail())
        .catch(err => {
            assert.is(
                err.name,
                "FileNotFoundError",
                "a wrong JSON path (or relative), throwing a FileNotFoundError."
            );
        });

    setTimeout(assert.end, 400);
});
