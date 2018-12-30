(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('core-js/modules/es6.array.copy-within'), require('core-js/modules/es6.array.fill'), require('core-js/modules/es6.array.find'), require('core-js/modules/es6.array.find-index'), require('core-js/modules/es6.array.from'), require('core-js/modules/es7.array.includes'), require('core-js/modules/es6.array.iterator'), require('core-js/modules/es6.array.of'), require('core-js/modules/es6.array.sort'), require('core-js/modules/es6.array.species'), require('core-js/modules/es6.date.to-primitive'), require('core-js/modules/es6.function.has-instance'), require('core-js/modules/es6.function.name'), require('core-js/modules/es6.map'), require('core-js/modules/es6.math.acosh'), require('core-js/modules/es6.math.asinh'), require('core-js/modules/es6.math.atanh'), require('core-js/modules/es6.math.cbrt'), require('core-js/modules/es6.math.clz32'), require('core-js/modules/es6.math.cosh'), require('core-js/modules/es6.math.expm1'), require('core-js/modules/es6.math.fround'), require('core-js/modules/es6.math.hypot'), require('core-js/modules/es6.math.imul'), require('core-js/modules/es6.math.log1p'), require('core-js/modules/es6.math.log10'), require('core-js/modules/es6.math.log2'), require('core-js/modules/es6.math.sign'), require('core-js/modules/es6.math.sinh'), require('core-js/modules/es6.math.tanh'), require('core-js/modules/es6.math.trunc'), require('core-js/modules/es6.number.constructor'), require('core-js/modules/es6.number.epsilon'), require('core-js/modules/es6.number.is-finite'), require('core-js/modules/es6.number.is-integer'), require('core-js/modules/es6.number.is-nan'), require('core-js/modules/es6.number.is-safe-integer'), require('core-js/modules/es6.number.max-safe-integer'), require('core-js/modules/es6.number.min-safe-integer'), require('core-js/modules/es6.number.parse-float'), require('core-js/modules/es6.number.parse-int'), require('core-js/modules/es6.object.assign'), require('core-js/modules/es7.object.define-getter'), require('core-js/modules/es7.object.define-setter'), require('core-js/modules/es7.object.entries'), require('core-js/modules/es6.object.freeze'), require('core-js/modules/es6.object.get-own-property-descriptor'), require('core-js/modules/es7.object.get-own-property-descriptors'), require('core-js/modules/es6.object.get-own-property-names'), require('core-js/modules/es6.object.get-prototype-of'), require('core-js/modules/es7.object.lookup-getter'), require('core-js/modules/es7.object.lookup-setter'), require('core-js/modules/es6.object.prevent-extensions'), require('core-js/modules/es6.object.is'), require('core-js/modules/es6.object.is-frozen'), require('core-js/modules/es6.object.is-sealed'), require('core-js/modules/es6.object.is-extensible'), require('core-js/modules/es6.object.keys'), require('core-js/modules/es6.object.seal'), require('core-js/modules/es7.object.values'), require('core-js/modules/es6.promise'), require('core-js/modules/es7.promise.finally'), require('core-js/modules/es6.reflect.apply'), require('core-js/modules/es6.reflect.construct'), require('core-js/modules/es6.reflect.define-property'), require('core-js/modules/es6.reflect.delete-property'), require('core-js/modules/es6.reflect.get'), require('core-js/modules/es6.reflect.get-own-property-descriptor'), require('core-js/modules/es6.reflect.get-prototype-of'), require('core-js/modules/es6.reflect.has'), require('core-js/modules/es6.reflect.is-extensible'), require('core-js/modules/es6.reflect.own-keys'), require('core-js/modules/es6.reflect.prevent-extensions'), require('core-js/modules/es6.reflect.set'), require('core-js/modules/es6.reflect.set-prototype-of'), require('core-js/modules/es6.regexp.constructor'), require('core-js/modules/es6.regexp.flags'), require('core-js/modules/es6.regexp.match'), require('core-js/modules/es6.regexp.replace'), require('core-js/modules/es6.regexp.split'), require('core-js/modules/es6.regexp.search'), require('core-js/modules/es6.regexp.to-string'), require('core-js/modules/es6.set'), require('core-js/modules/es6.symbol'), require('core-js/modules/es7.symbol.async-iterator'), require('core-js/modules/es6.string.anchor'), require('core-js/modules/es6.string.big'), require('core-js/modules/es6.string.blink'), require('core-js/modules/es6.string.bold'), require('core-js/modules/es6.string.code-point-at'), require('core-js/modules/es6.string.ends-with'), require('core-js/modules/es6.string.fixed'), require('core-js/modules/es6.string.fontcolor'), require('core-js/modules/es6.string.fontsize'), require('core-js/modules/es6.string.from-code-point'), require('core-js/modules/es6.string.includes'), require('core-js/modules/es6.string.italics'), require('core-js/modules/es6.string.iterator'), require('core-js/modules/es6.string.link'), require('core-js/modules/es7.string.pad-start'), require('core-js/modules/es7.string.pad-end'), require('core-js/modules/es6.string.raw'), require('core-js/modules/es6.string.repeat'), require('core-js/modules/es6.string.small'), require('core-js/modules/es6.string.starts-with'), require('core-js/modules/es6.string.strike'), require('core-js/modules/es6.string.sub'), require('core-js/modules/es6.string.sup'), require('core-js/modules/es6.typed.array-buffer'), require('core-js/modules/es6.typed.int8-array'), require('core-js/modules/es6.typed.uint8-array'), require('core-js/modules/es6.typed.uint8-clamped-array'), require('core-js/modules/es6.typed.int16-array'), require('core-js/modules/es6.typed.uint16-array'), require('core-js/modules/es6.typed.int32-array'), require('core-js/modules/es6.typed.uint32-array'), require('core-js/modules/es6.typed.float32-array'), require('core-js/modules/es6.typed.float64-array'), require('core-js/modules/es6.weak-map'), require('core-js/modules/es6.weak-set'), require('core-js/modules/web.timers'), require('core-js/modules/web.immediate'), require('core-js/modules/web.dom.iterable'), require('regenerator-runtime/runtime'), require('d3-request'), require('d3-dsv')) :
  typeof define === 'function' && define.amd ? define(['exports', 'core-js/modules/es6.array.copy-within', 'core-js/modules/es6.array.fill', 'core-js/modules/es6.array.find', 'core-js/modules/es6.array.find-index', 'core-js/modules/es6.array.from', 'core-js/modules/es7.array.includes', 'core-js/modules/es6.array.iterator', 'core-js/modules/es6.array.of', 'core-js/modules/es6.array.sort', 'core-js/modules/es6.array.species', 'core-js/modules/es6.date.to-primitive', 'core-js/modules/es6.function.has-instance', 'core-js/modules/es6.function.name', 'core-js/modules/es6.map', 'core-js/modules/es6.math.acosh', 'core-js/modules/es6.math.asinh', 'core-js/modules/es6.math.atanh', 'core-js/modules/es6.math.cbrt', 'core-js/modules/es6.math.clz32', 'core-js/modules/es6.math.cosh', 'core-js/modules/es6.math.expm1', 'core-js/modules/es6.math.fround', 'core-js/modules/es6.math.hypot', 'core-js/modules/es6.math.imul', 'core-js/modules/es6.math.log1p', 'core-js/modules/es6.math.log10', 'core-js/modules/es6.math.log2', 'core-js/modules/es6.math.sign', 'core-js/modules/es6.math.sinh', 'core-js/modules/es6.math.tanh', 'core-js/modules/es6.math.trunc', 'core-js/modules/es6.number.constructor', 'core-js/modules/es6.number.epsilon', 'core-js/modules/es6.number.is-finite', 'core-js/modules/es6.number.is-integer', 'core-js/modules/es6.number.is-nan', 'core-js/modules/es6.number.is-safe-integer', 'core-js/modules/es6.number.max-safe-integer', 'core-js/modules/es6.number.min-safe-integer', 'core-js/modules/es6.number.parse-float', 'core-js/modules/es6.number.parse-int', 'core-js/modules/es6.object.assign', 'core-js/modules/es7.object.define-getter', 'core-js/modules/es7.object.define-setter', 'core-js/modules/es7.object.entries', 'core-js/modules/es6.object.freeze', 'core-js/modules/es6.object.get-own-property-descriptor', 'core-js/modules/es7.object.get-own-property-descriptors', 'core-js/modules/es6.object.get-own-property-names', 'core-js/modules/es6.object.get-prototype-of', 'core-js/modules/es7.object.lookup-getter', 'core-js/modules/es7.object.lookup-setter', 'core-js/modules/es6.object.prevent-extensions', 'core-js/modules/es6.object.is', 'core-js/modules/es6.object.is-frozen', 'core-js/modules/es6.object.is-sealed', 'core-js/modules/es6.object.is-extensible', 'core-js/modules/es6.object.keys', 'core-js/modules/es6.object.seal', 'core-js/modules/es7.object.values', 'core-js/modules/es6.promise', 'core-js/modules/es7.promise.finally', 'core-js/modules/es6.reflect.apply', 'core-js/modules/es6.reflect.construct', 'core-js/modules/es6.reflect.define-property', 'core-js/modules/es6.reflect.delete-property', 'core-js/modules/es6.reflect.get', 'core-js/modules/es6.reflect.get-own-property-descriptor', 'core-js/modules/es6.reflect.get-prototype-of', 'core-js/modules/es6.reflect.has', 'core-js/modules/es6.reflect.is-extensible', 'core-js/modules/es6.reflect.own-keys', 'core-js/modules/es6.reflect.prevent-extensions', 'core-js/modules/es6.reflect.set', 'core-js/modules/es6.reflect.set-prototype-of', 'core-js/modules/es6.regexp.constructor', 'core-js/modules/es6.regexp.flags', 'core-js/modules/es6.regexp.match', 'core-js/modules/es6.regexp.replace', 'core-js/modules/es6.regexp.split', 'core-js/modules/es6.regexp.search', 'core-js/modules/es6.regexp.to-string', 'core-js/modules/es6.set', 'core-js/modules/es6.symbol', 'core-js/modules/es7.symbol.async-iterator', 'core-js/modules/es6.string.anchor', 'core-js/modules/es6.string.big', 'core-js/modules/es6.string.blink', 'core-js/modules/es6.string.bold', 'core-js/modules/es6.string.code-point-at', 'core-js/modules/es6.string.ends-with', 'core-js/modules/es6.string.fixed', 'core-js/modules/es6.string.fontcolor', 'core-js/modules/es6.string.fontsize', 'core-js/modules/es6.string.from-code-point', 'core-js/modules/es6.string.includes', 'core-js/modules/es6.string.italics', 'core-js/modules/es6.string.iterator', 'core-js/modules/es6.string.link', 'core-js/modules/es7.string.pad-start', 'core-js/modules/es7.string.pad-end', 'core-js/modules/es6.string.raw', 'core-js/modules/es6.string.repeat', 'core-js/modules/es6.string.small', 'core-js/modules/es6.string.starts-with', 'core-js/modules/es6.string.strike', 'core-js/modules/es6.string.sub', 'core-js/modules/es6.string.sup', 'core-js/modules/es6.typed.array-buffer', 'core-js/modules/es6.typed.int8-array', 'core-js/modules/es6.typed.uint8-array', 'core-js/modules/es6.typed.uint8-clamped-array', 'core-js/modules/es6.typed.int16-array', 'core-js/modules/es6.typed.uint16-array', 'core-js/modules/es6.typed.int32-array', 'core-js/modules/es6.typed.uint32-array', 'core-js/modules/es6.typed.float32-array', 'core-js/modules/es6.typed.float64-array', 'core-js/modules/es6.weak-map', 'core-js/modules/es6.weak-set', 'core-js/modules/web.timers', 'core-js/modules/web.immediate', 'core-js/modules/web.dom.iterable', 'regenerator-runtime/runtime', 'd3-request', 'd3-dsv'], factory) :
  (global = global || self, factory(global.dfjs = {}, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, global.d3Request, global.d3Dsv));
}(this, function (exports, es6_array_copyWithin, es6_array_fill, es6_array_find, es6_array_findIndex, es6_array_from, es7_array_includes, es6_array_iterator, es6_array_of, es6_array_sort, es6_array_species, es6_date_toPrimitive, es6_function_hasInstance, es6_function_name, es6_map, es6_math_acosh, es6_math_asinh, es6_math_atanh, es6_math_cbrt, es6_math_clz32, es6_math_cosh, es6_math_expm1, es6_math_fround, es6_math_hypot, es6_math_imul, es6_math_log1p, es6_math_log10, es6_math_log2, es6_math_sign, es6_math_sinh, es6_math_tanh, es6_math_trunc, es6_number_constructor, es6_number_epsilon, es6_number_isFinite, es6_number_isInteger, es6_number_isNan, es6_number_isSafeInteger, es6_number_maxSafeInteger, es6_number_minSafeInteger, es6_number_parseFloat, es6_number_parseInt, es6_object_assign, es7_object_defineGetter, es7_object_defineSetter, es7_object_entries, es6_object_freeze, es6_object_getOwnPropertyDescriptor, es7_object_getOwnPropertyDescriptors, es6_object_getOwnPropertyNames, es6_object_getPrototypeOf, es7_object_lookupGetter, es7_object_lookupSetter, es6_object_preventExtensions, es6_object_is, es6_object_isFrozen, es6_object_isSealed, es6_object_isExtensible, es6_object_keys, es6_object_seal, es7_object_values, es6_promise, es7_promise_finally, es6_reflect_apply, es6_reflect_construct, es6_reflect_defineProperty, es6_reflect_deleteProperty, es6_reflect_get, es6_reflect_getOwnPropertyDescriptor, es6_reflect_getPrototypeOf, es6_reflect_has, es6_reflect_isExtensible, es6_reflect_ownKeys, es6_reflect_preventExtensions, es6_reflect_set, es6_reflect_setPrototypeOf, es6_regexp_constructor, es6_regexp_flags, es6_regexp_match, es6_regexp_replace, es6_regexp_split, es6_regexp_search, es6_regexp_toString, es6_set, es6_symbol, es7_symbol_asyncIterator, es6_string_anchor, es6_string_big, es6_string_blink, es6_string_bold, es6_string_codePointAt, es6_string_endsWith, es6_string_fixed, es6_string_fontcolor, es6_string_fontsize, es6_string_fromCodePoint, es6_string_includes, es6_string_italics, es6_string_iterator, es6_string_link, es7_string_padStart, es7_string_padEnd, es6_string_raw, es6_string_repeat, es6_string_small, es6_string_startsWith, es6_string_strike, es6_string_sub, es6_string_sup, es6_typed_arrayBuffer, es6_typed_int8Array, es6_typed_uint8Array, es6_typed_uint8ClampedArray, es6_typed_int16Array, es6_typed_uint16Array, es6_typed_int32Array, es6_typed_uint32Array, es6_typed_float32Array, es6_typed_float64Array, es6_weakMap, es6_weakSet, web_timers, web_immediate, web_dom_iterable, runtime, d3Request, d3Dsv) { 'use strict';

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
  function compare(firstElem, secondElem) {
    var reverse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (firstElem > secondElem) {
      return reverse ? -1 : 1;
    } else if (firstElem < secondElem) {
      return reverse ? 1 : -1;
    }

    return 0;
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

      if (!(df instanceof DataFrame)) throw new ArgumentTypeError(df, "DataFrame");

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
            group: new DataFrame(rowsByGroup[hash], df.listColumns())
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


  var _Symbol$iterator = Symbol.iterator;

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
        var parser = d3Dsv.dsvFormat(sep);
        return new Promise(function (resolve) {
          var parseText = function parseText(fileContent) {
            if (fileContent.includes("Error: ENOENT")) return resolve(null);
            var data = header ? parser.parse(fileContent) : parser.parseRows(fileContent);
            return resolve(data);
          };

          return typeof pathOrFile === "string" ? d3Request.text(addFileProtocol(pathOrFile), parseText) : loadTextFile(pathOrFile, parseText);
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
          return typeof pathOrFile === "string" ? d3Request.json(addFileProtocol(pathOrFile), resolve) : loadTextFile(pathOrFile, function (txt) {
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
      key: _Symbol$iterator,
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
        var parser = d3Dsv.dsvFormat(sep);
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

        var columns = asArray(columnNames);
        return this.map(function (row) {
          return (columns.length > 0 ? columns : _this5[__columns__$1]).reduce(function (p, n) {
            return p.get(n) === value ? p.set(n, replacement) : p;
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

        return filteredRows.length > 0 ? this.__newInstance__(filteredRows, this[__columns__$1]) : this.__newInstance__([], []);
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

        // ensure unique columns
        var _columnNames = Array.from(new Set(asArray(columnNames)));

        var sortedRows = this[__rows__].sort(function (p, n) {
          return _columnNames.map(function (col) {
            var _ref8 = [p.get(col), n.get(col)],
                pValue = _ref8[0],
                nValue = _ref8[1];

            if (_typeof(pValue) !== _typeof(nValue)) {
              throw new MixedTypeError();
            }

            return compare(pValue, nValue, reverse);
          }).reduce(function (acc, curr) {
            return acc || curr;
          });
        });

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
    }]);

    return DataFrame;
  }();

  _defineProperty(DataFrame, "defaultModules", []);

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

  Object.defineProperty(exports, '__esModule', { value: true });

}));
