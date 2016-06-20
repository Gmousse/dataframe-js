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
