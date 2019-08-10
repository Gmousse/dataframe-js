var dfjs = (function (exports) {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var O = 'object';
	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global_1 =
	  // eslint-disable-next-line no-undef
	  check(typeof globalThis == O && globalThis) ||
	  check(typeof window == O && window) ||
	  check(typeof self == O && self) ||
	  check(typeof commonjsGlobal == O && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func
	  Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings



	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// `ToPrimitive` abstract operation
	// https://tc39.github.io/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$1
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var nativeDefineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty
	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var objectDefineProperty = {
		f: f$2
	};

	var hide = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    hide(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  } return value;
	};

	var isPure = false;

	var shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.1.3',
	  mode: 'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var functionToString = shared('native-function-to-string', Function.toString);

	var WeakMap$1 = global_1.WeakMap;

	var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(functionToString.call(WeakMap$1));

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var WeakMap$2 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (nativeWeakMap) {
	  var store = new WeakMap$2();
	  var wmget = store.get;
	  var wmhas = store.has;
	  var wmset = store.set;
	  set = function (it, metadata) {
	    wmset.call(store, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store, it) || {};
	  };
	  has$1 = function (it) {
	    return wmhas.call(store, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;
	  set = function (it, metadata) {
	    hide(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };
	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var redefine = createCommonjsModule(function (module) {
	var getInternalState = internalState.get;
	var enforceInternalState = internalState.enforce;
	var TEMPLATE = String(functionToString).split('toString');

	shared('inspectSource', function (it) {
	  return functionToString.call(it);
	});

	(module.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
	    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
	  }
	  if (O === global_1) {
	    if (simple) O[key] = value;
	    else setGlobal(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else hide(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState(this).source || functionToString.call(this);
	});
	});

	var path = global_1;

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
	    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger
	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength
	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var indexOf = arrayIncludes.indexOf;


	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
		f: f$3
	};

	var f$4 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$4
	};

	// all object keys, includes non-enumerable and symbols
	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails(detection)
	    : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';

	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global_1;
	  } else if (STATIC) {
	    target = global_1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global_1[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      hide(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine(target, key, sourceProperty, options);
	  }
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	// `IsArray` abstract operation
	// https://tc39.github.io/ecma262/#sec-isarray
	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	// `ToObject` abstract operation
	// https://tc39.github.io/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// `Object.defineProperties` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperties
	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var html = getBuiltIn('document', 'documentElement');

	var IE_PROTO = sharedKey('IE_PROTO');

	var PROTOTYPE = 'prototype';
	var Empty = function () { /* empty */ };

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var length = enumBugKeys.length;
	  var lt = '<';
	  var script = 'script';
	  var gt = '>';
	  var js = 'java' + script + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  iframe.src = String(js);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
	  return createDict();
	};

	// `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	hiddenKeys[IE_PROTO] = true;

	var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;

	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return nativeGetOwnPropertyNames(it);
	  } catch (error) {
	    return windowNames.slice();
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var f$5 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]'
	    ? getWindowNames(it)
	    : nativeGetOwnPropertyNames(toIndexedObject(it));
	};

	var objectGetOwnPropertyNamesExternal = {
		f: f$5
	};

	var Symbol$1 = global_1.Symbol;
	var store$1 = shared('wks');

	var wellKnownSymbol = function (name) {
	  return store$1[name] || (store$1[name] = nativeSymbol && Symbol$1[name]
	    || (nativeSymbol ? Symbol$1 : uid)('Symbol.' + name));
	};

	var f$6 = wellKnownSymbol;

	var wrappedWellKnownSymbol = {
		f: f$6
	};

	var defineProperty = objectDefineProperty.f;

	var defineWellKnownSymbol = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
	    value: wrappedWellKnownSymbol.f(NAME)
	  });
	};

	var defineProperty$1 = objectDefineProperty.f;



	var TO_STRING_TAG = wellKnownSymbol('toStringTag');

	var setToStringTag = function (it, TAG, STATIC) {
	  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
	    defineProperty$1(it, TO_STRING_TAG, { configurable: true, value: TAG });
	  }
	};

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	// optional / simple context binding
	var bindContext = function (fn, that, length) {
	  aFunction$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var SPECIES = wellKnownSymbol('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var push = [].push;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
	var createMethod$1 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = bindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push.call(target, value); // filter
	        } else if (IS_EVERY) return false;  // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$1(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod$1(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod$1(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod$1(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod$1(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod$1(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$1(6)
	};

	var $forEach = arrayIteration.forEach;

	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE$1 = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
	var setInternalState = internalState.set;
	var getInternalState = internalState.getterFor(SYMBOL);
	var ObjectPrototype = Object[PROTOTYPE$1];
	var $Symbol = global_1.Symbol;
	var JSON$1 = global_1.JSON;
	var nativeJSONStringify = JSON$1 && JSON$1.stringify;
	var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var nativeDefineProperty$1 = objectDefineProperty.f;
	var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
	var AllSymbols = shared('symbols');
	var ObjectPrototypeSymbols = shared('op-symbols');
	var StringToSymbolRegistry = shared('string-to-symbol-registry');
	var SymbolToStringRegistry = shared('symbol-to-string-registry');
	var WellKnownSymbolsStore = shared('wks');
	var QObject = global_1.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = descriptors && fails(function () {
	  return objectCreate(nativeDefineProperty$1({}, 'a', {
	    get: function () { return nativeDefineProperty$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
	  nativeDefineProperty$1(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
	    nativeDefineProperty$1(ObjectPrototype, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty$1;

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
	  setInternalState(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!descriptors) symbol.description = description;
	  return symbol;
	};

	var isSymbol = nativeSymbol && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return Object(it) instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject(O);
	  var key = toPrimitive(P, true);
	  anObject(Attributes);
	  if (has(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty$1(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject(O);
	  var properties = toIndexedObject(Properties);
	  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
	  $forEach(keys, function (key) {
	    if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPrimitive(V, true);
	  var enumerable = nativePropertyIsEnumerable$1.call(this, P);
	  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject(O);
	  var key = toPrimitive(P, true);
	  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
	  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames$1(toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
	  var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
	      result.push(AllSymbols[key]);
	    }
	  });
	  return result;
	};

	// `Symbol` constructor
	// https://tc39.github.io/ecma262/#sec-symbol-constructor
	if (!nativeSymbol) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var tag = uid(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
	    };
	    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
	    return wrap(tag, description);
	  };

	  redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
	    return getInternalState(this).tag;
	  });

	  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
	  objectDefineProperty.f = $defineProperty;
	  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
	  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

	  if (descriptors) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState(this).description;
	      }
	    });
	    if (!isPure) {
	      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
	    }
	  }

	  wrappedWellKnownSymbol.f = function (name) {
	    return wrap(wellKnownSymbol(name), name);
	  };
	}

	_export({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
	  Symbol: $Symbol
	});

	$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
	  defineWellKnownSymbol(name);
	});

	_export({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
	  // `Symbol.for` method
	  // https://tc39.github.io/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = String(key);
	    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
	    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors }, {
	  // `Object.create` method
	  // https://tc39.github.io/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	_export({ target: 'Object', stat: true, forced: fails(function () { objectGetOwnPropertySymbols.f(1); }) }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return objectGetOwnPropertySymbols.f(toObject(it));
	  }
	});

	// `JSON.stringify` method behavior with symbols
	// https://tc39.github.io/ecma262/#sec-json.stringify
	JSON$1 && _export({ target: 'JSON', stat: true, forced: !nativeSymbol || fails(function () {
	  var symbol = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  return nativeJSONStringify([symbol]) != '[null]'
	    // WebKit converts symbol values to JSON as null
	    || nativeJSONStringify({ a: symbol }) != '{}'
	    // V8 throws on boxed symbols
	    || nativeJSONStringify(Object(symbol)) != '{}';
	}) }, {
	  stringify: function stringify(it) {
	    var args = [it];
	    var index = 1;
	    var replacer, $replacer;
	    while (arguments.length > index) args.push(arguments[index++]);
	    $replacer = replacer = args[1];
	    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return nativeJSONStringify.apply(JSON$1, args);
	  }
	});

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
	if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) hide($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag($Symbol, SYMBOL);

	hiddenKeys[HIDDEN] = true;

	var defineProperty$2 = objectDefineProperty.f;


	var NativeSymbol = global_1.Symbol;

	if (descriptors && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
	  // Safari 12 bug
	  NativeSymbol().description !== undefined
	)) {
	  var EmptyStringDescriptionStore = {};
	  // wrap Symbol constructor for correct work with undefined description
	  var SymbolWrapper = function Symbol() {
	    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var result = this instanceof SymbolWrapper
	      ? new NativeSymbol(description)
	      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
	      : description === undefined ? NativeSymbol() : NativeSymbol(description);
	    if (description === '') EmptyStringDescriptionStore[result] = true;
	    return result;
	  };
	  copyConstructorProperties(SymbolWrapper, NativeSymbol);
	  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
	  symbolPrototype.constructor = SymbolWrapper;

	  var symbolToString = symbolPrototype.toString;
	  var native = String(NativeSymbol('test')) == 'Symbol(test)';
	  var regexp = /^Symbol\((.*)\)[^)]+$/;
	  defineProperty$2(symbolPrototype, 'description', {
	    configurable: true,
	    get: function description() {
	      var symbol = isObject(this) ? this.valueOf() : this;
	      var string = symbolToString.call(symbol);
	      if (has(EmptyStringDescriptionStore, symbol)) return '';
	      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
	      return desc === '' ? undefined : desc;
	    }
	  });

	  _export({ global: true, forced: true }, {
	    Symbol: SymbolWrapper
	  });
	}

	// `Symbol.iterator` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.iterator
	defineWellKnownSymbol('iterator');

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var SPECIES$1 = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  return !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$1] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

	var IS_CONCAT_SPREADABLE_SUPPORT = !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	_export({ target: 'Array', proto: true, forced: FORCED }, {
	  concat: function concat(arg) { // eslint-disable-line no-unused-vars
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = toLength(E.length);
	        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var $filter = arrayIteration.filter;


	// `Array.prototype.filter` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('filter') }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var sloppyArrayMethod = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !method || !fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var $forEach$1 = arrayIteration.forEach;


	// `Array.prototype.forEach` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	var arrayForEach = sloppyArrayMethod('forEach') ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	} : [].forEach;

	// `Array.prototype.forEach` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	_export({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
	  forEach: arrayForEach
	});

	// call something on iterator step with safe closing on error
	var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (error) {
	    var returnMethod = iterator['return'];
	    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
	    throw error;
	  }
	};

	var iterators = {};

	var ITERATOR = wellKnownSymbol('iterator');
	var ArrayPrototype = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod = function (it) {
	  return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR] === it);
	};

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof = function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	var ITERATOR$1 = wellKnownSymbol('iterator');

	var getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$1]
	    || it['@@iterator']
	    || iterators[classof(it)];
	};

	// `Array.from` method implementation
	// https://tc39.github.io/ecma262/#sec-array.from
	var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	  var O = toObject(arrayLike);
	  var C = typeof this == 'function' ? this : Array;
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  var index = 0;
	  var iteratorMethod = getIteratorMethod(O);
	  var length, result, step, iterator;
	  if (mapping) mapfn = bindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
	  // if the target is not iterable or it's an array with the default iterator - use a simple case
	  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
	    iterator = iteratorMethod.call(O);
	    result = new C();
	    for (;!(step = iterator.next()).done; index++) {
	      createProperty(result, index, mapping
	        ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true)
	        : step.value
	      );
	    }
	  } else {
	    length = toLength(O.length);
	    result = new C(length);
	    for (;length > index; index++) {
	      createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	    }
	  }
	  result.length = index;
	  return result;
	};

	var ITERATOR$2 = wellKnownSymbol('iterator');
	var SAFE_CLOSING = false;

	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function () {
	      return { done: !!called++ };
	    },
	    'return': function () {
	      SAFE_CLOSING = true;
	    }
	  };
	  iteratorWithReturn[ITERATOR$2] = function () {
	    return this;
	  };
	} catch (error) { /* empty */ }

	var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    object[ITERATOR$2] = function () {
	      return {
	        next: function () {
	          return { done: ITERATION_SUPPORT = true };
	        }
	      };
	    };
	    exec(object);
	  } catch (error) { /* empty */ }
	  return ITERATION_SUPPORT;
	};

	var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
	});

	// `Array.from` method
	// https://tc39.github.io/ecma262/#sec-array.from
	_export({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
	  from: arrayFrom
	});

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype$1 = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
	  hide(ArrayPrototype$1, UNSCOPABLES, objectCreate(null));
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables = function (key) {
	  ArrayPrototype$1[UNSCOPABLES][key] = true;
	};

	var $includes = arrayIncludes.includes;


	// `Array.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.includes
	_export({ target: 'Array', proto: true }, {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('includes');

	var correctPrototypeGetter = !fails(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO$1 = sharedKey('IE_PROTO');
	var ObjectPrototype$1 = Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype$1 : null;
	};

	var ITERATOR$3 = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;

	var returnThis = function () { return this; };

	// `%IteratorPrototype%` object
	// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}

	if (IteratorPrototype == undefined) IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	if (!has(IteratorPrototype, ITERATOR$3)) hide(IteratorPrototype, ITERATOR$3, returnThis);

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





	var returnThis$1 = function () { return this; };

	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
	  iterators[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var aPossiblePrototype = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  } return it;
	};

	// `Object.setPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$4 = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis$2 = function () { return this; };

	var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    } return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$4]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
	      if (objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
	        if (objectSetPrototypeOf) {
	          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
	        } else if (typeof CurrentIteratorPrototype[ITERATOR$4] != 'function') {
	          hide(CurrentIteratorPrototype, ITERATOR$4, returnThis$2);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
	    }
	  }

	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }

	  // define iterator
	  if (IterablePrototype[ITERATOR$4] !== defaultIterator) {
	    hide(IterablePrototype, ITERATOR$4, defaultIterator);
	  }
	  iterators[NAME] = defaultIterator;

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
	  }

	  return methods;
	};

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$1 = internalState.set;
	var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.github.io/ecma262/#sec-createarrayiterator
	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState$1(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$1(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return { value: undefined, done: true };
	  }
	  if (kind == 'keys') return { value: index, done: false };
	  if (kind == 'values') return { value: target[index], done: false };
	  return { value: [index, target[index]], done: false };
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
	iterators.Arguments = iterators.Array;

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	var nativeJoin = [].join;

	var ES3_STRINGS = indexedObject != Object;
	var SLOPPY_METHOD = sloppyArrayMethod('join', ',');

	// `Array.prototype.join` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.join
	_export({ target: 'Array', proto: true, forced: ES3_STRINGS || SLOPPY_METHOD }, {
	  join: function join(separator) {
	    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
	});

	var $map = arrayIteration.map;


	// `Array.prototype.map` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('map') }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// `Array.prototype.{ reduce, reduceRight }` methods implementation
	var createMethod$2 = function (IS_RIGHT) {
	  return function (that, callbackfn, argumentsLength, memo) {
	    aFunction$1(callbackfn);
	    var O = toObject(that);
	    var self = indexedObject(O);
	    var length = toLength(O.length);
	    var index = IS_RIGHT ? length - 1 : 0;
	    var i = IS_RIGHT ? -1 : 1;
	    if (argumentsLength < 2) while (true) {
	      if (index in self) {
	        memo = self[index];
	        index += i;
	        break;
	      }
	      index += i;
	      if (IS_RIGHT ? index < 0 : length <= index) {
	        throw TypeError('Reduce of empty array with no initial value');
	      }
	    }
	    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }
	    return memo;
	  };
	};

	var arrayReduce = {
	  // `Array.prototype.reduce` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
	  left: createMethod$2(false),
	  // `Array.prototype.reduceRight` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
	  right: createMethod$2(true)
	};

	var $reduce = arrayReduce.left;


	// `Array.prototype.reduce` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
	_export({ target: 'Array', proto: true, forced: sloppyArrayMethod('reduce') }, {
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $reduceRight = arrayReduce.right;


	// `Array.prototype.reduceRight` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
	_export({ target: 'Array', proto: true, forced: sloppyArrayMethod('reduceRight') }, {
	  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
	    return $reduceRight(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var SPECIES$2 = wellKnownSymbol('species');
	var nativeSlice = [].slice;
	var max$1 = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	_export({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('slice') }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = toLength(O.length);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject(Constructor)) {
	        Constructor = Constructor[SPECIES$2];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === Array || Constructor === undefined) {
	        return nativeSlice.call(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

	var nativeSort = [].sort;
	var test = [1, 2, 3];

	// IE8-
	var FAILS_ON_UNDEFINED = fails(function () {
	  test.sort(undefined);
	});
	// V8 bug
	var FAILS_ON_NULL = fails(function () {
	  test.sort(null);
	});
	// Old WebKit
	var SLOPPY_METHOD$1 = sloppyArrayMethod('sort');

	var FORCED$1 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || SLOPPY_METHOD$1;

	// `Array.prototype.sort` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.sort
	_export({ target: 'Array', proto: true, forced: FORCED$1 }, {
	  sort: function sort(comparefn) {
	    return comparefn === undefined
	      ? nativeSort.call(toObject(this))
	      : nativeSort.call(toObject(this), aFunction$1(comparefn));
	  }
	});

	var FORCED$2 = fails(function () {
	  return new Date(NaN).toJSON() !== null
	    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
	});

	// `Date.prototype.toJSON` method
	// https://tc39.github.io/ecma262/#sec-date.prototype.tojson
	_export({ target: 'Date', proto: true, forced: FORCED$2 }, {
	  // eslint-disable-next-line no-unused-vars
	  toJSON: function toJSON(key) {
	    var O = toObject(this);
	    var pv = toPrimitive(O);
	    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
	  }
	});

	var defineProperty$3 = objectDefineProperty.f;

	var FunctionPrototype = Function.prototype;
	var FunctionPrototypeToString = FunctionPrototype.toString;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';

	// Function instances `.name` property
	// https://tc39.github.io/ecma262/#sec-function-instances-name
	if (descriptors && !(NAME in FunctionPrototype)) {
	  defineProperty$3(FunctionPrototype, NAME, {
	    configurable: true,
	    get: function () {
	      try {
	        return FunctionPrototypeToString.call(this).match(nameRE)[1];
	      } catch (error) {
	        return '';
	      }
	    }
	  });
	}

	var nativeAssign = Object.assign;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	// should work with symbols and should have deterministic property order (V8 bug)
	var objectAssign = !nativeAssign || fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
	  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  var propertyIsEnumerable = objectPropertyIsEnumerable.f;
	  while (argumentsLength > index) {
	    var S = indexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
	    }
	  } return T;
	} : nativeAssign;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	_export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
	  assign: objectAssign
	});

	var propertyIsEnumerable = objectPropertyIsEnumerable.f;

	// `Object.{ entries, values }` methods implementation
	var createMethod$3 = function (TO_ENTRIES) {
	  return function (it) {
	    var O = toIndexedObject(it);
	    var keys = objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) {
	      key = keys[i++];
	      if (!descriptors || propertyIsEnumerable.call(O, key)) {
	        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
	      }
	    }
	    return result;
	  };
	};

	var objectToArray = {
	  // `Object.entries` method
	  // https://tc39.github.io/ecma262/#sec-object.entries
	  entries: createMethod$3(true),
	  // `Object.values` method
	  // https://tc39.github.io/ecma262/#sec-object.values
	  values: createMethod$3(false)
	};

	var $entries = objectToArray.entries;

	// `Object.entries` method
	// https://tc39.github.io/ecma262/#sec-object.entries
	_export({ target: 'Object', stat: true }, {
	  entries: function entries(O) {
	    return $entries(O);
	  }
	});

	// `SameValue` abstract operation
	// https://tc39.github.io/ecma262/#sec-samevalue
	var sameValue = Object.is || function is(x, y) {
	  // eslint-disable-next-line no-self-compare
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

	// `Object.is` method
	// https://tc39.github.io/ecma262/#sec-object.is
	_export({ target: 'Object', stat: true }, {
	  is: sameValue
	});

	var FAILS_ON_PRIMITIVES = fails(function () { objectKeys(1); });

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
	  keys: function keys(it) {
	    return objectKeys(toObject(it));
	  }
	});

	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
	var test$1 = {};

	test$1[TO_STRING_TAG$2] = 'z';

	// `Object.prototype.toString` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	var objectToString = String(test$1) !== '[object z]' ? function toString() {
	  return '[object ' + classof(this) + ']';
	} : test$1.toString;

	var ObjectPrototype$2 = Object.prototype;

	// `Object.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	if (objectToString !== ObjectPrototype$2.toString) {
	  redefine(ObjectPrototype$2, 'toString', objectToString, { unsafe: true });
	}

	var $values = objectToArray.values;

	// `Object.values` method
	// https://tc39.github.io/ecma262/#sec-object.values
	_export({ target: 'Object', stat: true }, {
	  values: function values(O) {
	    return $values(O);
	  }
	});

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags = function () {
	  var that = anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var nativeExec = RegExp.prototype.exec;
	// This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.
	var nativeReplace = String.prototype.replace;

	var patchedExec = nativeExec;

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

	    match = nativeExec.call(re, str);

	    if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    return match;
	  };
	}

	var regexpExec = patchedExec;

	_export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
	  exec: regexpExec
	});

	var freezing = !fails(function () {
	  return Object.isExtensible(Object.preventExtensions({}));
	});

	var internalMetadata = createCommonjsModule(function (module) {
	var defineProperty = objectDefineProperty.f;



	var METADATA = uid('meta');
	var id = 0;

	var isExtensible = Object.isExtensible || function () {
	  return true;
	};

	var setMetadata = function (it) {
	  defineProperty(it, METADATA, { value: {
	    objectID: 'O' + ++id, // object ID
	    weakData: {}          // weak collections IDs
	  } });
	};

	var fastKey = function (it, create) {
	  // return a primitive with prefix
	  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMetadata(it);
	  // return object ID
	  } return it[METADATA].objectID;
	};

	var getWeakData = function (it, create) {
	  if (!has(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMetadata(it);
	  // return the store of weak collections IDs
	  } return it[METADATA].weakData;
	};

	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
	  return it;
	};

	var meta = module.exports = {
	  REQUIRED: false,
	  fastKey: fastKey,
	  getWeakData: getWeakData,
	  onFreeze: onFreeze
	};

	hiddenKeys[METADATA] = true;
	});
	var internalMetadata_1 = internalMetadata.REQUIRED;
	var internalMetadata_2 = internalMetadata.fastKey;
	var internalMetadata_3 = internalMetadata.getWeakData;
	var internalMetadata_4 = internalMetadata.onFreeze;

	var iterate_1 = createCommonjsModule(function (module) {
	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
	  var boundFunction = bindContext(fn, that, AS_ENTRIES ? 2 : 1);
	  var iterator, iterFn, index, length, result, step;

	  if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod(iterable);
	    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = toLength(iterable.length); length > index; index++) {
	        result = AS_ENTRIES
	          ? boundFunction(anObject(step = iterable[index])[0], step[1])
	          : boundFunction(iterable[index]);
	        if (result && result instanceof Result) return result;
	      } return new Result(false);
	    }
	    iterator = iterFn.call(iterable);
	  }

	  while (!(step = iterator.next()).done) {
	    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
	    if (result && result instanceof Result) return result;
	  } return new Result(false);
	};

	iterate.stop = function (result) {
	  return new Result(true, result);
	};
	});

	var anInstance = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) {
	    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	  } return it;
	};

	// makes subclassing work correct for wrapped built-ins
	var inheritIfRequired = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if (
	    // it can work only with native `setPrototypeOf`
	    objectSetPrototypeOf &&
	    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	    typeof (NewTarget = dummy.constructor) == 'function' &&
	    NewTarget !== Wrapper &&
	    isObject(NewTargetPrototype = NewTarget.prototype) &&
	    NewTargetPrototype !== Wrapper.prototype
	  ) objectSetPrototypeOf($this, NewTargetPrototype);
	  return $this;
	};

	var collection = function (CONSTRUCTOR_NAME, wrapper, common, IS_MAP, IS_WEAK) {
	  var NativeConstructor = global_1[CONSTRUCTOR_NAME];
	  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
	  var Constructor = NativeConstructor;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var exported = {};

	  var fixMethod = function (KEY) {
	    var nativeMethod = NativePrototype[KEY];
	    redefine(NativePrototype, KEY,
	      KEY == 'add' ? function add(a) {
	        nativeMethod.call(this, a === 0 ? 0 : a);
	        return this;
	      } : KEY == 'delete' ? function (a) {
	        return IS_WEAK && !isObject(a) ? false : nativeMethod.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a) {
	        return IS_WEAK && !isObject(a) ? undefined : nativeMethod.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a) {
	        return IS_WEAK && !isObject(a) ? false : nativeMethod.call(this, a === 0 ? 0 : a);
	      } : function set(a, b) {
	        nativeMethod.call(this, a === 0 ? 0 : a, b);
	        return this;
	      }
	    );
	  };

	  // eslint-disable-next-line max-len
	  if (isForced_1(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
	    new NativeConstructor().entries().next();
	  })))) {
	    // create collection constructor
	    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
	    internalMetadata.REQUIRED = true;
	  } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
	    var instance = new Constructor();
	    // early implementations not supports chaining
	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
	    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    // eslint-disable-next-line no-new
	    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
	    // for early implementations -0 and +0 not the same
	    var BUGGY_ZERO = !IS_WEAK && fails(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new NativeConstructor();
	      var index = 5;
	      while (index--) $instance[ADDER](index, index);
	      return !$instance.has(-0);
	    });

	    if (!ACCEPT_ITERABLES) {
	      Constructor = wrapper(function (dummy, iterable) {
	        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
	        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
	        if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
	        return that;
	      });
	      Constructor.prototype = NativePrototype;
	      NativePrototype.constructor = Constructor;
	    }

	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }

	    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

	    // weak collections should not contains .clear method
	    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
	  }

	  exported[CONSTRUCTOR_NAME] = Constructor;
	  _export({ global: true, forced: Constructor != NativeConstructor }, exported);

	  setToStringTag(Constructor, CONSTRUCTOR_NAME);

	  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

	  return Constructor;
	};

	var redefineAll = function (target, src, options) {
	  for (var key in src) redefine(target, key, src[key], options);
	  return target;
	};

	var SPECIES$3 = wellKnownSymbol('species');

	var setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty.f;

	  if (descriptors && Constructor && !Constructor[SPECIES$3]) {
	    defineProperty(Constructor, SPECIES$3, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var defineProperty$4 = objectDefineProperty.f;








	var fastKey = internalMetadata.fastKey;


	var setInternalState$2 = internalState.set;
	var internalStateGetterFor = internalState.getterFor;

	var collectionStrong = {
	  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, CONSTRUCTOR_NAME);
	      setInternalState$2(that, {
	        type: CONSTRUCTOR_NAME,
	        index: objectCreate(null),
	        first: undefined,
	        last: undefined,
	        size: 0
	      });
	      if (!descriptors) that.size = 0;
	      if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
	    });

	    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

	    var define = function (that, key, value) {
	      var state = getInternalState(that);
	      var entry = getEntry(that, key);
	      var previous, index;
	      // change existing entry
	      if (entry) {
	        entry.value = value;
	      // create new entry
	      } else {
	        state.last = entry = {
	          index: index = fastKey(key, true),
	          key: key,
	          value: value,
	          previous: previous = state.last,
	          next: undefined,
	          removed: false
	        };
	        if (!state.first) state.first = entry;
	        if (previous) previous.next = entry;
	        if (descriptors) state.size++;
	        else that.size++;
	        // add to index
	        if (index !== 'F') state.index[index] = entry;
	      } return that;
	    };

	    var getEntry = function (that, key) {
	      var state = getInternalState(that);
	      // fast case
	      var index = fastKey(key);
	      var entry;
	      if (index !== 'F') return state.index[index];
	      // frozen object case
	      for (entry = state.first; entry; entry = entry.next) {
	        if (entry.key == key) return entry;
	      }
	    };

	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        var that = this;
	        var state = getInternalState(that);
	        var data = state.index;
	        var entry = state.first;
	        while (entry) {
	          entry.removed = true;
	          if (entry.previous) entry.previous = entry.previous.next = undefined;
	          delete data[entry.index];
	          entry = entry.next;
	        }
	        state.first = state.last = undefined;
	        if (descriptors) state.size = 0;
	        else that.size = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function (key) {
	        var that = this;
	        var state = getInternalState(that);
	        var entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.next;
	          var prev = entry.previous;
	          delete state.index[entry.index];
	          entry.removed = true;
	          if (prev) prev.next = next;
	          if (next) next.previous = prev;
	          if (state.first == entry) state.first = next;
	          if (state.last == entry) state.last = prev;
	          if (descriptors) state.size--;
	          else that.size--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        var state = getInternalState(this);
	        var boundFunction = bindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;
	        while (entry = entry ? entry.next : state.first) {
	          boundFunction(entry.value, entry.key, this);
	          // revert to the last existing entry
	          while (entry && entry.removed) entry = entry.previous;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(this, key);
	      }
	    });

	    redefineAll(C.prototype, IS_MAP ? {
	      // 23.1.3.6 Map.prototype.get(key)
	      get: function get(key) {
	        var entry = getEntry(this, key);
	        return entry && entry.value;
	      },
	      // 23.1.3.9 Map.prototype.set(key, value)
	      set: function set(key, value) {
	        return define(this, key === 0 ? 0 : key, value);
	      }
	    } : {
	      // 23.2.3.1 Set.prototype.add(value)
	      add: function add(value) {
	        return define(this, value = value === 0 ? 0 : value, value);
	      }
	    });
	    if (descriptors) defineProperty$4(C.prototype, 'size', {
	      get: function () {
	        return getInternalState(this).size;
	      }
	    });
	    return C;
	  },
	  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
	    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
	    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
	    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
	      setInternalState$2(this, {
	        type: ITERATOR_NAME,
	        target: iterated,
	        state: getInternalCollectionState(iterated),
	        kind: kind,
	        last: undefined
	      });
	    }, function () {
	      var state = getInternalIteratorState(this);
	      var kind = state.kind;
	      var entry = state.last;
	      // revert to the last existing entry
	      while (entry && entry.removed) entry = entry.previous;
	      // get next entry
	      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
	        // or finish the iteration
	        state.target = undefined;
	        return { value: undefined, done: true };
	      }
	      // return step by kind
	      if (kind == 'keys') return { value: entry.key, done: false };
	      if (kind == 'values') return { value: entry.value, done: false };
	      return { value: [entry.key, entry.value], done: false };
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(CONSTRUCTOR_NAME);
	  }
	};

	// `Set` constructor
	// https://tc39.github.io/ecma262/#sec-set-objects
	var es_set = collection('Set', function (get) {
	  return function Set() { return get(this, arguments.length ? arguments[0] : undefined); };
	}, collectionStrong);

	var MATCH = wellKnownSymbol('match');

	// `IsRegExp` abstract operation
	// https://tc39.github.io/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	var notARegexp = function (it) {
	  if (isRegexp(it)) {
	    throw TypeError("The method doesn't accept regular expressions");
	  } return it;
	};

	var MATCH$1 = wellKnownSymbol('match');

	var correctIsRegexpLogic = function (METHOD_NAME) {
	  var regexp = /./;
	  try {
	    '/./'[METHOD_NAME](regexp);
	  } catch (e) {
	    try {
	      regexp[MATCH$1] = false;
	      return '/./'[METHOD_NAME](regexp);
	    } catch (f) { /* empty */ }
	  } return false;
	};

	// `String.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.includes
	_export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('includes') }, {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~String(requireObjectCoercible(this))
	      .indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// `String.prototype.{ codePointAt, at }` methods implementation
	var createMethod$4 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible($this));
	    var position = toInteger(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING ? S.charAt(position) : first
	        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$4(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$4(true)
	};

	var charAt = stringMultibyte.charAt;



	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$3 = internalState.set;
	var getInternalState$2 = internalState.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState$3(this, {
	    type: STRING_ITERATOR,
	    string: String(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$2(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return { value: undefined, done: true };
	  point = charAt(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
	});

	var SPECIES$4 = wellKnownSymbol('species');

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});

	// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	// Weex JS has frozen built-in prototypes, so use try / catch wrapper
	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});

	var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
	  var SYMBOL = wellKnownSymbol(KEY);

	  var DELEGATES_TO_SYMBOL = !fails(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;
	    re.exec = function () { execCalled = true; return null; };

	    if (KEY === 'split') {
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES$4] = function () { return re; };
	    }

	    re[SYMBOL]('');
	    return !execCalled;
	  });

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
	    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      if (regexp.exec === regexpExec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	        }
	        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	      }
	      return { done: false };
	    });
	    var stringMethod = methods[0];
	    var regexMethod = methods[1];

	    redefine(String.prototype, KEY, stringMethod);
	    redefine(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return regexMethod.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return regexMethod.call(string, this); }
	    );
	    if (sham) hide(RegExp.prototype[SYMBOL], 'sham', true);
	  }
	};

	var charAt$1 = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex
	var advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? charAt$1(S, index).length : 1);
	};

	// `RegExpExec` abstract operation
	// https://tc39.github.io/ecma262/#sec-regexpexec
	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }

	  if (classofRaw(R) !== 'RegExp') {
	    throw TypeError('RegExp#exec called on incompatible receiver');
	  }

	  return regexpExec.call(R, S);
	};

	var max$2 = Math.max;
	var min$2 = Math.min;
	var floor$1 = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// @@replace logic
	fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative) {
	  return [
	    // `String.prototype.replace` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = requireObjectCoercible(this);
	      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
	      return replacer !== undefined
	        ? replacer.call(searchValue, O, replaceValue)
	        : nativeReplace.call(String(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
	    function (regexp, replaceValue) {
	      var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
	      if (res.done) return res.value;

	      var rx = anObject(regexp);
	      var S = String(this);

	      var functionalReplace = typeof replaceValue === 'function';
	      if (!functionalReplace) replaceValue = String(replaceValue);

	      var global = rx.global;
	      if (global) {
	        var fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }
	      var results = [];
	      while (true) {
	        var result = regexpExecAbstract(rx, S);
	        if (result === null) break;

	        results.push(result);
	        if (!global) break;

	        var matchStr = String(result[0]);
	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	      }

	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];

	        var matched = String(result[0]);
	        var position = max$2(min$2(toInteger(result.index), S.length), 0);
	        var captures = [];
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = [matched].concat(captures, position, S);
	          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
	          var replacement = String(replaceValue.apply(undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }
	      return accumulatedResult + S.slice(nextSourcePosition);
	    }
	  ];

	  // https://tc39.github.io/ecma262/#sec-getsubstitution
	  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	    var tailPos = position + matched.length;
	    var m = captures.length;
	    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	    if (namedCaptures !== undefined) {
	      namedCaptures = toObject(namedCaptures);
	      symbols = SUBSTITUTION_SYMBOLS;
	    }
	    return nativeReplace.call(replacement, symbols, function (match, ch) {
	      var capture;
	      switch (ch.charAt(0)) {
	        case '$': return '$';
	        case '&': return matched;
	        case '`': return str.slice(0, position);
	        case "'": return str.slice(tailPos);
	        case '<':
	          capture = namedCaptures[ch.slice(1, -1)];
	          break;
	        default: // \d\d?
	          var n = +ch;
	          if (n === 0) return match;
	          if (n > m) {
	            var f = floor$1(n / 10);
	            if (f === 0) return match;
	            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	            return match;
	          }
	          capture = captures[n - 1];
	      }
	      return capture === undefined ? '' : capture;
	    });
	  }
	});

	// https://github.com/tc39/collection-methods
	var collectionAddAll = function (/* ...elements */) {
	  var set = anObject(this);
	  var adder = aFunction$1(set.add);
	  for (var k = 0, len = arguments.length; k < len; k++) {
	    adder.call(set, arguments[k]);
	  }
	  return set;
	};

	// `Set.prototype.addAll` method
	// https://github.com/tc39/proposal-collection-methods
	_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
	  addAll: function addAll(/* ...elements */) {
	    return collectionAddAll.apply(this, arguments);
	  }
	});

	// https://github.com/tc39/collection-methods
	var collectionDeleteAll = function (/* ...elements */) {
	  var collection = anObject(this);
	  var remover = aFunction$1(collection['delete']);
	  var allDeleted = true;
	  for (var k = 0, len = arguments.length; k < len; k++) {
	    allDeleted = allDeleted && remover.call(collection, arguments[k]);
	  }
	  return !!allDeleted;
	};

	// `Set.prototype.deleteAll` method
	// https://github.com/tc39/proposal-collection-methods
	_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
	  deleteAll: function deleteAll(/* ...elements */) {
	    return collectionDeleteAll.apply(this, arguments);
	  }
	});

	var SPECIES$5 = wellKnownSymbol('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.github.io/ecma262/#sec-speciesconstructor
	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES$5]) == undefined ? defaultConstructor : aFunction$1(S);
	};

	// `Set.prototype.difference` method
	// https://github.com/tc39/proposal-set-methods
	_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
	  difference: function difference(iterable) {
	    var set = anObject(this);
	    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))(set);
	    var remover = aFunction$1(newSet['delete']);
	    iterate_1(iterable, function (value) {
	      remover.call(newSet, value);
	    });
	    return newSet;
	  }
	});

	var getIterator = function (it) {
	  var iteratorMethod = getIteratorMethod(it);
	  if (typeof iteratorMethod != 'function') {
	    throw TypeError(String(it) + ' is not iterable');
	  } return anObject(iteratorMethod.call(it));
	};

	var getSetIterator = function (it) {
	  // eslint-disable-next-line no-undef
	  return Set.prototype.values.call(it);
	};

	// `Set.prototype.every` method
	// https://github.com/tc39/proposal-collection-methods
	_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
	  every: function every(callbackfn /* , thisArg */) {
	    var set = anObject(this);
	    var iterator = getSetIterator(set);
	    var boundFunction = bindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	    return !iterate_1(iterator, function (value) {
	      if (!boundFunction(value, value, set)) return iterate_1.stop();
	    }, undefined, false, true).stopped;
	  }
	});

	// `Set.prototype.filter` method
	// https://github.com/tc39/proposal-collection-methods
	_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    var set = anObject(this);
	    var iterator = getSetIterator(set);
	    var boundFunction = bindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))();
	    var adder = aFunction$1(newSet.add);
	    iterate_1(iterator, function (value) {
	      if (boundFunction(value, value, set)) adder.call(newSet, value);
	    }, undefined, false, true);
	    return newSet;
	  }
	});

	// `Set.prototype.find` method
	// https://github.com/tc39/proposal-collection-methods
	_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
	  find: function find(callbackfn /* , thisArg */) {
	    var set = anObject(this);
	    var iterator = getSetIterator(set);
	    var boundFunction = bindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	    return iterate_1(iterator, function (value) {
	      if (boundFunction(value, value, set)) return iterate_1.stop(value);
	    }, undefined, false, true).result;
	  }
	});

	// `Set.prototype.intersection` method
	// https://github.com/tc39/proposal-set-methods
	_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
	  intersection: function intersection(iterable) {
	    var set = anObject(this);
	    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))();
	    var hasCheck = aFunction$1(set.has);
	    var adder = aFunction$1(newSet.add);
	    iterate_1(iterable, function (value) {
	      if (hasCheck.call(set, value)) adder.call(newSet, value);
	    });
	    return newSet;
	  }
	});

	// `Set.prototype.isDisjointFrom` method
	// https://tc39.github.io/proposal-set-methods/#Set.prototype.isDisjointFrom
	_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
	  isDisjointFrom: function isDisjointFrom(iterable) {
	    var set = anObject(this);
	    var hasCheck = aFunction$1(set.has);
	    return !iterate_1(iterable, function (value) {
	      if (hasCheck.call(set, value) === true) return iterate_1.stop();
	    }).stopped;
	  }
	});

	// `Set.prototype.isSubsetOf` method
	// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSubsetOf
	_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
	  isSubsetOf: function isSubsetOf(iterable) {
	    var iterator = getIterator(this);
	    var otherSet = anObject(iterable);
	    var hasCheck = otherSet.has;
	    if (typeof hasCheck != 'function') {
	      otherSet = new (getBuiltIn('Set'))(iterable);
	      hasCheck = aFunction$1(otherSet.has);
	    }
	    return !iterate_1(iterator, function (value) {
	      if (hasCheck.call(otherSet, value) === false) return iterate_1.stop();
	    }, undefined, false, true).stopped;
	  }
	});

	// `Set.prototype.isSupersetOf` method
	// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSupersetOf
	_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
	  isSupersetOf: function isSupersetOf(iterable) {
	    var set = anObject(this);
	    var hasCheck = aFunction$1(set.has);
	    return !iterate_1(iterable, function (value) {
	      if (hasCheck.call(set, value) === false) return iterate_1.stop();
	    }).stopped;
	  }
	});

	// `Set.prototype.join` method
	// https://github.com/tc39/proposal-collection-methods
	_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
	  join: function join(separator) {
	    var set = anObject(this);
	    var iterator = getSetIterator(set);
	    var sep = separator === undefined ? ',' : String(separator);
	    var result = [];
	    iterate_1(iterator, result.push, result, false, true);
	    return result.join(sep);
	  }
	});

	// `Set.prototype.map` method
	// https://github.com/tc39/proposal-collection-methods
	_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
	  map: function map(callbackfn /* , thisArg */) {
	    var set = anObject(this);
	    var iterator = getSetIterator(set);
	    var boundFunction = bindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))();
	    var adder = aFunction$1(newSet.add);
	    iterate_1(iterator, function (value) {
	      adder.call(newSet, boundFunction(value, value, set));
	    }, undefined, false, true);
	    return newSet;
	  }
	});

	// `Set.prototype.reduce` method
	// https://github.com/tc39/proposal-collection-methods
	_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    var set = anObject(this);
	    var iterator = getSetIterator(set);
	    var accumulator, step;
	    aFunction$1(callbackfn);
	    if (arguments.length > 1) accumulator = arguments[1];
	    else {
	      step = iterator.next();
	      if (step.done) throw TypeError('Reduce of empty set with no initial value');
	      accumulator = step.value;
	    }
	    iterate_1(iterator, function (value) {
	      accumulator = callbackfn(accumulator, value, value, set);
	    }, undefined, false, true);
	    return accumulator;
	  }
	});

	// `Set.prototype.some` method
	// https://github.com/tc39/proposal-collection-methods
	_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
	  some: function some(callbackfn /* , thisArg */) {
	    var set = anObject(this);
	    var iterator = getSetIterator(set);
	    var boundFunction = bindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	    return iterate_1(iterator, function (value) {
	      if (boundFunction(value, value, set)) return iterate_1.stop();
	    }, undefined, false, true).stopped;
	  }
	});

	// `Set.prototype.symmetricDifference` method
	// https://github.com/tc39/proposal-set-methods
	_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
	  symmetricDifference: function symmetricDifference(iterable) {
	    var set = anObject(this);
	    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))(set);
	    var remover = aFunction$1(newSet['delete']);
	    var adder = aFunction$1(newSet.add);
	    iterate_1(iterable, function (value) {
	      remover.call(newSet, value) || adder.call(newSet, value);
	    });
	    return newSet;
	  }
	});

	// `Set.prototype.union` method
	// https://github.com/tc39/proposal-set-methods
	_export({ target: 'Set', proto: true, real: true, forced: isPure }, {
	  union: function union(iterable) {
	    var set = anObject(this);
	    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))(set);
	    iterate_1(iterable, aFunction$1(newSet.add), newSet);
	    return newSet;
	  }
	});

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global_1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
	    hide(CollectionPrototype, 'forEach', arrayForEach);
	  } catch (error) {
	    CollectionPrototype.forEach = arrayForEach;
	  }
	}

	var ITERATOR$5 = wellKnownSymbol('iterator');
	var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
	var ArrayValues = es_array_iterator.values;

	for (var COLLECTION_NAME$1 in domIterables) {
	  var Collection$1 = global_1[COLLECTION_NAME$1];
	  var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
	  if (CollectionPrototype$1) {
	    // some Chrome versions have non-configurable methods on DOMTokenList
	    if (CollectionPrototype$1[ITERATOR$5] !== ArrayValues) try {
	      hide(CollectionPrototype$1, ITERATOR$5, ArrayValues);
	    } catch (error) {
	      CollectionPrototype$1[ITERATOR$5] = ArrayValues;
	    }
	    if (!CollectionPrototype$1[TO_STRING_TAG$3]) hide(CollectionPrototype$1, TO_STRING_TAG$3, COLLECTION_NAME$1);
	    if (domIterables[COLLECTION_NAME$1]) for (var METHOD_NAME in es_array_iterator) {
	      // some Chrome versions have non-configurable methods on DOMTokenList
	      if (CollectionPrototype$1[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
	        hide(CollectionPrototype$1, METHOD_NAME, es_array_iterator[METHOD_NAME]);
	      } catch (error) {
	        CollectionPrototype$1[METHOD_NAME] = es_array_iterator[METHOD_NAME];
	      }
	    }
	  }
	}

	// `URL.prototype.toJSON` method
	// https://url.spec.whatwg.org/#dom-url-tojson
	_export({ target: 'URL', proto: true, enumerable: true }, {
	  toJSON: function toJSON() {
	    return URL.prototype.toString.call(this);
	  }
	});

	function _typeof(obj) {
	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function (obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function (obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	function ownKeys$1(object, enumerableOnly) {
	  var keys = Object.keys(object);

	  if (Object.getOwnPropertySymbols) {
	    var symbols = Object.getOwnPropertySymbols(object);
	    if (enumerableOnly) symbols = symbols.filter(function (sym) {
	      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
	    });
	    keys.push.apply(keys, symbols);
	  }

	  return keys;
	}

	function _objectSpread2(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};

	    if (i % 2) {
	      ownKeys$1(source, true).forEach(function (key) {
	        _defineProperty(target, key, source[key]);
	      });
	    } else if (Object.getOwnPropertyDescriptors) {
	      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
	    } else {
	      ownKeys$1(source).forEach(function (key) {
	        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
	      });
	    }
	  }

	  return target;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function isNativeReflectConstruct() {
	  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	  if (Reflect.construct.sham) return false;
	  if (typeof Proxy === "function") return true;

	  try {
	    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	function _construct(Parent, args, Class) {
	  if (isNativeReflectConstruct()) {
	    _construct = Reflect.construct;
	  } else {
	    _construct = function _construct(Parent, args, Class) {
	      var a = [null];
	      a.push.apply(a, args);
	      var Constructor = Function.bind.apply(Parent, a);
	      var instance = new Constructor();
	      if (Class) _setPrototypeOf(instance, Class.prototype);
	      return instance;
	    };
	  }

	  return _construct.apply(null, arguments);
	}

	function _isNativeFunction(fn) {
	  return Function.toString.call(fn).indexOf("[native code]") !== -1;
	}

	function _wrapNativeSuper(Class) {
	  var _cache = typeof Map === "function" ? new Map() : undefined;

	  _wrapNativeSuper = function _wrapNativeSuper(Class) {
	    if (Class === null || !_isNativeFunction(Class)) return Class;

	    if (typeof Class !== "function") {
	      throw new TypeError("Super expression must either be null or a function");
	    }

	    if (typeof _cache !== "undefined") {
	      if (_cache.has(Class)) return _cache.get(Class);

	      _cache.set(Class, Wrapper);
	    }

	    function Wrapper() {
	      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
	    }

	    Wrapper.prototype = Object.create(Class.prototype, {
	      constructor: {
	        value: Wrapper,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	    return _setPrototypeOf(Wrapper, Class);
	  };

	  return _wrapNativeSuper(Class);
	}

	function _objectWithoutPropertiesLoose(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;

	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }

	  return target;
	}

	function _objectWithoutProperties(source, excluded) {
	  if (source == null) return {};

	  var target = _objectWithoutPropertiesLoose(source, excluded);

	  var key, i;

	  if (Object.getOwnPropertySymbols) {
	    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

	    for (i = 0; i < sourceSymbolKeys.length; i++) {
	      key = sourceSymbolKeys[i];
	      if (excluded.indexOf(key) >= 0) continue;
	      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
	      target[key] = source[key];
	    }
	  }

	  return target;
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (typeof call === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
	}

	function _toConsumableArray(arr) {
	  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
	}

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  }
	}

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	function _iterableToArray(iter) {
	  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
	}

	function _iterableToArrayLimit(arr, i) {
	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance");
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance");
	}

	var runtime_1 = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var runtime = (function (exports) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  exports.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] =
	    GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  exports.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  exports.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  exports.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration.
	          result.value = unwrapped;
	          resolve(result);
	        }, function(error) {
	          // If a rejected Promise was yielded, throw the rejection back
	          // into the async generator function so it can be handled there.
	          return invoke("throw", error, resolve, reject);
	        });
	      }
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };
	  exports.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  exports.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return exports.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        // Note: ["return"] must be used for ES3 parsing compatibility.
	        if (delegate.iterator["return"]) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[toStringTagSymbol] = "Generator";

	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  exports.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  exports.values = values;

	  function doneResult() {
	    return { value: undefined, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined;
	        }

	        return !! caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined;
	      }

	      return ContinueSentinel;
	    }
	  };

	  // Regardless of whether this script is executing as a CommonJS module
	  // or not, return the runtime object so that we can declare the variable
	  // regeneratorRuntime in the outer scope, which allows this module to be
	  // injected easily by `bin/regenerator --include-runtime script.js`.
	  return exports;

	}(
	  // If this script is executing as a CommonJS module, use module.exports
	  // as the regeneratorRuntime namespace. Otherwise create a new empty
	  // object. Either way, the resulting object will be used to initialize
	  // the regeneratorRuntime variable at the top of this file.
	  module.exports
	));

	try {
	  regeneratorRuntime = runtime;
	} catch (accidentalStrictMode) {
	  // This module should not be running in strict mode, so the above
	  // assignment should always work unless something is misconfigured. Just
	  // in case runtime.js accidentally runs in strict mode, we can escape
	  // strict mode using a global Function call. This could conceivably fail
	  // if a Content Security Policy forbids using Function, but in that case
	  // the proper solution is to fix the accidental strict mode problem. If
	  // you've misconfigured your bundler to force strict mode and applied a
	  // CSP to forbid Function, and you're not willing to fix either of those
	  // problems, please detail your unique predicament in a GitHub issue.
	  Function("r", "regeneratorRuntime = r")(runtime);
	}
	});

	// a string of all valid unicode whitespaces
	// eslint-disable-next-line max-len
	var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var whitespace = '[' + whitespaces + ']';
	var ltrim = RegExp('^' + whitespace + whitespace + '*');
	var rtrim = RegExp(whitespace + whitespace + '*$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod$5 = function (TYPE) {
	  return function ($this) {
	    var string = String(requireObjectCoercible($this));
	    if (TYPE & 1) string = string.replace(ltrim, '');
	    if (TYPE & 2) string = string.replace(rtrim, '');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$5(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
	  end: createMethod$5(2),
	  // `String.prototype.trim` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
	  trim: createMethod$5(3)
	};

	var trim = stringTrim.trim;


	var nativeParseFloat = global_1.parseFloat;
	var FORCED$3 = 1 / nativeParseFloat(whitespaces + '-0') !== -Infinity;

	// `parseFloat` method
	// https://tc39.github.io/ecma262/#sec-parsefloat-string
	var _parseFloat = FORCED$3 ? function parseFloat(string) {
	  var trimmedString = trim(String(string));
	  var result = nativeParseFloat(trimmedString);
	  return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
	} : nativeParseFloat;

	// `parseFloat` method
	// https://tc39.github.io/ecma262/#sec-parsefloat-string
	_export({ global: true, forced: parseFloat != _parseFloat }, {
	  parseFloat: _parseFloat
	});

	var arrayPush = [].push;
	var min$3 = Math.min;
	var MAX_UINT32 = 0xFFFFFFFF;

	// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
	var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

	// @@split logic
	fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
	  var internalSplit;
	  if (
	    'abbc'.split(/(b)*/)[1] == 'c' ||
	    'test'.split(/(?:)/, -1).length != 4 ||
	    'ab'.split(/(?:ab)*/).length != 2 ||
	    '.'.split(/(.?)(.?)/).length != 4 ||
	    '.'.split(/()()/).length > 1 ||
	    ''.split(/.?/).length
	  ) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = String(requireObjectCoercible(this));
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (separator === undefined) return [string];
	      // If `separator` is not a regex, use native split
	      if (!isRegexp(separator)) {
	        return nativeSplit.call(string, separator, lim);
	      }
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;
	      while (match = regexpExec.call(separatorCopy, string)) {
	        lastIndex = separatorCopy.lastIndex;
	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
	          lastLength = match[0].length;
	          lastLastIndex = lastIndex;
	          if (output.length >= lim) break;
	        }
	        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string.length) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output.length > lim ? output.slice(0, lim) : output;
	    };
	  // Chakra, V8
	  } else if ('0'.split(undefined, 0).length) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
	    };
	  } else internalSplit = nativeSplit;

	  return [
	    // `String.prototype.split` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = requireObjectCoercible(this);
	      var splitter = separator == undefined ? undefined : separator[SPLIT];
	      return splitter !== undefined
	        ? splitter.call(separator, O, limit)
	        : internalSplit.call(String(O), separator, limit);
	    },
	    // `RegExp.prototype[@@split]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
	    //
	    // NOTE: This cannot be properly polyfilled in engines that don't support
	    // the 'y' flag.
	    function (regexp, limit) {
	      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
	      if (res.done) return res.value;

	      var rx = anObject(regexp);
	      var S = String(this);
	      var C = speciesConstructor(rx, RegExp);

	      var unicodeMatching = rx.unicode;
	      var flags = (rx.ignoreCase ? 'i' : '') +
	                  (rx.multiline ? 'm' : '') +
	                  (rx.unicode ? 'u' : '') +
	                  (SUPPORTS_Y ? 'y' : 'g');

	      // ^(? + rx + ) is needed, in combination with some S slicing, to
	      // simulate the 'y' flag.
	      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = SUPPORTS_Y ? q : 0;
	        var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
	        var e;
	        if (
	          z === null ||
	          (e = min$3(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
	        ) {
	          q = advanceStringIndex(S, q, unicodeMatching);
	        } else {
	          A.push(S.slice(p, q));
	          if (A.length === lim) return A;
	          for (var i = 1; i <= z.length - 1; i++) {
	            A.push(z[i]);
	            if (A.length === lim) return A;
	          }
	          q = p = e;
	        }
	      }
	      A.push(S.slice(p));
	      return A;
	    }
	  ];
	}, !SUPPORTS_Y);

	var _marked =
	/*#__PURE__*/
	regeneratorRuntime.mark(makeGenerator),
	    _marked2 =
	/*#__PURE__*/
	regeneratorRuntime.mark(createIterGenerator);
	function isNumber(x) {
	  return !isNaN(parseFloat(x)) && isFinite(x);
	}
	function arrayEqual(a, b) {
	  var byOrder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	  return byOrder ? Object.keys(a).map(function (x) {
	    return a[x] === b[x];
	  }).reduce(function (p, n) {
	    return p ? n : p;
	  }, true) : _toConsumableArray(new Set(a.filter(function (x) {
	    return !new Set(b).has(x);
	  }))).length === 0;
	}
	function transpose(table) {
	  var tableSize = table.map(function (row) {
	    return row.length;
	  }).reduce(function (p, n) {
	    return Math.max(p, n);
	  }, 0);
	  return _toConsumableArray(Array(tableSize).keys()).map(function (index) {
	    return table.map(function (row) {
	      return row[index];
	    });
	  });
	}
	function makeGenerator(x) {
	  return regeneratorRuntime.wrap(function makeGenerator$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:
	          return _context.delegateYield(x, "t0", 1);

	        case 1:
	        case "end":
	          return _context.stop();
	      }
	    }
	  }, _marked);
	}

	function createIterGenerator(data, func) {
	  var abort,
	      i,
	      _iteratorNormalCompletion,
	      _didIteratorError,
	      _iteratorError,
	      _iterator,
	      _step,
	      iteration,
	      modifiedRow,
	      _args2 = arguments;

	  return regeneratorRuntime.wrap(function createIterGenerator$(_context2) {
	    while (1) {
	      switch (_context2.prev = _context2.next) {
	        case 0:
	          abort = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : function () {
	            return false;
	          };
	          i = 0;
	          _iteratorNormalCompletion = true;
	          _didIteratorError = false;
	          _iteratorError = undefined;
	          _context2.prev = 5;
	          _iterator = data[Symbol.iterator]();

	        case 7:
	          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
	            _context2.next = 18;
	            break;
	          }

	          iteration = _step.value;

	          if (!abort()) {
	            _context2.next = 11;
	            break;
	          }

	          return _context2.abrupt("return");

	        case 11:
	          modifiedRow = func(iteration, i++);

	          if (!modifiedRow) {
	            _context2.next = 15;
	            break;
	          }

	          _context2.next = 15;
	          return modifiedRow;

	        case 15:
	          _iteratorNormalCompletion = true;
	          _context2.next = 7;
	          break;

	        case 18:
	          _context2.next = 24;
	          break;

	        case 20:
	          _context2.prev = 20;
	          _context2.t0 = _context2["catch"](5);
	          _didIteratorError = true;
	          _iteratorError = _context2.t0;

	        case 24:
	          _context2.prev = 24;
	          _context2.prev = 25;

	          if (!_iteratorNormalCompletion && _iterator.return != null) {
	            _iterator.return();
	          }

	        case 27:
	          _context2.prev = 27;

	          if (!_didIteratorError) {
	            _context2.next = 30;
	            break;
	          }

	          throw _iteratorError;

	        case 30:
	          return _context2.finish(27);

	        case 31:
	          return _context2.finish(24);

	        case 32:
	        case "end":
	          return _context2.stop();
	      }
	    }
	  }, _marked2, null, [[5, 20, 24, 32], [25,, 27, 31]]);
	}

	function iter(data, func) {
	  var abort = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
	    return false;
	  };
	  return Array.from(createIterGenerator(data, func, abort));
	}
	function chain(data) {
	  for (var _len = arguments.length, operations = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    operations[_key - 1] = arguments[_key];
	  }

	  return Array.from(iter(data, operations.reduce(function (p, n) {
	    return function (x, i) {
	      var prev = p(x, i);
	      var next = prev ? n(prev, i) : false;
	      return next === true ? prev : next;
	    };
	  }, function (x) {
	    return x;
	  })));
	}
	function xSplit(stringToSplit) {
	  for (var _len2 = arguments.length, patterns = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    patterns[_key2 - 1] = arguments[_key2];
	  }

	  return patterns.reduce(function (prev, next) {
	    return prev.map(function (str) {
	      return str.split(next);
	    }).reduce(function (p, n) {
	      return [].concat(_toConsumableArray(p), _toConsumableArray(n));
	    }, []);
	  }, [stringToSplit]);
	}
	function xReplace(stringToReplace) {
	  for (var _len3 = arguments.length, patterns = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	    patterns[_key3 - 1] = arguments[_key3];
	  }

	  return patterns.reduce(function (prev, next) {
	    return prev.split(next[0]).join(next[1]);
	  }, stringToReplace);
	}
	function xContains(stringToFilter) {
	  for (var _len4 = arguments.length, patterns = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	    patterns[_key4 - 1] = arguments[_key4];
	  }

	  return patterns.filter(function (pattern) {
	    return stringToFilter.includes(pattern);
	  });
	}
	function hashCode(str) {
	  var hash = 0;
	  var char;
	  if (str.length === 0) return hash;

	  for (var i = 0; i < str.length; i++) {
	    char = str.charCodeAt(i);
	    hash = (hash << 5) - hash + char;
	    hash = hash & hash;
	  }

	  return hash;
	}

	var FileNotFoundError =
	/*#__PURE__*/
	function (_Error) {
	  _inherits(FileNotFoundError, _Error);

	  function FileNotFoundError(fileName) {
	    var _this;

	    _classCallCheck(this, FileNotFoundError);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(FileNotFoundError).call(this, Error));
	    _this.message = "".concat(fileName, " not found. You maybe use a wrong path or url. Be sure you use absolute path, relative one being not supported.");
	    _this.name = "FileNotFoundError";
	    return _this;
	  }

	  return FileNotFoundError;
	}(_wrapNativeSuper(Error));
	var MixedTypeError =
	/*#__PURE__*/
	function (_TypeError) {
	  _inherits(MixedTypeError, _TypeError);

	  function MixedTypeError() {
	    var _this2;

	    _classCallCheck(this, MixedTypeError);

	    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(MixedTypeError).call(this, TypeError));

	    for (var _len = arguments.length, types = new Array(_len), _key = 0; _key < _len; _key++) {
	      types[_key] = arguments[_key];
	    }

	    _this2.message = "can't work with multiple variable types: [".concat(types.join(","), "].");
	    _this2.name = "MixedTypeError";
	    return _this2;
	  }

	  return MixedTypeError;
	}(_wrapNativeSuper(TypeError));
	var NoSuchColumnError =
	/*#__PURE__*/
	function (_Error2) {
	  _inherits(NoSuchColumnError, _Error2);

	  function NoSuchColumnError(column, columns) {
	    var _this3;

	    _classCallCheck(this, NoSuchColumnError);

	    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(NoSuchColumnError).call(this, Error));
	    _this3.message = "".concat(column, " not found in [").concat(columns.join(", "), "].");
	    _this3.name = "NoSuchColumnError";
	    return _this3;
	  }

	  return NoSuchColumnError;
	}(_wrapNativeSuper(Error));
	var WrongSchemaError =
	/*#__PURE__*/
	function (_Error3) {
	  _inherits(WrongSchemaError, _Error3);

	  function WrongSchemaError(columns, expected) {
	    var _this4;

	    _classCallCheck(this, WrongSchemaError);

	    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(WrongSchemaError).call(this, Error));
	    _this4.message = "[".concat(columns.join(", "), "] while expecting [").concat(expected.join(", "), "].");
	    _this4.name = "WrongSchemaError";
	    return _this4;
	  }

	  return WrongSchemaError;
	}(_wrapNativeSuper(Error));
	var ArgumentTypeError =
	/*#__PURE__*/
	function (_TypeError2) {
	  _inherits(ArgumentTypeError, _TypeError2);

	  function ArgumentTypeError(input, expected) {
	    var _this5;

	    _classCallCheck(this, ArgumentTypeError);

	    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(ArgumentTypeError).call(this, TypeError));
	    _this5.message = "".concat(input && input.constructor ? input.constructor.name : _typeof(input), " while expecting ").concat(expected, ".");
	    _this5.name = "ArgumentTypeError";
	    return _this5;
	  }

	  return ArgumentTypeError;
	}(_wrapNativeSuper(TypeError));
	var SQLParseError =
	/*#__PURE__*/
	function (_Error4) {
	  _inherits(SQLParseError, _Error4);

	  function SQLParseError(message) {
	    var _this6;

	    _classCallCheck(this, SQLParseError);

	    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(SQLParseError).call(this, Error));
	    _this6.message = "".concat(message, ".");
	    _this6.name = "SQLParseError";
	    return _this6;
	  }

	  return SQLParseError;
	}(_wrapNativeSuper(Error));
	var TableAlreadyExistsError =
	/*#__PURE__*/
	function (_Error5) {
	  _inherits(TableAlreadyExistsError, _Error5);

	  function TableAlreadyExistsError(tableName) {
	    var _this7;

	    _classCallCheck(this, TableAlreadyExistsError);

	    _this7 = _possibleConstructorReturn(this, _getPrototypeOf(TableAlreadyExistsError).call(this, Error));
	    _this7.message = "The SQL temporary table ".concat(tableName, " already exits. Use overwrite = true to overwrite it.");
	    _this7.name = "TableAlreadyExistsError";
	    return _this7;
	  }

	  return TableAlreadyExistsError;
	}(_wrapNativeSuper(Error));
	var WrongTableNameError =
	/*#__PURE__*/
	function (_Error6) {
	  _inherits(WrongTableNameError, _Error6);

	  function WrongTableNameError(tableName) {
	    var _this8;

	    _classCallCheck(this, WrongTableNameError);

	    _this8 = _possibleConstructorReturn(this, _getPrototypeOf(WrongTableNameError).call(this, Error));
	    _this8.message = "The SQL temporary table ".concat(tableName, " is not allowed. Avoid to use Spaces, quotes, tabs....");
	    _this8.name = "WrongTableNameError";
	    return _this8;
	  }

	  return WrongTableNameError;
	}(_wrapNativeSuper(Error));

	var errors = /*#__PURE__*/Object.freeze({
		FileNotFoundError: FileNotFoundError,
		MixedTypeError: MixedTypeError,
		NoSuchColumnError: NoSuchColumnError,
		WrongSchemaError: WrongSchemaError,
		ArgumentTypeError: ArgumentTypeError,
		SQLParseError: SQLParseError,
		TableAlreadyExistsError: TableAlreadyExistsError,
		WrongTableNameError: WrongTableNameError
	});

	var onFreeze = internalMetadata.onFreeze;

	var nativeFreeze = Object.freeze;
	var FAILS_ON_PRIMITIVES$1 = fails(function () { nativeFreeze(1); });

	// `Object.freeze` method
	// https://tc39.github.io/ecma262/#sec-object.freeze
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1, sham: !freezing }, {
	  freeze: function freeze(it) {
	    return nativeFreeze && isObject(it) ? nativeFreeze(onFreeze(it)) : it;
	  }
	});

	var FAILS_ON_PRIMITIVES$2 = fails(function () { objectGetPrototypeOf(1); });

	// `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$2, sham: !correctPrototypeGetter }, {
	  getPrototypeOf: function getPrototypeOf(it) {
	    return objectGetPrototypeOf(toObject(it));
	  }
	});

	var __columns__ = Symbol("columns");

	var __values__ = Symbol("values");
	/**
	 * Row data structure used into the dataframe-js.
	 */


	var Row =
	/*#__PURE__*/
	function () {
	  /**
	   * Create a new Row.
	   * @param {Array | Object | Row} data The data of the Row.
	   * @param {Array} columns The DataFrame column names.
	   * @example
	   * new Row({
	   *      'column1': 3,
	   *      'column2': 6,
	   * })
	   *
	   * new Row([3, 6], ['column1', 'column2'])
	   *
	   * new Row(Row, ['column1', 'column3'])
	   */
	  function Row(data, columns) {
	    _classCallCheck(this, Row);

	    if (!data) throw new ArgumentTypeError(data, "Row | Array | Object");
	    this[__columns__] = columns ? columns : Object.keys(data);
	    this[__values__] = Object.freeze(this._build(data));
	  }

	  _createClass(Row, [{
	    key: Symbol.iterator,
	    value:
	    /*#__PURE__*/
	    regeneratorRuntime.mark(function value() {
	      var _i, _Object$values, value;

	      return regeneratorRuntime.wrap(function value$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              _i = 0, _Object$values = Object.values(this[__values__]);

	            case 1:
	              if (!(_i < _Object$values.length)) {
	                _context.next = 8;
	                break;
	              }

	              value = _Object$values[_i];
	              _context.next = 5;
	              return value;

	            case 5:
	              _i++;
	              _context.next = 1;
	              break;

	            case 8:
	            case "end":
	              return _context.stop();
	          }
	        }
	      }, value, this);
	    })
	  }, {
	    key: "__newInstance__",
	    value: function __newInstance__(data, columns) {
	      var _Object$assign;

	      if (!arrayEqual(this[__columns__], columns)) {
	        return new Row(data, columns);
	      }

	      return Object.assign(Object.create(Object.getPrototypeOf(this)), this, (_Object$assign = {}, _defineProperty(_Object$assign, __values__, data), _defineProperty(_Object$assign, __columns__, _toConsumableArray(columns)), _Object$assign));
	    }
	  }, {
	    key: "_build",
	    value: function _build(data) {
	      if (data instanceof Array) return this._fromArray(data);
	      if (data instanceof Row) return this._fromObject(data[__values__]);
	      if (data instanceof Object && data !== null) return this._fromObject(data);
	      throw new ArgumentTypeError(data, "Row | Array | Object");
	    }
	  }, {
	    key: "_fromObject",
	    value: function _fromObject(object) {
	      return Object.assign.apply(Object, [{}].concat(_toConsumableArray(this[__columns__].map(function (column) {
	        return _defineProperty({}, column, object[column]);
	      }))));
	    }
	  }, {
	    key: "_fromArray",
	    value: function _fromArray(array) {
	      return Object.assign.apply(Object, [{}].concat(_toConsumableArray(Object.entries(this[__columns__]).map(function (column) {
	        return _defineProperty({}, column[1], array[column[0]]);
	      }))));
	    }
	    /**
	     * Convert Row into dict / hash / object.
	     * @returns {Object} The Row converted into dict.
	     * @example
	     * row.toDict()
	     */

	  }, {
	    key: "toDict",
	    value: function toDict() {
	      return Object.assign({}, this[__values__]);
	    }
	    /**
	     * Convert Row into Array, loosing column names.
	     * @returns {Array} The Row values converted into Array.
	     * @example
	     * row.toArray()
	     */

	  }, {
	    key: "toArray",
	    value: function toArray() {
	      return _toConsumableArray(this);
	    }
	    /**
	     * Get the Row size.
	     * @returns {Int} The Row length.
	     * @example
	     * row.size()
	     */

	  }, {
	    key: "size",
	    value: function size() {
	      return this[__columns__].length;
	    }
	    /**
	     * Get the Row hash code.
	     * @returns {Int} The Row hash unique code.
	     * @example
	     * row.hash()
	     */

	  }, {
	    key: "hash",
	    value: function hash() {
	      return hashCode(JSON.stringify(this[__values__]));
	    }
	    /**
	     * Check if row contains a column.
	     * @param {String} columnName The column to check.
	     * @returns {Boolean} The presence or not of the column.
	     * @example
	     * row.has('column1')
	     */

	  }, {
	    key: "has",
	    value: function has(columnName) {
	      return this[__columns__].includes(columnName);
	    }
	    /**
	     * Select columns into the Row.
	     * @param {...String} columnNames The columns to select.
	     * @returns {Row} A new Row containing only the selected columns.
	     * @example
	     * row.select('column1', 'column2')
	     */

	  }, {
	    key: "select",
	    value: function select() {
	      var _this = this;

	      for (var _len = arguments.length, columnNames = new Array(_len), _key = 0; _key < _len; _key++) {
	        columnNames[_key] = arguments[_key];
	      }

	      return this.__newInstance__(Object.assign.apply(Object, [{}].concat(_toConsumableArray(columnNames.map(function (column) {
	        return _defineProperty({}, column, _this.get(column));
	      })))), columnNames);
	    }
	    /**
	     * Get a Row value by its column.
	     * @param {String} columnToGet The column value to get.
	     * @returns The selected value.
	     * @example
	     * row.get('column1')
	     */

	  }, {
	    key: "get",
	    value: function get(columnToGet) {
	      if (!this.has(columnToGet)) {
	        throw new NoSuchColumnError(columnToGet, this[__columns__]);
	      }

	      return this[__values__][columnToGet];
	    }
	    /**
	     * Set a Row value by its column, or create a new value if column doesn't exist.
	     * @param {String} columnToSet The column value to set.
	     * @returns {Row} A new Row with the modified / new value.
	     * @example
	     * row.set('column1', 6)
	     */

	  }, {
	    key: "set",
	    value: function set(columnToSet, value) {
	      var newRow = Object.assign({}, this[__values__], _defineProperty({}, columnToSet, value));
	      return this.__newInstance__(newRow, Object.keys(newRow));
	    }
	    /**
	     * Delete a Row value by its column.
	     * @param {String} columnToDel The column value to delete.
	     * @returns {Row} A new Row without the deleted value.
	     * @example
	     * row.delete('column1')
	     */

	  }, {
	    key: "delete",
	    value: function _delete(columnToDel) {
	      if (!this.has(columnToDel)) {
	        throw new NoSuchColumnError(columnToDel, this[__columns__]);
	      }

	      return this.select.apply(this, _toConsumableArray(this[__columns__].filter(function (column) {
	        return column !== columnToDel;
	      })));
	    }
	  }]);

	  return Row;
	}();

	var __columns__$1 = Symbol("columns");

	var __rows__ = Symbol("rows");

	var __groups__ = Symbol("groups");

	var __hashes__ = Symbol("hashes");

	/**
	 * Grouped DataFrame structure grouping DataFrame rows by column value.
	 */

	var GroupedDataFrame =
	/*#__PURE__*/
	function () {
	  /**
	   * Create a GroupedDataFrame. Used in DataFrame.groupBy('columnName').
	   * @param {DataFrame} df The DataFrame to group by.
	   * @param {String} columnName The column used for the group by.
	   * @example
	   * df.groupBy('column1');
	   * //or
	   * groupBy(df, ['column1']);
	   */
	  function GroupedDataFrame(df, columnNames, groups, hashes) {
	    _classCallCheck(this, GroupedDataFrame);

	    this[__groups__] = groups;
	    this[__hashes__] = hashes;
	    this.df = df;
	    this.on = columnNames.length > 0 ? columnNames : df.listColumns();
	  }

	  _createClass(GroupedDataFrame, [{
	    key: Symbol.iterator,
	    value:
	    /*#__PURE__*/
	    regeneratorRuntime.mark(function value() {
	      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, hash;

	      return regeneratorRuntime.wrap(function value$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              _iteratorNormalCompletion = true;
	              _didIteratorError = false;
	              _iteratorError = undefined;
	              _context.prev = 3;
	              _iterator = this[__hashes__][Symbol.iterator]();

	            case 5:
	              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
	                _context.next = 12;
	                break;
	              }

	              hash = _step.value;
	              _context.next = 9;
	              return this[__groups__][hash];

	            case 9:
	              _iteratorNormalCompletion = true;
	              _context.next = 5;
	              break;

	            case 12:
	              _context.next = 18;
	              break;

	            case 14:
	              _context.prev = 14;
	              _context.t0 = _context["catch"](3);
	              _didIteratorError = true;
	              _iteratorError = _context.t0;

	            case 18:
	              _context.prev = 18;
	              _context.prev = 19;

	              if (!_iteratorNormalCompletion && _iterator.return != null) {
	                _iterator.return();
	              }

	            case 21:
	              _context.prev = 21;

	              if (!_didIteratorError) {
	                _context.next = 24;
	                break;
	              }

	              throw _iteratorError;

	            case 24:
	              return _context.finish(21);

	            case 25:
	              return _context.finish(18);

	            case 26:
	            case "end":
	              return _context.stop();
	          }
	        }
	      }, value, this, [[3, 14, 18, 26], [19,, 21, 25]]);
	    })
	  }, {
	    key: "get",
	    value: function get(hash) {
	      return this[__groups__][hash];
	    }
	    /**
	     * Convert GroupedDataFrame into collection (Array) of dictionnaries (Object).
	     * @returns {Array} An Array containing group: {groupKey, group}.
	     * @example
	     * groupedDF.toCollection();
	     */

	  }, {
	    key: "toCollection",
	    value: function toCollection() {
	      return _toConsumableArray(this);
	    }
	    /**
	     * Display the GroupedDataFrame as String Table.
	     * @param {Boolean} [quiet=false] Quiet mode. If true, it doesn't trigger console.log().
	     * @returns {String} The GroupedDataFrame as String Table.
	     * @example
	     * groupedDf.show()
	     */

	  }, {
	    key: "show",
	    value: function show() {
	      var quiet = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	      return _toConsumableArray(this).map(function (_ref) {
	        var group = _ref.group,
	            groupKey = _ref.groupKey;
	        var groupLog = "--\n[".concat(JSON.stringify(groupKey), "]\n--");

	        if (!quiet) {
	          console.log(groupLog);
	        }

	        return groupLog + "\n" + group.show(10, quiet);
	      }).reduce(function (p, n) {
	        return p + "\n" + n;
	      });
	    }
	    /**
	     * List GroupedDataFrame groups.
	     * @returns {Array} An Array containing GroupedDataFrame group names.
	     * @example
	     * gdf.listGroups()
	     */

	  }, {
	    key: "listGroups",
	    value: function listGroups() {
	      return _toConsumableArray(this).map(function (_ref2) {
	        var groupKey = _ref2.groupKey;
	        return groupKey;
	      });
	    }
	    /**
	     * List GroupedDataFrame groups as a hashCode.
	     * @returns {Array} An Array containing GroupedDataFrame hash codes.
	     * @example
	     * gdf.listHashCodes()
	     */

	  }, {
	    key: "listHashs",
	    value: function listHashs() {
	      return this[__hashes__];
	    }
	    /**
	     * Map on DataFrame groups.
	     * @param {Function} func The function to apply to each row of each group.
	     * @returns {DataFrame} A new DataFrame containing the result.
	     * @example
	     * groupedDF.map((row,i) => row.set('b', row.get('a')*i));
	     */

	  }, {
	    key: "map",
	    value: function map(func) {
	      var _ref4;

	      var mapped = _toConsumableArray(this).map(function (_ref3) {
	        var group = _ref3.group;
	        return group.map(func);
	      });

	      return this.df.__newInstance__((_ref4 = []).concat.apply(_ref4, _toConsumableArray(mapped.map(function (group) {
	        return group.toCollection();
	      }))), mapped[0].listColumns());
	    }
	    /**
	     * Filter a grouped DataFrame.
	     * @param {Function} condition A filter function or a column/value object.
	     * @returns {DataFrame} A new filtered DataFrame.
	     * @example
	     * groupedDF.filter((row,i) => (i === 0));
	     */

	  }, {
	    key: "filter",
	    value: function filter(condition) {
	      var _ref6;

	      var mapped = _toConsumableArray(this).map(function (_ref5) {
	        var group = _ref5.group;
	        return group.filter(condition);
	      }).filter(function (group) {
	        return group.listColumns().length > 0;
	      });

	      return mapped.length === 0 ? this.df.__newInstance__([], this.df.listColumns()) : this.df.__newInstance__((_ref6 = []).concat.apply(_ref6, _toConsumableArray(mapped.map(function (group) {
	        return group.toCollection();
	      }))), this.df.listColumns());
	    }
	    /**
	     * Chain maps and filters functions on DataFrame by optimizing their executions.
	     * If a function returns boolean, it's a filter. Else it's a map.
	     * It can be 10 - 100 x faster than standard chains of .map() and .filter().
	     * @param {...Function} funcs Functions to apply on the DataFrame rows taking the row as parameter.
	     * @returns {DataFrame} A new DataFrame with modified rows.
	     * @example
	     * groupedDF.chain(
	     *      (row, i) => (i === 0), // filter
	     *      row => row.set('column1', 3),  // map
	     *      row => row.get('column2') === '5' // filter
	     * )
	     */

	  }, {
	    key: "chain",
	    value: function chain() {
	      var _ref8;

	      for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
	        funcs[_key] = arguments[_key];
	      }

	      var mapped = _toConsumableArray(this).map(function (_ref7) {
	        var group = _ref7.group;
	        return group.chain.apply(group, funcs);
	      });

	      return this.df.__newInstance__((_ref8 = []).concat.apply(_ref8, _toConsumableArray(mapped.map(function (group) {
	        return group.toCollection();
	      }))), mapped[0].listColumns());
	    }
	    /**
	     * Create an aggregation from a function.
	     * @param {Function} func The aggregation function.
	     * @param {String} [columnName='aggregation'] The column name created by the aggregation.
	     * @returns {DataFrame} A new DataFrame with a column 'aggregation' containing the result.
	     * @example
	     * groupedDF.aggregate(group => group.stat.sum('column1'));
	     */

	  }, {
	    key: "aggregate",
	    value: function aggregate(func) {
	      var columnName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "aggregation";
	      return this.df.__newInstance__(_toConsumableArray(this).map(function (_ref9) {
	        var group = _ref9.group,
	            groupKey = _ref9.groupKey;
	        return _objectSpread2({}, groupKey, _defineProperty({}, columnName, func(group, groupKey)));
	      }), [].concat(_toConsumableArray(this.on), [columnName]));
	    }
	    /**
	     * Pivot a GroupedDataFrame.
	     * @param {String} columnToPivot The column which will be transposed as columns.
	     * @param {Function} [func=(gdf) => gdf.count()] The function to define each column value from a DataFrame.
	     * @returns {DataFrame} The pivot DataFrame.
	     * @example
	     * df.groupBy('carType').pivot('carModel', values => values.stat.sum('kms'))
	     */

	  }, {
	    key: "pivot",
	    value: function pivot(columnToPivot) {
	      var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (gdf) {
	        return gdf.count();
	      };
	      var columns = [].concat(_toConsumableArray(this.on), _toConsumableArray(this.df.distinct(columnToPivot).toArray(columnToPivot)));
	      return this.df.__newInstance__(this.aggregate(function (group) {
	        return group.groupBy(columnToPivot).aggregate(function (gp, gk) {
	          return _defineProperty({}, gk[columnToPivot], func(gp, gk));
	        }).toArray("aggregation").reduce(function (p, n) {
	          return _objectSpread2({}, p, {}, n);
	        }, {});
	      }).toCollection().map(function (_ref11) {
	        var aggregation = _ref11.aggregation,
	            rest = _objectWithoutProperties(_ref11, ["aggregation"]);

	        return _objectSpread2({}, rest, {}, aggregation);
	      }), columns);
	    }
	    /**
	     * Melt a DataFrame to make it tidy. It's the reverse of GroupedDataFrame.pivot().
	     * @param {String} [variableColumnName='variable'] The column name containing columns.
	     * @param {String} [variableColumnName='value'] The column name containing values.
	     * @returns {DataFrame} The tidy DataFrame.
	     * @example
	     * df.groupBy('carType').melt('kms')
	     */

	  }, {
	    key: "melt",
	    value: function melt() {
	      var _this = this;

	      var variableColumnName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "variable";
	      var valueColumnName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "value";
	      var columns = [].concat(_toConsumableArray(this.on), [variableColumnName, valueColumnName]);
	      return this.df.__newInstance__(this.aggregate(function (group) {
	        return Object.entries(group.toDict()).reduce(function (tidy, _ref12) {
	          var _ref13 = _slicedToArray(_ref12, 2),
	              key = _ref13[0],
	              value = _ref13[1];

	          return [].concat(_toConsumableArray(tidy), _toConsumableArray(value.reduce(function (p, n) {
	            var _ref14;

	            return !_this.on.includes(key) ? [].concat(_toConsumableArray(p), [(_ref14 = {}, _defineProperty(_ref14, variableColumnName, key), _defineProperty(_ref14, valueColumnName, n), _ref14)]) : p;
	          }, [])));
	        }, []);
	      }).toCollection().reduce(function (p, _ref15) {
	        var aggregation = _ref15.aggregation,
	            rest = _objectWithoutProperties(_ref15, ["aggregation"]);

	        return [].concat(_toConsumableArray(p), _toConsumableArray(aggregation.map(function (x) {
	          return _objectSpread2({}, rest, {}, x);
	        })));
	      }, []), columns);
	    }
	  }]);

	  return GroupedDataFrame;
	}();

	function groupBy(df, columnNames) {
	  var rowsByGroup = {};
	  var hashes = [];
	  var _iteratorNormalCompletion2 = true;
	  var _didIteratorError2 = false;
	  var _iteratorError2 = undefined;

	  try {
	    for (var _iterator2 = df.toCollection(true)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	      var row = _step2.value;
	      var hash = row.select.apply(row, _toConsumableArray(columnNames)).hash();

	      if (!rowsByGroup[hash]) {
	        hashes.push(hash);
	        rowsByGroup[hash] = [];
	      }

	      rowsByGroup[hash].push(row);
	    }
	  } catch (err) {
	    _didIteratorError2 = true;
	    _iteratorError2 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
	        _iterator2.return();
	      }
	    } finally {
	      if (_didIteratorError2) {
	        throw _iteratorError2;
	      }
	    }
	  }

	  var groups = hashes.reduce(function (groups, hash) {
	    var _rowsByGroup$hash$;

	    groups[hash] = {
	      groupKey: (_rowsByGroup$hash$ = rowsByGroup[hash][0]).select.apply(_rowsByGroup$hash$, _toConsumableArray(columnNames)).toDict(),
	      hash: hash,
	      group: new df.constructor(rowsByGroup[hash], df.listColumns())
	    };
	    return groups;
	  }, {});
	  return new GroupedDataFrame(df, columnNames, groups, hashes);
	}

	var location = global_1.location;
	var set$2 = global_1.setImmediate;
	var clear = global_1.clearImmediate;
	var process = global_1.process;
	var MessageChannel = global_1.MessageChannel;
	var Dispatch = global_1.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;

	var run = function (id) {
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};

	var runner = function (id) {
	  return function () {
	    run(id);
	  };
	};

	var listener = function (event) {
	  run(event.data);
	};

	var post = function (id) {
	  // old engines have not location.origin
	  global_1.postMessage(id + '', location.protocol + '//' + location.host);
	};

	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!set$2 || !clear) {
	  set$2 = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clear = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (classofRaw(process) == 'process') {
	    defer = function (id) {
	      process.nextTick(runner(id));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(runner(id));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = bindContext(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (global_1.addEventListener && typeof postMessage == 'function' && !global_1.importScripts && !fails(post)) {
	    defer = post;
	    global_1.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
	    defer = function (id) {
	      html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(runner(id), 0);
	    };
	  }
	}

	var task = {
	  set: set$2,
	  clear: clear
	};

	var userAgent = getBuiltIn('navigator', 'userAgent') || '';

	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;

	var macrotask = task.set;


	var MutationObserver = global_1.MutationObserver || global_1.WebKitMutationObserver;
	var process$1 = global_1.process;
	var Promise$1 = global_1.Promise;
	var IS_NODE = classofRaw(process$1) == 'process';
	// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
	var queueMicrotaskDescriptor = getOwnPropertyDescriptor$2(global_1, 'queueMicrotask');
	var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

	var flush, head, last, notify, toggle, node, promise;

	// modern engines have queueMicrotask method
	if (!queueMicrotask) {
	  flush = function () {
	    var parent, fn;
	    if (IS_NODE && (parent = process$1.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (error) {
	        if (head) notify();
	        else last = undefined;
	        throw error;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (IS_NODE) {
	    notify = function () {
	      process$1.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
	  } else if (MutationObserver && !/(iphone|ipod|ipad).*applewebkit/i.test(userAgent)) {
	    toggle = true;
	    node = document.createTextNode('');
	    new MutationObserver(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    promise = Promise$1.resolve(undefined);
	    notify = function () {
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global_1, flush);
	    };
	  }
	}

	var microtask = queueMicrotask || function (fn) {
	  var task$$1 = { fn: fn, next: undefined };
	  if (last) last.next = task$$1;
	  if (!head) {
	    head = task$$1;
	    notify();
	  } last = task$$1;
	};

	var PromiseCapability = function (C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction$1(resolve);
	  this.reject = aFunction$1(reject);
	};

	// 25.4.1.5 NewPromiseCapability(C)
	var f$7 = function (C) {
	  return new PromiseCapability(C);
	};

	var newPromiseCapability = {
		f: f$7
	};

	var promiseResolve = function (C, x) {
	  anObject(C);
	  if (isObject(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var hostReportErrors = function (a, b) {
	  var console = global_1.console;
	  if (console && console.error) {
	    arguments.length === 1 ? console.error(a) : console.error(a, b);
	  }
	};

	var perform = function (exec) {
	  try {
	    return { error: false, value: exec() };
	  } catch (error) {
	    return { error: true, value: error };
	  }
	};

	var task$1 = task.set;










	var SPECIES$6 = wellKnownSymbol('species');
	var PROMISE = 'Promise';
	var getInternalState$3 = internalState.get;
	var setInternalState$4 = internalState.set;
	var getInternalPromiseState = internalState.getterFor(PROMISE);
	var PromiseConstructor = global_1[PROMISE];
	var TypeError$1 = global_1.TypeError;
	var document$2 = global_1.document;
	var process$2 = global_1.process;
	var $fetch = global_1.fetch;
	var versions = process$2 && process$2.versions;
	var v8 = versions && versions.v8 || '';
	var newPromiseCapability$1 = newPromiseCapability.f;
	var newGenericPromiseCapability = newPromiseCapability$1;
	var IS_NODE$1 = classofRaw(process$2) == 'process';
	var DISPATCH_EVENT = !!(document$2 && document$2.createEvent && global_1.dispatchEvent);
	var UNHANDLED_REJECTION = 'unhandledrejection';
	var REJECTION_HANDLED = 'rejectionhandled';
	var PENDING = 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	var HANDLED = 1;
	var UNHANDLED = 2;
	var Internal, OwnPromiseCapability, PromiseWrapper;

	var FORCED$4 = isForced_1(PROMISE, function () {
	  // correct subclassing with @@species support
	  var promise = PromiseConstructor.resolve(1);
	  var empty = function () { /* empty */ };
	  var FakePromise = (promise.constructor = {})[SPECIES$6] = function (exec) {
	    exec(empty, empty);
	  };
	  // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	  return !((IS_NODE$1 || typeof PromiseRejectionEvent == 'function')
	    && (!isPure || promise['finally'])
	    && promise.then(empty) instanceof FakePromise
	    // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	    // we can't detect it synchronously, so just check versions
	    && v8.indexOf('6.6') !== 0
	    && userAgent.indexOf('Chrome/66') === -1);
	});

	var INCORRECT_ITERATION$1 = FORCED$4 || !checkCorrectnessOfIteration(function (iterable) {
	  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
	});

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};

	var notify$1 = function (promise, state, isReject) {
	  if (state.notified) return;
	  state.notified = true;
	  var chain = state.reactions;
	  microtask(function () {
	    var value = state.value;
	    var ok = state.state == FULFILLED;
	    var index = 0;
	    // variable length - can't use forEach
	    while (chain.length > index) {
	      var reaction = chain[index++];
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
	            state.rejection = HANDLED;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // can throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (error) {
	        if (domain && !exited) domain.exit();
	        reject(error);
	      }
	    }
	    state.reactions = [];
	    state.notified = false;
	    if (isReject && !state.rejection) onUnhandled(promise, state);
	  });
	};

	var dispatchEvent = function (name, promise, reason) {
	  var event, handler;
	  if (DISPATCH_EVENT) {
	    event = document$2.createEvent('Event');
	    event.promise = promise;
	    event.reason = reason;
	    event.initEvent(name, false, true);
	    global_1.dispatchEvent(event);
	  } else event = { promise: promise, reason: reason };
	  if (handler = global_1['on' + name]) handler(event);
	  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
	};

	var onUnhandled = function (promise, state) {
	  task$1.call(global_1, function () {
	    var value = state.value;
	    var IS_UNHANDLED = isUnhandled(state);
	    var result;
	    if (IS_UNHANDLED) {
	      result = perform(function () {
	        if (IS_NODE$1) {
	          process$2.emit('unhandledRejection', value, promise);
	        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      state.rejection = IS_NODE$1 || isUnhandled(state) ? UNHANDLED : HANDLED;
	      if (result.error) throw result.value;
	    }
	  });
	};

	var isUnhandled = function (state) {
	  return state.rejection !== HANDLED && !state.parent;
	};

	var onHandleUnhandled = function (promise, state) {
	  task$1.call(global_1, function () {
	    if (IS_NODE$1) {
	      process$2.emit('rejectionHandled', promise);
	    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
	  });
	};

	var bind = function (fn, promise, state, unwrap) {
	  return function (value) {
	    fn(promise, state, value, unwrap);
	  };
	};

	var internalReject = function (promise, state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  state.value = value;
	  state.state = REJECTED;
	  notify$1(promise, state, true);
	};

	var internalResolve = function (promise, state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  try {
	    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
	    var then = isThenable(value);
	    if (then) {
	      microtask(function () {
	        var wrapper = { done: false };
	        try {
	          then.call(value,
	            bind(internalResolve, promise, wrapper, state),
	            bind(internalReject, promise, wrapper, state)
	          );
	        } catch (error) {
	          internalReject(promise, wrapper, error, state);
	        }
	      });
	    } else {
	      state.value = value;
	      state.state = FULFILLED;
	      notify$1(promise, state, false);
	    }
	  } catch (error) {
	    internalReject(promise, { done: false }, error, state);
	  }
	};

	// constructor polyfill
	if (FORCED$4) {
	  // 25.4.3.1 Promise(executor)
	  PromiseConstructor = function Promise(executor) {
	    anInstance(this, PromiseConstructor, PROMISE);
	    aFunction$1(executor);
	    Internal.call(this);
	    var state = getInternalState$3(this);
	    try {
	      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
	    } catch (error) {
	      internalReject(this, state, error);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    setInternalState$4(this, {
	      type: PROMISE,
	      done: false,
	      notified: false,
	      parent: false,
	      reactions: [],
	      rejection: false,
	      state: PENDING,
	      value: undefined
	    });
	  };
	  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
	    // `Promise.prototype.then` method
	    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
	    then: function then(onFulfilled, onRejected) {
	      var state = getInternalPromiseState(this);
	      var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = IS_NODE$1 ? process$2.domain : undefined;
	      state.parent = true;
	      state.reactions.push(reaction);
	      if (state.state != PENDING) notify$1(this, state, false);
	      return reaction.promise;
	    },
	    // `Promise.prototype.catch` method
	    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    var state = getInternalState$3(promise);
	    this.promise = promise;
	    this.resolve = bind(internalResolve, promise, state);
	    this.reject = bind(internalReject, promise, state);
	  };
	  newPromiseCapability.f = newPromiseCapability$1 = function (C) {
	    return C === PromiseConstructor || C === PromiseWrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };

	  // wrap fetch result
	  if (typeof $fetch == 'function') _export({ global: true, enumerable: true, forced: true }, {
	    // eslint-disable-next-line no-unused-vars
	    fetch: function fetch(input) {
	      return promiseResolve(PromiseConstructor, $fetch.apply(global_1, arguments));
	    }
	  });
	}

	_export({ global: true, wrap: true, forced: FORCED$4 }, {
	  Promise: PromiseConstructor
	});

	setToStringTag(PromiseConstructor, PROMISE, false, true);
	setSpecies(PROMISE);

	PromiseWrapper = path[PROMISE];

	// statics
	_export({ target: PROMISE, stat: true, forced: FORCED$4 }, {
	  // `Promise.reject` method
	  // https://tc39.github.io/ecma262/#sec-promise.reject
	  reject: function reject(r) {
	    var capability = newPromiseCapability$1(this);
	    capability.reject.call(undefined, r);
	    return capability.promise;
	  }
	});

	_export({ target: PROMISE, stat: true, forced: FORCED$4 }, {
	  // `Promise.resolve` method
	  // https://tc39.github.io/ecma262/#sec-promise.resolve
	  resolve: function resolve(x) {
	    return promiseResolve(this, x);
	  }
	});

	_export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION$1 }, {
	  // `Promise.all` method
	  // https://tc39.github.io/ecma262/#sec-promise.all
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$1(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate_1(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        $promiseResolve.call(C, promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  },
	  // `Promise.race` method
	  // https://tc39.github.io/ecma262/#sec-promise.race
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$1(C.resolve);
	      iterate_1(iterable, function (promise) {
	        $promiseResolve.call(C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	var nativeStartsWith = ''.startsWith;
	var min$4 = Math.min;

	// `String.prototype.startsWith` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.startswith
	_export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('startsWith') }, {
	  startsWith: function startsWith(searchString /* , position = 0 */) {
	    var that = String(requireObjectCoercible(this));
	    notARegexp(searchString);
	    var index = toLength(min$4(arguments.length > 1 ? arguments[1] : undefined, that.length));
	    var search = String(searchString);
	    return nativeStartsWith
	      ? nativeStartsWith.call(that, search, index)
	      : that.slice(index, index + search.length) === search;
	  }
	});

	var prefix = "$";

	function Map$1() {}

	Map$1.prototype = map.prototype = {
	  constructor: Map$1,
	  has: function(key) {
	    return (prefix + key) in this;
	  },
	  get: function(key) {
	    return this[prefix + key];
	  },
	  set: function(key, value) {
	    this[prefix + key] = value;
	    return this;
	  },
	  remove: function(key) {
	    var property = prefix + key;
	    return property in this && delete this[property];
	  },
	  clear: function() {
	    for (var property in this) if (property[0] === prefix) delete this[property];
	  },
	  keys: function() {
	    var keys = [];
	    for (var property in this) if (property[0] === prefix) keys.push(property.slice(1));
	    return keys;
	  },
	  values: function() {
	    var values = [];
	    for (var property in this) if (property[0] === prefix) values.push(this[property]);
	    return values;
	  },
	  entries: function() {
	    var entries = [];
	    for (var property in this) if (property[0] === prefix) entries.push({key: property.slice(1), value: this[property]});
	    return entries;
	  },
	  size: function() {
	    var size = 0;
	    for (var property in this) if (property[0] === prefix) ++size;
	    return size;
	  },
	  empty: function() {
	    for (var property in this) if (property[0] === prefix) return false;
	    return true;
	  },
	  each: function(f) {
	    for (var property in this) if (property[0] === prefix) f(this[property], property.slice(1), this);
	  }
	};

	function map(object, f) {
	  var map = new Map$1;

	  // Copy constructor.
	  if (object instanceof Map$1) object.each(function(value, key) { map.set(key, value); });

	  // Index array by numeric index or specified key function.
	  else if (Array.isArray(object)) {
	    var i = -1,
	        n = object.length,
	        o;

	    if (f == null) while (++i < n) map.set(i, object[i]);
	    else while (++i < n) map.set(f(o = object[i], i, object), o);
	  }

	  // Convert object to map.
	  else if (object) for (var key in object) map.set(key, object[key]);

	  return map;
	}

	function Set$1() {}

	var proto = map.prototype;

	Set$1.prototype = set$3.prototype = {
	  constructor: Set$1,
	  has: proto.has,
	  add: function(value) {
	    value += "";
	    this[prefix + value] = value;
	    return this;
	  },
	  remove: proto.remove,
	  clear: proto.clear,
	  values: proto.keys,
	  size: proto.size,
	  empty: proto.empty,
	  each: proto.each
	};

	function set$3(object, f) {
	  var set = new Set$1;

	  // Copy constructor.
	  if (object instanceof Set$1) object.each(function(value) { set.add(value); });

	  // Otherwise, assume it’s an array.
	  else if (object) {
	    var i = -1, n = object.length;
	    if (f == null) while (++i < n) set.add(object[i]);
	    else while (++i < n) set.add(f(object[i], i, object));
	  }

	  return set;
	}

	var noop = {value: function() {}};

	function dispatch() {
	  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
	    if (!(t = arguments[i] + "") || (t in _)) throw new Error("illegal type: " + t);
	    _[t] = [];
	  }
	  return new Dispatch$1(_);
	}

	function Dispatch$1(_) {
	  this._ = _;
	}

	function parseTypenames(typenames, types) {
	  return typenames.trim().split(/^|\s+/).map(function(t) {
	    var name = "", i = t.indexOf(".");
	    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
	    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
	    return {type: t, name: name};
	  });
	}

	Dispatch$1.prototype = dispatch.prototype = {
	  constructor: Dispatch$1,
	  on: function(typename, callback) {
	    var _ = this._,
	        T = parseTypenames(typename + "", _),
	        t,
	        i = -1,
	        n = T.length;

	    // If no callback was specified, return the callback of the given type and name.
	    if (arguments.length < 2) {
	      while (++i < n) if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
	      return;
	    }

	    // If a type was specified, set the callback for the given type and name.
	    // Otherwise, if a null callback was specified, remove callbacks of the given name.
	    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
	    while (++i < n) {
	      if (t = (typename = T[i]).type) _[t] = set$4(_[t], typename.name, callback);
	      else if (callback == null) for (t in _) _[t] = set$4(_[t], typename.name, null);
	    }

	    return this;
	  },
	  copy: function() {
	    var copy = {}, _ = this._;
	    for (var t in _) copy[t] = _[t].slice();
	    return new Dispatch$1(copy);
	  },
	  call: function(type, that) {
	    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
	    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
	    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	  },
	  apply: function(type, that, args) {
	    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
	    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	  }
	};

	function get$1(type, name) {
	  for (var i = 0, n = type.length, c; i < n; ++i) {
	    if ((c = type[i]).name === name) {
	      return c.value;
	    }
	  }
	}

	function set$4(type, name, callback) {
	  for (var i = 0, n = type.length; i < n; ++i) {
	    if (type[i].name === name) {
	      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
	      break;
	    }
	  }
	  if (callback != null) type.push({name: name, value: callback});
	  return type;
	}

	function request(url, callback) {
	  var request,
	      event = dispatch("beforesend", "progress", "load", "error"),
	      mimeType,
	      headers = map(),
	      xhr = new XMLHttpRequest,
	      user = null,
	      password = null,
	      response,
	      responseType,
	      timeout = 0;

	  // If IE does not support CORS, use XDomainRequest.
	  if (typeof XDomainRequest !== "undefined"
	      && !("withCredentials" in xhr)
	      && /^(http(s)?:)?\/\//.test(url)) xhr = new XDomainRequest;

	  "onload" in xhr
	      ? xhr.onload = xhr.onerror = xhr.ontimeout = respond
	      : xhr.onreadystatechange = function(o) { xhr.readyState > 3 && respond(o); };

	  function respond(o) {
	    var status = xhr.status, result;
	    if (!status && hasResponse(xhr)
	        || status >= 200 && status < 300
	        || status === 304) {
	      if (response) {
	        try {
	          result = response.call(request, xhr);
	        } catch (e) {
	          event.call("error", request, e);
	          return;
	        }
	      } else {
	        result = xhr;
	      }
	      event.call("load", request, result);
	    } else {
	      event.call("error", request, o);
	    }
	  }

	  xhr.onprogress = function(e) {
	    event.call("progress", request, e);
	  };

	  request = {
	    header: function(name, value) {
	      name = (name + "").toLowerCase();
	      if (arguments.length < 2) return headers.get(name);
	      if (value == null) headers.remove(name);
	      else headers.set(name, value + "");
	      return request;
	    },

	    // If mimeType is non-null and no Accept header is set, a default is used.
	    mimeType: function(value) {
	      if (!arguments.length) return mimeType;
	      mimeType = value == null ? null : value + "";
	      return request;
	    },

	    // Specifies what type the response value should take;
	    // for instance, arraybuffer, blob, document, or text.
	    responseType: function(value) {
	      if (!arguments.length) return responseType;
	      responseType = value;
	      return request;
	    },

	    timeout: function(value) {
	      if (!arguments.length) return timeout;
	      timeout = +value;
	      return request;
	    },

	    user: function(value) {
	      return arguments.length < 1 ? user : (user = value == null ? null : value + "", request);
	    },

	    password: function(value) {
	      return arguments.length < 1 ? password : (password = value == null ? null : value + "", request);
	    },

	    // Specify how to convert the response content to a specific type;
	    // changes the callback value on "load" events.
	    response: function(value) {
	      response = value;
	      return request;
	    },

	    // Alias for send("GET", …).
	    get: function(data, callback) {
	      return request.send("GET", data, callback);
	    },

	    // Alias for send("POST", …).
	    post: function(data, callback) {
	      return request.send("POST", data, callback);
	    },

	    // If callback is non-null, it will be used for error and load events.
	    send: function(method, data, callback) {
	      xhr.open(method, url, true, user, password);
	      if (mimeType != null && !headers.has("accept")) headers.set("accept", mimeType + ",*/*");
	      if (xhr.setRequestHeader) headers.each(function(value, name) { xhr.setRequestHeader(name, value); });
	      if (mimeType != null && xhr.overrideMimeType) xhr.overrideMimeType(mimeType);
	      if (responseType != null) xhr.responseType = responseType;
	      if (timeout > 0) xhr.timeout = timeout;
	      if (callback == null && typeof data === "function") callback = data, data = null;
	      if (callback != null && callback.length === 1) callback = fixCallback(callback);
	      if (callback != null) request.on("error", callback).on("load", function(xhr) { callback(null, xhr); });
	      event.call("beforesend", request, xhr);
	      xhr.send(data == null ? null : data);
	      return request;
	    },

	    abort: function() {
	      xhr.abort();
	      return request;
	    },

	    on: function() {
	      var value = event.on.apply(event, arguments);
	      return value === event ? request : value;
	    }
	  };

	  if (callback != null) {
	    if (typeof callback !== "function") throw new Error("invalid callback: " + callback);
	    return request.get(callback);
	  }

	  return request;
	}

	function fixCallback(callback) {
	  return function(error, xhr) {
	    callback(error == null ? xhr : null);
	  };
	}

	function hasResponse(xhr) {
	  var type = xhr.responseType;
	  return type && type !== "text"
	      ? xhr.response // null on error
	      : xhr.responseText; // "" on error
	}

	function type(defaultMimeType, response) {
	  return function(url, callback) {
	    var r = request(url).mimeType(defaultMimeType).response(response);
	    if (callback != null) {
	      if (typeof callback !== "function") throw new Error("invalid callback: " + callback);
	      return r.get(callback);
	    }
	    return r;
	  };
	}

	var json = type("application/json", function(xhr) {
	  return JSON.parse(xhr.responseText);
	});

	var text = type("text/plain", function(xhr) {
	  return xhr.responseText;
	});

	var EOL = {},
	    EOF = {},
	    QUOTE = 34,
	    NEWLINE = 10,
	    RETURN = 13;

	function objectConverter(columns) {
	  return new Function("d", "return {" + columns.map(function(name, i) {
	    return JSON.stringify(name) + ": d[" + i + "]";
	  }).join(",") + "}");
	}

	function customConverter(columns, f) {
	  var object = objectConverter(columns);
	  return function(row, i) {
	    return f(object(row), i, columns);
	  };
	}

	// Compute unique columns in order of discovery.
	function inferColumns(rows) {
	  var columnSet = Object.create(null),
	      columns = [];

	  rows.forEach(function(row) {
	    for (var column in row) {
	      if (!(column in columnSet)) {
	        columns.push(columnSet[column] = column);
	      }
	    }
	  });

	  return columns;
	}

	function dsv(delimiter) {
	  var reFormat = new RegExp("[\"" + delimiter + "\n\r]"),
	      DELIMITER = delimiter.charCodeAt(0);

	  function parse(text, f) {
	    var convert, columns, rows = parseRows(text, function(row, i) {
	      if (convert) return convert(row, i - 1);
	      columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
	    });
	    rows.columns = columns || [];
	    return rows;
	  }

	  function parseRows(text, f) {
	    var rows = [], // output rows
	        N = text.length,
	        I = 0, // current character index
	        n = 0, // current line number
	        t, // current token
	        eof = N <= 0, // current token followed by EOF?
	        eol = false; // current token followed by EOL?

	    // Strip the trailing newline.
	    if (text.charCodeAt(N - 1) === NEWLINE) --N;
	    if (text.charCodeAt(N - 1) === RETURN) --N;

	    function token() {
	      if (eof) return EOF;
	      if (eol) return eol = false, EOL;

	      // Unescape quotes.
	      var i, j = I, c;
	      if (text.charCodeAt(j) === QUOTE) {
	        while (I++ < N && text.charCodeAt(I) !== QUOTE || text.charCodeAt(++I) === QUOTE);
	        if ((i = I) >= N) eof = true;
	        else if ((c = text.charCodeAt(I++)) === NEWLINE) eol = true;
	        else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
	        return text.slice(j + 1, i - 1).replace(/""/g, "\"");
	      }

	      // Find next delimiter or newline.
	      while (I < N) {
	        if ((c = text.charCodeAt(i = I++)) === NEWLINE) eol = true;
	        else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
	        else if (c !== DELIMITER) continue;
	        return text.slice(j, i);
	      }

	      // Return last token before EOF.
	      return eof = true, text.slice(j, N);
	    }

	    while ((t = token()) !== EOF) {
	      var row = [];
	      while (t !== EOL && t !== EOF) row.push(t), t = token();
	      if (f && (row = f(row, n++)) == null) continue;
	      rows.push(row);
	    }

	    return rows;
	  }

	  function format(rows, columns) {
	    if (columns == null) columns = inferColumns(rows);
	    return [columns.map(formatValue).join(delimiter)].concat(rows.map(function(row) {
	      return columns.map(function(column) {
	        return formatValue(row[column]);
	      }).join(delimiter);
	    })).join("\n");
	  }

	  function formatRows(rows) {
	    return rows.map(formatRow).join("\n");
	  }

	  function formatRow(row) {
	    return row.map(formatValue).join(delimiter);
	  }

	  function formatValue(text) {
	    return text == null ? ""
	        : reFormat.test(text += "") ? "\"" + text.replace(/"/g, "\"\"") + "\""
	        : text;
	  }

	  return {
	    parse: parse,
	    parseRows: parseRows,
	    format: format,
	    formatRows: formatRows
	  };
	}

	var csv = dsv(",");

	var csvParse = csv.parse;
	var csvParseRows = csv.parseRows;
	var csvFormat = csv.format;
	var csvFormatRows = csv.formatRows;

	var tsv = dsv("\t");

	var tsvParse = tsv.parse;
	var tsvParseRows = tsv.parseRows;
	var tsvFormat = tsv.format;
	var tsvFormatRows = tsv.formatRows;

	function saveFile(path, content) {
	  try {
	    require("fs").writeFileSync(path, content);
	  } catch (e) {
	    console.warn("File system module is not available.");
	  }
	}

	function loadTextFile(file, func) {
	  if (FileReader && File) {
	    var reader = new FileReader();

	    reader.onload = function (event) {
	      return func(event.target.result);
	    };

	    reader.readAsText(file);
	  }
	}

	function addFileProtocol(path) {
	  return path.startsWith("/") || path.startsWith("./") || path.startsWith("C") ? "file://".concat(path) : path;
	}

	function toDSV(df) {
	  var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ";";
	  var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	  var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
	  var parser = dsv(sep);
	  var csvContent = header ? parser.format(df.toCollection(), df[__columns__$1]) : parser.formatRows(df.toArray());

	  if (path) {
	    saveFile(df._cleanSavePath(path), csvContent);
	  }

	  return csvContent;
	}

	function toText(df) {
	  var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ";";
	  var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	  var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
	  return df.toDSV(sep, header, path);
	}

	function toCSV(df) {
	  var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	  var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
	  return df.toDSV(",", header, path);
	}

	function toTSV(df) {
	  var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	  var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
	  return df.toDSV("\t", header, path);
	}

	function toPSV(df) {
	  var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	  var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
	  return df.toDSV("|", header, path);
	}

	function toJSON(df) {
	  var asCollection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	  var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
	  var jsonContent = JSON.stringify(asCollection ? df.toCollection() : df.toDict());

	  if (path) {
	    saveFile(df._cleanSavePath(path), jsonContent);
	  }

	  return jsonContent;
	}

	function fromDSV(pathOrFile) {
	  var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ";";
	  var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	  var parser = dsv(sep);
	  return new Promise(function (resolve) {
	    var parseText = function parseText(fileContent) {
	      if (fileContent.includes("Error: ENOENT")) return resolve(null);
	      var data = header ? parser.parse(fileContent) : parser.parseRows(fileContent);
	      return resolve(data);
	    };

	    return typeof pathOrFile === "string" ? text(addFileProtocol(pathOrFile), parseText) : loadTextFile(pathOrFile, parseText);
	  }).then(function (fileContent) {
	    if (fileContent === null) {
	      throw new FileNotFoundError(pathOrFile);
	    }

	    return fileContent;
	  });
	}

	function fromText(pathOrFile) {
	  var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ";";
	  var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	  return fromDSV(pathOrFile, sep, header);
	}

	function fromCSV(pathOrFile) {
	  var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	  return fromDSV(pathOrFile, ",", header);
	}

	function fromTSV(pathOrFile) {
	  var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	  return fromDSV(pathOrFile, "\t", header);
	}

	function fromPSV(pathOrFile) {
	  var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	  return fromDSV(pathOrFile, "|", header);
	}

	function fromJSON(pathOrFile) {
	  return new Promise(function (resolve) {
	    return typeof pathOrFile === "string" ? json(addFileProtocol(pathOrFile), resolve) : loadTextFile(pathOrFile, function (txt) {
	      return resolve(JSON.parse(txt));
	    });
	  }).then(function (fileContent) {
	    if (fileContent === null) {
	      throw new FileNotFoundError(pathOrFile);
	    }

	    return fileContent;
	  });
	}

	var io = /*#__PURE__*/Object.freeze({
		toDSV: toDSV,
		toCSV: toCSV,
		toTSV: toTSV,
		toPSV: toPSV,
		toText: toText,
		toJSON: toJSON,
		fromDSV: fromDSV,
		fromCSV: fromCSV,
		fromTSV: fromTSV,
		fromPSV: fromPSV,
		fromText: fromText,
		fromJSON: fromJSON
	});

	/**
	 * DataFrame data structure providing an immutable, flexible and powerfull way to manipulate data with columns and rows.
	 */

	var DataFrame =
	/*#__PURE__*/
	function () {
	  _createClass(DataFrame, null, [{
	    key: "setDefaultModules",

	    /**
	     * Set the default modules used in DataFrame instances.
	     * @param {...Object} defaultModules DataFrame modules used by default.
	     * @example
	     * DataFrame.setDefaultModules(SQL, Stat)
	     */
	    value: function setDefaultModules() {
	      for (var _len = arguments.length, defaultModules = new Array(_len), _key = 0; _key < _len; _key++) {
	        defaultModules[_key] = arguments[_key];
	      }

	      DataFrame.defaultModules = defaultModules;
	    }
	    /**
	     * Create a DataFrame from a delimiter separated values text file. It returns a Promise.
	     * @param {String | File} pathOrFile A path to the file (url or local) or a browser File object.
	     * @param {String} sep The separator used to parse the file.
	     * @param {Boolean} [header=true] A boolean indicating if the text has a header or not.
	     * @example
	     * DataFrame.fromDSV('http://myurl/myfile.txt').then(df => df.show())
	     * // In browser Only
	     * DataFrame.fromDSV(myFile).then(df => df.show())
	     * // From node.js only Only
	     * DataFrame.fromDSV('/my/absolue/path/myfile.txt').then(df => df.show())
	     * DataFrame.fromDSV('/my/absolue/path/myfile.txt', ';', true).then(df => df.show())
	     */

	  }, {
	    key: "fromDSV",
	    value: function fromDSV$$1() {
	      return fromDSV.apply(io, arguments).then(function (content) {
	        return new DataFrame(content);
	      });
	    }
	    /**
	     * Create a DataFrame from a delimiter separated values text file. It returns a Promise. Alias of DataFrame.fromDSV.
	     * @param {String | File} pathOrFile A path to the file (url or local) or a browser File object.
	     * @param {String} sep The separator used to parse the file.
	     * @param {Boolean} [header=true] A boolean indicating if the text has a header or not.
	     * @example
	     * DataFrame.fromText('http://myurl/myfile.txt').then(df => df.show())
	     * // In browser Only
	     * DataFrame.fromText(myFile).then(df => df.show())
	     * // From node.js only Only
	     * DataFrame.fromText('/my/absolue/path/myfile.txt').then(df => df.show())
	     * DataFrame.fromText('/my/absolue/path/myfile.txt', ';', true).then(df => df.show())
	     */

	  }, {
	    key: "fromText",
	    value: function fromText$$1() {
	      return fromText.apply(io, arguments).then(function (content) {
	        return new DataFrame(content);
	      });
	    }
	    /**
	     * Create a DataFrame from a comma separated values file. It returns a Promise.
	     * @param {String | File} pathOrFile A path to the file (url or local) or a browser File object.
	     * @param {Boolean} [header=true] A boolean indicating if the csv has a header or not.
	     * @example
	     * DataFrame.fromCSV('http://myurl/myfile.csv').then(df => df.show())
	     * // For browser only
	     * DataFrame.fromCSV(myFile).then(df => df.show())
	     * // From node.js only
	     * DataFrame.fromCSV('/my/absolue/path/myfile.csv').then(df => df.show())
	     * DataFrame.fromCSV('/my/absolue/path/myfile.csv', true).then(df => df.show())
	     */

	  }, {
	    key: "fromCSV",
	    value: function fromCSV$$1() {
	      return fromCSV.apply(io, arguments).then(function (content) {
	        return new DataFrame(content);
	      });
	    }
	    /**
	     * Create a DataFrame from a tab separated values file. It returns a Promise.
	     * @param {String | File} pathOrFile A path to the file (url or local) or a browser File object.
	     * @param {Boolean} [header=true] A boolean indicating if the tsv has a header or not.
	     * @example
	     * DataFrame.fromTSV('http://myurl/myfile.tsv').then(df => df.show())
	     * // For browser only
	     * DataFrame.fromTSV(myFile).then(df => df.show())
	     * // From node.js only
	     * DataFrame.fromTSV('/my/absolue/path/myfile.tsv').then(df => df.show())
	     * DataFrame.fromTSV('/my/absolue/path/myfile.tsv', true).then(df => df.show())
	     */

	  }, {
	    key: "fromTSV",
	    value: function fromTSV$$1() {
	      return fromTSV.apply(io, arguments).then(function (content) {
	        return new DataFrame(content);
	      });
	    }
	    /**
	     * Create a DataFrame from a pipe separated values file. It returns a Promise.
	     * @param {String | File} pathOrFile A path to the file (url or local) or a browser File object.
	     * @param {Boolean} [header=true] A boolean indicating if the psv has a header or not.
	     * @example
	     * DataFrame.fromPSV('http://myurl/myfile.psv').then(df => df.show())
	     * // For browser only
	     * DataFrame.fromPSV(myFile).then(df => df.show())
	     * // From node.js only
	     * DataFrame.fromPSV('/my/absolue/path/myfile.psv').then(df => df.show())
	     * DataFrame.fromPSV('/my/absolue/path/myfile.psv', true).then(df => df.show())
	     */

	  }, {
	    key: "fromPSV",
	    value: function fromPSV$$1() {
	      return fromPSV.apply(io, arguments).then(function (content) {
	        return new DataFrame(content);
	      });
	    }
	    /**
	     * Create a DataFrame from a JSON file. It returns a Promise.
	     * @param {String | File} pathOrFile A path to the file (url or local) or a browser File object.
	     * @example
	     * DataFrame.fromJSON('http://myurl/myfile.json').then(df => df.show())
	     * // For browser only
	     * DataFrame.fromJSON(myFile).then(df => df.show())
	     * // From node.js only
	     * DataFrame.fromJSON('/my/absolute/path/myfile.json').then(df => df.show())
	     */

	  }, {
	    key: "fromJSON",
	    value: function fromJSON$$1() {
	      return fromJSON.apply(io, arguments).then(function (content) {
	        return new DataFrame(content);
	      });
	    }
	    /**
	     * Create a new DataFrame.
	     * @param {Array | Object | DataFrame} data The data of the DataFrame.
	     * @param {Array} columns The DataFrame column names.
	     * @param {Object} options Additional options. Example: modules.
	     * @example
	     * new DataFrame({
	     *      'column1': [3, 6, 8],
	     *      'column2': [3, 4, 5, 6],
	     * }, ['column1', 'column2'])
	     *
	     * new Data Frame([
	     *      [1, 6, 9, 10, 12],
	     *      [1, 2],
	     *      [6, 6, 9, 8, 9, 12],
	     * ], ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'])
	     *
	     * new DataFrame([
	     *      {c1: 1, c2: 6, c3: 9, c4: 10, c5: 12},
	     *      {c4: 1, c3: 2},
	     *      {c1: 6, c5: 6, c2: 9, c4: 8, c3: 9, c6: 12},
	     * ], ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'])
	     *
	     * new DataFrame(df);
	     *
	     * new DataFrame(yourData, yourColumns, {modules: [MyOwnModule, MyOtherModule]})
	     */

	  }]);

	  function DataFrame(data, columns) {
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    _classCallCheck(this, DataFrame);

	    var _this$_build = this._build(data, columns);

	    var _this$_build2 = _slicedToArray(_this$_build, 2);

	    this[__rows__] = _this$_build2[0];
	    this[__columns__$1] = _this$_build2[1];
	    this.options = options;
	    this.options.modules = [].concat(_toConsumableArray(DataFrame.defaultModules), _toConsumableArray(this.options.modules || []));
	    Object.assign.apply(Object, [this].concat(_toConsumableArray(this.__instanciateModules__(this.options.modules))));
	  }

	  _createClass(DataFrame, [{
	    key: Symbol.iterator,
	    value:
	    /*#__PURE__*/
	    regeneratorRuntime.mark(function value() {
	      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, row;

	      return regeneratorRuntime.wrap(function value$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              _iteratorNormalCompletion = true;
	              _didIteratorError = false;
	              _iteratorError = undefined;
	              _context.prev = 3;
	              _iterator = this[__rows__][Symbol.iterator]();

	            case 5:
	              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
	                _context.next = 12;
	                break;
	              }

	              row = _step.value;
	              _context.next = 9;
	              return row;

	            case 9:
	              _iteratorNormalCompletion = true;
	              _context.next = 5;
	              break;

	            case 12:
	              _context.next = 18;
	              break;

	            case 14:
	              _context.prev = 14;
	              _context.t0 = _context["catch"](3);
	              _didIteratorError = true;
	              _iteratorError = _context.t0;

	            case 18:
	              _context.prev = 18;
	              _context.prev = 19;

	              if (!_iteratorNormalCompletion && _iterator.return != null) {
	                _iterator.return();
	              }

	            case 21:
	              _context.prev = 21;

	              if (!_didIteratorError) {
	                _context.next = 24;
	                break;
	              }

	              throw _iteratorError;

	            case 24:
	              return _context.finish(21);

	            case 25:
	              return _context.finish(18);

	            case 26:
	            case "end":
	              return _context.stop();
	          }
	        }
	      }, value, this, [[3, 14, 18, 26], [19,, 21, 25]]);
	    })
	  }, {
	    key: "_columnsAreEquals",
	    value: function _columnsAreEquals(columns) {
	      var columns2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this[__columns__$1];

	      for (var _i = 0, _Object$keys = Object.keys(columns); _i < _Object$keys.length; _i++) {
	        var key = _Object$keys[_i];
	        if (columns[key] !== columns2[key]) return false;
	      }

	      return true;
	    }
	  }, {
	    key: "__newInstance__",
	    value: function __newInstance__(data, columns) {
	      if (!this._columnsAreEquals(columns) || !(data[0] instanceof Row)) {
	        return new DataFrame(data, columns, this.options);
	      }

	      var firstRowColumns = Object.keys(data[0].toDict());

	      if (!arrayEqual(firstRowColumns, this[__columns__$1], true)) {
	        return new DataFrame(data, firstRowColumns, this.options);
	      }

	      var newInstance = new DataFrame([], [], this.options);
	      newInstance[__rows__] = _toConsumableArray(data);
	      newInstance[__columns__$1] = _toConsumableArray(columns);
	      return newInstance;
	    }
	  }, {
	    key: "__instanciateModules__",
	    value: function __instanciateModules__(modules) {
	      var _this = this;

	      var df = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
	      return modules.map(function (Plugin) {
	        var pluginInstance = new Plugin(df ? df : _this);
	        return _defineProperty({}, pluginInstance.name, pluginInstance);
	      });
	    }
	  }, {
	    key: "_build",
	    value: function _build(data, columns) {
	      if (data instanceof DataFrame) {
	        return this._fromArray(Array.from(data[__rows__]), columns || data[__columns__$1]);
	      }

	      if (data instanceof Array && data.length > 0) {
	        return this._fromArray(data, columns || Array.from(new Set(data.slice(0, 10).concat(data.slice(-10, -1)).map(function (row) {
	          return Object.keys(row);
	        }).reduce(function (p, n) {
	          return p.concat(n);
	        }))));
	      }

	      if (data instanceof Array && data.length === 0) {
	        return this._fromArray(data, columns ? columns : []);
	      }

	      if (data instanceof Object) {
	        return this._fromDict(data, columns || Object.keys(data));
	      }

	      throw new ArgumentTypeError(data, "DataFrame | Array | Object");
	    }
	  }, {
	    key: "_fromDict",
	    value: function _fromDict(dict, columns) {
	      return [transpose(Object.values(dict)).map(function (row) {
	        return new Row(row, columns);
	      }), columns];
	    }
	  }, {
	    key: "_fromArray",
	    value: function _fromArray(array, columns) {
	      return [array.map(function (row) {
	        return new Row(row, columns);
	      }), columns];
	    }
	  }, {
	    key: "_joinByType",
	    value: function _joinByType(gdf1, gdf2, type, newColumns) {
	      var _this2 = this;

	      var gdf2Hashs = gdf2.listHashs();
	      return gdf1.toCollection().map(function (_ref2) {
	        var group = _ref2.group,
	            hash = _ref2.hash;
	        var isContained = gdf2Hashs.includes(hash);
	        var modifiedGroup = group;

	        if (gdf2.get(hash)) {
	          var gdf2Collection = gdf2.get(hash).group.toCollection();
	          var combinedGroup = group.toCollection().map(function (row) {
	            return gdf2Collection.map(function (row2) {
	              return Object.assign({}, row2, row);
	            });
	          }).reduce(function (p, n) {
	            return [].concat(_toConsumableArray(p), _toConsumableArray(n));
	          }, []);
	          modifiedGroup = _this2.__newInstance__(combinedGroup, newColumns);
	        }

	        var filterCondition = function filterCondition(bool) {
	          return bool ? modifiedGroup : false;
	        };

	        if (type === "full") return modifiedGroup;
	        return type === "out" ? filterCondition(!isContained) : filterCondition(isContained);
	      }).filter(function (group) {
	        return group;
	      });
	    }
	  }, {
	    key: "_join",
	    value: function _join(dfToJoin, columnNames, types) {
	      if (!(dfToJoin instanceof DataFrame)) throw new ArgumentTypeError(dfToJoin, "DataFrame");

	      var newColumns = _toConsumableArray(new Set([].concat(_toConsumableArray(this.listColumns()), _toConsumableArray(dfToJoin.listColumns()))));

	      var columns = Array.isArray(columnNames) ? columnNames : [columnNames];
	      var gdf = this.groupBy.apply(this, _toConsumableArray(columns));
	      var gdfToJoin = dfToJoin.groupBy.apply(dfToJoin, _toConsumableArray(columns));
	      return [this.__newInstance__([], newColumns)].concat(_toConsumableArray(iter([].concat(_toConsumableArray(types[0] ? this._joinByType(gdf, gdfToJoin, types[0], newColumns) : []), _toConsumableArray(types[1] ? this._joinByType(gdfToJoin, gdf, types[1], newColumns) : [])), function (group) {
	        return group.restructure(newColumns);
	      }))).reduce(function (p, n) {
	        return p.union(n);
	      }).dropDuplicates();
	    }
	  }, {
	    key: "_cleanSavePath",
	    value: function _cleanSavePath(path) {
	      return path.replace("file://", "/");
	    }
	    /**
	     * Convert the DataFrame into a text delimiter separated values. You can also save the file if you are using nodejs.
	     * @param {String} [sep=' '] Column separator.
	     * @param {Boolean} [header=true] Writing the header in the first line. If false, there will be no header.
	     * @param {String} [path] The path to save the file. /!\ Works only on node.js, not into the browser.
	     * @returns {String} The text file in raw string.
	     * @example
	     * df.toDSV()
	     * df.toDSV(';')
	     * df.toDSV(';', true)
	     * // From node.js only
	     * df.toDSV(';', true, '/my/absolute/path/dataframe.txt')
	     */

	  }, {
	    key: "toDSV",
	    value: function toDSV$$1() {
	      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      return toDSV.apply(io, [this].concat(args));
	    }
	    /**
	     * Convert the DataFrame into a comma separated values string. You can also save the file if you are using nodejs.
	     * @param {Boolean} [header=true] Writing the header in the first line. If false, there will be no header.
	     * @param {String} [path] The path to save the file. /!\ Works only on node.js, not into the browser.
	     * @returns {String} The csv file in raw string.
	     * @example
	     * df.toCSV()
	     * df.toCSV(true)
	     * // From node.js only
	     * df.toCSV(true, '/my/absolute/path/dataframe.csv')
	     */

	  }, {
	    key: "toCSV",
	    value: function toCSV$$1() {
	      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	      }

	      return toCSV.apply(io, [this].concat(args));
	    }
	    /**
	     * Convert the DataFrame into a tab separated values string. You can also save the file if you are using nodejs.
	     * @param {Boolean} [header=true] Writing the header in the first line. If false, there will be no header.
	     * @param {String} [path] The path to save the file. /!\ Works only on node.js, not into the browser.
	     * @returns {String} The csv file in raw string.
	     * @example
	     * df.toCSV()
	     * df.toCSV(true)
	     * // From node.js only
	     * df.toCSV(true, '/my/absolute/path/dataframe.csv')
	     */

	  }, {
	    key: "toTSV",
	    value: function toTSV$$1() {
	      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	        args[_key4] = arguments[_key4];
	      }

	      return toTSV.apply(io, [this].concat(args));
	    }
	    /**
	     * Convert the DataFrame into a pipe separated values string. You can also save the file if you are using nodejs.
	     * @param {Boolean} [header=true] Writing the header in the first line. If false, there will be no header.
	     * @param {String} [path] The path to save the file. /!\ Works only on node.js, not into the browser.
	     * @returns {String} The csv file in raw string.
	     * @example
	     * df.toPSV()
	     * df.toPSV(true)
	     * // From node.js only
	     * df.toPSV(true, '/my/absolute/path/dataframe.csv')
	     */

	  }, {
	    key: "toPSV",
	    value: function toPSV$$1() {
	      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	        args[_key5] = arguments[_key5];
	      }

	      return toPSV.apply(io, [this].concat(args));
	    }
	    /**
	     * Convert the DataFrame into a text delimiter separated values. Alias for .toDSV. You can also save the file if you are using nodejs.
	     * @param {String} [sep=' '] Column separator.
	     * @param {Boolean} [header=true] Writing the header in the first line. If false, there will be no header.
	     * @param {String} [path] The path to save the file. /!\ Works only on node.js, not into the browser.
	     * @returns {String} The text file in raw string.
	     * @example
	     * df.toText()
	     * df.toText(';')
	     * df.toText(';', true)
	     * // From node.js only
	     * df.toText(';', true, '/my/absolute/path/dataframe.txt')
	     */

	  }, {
	    key: "toText",
	    value: function toText$$1() {
	      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	        args[_key6] = arguments[_key6];
	      }

	      return toText.apply(io, [this].concat(args));
	    }
	    /**
	     * Convert the DataFrame into a json string. You can also save the file if you are using nodejs.
	     * @param {Boolean} [asCollection=false] Writing the JSON as collection of Object.
	     * @param {String} [path] The path to save the file. /!\ Works only on node.js, not into the browser.
	     * @returns {String} The json file in raw string.
	     * @example
	     * df.toJSON()
	     * // From node.js only
	     * df.toJSON('/my/absolute/path/dataframe.json')
	     */

	  }, {
	    key: "toJSON",
	    value: function toJSON$$1() {
	      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
	        args[_key7] = arguments[_key7];
	      }

	      return toJSON.apply(io, [this].concat(args));
	    }
	    /**
	     * Convert DataFrame into dict / hash / object.
	     * @returns {Object} The DataFrame converted into dict.
	     * @example
	     * df.toDict()
	     */

	  }, {
	    key: "toDict",
	    value: function toDict() {
	      var _this3 = this;

	      return Object.assign.apply(Object, [{}].concat(_toConsumableArray(Object.entries(this.transpose().toArray()).map(function (_ref3) {
	        var _ref4 = _slicedToArray(_ref3, 2),
	            index = _ref4[0],
	            column = _ref4[1];

	        return _defineProperty({}, _this3[__columns__$1][index], column);
	      }))));
	    }
	    /**
	     * Convert DataFrame into Array of Arrays. You can also extract only one column as Array.
	     * @param {String} [columnName] Column Name to extract. By default, all columns are transformed.
	     * @returns {Array} The DataFrame (or the column) converted into Array.
	     * @example
	     * df.toArray()
	     */

	  }, {
	    key: "toArray",
	    value: function toArray(columnName) {
	      return columnName ? Array.from(this).map(function (row) {
	        return row.get(columnName);
	      }) : Array.from(this).map(function (row) {
	        return row.toArray();
	      });
	    }
	    /**
	     * Convert DataFrame into Array of dictionnaries. You can also return Rows instead of dictionnaries.
	     * @param {Boolean} [ofRows] Return a collection of Rows instead of dictionnaries.
	     * @returns {Array} The DataFrame converted into Array of dictionnaries (or Rows).
	     * @example
	     * df.toCollection()
	     */

	  }, {
	    key: "toCollection",
	    value: function toCollection(ofRows) {
	      return ofRows ? Array.from(this) : Array.from(this).map(function (row) {
	        return row.toDict();
	      });
	    }
	    /**
	     * Display the DataFrame as String Table. Can only return a sring instead of displaying the DataFrame.
	     * @param {Number} [rows=10] The number of lines to display.
	     * @param {Boolean} [quiet=false] Quiet mode. If true, only returns a string instead of console.log().
	     * @returns {String} The DataFrame as String Table.
	     * @example
	     * df.show()
	     * df.show(10)
	     * const stringDF = df.show(10, true)
	     */

	  }, {
	    key: "show",
	    value: function show() {
	      var rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
	      var quiet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	      var makeRow = function makeRow(row) {
	        return "| ".concat(row.map(function (column) {
	          var columnAsString = String(column);
	          return columnAsString.length > 9 ? columnAsString.substring(0, 6) + "..." : columnAsString + Array(10 - columnAsString.length).join(" ");
	        }).join(" | "), " |");
	      };

	      var header = makeRow(this[__columns__$1]);
	      var token = 0;
	      var toShow = [header, Array(header.length).join("-")].concat(_toConsumableArray(iter(this[__rows__], function (row) {
	        token++;
	        return makeRow(row.toArray());
	      }, function () {
	        return token >= rows;
	      }))).join("\n");

	      if (!quiet) {
	        console.log(toShow);
	      }

	      return toShow;
	    }
	    /**
	     * Get the DataFrame dimensions.
	     * @returns {Array} The DataFrame dimensions. [height, weight]
	     * @example
	     * const [height, weight] = df.dim()
	     */

	  }, {
	    key: "dim",
	    value: function dim() {
	      return [this.count(), this[__columns__$1].length];
	    }
	    /**
	     * Transpose a DataFrame. Rows become columns and conversely. n x p => p x n.
	     * @param {Boolean} [transposeColumnNames=false] An option to transpose columnNames in a rowNames column.
	     * @returns {ÐataFrame} A new transposed DataFrame.
	     * @example
	     * df.transpose()
	     */

	  }, {
	    key: "transpose",
	    value: function transpose$$1(tranposeColumnNames) {
	      var newColumns = [].concat(_toConsumableArray(tranposeColumnNames ? ["rowNames"] : []), _toConsumableArray(_toConsumableArray(Array(this.count()).keys()).reverse()));

	      var transposedRows = transpose((tranposeColumnNames ? this.push(this[__columns__$1]) : this).toArray());

	      return this.__newInstance__(transposedRows, newColumns.reverse()).restructure(newColumns);
	    }
	    /**
	     * Get the rows number.
	     * @returns {Int} The number of DataFrame rows.
	     * @example
	     * df.count()
	     */

	  }, {
	    key: "count",
	    value: function count() {
	      return this[__rows__].length;
	    }
	    /**
	     * Get the count of a value into a column.
	     * @param valueToCount The value to count into the selected column.
	     * @param {String} [columnName=this.listColumns()[0]] The column to count the value.
	     * @returns {Int} The number of times the selected value appears.
	     * @example
	     * df.countValue(5, 'column2')
	     * df.select('column1').countValue(5)
	     */

	  }, {
	    key: "countValue",
	    value: function countValue(valueToCount) {
	      var columnName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this[__columns__$1][0];
	      return this.filter(function (row) {
	        return row.get(columnName) === valueToCount;
	      }).count();
	    }
	    /**
	     * Push new rows into the DataFrame.
	     * @param {Array | Row} rows The rows to add.
	     * @returns {DataFrame} A new DataFrame with the new rows.
	     * @example
	     * df.push([1,2,3], [1,4,9])
	     */

	  }, {
	    key: "push",
	    value: function push() {
	      for (var _len8 = arguments.length, rows = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
	        rows[_key8] = arguments[_key8];
	      }

	      return this.union(new DataFrame(rows, this[__columns__$1]));
	    }
	    /**
	     * Replace a value by another in all the DataFrame or in a column.
	     * @param value The value to replace.
	     * @param replacement The new value.
	     * @param {String | Array} [columnNames=this.listColumns()] The columns to apply the replacement.
	     * @returns {DataFrame} A new DataFrame with replaced values.
	     * @example
	     * df.replace(undefined, 0, 'column1', 'column2')
	     */

	  }, {
	    key: "replace",
	    value: function replace(value, replacement, columnNames) {
	      var _this4 = this;

	      var columns = columnNames && columnNames.length > 0 ? columnNames : this[__columns__$1];
	      var values = Array.isArray(value) ? value : [value];
	      return this.map(function (row) {
	        return (columns.length > 0 ? columns : _this4[__columns__$1]).reduce(function (p, n) {
	          return values.includes(p.get(n)) ? p.set(n, replacement) : p;
	        }, row);
	      });
	    }
	    /**
	     * Compute unique values into a column.
	     * @param {String} columnName The column to distinct.
	     * @returns {DataFrame} A DataFrame containing the column with distinct values.
	     * @example
	     * df.distinct('column1')
	     */

	  }, {
	    key: "distinct",
	    value: function distinct(columnName) {
	      return this.__newInstance__(_defineProperty({}, columnName, _toConsumableArray(new Set(this.toArray(columnName)))), [columnName]);
	    }
	    /**
	     * Compute unique values into a column.
	     * Alias from .distinct()
	     * @param {String} columnName The column to distinct.
	     * @returns {DataFrame} A DataFrame containing the column with distinct values.
	     * @example
	     * df.unique('column1')
	     */

	  }, {
	    key: "unique",
	    value: function unique(columnName) {
	      return this.distinct(columnName);
	    }
	    /**
	     * List DataFrame columns.
	     * @returns {Array} An Array containing DataFrame columnNames.
	     * @example
	     * df.listColumns()
	     */

	  }, {
	    key: "listColumns",
	    value: function listColumns() {
	      return _toConsumableArray(this[__columns__$1]);
	    }
	    /**
	     * Select columns in the DataFrame.
	     * @param {...String} columnNames The columns to select.
	     * @returns {DataFrame} A new DataFrame containing selected columns.
	     * @example
	     * df.select('column1', 'column3')
	     */

	  }, {
	    key: "select",
	    value: function select() {
	      for (var _len9 = arguments.length, columnNames = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
	        columnNames[_key9] = arguments[_key9];
	      }

	      return this.__newInstance__(this[__rows__].map(function (row) {
	        return row.select.apply(row, columnNames);
	      }), columnNames);
	    }
	    /**
	     * Add a new column or set an existing one.
	     * @param {String} columnName The column to modify or to create.
	     * @param {Function} [func=(row, index) => undefined] The function to create the column.
	     * @returns {DataFrame} A new DataFrame containing the new or modified column.
	     * @example
	     * df.withColumn('column4', () => 2)
	     * df.withColumn('column2', (row) => row.get('column2') * 2)
	     */

	  }, {
	    key: "withColumn",
	    value: function withColumn(columnName) {
	      var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
	        return undefined;
	      };
	      return this.__newInstance__(this[__rows__].map(function (row, index) {
	        return row.set(columnName, func(row, index));
	      }), this[__columns__$1].includes(columnName) ? this[__columns__$1] : [].concat(_toConsumableArray(this[__columns__$1]), [columnName]));
	    }
	    /**
	     * Modify the structure of the DataFrame by changing columns order, creating new columns or removing some columns.
	     * @param {Array} newColumnNames The new columns of the DataFrame.
	     * @returns {DataFrame} A new DataFrame with restructured columns (renamed, add or deleted).
	     * @example
	     * df.restructure(['column1', 'column4', 'column2', 'column3'])
	     * df.restructure(['column1', 'column4'])
	     * df.restructure(['column1', 'newColumn', 'column4'])
	     */

	  }, {
	    key: "restructure",
	    value: function restructure(newColumnNames) {
	      return this.__newInstance__(this[__rows__], newColumnNames);
	    }
	    /**
	     * Rename each column.
	     * @param {Array} newColumnNames The new column names of the DataFrame.
	     * @returns {DataFrame} A new DataFrame with the new column names.
	     * @example
	     * df.renameAll(['column1', 'column3', 'column4'])
	     */

	  }, {
	    key: "renameAll",
	    value: function renameAll(newColumnNames) {
	      if (newColumnNames.length !== this[__columns__$1].length) {
	        throw new WrongSchemaError(newColumnNames, this[__columns__$1]);
	      }

	      return this.__newInstance__(this.toArray(), newColumnNames);
	    }
	    /**
	     * Rename a column.
	     * @param {String} columnName The column to rename.
	     * @param {String} replacement The new name for the column.
	     * @returns {DataFrame} A new DataFrame with the new column name.
	     * @example
	     * df.rename('column1', 'columnRenamed')
	     */

	  }, {
	    key: "rename",
	    value: function rename(columnName, replacement) {
	      var newColumnNames = this[__columns__$1].map(function (column) {
	        return column === columnName ? replacement : column;
	      });

	      return this.renameAll(newColumnNames);
	    }
	    /**
	     * Cast each column into a given type.
	     * @param {Array} typeFunctions The functions used to cast columns.
	     * @returns {DataFrame} A new DataFrame with the columns having new types.
	     * @example
	     * df.castAll([Number, String, (val) => new CustomClass(val)])
	     */

	  }, {
	    key: "castAll",
	    value: function castAll(typeFunctions) {
	      var _this5 = this;

	      if (typeFunctions.length !== this[__columns__$1].length) {
	        throw new WrongSchemaError(typeFunctions, this[__columns__$1]);
	      }

	      return this.map(function (row) {
	        return new Row(row.toArray().map(function (column, index) {
	          return typeFunctions[index](column);
	        }), _this5[__columns__$1]);
	      });
	    }
	    /**
	     * Cast a column into a given type.
	     * @param {String} columnName The column to cast.
	     * @param {Function} ObjectType The function used to cast the column.
	     * @returns {DataFrame} A new DataFrame with the column having a new type.
	     * @example
	     * df.cast('column1', Number)
	     * df.cast('column1', (val) => new MyCustomClass(val))
	     */

	  }, {
	    key: "cast",
	    value: function cast(columnName, typeFunction) {
	      return this.withColumn(columnName, function (row) {
	        return typeFunction(row.get(columnName));
	      });
	    }
	    /**
	     * Remove a single column.
	     * @param {String} columnName The column to drop.
	     * @returns {DataFrame} A new DataFrame without the dropped column.
	     * @example
	     * df.drop('column2')
	     */

	  }, {
	    key: "drop",
	    value: function drop(columnName) {
	      return this.__newInstance__(this[__rows__].map(function (row) {
	        return row.delete(columnName);
	      }), this[__columns__$1].filter(function (column) {
	        return column !== columnName;
	      }));
	    }
	    /**
	     * Chain maps and filters functions on DataFrame by optimizing their executions.
	     * If a function returns boolean, it's a filter. Else it's a map.
	     * It can be 10 - 100 x faster than standard chains of .map() and .filter().
	     * @param {...Function} funcs Functions to apply on the DataFrame rows taking the row as parameter.
	     * @returns {DataFrame} A new DataFrame with modified rows.
	     * @example
	     * df.chain(
	     *      row => row.get('column1') > 3, // filter
	     *      row => row.set('column1', 3),  // map
	     *      row => row.get('column2') === '5' // filter
	     * )
	     */

	  }, {
	    key: "chain",
	    value: function chain$$1() {
	      for (var _len10 = arguments.length, funcs = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
	        funcs[_key10] = arguments[_key10];
	      }

	      return this.__newInstance__(_toConsumableArray(chain.apply(void 0, [this[__rows__]].concat(funcs))), this[__columns__$1]);
	    }
	    /**
	     * Filter DataFrame rows.
	     * @param {Function | Object} condition A filter function or a column/value object.
	     * @returns {DataFrame} A new filtered DataFrame.
	     * @example
	     * df.filter(row => row.get('column1') >= 3)
	     * df.filter({'column2': 5, 'column1': 3}))
	     */

	  }, {
	    key: "filter",
	    value: function filter(condition) {
	      var func = _typeof(condition) === "object" ? function (row) {
	        return Object.entries(condition).map(function (_ref6) {
	          var _ref7 = _slicedToArray(_ref6, 2),
	              column = _ref7[0],
	              value = _ref7[1];

	          return Object.is(row.get(column), value);
	        }).reduce(function (p, n) {
	          return p && n;
	        });
	      } : condition;
	      var filteredRows = iter(this[__rows__], function (row, i) {
	        return func(row, i) ? row : false;
	      });
	      return this.__newInstance__(filteredRows, this[__columns__$1]);
	    }
	    /**
	     * Filter DataFrame rows.
	     * Alias of .filter()
	     * @param {Function | Object} condition A filter function or a column/value object.
	     * @returns {DataFrame} A new filtered DataFrame.
	     * @example
	     * df.where(row => row.get('column1') >= 3)
	     * df.where({'column2': 5, 'column1': 3}))
	     */

	  }, {
	    key: "where",
	    value: function where(condition) {
	      return this.filter(condition);
	    }
	    /**
	     * Find a row (the first met) based on a condition.
	     * @param {Function | Object} condition A filter function or a column/value object.
	     * @returns {Row} The targeted Row.
	     * @example
	     * df.find(row => row.get('column1') === 3)
	     * df.find({'column1': 3})
	     */

	  }, {
	    key: "find",
	    value: function find(condition) {
	      return this.filter(condition)[__rows__][0];
	    }
	    /**
	     * Map on DataFrame rows. /!\ Prefer to use .chain().
	     * @param {Function} func A function to apply on each row taking the row as parameter.
	     * @returns {DataFrame} A new DataFrame with modified rows.
	     * @example
	     * df.map(row => row.set('column1', row.get('column1') * 2))
	     */

	  }, {
	    key: "map",
	    value: function map(func) {
	      return this.__newInstance__(iter(this[__rows__], function (row, i) {
	        return func(row, i);
	      }), this[__columns__$1]);
	    }
	    /**
	     * Reduce DataFrame into a value.
	     * @param {Function} func The reduce function taking 2 parameters, previous and next.
	     * @param [init] The initial value of the reducer.
	     * @returns A reduced value.
	     * @example
	     * df.reduce((p, n) => n.get('column1') + p, 0)
	     * df2.reduce((p, n) => (
	     *          n.set('column1', p.get('column1') + n.get('column1'))
	     *           .set('column2', p.get('column2') + n.get('column2'))
	     * ))
	     */

	  }, {
	    key: "reduce",
	    value: function reduce(func, init) {
	      return typeof init === "undefined" ? this[__rows__].reduce(function (p, n) {
	        return func(p, n);
	      }) : this[__rows__].reduce(function (p, n) {
	        return func(p, n);
	      }, init);
	    }
	    /**
	     * Reduce DataFrame into a value, starting from the last row (see .reduce()).
	     * @param {Function} func The reduce function taking 2 parameters, previous and next.
	     * @param [init] The initial value of the reducer.
	     * @returns A reduced value.
	     * @example
	     * df.reduceRight((p, n) => p > n ? p : n, 0)
	     */

	  }, {
	    key: "reduceRight",
	    value: function reduceRight(func, init) {
	      return typeof init === "undefined" ? this[__rows__].reduceRight(function (p, n) {
	        return func(p, n);
	      }) : this[__rows__].reduceRight(function (p, n) {
	        return func(p, n);
	      }, init);
	    }
	    /**
	     * Return a DataFrame without duplicated columns.
	     * @param {...String} columnNames The columns used to check unicity of rows. If omitted, unicity is checked on all columns.
	     * @returns {DataFrame} A DataFrame without duplicated rows.
	     * @example
	     * df.dropDuplicates('id', 'name')
	     */

	  }, {
	    key: "dropDuplicates",
	    value: function dropDuplicates() {
	      for (var _len11 = arguments.length, columnNames = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
	        columnNames[_key11] = arguments[_key11];
	      }

	      var groupCols = columnNames && columnNames.length > 0 ? columnNames : this[__columns__$1];
	      return this.groupBy.apply(this, _toConsumableArray(groupCols)).filter(function (row, i) {
	        return i === 0;
	      });
	    }
	    /**
	     * Return a DataFrame without rows containing missing values (undefined, NaN, null).
	     * @param {Array} columnNames The columns to consider. All columns are considered by default.
	     * @returns {DataFrame} A DataFrame without rows containing missing values.
	     * @example
	     * df.dropMissingValues(['id', 'name'])
	     */

	  }, {
	    key: "dropMissingValues",
	    value: function dropMissingValues(columnNames) {
	      var cols = columnNames && columnNames.length > 0 ? columnNames : this[__columns__$1];
	      return this.filter(function (row) {
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;

	        try {
	          for (var _iterator2 = cols[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var col = _step2.value;

	            if ([NaN, undefined, null].includes(row.get(col))) {
	              return false;
	            }
	          }
	        } catch (err) {
	          _didIteratorError2 = true;
	          _iteratorError2 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
	              _iterator2.return();
	            }
	          } finally {
	            if (_didIteratorError2) {
	              throw _iteratorError2;
	            }
	          }
	        }

	        return true;
	      });
	    }
	    /**
	     * Return a DataFrame with missing values (undefined, NaN, null) fill with default value.
	     * @param replacement The new value.
	     * @param {Array} columnNames The columns to consider. All columns are considered by default.
	     * @returns {DataFrame} A DataFrame with missing values replaced.
	     * @example
	     * df.fillMissingValues(0, ['id', 'name'])
	     */

	  }, {
	    key: "fillMissingValues",
	    value: function fillMissingValues(replacement, columnNames) {
	      return this.replace([NaN, undefined, null], replacement, columnNames);
	    }
	    /**
	     * Return a shuffled DataFrame rows.
	     * @returns {DataFrame} A shuffled DataFrame.
	     * @example
	     * df.shuffle()
	     */

	  }, {
	    key: "shuffle",
	    value: function shuffle() {
	      if (this.count() < 2) return this;
	      return this.__newInstance__(this.reduce(function (p, n) {
	        var index = Math.floor(Math.random() * (p.length - 1) + 1);
	        return Array.isArray(p) ? [].concat(_toConsumableArray(p.slice(index, p.length + 1)), [n], _toConsumableArray(p.slice(0, index))) : [p, n];
	      }), this[__columns__$1]);
	    }
	    /**
	     * Return a random sample of rows.
	     * @param {Number} percentage A percentage of the orignal DataFrame giving the sample size.
	     * @returns {DataFrame} A sample DataFrame
	     * @example
	     * df.sample(0.3)
	     */

	  }, {
	    key: "sample",
	    value: function sample(percentage) {
	      var nRows = this.count() * percentage;
	      var token = 0;
	      return this.__newInstance__(iter(this.shuffle()[__rows__], function (row) {
	        token++;
	        return row;
	      }, function () {
	        return token >= nRows;
	      }), this[__columns__$1]);
	    }
	    /**
	     * Randomly split a DataFrame into 2 DataFrames.
	     * @param {Number} percentage A percentage of the orignal DataFrame giving the first DataFrame size. The second takes the rest.
	     * @returns {Array} An Array containing the two DataFrames. First, the X% DataFrame then the rest DataFrame.
	     * @example
	     * const [30DF, 70DF] = df.bisect(0.3)
	     */

	  }, {
	    key: "bisect",
	    value: function bisect(percentage) {
	      var nRows = this.count() * percentage;
	      var token = 0;
	      var restRows = [];
	      return [this.__newInstance__(iter(this.shuffle()[__rows__], function (row) {
	        if (token < nRows) {
	          token++;
	          return row;
	        }

	        restRows.push(row);
	      }), this[__columns__$1]), this.__newInstance__(restRows, this[__columns__$1])];
	    }
	    /**
	     * Group DataFrame rows by columns giving a GroupedDataFrame object. See its doc for more examples.
	     * @param {...String} columnNames The columns used for the groupBy.
	     * @returns {GroupedDataFrame} A GroupedDataFrame object.
	     * @example
	     * df.groupBy('column1')
	     * df.groupBy('column1', 'column2')
	     * df.groupBy('column1', 'column2').listGroups()
	     * df.groupBy('column1', 'column2').show()
	     * df.groupBy('column1', 'column2').aggregate((group) => group.count())
	     */

	  }, {
	    key: "groupBy",
	    value: function groupBy$$1() {
	      for (var _len12 = arguments.length, args = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
	        args[_key12] = arguments[_key12];
	      }

	      return groupBy(this, args);
	    }
	    /**
	     * Sort DataFrame rows based on column values. The row should contains only one variable type. Columns are sorted left-to-right.
	     * @param {String | Array<string>} columnNames The columns giving order.
	     * @param {Boolean} [reverse=false] Reverse mode. Reverse the order if true.
	     * @param {String} [missingValuesPosition='first'] Define the position of missing values (undefined, nulls and NaN) in the order.
	     * @returns {DataFrame} An ordered DataFrame.
	     * @example
	     * df.sortBy('id')
	     * df.sortBy(['id1', 'id2'])
	     * df.sortBy(['id1'], true)
	     */

	  }, {
	    key: "sortBy",
	    value: function sortBy(columnNames) {
	      var reverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	      var missingValuesPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "first";

	      if (!Array.isArray(columnNames)) {
	        columnNames = [columnNames];
	      }

	      var _columnNames = columnNames;

	      var _missingValuesPosition = ["first", "last"].includes(missingValuesPosition) ? missingValuesPosition : "first";

	      var _checkMissingValue = function _checkMissingValue(v) {
	        return [NaN, null, undefined].includes(v);
	      };

	      var sortedRows = this[__rows__].sort(function (p, n) {
	        return _columnNames.map(function (col) {
	          var _ref8 = [p.get(col), n.get(col)],
	              pValue = _ref8[0],
	              nValue = _ref8[1];

	          if (_checkMissingValue(pValue)) {
	            return _missingValuesPosition === "last" ? 1 : -1;
	          } else if (_checkMissingValue(nValue)) {
	            return _missingValuesPosition === "last" ? -1 : 1;
	          } else if (_typeof(pValue) !== _typeof(nValue)) {
	            throw new MixedTypeError([_typeof(pValue), _typeof(nValue)]);
	          } else if (pValue > nValue) {
	            return reverse ? -1 : 1;
	          } else if (pValue < nValue) {
	            return reverse ? 1 : -1;
	          }

	          return 0;
	        }).reduce(function (acc, curr) {
	          return acc || curr;
	        });
	      });

	      if (_columnNames.length > 1) {
	        var sortedRowsWithMissingValues = [];
	        var sortedRowsWithoutMissingValues = [];
	        sortedRows.forEach(function (row) {
	          var _iteratorNormalCompletion3 = true;
	          var _didIteratorError3 = false;
	          var _iteratorError3 = undefined;

	          try {
	            for (var _iterator3 = _columnNames[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	              var col = _step3.value;

	              if (_checkMissingValue(row.get(col))) {
	                sortedRowsWithMissingValues.push(row);
	                return;
	              }
	            }
	          } catch (err) {
	            _didIteratorError3 = true;
	            _iteratorError3 = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
	                _iterator3.return();
	              }
	            } finally {
	              if (_didIteratorError3) {
	                throw _iteratorError3;
	              }
	            }
	          }

	          sortedRowsWithoutMissingValues.push(row);
	        });
	        return this.__newInstance__(missingValuesPosition === "last" ? sortedRowsWithoutMissingValues.concat(sortedRowsWithMissingValues) : sortedRowsWithMissingValues.concat(sortedRowsWithoutMissingValues), this[__columns__$1]);
	      }

	      return this.__newInstance__(sortedRows, this[__columns__$1]);
	    }
	    /**
	     * Concat two DataFrames.
	     * @param {DataFrame} dfToUnion The DataFrame to concat.
	     * @returns {DataFrame} A new concatenated DataFrame resulting of the union.
	     * @example
	     * df.union(df2)
	     */

	  }, {
	    key: "union",
	    value: function union(dfToUnion) {
	      if (!(dfToUnion instanceof DataFrame)) throw new ArgumentTypeError(dfToUnion, "DataFrame");

	      if (!arrayEqual(this[__columns__$1], dfToUnion[__columns__$1])) {
	        throw new WrongSchemaError(dfToUnion[__columns__$1], this[__columns__$1]);
	      }

	      return this.__newInstance__([].concat(_toConsumableArray(this), _toConsumableArray(dfToUnion.restructure(this[__columns__$1]))), this[__columns__$1]);
	    }
	    /**
	     * Join two DataFrames.
	     * @param {DataFrame} dfToJoin The DataFrame to join.
	     * @param {String | Array} columnNames The selected columns for the join.
	     * @param {String} [how='inner'] The join mode. Can be: full, inner, outer, left, right.
	     * @returns {DataFrame} The joined DataFrame.
	     * @example
	     * df.join(df2, 'column1', 'full')
	     */

	  }, {
	    key: "join",
	    value: function join(dfToJoin, columnNames) {
	      var _this6 = this;

	      var how = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "inner";
	      var joinMethods = {
	        inner: function inner() {
	          return _this6.innerJoin(dfToJoin, columnNames);
	        },
	        full: function full() {
	          return _this6.fullJoin(dfToJoin, columnNames);
	        },
	        outer: function outer() {
	          return _this6.outerJoin(dfToJoin, columnNames);
	        },
	        left: function left() {
	          return _this6.leftJoin(dfToJoin, columnNames);
	        },
	        right: function right() {
	          return _this6.rightJoin(dfToJoin, columnNames);
	        }
	      };
	      return joinMethods[how]();
	    }
	    /**
	     * Join two DataFrames with inner mode.
	     * @param {DataFrame} dfToJoin The DataFrame to join.
	     * @param {String | Array} columnNames The selected columns for the join.
	     * @returns {DataFrame} The joined DataFrame.
	     * @example
	     * df.innerJoin(df2, 'id')
	     * df.join(df2, 'id')
	     * df.join(df2, 'id', 'inner')
	     */

	  }, {
	    key: "innerJoin",
	    value: function innerJoin(dfToJoin, columnNames) {
	      return this._join(dfToJoin, columnNames, ["in"]);
	    }
	    /**
	     * Join two DataFrames with full mode.
	     * @param {DataFrame} dfToJoin The DataFrame to join.
	     * @param {String | Array} columnNames The selected columns for the join.
	     * @returns {DataFrame} The joined DataFrame.
	     * @example
	     * df.fullJoin(df2, 'id')
	     * df.join(df2, 'id', 'full')
	     */

	  }, {
	    key: "fullJoin",
	    value: function fullJoin(dfToJoin, columnNames) {
	      return this._join(dfToJoin, columnNames, ["full", "full"]);
	    }
	    /**
	     * Join two DataFrames with outer mode.
	     * @param {DataFrame} dfToJoin The DataFrame to join.
	     * @param {String | Array} columnNames The selected columns for the join.
	     * @returns {DataFrame} The joined DataFrame.
	     * @example
	     * df2.outerJoin(df2, 'id')
	     * df2.join(df2, 'id', 'outer')
	     */

	  }, {
	    key: "outerJoin",
	    value: function outerJoin(dfToJoin, columnNames) {
	      return this.fullJoin(dfToJoin, columnNames);
	    }
	    /**
	     * Join two DataFrames with left mode.
	     * @param {DataFrame} dfToJoin The DataFrame to join.
	     * @param {String | Array} columnNames The selected columns for the join.
	     * @returns {DataFrame} The joined DataFrame.
	     * @example
	     * df.leftJoin(df2, 'id')
	     * df.join(df2, 'id', 'left')
	     */

	  }, {
	    key: "leftJoin",
	    value: function leftJoin(dfToJoin, columnNames) {
	      return this._join(dfToJoin, columnNames, ["full", "in"]);
	    }
	    /**
	     * Join two DataFrames with right mode.
	     * @param {DataFrame} dfToJoin The DataFrame to join.
	     * @param {String | Array} columnNames The selected columns for the join.
	     * @returns {DataFrame} The joined DataFrame.
	     * @example
	     * df.rightJoin(df2, 'id')
	     * df.join(df2, 'id', 'right')
	     */

	  }, {
	    key: "rightJoin",
	    value: function rightJoin(dfToJoin, columnNames) {
	      return this._join(dfToJoin, columnNames, ["in", "full"]);
	    }
	    /**
	     * Find the differences between two DataFrames (reverse of join).
	     * @param {DataFrame} dfToDiff The DataFrame to diff.
	     * @param {String | Array} columnNames The selected columns for the diff.
	     * @returns {DataFrame} The differences DataFrame.
	     * @example
	     * df2.diff(df2, 'id')
	     */

	  }, {
	    key: "diff",
	    value: function diff(dfToDiff, columnNames) {
	      return this._join(dfToDiff, columnNames, ["out", "out"]);
	    }
	    /**
	     * Create a new subset DataFrame based on the first rows.
	     * @param {Number} [nRows=10] The number of first rows to get.
	     * @returns {DataFrame} The subset DataFrame.
	     * @example
	     * df2.head()
	     * df2.head(5)
	     */

	  }, {
	    key: "head",
	    value: function head() {
	      var nRows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
	      return this.slice(0, nRows);
	    }
	    /**
	     * Create a new subset DataFrame based on the last rows.
	     * @param {Number} [nRows=10] The number of last rows to get.
	     * @returns {DataFrame} The subset DataFrame.
	     * @example
	     * df2.tail()
	     * df2.tail(5)
	     */

	  }, {
	    key: "tail",
	    value: function tail() {
	      var nRows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
	      return this.slice(-nRows);
	    }
	    /**
	     * Create a new subset DataFrame based on given indexs. Similar to Array.slice.
	     * @param {Number} [startIndex=0] The index to start the slice (included).
	     * @param {Number} [endIndex=this.count()] The index to end the slice (excluded).
	     * @returns {DataFrame} The subset DataFrame.
	     * @example
	     * df2.slice()
	     * df2.slice(0)
	     * df2.slice(0, 20)
	     * df2.slice(10, 30)
	     */

	  }, {
	    key: "slice",
	    value: function slice(startIndex, endIndex) {
	      return this.__newInstance__(this[__rows__].slice(startIndex || undefined, endIndex || undefined), this[__columns__$1]);
	    }
	    /**
	     * Return a Row by its index.
	     * @param {Number} [index=0] The index to select the row.
	     * @returns {Row} The Row.
	     * @example
	     * df2.getRow(1)
	     */

	  }, {
	    key: "getRow",
	    value: function getRow(index) {
	      return this[__rows__][index];
	    }
	    /**
	     * Modify a Row a the given index.
	     * @param {Number} [index=0] The index to select the row.
	     * @returns {DataFrame} A new DataFrame with the modified Row.
	     * @example
	     * df2.setRowByIndex(1, row => row.set("column1", 33))
	     */

	  }, {
	    key: "setRow",
	    value: function setRow(index) {
	      var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (row) {
	        return row;
	      };
	      var newRows = Array.from(this[__rows__]);
	      newRows[index] = func(newRows[index]);
	      return this.__newInstance__(newRows, this[__columns__$1]);
	    }
	  }]);

	  return DataFrame;
	}();

	DataFrame.defaultModules = [];

	var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;
	var defineProperty$5 = objectDefineProperty.f;
	var trim$1 = stringTrim.trim;

	var NUMBER = 'Number';
	var NativeNumber = global_1[NUMBER];
	var NumberPrototype = NativeNumber.prototype;

	// Opera ~12 has broken Object#toString
	var BROKEN_CLASSOF = classofRaw(objectCreate(NumberPrototype)) == NUMBER;

	// `ToNumber` abstract operation
	// https://tc39.github.io/ecma262/#sec-tonumber
	var toNumber = function (argument) {
	  var it = toPrimitive(argument, false);
	  var first, third, radix, maxCode, digits, length, index, code;
	  if (typeof it == 'string' && it.length > 2) {
	    it = trim$1(it);
	    first = it.charCodeAt(0);
	    if (first === 43 || first === 45) {
	      third = it.charCodeAt(2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (it.charCodeAt(1)) {
	        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
	        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
	        default: return +it;
	      }
	      digits = it.slice(2);
	      length = digits.length;
	      for (index = 0; index < length; index++) {
	        code = digits.charCodeAt(index);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	// `Number` constructor
	// https://tc39.github.io/ecma262/#sec-number-constructor
	if (isForced_1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
	  var NumberWrapper = function Number(value) {
	    var it = arguments.length < 1 ? 0 : value;
	    var dummy = this;
	    return dummy instanceof NumberWrapper
	      // check on 1..constructor(foo) case
	      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classofRaw(dummy) != NUMBER)
	        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
	  };
	  for (var keys$2 = descriptors ? getOwnPropertyNames(NativeNumber) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES2015 (in case, if modules with ES2015 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), j = 0, key; keys$2.length > j; j++) {
	    if (has(NativeNumber, key = keys$2[j]) && !has(NumberWrapper, key)) {
	      defineProperty$5(NumberWrapper, key, getOwnPropertyDescriptor$3(NativeNumber, key));
	    }
	  }
	  NumberWrapper.prototype = NumberPrototype;
	  NumberPrototype.constructor = NumberWrapper;
	  redefine(global_1, NUMBER, NumberWrapper);
	}

	// `Number.isNaN` method
	// https://tc39.github.io/ecma262/#sec-number.isnan
	_export({ target: 'Number', stat: true }, {
	  isNaN: function isNaN(number) {
	    // eslint-disable-next-line no-self-compare
	    return number != number;
	  }
	});

	/**
	 * Stat module for DataFrame, providing basic statistical metrics for numeric columns.
	 */

	var Stat =
	/*#__PURE__*/
	function () {
	  /**
	   * Start the Stat module.
	   * @param {DataFrame} df An instance of DataFrame.
	   */
	  function Stat(df) {
	    _classCallCheck(this, Stat);

	    this.df = df;
	    this.name = "stat";
	  }

	  _createClass(Stat, [{
	    key: "_castAsNumber",
	    value: function _castAsNumber(columnName) {
	      return this.df.withColumn(columnName, function (row) {
	        return Number(row.get(columnName));
	      }).filter(function (row) {
	        return !Number.isNaN(row.get(columnName));
	      });
	    }
	    /**
	     * Compute the sum of a numeric column.
	     * @param {String} columnName The column to evaluate, containing Numbers.
	     * @returns {Number} The sum of the column.
	     * @example
	     * df.stat.sum('column1')
	     */

	  }, {
	    key: "sum",
	    value: function sum(columnName) {
	      return Number(this.df.reduce(function (p, n) {
	        return isNumber(n.get(columnName)) ? p + Number(n.get(columnName)) : p;
	      }, 0));
	    }
	    /**
	     * Compute the maximal value into a numeric column.
	     * @param {String} columnName The column to evaluate, containing Numbers.
	     * @returns {Number} The maximal value into the column.
	     * @example
	     * df.stat.max('column1')
	     */

	  }, {
	    key: "max",
	    value: function max(columnName) {
	      return this._castAsNumber(columnName).reduce(function (p, n) {
	        return n.get(columnName) > p.get(columnName) ? n : p;
	      }).get(columnName);
	    }
	    /**
	     * Compute the minimal value into a numeric column.
	     * @param {String} columnName The column to evaluate, containing Numbers.
	     * @returns {Number} The minimal value into the column.
	     * @example
	     * df.stat.min('column1')
	     */

	  }, {
	    key: "min",
	    value: function min(columnName) {
	      return this._castAsNumber(columnName).reduce(function (p, n) {
	        return p.get(columnName) > n.get(columnName) ? n : p;
	      }).get(columnName);
	    }
	    /**
	     * Compute the mean value into a numeric column.
	     * @param {String} columnName The column to evaluate,isNumber(n.get(columnName)) ? p + Number( containing Numbers.
	     * @returns {Number} The mean value into the column.
	     * @example
	     * df.stat.mean('column1')
	     */

	  }, {
	    key: "mean",
	    value: function mean(columnName) {
	      var numericDF = this.df.filter(function (row) {
	        return isNumber(row.get(columnName));
	      });
	      return Number(numericDF.reduce(function (p, n) {
	        return isNumber(n.get(columnName)) ? p + Number(n.get(columnName)) : p;
	      }, 0)) / numericDF.count();
	    }
	    /**
	     * Compute the mean value into a numeric column.
	     * Alias from mean.
	     * @param {String} columnName The column to evaluate, containing Numbers.
	     * @returns {Number} The mean value into the column.
	     * @example
	     * df.stat.min('column1')
	     */

	  }, {
	    key: "average",
	    value: function average(columnName) {
	      return this.mean(columnName);
	    }
	    /**
	     * Compute the variance into a numeric column.
	     * @param {String} columnName The column to evaluate, containing Numbers.
	     * @param {Boolean} [population=false] Population mode. If true, provide the population variance, not the sample one.
	     * @returns {Number} The variance into the column.
	     * @example
	     * df.stat.var('column1')
	     */

	  }, {
	    key: "var",
	    value: function _var(columnName) {
	      var population = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	      var numericDF = this.df.filter(function (row) {
	        return isNumber(row.get(columnName));
	      });
	      var mean = this.mean(columnName);
	      return Number(numericDF.reduce(function (p, n) {
	        return p + Math.pow(n.get(columnName) - mean, 2);
	      }, 0)) / (numericDF.count() - (population ? 0 : 1));
	    }
	    /**
	     * Compute the standard deviation into a numeric column.
	     * @param {String} columnName The column to evaluate, containing Numbers.
	     * @param {Boolean} [population=false] Population mode. If true, provide the population standard deviation, not the sample one.
	     * @returns {Number} The standard deviation into the column.
	     * @example
	     * df.stat.sd('column1')
	     */

	  }, {
	    key: "sd",
	    value: function sd(columnName) {
	      var population = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	      return Math.sqrt(this.var(columnName, population));
	    }
	    /**
	     * Compute all the stats available with the Stat module on a numeric column.
	     * @param {String} columnName The column to evaluate, containing Numbers.
	     * @returns {Object} An dictionnary containing all statistical metrics available.
	     * @example
	     * df.stat.stats('column1')
	     */

	  }, {
	    key: "stats",
	    value: function stats(columnName) {
	      return {
	        sum: this.sum(columnName),
	        mean: this.mean(columnName),
	        min: this.min(columnName),
	        max: this.max(columnName),
	        var: this.var(columnName),
	        varpop: this.var(columnName, true),
	        sd: this.sd(columnName),
	        sdpop: this.sd(columnName, true)
	      };
	    }
	  }]);

	  return Stat;
	}();

	/**
	 * Matrix module for DataFrame, providing basic mathematical matrix computations.
	 */

	var Matrix =
	/*#__PURE__*/
	function () {
	  /**
	   * Start the Matrix module.
	   * @param {DataFrame} df An instance of DataFrame.
	   */
	  function Matrix(df) {
	    _classCallCheck(this, Matrix);

	    this.df = df;
	    this.name = "matrix";
	  }
	  /**
	   * Check if two DataFrames are commutative, if both have the same dimensions.
	   * @param {DataFrame} df The second DataFrame to check.
	   * @param {Boolean} [reverse = false] Revert the second DataFrame before the comparison.
	   * @returns {Boolean} True if they are commutative, else false.
	   * @example
	   * df.matrix.isCommutative(df2)
	   */


	  _createClass(Matrix, [{
	    key: "isCommutative",
	    value: function isCommutative(df) {
	      var reverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	      if (!(df instanceof DataFrame)) throw new ArgumentTypeError(df, "DataFrame");
	      return arrayEqual(this.df.dim(), reverse ? df.dim().reverse() : df.dim(), true);
	    }
	    /**
	     * Provide an elements pairwise addition of two DataFrames having the same dimensions.
	     * @param {DataFrame} df The second DataFrame to add.
	     * @returns {DataFrame} A new DataFrame resulting to the addition two DataFrames.
	     * @example
	     * df.matrix.add(df2)
	     */

	  }, {
	    key: "add",
	    value: function add(df) {
	      var _this = this;

	      if (!this.isCommutative(df)) {
	        throw new WrongSchemaError(this.df.dim(), df.dim());
	      }

	      var columns = _toConsumableArray(Array(this.df.dim()[1]).keys());

	      return this.df.__newInstance__(_toConsumableArray(iter(Object.keys(_toConsumableArray(this.df)), function (rowKey) {
	        var a = _toConsumableArray(_this.df)[rowKey].toArray();

	        var b = _toConsumableArray(df)[rowKey].toArray();

	        return columns.map(function (column) {
	          return a[column] + b[column];
	        });
	      })), this.df.listColumns());
	    }
	    /**
	     * Provide a scalar product between a number and a DataFrame.
	     * @param {Number} number The number to multiply.
	     * @returns {DataFrame} A new DataFrame resulting to the scalar product.
	     * @example
	     * df.matrix.product(6)
	     */

	  }, {
	    key: "product",
	    value: function product(number) {
	      if (!(typeof number === "number")) throw new ArgumentTypeError(number, "Number");
	      return this.df.map(function (row) {
	        return row.toArray().map(function (column) {
	          return column * number;
	        });
	      });
	    }
	    /**
	     * Multiply one DataFrame n x p and a second p x n.
	     * @param {DataFrame} df The second DataFrame to multiply.
	     * @returns {DataFrame} A new n x n DataFrame resulting to the product of two DataFrame.
	     * @example
	     * df.matrix.dot(df)
	     */

	  }, {
	    key: "dot",
	    value: function dot(df) {
	      var _this2 = this;

	      if (!this.isCommutative(df, true)) {
	        throw new WrongSchemaError(this.df.dim(), df.dim().reverse());
	      }

	      var columns = _toConsumableArray(Array(this.df.dim()[0]).keys());

	      return this.df.__newInstance__(_toConsumableArray(iter(Object.keys(_toConsumableArray(this.df)), function (rowKey) {
	        var a = _toConsumableArray(_this2.df)[rowKey].toArray();

	        return _toConsumableArray(iter(columns, function (column) {
	          var b = _toConsumableArray(df.transpose())[column].toArray();

	          return Object.keys(b).reduce(function (p, n) {
	            return p + b[n] * a[n];
	          }, 0);
	        }));
	      })), columns);
	    }
	  }]);

	  return Matrix;
	}();

	var defineProperty$6 = objectDefineProperty.f;
	var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;







	var MATCH$2 = wellKnownSymbol('match');
	var NativeRegExp = global_1.RegExp;
	var RegExpPrototype = NativeRegExp.prototype;
	var re1 = /a/g;
	var re2 = /a/g;

	// "new" should create a new object, old webkit bug
	var CORRECT_NEW = new NativeRegExp(re1) !== re1;

	var FORCED$5 = descriptors && isForced_1('RegExp', (!CORRECT_NEW || fails(function () {
	  re2[MATCH$2] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
	})));

	// `RegExp` constructor
	// https://tc39.github.io/ecma262/#sec-regexp-constructor
	if (FORCED$5) {
	  var RegExpWrapper = function RegExp(pattern, flags) {
	    var thisIsRegExp = this instanceof RegExpWrapper;
	    var patternIsRegExp = isRegexp(pattern);
	    var flagsAreUndefined = flags === undefined;
	    return !thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined ? pattern
	      : inheritIfRequired(CORRECT_NEW
	        ? new NativeRegExp(patternIsRegExp && !flagsAreUndefined ? pattern.source : pattern, flags)
	        : NativeRegExp((patternIsRegExp = pattern instanceof RegExpWrapper)
	          ? pattern.source
	          : pattern, patternIsRegExp && flagsAreUndefined ? regexpFlags.call(pattern) : flags)
	      , thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);
	  };
	  var proxy = function (key) {
	    key in RegExpWrapper || defineProperty$6(RegExpWrapper, key, {
	      configurable: true,
	      get: function () { return NativeRegExp[key]; },
	      set: function (it) { NativeRegExp[key] = it; }
	    });
	  };
	  var keys$3 = getOwnPropertyNames$1(NativeRegExp);
	  var index = 0;
	  while (keys$3.length > index) proxy(keys$3[index++]);
	  RegExpPrototype.constructor = RegExpWrapper;
	  RegExpWrapper.prototype = RegExpPrototype;
	  redefine(global_1, 'RegExp', RegExpWrapper);
	}

	// https://tc39.github.io/ecma262/#sec-get-regexp-@@species
	setSpecies('RegExp');

	var TO_STRING = 'toString';
	var RegExpPrototype$1 = RegExp.prototype;
	var nativeToString = RegExpPrototype$1[TO_STRING];

	var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
	// FF44- RegExp#toString has a wrong name
	var INCORRECT_NAME = nativeToString.name != TO_STRING;

	// `RegExp.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
	if (NOT_GENERIC || INCORRECT_NAME) {
	  redefine(RegExp.prototype, TO_STRING, function toString() {
	    var R = anObject(this);
	    var p = String(R.source);
	    var rf = R.flags;
	    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype$1) ? regexpFlags.call(R) : rf);
	    return '/' + p + '/' + f;
	  }, { unsafe: true });
	}

	var $find = arrayIteration.find;


	var FIND = 'find';
	var SKIPS_HOLES = true;

	// Shouldn't skip holes
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

	// `Array.prototype.find` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.find
	_export({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND);

	var $findIndex = arrayIteration.findIndex;


	var FIND_INDEX = 'findIndex';
	var SKIPS_HOLES$1 = true;

	// Shouldn't skip holes
	if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES$1 = false; });

	// `Array.prototype.findIndex` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.findindex
	_export({ target: 'Array', proto: true, forced: SKIPS_HOLES$1 }, {
	  findIndex: function findIndex(callbackfn /* , that = undefined */) {
	    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND_INDEX);

	var non = '\u200B\u0085\u180E';

	// check that a method works with the correct list
	// of whitespaces and has a correct name
	var forcedStringTrimMethod = function (METHOD_NAME) {
	  return fails(function () {
	    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
	  });
	};

	var $trim = stringTrim.trim;


	// `String.prototype.trim` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.trim
	_export({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
	  trim: function trim() {
	    return $trim(this);
	  }
	});

	var REPLACMENTS = [["INNER JOIN", "INNERJOIN"], ["LEFT JOIN", "LEFTJOIN"], ["RIGHT JOIN", "RIGHTJOIN"], ["FULL JOIN", "FULLJOIN"], ["GROUP BY", "GROUPBY"]];
	var WHERE_OPERATORS = {
	  IN: function IN(a, b) {
	    return b.includes(a);
	  },
	  LIKE: function LIKE(a, b) {
	    return b.includes(a) || a.includes(b);
	  },
	  ">=": function _(a, b) {
	    return a >= b;
	  },
	  "<=": function _(a, b) {
	    return a <= b;
	  },
	  "!=": function _(a, b) {
	    return a !== b;
	  },
	  "<": function _(a, b) {
	    return a < b;
	  },
	  ">": function _(a, b) {
	    return a > b;
	  },
	  "=": function _(a, b) {
	    return a === b;
	  },
	  AND: function AND(a, b) {
	    return a && b;
	  },
	  OR: function OR(a, b) {
	    return a || b;
	  }
	};
	var SELECT_FUNCTIONS = {
	  COUNT: function COUNT(df) {
	    return df.count();
	  },
	  SUM: function SUM(df, column) {
	    return df.stat.sum(column);
	  },
	  MAX: function MAX(df, column) {
	    return df.stat.max(column);
	  },
	  MIN: function MIN(df, column) {
	    return df.stat.min(column);
	  },
	  AVG: function AVG(df, column) {
	    return df.stat.mean(column);
	  }
	};

	function match(value) {
	  for (var _len = arguments.length, cases = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    cases[_key - 1] = arguments[_key];
	  }

	  var casesGen = makeGenerator(cases);

	  var checker = function checker(nextCase) {
	    return nextCase[0](value) ? nextCase[1](value) : checker(casesGen.next().value);
	  };

	  return checker(casesGen.next().value);
	}

	function sqlArgsToArray(args) {
	  return xReplace(args.join(" "), [" ", ""]).split(",");
	}

	function joinHandler(operation, tables, type) {
	  var ONKeywordLocation = operation.findIndex(function (word) {
	    return word.toUpperCase() === "ON";
	  }) + 1;
	  return function (df) {
	    return df.join(tables[operation[0]], sqlArgsToArray(operation.filter(function (word, loc) {
	      return loc >= ONKeywordLocation;
	    })), type);
	  };
	}

	var OPERATIONS_HANDLER = {
	  WHERE: function WHERE(operation) {
	    var operationalTerms = xSplit(operation.join(" "), " AND ", " OR ");
	    return function (df) {
	      return df.filter(function (row) {
	        var conditionalOperators = operation.filter(function (term) {
	          return ["AND", "OR"].includes(term.toUpperCase());
	        });
	        return operationalTerms.map(function (operationalTerm) {
	          var operatorToApply = xContains.apply(void 0, [operationalTerm].concat(_toConsumableArray(Object.keys(WHERE_OPERATORS))))[0];
	          var terms = operationalTerm.split(operatorToApply).map(function (term) {
	            return term.trim();
	          });

	          if (!row.has(terms[0]) && row.has(terms[1])) {
	            return WHERE_OPERATORS[operatorToApply](xReplace(terms[0].trim(), ['"', ""], ["'", ""], ["`", ""]), String(row.get(terms[1])));
	          }

	          var lastTermAsNumber = Number(terms[1]);
	          return WHERE_OPERATORS[operatorToApply](String(row.get(terms[0])), Number.isNaN(lastTermAsNumber) ? xReplace(terms[1].trim(), ['"', ""], ["'", ""], ["`", ""]) : lastTermAsNumber);
	        }).reduce(function (prev, next) {
	          return WHERE_OPERATORS[conditionalOperators.shift()](prev, next);
	        });
	      });
	    };
	  },
	  JOIN: function JOIN(operation, tables) {
	    return joinHandler(operation, tables, "inner");
	  },
	  INNERJOIN: function INNERJOIN(operation, tables) {
	    return joinHandler(operation, tables, "inner");
	  },
	  LEFTJOIN: function LEFTJOIN(operation, tables) {
	    return joinHandler(operation, tables, "left");
	  },
	  RIGHTJOIN: function RIGHTJOIN(operation, tables) {
	    return joinHandler(operation, tables, "right");
	  },
	  FULLJOIN: function FULLJOIN(operation, tables) {
	    return joinHandler(operation, tables, "full");
	  },
	  UNION: function UNION(operation, tables) {
	    return function (df) {
	      return df.union(operation[0].toUpperCase().includes("SELECT") ? sqlParser(operation.join(" "), tables) : tables[operation[0]]);
	    };
	  },
	  GROUPBY: function GROUPBY(operation) {
	    return function (df) {
	      return df.groupBy.apply(df, _toConsumableArray(sqlArgsToArray(operation)));
	    };
	  }
	};

	function replaceTermsInQuery(query) {
	  var replacedQuery = query;
	  REPLACMENTS.forEach(function (_ref) {
	    var _ref2 = _slicedToArray(_ref, 2),
	        joinType = _ref2[0],
	        replacment = _ref2[1];

	    replacedQuery = replacedQuery.replace(joinType, replacment).replace(joinType.toLowerCase(), replacment);
	  });
	  return replacedQuery;
	}

	function sqlSplitter(query) {
	  var splittedQuery = replaceTermsInQuery(query).split(" ");
	  var fromLoc = splittedQuery.findIndex(function (word) {
	    return word.toUpperCase() === "FROM";
	  });

	  if (fromLoc === -1) {
	    throw new SQLParseError("Your query should contains FROM keyword");
	  }

	  return {
	    selections: splittedQuery.slice(0, fromLoc),
	    table: splittedQuery[fromLoc + 1],
	    operations: splittedQuery.slice(fromLoc + 2, splittedQuery.length)
	  };
	}

	function parseOperations(operations, tables) {
	  var operationsLoc = operations.map(function (word, index) {
	    return Object.keys(OPERATIONS_HANDLER).includes(word.toUpperCase()) ? index : undefined;
	  }).filter(function (loc) {
	    return loc !== undefined;
	  });
	  return operationsLoc.map(function (loc, index) {
	    return OPERATIONS_HANDLER[operations[loc].toUpperCase()](operations.slice(loc + 1, operationsLoc[index + 1] ? operationsLoc[index + 1] : operations.length), tables);
	  }).reduce(function (prev, next) {
	    return function (df) {
	      return next(prev(df));
	    };
	  }, function (df) {
	    return df;
	  });
	}

	function parseSelections(selections) {
	  if (selections[0].toUpperCase() !== "SELECT") {
	    throw new SQLParseError("Your query should begin with SELECT keyword");
	  }

	  selections.shift();
	  return match(selections.join(" ").split(",").map(function (selection) {
	    return selection.trim();
	  }), [function (value) {
	    return xReplace(value[0], [" ", ""]) === "*";
	  }, function () {
	    return function (df) {
	      return df;
	    };
	  }], [function (value) {
	    return value[0].toUpperCase().includes("DISTINCT");
	  }, function (value) {
	    var columnName = xReplace(value[0].split(" AS ")[0], ["DISTINCT", ""], ["distinct", ""], [" ", ""]);
	    return function (df) {
	      return df.distinct(columnName).rename(columnName, value[0].includes("AS") ? value[0].split("AS")[1].replace(" ", "") : columnName);
	    };
	  }], [function (value) {
	    return xContains.apply(void 0, [value[0].toUpperCase()].concat(_toConsumableArray(Object.keys(SELECT_FUNCTIONS))))[0];
	  }, function (value) {
	    return function (df) {
	      var functionToApply = Object.keys(SELECT_FUNCTIONS).find(function (func) {
	        return value[0].toUpperCase().includes(func);
	      });

	      var applyFunction = function applyFunction(dfToImpact) {
	        return SELECT_FUNCTIONS[functionToApply](dfToImpact, xReplace(value[0], ["".concat(functionToApply.toLowerCase(), "("), ""], ["".concat(functionToApply, "("), ""], ["(", ""], [")", ""]));
	      };

	      return df.on && df.df ? df.aggregate(applyFunction) : applyFunction(df);
	    };
	  }], [function () {
	    return true;
	  }, function (value) {
	    return function (df) {
	      return df.select.apply(df, _toConsumableArray(value.map(function (column) {
	        return column.split(" AS ")[0].replace(" ", "");
	      }))).renameAll(value.map(function (column) {
	        return column.includes("AS") ? column.split("AS")[1].replace(" ", "") : column;
	      }));
	    };
	  }]);
	}

	function sqlParser(query, tables) {
	  var _sqlSplitter = sqlSplitter(query),
	      selections = _sqlSplitter.selections,
	      table = _sqlSplitter.table,
	      operations = _sqlSplitter.operations;

	  if (!table || !Object.keys(tables).includes(table)) {
	    throw new SQLParseError("Wrong table name in your query: ".concat(table));
	  }

	  var applyOperations = parseOperations(operations, tables);
	  var applySelections = parseSelections(selections);
	  return applySelections(applyOperations(tables[table]));
	}

	/**
	 * SQL module for DataFrame, providing SQL-like syntax for data exploration in DataFrames.
	 */

	var SQL =
	/*#__PURE__*/
	function () {
	  _createClass(SQL, null, [{
	    key: "request",

	    /**
	     * Request on a SQL query.
	     * @param {String} query A SQL query to request.
	     * @returns The result of the query.
	     * @example
	     * DataFrame.request('SELECT * FROM tmp');
	     */
	    value: function request(query) {
	      if (!(typeof query === "string")) throw new ArgumentTypeError(query, "Stri g");
	      return sqlParser(query, SQL.tables);
	    }
	    /**
	     * Drop or remove all registered tables.
	     * @example
	     * DataFrame.dropTables();
	     */

	  }, {
	    key: "dropTables",
	    value: function dropTables() {
	      SQL.tables = {};
	    }
	    /**
	     * Drop or remove a registered table.
	     * @param {String} tableName The registered table to drop.
	     * @example
	     * DataFrame.dropTable('tmp1');
	     */

	  }, {
	    key: "dropTable",
	    value: function dropTable(tableName) {
	      delete SQL.tables[tableName];
	    }
	    /**
	     * Rename a registered table.
	     * @param {String} tableName The registered table to rename.
	     * @param {String} replacement The new table name.
	     * @param {Boolean} [overwrite=false] Overwrite if the table already exists.
	     * @example
	     * DataFrame.renameTable('tmp1', 'notTmp1');
	     */

	  }, {
	    key: "renameTable",
	    value: function renameTable(tableName, replacement) {
	      var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	      SQL.registerTable(SQL.tables[tableName], replacement, overwrite);
	      SQL.dropTable(tableName);
	    }
	    /**
	     * List all registered tables.
	     * @returns {Array} A list of the registered tables.
	     * @example
	     * DataFrame.listTables();
	     */

	  }, {
	    key: "listTables",
	    value: function listTables() {
	      return Object.keys(SQL.tables);
	    }
	    /**
	     * Register a DataFrame as a temporary table.
	     * @param {DataFrame} df The DataFrame to register.
	     * @param {String} tableName The temporary table name.
	     * @param {Boolean} [overwrite=false] Overwrite if the table already exists.
	     * @example
	     * DataFrame.registerTable('tmp', df);
	     */

	  }, {
	    key: "registerTable",
	    value: function registerTable(df, tableName) {
	      var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	      if (!(df instanceof DataFrame)) throw new ArgumentTypeError(df, "DataFrame");
	      var validation = new RegExp("^[a-zA-Z_][a-zA-Z0-9_]*$");

	      if (!validation.test(tableName)) {
	        throw new WrongTableNameError(tableName);
	      }

	      if (SQL.listTables().includes(tableName) && !overwrite) {
	        throw new TableAlreadyExistsError(tableName);
	      }

	      SQL.tables[tableName] = df;
	    }
	    /**
	     * Start the SQL module.
	     * @param {DataFrame} df An instance of DataFrame.
	     */

	  }]);

	  function SQL(df) {
	    _classCallCheck(this, SQL);

	    this.df = df;
	    this.name = "sql";
	  }
	  /**
	   * Register the DataFrame as temporary table.
	   * @param {String} tableName The name of the table.
	   * @param {Boolean} [overwrite=false] Overwrite if the table already exists.
	   * @example
	   * df.sql.register('tmp');
	   */


	  _createClass(SQL, [{
	    key: "register",
	    value: function register(tableName) {
	      var overwrite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	      SQL.registerTable(this.df, tableName, overwrite);
	      return this.df;
	    }
	  }]);

	  return SQL;
	}();

	SQL.tables = {};

	DataFrame.setDefaultModules(Stat, Matrix, SQL);
	DataFrame.sql = SQL;

	exports.DataFrame = DataFrame;
	exports.Row = Row;
	exports.Errors = errors;
	exports.default = DataFrame;

	return exports;

}({}));
