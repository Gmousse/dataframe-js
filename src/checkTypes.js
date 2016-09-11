class ArgumentTypeError extends TypeError {
    constructor(arg, argName, supportedTypes) {
        super();
        this.message = `${argName} must be one of [${supportedTypes.join(',')}],
            not a ${typeof arg} ${arg.constructor ? arg.constructor.name : ''}.`;
    }
}

function getParamNames(func) {
    if (!func.hasOwnProperty('prototype')) { throw new TypeError('getParamNames only works with unbound functions.'); }
    const funcString = func.toString();
    return funcString.slice(funcString.indexOf('(') + 1, funcString.indexOf(')')).match(/([^\s,]+)/g);
}

function isOfType(variable, type) {
    return (typeof type === 'string') ? (
        (variable.constructor && variable.constructor.name === type) || (typeof variable === type.toLowerCase())
    ) : (
        variable instanceof type
    );
}

function checkArgType(arg, argName, expectedTypes) {
    if (!expectedTypes.reduce((p, n) => p && isOfType(arg, n), true)) {
        throw new ArgumentTypeError(arg, argName, expectedTypes);
    }
}

export function checkArgumentsTypes(func, types) {
    const argNames = getParamNames(func);
    return (...args) => {
        args.forEach((arg, index) => {
            if (types[index]) {
                checkArgType(arg, argNames[index], Array.isArray(types[index]) ? types[index] : [types[index]]);
            }
        });
        return func.call(this, ...args);
    };
}

export function checktypes(...types) {
    return (target, name, descriptor) => {
        return {
            configurable: true,
            get() {
                const func = checkArgumentsTypes.call(this, descriptor.value, types);
                Object.defineProperty(this, name, {
                    value: func,
                    configurable: true,
                    writable: true,
                });
                return func;
            },
        };
    };
}
