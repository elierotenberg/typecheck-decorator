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

    if (argsT !== void 0) {
      assertTypes(argsT, args);
    }
    var val = fn.apply(this, args);
    if (valT !== void 0) {
      assertTypes([valT], [val]);
    }
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

function takes() {
  for (var _len4 = arguments.length, argsT = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    argsT[_key4] = arguments[_key4];
  }

  return typecheck(argsT, void 0);
}

function returns(valT) {
  return typecheck(void 0, valT);
}

exports['default'] = _Object$assign(T, { typecheck: typecheck, takes: takes, returns: returns });
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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TSxFQUFFLEdBQUcsRUFBRSxJQUFJO3dCQUNwQixJQUFJO0FBQ1AsV0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7O0dBQ3BDLENBQUM7Q0FDSjs7QUFFRCxTQUFTLEtBQUssR0FBVztxQ0FBUCxLQUFLO0FBQUwsU0FBSzs7O0FBQ3JCLFNBQU8sU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0NBQ2pDOztBQUVELFNBQVMsT0FBTyxDQUFDLElBQUksRUFBRTtBQUNyQixTQUFPLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUNoQzs7cUJBRWMsZUFBYyxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQVQsU0FBUyxFQUFFLEtBQUssRUFBTCxLQUFLLEVBQUUsT0FBTyxFQUFQLE9BQU8sRUFBRSxDQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHNob3VsZCBmcm9tICdzaG91bGQvYXMtZnVuY3Rpb24nO1xuXG5jb25zdCBUID0ge1xuICBzaG91bGRUeXBlQ2hlY2s6IHByb2Nlc3MgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcsXG4gIC8vIFQuYW55KCkgfiAyNDNcbiAgYW55KCkge1xuICAgIHJldHVybiAoeCkgPT4gdm9pZCB4O1xuICB9LFxuICAvLyBULmluc3RhbmNlT2YoQ29uc3RydWN0b3IpIH4gbmV3IENvbnN0cnVjdG9yKClcbiAgaW5zdGFuY2VPZihDbGFzcykge1xuICAgIHJldHVybiAoeCkgPT4gc2hvdWxkKHgpLmJlLmFuLmluc3RhbmNlT2YoQ2xhc3MpO1xuICB9LFxuICAvLyBULmV4YWN0bHkoNDIpIH4gNDJcbiAgZXhhY3RseSh2KSB7XG4gICAgcmV0dXJuICh4KSA9PiBzaG91bGQoeCkuYmUuZXhhY3RseSh2KTtcbiAgfSxcbiAgLy8gVC5kZWVwRXF1YWwoeyBhOiAxMSB9KSB+IHsgYTogMTEgfVxuICBkZWVwRXF1YWwodikge1xuICAgIHJldHVybiAoeCkgPT4gc2hvdWxkKHgpLmVxbCh2KTtcbiAgfSxcbiAgYm9vbCgpIHtcbiAgICByZXR1cm4gKHgpID0+IHNob3VsZCh4KS5lcXVhbE9uZU9mKHRydWUsIGZhbHNlKTtcbiAgfSxcbiAgLy8gVC5OdW1iZXIoKSB+IDFcbiAgLy8gVC5OdW1iZXIoeyB3aXRoaW46IFs0LCA1XSB9KSB+IDQuNVxuICBOdW1iZXIoeyBhYm92ZSwgYmVsb3csIHdpdGhpbiB9ID0ge30pIHtcbiAgICByZXR1cm4gKHgpID0+IHtcbiAgICAgIHNob3VsZCh4KS5iZS5hLk51bWJlcigpO1xuICAgICAgaWYoYWJvdmUgIT09IHZvaWQgMCkge1xuICAgICAgICBzaG91bGQoeCkuYmUuYWJvdmUoYWJvdmUpO1xuICAgICAgfVxuICAgICAgaWYoYmVsb3cgIT09IHZvaWQgMCkge1xuICAgICAgICBzaG91bGQoeCkuYmUuYmVsb3coYmVsb3cpO1xuICAgICAgfVxuICAgICAgaWYod2l0aGluICE9PSB2b2lkIDApIHtcbiAgICAgICAgc2hvdWxkKHgpLmJlLndpdGhpbiguLi53aXRoaW4pO1xuICAgICAgfVxuICAgIH07XG4gIH0sXG4gIFN0cmluZyh7IGxlbmd0aCwgbWF0Y2ggfSA9IHt9KSB7XG4gICAgcmV0dXJuICh4KSA9PiB7XG4gICAgICBzaG91bGQoeCkuYmUuYS5TdHJpbmcoKTtcbiAgICAgIGlmKGxlbmd0aCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHNob3VsZCh4Lmxlbmd0aCkuYmUuZXhhY3RseShsZW5ndGgpO1xuICAgICAgfVxuICAgICAgaWYobWF0Y2ggIT09IHZvaWQgMCkge1xuICAgICAgICBzaG91bGQoeCkubWF0Y2gobWF0Y2gpO1xuICAgICAgfVxuICAgIH07XG4gIH0sXG4gIEFycmF5KHsgdHlwZSwgbGVuZ3RoIH0gPSB7fSkge1xuICAgIHJldHVybiAoeCkgPT4ge1xuICAgICAgc2hvdWxkKHgpLmJlLmFuLkFycmF5KCk7XG4gICAgICBpZih0eXBlKSB7XG4gICAgICAgIHguZm9yRWFjaCgodikgPT4gdHlwZSh2KSk7XG4gICAgICB9XG4gICAgICBpZihsZW5ndGggIT09IHZvaWQgMCkge1xuICAgICAgICBzaG91bGQoeC5sZW5ndGgpLmJlLmV4YWN0bHkobGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9LFxuICBPYmplY3QoeyB0eXBlLCBsZW5ndGggfSA9IHt9KSB7XG4gICAgcmV0dXJuICh4KSA9PiB7XG4gICAgICBzaG91bGQoeCkuYmUuYW4uT2JqZWN0KCk7XG4gICAgICBpZih0eXBlKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHgpLmZvckVhY2goKGspID0+IHR5cGUoeFtrXSkpO1xuICAgICAgfVxuICAgICAgaWYobGVuZ3RoICE9PSB2b2lkIDApIHtcbiAgICAgICAgc2hvdWxkKE9iamVjdC5rZXlzKHgpLmxlbmd0aCkuYmUuZXhhY3RseShsZW5ndGgpO1xuICAgICAgfVxuICAgIH07XG4gIH0sXG4gIEZ1bmN0aW9uKGFyZ3NUID0gVC5hbnkoKSwgcmV0VCA9IFQuYW55KCkpIHtcbiAgICByZXR1cm4gKHgpID0+IHtcbiAgICAgIHNob3VsZCh4KS5iZS5hLkZ1bmN0aW9uKCk7XG4gICAgICByZXR1cm4gKCkgPT4gVC50eXBlY2hlY2soYXJnc1QsIHJldFQpKHgpO1xuICAgIH07XG4gIH0sXG4gIFByb21pc2UoeyB0eXBlIH0gPSB7fSkge1xuICAgIHJldHVybiAoeCkgPT4ge1xuICAgICAgVC5zaGFwZSh7IHRoZW46IFQuRnVuY3Rpb24oKSB9KSh4KTtcbiAgICAgIGlmKHR5cGUgIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4geC5jYXRjaCgoKSA9PiB2b2lkIDApLnRoZW4oKHYpID0+IHR5cGUodikpO1xuICAgICAgfVxuICAgIH07XG4gIH0sXG4gIGVhY2hPZiguLi50eXBlcykge1xuICAgIHJldHVybiAoeCkgPT4gdHlwZXMuZm9yRWFjaCgodCkgPT4gdCh4KSk7XG4gIH0sXG4gIG9uZU9mKC4uLnR5cGVzKSB7XG4gICAgcmV0dXJuICh4KSA9PlxuICAgICAgc2hvdWxkKHR5cGVzLmZpbHRlcigodCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHQoeCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2goZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KS5sZW5ndGgpLmJlLmFib3ZlKDApXG4gICAgO1xuICB9LFxuICBub3QodHlwZSkge1xuICAgIHJldHVybiAoeCkgPT4gc2hvdWxkKCgpID0+IHR5cGUoeCkpLnRocm93KCk7XG4gIH0sXG4gIG51bGxhYmxlKHR5cGUpIHtcbiAgICByZXR1cm4gKHgpID0+IHggPT09IG51bGwgfHwgdHlwZSh4KTtcbiAgfSxcbiAgb3B0aW9uKHR5cGUpIHtcbiAgICByZXR1cm4gKHgpID0+IHggPT09IHZvaWQgMCB8fCB0eXBlKHgpO1xuICB9LFxuICBzaGFwZSh0KSB7XG4gICAgcmV0dXJuICh4KSA9PiB7XG4gICAgICAvLyBUKFtULk51bWJlcigpLCBULlN0cmluZygpLCBULkFycmF5KFQuTnVtYmVyKCkpXSkgfiBbMSwgJ2ZvbycsIFsxLCA0Ml1dXG4gICAgICBpZih0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgc2hvdWxkKHgpLmJlLmFuLkFycmF5KCk7XG4gICAgICAgIHJldHVybiB0Lm1hcCgodiwgaykgPT4gdih4W2tdKSk7XG4gICAgICB9XG4gICAgICAvLyBUKHsgZm9vOiBULlN0cmluZygpLCBiYXI6IFQuTnVtYmVyKCkgfSkgfiB7IGZvbzogJ2ZpenonLCBiYXI6IDQyIH1cbiAgICAgIGlmKHQgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgc2hvdWxkKHgpLmJlLmFuLk9iamVjdCgpO1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModCkubWFwKChrKSA9PiB0W2tdKHhba10pKTtcbiAgICAgIH1cbiAgICAgIC8vIFQoKHgpID0+IHNob3VsZCh4KS5iZS5leGFjdGx5KDQyKSkgfiA0MlxuICAgICAgaWYodCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgIHQoeCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSxcbn07XG5cbmZ1bmN0aW9uIGFzc2VydFR5cGVzKHR5cGVzLCBhcmdzKSB7XG4gIHNob3VsZCh0eXBlcykuYmUuYW4uQXJyYXkoKTtcbiAgcmV0dXJuIGFyZ3MubWFwKCh2LCBrKSA9PiB0eXBlc1trXSh2KSk7XG59XG5cbmZ1bmN0aW9uIHdyYXAoYXJnc1QsIHZhbFQsIGZuKSB7XG4gIGlmKCh0eXBlb2YgVC5zaG91bGRUeXBlQ2hlY2sgPT09ICdmdW5jdGlvbicgJiYgIVQuc2hvdWxkVHlwZUNoZWNrKCkpIHx8ICFULnNob3VsZFR5cGVDaGVjaykge1xuICAgIHJldHVybiBmbjtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gd3JhcHBlZCguLi5hcmdzKSB7XG4gICAgaWYoYXJnc1QgIT09IHZvaWQgMCkge1xuICAgICAgYXNzZXJ0VHlwZXMoYXJnc1QsIGFyZ3MpO1xuICAgIH1cbiAgICBjb25zdCB2YWwgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICBpZih2YWxUICE9PSB2b2lkIDApIHtcbiAgICAgIGFzc2VydFR5cGVzKFt2YWxUXSwgW3ZhbF0pO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9O1xufVxuXG5mdW5jdGlvbiB0eXBlY2hlY2soYXJnc1QsIHZhbFQsIGZuKSB7XG4gIGlmKGZuICE9PSB2b2lkIDApIHtcbiAgICByZXR1cm4gd3JhcChhcmdzVCwgdmFsVCwgZm4pO1xuICB9XG4gIHJldHVybiAodGFyZ2V0LCBrZXksIGRlc2MpID0+ICh7XG4gICAgLi4uZGVzYyxcbiAgICB2YWx1ZTogd3JhcChhcmdzVCwgdmFsVCwgZGVzYy52YWx1ZSksXG4gIH0pO1xufVxuXG5mdW5jdGlvbiB0YWtlcyguLi5hcmdzVCkge1xuICByZXR1cm4gdHlwZWNoZWNrKGFyZ3NULCB2b2lkIDApO1xufVxuXG5mdW5jdGlvbiByZXR1cm5zKHZhbFQpIHtcbiAgcmV0dXJuIHR5cGVjaGVjayh2b2lkIDAsIHZhbFQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKFQsIHsgdHlwZWNoZWNrLCB0YWtlcywgcmV0dXJucyB9KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==