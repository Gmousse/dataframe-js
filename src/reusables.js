export function isArrayOfType(value, ofType, index = 0) {
    return value instanceof Array &&
        value.hasOwnProperty(index) &&
        (ofType === String
            ? typeof value[index] === "string"
            : value[index] instanceof ofType)
        ? true
        : false;
}

export function isNumber(x) {
    return !isNaN(parseFloat(x)) && isFinite(x);
}

export function arrayEqual(a, b, byOrder = false) {
    return byOrder
        ? Object.keys(a)
              .map(x => a[x] === b[x])
              .reduce((p, n) => (p ? n : p), true)
        : [...new Set(a.filter(x => !new Set(b).has(x)))].length === 0;
}

export function transpose(table) {
    const tableSize = table
        .map(row => row.length)
        .reduce((p, n) => Math.max(p, n), 0);
    return [...Array(tableSize).keys()].map(index =>
        table.map(row => row[index])
    );
}

export function* makeGenerator(x) {
    yield* x;
}

function* createIterGenerator(data, func, abort = () => false) {
    let i = 0;
    for (const iteration of data) {
        if (abort()) return;
        const modifiedRow = func(iteration, i++);
        if (modifiedRow) {
            yield modifiedRow;
        }
    }
}

export function iter(data, func, abort = () => false) {
    return Array.from(createIterGenerator(data, func, abort));
}

export function chain(data, ...operations) {
    return Array.from(
        iter(
            data,
            operations.reduce(
                (p, n) => (x, i) => {
                    const prev = p(x, i);
                    const next = prev ? n(prev, i) : false;
                    return next === true ? prev : next;
                },
                x => x
            )
        )
    );
}

export function xSplit(stringToSplit, ...patterns) {
    return patterns.reduce(
        (prev, next) =>
            prev.map(str => str.split(next)).reduce((p, n) => [...p, ...n], []),
        [stringToSplit]
    );
}

export function xReplace(stringToReplace, ...patterns) {
    return patterns.reduce(
        (prev, next) => prev.split(next[0]).join(next[1]),
        stringToReplace
    );
}

export function xContains(stringToFilter, ...patterns) {
    return patterns.filter(pattern => stringToFilter.includes(pattern));
}

export function hashCode(str) {
    let hash = 0;
    let char;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return hash;
}
