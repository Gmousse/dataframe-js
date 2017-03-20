'use strict';

exports.__esModule = true;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports['default'] = sqlParser;

var _reusables = require('./reusables.js');

var _errors = require('./errors.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var REPLACMENTS = [['INNER JOIN', 'INNERJOIN'], ['LEFT JOIN', 'LEFTJOIN'], ['RIGHT JOIN', 'RIGHTJOIN'], ['FULL JOIN', 'FULLJOIN'], ['GROUP BY', 'GROUPBY']];

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

var SELECT_FUNCTIONS = {
    'COUNT': function COUNT(df) {
        return df.count();
    },
    'SUM': function SUM(df, column) {
        return df.stat.sum(column);
    },
    'MAX': function MAX(df, column) {
        return df.stat.max(column);
    },
    'MIN': function MIN(df, column) {
        return df.stat.min(column);
    },
    'AVG': function AVG(df, column) {
        return df.stat.mean(column);
    }
};

function sqlArgsToArray(args) {
    return (0, _reusables.xReplace)(args.join(' '), [' ', '']).split(',');
}

function joinHandler(operation, tables, type) {
    var ONKeywordLocation = operation.findIndex(function (word) {
        return word.toUpperCase() === 'ON';
    }) + 1;
    return function (df) {
        return df.join(tables[operation[0]], sqlArgsToArray(operation.filter(function (word, loc) {
            return loc >= ONKeywordLocation;
        })), type);
    };
}

var OPERATIONS_HANDLER = {
    'WHERE': function WHERE(operation) {
        var operationalTerms = (0, _reusables.xSplit)(operation.join(' '), ' AND ', ' OR ');
        return function (df) {
            return df.filter(function (row) {
                var conditionalOperators = operation.filter(function (term) {
                    return ['AND', 'OR'].includes(term.toUpperCase());
                });
                return operationalTerms.map(function (operationalTerm) {
                    var operatorToApply = _reusables.xContains.apply(undefined, [operationalTerm].concat((0, _toConsumableArray3['default'])((0, _keys2['default'])(WHERE_OPERATORS))))[0];
                    var terms = operationalTerm.replace(' ', '').split(operatorToApply);
                    return WHERE_OPERATORS[operatorToApply](String(row.get(terms[0])), (0, _reusables.xReplace)(terms[1].trim(), ['\"', ''], ['\'', ''], ['\`', '']));
                }).reduce(function (prev, next) {
                    return WHERE_OPERATORS[conditionalOperators.shift()](prev, next);
                });
            });
        };
    },
    'JOIN': function JOIN(operation, tables) {
        return joinHandler(operation, tables, 'inner');
    },
    'INNERJOIN': function INNERJOIN(operation, tables) {
        return joinHandler(operation, tables, 'inner');
    },
    'LEFTJOIN': function LEFTJOIN(operation, tables) {
        return joinHandler(operation, tables, 'left');
    },
    'RIGHTJOIN': function RIGHTJOIN(operation, tables) {
        return joinHandler(operation, tables, 'right');
    },
    'FULLJOIN': function FULLJOIN(operation, tables) {
        return joinHandler(operation, tables, 'full');
    },
    'UNION': function UNION(operation, tables) {
        return function (df) {
            return df.union(operation[0].toUpperCase().includes('SELECT') ? sqlParser(operation.join(' '), tables) : tables[operation[0]]);
        };
    },
    'GROUPBY': function GROUPBY(operation) {
        return function (df) {
            return df.groupBy.apply(df, (0, _toConsumableArray3['default'])(sqlArgsToArray(operation)));
        };
    }
};

function replaceTermsInQuery(query) {
    var replacedQuery = query;
    REPLACMENTS.forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray3['default'])(_ref, 2),
            joinType = _ref2[0],
            replacment = _ref2[1];

        replacedQuery = replacedQuery.replace(joinType, replacment).replace(joinType.toLowerCase(), replacment);
    });
    return replacedQuery;
}

function sqlSplitter(query) {
    var splittedQuery = replaceTermsInQuery(query).split(' ');
    var fromLoc = splittedQuery.findIndex(function (word) {
        return word.toUpperCase() === 'FROM';
    });
    if (fromLoc === -1) {
        throw new _errors.SQLParseError('Your query should contains FROM keyword');
    }
    return {
        selections: splittedQuery.slice(0, fromLoc),
        table: splittedQuery[fromLoc + 1],
        operations: splittedQuery.slice(fromLoc + 2, splittedQuery.length)
    };
}

function parseOperations(operations, tables) {
    var operationsLoc = operations.map(function (word, index) {
        return (0, _keys2['default'])(OPERATIONS_HANDLER).includes(word.toUpperCase()) ? index : undefined;
    }).filter(function (loc) {
        return loc !== undefined;
    });

    return operationsLoc.map(function (loc, index) {
        return OPERATIONS_HANDLER[operations[loc].toUpperCase()](operations.slice(loc + 1, operationsLoc[index + 1] ? operationsLoc[index + 1] : operations.length), tables);
    }).reduce(function (prev, next) {
        return function (df) {
            return next(prev(df));
        };
    }, function (df) {
        return df;
    });
}

function parseSelections(selections) {
    if (selections[0].toUpperCase() !== 'SELECT') {
        throw new _errors.SQLParseError('Your query should begin with SELECT keyword');
    }
    selections.shift();
    return (0, _reusables.match)(selections.join(' ').split(',').map(function (selection) {
        return selection.trim();
    }), [function (value) {
        return (0, _reusables.xReplace)(value[0], [' ', '']) === '*';
    }, function () {
        return function (df) {
            return df;
        };
    }], [function (value) {
        return value[0].toUpperCase().includes('DISTINCT');
    }, function (value) {
        var columnName = (0, _reusables.xReplace)(value[0].split(' AS ')[0], ['DISTINCT', ''], ['distinct', ''], [' ', '']);
        return function (df) {
            return df.distinct(columnName).rename(columnName, value[0].includes('AS') ? value[0].split('AS')[1].replace(' ', '') : columnName);
        };
    }], [function (value) {
        return _reusables.xContains.apply(undefined, [value[0].toUpperCase()].concat((0, _toConsumableArray3['default'])((0, _keys2['default'])(SELECT_FUNCTIONS))))[0];
    }, function (value) {
        return function (df) {
            var functionToApply = (0, _keys2['default'])(SELECT_FUNCTIONS).find(function (func) {
                return value[0].toUpperCase().includes(func);
            });
            var applyFunction = function applyFunction(dfToImpact) {
                return SELECT_FUNCTIONS[functionToApply](dfToImpact, (0, _reusables.xReplace)(value[0], [functionToApply.toLowerCase() + '(', ''], [functionToApply + '(', ''], ['(', ''], [')', '']));
            };
            return df.on && df.df ? df.aggregate(applyFunction) : applyFunction(df);
        };
    }], [function () {
        return true;
    }, function (value) {
        return function (df) {
            return df.select.apply(df, (0, _toConsumableArray3['default'])(value.map(function (column) {
                return column.split(' AS ')[0].replace(' ', '');
            }))).renameAll(value.map(function (column) {
                return column.includes('AS') ? column.split('AS')[1].replace(' ', '') : column;
            }));
        };
    }]);
}

function sqlParser(query, tables) {
    var _sqlSplitter = sqlSplitter(query),
        selections = _sqlSplitter.selections,
        table = _sqlSplitter.table,
        operations = _sqlSplitter.operations;

    if (!table || !(0, _keys2['default'])(tables).includes(table)) {
        throw new _errors.SQLParseError('Wrong table name in your query: ' + table);
    }
    var applyOperations = parseOperations(operations, tables);
    var applySelections = parseSelections(selections);
    return applySelections(applyOperations(tables[table]));
}