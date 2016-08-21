'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = sqlParser;

var _reusables = require('./reusables.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REPLACMENTS = [['INNER JOIN', 'INNERJOIN'], ['LEFT JOIN', 'LEFTJOIN'], ['RIGHT JOIN', 'RIGHTJOIN'], ['FULL JOIN', 'FULLJOIN']];

var WHERE_OPERATORS = {
    'IN': function IN(a, b) {
        return b.includes(a);
    },
    'LIKE': function LIKE(a, b) {
        return b.includes(a) || a.includes(b);
    },
    '>=': function _(a, b) {
        return a >= b;
    },
    '<=': function _(a, b) {
        return a <= b;
    },
    '!=': function _(a, b) {
        return a !== b;
    },
    '<': function _(a, b) {
        return a < b;
    },
    '>': function _(a, b) {
        return a > b;
    },
    '=': function _(a, b) {
        return a === b;
    },
    'AND': function AND(a, b) {
        return a && b;
    },
    'OR': function OR(a, b) {
        return a || b;
    }
};

var SELECT_FUNCTIONS = {};

var OPERATIONS_HANDLER = {
    'WHERE': function WHERE(operation) {
        var operationalTerms = (0, _reusables.xSplit)(operation.join(' '), ' AND ', ' OR ');
        return function (df) {
            return df.filter(function (row) {
                var conditionalOperators = operation.filter(function (term) {
                    return ['AND', 'OR'].includes(term.toUpperCase());
                });
                return operationalTerms.map(function (operationalTerm) {
                    var operatorToApply = _reusables.xContains.apply(undefined, [operationalTerm].concat((0, _toConsumableArray3.default)((0, _keys2.default)(WHERE_OPERATORS))))[0];
                    var terms = operationalTerm.replace(' ', '').split(operatorToApply);
                    return WHERE_OPERATORS[operatorToApply](row.get(terms[0]), eval(terms[1]));
                }).reduce(function (prev, next) {
                    return WHERE_OPERATORS[conditionalOperators.shift()](prev, next);
                });
            });
        };
    },
    'JOIN': function JOIN(operation, tables) {
        return function (df) {
            return df.join(tables[operation[0]], operation[operation.findIndex(function (word) {
                return word.toUpperCase() === 'ON';
            }) + 1]);
        };
    },
    'INNERJOIN': function INNERJOIN(operation, tables) {
        return function (df) {
            return df.join(tables[operation[0]], operation[operation.findIndex(function (word) {
                return word.toUpperCase() === 'ON';
            }) + 1], 'inner');
        };
    },
    'LEFTJOIN': function LEFTJOIN(operation, tables) {
        return function (df) {
            return df.join(tables[operation[0]], operation[operation.findIndex(function (word) {
                return word.toUpperCase() === 'ON';
            }) + 1], 'left');
        };
    },
    'RIGHTJOIN': function RIGHTJOIN(operation, tables) {
        return function (df) {
            return df.join(tables[operation[0]], operation[operation.findIndex(function (word) {
                return word.toUpperCase() === 'ON';
            }) + 1], 'right');
        };
    },
    'FULLJOIN': function FULLJOIN(operation, tables) {
        return function (df) {
            return df.join(tables[operation[0]], operation[operation.findIndex(function (word) {
                return word.toUpperCase() === 'ON';
            }) + 1], 'full');
        };
    },
    'UNION': function UNION(operation, tables) {
        return function (df) {
            return df.union(operation[0].toUpperCase().includes('SELECT') ? sqlParser(operation.join(' '), tables) : tables[operation[0]]);
        };
    }
};

function replaceTermsInQuery(query) {
    var replacedQuery = query;
    REPLACMENTS.forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

        var joinType = _ref2[0];
        var replacment = _ref2[1];

        replacedQuery = replacedQuery.replace(joinType, replacment).replace(joinType.toLowerCase(), replacment);
    });
    return replacedQuery;
}

function sqlSplitter(query) {
    var splittedQuery = replaceTermsInQuery(query).split(' ');
    var fromLoc = splittedQuery.findIndex(function (word) {
        return word.toUpperCase() === 'FROM';
    });
    return {
        selections: splittedQuery.slice(0, fromLoc),
        table: splittedQuery[fromLoc + 1],
        operations: splittedQuery.slice(fromLoc + 2, splittedQuery.length)
    };
}

function parseOperations(operations, tables) {
    var operationTypes = (0, _keys2.default)(OPERATIONS_HANDLER);
    var operationsLoc = operations.map(function (word, index) {
        return operationTypes.includes(word.toUpperCase()) ? index : undefined;
    }).filter(function (loc) {
        return loc !== undefined;
    });

    var splittedOperations = operationsLoc.map(function (loc, index) {
        return OPERATIONS_HANDLER[operations[loc].toUpperCase()](operations.slice(loc + 1, operationsLoc[index + 1] ? operationsLoc[index + 1] : operations.length), tables);
    });

    return splittedOperations.reduce(function (prev, next) {
        return function (df) {
            return next(prev(df));
        };
    }, function (df) {
        return df;
    });
}

function parseSelections(selections) {
    if (selections[0].toUpperCase() !== 'SELECT') {
        throw new Error('Your query should begin with SELECT keyword.');
    }
    selections.shift();
    var columnsToSelect = selections.join(' ').split(',');

    if (columnsToSelect[0].replace(' ', '') === '*') {
        return function (df) {
            return df;
        };
    } else if (columnsToSelect[0].toUpperCase().includes('DISTINCT')) {
        return function (df) {
            return df.distinct((0, _reusables.xReplace)(columnsToSelect[0].split(' AS ')[0], ['DISTINCT', ''], ['distinct', ''], [' ', ''])).rename(columnsToSelect[0].includes('AS') ? [columnsToSelect[0].split('AS')[1]] : [(0, _reusables.xReplace)(columnsToSelect[0].split(' AS ')[0], ['DISTINCT', ''], ['distinct', ''], [' ', ''])]);
        };
    }
    return function (df) {
        return df.select.apply(df, (0, _toConsumableArray3.default)(columnsToSelect.map(function (column) {
            return column.split(' AS ')[0].replace(' ', '');
        }))).rename(columnsToSelect.map(function (column) {
            return column.includes('AS') ? column.split('AS')[1] : column;
        }));
    };
}

function sqlParser(query, tables) {
    var _sqlSplitter = sqlSplitter(query);

    var selections = _sqlSplitter.selections;
    var table = _sqlSplitter.table;
    var operations = _sqlSplitter.operations;

    var applyOperations = parseOperations(operations, tables);
    var applySelections = parseSelections(selections);
    return applySelections(applyOperations(tables[table]));
}