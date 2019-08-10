"use strict";

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.function.name");

require("core-js/modules/es.number.constructor");

require("core-js/modules/es.number.is-nan");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reusables = require("../reusables");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Stat = function () {
  function Stat(df) {
    _classCallCheck(this, Stat);

    this.df = df;
    this.name = "stat";
  }

  _createClass(Stat, [{
    key: "_castAsNumber",
    value: function _castAsNumber(columnName) {
      return this.df.withColumn(columnName, function (row) {
        return Number(row.get(columnName));
      }).filter(function (row) {
        return !Number.isNaN(row.get(columnName));
      });
    }
  }, {
    key: "sum",
    value: function sum(columnName) {
      return Number(this.df.reduce(function (p, n) {
        return (0, _reusables.isNumber)(n.get(columnName)) ? p + Number(n.get(columnName)) : p;
      }, 0));
    }
  }, {
    key: "max",
    value: function max(columnName) {
      return this._castAsNumber(columnName).reduce(function (p, n) {
        return n.get(columnName) > p.get(columnName) ? n : p;
      }).get(columnName);
    }
  }, {
    key: "min",
    value: function min(columnName) {
      return this._castAsNumber(columnName).reduce(function (p, n) {
        return p.get(columnName) > n.get(columnName) ? n : p;
      }).get(columnName);
    }
  }, {
    key: "mean",
    value: function mean(columnName) {
      var numericDF = this.df.filter(function (row) {
        return (0, _reusables.isNumber)(row.get(columnName));
      });
      return Number(numericDF.reduce(function (p, n) {
        return (0, _reusables.isNumber)(n.get(columnName)) ? p + Number(n.get(columnName)) : p;
      }, 0)) / numericDF.count();
    }
  }, {
    key: "average",
    value: function average(columnName) {
      return this.mean(columnName);
    }
  }, {
    key: "var",
    value: function _var(columnName) {
      var population = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var numericDF = this.df.filter(function (row) {
        return (0, _reusables.isNumber)(row.get(columnName));
      });
      var mean = this.mean(columnName);
      return Number(numericDF.reduce(function (p, n) {
        return p + Math.pow(n.get(columnName) - mean, 2);
      }, 0)) / (numericDF.count() - (population ? 0 : 1));
    }
  }, {
    key: "sd",
    value: function sd(columnName) {
      var population = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return Math.sqrt(this.var(columnName, population));
    }
  }, {
    key: "stats",
    value: function stats(columnName) {
      return {
        sum: this.sum(columnName),
        mean: this.mean(columnName),
        min: this.min(columnName),
        max: this.max(columnName),
        var: this.var(columnName),
        varpop: this.var(columnName, true),
        sd: this.sd(columnName),
        sdpop: this.sd(columnName, true)
      };
    }
  }]);

  return Stat;
}();

var _default = Stat;
exports.default = _default;