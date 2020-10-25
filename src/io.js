import { text, json } from "d3-request";
import { dsvFormat } from "d3-dsv";

import { __columns__ } from "./symbol";
import { FileNotFoundError } from "./errors";

const FILE_PATTERN = /^(?:[/]|[./]|(?:[a-zA-z]:[/])).*$/;

function saveFile(path, content) {
    try {
        require("fs").writeFileSync(path, content);
    } catch (e) {
        console.warn("File system module is not available.");
    }
}

function loadTextFile(file, func) {
    if (FileReader && File) {
        const reader = new FileReader();
        reader.onload = (event) => func(event.target.result);
        reader.readAsText(file);
    }
}

function addFileProtocol(path) {
    const isValidFilePath = String(path).match(FILE_PATTERN);
    if (isValidFilePath) {
        return `file://${path}`;
    }
    return path;
}

function toDSV(df, sep = ";", header = true, path = undefined) {
    const parser = dsvFormat(sep);
    const csvContent = header
        ? parser.format(df.toCollection(), df[__columns__])
        : parser.formatRows(df.toArray());
    if (path) {
        saveFile(df._cleanSavePath(path), csvContent);
    }
    return csvContent;
}

function toText(df, sep = ";", header = true, path = undefined) {
    return df.toDSV(sep, header, path);
}

function toCSV(df, header = true, path = undefined) {
    return df.toDSV(",", header, path);
}

function toTSV(df, header = true, path = undefined) {
    return df.toDSV("\t", header, path);
}

function toPSV(df, header = true, path = undefined) {
    return df.toDSV("|", header, path);
}

function toJSON(df, asCollection = false, path = undefined) {
    const jsonContent = JSON.stringify(
        asCollection ? df.toCollection() : df.toDict()
    );
    if (path) {
        saveFile(df._cleanSavePath(path), jsonContent);
    }
    return jsonContent;
}

function fromDSV(pathOrFile, sep = ";", header = true) {
    const parser = dsvFormat(sep);
    return new Promise((resolve) => {
        const parseText = (fileContent) => {
            if (fileContent.includes("Error: ENOENT")) return resolve(null);
            // compatible utf8-bom(byte-order-mark)
            if (fileContent[0].toString(16) === "\uFEFF") {
                fileContent = fileContent.slice(1);
            }
            const data = header
                ? parser.parse(fileContent)
                : parser.parseRows(fileContent);
            return resolve(data);
        };
        return typeof pathOrFile === "string"
            ? text(addFileProtocol(pathOrFile), parseText)
            : loadTextFile(pathOrFile, parseText);
    }).then((fileContent) => {
        if (fileContent === null) {
            throw new FileNotFoundError(pathOrFile);
        }
        return fileContent;
    });
}

function fromText(pathOrFile, sep = ";", header = true) {
    return fromDSV(pathOrFile, sep, header);
}

function fromCSV(pathOrFile, header = true) {
    return fromDSV(pathOrFile, ",", header);
}

function fromTSV(pathOrFile, header = true) {
    return fromDSV(pathOrFile, "\t", header);
}

function fromPSV(pathOrFile, header = true) {
    return fromDSV(pathOrFile, "|", header);
}

function fromJSON(pathOrFile) {
    return new Promise((resolve) => {
        return typeof pathOrFile === "string"
            ? json(addFileProtocol(pathOrFile), resolve)
            : loadTextFile(pathOrFile, (txt) => resolve(JSON.parse(txt)));
    }).then((fileContent) => {
        if (fileContent === null) {
            throw new FileNotFoundError(pathOrFile);
        }
        return fileContent;
    });
}

export {
    toDSV,
    toCSV,
    toTSV,
    toPSV,
    toText,
    toJSON,
    fromDSV,
    fromCSV,
    fromTSV,
    fromPSV,
    fromText,
    fromJSON
};
