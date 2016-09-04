export class InputTypeError extends TypeError {
    constructor(inputName, supportedTypes, inputType) {
        super();
        this.message = `${inputName} must be one of [${supportedTypes.join(',')}], not a ${inputType}.`;
    }
}

export class EmptyInputError extends Error {
    constructor(input) {
        super();
        this.message = `${input} is empty`;
        this.name = 'EmptyInputError';
    }
}

export class SchemaError extends Error {
    constructor(schema) {
        super();
        this.message = `${schema} found while expecting [[String, Object]]`;
        this.name = 'SchemaError';
    }
}

export class SchemaTypeError extends Error {
    constructor(type) {
        super();
        this.message = `${type} while only supporting Array as Schema`;
        this.name = 'SchemaTypeError';
    }
}

export class NoSuchColumnError extends Error {
    constructor(column, columns) {
        super();
        this.message = `${column} not found in [${columns.join(', ')}]`;
        this.name = 'NoSuchColumnError';
    }
}

export class NotTheSameSchemaError extends Error {
    constructor(columns, expected) {
        super();
        this.message = `[${columns.join(', ')}] while expecting [${expected.join(', ')}]`;
        this.name = 'NotTheSameSchemaError';
    }
}

export class NotTheSameColumnLengthsError extends Error {
    constructor(length, expected) {
        super();
        this.message = `[${length}] while expecting [${expected}]`;
        this.name = 'NotTheSameColumnLengthsError';
    }
}

export class WrongMatrixStructureError extends Error {
    constructor(structure, expected) {
        super();
        this.message = `[${structure.join(', ')}] while expecting [${expected.join(', ')}]`;
        this.name = 'WrongMatrixStructureError';
    }
}

export class SQLParseError extends Error {
    constructor(message) {
        super();
        this.message = `${message}`;
        this.name = 'SQLParseError';
    }
}

export class TableAlreadyExistsError extends Error {
    constructor(tableName) {
        super();
        this.message = `The SQL temporary table ${tableName} already exits. Use overwrite = true to overwrite it`;
        this.name = 'TableAlreadyExistsError';
    }
}
