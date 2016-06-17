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
    constructor(nColumns, expected) {
        super();
        this.message = `ShemaError: ${nColumns} columns found while
                        having ${expected} in schema`;
        this.name = 'SchemaError';
    }
}
