
const REPLACMENTS = [
    ['INNER JOIN', 'INNERJOIN'],
    ['LEFT JOIN', 'LEFTJOIN'],
    ['RIGHT JOIN', 'RIGHTJOIN'],
    ['FULL JOIN', 'FULLJOIN'],
];

const OPERATORS_HANDLER = {
    '=': (a, b) => a === b,
    '>': (a, b) => a > b,
    '<': (a, b) => a < b,
    '>=': (a, b) => a >= b,
    '<=': (a, b) => a <= b,
    '!=': (a, b) => a !== b,
    'BETWEEN': (a, b, c) => a >= b && a <= c,
    'LIKE': (a, b) => b.includes(a) || a.includes(b),
    'IN': (a, b) => b.includes(a),
    'AND': (a, b) => a && b,
    'OR': (a, b) => a || b,
};

const OPERATIONS_HANDLER = {
    'WHERE': (operation) => {
        return (df) => df.filter((row) => operation.forEach((word, index) => {
            if (OPERATORS_HANDLER[word.toUpperCase()]) {
                OPERATORS_HANDLER[word.toUpperCase()](row.get(operation[index - 1]), operation[index + 1])
            }
        }));
    },
    'JOIN': (operation) => {},
    'INNERJOIN': (operation) => {},
    'LEFTJOIN': (operation) => {},
    'RIGHTJOIN': (operation) => {},
    'FULLJOIN': (operation) => {},
    'UNION': (operation) => {},
};

function replaceTermsInQuery(query) {
    let replacedQuery = query;
    REPLACMENTS.forEach(
        ([joinType, replacment]) => {
            replacedQuery = replacedQuery.replace(joinType, replacment).replace(joinType.toLowerCase(), replacment);
        }
    );
    return replacedQuery;
}

function sqlSplitter(query) {
    const splittedQuery = replaceTermsInQuery(query).split(' ');
    const fromLoc = splittedQuery.findIndex(word => word.toUpperCase() === 'FROM');
    return {
        select: splittedQuery.slice(0, fromLoc),
        table: splittedQuery[fromLoc + 1],
        operations: splittedQuery.slice(fromLoc + 2, splittedQuery.length),
    };
}

function sqlParser(query, tables) {
    const {select, table, operations} = sqlSplitter(query);
    const operationTypes = Object.keys(OPERATIONS_HANDLER);
    const operationsLoc = operations.map(
        (word, index) => operationTypes.includes(word.toUpperCase()) ? index : undefined
    ).filter(loc => loc !== undefined);

    const splittedOperations = operationsLoc.map(
        (loc, index) => {
            return OPERATIONS_HANDLER[operations[loc].toUpperCase()](
                operations.slice(loc + 1, operationsLoc[index + 1] ? operationsLoc[index + 1] : operations.length)
            );
        }
    );

    console.log(splittedOperations.toString());

    const applyOperations = (x) => x;
    const applySelections = (x) => x;

    return applySelections(applyOperations(tables[table]));
}


class SQL {

    static tables = {};

    static request(query) {
        return sqlParser(query, SQL.tables);
    }

    static listTables() {
        return Object.keys(SQL.tables);
    }

    static addTable(name, df) {
        SQL.tables[name] = df;
    }

    constructor(df) {
        this.df = df;
        this.name = 'sql';
    }

    register(tableName) {
        SQL.addTable(tableName, this.df);
        return this.df;
    }

}

export default SQL;
