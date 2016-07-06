export class InputTypeError extends Error {
    constructor(type, supportedTypes) {
        super();
        this.message = `InputTypeError: ${typeof data} while only suppporting ${supportedTypes.join(', ')}`;
        this.name = 'InputTypeError';
    }
}

export class EmptyInputError extends Error {
    constructor(input) {
        super();
        this.message = `EmptyInputError: ${input} is empty`;
        this.name = 'EmptyInputError';
    }
}

export class SchemaError extends Error {
    constructor(schema) {
        super();
        this.message = `ShemaError: ${schema} found while expecting [[String, Object]]`;
        this.name = 'SchemaError';
    }
}

export class SchemaTypeError extends Error {
    constructor(type) {
        super();
        this.message = `SchemaTypeError: ${type} while only supporting Array as Schema`;
        this.name = 'SchemaTypeError';
    }
}

export class NoSuchColumnError extends Error {
    constructor(column, columns) {
        super();
        this.message = `NoSuchColumnError: ${column} not found in [${columns.join(', ')}]`;
        this.name = 'NoSuchColumnError';
    }
}

export class NotTheSameSchemaError extends Error {
    constructor(columns, expected) {
        super();
        this.message = `NotTheSameSchemaError: [${columns.join(', ')}] while expecting [${expected.join(', ')}]`;
        this.name = 'NotTheSameSchemaError';
    }
}

export class NotTheSameColumnsLengthError extends Error {
    constructor(length, expected) {
        super();
        this.message = `NotTheSameColumnsLengthError: [${length}] while expecting [${expected}]`;
        this.name = 'NotTheSameColumnsLengthError';
    }
}

export class WrongMatrixStructureError extends Error {
    constructor(structure, expected) {
        super();
        this.message = `WrongMatrixStructureError: [${structure.join(', ')}] while expecting [${expected.join(', ')}]`;
        this.name = 'WrongMatrixStructureError';
    }
}
