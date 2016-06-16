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
