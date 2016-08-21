import { xContains, xSplit, xReplace } from './reusables.js';

const REPLACMENTS = [
    ['INNER JOIN', 'INNERJOIN'],
    ['LEFT JOIN', 'LEFTJOIN'],
    ['RIGHT JOIN', 'RIGHTJOIN'],
    ['FULL JOIN', 'FULLJOIN'],
];

const WHERE_OPERATORS = {
    'IN': (a, b) => b.includes(a),
    'LIKE': (a, b) => b.includes(a) || a.includes(b),
    '>=': (a, b) => a >= b,
    '<=': (a, b) => a <= b,
    '!=': (a, b) => a !== b,
    '<': (a, b) => a < b,
    '>': (a, b) => a > b,
    '=': (a, b) => a === b,
    'AND': (a, b) => a && b,
    'OR': (a, b) => a || b,
};

const SELECT_FUNCTIONS = {
};

const OPERATIONS_HANDLER = {
    'WHERE': (operation) => {
        const operationalTerms = xSplit(operation.join(' '), ' AND ', ' OR ');
        return df => df.filter(row => {
            const conditionalOperators = operation.filter(term => ['AND', 'OR'].includes(term.toUpperCase()));
            return operationalTerms.map(operationalTerm => {
                const operatorToApply = xContains(operationalTerm, ...Object.keys(WHERE_OPERATORS))[0];
                const terms = operationalTerm.replace(' ', '').split(operatorToApply);
                return WHERE_OPERATORS[operatorToApply](row.get(terms[0]), eval(terms[1]));
            }).reduce((prev, next) => WHERE_OPERATORS[conditionalOperators.shift()](prev, next));
        });
    },
    'JOIN': (operation, tables) => df => df.join(
        tables[operation[0]], operation[operation.findIndex(word => word.toUpperCase() === 'ON') + 1]
    ),
    'INNERJOIN': (operation, tables) => df => df.join(
        tables[operation[0]], operation[operation.findIndex(word => word.toUpperCase() === 'ON') + 1], 'inner'
    ),
    'LEFTJOIN': (operation, tables) => df => df.join(
        tables[operation[0]], operation[operation.findIndex(word => word.toUpperCase() === 'ON') + 1], 'left'
    ),
    'RIGHTJOIN': (operation, tables) => df => df.join(
        tables[operation[0]], operation[operation.findIndex(word => word.toUpperCase() === 'ON') + 1], 'right'
    ),
    'FULLJOIN': (operation, tables) => df => df.join(
        tables[operation[0]], operation[operation.findIndex(word => word.toUpperCase() === 'ON') + 1], 'full'
    ),
    'UNION': (operation, tables) => df => df.union(
        operation[0].toUpperCase().includes('SELECT') ? sqlParser(operation.join(' '), tables) : tables[operation[0]]
    ),
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
        selections: splittedQuery.slice(0, fromLoc),
        table: splittedQuery[fromLoc + 1],
        operations: splittedQuery.slice(fromLoc + 2, splittedQuery.length),
    };
}

function parseOperations(operations, tables) {
    const operationTypes = Object.keys(OPERATIONS_HANDLER);
    const operationsLoc = operations.map(
        (word, index) => operationTypes.includes(word.toUpperCase()) ? index : undefined
    ).filter(loc => loc !== undefined);

    const splittedOperations = operationsLoc.map(
        (loc, index) => {
            return OPERATIONS_HANDLER[operations[loc].toUpperCase()](
                operations.slice(loc + 1, operationsLoc[index + 1] ? operationsLoc[index + 1] : operations.length),
                tables
            );
        }
    );

    return splittedOperations.reduce((prev, next) => (df) => next(prev(df)), (df) => df);
}

function parseSelections(selections) {
    if (selections[0].toUpperCase() !== 'SELECT') {
        throw new Error('Your query should begin with SELECT keyword.');
    }
    selections.shift();
    const columnsToSelect = selections.join(' ').split(',');

    if (columnsToSelect[0].replace(' ', '') === '*') {
        return df => df;
    } else if (columnsToSelect[0].toUpperCase().includes('DISTINCT')) {
        return df => df.distinct(xReplace(columnsToSelect[0].split(' AS ')[0], ['DISTINCT', ''], ['distinct', ''], [' ', ''])).rename(
            columnsToSelect[0].includes('AS') ? [columnsToSelect[0].split('AS')[1]] : [xReplace(columnsToSelect[0].split(' AS ')[0], ['DISTINCT', ''], ['distinct', ''], [' ', ''])]
        );
    }
    return df => (
        df.select(
            ...columnsToSelect.map(column => column.split(' AS ')[0].replace(' ', ''))
        ).rename(
            columnsToSelect.map(column => column.includes('AS') ? column.split('AS')[1] : column)
        )
    );
}

export default function sqlParser(query, tables) {
    const {selections, table, operations} = sqlSplitter(query);
    const applyOperations = parseOperations(operations, tables);
    const applySelections = parseSelections(selections);
    return applySelections(applyOperations(tables[table]));
}
