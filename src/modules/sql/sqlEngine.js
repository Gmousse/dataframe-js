import { xContains, xSplit, xReplace, makeGenerator } from "../../reusables";
import { SQLParseError } from "../../errors";

const REPLACMENTS = [
    ["INNER JOIN", "INNERJOIN"],
    ["LEFT JOIN", "LEFTJOIN"],
    ["RIGHT JOIN", "RIGHTJOIN"],
    ["FULL JOIN", "FULLJOIN"],
    ["GROUP BY", "GROUPBY"]
];

const WHERE_OPERATORS = {
    IN: (a, b) => b.includes(a),
    LIKE: (a, b) => b.includes(a) || a.includes(b),
    ">=": (a, b) => a >= b,
    "<=": (a, b) => a <= b,
    "!=": (a, b) => a !== b,
    "<": (a, b) => a < b,
    ">": (a, b) => a > b,
    "=": (a, b) => a === b,
    AND: (a, b) => a && b,
    OR: (a, b) => a || b
};

const SELECT_FUNCTIONS = {
    COUNT: df => df.count(),
    SUM: (df, column) => df.stat.sum(column),
    MAX: (df, column) => df.stat.max(column),
    MIN: (df, column) => df.stat.min(column),
    AVG: (df, column) => df.stat.mean(column)
};

function match(value, ...cases) {
    const casesGen = makeGenerator(cases);
    const checker = nextCase =>
        nextCase[0](value)
            ? nextCase[1](value)
            : checker(casesGen.next().value);
    return checker(casesGen.next().value);
}

function sqlArgsToArray(args) {
    return xReplace(args.join(" "), [" ", ""]).split(",");
}

function joinHandler(operation, tables, type) {
    const ONKeywordLocation =
        operation.findIndex(word => word.toUpperCase() === "ON") + 1;
    return df =>
        df.join(
            tables[operation[0]],
            sqlArgsToArray(
                operation.filter((word, loc) => loc >= ONKeywordLocation)
            ),
            type
        );
}

const OPERATIONS_HANDLER = {
    WHERE: operation => {
        const operationalTerms = xSplit(operation.join(" "), " AND ", " OR ");
        return df =>
            df.filter(row => {
                const conditionalOperators = operation.filter(term =>
                    ["AND", "OR"].includes(term.toUpperCase())
                );
                return operationalTerms
                    .map(operationalTerm => {
                        const operatorToApply = xContains(
                            operationalTerm,
                            ...Object.keys(WHERE_OPERATORS)
                        )[0];
                        const terms = operationalTerm
                            .split(operatorToApply)
                            .map(term => term.trim());
                        if (!row.has(terms[0]) && row.has(terms[1])) {
                            return WHERE_OPERATORS[operatorToApply](
                                xReplace(
                                    terms[0].trim(),
                                    ['"', ""],
                                    ["'", ""],
                                    ["`", ""]
                                ),
                                String(row.get(terms[1]))
                            );
                        }
                        const lastTermAsNumber = Number(terms[1]);

                        return WHERE_OPERATORS[operatorToApply](
                            String(row.get(terms[0])),
                            Number.isNaN(lastTermAsNumber)
                                ? xReplace(
                                      terms[1].trim(),
                                      ['"', ""],
                                      ["'", ""],
                                      ["`", ""]
                                  )
                                : lastTermAsNumber
                        );
                    })
                    .reduce((prev, next) =>
                        WHERE_OPERATORS[conditionalOperators.shift()](
                            prev,
                            next
                        )
                    );
            });
    },
    JOIN: (operation, tables) => joinHandler(operation, tables, "inner"),
    INNERJOIN: (operation, tables) => joinHandler(operation, tables, "inner"),
    LEFTJOIN: (operation, tables) => joinHandler(operation, tables, "left"),
    RIGHTJOIN: (operation, tables) => joinHandler(operation, tables, "right"),
    FULLJOIN: (operation, tables) => joinHandler(operation, tables, "full"),
    UNION: (operation, tables) => df =>
        df.union(
            operation[0].toUpperCase().includes("SELECT")
                ? sqlParser(operation.join(" "), tables)
                : tables[operation[0]]
        ),
    GROUPBY: operation => {
        return df => df.groupBy(...sqlArgsToArray(operation));
    }
};

function replaceTermsInQuery(query) {
    let replacedQuery = query;
    REPLACMENTS.forEach(([joinType, replacment]) => {
        replacedQuery = replacedQuery
            .replace(joinType, replacment)
            .replace(joinType.toLowerCase(), replacment);
    });
    return replacedQuery;
}

function sqlSplitter(query) {
    const splittedQuery = replaceTermsInQuery(query).split(" ");
    const fromLoc = splittedQuery.findIndex(
        word => word.toUpperCase() === "FROM"
    );
    if (fromLoc === -1) {
        throw new SQLParseError("Your query should contains FROM keyword");
    }
    return {
        selections: splittedQuery.slice(0, fromLoc),
        table: splittedQuery[fromLoc + 1],
        operations: splittedQuery.slice(fromLoc + 2, splittedQuery.length)
    };
}

function parseOperations(operations, tables) {
    const operationsLoc = operations
        .map((word, index) =>
            Object.keys(OPERATIONS_HANDLER).includes(word.toUpperCase())
                ? index
                : undefined
        )
        .filter(loc => loc !== undefined);

    return operationsLoc
        .map((loc, index) =>
            OPERATIONS_HANDLER[operations[loc].toUpperCase()](
                operations.slice(
                    loc + 1,
                    operationsLoc[index + 1]
                        ? operationsLoc[index + 1]
                        : operations.length
                ),
                tables
            )
        )
        .reduce((prev, next) => df => next(prev(df)), df => df);
}

function parseSelections(selections) {
    if (selections[0].toUpperCase() !== "SELECT") {
        throw new SQLParseError("Your query should begin with SELECT keyword");
    }
    selections.shift();
    return match(
        selections
            .join(" ")
            .split(",")
            .map(selection => selection.trim()),
        [value => xReplace(value[0], [" ", ""]) === "*", () => df => df],
        [
            value => value[0].toUpperCase().includes("DISTINCT"),
            value => {
                const columnName = xReplace(
                    value[0].split(" AS ")[0],
                    ["DISTINCT", ""],
                    ["distinct", ""],
                    [" ", ""]
                );
                return df =>
                    df
                        .distinct(columnName)
                        .rename(
                            columnName,
                            value[0].includes("AS")
                                ? value[0].split("AS")[1].replace(" ", "")
                                : columnName
                        );
            }
        ],
        [
            value =>
                xContains(
                    value[0].toUpperCase(),
                    ...Object.keys(SELECT_FUNCTIONS)
                )[0],
            value => df => {
                const functionToApply = Object.keys(SELECT_FUNCTIONS).find(
                    func => value[0].toUpperCase().includes(func)
                );
                const applyFunction = dfToImpact =>
                    SELECT_FUNCTIONS[functionToApply](
                        dfToImpact,
                        xReplace(
                            value[0],
                            [`${functionToApply.toLowerCase()}(`, ""],
                            [`${functionToApply}(`, ""],
                            ["(", ""],
                            [")", ""]
                        )
                    );
                return df.on && df.df
                    ? df.aggregate(applyFunction)
                    : applyFunction(df);
            }
        ],
        [
            () => true,
            value => df =>
                df
                    .select(
                        ...value.map(column =>
                            column.split(" AS ")[0].replace(" ", "")
                        )
                    )
                    .renameAll(
                        value.map(column =>
                            column.includes("AS")
                                ? column.split("AS")[1].replace(" ", "")
                                : column
                        )
                    )
        ]
    );
}

export default function sqlParser(query, tables) {
    const { selections, table, operations } = sqlSplitter(query);
    if (!table || !Object.keys(tables).includes(table)) {
        throw new SQLParseError(`Wrong table name in your query: ${table}`);
    }
    const applyOperations = parseOperations(operations, tables);
    const applySelections = parseSelections(selections);
    return applySelections(applyOperations(tables[table]));
}
