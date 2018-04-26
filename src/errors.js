export class FileNotFoundError extends Error {
    constructor(fileName) {
        super(Error);
        this.message = `${fileName} not found. You maybe use a wrong path or url. \
Be sure you use absolute path, relative one being not supported.`;
        this.name = "FileNotFoundError";
    }
}

export class MixedTypeError extends TypeError {
    constructor(...types) {
        super(TypeError);
        this.message = `can't work with multiple variable types: [${types.join(
            ","
        )}].`;
        this.name = "MixedTypeError";
    }
}

export class NoSuchColumnError extends Error {
    constructor(column, columns) {
        super(Error);
        this.message = `${column} not found in [${columns.join(", ")}].`;
        this.name = "NoSuchColumnError";
    }
}

export class WrongSchemaError extends Error {
    constructor(columns, expected) {
        super(Error);
        this.message = `[${columns.join(
            ", "
        )}] while expecting [${expected.join(", ")}].`;
        this.name = "WrongSchemaError";
    }
}
export class ArgumentTypeError extends TypeError {
    constructor(input, expected) {
        super(TypeError);
        this.message = `${
            input && input.constructor ? input.constructor.name : typeof input
        } while expecting ${expected}.`;
        this.name = "ArgumentTypeError";
    }
}

export class SQLParseError extends Error {
    constructor(message) {
        super(Error);
        this.message = `${message}.`;
        this.name = "SQLParseError";
    }
}

export class TableAlreadyExistsError extends Error {
    constructor(tableName) {
        super(Error);
        this.message = `The SQL temporary table ${tableName} already exits. Use overwrite = true to overwrite it.`;
        this.name = "TableAlreadyExistsError";
    }
}

export class WrongTableNameError extends Error {
    constructor(tableName) {
        super(Error);
        this.message = `The SQL temporary table ${tableName} is not allowed. Avoid to use Spaces, quotes, tabs....`;
        this.name = "WrongTableNameError";
    }
}
