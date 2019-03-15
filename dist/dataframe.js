var dfjs = (function (exports) {
	'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.1' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var _redefine = createCommonjsModule(function (module) {
	var SRC = _uid('src');
	var TO_STRING = 'toString';
	var $toString = Function[TO_STRING];
	var TPL = ('' + $toString).split(TO_STRING);

	_core.inspectSource = function (it) {
	  return $toString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === _global) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    _hide(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    _hide(O, key, val);
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
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

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // extend global
	    if (target) _redefine(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) _hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	_global.core = _core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	var _strictMethod = function (method, arg) {
	  return !!method && _fails(function () {
	    // eslint-disable-next-line no-useless-call
	    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
	  });
	};

	var $sort = [].sort;
	var test = [1, 2, 3];

	_export(_export.P + _export.F * (_fails(function () {
	  // IE8-
	  test.sort(undefined);
	}) || !_fails(function () {
	  // V8 bug
	  test.sort(null);
	  // Old WebKit
	}) || !_strictMethod($sort)), 'Array', {
	  // 22.1.3.25 Array.prototype.sort(comparefn)
	  sort: function sort(comparefn) {
	    return comparefn === undefined
	      ? $sort.call(_toObject(this))
	      : $sort.call(_toObject(this), _aFunction(comparefn));
	  }
	});

	// call something on iterator step with safe closing on error

	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) _anObject(ret.call(iterator));
	    throw e;
	  }
	};

	var _iterators = {};

	var _library = false;

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: 'global',
	  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
	});
	});

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	// check on default Array iterator

	var ITERATOR = _wks('iterator');
	var ArrayProto = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var _createProperty = function (object, index, value) {
	  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
	  else object[index] = value;
	};

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG = _wks('toStringTag');
	// ES3 wrong here
	var ARG = _cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? _cof(O)
	    // ES3 arguments fallback
	    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var ITERATOR$1 = _wks('iterator');

	var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$1]
	    || it['@@iterator']
	    || _iterators[_classof(it)];
	};

	var ITERATOR$2 = _wks('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR$2]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	} catch (e) { /* empty */ }

	var _iterDetect = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR$2]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR$2] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};

	_export(_export.S + _export.F * !_iterDetect(function (iter) { }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	    var O = _toObject(arrayLike);
	    var C = typeof this == 'function' ? this : Array;
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var index = 0;
	    var iterFn = core_getIteratorMethod(O);
	    var length, result, step, iterator;
	    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = _toLength(O.length);
	      for (result = new C(length); length > index; index++) {
	        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
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

	function _objectSpread(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};
	    var ownKeys = Object.keys(source);

	    if (typeof Object.getOwnPropertySymbols === 'function') {
	      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
	        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
	      }));
	    }

	    ownKeys.forEach(function (key) {
	      _defineProperty(target, key, source[key]);
	    });
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

	// 7.2.9 SameValue(x, y)
	var _sameValue = Object.is || function is(x, y) {
	  // eslint-disable-next-line no-self-compare
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

	// 19.1.3.10 Object.is(value1, value2)

	_export(_export.S, 'Object', { is: _sameValue });

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var f$1 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$1
	};

	var isEnum = _objectPie.f;
	var _objectToArray = function (isEntries) {
	  return function (it) {
	    var O = _toIobject(it);
	    var keys = _objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) if (isEnum.call(O, key = keys[i++])) {
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

	// https://github.com/tc39/proposal-object-values-entries

	var $entries = _objectToArray(true);

	_export(_export.S, 'Object', {
	  entries: function entries(it) {
	    return $entries(it);
	  }
	});

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined(that));
	    var i = _toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var at = _stringAt(true);

	 // `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex
	var _advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? at(S, index).length : 1);
	};

	var builtinExec = RegExp.prototype.exec;

	 // `RegExpExec` abstract operation
	// https://tc39.github.io/ecma262/#sec-regexpexec
	var _regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw new TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }
	  if (_classof(R) !== 'RegExp') {
	    throw new TypeError('RegExp#exec called on incompatible receiver');
	  }
	  return builtinExec.call(R, S);
	};

	// 21.2.5.3 get RegExp.prototype.flags

	var _flags = function () {
	  var that = _anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
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

	var LAST_INDEX = 'lastIndex';

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/,
	      re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
	})();

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + re.source + '$(?!\\s)', _flags.call(re));
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

	    match = nativeExec.call(re, str);

	    if (UPDATES_LAST_INDEX_WRONG && match) {
	      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      // eslint-disable-next-line no-loop-func
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    return match;
	  };
	}

	var _regexpExec = patchedExec;

	_export({
	  target: 'RegExp',
	  proto: true,
	  forced: _regexpExec !== /./.exec
	}, {
	  exec: _regexpExec
	});

	var SPECIES = _wks('species');

	var REPLACE_SUPPORTS_NAMED_GROUPS = !_fails(function () {
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

	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
	  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
	})();

	var _fixReWks = function (KEY, length, exec) {
	  var SYMBOL = _wks(KEY);

	  var DELEGATES_TO_SYMBOL = !_fails(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !_fails(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;
	    re.exec = function () { execCalled = true; return null; };
	    if (KEY === 'split') {
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES] = function () { return re; };
	    }
	    re[SYMBOL]('');
	    return !execCalled;
	  }) : undefined;

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
	    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var fns = exec(
	      _defined,
	      SYMBOL,
	      ''[KEY],
	      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
	        if (regexp.exec === _regexpExec) {
	          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	            // The native String method already delegates to @@method (this
	            // polyfilled function), leasing to infinite recursion.
	            // We avoid it by directly calling the native @@method method.
	            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	          }
	          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	        }
	        return { done: false };
	      }
	    );
	    var strfn = fns[0];
	    var rxfn = fns[1];

	    _redefine(String.prototype, KEY, strfn);
	    _hide(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return rxfn.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return rxfn.call(string, this); }
	    );
	  }
	};

	var max$1 = Math.max;
	var min$2 = Math.min;
	var floor$1 = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// @@replace logic
	_fixReWks('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
	  return [
	    // `String.prototype.replace` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = defined(this);
	      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	      return fn !== undefined
	        ? fn.call(searchValue, O, replaceValue)
	        : $replace.call(String(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
	    function (regexp, replaceValue) {
	      var res = maybeCallNative($replace, regexp, this, replaceValue);
	      if (res.done) return res.value;

	      var rx = _anObject(regexp);
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
	        var result = _regexpExecAbstract(rx, S);
	        if (result === null) break;
	        results.push(result);
	        if (!global) break;
	        var matchStr = String(result[0]);
	        if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength(rx.lastIndex), fullUnicode);
	      }
	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];
	        var matched = String(result[0]);
	        var position = max$1(min$2(_toInteger(result.index), S.length), 0);
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
	      namedCaptures = _toObject(namedCaptures);
	      symbols = SUBSTITUTION_SYMBOLS;
	    }
	    return $replace.call(replacement, symbols, function (match, ch) {
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
	          if (n === 0) return ch;
	          if (n > m) {
	            var f = floor$1(n / 10);
	            if (f === 0) return ch;
	            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	            return ch;
	          }
	          capture = captures[n - 1];
	      }
	      return capture === undefined ? '' : capture;
	    });
	  }
	});

	// https://github.com/tc39/proposal-object-values-entries

	var $values = _objectToArray(false);

	_export(_export.S, 'Object', {
	  values: function values(it) {
	    return $values(it);
	  }
	});

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var document$2 = _global.document;
	var _html = document$2 && document$2.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	var def = _objectDp.f;

	var TAG$1 = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG$1)) def(it, TAG$1, { configurable: true, value: tag });
	};

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$2 = _sharedKey('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	var ITERATOR$3 = _wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR$3] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!_library && typeof IteratorPrototype[ITERATOR$3] != 'function') _hide(IteratorPrototype, ITERATOR$3, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR$3])) {
	    _hide(proto, ITERATOR$3, $default);
	  }
	  // Plug for library
	  _iterators[NAME] = $default;
	  _iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine(proto, key, methods[key]);
	    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	var $at = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

	var _redefineAll = function (target, src, safe) {
	  for (var key in src) _redefine(target, key, src[key], safe);
	  return target;
	};

	var _anInstance = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

	var _forOf = createCommonjsModule(function (module) {
	var BREAK = {};
	var RETURN = {};
	var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod(iterable);
	  var f = _ctx(fn, that, entries ? 2 : 1);
	  var index = 0;
	  var length, step, iterator, result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
	    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = _iterCall(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	exports.BREAK = BREAK;
	exports.RETURN = RETURN;
	});

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	var SPECIES$1 = _wks('species');

	var _setSpecies = function (KEY) {
	  var C = _global[KEY];
	  if (_descriptors && C && !C[SPECIES$1]) _objectDp.f(C, SPECIES$1, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};

	var _meta = createCommonjsModule(function (module) {
	var META = _uid('meta');


	var setDesc = _objectDp.f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !_fails(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};
	});
	var _meta_1 = _meta.KEY;
	var _meta_2 = _meta.NEED;
	var _meta_3 = _meta.fastKey;
	var _meta_4 = _meta.getWeak;
	var _meta_5 = _meta.onFreeze;

	var _validateCollection = function (it, TYPE) {
	  if (!_isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
	  return it;
	};

	var dP$1 = _objectDp.f;









	var fastKey = _meta.fastKey;

	var SIZE = _descriptors ? '_s' : 'size';

	var getEntry = function (that, key) {
	  // fast case
	  var index = fastKey(key);
	  var entry;
	  if (index !== 'F') return that._i[index];
	  // frozen object case
	  for (entry = that._f; entry; entry = entry.n) {
	    if (entry.k == key) return entry;
	  }
	};

	var _collectionStrong = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      _anInstance(that, C, NAME, '_i');
	      that._t = NAME;         // collection type
	      that._i = _objectCreate(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    _redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        for (var that = _validateCollection(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
	          entry.r = true;
	          if (entry.p) entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function (key) {
	        var that = _validateCollection(this, NAME);
	        var entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.n;
	          var prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if (prev) prev.n = next;
	          if (next) next.p = prev;
	          if (that._f == entry) that._f = next;
	          if (that._l == entry) that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        _validateCollection(this, NAME);
	        var f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;
	        while (entry = entry ? entry.n : this._f) {
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while (entry && entry.r) entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(_validateCollection(this, NAME), key);
	      }
	    });
	    if (_descriptors) dP$1(C.prototype, 'size', {
	      get: function () {
	        return _validateCollection(this, NAME)[SIZE];
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var entry = getEntry(that, key);
	    var prev, index;
	    // change existing entry
	    if (entry) {
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if (!that._f) that._f = entry;
	      if (prev) prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if (index !== 'F') that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function (C, NAME, IS_MAP) {
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    _iterDefine(C, NAME, function (iterated, kind) {
	      this._t = _validateCollection(iterated, NAME); // target
	      this._k = kind;                     // kind
	      this._l = undefined;                // previous
	    }, function () {
	      var that = this;
	      var kind = that._k;
	      var entry = that._l;
	      // revert to the last existing entry
	      while (entry && entry.r) entry = entry.p;
	      // get next entry
	      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
	        // or finish the iteration
	        that._t = undefined;
	        return _iterStep(1);
	      }
	      // return step by kind
	      if (kind == 'keys') return _iterStep(0, entry.k);
	      if (kind == 'values') return _iterStep(0, entry.v);
	      return _iterStep(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    _setSpecies(NAME);
	  }
	};

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$2 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject(O);
	  P = _toPrimitive(P, true);
	  if (_ie8DomDefine) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$2
	};

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */


	var check = function (O, proto) {
	  _anObject(O);
	  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	var _setProto = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) { buggy = true; }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

	var setPrototypeOf = _setProto.set;
	var _inheritIfRequired = function (that, target, C) {
	  var S = target.constructor;
	  var P;
	  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && _isObject(P) && setPrototypeOf) {
	    setPrototypeOf(that, P);
	  } return that;
	};

	var _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	  var Base = _global[NAME];
	  var C = Base;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var proto = C && C.prototype;
	  var O = {};
	  var fixMethod = function (KEY) {
	    var fn = proto[KEY];
	    _redefine(proto, KEY,
	      KEY == 'delete' ? function (a) {
	        return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a) {
	        return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a) {
	        return IS_WEAK && !_isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !_fails(function () {
	    new C().entries().next();
	  }))) {
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    _redefineAll(C.prototype, methods);
	    _meta.NEED = true;
	  } else {
	    var instance = new C();
	    // early implementations not supports chaining
	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
	    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	    var THROWS_ON_PRIMITIVES = _fails(function () { instance.has(1); });
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    var ACCEPT_ITERABLES = _iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
	    // for early implementations -0 and +0 not the same
	    var BUGGY_ZERO = !IS_WEAK && _fails(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new C();
	      var index = 5;
	      while (index--) $instance[ADDER](index, index);
	      return !$instance.has(-0);
	    });
	    if (!ACCEPT_ITERABLES) {
	      C = wrapper(function (target, iterable) {
	        _anInstance(target, C, NAME);
	        var that = _inheritIfRequired(new Base(), target, C);
	        if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if (IS_WEAK && proto.clear) delete proto.clear;
	  }

	  _setToStringTag(C, NAME);

	  O[NAME] = C;
	  _export(_export.G + _export.W + _export.F * (C != Base), O);

	  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

	var SET = 'Set';

	// 23.2 Set Objects
	var es6_set = _collection(SET, function (get) {
	  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value) {
	    return _collectionStrong.def(_validateCollection(this, SET), value = value === 0 ? 0 : value, value);
	  }
	}, _collectionStrong);

	var dP$2 = _objectDp.f;
	var FProto = Function.prototype;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';

	// 19.2.4.2 name
	NAME in FProto || _descriptors && dP$2(FProto, NAME, {
	  configurable: true,
	  get: function () {
	    try {
	      return ('' + this).match(nameRE)[1];
	    } catch (e) {
	      return '';
	    }
	  }
	});

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = _wks('unscopables');
	var ArrayProto$1 = Array.prototype;
	if (ArrayProto$1[UNSCOPABLES] == undefined) _hide(ArrayProto$1, UNSCOPABLES, {});
	var _addToUnscopables = function (key) {
	  ArrayProto$1[UNSCOPABLES][key] = true;
	};

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep(1);
	  }
	  if (kind == 'keys') return _iterStep(0, index);
	  if (kind == 'values') return _iterStep(0, O[index]);
	  return _iterStep(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	_iterators.Arguments = _iterators.Array;

	_addToUnscopables('keys');
	_addToUnscopables('values');
	_addToUnscopables('entries');

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (_core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
	};

	// 19.1.2.14 Object.keys(O)



	_objectSap('keys', function () {
	  return function keys(it) {
	    return _objectKeys(_toObject(it));
	  };
	});

	var ITERATOR$4 = _wks('iterator');
	var TO_STRING_TAG = _wks('toStringTag');
	var ArrayValues = _iterators.Array;

	var DOMIterables = {
	  CSSRuleList: true, // TODO: Not spec compliant, should be false.
	  CSSStyleDeclaration: false,
	  CSSValueList: false,
	  ClientRectList: false,
	  DOMRectList: false,
	  DOMStringList: false,
	  DOMTokenList: true,
	  DataTransferItemList: false,
	  FileList: false,
	  HTMLAllCollection: false,
	  HTMLCollection: false,
	  HTMLFormElement: false,
	  HTMLSelectElement: false,
	  MediaList: true, // TODO: Not spec compliant, should be false.
	  MimeTypeArray: false,
	  NamedNodeMap: false,
	  NodeList: true,
	  PaintRequestList: false,
	  Plugin: false,
	  PluginArray: false,
	  SVGLengthList: false,
	  SVGNumberList: false,
	  SVGPathSegList: false,
	  SVGPointList: false,
	  SVGStringList: false,
	  SVGTransformList: false,
	  SourceBufferList: false,
	  StyleSheetList: true, // TODO: Not spec compliant, should be false.
	  TextTrackCueList: false,
	  TextTrackList: false,
	  TouchList: false
	};

	for (var collections = _objectKeys(DOMIterables), i = 0; i < collections.length; i++) {
	  var NAME$1 = collections[i];
	  var explicit = DOMIterables[NAME$1];
	  var Collection = _global[NAME$1];
	  var proto = Collection && Collection.prototype;
	  var key;
	  if (proto) {
	    if (!proto[ITERATOR$4]) _hide(proto, ITERATOR$4, ArrayValues);
	    if (!proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME$1);
	    _iterators[NAME$1] = ArrayValues;
	    if (explicit) for (key in es6_array_iterator) if (!proto[key]) _redefine(proto, key, es6_array_iterator[key], true);
	  }
	}

	var runtime = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	!(function(global) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }

	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = module.exports;

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
	  runtime.wrap = wrap;

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

	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  runtime.mark = function(genFun) {
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
	  runtime.awrap = function(arg) {
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
	  runtime.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return runtime.isGeneratorFunction(outerFn)
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
	        if (delegate.iterator.return) {
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

	  runtime.keys = function(object) {
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
	  runtime.values = values;

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
	})(
	  // In sloppy mode, unbound `this` refers to the global object, fallback to
	  // Function constructor if we're in global strict mode. That is sadly a form
	  // of indirect eval which violates Content Security Policy.
	  (function() {
	    return this || (typeof self === "object" && self);
	  })() || Function("return this")()
	);
	});

	var f$3 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$3
	};

	// 19.1.2.1 Object.assign(target, source, ...)





	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = _toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;
	  while (aLen > index) {
	    var S = _iobject(arguments[index++]);
	    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  } return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)


	_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

	// https://github.com/tc39/Array.prototype.includes

	var $includes = _arrayIncludes(true);

	_export(_export.P, 'Array', {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	_addToUnscopables('includes');

	// 7.2.8 IsRegExp(argument)


	var MATCH = _wks('match');
	var _isRegexp = function (it) {
	  var isRegExp;
	  return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
	};

	// helper for String#{startsWith, endsWith, includes}



	var _stringContext = function (that, searchString, NAME) {
	  if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(_defined(that));
	};

	var MATCH$1 = _wks('match');
	var _failsIsRegexp = function (KEY) {
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch (e) {
	    try {
	      re[MATCH$1] = false;
	      return !'/./'[KEY](re);
	    } catch (f) { /* empty */ }
	  } return true;
	};

	var INCLUDES = 'includes';

	_export(_export.P + _export.F * _failsIsRegexp(INCLUDES), 'String', {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~_stringContext(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)


	var SPECIES$2 = _wks('species');
	var _speciesConstructor = function (O, D) {
	  var C = _anObject(O).constructor;
	  var S;
	  return C === undefined || (S = _anObject(C)[SPECIES$2]) == undefined ? D : _aFunction(S);
	};

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	var _invoke = function (fn, args, that) {
	  var un = that === undefined;
	  switch (args.length) {
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return fn.apply(that, args);
	};

	var process = _global.process;
	var setTask = _global.setImmediate;
	var clearTask = _global.clearImmediate;
	var MessageChannel = _global.MessageChannel;
	var Dispatch = _global.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;
	var run = function () {
	  var id = +this;
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function (event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      _invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (_cof(process) == 'process') {
	    defer = function (id) {
	      process.nextTick(_ctx(run, id, 1));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(_ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = _ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
	    defer = function (id) {
	      _global.postMessage(id + '', '*');
	    };
	    _global.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in _domCreate('script')) {
	    defer = function (id) {
	      _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
	        _html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(_ctx(run, id, 1), 0);
	    };
	  }
	}
	var _task = {
	  set: setTask,
	  clear: clearTask
	};

	var macrotask = _task.set;
	var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
	var process$1 = _global.process;
	var Promise$1 = _global.Promise;
	var isNode = _cof(process$1) == 'process';

	var _microtask = function () {
	  var head, last, notify;

	  var flush = function () {
	    var parent, fn;
	    if (isNode && (parent = process$1.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (isNode) {
	    notify = function () {
	      process$1.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
	  } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
	    var toggle = true;
	    var node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    var promise = Promise$1.resolve(undefined);
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
	      macrotask.call(_global, flush);
	    };
	  }

	  return function (fn) {
	    var task = { fn: fn, next: undefined };
	    if (last) last.next = task;
	    if (!head) {
	      head = task;
	      notify();
	    } last = task;
	  };
	};

	// 25.4.1.5 NewPromiseCapability(C)


	function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = _aFunction(resolve);
	  this.reject = _aFunction(reject);
	}

	var f$4 = function (C) {
	  return new PromiseCapability(C);
	};

	var _newPromiseCapability = {
		f: f$4
	};

	var _perform = function (exec) {
	  try {
	    return { e: false, v: exec() };
	  } catch (e) {
	    return { e: true, v: e };
	  }
	};

	var navigator = _global.navigator;

	var _userAgent = navigator && navigator.userAgent || '';

	var _promiseResolve = function (C, x) {
	  _anObject(C);
	  if (_isObject(x) && x.constructor === C) return x;
	  var promiseCapability = _newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var task = _task.set;
	var microtask = _microtask();




	var PROMISE = 'Promise';
	var TypeError$1 = _global.TypeError;
	var process$2 = _global.process;
	var versions = process$2 && process$2.versions;
	var v8 = versions && versions.v8 || '';
	var $Promise = _global[PROMISE];
	var isNode$1 = _classof(process$2) == 'process';
	var empty = function () { /* empty */ };
	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;

	var USE_NATIVE = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1);
	    var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode$1 || typeof PromiseRejectionEvent == 'function')
	      && promise.then(empty) instanceof FakePromise
	      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	      // we can't detect it synchronously, so just check versions
	      && v8.indexOf('6.6') !== 0
	      && _userAgent.indexOf('Chrome/66') === -1;
	  } catch (e) { /* empty */ }
	}();

	// helpers
	var isThenable = function (it) {
	  var then;
	  return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function (promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v;
	    var ok = promise._s == 1;
	    var i = 0;
	    var run = function (reaction) {
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // may throw
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
	      } catch (e) {
	        if (domain && !exited) domain.exit();
	        reject(e);
	      }
	    };
	    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function (promise) {
	  task.call(_global, function () {
	    var value = promise._v;
	    var unhandled = isUnhandled(promise);
	    var result, handler, console;
	    if (unhandled) {
	      result = _perform(function () {
	        if (isNode$1) {
	          process$2.emit('unhandledRejection', value, promise);
	        } else if (handler = _global.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = _global.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if (unhandled && result.e) throw result.v;
	  });
	};
	var isUnhandled = function (promise) {
	  return promise._h !== 1 && (promise._a || promise._c).length === 0;
	};
	var onHandleUnhandled = function (promise) {
	  task.call(_global, function () {
	    var handler;
	    if (isNode$1) {
	      process$2.emit('rejectionHandled', promise);
	    } else if (handler = _global.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function (value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function (value) {
	  var promise = this;
	  var then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};

	// constructor polyfill
	if (!USE_NATIVE) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    _anInstance(this, $Promise, PROMISE, '_h');
	    _aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = _redefineAll($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode$1 ? process$2.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = _ctx($resolve, promise, 1);
	    this.reject = _ctx($reject, promise, 1);
	  };
	  _newPromiseCapability.f = newPromiseCapability = function (C) {
	    return C === $Promise || C === Wrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Promise: $Promise });
	_setToStringTag($Promise, PROMISE);
	_setSpecies(PROMISE);
	Wrapper = _core[PROMISE];

	// statics
	_export(_export.S + _export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    var $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	_export(_export.S + _export.F * (_library || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    return _promiseResolve(_library && this === Wrapper ? $Promise : this, x);
	  }
	});
	_export(_export.S + _export.F * !(USE_NATIVE && _iterDetect(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = _perform(function () {
	      var values = [];
	      var index = 0;
	      var remaining = 1;
	      _forOf(iterable, false, function (promise) {
	        var $index = index++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var reject = capability.reject;
	    var result = _perform(function () {
	      _forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  }
	});

	var f$5 = _wks;

	var _wksExt = {
		f: f$5
	};

	var defineProperty = _objectDp.f;
	var _wksDefine = function (name) {
	  var $Symbol = _core.Symbol || (_core.Symbol = _global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: _wksExt.f(name) });
	};

	_wksDefine('asyncIterator');

	// all enumerable object keys, includes symbols



	var _enumKeys = function (it) {
	  var result = _objectKeys(it);
	  var getSymbols = _objectGops.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = _objectPie.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array';
	};

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

	var f$6 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return _objectKeysInternal(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$6
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

	var gOPN = _objectGopn.f;
	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	var f$7 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
	};

	var _objectGopnExt = {
		f: f$7
	};

	// ECMAScript 6 symbols shim





	var META = _meta.KEY;



















	var gOPD$1 = _objectGopd.f;
	var dP$3 = _objectDp.f;
	var gOPN$1 = _objectGopnExt.f;
	var $Symbol = _global.Symbol;
	var $JSON = _global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE$2 = 'prototype';
	var HIDDEN = _wks('_hidden');
	var TO_PRIMITIVE = _wks('toPrimitive');
	var isEnum$1 = {}.propertyIsEnumerable;
	var SymbolRegistry = _shared('symbol-registry');
	var AllSymbols = _shared('symbols');
	var OPSymbols = _shared('op-symbols');
	var ObjectProto$1 = Object[PROTOTYPE$2];
	var USE_NATIVE$1 = typeof $Symbol == 'function';
	var QObject = _global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = _descriptors && _fails(function () {
	  return _objectCreate(dP$3({}, 'a', {
	    get: function () { return dP$3(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD$1(ObjectProto$1, key);
	  if (protoDesc) delete ObjectProto$1[key];
	  dP$3(it, key, D);
	  if (protoDesc && it !== ObjectProto$1) dP$3(ObjectProto$1, key, protoDesc);
	} : dP$3;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE$1 && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D);
	  _anObject(it);
	  key = _toPrimitive(key, true);
	  _anObject(D);
	  if (_has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!_has(it, HIDDEN)) dP$3(it, HIDDEN, _propertyDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP$3(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  _anObject(it);
	  var keys = _enumKeys(P = _toIobject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum$1.call(this, key = _toPrimitive(key, true));
	  if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
	  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = _toIobject(it);
	  key = _toPrimitive(key, true);
	  if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
	  var D = gOPD$1(it, key);
	  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN$1(_toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto$1;
	  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE$1) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto$1) $set.call(OPSymbols, value);
	      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, _propertyDesc(1, value));
	    };
	    if (_descriptors && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
	    return this._k;
	  });

	  _objectGopd.f = $getOwnPropertyDescriptor;
	  _objectDp.f = $defineProperty;
	  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
	  _objectPie.f = $propertyIsEnumerable;
	  _objectGops.f = $getOwnPropertySymbols;

	  if (_descriptors && !_library) {
	    _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  _wksExt.f = function (name) {
	    return wrap(_wks(name));
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE$1, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

	for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

	_export(_export.S + _export.F * !USE_NATIVE$1, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return _has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	_export(_export.S + _export.F * !USE_NATIVE$1, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && _export(_export.S + _export.F * (!USE_NATIVE$1 || _fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!_isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	_setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	_setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	_setToStringTag(_global.JSON, 'JSON', true);

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

	var proto$1 = map.prototype;

	Set$1.prototype = set$1.prototype = {
	  constructor: Set$1,
	  has: proto$1.has,
	  add: function(value) {
	    value += "";
	    this[prefix + value] = value;
	    return this;
	  },
	  remove: proto$1.remove,
	  clear: proto$1.clear,
	  values: proto$1.keys,
	  size: proto$1.size,
	  empty: proto$1.empty,
	  each: proto$1.each
	};

	function set$1(object, f) {
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
	      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
	      return;
	    }

	    // If a type was specified, set the callback for the given type and name.
	    // Otherwise, if a null callback was specified, remove callbacks of the given name.
	    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
	    while (++i < n) {
	      if (t = (typename = T[i]).type) _[t] = set$2(_[t], typename.name, callback);
	      else if (callback == null) for (t in _) _[t] = set$2(_[t], typename.name, null);
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

	function get(type, name) {
	  for (var i = 0, n = type.length, c; i < n; ++i) {
	    if ((c = type[i]).name === name) {
	      return c.value;
	    }
	  }
	}

	function set$2(type, name, callback) {
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

	var tsv = dsv("\t");

	var $min = Math.min;
	var $push = [].push;
	var $SPLIT = 'split';
	var LENGTH = 'length';
	var LAST_INDEX$1 = 'lastIndex';

	// eslint-disable-next-line no-empty
	var SUPPORTS_Y = !!(function () { try { return new RegExp('x', 'y'); } catch (e) {} })();

	// @@split logic
	_fixReWks('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
	  var internalSplit;
	  if (
	    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
	    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
	    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
	    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
	    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
	    ''[$SPLIT](/.?/)[LENGTH]
	  ) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = String(this);
	      if (separator === undefined && limit === 0) return [];
	      // If `separator` is not a regex, use native split
	      if (!_isRegexp(separator)) return $split.call(string, separator, limit);
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;
	      while (match = _regexpExec.call(separatorCopy, string)) {
	        lastIndex = separatorCopy[LAST_INDEX$1];
	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
	          lastLength = match[0][LENGTH];
	          lastLastIndex = lastIndex;
	          if (output[LENGTH] >= splitLimit) break;
	        }
	        if (separatorCopy[LAST_INDEX$1] === match.index) separatorCopy[LAST_INDEX$1]++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string[LENGTH]) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	    };
	  // Chakra, V8
	  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
	    };
	  } else {
	    internalSplit = $split;
	  }

	  return [
	    // `String.prototype.split` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = defined(this);
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
	      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
	      if (res.done) return res.value;

	      var rx = _anObject(regexp);
	      var S = String(this);
	      var C = _speciesConstructor(rx, RegExp);

	      var unicodeMatching = rx.unicode;
	      var flags = (rx.ignoreCase ? 'i' : '') +
	                    (rx.multiline ? 'm' : '') +
	                    (rx.unicode ? 'u' : '') +
	                    (SUPPORTS_Y ? 'y' : 'g');

	      // ^(? + rx + ) is needed, in combination with some S slicing, to
	      // simulate the 'y' flag.
	      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	      var lim = limit === undefined ? 0xffffffff : limit >>> 0;
	      if (lim === 0) return [];
	      if (S.length === 0) return _regexpExecAbstract(splitter, S) === null ? [S] : [];
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = SUPPORTS_Y ? q : 0;
	        var z = _regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
	        var e;
	        if (
	          z === null ||
	          (e = $min(_toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
	        ) {
	          q = _advanceStringIndex(S, q, unicodeMatching);
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
	});

	var STARTS_WITH = 'startsWith';
	var $startsWith = ''[STARTS_WITH];

	_export(_export.P + _export.F * _failsIsRegexp(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString /* , position = 0 */) {
	    var that = _stringContext(this, searchString, STARTS_WITH);
	    var index = _toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
	    var search = String(searchString);
	    return $startsWith
	      ? $startsWith.call(that, search, index)
	      : that.slice(index, index + search.length) === search;
	  }
	});

	var _marked =
	/*#__PURE__*/
	regeneratorRuntime.mark(makeGenerator),
	    _marked2 =
	/*#__PURE__*/
	regeneratorRuntime.mark(iter);

	function asArray(x) {
	  if (!x) return [];
	  return Array.isArray(x) ? x : [x];
	}
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
	  }, _marked, this);
	}
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
	function iter(data, func) {
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

	  return regeneratorRuntime.wrap(function iter$(_context2) {
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
	  }, _marked2, this, [[5, 20, 24, 32], [25,, 27, 31]]);
	}
	function chain(data) {
	  for (var _len2 = arguments.length, operations = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    operations[_key2 - 1] = arguments[_key2];
	  }

	  return iter(data, operations.reduce(function (p, n) {
	    return function (x, i) {
	      var prev = p(x, i);
	      var next = prev ? n(prev, i) : false;
	      return next === true ? prev : next;
	    };
	  }, function (x) {
	    return x;
	  }));
	}
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
	  return path.startsWith("/") || path.startsWith("./") ? "file://".concat(path) : path;
	}
	function xSplit(stringToSplit) {
	  for (var _len3 = arguments.length, patterns = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	    patterns[_key3 - 1] = arguments[_key3];
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
	  for (var _len4 = arguments.length, patterns = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	    patterns[_key4 - 1] = arguments[_key4];
	  }

	  return patterns.reduce(function (prev, next) {
	    return prev.split(next[0]).join(next[1]);
	  }, stringToReplace);
	}
	function xContains(stringToFilter) {
	  for (var _len5 = arguments.length, patterns = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
	    patterns[_key5 - 1] = arguments[_key5];
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

	// 19.1.2.5 Object.freeze(O)

	var meta = _meta.onFreeze;

	_objectSap('freeze', function ($freeze) {
	  return function freeze(it) {
	    return $freeze && _isObject(it) ? $freeze(meta(it)) : it;
	  };
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
	      var _arr, _i, value;

	      return regeneratorRuntime.wrap(function value$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              _arr = Object.values(this[__values__]);
	              _i = 0;

	            case 2:
	              if (!(_i < _arr.length)) {
	                _context.next = 9;
	                break;
	              }

	              value = _arr[_i];
	              _context.next = 6;
	              return value;

	            case 6:
	              _i++;
	              _context.next = 2;
	              break;

	            case 9:
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
	      var _this = this;

	      return match(data, [function (value) {
	        return value instanceof Array;
	      }, function () {
	        return _this._fromArray(data);
	      }], [function (value) {
	        return value instanceof Row;
	      }, function () {
	        return _this._fromObject(data[__values__]);
	      }], [function (value) {
	        return value instanceof Object && value !== null;
	      }, function () {
	        return _this._fromObject(data);
	      }], [function () {
	        return true;
	      }, function (value) {
	        throw new ArgumentTypeError(value, "Row | Array | Object");
	      }]);
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
	      var _this2 = this;

	      for (var _len = arguments.length, columnNames = new Array(_len), _key = 0; _key < _len; _key++) {
	        columnNames[_key] = arguments[_key];
	      }

	      return this.__newInstance__(Object.assign.apply(Object, [{}].concat(_toConsumableArray(columnNames.map(function (column) {
	        return _defineProperty({}, column, _this2.get(column));
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
	   * new GroupedDataFrame(df, 'column1');
	   */
	  function GroupedDataFrame(df) {
	    _classCallCheck(this, GroupedDataFrame);

	    for (var _len = arguments.length, columnNames = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      columnNames[_key - 1] = arguments[_key];
	    }

	    var _this$_groupBy = this._groupBy(df, columnNames);

	    var _this$_groupBy2 = _slicedToArray(_this$_groupBy, 2);

	    this[__groups__] = _this$_groupBy2[0];
	    this[__hashes__] = _this$_groupBy2[1];
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
	    key: "_groupBy",
	    value: function _groupBy(df, columnNames) {
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

	      return [hashes.reduce(function (groups, hash) {
	        var _rowsByGroup$hash$;

	        groups[hash] = {
	          groupKey: (_rowsByGroup$hash$ = rowsByGroup[hash][0]).select.apply(_rowsByGroup$hash$, _toConsumableArray(columnNames)).toDict(),
	          hash: hash,
	          group: new df.constructor(rowsByGroup[hash], df.listColumns())
	        };
	        return groups;
	      }, {}), hashes];
	    }
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

	      for (var _len2 = arguments.length, funcs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        funcs[_key2] = arguments[_key2];
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
	        return _objectSpread({}, groupKey, _defineProperty({}, columnName, func(group, groupKey)));
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
	          return _objectSpread({}, p, n);
	        }, {});
	      }).toCollection().map(function (_ref11) {
	        var aggregation = _ref11.aggregation,
	            rest = _objectWithoutProperties(_ref11, ["aggregation"]);

	        return _objectSpread({}, rest, aggregation);
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
	          return _objectSpread({}, rest, x);
	        })));
	      }, []), columns);
	    }
	  }]);

	  return GroupedDataFrame;
	}();

	var __columns__$1 = Symbol("columns");

	var __rows__ = Symbol("rows");
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
	    value: function fromDSV(pathOrFile) {
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

	        return new DataFrame(fileContent);
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
	    value: function fromText(pathOrFile) {
	      var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ";";
	      var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	      return DataFrame.fromDSV(pathOrFile, sep, header);
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
	    value: function fromCSV(pathOrFile) {
	      var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	      return DataFrame.fromDSV(pathOrFile, ",", header);
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
	    value: function fromTSV(pathOrFile) {
	      var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	      return DataFrame.fromDSV(pathOrFile, "\t", header);
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
	    value: function fromPSV(pathOrFile) {
	      var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	      return DataFrame.fromDSV(pathOrFile, "|", header);
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
	    value: function fromJSON(pathOrFile) {
	      return new Promise(function (resolve) {
	        return typeof pathOrFile === "string" ? json(addFileProtocol(pathOrFile), resolve) : loadTextFile(pathOrFile, function (txt) {
	          return resolve(JSON.parse(txt));
	        });
	      }).then(function (fileContent) {
	        if (fileContent === null) {
	          throw new FileNotFoundError(pathOrFile);
	        }

	        return new DataFrame(fileContent);
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

	      var _arr = Object.keys(columns);

	      for (var _i = 0; _i < _arr.length; _i++) {
	        var key = _arr[_i];
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
	      var _this2 = this;

	      return match(data, [function (value) {
	        return value instanceof DataFrame;
	      }, function () {
	        return _this2._fromArray(_toConsumableArray(data[__rows__]), columns ? columns : data[__columns__$1]);
	      }], [function (value) {
	        return value instanceof Array && value.length !== 0;
	      }, function () {
	        return _this2._fromArray(data, columns ? columns : _toConsumableArray(new Set([].concat(_toConsumableArray(data.slice(0, 10)), _toConsumableArray(data.slice(-10, -1))).map(function (row) {
	          return Object.keys(row);
	        }).reduce(function (p, n) {
	          return [].concat(_toConsumableArray(p), _toConsumableArray(n));
	        }))));
	      }], [function (value) {
	        return value instanceof Array && value.length === 0;
	      }, function () {
	        return _this2._fromArray(data, columns ? columns : []);
	      }], [function (value) {
	        return value instanceof Object;
	      }, function () {
	        return _this2._fromDict(data, columns ? columns : Object.keys(data));
	      }], [function () {
	        return true;
	      }, function () {
	        throw new ArgumentTypeError(data, "DataFrame | Array | Object");
	      }]);
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
	      var _this3 = this;

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
	          modifiedGroup = _this3.__newInstance__(combinedGroup, newColumns);
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
	     * Convert DataFrame into dict / hash / object.
	     * @returns {Object} The DataFrame converted into dict.
	     * @example
	     * df.toDict()
	     */

	  }, {
	    key: "toDict",
	    value: function toDict() {
	      var _this4 = this;

	      return Object.assign.apply(Object, [{}].concat(_toConsumableArray(Object.entries(this.transpose().toArray()).map(function (_ref3) {
	        var _ref4 = _slicedToArray(_ref3, 2),
	            index = _ref4[0],
	            column = _ref4[1];

	        return _defineProperty({}, _this4[__columns__$1][index], column);
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
	      return columnName ? _toConsumableArray(this).map(function (row) {
	        return row.get(columnName);
	      }) : _toConsumableArray(this).map(function (row) {
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
	      return ofRows ? _toConsumableArray(this) : _toConsumableArray(this).map(function (row) {
	        return row.toDict();
	      });
	    }
	    /**
	     * Convert the DataFrame into a text delimiter separated values.
	     You can also save the file if you are using nodejs.
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
	    value: function toDSV() {
	      var sep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ";";
	      var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	      var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
	      var parser = dsv(sep);
	      var csvContent = header ? parser.format(this.toCollection(), this[__columns__$1]) : parser.formatRows(this.toArray());

	      if (path) {
	        saveFile(this._cleanSavePath(path), csvContent);
	      }

	      return csvContent;
	    }
	    /**
	    * Convert the DataFrame into a text delimiter separated values. Alias for .toDSV.
	     You can also save the file if you are using nodejs.
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
	    value: function toText() {
	      var sep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ";";
	      var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	      var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
	      return this.toDSV(sep, header, path);
	    }
	    /**
	     * Convert the DataFrame into a comma separated values string.
	     You can also save the file if you are using nodejs.
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
	    value: function toCSV() {
	      var header = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
	      return this.toDSV(",", header, path);
	    }
	    /**
	     * Convert the DataFrame into a tab separated values string.
	     You can also save the file if you are using nodejs.
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
	    value: function toTSV() {
	      var header = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
	      return this.toDSV("\t", header, path);
	    }
	    /**
	     * Convert the DataFrame into a pipe separated values string.
	     You can also save the file if you are using nodejs.
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
	    value: function toPSV() {
	      var header = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
	      return this.toDSV("|", header, path);
	    }
	    /**
	     * Convert the DataFrame into a json string. You can also save the file if you are using nodejs.
	     * @param {Boolean} [asCollection=true] Writing the JSON as collection of Object.
	     * @param {String} [path] The path to save the file. /!\ Works only on node.js, not into the browser.
	     * @returns {String} The json file in raw string.
	     * @example
	     * df.toJSON()
	     * // From node.js only
	     * df.toJSON('/my/absolute/path/dataframe.json')
	     */

	  }, {
	    key: "toJSON",
	    value: function toJSON() {
	      var asCollection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
	      var jsonContent = JSON.stringify(asCollection ? this.toCollection() : this.toDict());

	      if (path) {
	        saveFile(this._cleanSavePath(path), jsonContent);
	      }

	      return jsonContent;
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
	      for (var _len2 = arguments.length, rows = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        rows[_key2] = arguments[_key2];
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
	      var _this5 = this;

	      var columns = columnNames && columnNames.length > 0 ? columnNames : this[__columns__$1];
	      var values = Array.isArray(value) ? value : [value];
	      return this.map(function (row) {
	        return (columns.length > 0 ? columns : _this5[__columns__$1]).reduce(function (p, n) {
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
	      for (var _len3 = arguments.length, columnNames = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        columnNames[_key3] = arguments[_key3];
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
	      var _this6 = this;

	      if (typeFunctions.length !== this[__columns__$1].length) {
	        throw new WrongSchemaError(typeFunctions, this[__columns__$1]);
	      }

	      return this.map(function (row) {
	        return new Row(row.toArray().map(function (column, index) {
	          return typeFunctions[index](column);
	        }), _this6[__columns__$1]);
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
	      for (var _len4 = arguments.length, funcs = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	        funcs[_key4] = arguments[_key4];
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

	      var filteredRows = _toConsumableArray(iter(this[__rows__], function (row, i) {
	        return func(row, i) ? row : false;
	      }));

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
	      return this.__newInstance__(_toConsumableArray(iter(this[__rows__], function (row, i) {
	        return func(row, i);
	      })), this[__columns__$1]);
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
	      for (var _len5 = arguments.length, columnNames = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	        columnNames[_key5] = arguments[_key5];
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
	      return this.__newInstance__(_toConsumableArray(iter(this.shuffle()[__rows__], function (row) {
	        token++;
	        return row;
	      }, function () {
	        return token >= nRows;
	      })), this[__columns__$1]);
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
	      return [this.__newInstance__(_toConsumableArray(iter(this.shuffle()[__rows__], function (row) {
	        if (token < nRows) {
	          token++;
	          return row;
	        }

	        restRows.push(row);
	      })), this[__columns__$1]), this.__newInstance__(restRows, this[__columns__$1])];
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
	    value: function groupBy() {
	      for (var _len6 = arguments.length, columnNames = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	        columnNames[_key6] = arguments[_key6];
	      }

	      return _construct(GroupedDataFrame, [this].concat(columnNames));
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

	      // ensure unique columns
	      var _columnNames = Array.from(new Set(asArray(columnNames)));

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
	          for (var _i2 = 0; _i2 < _columnNames.length; _i2++) {
	            var col = _columnNames[_i2];

	            if (_checkMissingValue(row.get(col))) {
	              sortedRowsWithMissingValues.push(row);
	              return;
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
	      var _this7 = this;

	      var how = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "inner";
	      var joinMethods = {
	        inner: function inner() {
	          return _this7.innerJoin(dfToJoin, columnNames);
	        },
	        full: function full() {
	          return _this7.fullJoin(dfToJoin, columnNames);
	        },
	        outer: function outer() {
	          return _this7.outerJoin(dfToJoin, columnNames);
	        },
	        left: function left() {
	          return _this7.leftJoin(dfToJoin, columnNames);
	        },
	        right: function right() {
	          return _this7.rightJoin(dfToJoin, columnNames);
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

	// 20.1.2.4 Number.isNaN(number)


	_export(_export.S, 'Number', {
	  isNaN: function isNaN(number) {
	    // eslint-disable-next-line no-self-compare
	    return number != number;
	  }
	});

	var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var space = '[' + _stringWs + ']';
	var non = '\u200b\u0085';
	var ltrim = RegExp('^' + space + space + '*');
	var rtrim = RegExp(space + space + '*$');

	var exporter = function (KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = _fails(function () {
	    return !!_stringWs[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
	  if (ALIAS) exp[ALIAS] = fn;
	  _export(_export.P + _export.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function (string, TYPE) {
	  string = String(_defined(string));
	  if (TYPE & 1) string = string.replace(ltrim, '');
	  if (TYPE & 2) string = string.replace(rtrim, '');
	  return string;
	};

	var _stringTrim = exporter;

	var gOPN$2 = _objectGopn.f;
	var gOPD$2 = _objectGopd.f;
	var dP$4 = _objectDp.f;
	var $trim = _stringTrim.trim;
	var NUMBER = 'Number';
	var $Number = _global[NUMBER];
	var Base = $Number;
	var proto$2 = $Number.prototype;
	// Opera ~12 has broken Object#toString
	var BROKEN_COF = _cof(_objectCreate(proto$2)) == NUMBER;
	var TRIM = 'trim' in String.prototype;

	// 7.1.3 ToNumber(argument)
	var toNumber = function (argument) {
	  var it = _toPrimitive(argument, false);
	  if (typeof it == 'string' && it.length > 2) {
	    it = TRIM ? it.trim() : $trim(it, 3);
	    var first = it.charCodeAt(0);
	    var third, radix, maxCode;
	    if (first === 43 || first === 45) {
	      third = it.charCodeAt(2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (it.charCodeAt(1)) {
	        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
	        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
	        default: return +it;
	      }
	      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
	  $Number = function Number(value) {
	    var it = arguments.length < 1 ? 0 : value;
	    var that = this;
	    return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? _fails(function () { proto$2.valueOf.call(that); }) : _cof(that) != NUMBER)
	        ? _inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
	  };
	  for (var keys$1 = _descriptors ? gOPN$2(Base) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), j$1 = 0, key$1; keys$1.length > j$1; j$1++) {
	    if (_has(Base, key$1 = keys$1[j$1]) && !_has($Number, key$1)) {
	      dP$4($Number, key$1, gOPD$2(Base, key$1));
	    }
	  }
	  $Number.prototype = proto$2;
	  proto$2.constructor = $Number;
	  _redefine(_global, NUMBER, $Number);
	}

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

	var dP$5 = _objectDp.f;
	var gOPN$3 = _objectGopn.f;


	var $RegExp = _global.RegExp;
	var Base$1 = $RegExp;
	var proto$3 = $RegExp.prototype;
	var re1 = /a/g;
	var re2 = /a/g;
	// "new" creates a new object, old webkit buggy here
	var CORRECT_NEW = new $RegExp(re1) !== re1;

	if (_descriptors && (!CORRECT_NEW || _fails(function () {
	  re2[_wks('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))) {
	  $RegExp = function RegExp(p, f) {
	    var tiRE = this instanceof $RegExp;
	    var piRE = _isRegexp(p);
	    var fiU = f === undefined;
	    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
	      : _inheritIfRequired(CORRECT_NEW
	        ? new Base$1(piRE && !fiU ? p.source : p, f)
	        : Base$1((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? _flags.call(p) : f)
	      , tiRE ? this : proto$3, $RegExp);
	  };
	  var proxy = function (key) {
	    key in $RegExp || dP$5($RegExp, key, {
	      configurable: true,
	      get: function () { return Base$1[key]; },
	      set: function (it) { Base$1[key] = it; }
	    });
	  };
	  for (var keys$2 = gOPN$3(Base$1), i$1 = 0; keys$2.length > i$1;) proxy(keys$2[i$1++]);
	  proto$3.constructor = $RegExp;
	  $RegExp.prototype = proto$3;
	  _redefine(_global, 'RegExp', $RegExp);
	}

	_setSpecies('RegExp');

	var SPECIES$3 = _wks('species');

	var _arraySpeciesConstructor = function (original) {
	  var C;
	  if (_isArray(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
	    if (_isObject(C)) {
	      C = C[SPECIES$3];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


	var _arraySpeciesCreate = function (original, length) {
	  return new (_arraySpeciesConstructor(original))(length);
	};

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex





	var _arrayMethods = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = $create || _arraySpeciesCreate;
	  return function ($this, callbackfn, that) {
	    var O = _toObject($this);
	    var self = _iobject(O);
	    var f = _ctx(callbackfn, that, 3);
	    var length = _toLength(self.length);
	    var index = 0;
	    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var val, res;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      val = self[index];
	      res = f(val, index, O);
	      if (TYPE) {
	        if (IS_MAP) result[index] = res;   // map
	        else if (res) switch (TYPE) {
	          case 3: return true;             // some
	          case 5: return val;              // find
	          case 6: return index;            // findIndex
	          case 2: result.push(val);        // filter
	        } else if (IS_EVERY) return false; // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

	var $find = _arrayMethods(5);
	var KEY = 'find';
	var forced = true;
	// Shouldn't skip holes
	if (KEY in []) Array(1)[KEY](function () { forced = false; });
	_export(_export.P + _export.F * forced, 'Array', {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY);

	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)

	var $find$1 = _arrayMethods(6);
	var KEY$1 = 'findIndex';
	var forced$1 = true;
	// Shouldn't skip holes
	if (KEY$1 in []) Array(1)[KEY$1](function () { forced$1 = false; });
	_export(_export.P + _export.F * forced$1, 'Array', {
	  findIndex: function findIndex(callbackfn /* , that = undefined */) {
	    return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY$1);

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

	          return WHERE_OPERATORS[operatorToApply](String(row.get(terms[0])), xReplace(terms[1].trim(), ['"', ""], ["'", ""], ["`", ""]));
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
