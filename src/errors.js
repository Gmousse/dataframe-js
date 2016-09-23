export class MixedTypeError extends TypeError {
    constructor(...types) {
        super();
        this.message = `can't work with multiple variable types: [${types.join(',')}].`;
        this.name = 'MixedTypeError';
    }
}

export class InputTypeError extends TypeError {
    constructor(inputName, supportedTypes, inputType) {
        super();
        this.message = `${inputName} must be one of [${supportedTypes.join(',')}], not a ${inputType}.`;
    }
}

export class NoSuchColumnError extends TypeError {
    constructor(column, columns) {
        super();
        this.message = `${column} not found in [${columns.join(', ')}].`;
        this.name = 'NoSuchColumnError';
    }
}

export class WrongSchemaError extends Error {
    constructor(columns, expected) {
        super();
        this.message = `[${columns.join(', ')}] while expecting [${expected.join(', ')}].`;
        this.name = 'WrongSchemaError';
    }
}

export class SQLParseError extends Error {
    constructor(message) {
        super();
        this.message = `${message}.`;
        this.name = 'SQLParseError';
    }
}

export class TableAlreadyExistsError extends Error {
    constructor(tableName) {
        super();
        this.message = `The SQL temporary table ${tableName} already exits. Use overwrite = true to overwrite it.`;
        this.name = 'TableAlreadyExistsError';
    }
}
