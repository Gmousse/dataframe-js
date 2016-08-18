
const OPERATORS_HANDLER = {
    '=': (a, b) => a === b,
    '>': (a, b) => a > b,
    '<': (a, b) => a < b,
    '>=': (a, b) => a >= b,
    '<=': (a, b) => a <= b,
    '!=': (a, b) => a !== b,
    'between': (a, b, c) => a >= b && a <= c,
    'like': (a, b) => b.includes(a) || a.includes(b),
    'in': (a, b) => b.includes(a),
};

const operations = {
    'where': (index) => {},
    'filter': (index) => {},
    'join': (index) => {},
    'union': (index) => {},
};

function sqlSplitter(query) {
    const splittedQuery = query.split(' ');
    const fromLoc = splittedQuery.findIndex(word => word.toLowerCase() === 'from');
    return {
        select: splittedQuery.slice(0, fromLoc),
        table: splittedQuery[fromLoc + 1],
        operations: splittedQuery.slice(fromLoc + 2, splittedQuery.length - 1),
    };
}

function sqlParser(query) {
    const {select, table, operations} = sqlSplitter(query);


}


class SQL {

    static tables = {};

    static request(query) {
        sqlParser(query);
        return SQL.tables;
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
