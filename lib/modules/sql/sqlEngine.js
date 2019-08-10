"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.find-index");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.number.constructor");

require("core-js/modules/es.number.is-nan");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sqlParser;

var _reusables = require("../../reusables");

var _errors = require("../../errors");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var REPLACMENTS = [["INNER JOIN", "INNERJOIN"], ["LEFT JOIN", "LEFTJOIN"], ["RIGHT JOIN", "RIGHTJOIN"], ["FULL JOIN", "FULLJOIN"], ["GROUP BY", "GROUPBY"]];
var WHERE_OPERATORS = {
  IN: function IN(a, b) {
    return b.includes(a);
  },
  LIKE: function LIKE(a, b) {
    return b.includes(a) || a.includes(b);
  },
  ">=": function _(a, b) {
    return a >= b;
  },
  "<=": function _(a, b) {
    return a <= b;
  },
  "!=": function _(a, b) {
    return a !== b;
  },
  "<": function _(a, b) {
    return a < b;
  },
  ">": function _(a, b) {
    return a > b;
  },
  "=": function _(a, b) {
    return a === b;
  },
  AND: function AND(a, b) {
    return a && b;
  },
  OR: function OR(a, b) {
    return a || b;
  }
};
var SELECT_FUNCTIONS = {
  COUNT: function COUNT(df) {
    return df.count();
  },
  SUM: function SUM(df, column) {
    return df.stat.sum(column);
  },
  MAX: function MAX(df, column) {
    return df.stat.max(column);
  },
  MIN: function MIN(df, column) {
    return df.stat.min(column);
  },
  AVG: function AVG(df, column) {
    return df.stat.mean(column);
  }
};

function match(value) {
  for (var _len = arguments.length, cases = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    cases[_key - 1] = arguments[_key];
  }

  var casesGen = (0, _reusables.makeGenerator)(cases);

  var checker = function checker(nextCase) {
    return nextCase[0](value) ? nextCase[1](value) : checker(casesGen.next().value);
  };

  return checker(casesGen.next().value);
}

function sqlArgsToArray(args) {
  return (0, _reusables.xReplace)(args.join(" "), [" ", ""]).split(",");
}

function joinHandler(operation, tables, type) {
  var ONKeywordLocation = operation.findIndex(function (word) {
    return word.toUpperCase() === "ON";
  }) + 1;
  return function (df) {
    return df.join(tables[operation[0]], sqlArgsToArray(operation.filter(function (word, loc) {
      return loc >= ONKeywordLocation;
    })), type);
  };
}

var OPERATIONS_HANDLER = {
  WHERE: function WHERE(operation) {
    var operationalTerms = (0, _reusables.xSplit)(operation.join(" "), " AND ", " OR ");
    return function (df) {
      return df.filter(function (row) {
        var conditionalOperators = operation.filter(function (term) {
          return ["AND", "OR"].includes(term.toUpperCase());
        });
        return operationalTerms.map(function (operationalTerm) {
          var operatorToApply = _reusables.xContains.apply(void 0, [operationalTerm].concat(_toConsumableArray(Object.keys(WHERE_OPERATORS))))[0];

          var terms = operationalTerm.split(operatorToApply).map(function (term) {
            return term.trim();
          });

          if (!row.has(terms[0]) && row.has(terms[1])) {
            return WHERE_OPERATORS[operatorToApply]((0, _reusables.xReplace)(terms[0].trim(), ['"', ""], ["'", ""], ["`", ""]), String(row.get(terms[1])));
          }

          var lastTermAsNumber = Number(terms[1]);
          return WHERE_OPERATORS[operatorToApply](String(row.get(terms[0])), Number.isNaN(lastTermAsNumber) ? (0, _reusables.xReplace)(terms[1].trim(), ['"', ""], ["'", ""], ["`", ""]) : lastTermAsNumber);
        }).reduce(function (prev, next) {
          return WHERE_OPERATORS[conditionalOperators.shift()](prev, next);
        });
      });
    };
  },
  JOIN: function JOIN(operation, tables) {
    return joinHandler(operation, tables, "inner");
  },
  INNERJOIN: function INNERJOIN(operation, tables) {
    return joinHandler(operation, tables, "inner");
  },
  LEFTJOIN: function LEFTJOIN(operation, tables) {
    return joinHandler(operation, tables, "left");
  },
  RIGHTJOIN: function RIGHTJOIN(operation, tables) {
    return joinHandler(operation, tables, "right");
  },
  FULLJOIN: function FULLJOIN(operation, tables) {
    return joinHandler(operation, tables, "full");
  },
  UNION: function UNION(operation, tables) {
    return function (df) {
      return df.union(operation[0].toUpperCase().includes("SELECT") ? sqlParser(operation.join(" "), tables) : tables[operation[0]]);
    };
  },
  GROUPBY: function GROUPBY(operation) {
    return function (df) {
      return df.groupBy.apply(df, _toConsumableArray(sqlArgsToArray(operation)));
    };
  }
};

function replaceTermsInQuery(query) {
  var replacedQuery = query;
  REPLACMENTS.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        joinType = _ref2[0],
        replacment = _ref2[1];

    replacedQuery = replacedQuery.replace(joinType, replacment).replace(joinType.toLowerCase(), replacment);
  });
  return replacedQuery;
}

function sqlSplitter(query) {
  var splittedQuery = replaceTermsInQuery(query).split(" ");
  var fromLoc = splittedQuery.findIndex(function (word) {
    return word.toUpperCase() === "FROM";
  });

  if (fromLoc === -1) {
    throw new _errors.SQLParseError("Your query should contains FROM keyword");
  }

  return {
    selections: splittedQuery.slice(0, fromLoc),
    table: splittedQuery[fromLoc + 1],
    operations: splittedQuery.slice(fromLoc + 2, splittedQuery.length)
  };
}

function parseOperations(operations, tables) {
  var operationsLoc = operations.map(function (word, index) {
    return Object.keys(OPERATIONS_HANDLER).includes(word.toUpperCase()) ? index : undefined;
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
  if (selections[0].toUpperCase() !== "SELECT") {
    throw new _errors.SQLParseError("Your query should begin with SELECT keyword");
  }

  selections.shift();
  return match(selections.join(" ").split(",").map(function (selection) {
    return selection.trim();
  }), [function (value) {
    return (0, _reusables.xReplace)(value[0], [" ", ""]) === "*";
  }, function () {
    return function (df) {
      return df;
    };
  }], [function (value) {
    return value[0].toUpperCase().includes("DISTINCT");
  }, function (value) {
    var columnName = (0, _reusables.xReplace)(value[0].split(" AS ")[0], ["DISTINCT", ""], ["distinct", ""], [" ", ""]);
    return function (df) {
      return df.distinct(columnName).rename(columnName, value[0].includes("AS") ? value[0].split("AS")[1].replace(" ", "") : columnName);
    };
  }], [function (value) {
    return _reusables.xContains.apply(void 0, [value[0].toUpperCase()].concat(_toConsumableArray(Object.keys(SELECT_FUNCTIONS))))[0];
  }, function (value) {
    return function (df) {
      var functionToApply = Object.keys(SELECT_FUNCTIONS).find(function (func) {
        return value[0].toUpperCase().includes(func);
      });

      var applyFunction = function applyFunction(dfToImpact) {
        return SELECT_FUNCTIONS[functionToApply](dfToImpact, (0, _reusables.xReplace)(value[0], ["".concat(functionToApply.toLowerCase(), "("), ""], ["".concat(functionToApply, "("), ""], ["(", ""], [")", ""]));
      };

      return df.on && df.df ? df.aggregate(applyFunction) : applyFunction(df);
    };
  }], [function () {
    return true;
  }, function (value) {
    return function (df) {
      return df.select.apply(df, _toConsumableArray(value.map(function (column) {
        return column.split(" AS ")[0].replace(" ", "");
      }))).renameAll(value.map(function (column) {
        return column.includes("AS") ? column.split("AS")[1].replace(" ", "") : column;
      }));
    };
  }]);
}

function sqlParser(query, tables) {
  var _sqlSplitter = sqlSplitter(query),
      selections = _sqlSplitter.selections,
      table = _sqlSplitter.table,
      operations = _sqlSplitter.operations;

  if (!table || !Object.keys(tables).includes(table)) {
    throw new _errors.SQLParseError("Wrong table name in your query: ".concat(table));
  }

  var applyOperations = parseOperations(operations, tables);
  var applySelections = parseSelections(selections);
  return applySelections(applyOperations(tables[table]));
}