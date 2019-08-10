"use strict";

require("core-js/modules/es.array.includes");

require("core-js/modules/es.date.to-json");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.starts-with");

require("core-js/modules/web.url.to-json");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toDSV = toDSV;
exports.toCSV = toCSV;
exports.toTSV = toTSV;
exports.toPSV = toPSV;
exports.toText = toText;
exports.toJSON = toJSON;
exports.fromDSV = fromDSV;
exports.fromCSV = fromCSV;
exports.fromTSV = fromTSV;
exports.fromPSV = fromPSV;
exports.fromText = fromText;
exports.fromJSON = fromJSON;

var _d3Request = require("d3-request");

var _d3Dsv = require("d3-dsv");

var _symbol = require("./symbol");

var _errors = require("./errors");

function saveFile(path, content) {
  try {
    require("fs").writeFileSync(path, content);
  } catch (e) {
    console.warn("File system module is not available.");
  }
}

function loadTextFile(file, func) {
  if (FileReader && File) {
    var reader = new FileReader();

    reader.onload = function (event) {
      return func(event.target.result);
    };

    reader.readAsText(file);
  }
}

function addFileProtocol(path) {
  return path.startsWith("/") || path.startsWith("./") || path.startsWith("C") ? "file://".concat(path) : path;
}

function toDSV(df) {
  var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ";";
  var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  var parser = (0, _d3Dsv.dsvFormat)(sep);
  var csvContent = header ? parser.format(df.toCollection(), df[_symbol.__columns__]) : parser.formatRows(df.toArray());

  if (path) {
    saveFile(df._cleanSavePath(path), csvContent);
  }

  return csvContent;
}

function toText(df) {
  var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ";";
  var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  return df.toDSV(sep, header, path);
}

function toCSV(df) {
  var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  return df.toDSV(",", header, path);
}

function toTSV(df) {
  var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  return df.toDSV("\t", header, path);
}

function toPSV(df) {
  var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  return df.toDSV("|", header, path);
}

function toJSON(df) {
  var asCollection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var jsonContent = JSON.stringify(asCollection ? df.toCollection() : df.toDict());

  if (path) {
    saveFile(df._cleanSavePath(path), jsonContent);
  }

  return jsonContent;
}

function fromDSV(pathOrFile) {
  var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ";";
  var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var parser = (0, _d3Dsv.dsvFormat)(sep);
  return new Promise(function (resolve) {
    var parseText = function parseText(fileContent) {
      if (fileContent.includes("Error: ENOENT")) return resolve(null);
      var data = header ? parser.parse(fileContent) : parser.parseRows(fileContent);
      return resolve(data);
    };

    return typeof pathOrFile === "string" ? (0, _d3Request.text)(addFileProtocol(pathOrFile), parseText) : loadTextFile(pathOrFile, parseText);
  }).then(function (fileContent) {
    if (fileContent === null) {
      throw new _errors.FileNotFoundError(pathOrFile);
    }

    return fileContent;
  });
}

function fromText(pathOrFile) {
  var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ";";
  var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return fromDSV(pathOrFile, sep, header);
}

function fromCSV(pathOrFile) {
  var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return fromDSV(pathOrFile, ",", header);
}

function fromTSV(pathOrFile) {
  var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return fromDSV(pathOrFile, "\t", header);
}

function fromPSV(pathOrFile) {
  var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return fromDSV(pathOrFile, "|", header);
}

function fromJSON(pathOrFile) {
  return new Promise(function (resolve) {
    return typeof pathOrFile === "string" ? (0, _d3Request.json)(addFileProtocol(pathOrFile), resolve) : loadTextFile(pathOrFile, function (txt) {
      return resolve(JSON.parse(txt));
    });
  }).then(function (fileContent) {
    if (fileContent === null) {
      throw new _errors.FileNotFoundError(pathOrFile);
    }

    return fileContent;
  });
}