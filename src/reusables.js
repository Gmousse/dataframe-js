
export function asArray(x) {
    if (!x) return [];
    return Array.isArray(x) ? x : [x];
}

export function isArrayOfType(value, ofType, index = 0) {
    return (
        (value instanceof Array) && value.hasOwnProperty(index) &&
        (ofType === String ? typeof value[index] === 'string' : value[index] instanceof ofType) ? true : false
     );
}

export function isNumber(x) {
    return !isNaN(parseFloat(x)) && isFinite(x);
}

export function arrayEqual(a, b, byOrder = false) {
    return byOrder ? Object.keys(a).map(x => a[x] === b[x]).reduce((p, n) => p ? n : p, true) :
     [...new Set(a.filter(x => !new Set(b).has(x)))].length === 0;
}

export function transpose(table) {
    const tableSize = table.map(row => row.length).reduce((p, n) => Math.max(p, n), 0);
    return [...Array(tableSize).keys()].map((index) => table.map(row => row[index]));
}

export function* makeGenerator(x) {
    yield* x;
}

export function match(value, ...cases) {
    const casesGen = makeGenerator(cases);
    const checker = nextCase => nextCase[0](value) ? nextCase[1](value) : checker(casesGen.next().value);
    return checker(casesGen.next().value);
}

export function* iter(data, func, abort = () => false) {
    for (const iteration of data) {
        if (abort()) return;
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

export function saveFile(path, content) {
    try {
        require('fs').writeFileSync(path, content);
    } catch (e) {
        console.warn('File system module is not available.');
    }
}

export function loadTextFile(file, func) {
    if (FileReader && File) {
        const reader = new FileReader();
        reader.onload = (event) => func(event.target.result);
        reader.readAsText(file);
    }
}

export function addFileProtocol(path) {
    return (path.startsWith('/') || path.startsWith('./')) ? `file://${path}` : path;
}

export function xSplit(stringToSplit, ...patterns) {
    return patterns.reduce(
        (prev, next) => prev.map(str => str.split(next)).reduce((p, n) => [...p, ...n], []),
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

export function compare(firstElem, secondElem, reverse = false) {
    if (firstElem > secondElem) {
        return reverse ? -1 : 1;
    } else if (firstElem < secondElem) {
        return reverse ? 1 : -1;
    }
    return 0;
}

export function hashCode(str) {
    let hash = 0;
    let char;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash;
}
