export function returnArray(thing) {
    return Array.isArray(thing) ? thing : [thing];
}

export function match(value) {
    const checker = (condition, makeInSuccess, memory) => {
        if (condition) {
            const nextMemory = condition(value) ? makeInSuccess : memory;
            return (t, m) => checker(t, m, nextMemory);
        }
        return memory();
    };
    return checker;
}

export function transpose(table) {
    const tableSize = table.map(row => row.length).reduce((p, n) => Math.max(p, n), 0);
    return [...Array(tableSize).keys()].map((index) => table.map(row => row[index]));
}
