'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _shouldAsFunction = require('should/as-function');

var _shouldAsFunction2 = _interopRequireDefault(_shouldAsFunction);

var T = {
  shouldTypeCheck: process && process.env && process.env.NODE_ENV === 'development',
  // T.any() ~ 243
  any: function any() {
    return function (x) {
      return void x;
    };
  },
  // T.instanceOf(Constructor) ~ new Constructor()
  instanceOf: function instanceOf(Class) {
    return function (x) {
      return (0, _shouldAsFunction2['default'])(x).be.an.instanceOf(Class);
    };
  },
  // T.exactly(42) ~ 42
  exactly: function exactly(v) {
    return function (x) {
      return (0, _shouldAsFunction2['default'])(x).be.exactly(v);
    };
  },
  // T.deepEqual({ a: 11 }) ~ { a: 11 }
  deepEqual: function deepEqual(v) {
    return function (x) {
      return (0, _shouldAsFunction2['default'])(x).eql(v);
    };
  },
  bool: function bool() {
    return function (x) {
      return (0, _shouldAsFunction2['default'])(x).equalOneOf(true, false);
    };
  },
  // T.Number() ~ 1
  // T.Number({ within: [4, 5] }) ~ 4.5
  Number: function Number() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var above = _ref.above;
    var below = _ref.below;
    var within = _ref.within;

    return function (x) {
      (0, _shouldAsFunction2['default'])(x).be.a.Number();
      if (above !== void 0) {
        (0, _shouldAsFunction2['default'])(x).be.above(above);
      }
      if (below !== void 0) {
        (0, _shouldAsFunction2['default'])(x).be.below(below);
      }
      if (within !== void 0) {
        var _should$be;

        (_should$be = (0, _shouldAsFunction2['default'])(x).be).within.apply(_should$be, _toConsumableArray(within));
      }
    };
  },
  String: function String() {
    var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var length = _ref2.length;
    var match = _ref2.match;

    return function (x) {
      (0, _shouldAsFunction2['default'])(x).be.a.String();
      if (length !== void 0) {
        (0, _shouldAsFunction2['default'])(x.length).be.exactly(length);
      }
      if (match !== void 0) {
        (0, _shouldAsFunction2['default'])(x).match(match);
      }
    };
  },
  Array: function Array() {
    var _ref3 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var type = _ref3.type;
    var length = _ref3.length;

    return function (x) {
      (0, _shouldAsFunction2['default'])(x).be.an.Array();
      if (type) {
        x.forEach(function (v) {
          return type(v);
        });
      }
      if (length !== void 0) {
        (0, _shouldAsFunction2['default'])(x.length).be.exactly(length);
      }
    };
  },
  Object: (function (_Object) {
    function Object() {
      return _Object.apply(this, arguments);
    }

    Object.toString = function () {
      return _Object.toString();
    };

    return Object;
  })(function () {
    var _ref4 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var type = _ref4.type;
    var length = _ref4.length;

    return function (x) {
      (0, _shouldAsFunction2['default'])(x).be.an.Object();
      if (type) {
        _Object$keys(x).forEach(function (k) {
          return type(x[k]);
        });
      }
      if (length !== void 0) {
        (0, _shouldAsFunction2['default'])(_Object$keys(x).length).be.exactly(length);
      }
    };
  }),
  Function: function Function() {
    var argsT = arguments.length <= 0 || arguments[0] === undefined ? T.any() : arguments[0];
    var retT = arguments.length <= 1 || arguments[1] === undefined ? T.any() : arguments[1];

    return function (x) {
      (0, _shouldAsFunction2['default'])(x).be.a.Function();
      return function () {
        return T.typecheck(argsT, retT)(x);
      };
    };
  },
  Promise: function Promise() {
    var _ref5 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var type = _ref5.type;

    return function (x) {
      T.shape({ then: T.Function() })(x);
      if (type !== void 0) {
        return x['catch'](function () {
          return void 0;
        }).then(function (v) {
          return type(v);
        });
      }
    };
  },
  eachOf: function eachOf() {
    for (var _len = arguments.length, types = Array(_len), _key = 0; _key < _len; _key++) {
      types[_key] = arguments[_key];
    }

    return function (x) {
      return types.forEach(function (t) {
        return t(x);
      });
    };
  },
  oneOf: function oneOf() {
    for (var _len2 = arguments.length, types = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      types[_key2] = arguments[_key2];
    }

    return function (x) {
      return (0, _shouldAsFunction2['default'])(types.filter(function (t) {
        try {
          t(x);
          return true;
        } catch (err) {
          return false;
        }
      }).length).be.above(0);
    };
  },
  not: function not(type) {
    return function (x) {
      return (0, _shouldAsFunction2['default'])(function () {
        return type(x);
      })['throw']();
    };
  },
  nullable: function nullable(type) {
    return function (x) {
      return x === null || type(x);
    };
  },
  option: function option(type) {
    return function (x) {
      return x === void 0 || type(x);
    };
  },
  shape: function shape(t) {
    return function (x) {
      // T([T.Number(), T.String(), T.Array(T.Number())]) ~ [1, 'foo', [1, 42]]
      if (t instanceof Array) {
        (0, _shouldAsFunction2['default'])(x).be.an.Array();
        return t.map(function (v, k) {
          return v(x[k]);
        });
      }
      // T({ foo: T.String(), bar: T.Number() }) ~ { foo: 'fizz', bar: 42 }
      if (t instanceof Object) {
        (0, _shouldAsFunction2['default'])(x).be.an.Object();
        return _Object$keys(t).map(function (k) {
          return t[k](x[k]);
        });
      }
      // T((x) => should(x).be.exactly(42)) ~ 42
      if (t instanceof Function) {
        t(x);
      }
    };
  }
};

function assertTypes(types, args) {
  (0, _shouldAsFunction2['default'])(types).be.an.Array();
  return args.map(function (v, k) {
    return types[k](v);
  });
}

function wrap(argsT, valT, fn) {
  if (typeof T.shouldTypeCheck === 'function' && !T.shouldTypeCheck() || !T.shouldTypeCheck) {
    return fn;
  }
  return function wrapped() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    assertTypes(argsT, args);
    var val = fn.apply(this, args);
    assertTypes([valT], [val]);
    return val;
  };
}

function typecheck(argsT, valT, fn) {
  if (fn !== void 0) {
    return wrap(argsT, valT, fn);
  }
  return function (target, key, desc) {
    return _extends({}, desc, {
      value: wrap(argsT, valT, desc.value)
    });
  };
}

exports['default'] = _Object$assign(T, { typecheck: typecheck });
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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Q0FBQyxLQUFLLENBQUM7O0dBQ3BDLENBQUM7Q0FDSjs7cUJBRWMsZUFBYyxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQVQsU0FBUyxFQUFFLENBQUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2hvdWxkIGZyb20gJ3Nob3VsZC9hcy1mdW5jdGlvbic7XHJcblxyXG5jb25zdCBUID0ge1xyXG4gIHNob3VsZFR5cGVDaGVjazogcHJvY2VzcyAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JyxcclxuICAvLyBULmFueSgpIH4gMjQzXHJcbiAgYW55KCkge1xyXG4gICAgcmV0dXJuICh4KSA9PiB2b2lkIHg7XHJcbiAgfSxcclxuICAvLyBULmluc3RhbmNlT2YoQ29uc3RydWN0b3IpIH4gbmV3IENvbnN0cnVjdG9yKClcclxuICBpbnN0YW5jZU9mKENsYXNzKSB7XHJcbiAgICByZXR1cm4gKHgpID0+IHNob3VsZCh4KS5iZS5hbi5pbnN0YW5jZU9mKENsYXNzKTtcclxuICB9LFxyXG4gIC8vIFQuZXhhY3RseSg0MikgfiA0MlxyXG4gIGV4YWN0bHkodikge1xyXG4gICAgcmV0dXJuICh4KSA9PiBzaG91bGQoeCkuYmUuZXhhY3RseSh2KTtcclxuICB9LFxyXG4gIC8vIFQuZGVlcEVxdWFsKHsgYTogMTEgfSkgfiB7IGE6IDExIH1cclxuICBkZWVwRXF1YWwodikge1xyXG4gICAgcmV0dXJuICh4KSA9PiBzaG91bGQoeCkuZXFsKHYpO1xyXG4gIH0sXHJcbiAgYm9vbCgpIHtcclxuICAgIHJldHVybiAoeCkgPT4gc2hvdWxkKHgpLmVxdWFsT25lT2YodHJ1ZSwgZmFsc2UpO1xyXG4gIH0sXHJcbiAgLy8gVC5OdW1iZXIoKSB+IDFcclxuICAvLyBULk51bWJlcih7IHdpdGhpbjogWzQsIDVdIH0pIH4gNC41XHJcbiAgTnVtYmVyKHsgYWJvdmUsIGJlbG93LCB3aXRoaW4gfSA9IHt9KSB7XHJcbiAgICByZXR1cm4gKHgpID0+IHtcclxuICAgICAgc2hvdWxkKHgpLmJlLmEuTnVtYmVyKCk7XHJcbiAgICAgIGlmKGFib3ZlICE9PSB2b2lkIDApIHtcclxuICAgICAgICBzaG91bGQoeCkuYmUuYWJvdmUoYWJvdmUpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKGJlbG93ICE9PSB2b2lkIDApIHtcclxuICAgICAgICBzaG91bGQoeCkuYmUuYmVsb3coYmVsb3cpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKHdpdGhpbiAhPT0gdm9pZCAwKSB7XHJcbiAgICAgICAgc2hvdWxkKHgpLmJlLndpdGhpbiguLi53aXRoaW4pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgU3RyaW5nKHsgbGVuZ3RoLCBtYXRjaCB9ID0ge30pIHtcclxuICAgIHJldHVybiAoeCkgPT4ge1xyXG4gICAgICBzaG91bGQoeCkuYmUuYS5TdHJpbmcoKTtcclxuICAgICAgaWYobGVuZ3RoICE9PSB2b2lkIDApIHtcclxuICAgICAgICBzaG91bGQoeC5sZW5ndGgpLmJlLmV4YWN0bHkobGVuZ3RoKTtcclxuICAgICAgfVxyXG4gICAgICBpZihtYXRjaCAhPT0gdm9pZCAwKSB7XHJcbiAgICAgICAgc2hvdWxkKHgpLm1hdGNoKG1hdGNoKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LFxyXG4gIEFycmF5KHsgdHlwZSwgbGVuZ3RoIH0gPSB7fSkge1xyXG4gICAgcmV0dXJuICh4KSA9PiB7XHJcbiAgICAgIHNob3VsZCh4KS5iZS5hbi5BcnJheSgpO1xyXG4gICAgICBpZih0eXBlKSB7XHJcbiAgICAgICAgeC5mb3JFYWNoKCh2KSA9PiB0eXBlKHYpKTtcclxuICAgICAgfVxyXG4gICAgICBpZihsZW5ndGggIT09IHZvaWQgMCkge1xyXG4gICAgICAgIHNob3VsZCh4Lmxlbmd0aCkuYmUuZXhhY3RseShsZW5ndGgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgT2JqZWN0KHsgdHlwZSwgbGVuZ3RoIH0gPSB7fSkge1xyXG4gICAgcmV0dXJuICh4KSA9PiB7XHJcbiAgICAgIHNob3VsZCh4KS5iZS5hbi5PYmplY3QoKTtcclxuICAgICAgaWYodHlwZSkge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHgpLmZvckVhY2goKGspID0+IHR5cGUoeFtrXSkpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKGxlbmd0aCAhPT0gdm9pZCAwKSB7XHJcbiAgICAgICAgc2hvdWxkKE9iamVjdC5rZXlzKHgpLmxlbmd0aCkuYmUuZXhhY3RseShsZW5ndGgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgRnVuY3Rpb24oYXJnc1QgPSBULmFueSgpLCByZXRUID0gVC5hbnkoKSkge1xyXG4gICAgcmV0dXJuICh4KSA9PiB7XHJcbiAgICAgIHNob3VsZCh4KS5iZS5hLkZ1bmN0aW9uKCk7XHJcbiAgICAgIHJldHVybiAoKSA9PiBULnR5cGVjaGVjayhhcmdzVCwgcmV0VCkoeCk7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgUHJvbWlzZSh7IHR5cGUgfSA9IHt9KSB7XHJcbiAgICByZXR1cm4gKHgpID0+IHtcclxuICAgICAgVC5zaGFwZSh7IHRoZW46IFQuRnVuY3Rpb24oKSB9KSh4KTtcclxuICAgICAgaWYodHlwZSAhPT0gdm9pZCAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHguY2F0Y2goKCkgPT4gdm9pZCAwKS50aGVuKCh2KSA9PiB0eXBlKHYpKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LFxyXG4gIGVhY2hPZiguLi50eXBlcykge1xyXG4gICAgcmV0dXJuICh4KSA9PiB0eXBlcy5mb3JFYWNoKCh0KSA9PiB0KHgpKTtcclxuICB9LFxyXG4gIG9uZU9mKC4uLnR5cGVzKSB7XHJcbiAgICByZXR1cm4gKHgpID0+XHJcbiAgICAgIHNob3VsZCh0eXBlcy5maWx0ZXIoKHQpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgdCh4KTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaChlcnIpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLmxlbmd0aCkuYmUuYWJvdmUoMClcclxuICAgIDtcclxuICB9LFxyXG4gIG5vdCh0eXBlKSB7XHJcbiAgICByZXR1cm4gKHgpID0+IHNob3VsZCgoKSA9PiB0eXBlKHgpKS50aHJvdygpO1xyXG4gIH0sXHJcbiAgbnVsbGFibGUodHlwZSkge1xyXG4gICAgcmV0dXJuICh4KSA9PiB4ID09PSBudWxsIHx8IHR5cGUoeCk7XHJcbiAgfSxcclxuICBvcHRpb24odHlwZSkge1xyXG4gICAgcmV0dXJuICh4KSA9PiB4ID09PSB2b2lkIDAgfHwgdHlwZSh4KTtcclxuICB9LFxyXG4gIHNoYXBlKHQpIHtcclxuICAgIHJldHVybiAoeCkgPT4ge1xyXG4gICAgICAvLyBUKFtULk51bWJlcigpLCBULlN0cmluZygpLCBULkFycmF5KFQuTnVtYmVyKCkpXSkgfiBbMSwgJ2ZvbycsIFsxLCA0Ml1dXHJcbiAgICAgIGlmKHQgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgIHNob3VsZCh4KS5iZS5hbi5BcnJheSgpO1xyXG4gICAgICAgIHJldHVybiB0Lm1hcCgodiwgaykgPT4gdih4W2tdKSk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gVCh7IGZvbzogVC5TdHJpbmcoKSwgYmFyOiBULk51bWJlcigpIH0pIH4geyBmb286ICdmaXp6JywgYmFyOiA0MiB9XHJcbiAgICAgIGlmKHQgaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgICBzaG91bGQoeCkuYmUuYW4uT2JqZWN0KCk7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHQpLm1hcCgoaykgPT4gdFtrXSh4W2tdKSk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gVCgoeCkgPT4gc2hvdWxkKHgpLmJlLmV4YWN0bHkoNDIpKSB+IDQyXHJcbiAgICAgIGlmKHQgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICAgIHQoeCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSxcclxufTtcclxuXHJcbmZ1bmN0aW9uIGFzc2VydFR5cGVzKHR5cGVzLCBhcmdzKSB7XHJcbiAgc2hvdWxkKHR5cGVzKS5iZS5hbi5BcnJheSgpO1xyXG4gIHJldHVybiBhcmdzLm1hcCgodiwgaykgPT4gdHlwZXNba10odikpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB3cmFwKGFyZ3NULCB2YWxULCBmbikge1xyXG4gIGlmKCh0eXBlb2YgVC5zaG91bGRUeXBlQ2hlY2sgPT09ICdmdW5jdGlvbicgJiYgIVQuc2hvdWxkVHlwZUNoZWNrKCkpIHx8ICFULnNob3VsZFR5cGVDaGVjaykge1xyXG4gICAgcmV0dXJuIGZuO1xyXG4gIH1cclxuICByZXR1cm4gZnVuY3Rpb24gd3JhcHBlZCguLi5hcmdzKSB7XHJcbiAgICBhc3NlcnRUeXBlcyhhcmdzVCwgYXJncyk7XHJcbiAgICBjb25zdCB2YWwgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgIGFzc2VydFR5cGVzKFt2YWxUXSwgW3ZhbF0pO1xyXG4gICAgcmV0dXJuIHZhbDtcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiB0eXBlY2hlY2soYXJnc1QsIHZhbFQsIGZuKSB7XHJcbiAgaWYoZm4gIT09IHZvaWQgMCkge1xyXG4gICAgcmV0dXJuIHdyYXAoYXJnc1QsIHZhbFQsIGZuKTtcclxuICB9XHJcbiAgcmV0dXJuICh0YXJnZXQsIGtleSwgZGVzYykgPT4gKHtcclxuICAgIC4uLmRlc2MsXHJcbiAgICB2YWx1ZTogd3JhcChhcmdzVCwgdmFsVCwgZGVzYy52YWx1ZSksXHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oVCwgeyB0eXBlY2hlY2sgfSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==