export function returnArray(thing) {
    return Array.isArray(thing) ? thing : [thing];
}

export function transpose(table) {
    const tableSize = table.map(row => row.length).reduce((p, n) => Math.max(p, n), 0);
    return [...Array(tableSize).keys()].map((index) => table.map(row => row[index]));
}

export function isArrayOfType(value, ofType, index = 0) {
    return (
        (value instanceof Array) && value.hasOwnProperty(index) &&
        (ofType === String ? typeof value[index] === 'string' : value[index] instanceof ofType) ? true : false
     );
}

export function* makeGenerator(thing) {
    yield* thing;
}

export function opMax(values) {
    return values.reduce((p, n) => Math.max(p, n), 0);
}

export function match(value, ...cases) {
    const casesGen = makeGenerator(cases);
    const checker = nextCase => nextCase[0](value) ? nextCase[1](value) : checker(casesGen.next().value);
    return checker(casesGen.next().value);
}


export function* iter(data, func, limit = Infinity) {
    let token = limit;
    for (const iteration of data) {
        if (token <= 0) return;
        token --;
        const modifiedRow = func(iteration);
        if (modifiedRow) {yield modifiedRow;}
    }
}

export function chain(data, ...operations) {
    return iter(
        data,
        operations.reduce(
            (p, n) => (x) => {
                const prev = p(x);
                const next = prev ? n(prev) : false;
                return next === true ? prev : next;
            }, (x) => x)
        );
}

export function isNumber(x) {
    return !isNaN(parseFloat(x)) && isFinite(x);
}
