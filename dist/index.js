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
//# sourceMappingURL=data:application/json;base64,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LENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7QUFDN0IsTUFBRyxBQUFDLE9BQU8sQ0FBQyxDQUFDLGVBQWUsS0FBSyxVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLElBQUssQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFO0FBQzFGLFdBQU8sRUFBRSxDQUFDO0dBQ1g7QUFDRCxTQUFPLFNBQVMsT0FBTyxHQUFVO3VDQUFOLElBQUk7QUFBSixVQUFJOzs7QUFDN0IsZUFBVyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN6QixRQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNqQyxlQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDM0IsV0FBTyxHQUFHLENBQUM7R0FDWixDQUFDO0NBQ0g7O0FBRUQsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7QUFDbEMsTUFBRyxFQUFFLEtBQUssS0FBSyxDQUFDLEVBQUU7QUFDaEIsV0FBTyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztHQUM5QjtBQUNELFNBQU8sVUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUk7d0JBQ3BCLElBQUk7QUFDUCxXQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQzs7R0FDcEMsQ0FBQztDQUNKOztxQkFFYyxlQUFjLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBVCxTQUFTLEVBQUUsQ0FBQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzaG91bGQgZnJvbSAnc2hvdWxkL2FzLWZ1bmN0aW9uJztcclxuXHJcbmNvbnN0IFQgPSB7XHJcbiAgc2hvdWxkVHlwZUNoZWNrOiBwcm9jZXNzICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnLFxyXG4gIC8vIFQuYW55KCkgfiAyNDNcclxuICBhbnkoKSB7XHJcbiAgICByZXR1cm4gKHgpID0+IHZvaWQgeDtcclxuICB9LFxyXG4gIC8vIFQuaW5zdGFuY2VPZihDb25zdHJ1Y3RvcikgfiBuZXcgQ29uc3RydWN0b3IoKVxyXG4gIGluc3RhbmNlT2YoQ2xhc3MpIHtcclxuICAgIHJldHVybiAoeCkgPT4gc2hvdWxkKHgpLmJlLmFuLmluc3RhbmNlT2YoQ2xhc3MpO1xyXG4gIH0sXHJcbiAgLy8gVC5leGFjdGx5KDQyKSB+IDQyXHJcbiAgZXhhY3RseSh2KSB7XHJcbiAgICByZXR1cm4gKHgpID0+IHNob3VsZCh4KS5iZS5leGFjdGx5KHYpO1xyXG4gIH0sXHJcbiAgLy8gVC5kZWVwRXF1YWwoeyBhOiAxMSB9KSB+IHsgYTogMTEgfVxyXG4gIGRlZXBFcXVhbCh2KSB7XHJcbiAgICByZXR1cm4gKHgpID0+IHNob3VsZCh4KS5lcWwodik7XHJcbiAgfSxcclxuICBib29sKCkge1xyXG4gICAgcmV0dXJuICh4KSA9PiBzaG91bGQoeCkuZXF1YWxPbmVPZih0cnVlLCBmYWxzZSk7XHJcbiAgfSxcclxuICAvLyBULk51bWJlcigpIH4gMVxyXG4gIC8vIFQuTnVtYmVyKHsgd2l0aGluOiBbNCwgNV0gfSkgfiA0LjVcclxuICBOdW1iZXIoeyBhYm92ZSwgYmVsb3csIHdpdGhpbiB9ID0ge30pIHtcclxuICAgIHJldHVybiAoeCkgPT4ge1xyXG4gICAgICBzaG91bGQoeCkuYmUuYS5OdW1iZXIoKTtcclxuICAgICAgaWYoYWJvdmUgIT09IHZvaWQgMCkge1xyXG4gICAgICAgIHNob3VsZCh4KS5iZS5hYm92ZShhYm92ZSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYoYmVsb3cgIT09IHZvaWQgMCkge1xyXG4gICAgICAgIHNob3VsZCh4KS5iZS5iZWxvdyhiZWxvdyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYod2l0aGluICE9PSB2b2lkIDApIHtcclxuICAgICAgICBzaG91bGQoeCkuYmUud2l0aGluKC4uLndpdGhpbik7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSxcclxuICBTdHJpbmcoeyBsZW5ndGgsIG1hdGNoIH0gPSB7fSkge1xyXG4gICAgcmV0dXJuICh4KSA9PiB7XHJcbiAgICAgIHNob3VsZCh4KS5iZS5hLlN0cmluZygpO1xyXG4gICAgICBpZihsZW5ndGggIT09IHZvaWQgMCkge1xyXG4gICAgICAgIHNob3VsZCh4Lmxlbmd0aCkuYmUuZXhhY3RseShsZW5ndGgpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKG1hdGNoICE9PSB2b2lkIDApIHtcclxuICAgICAgICBzaG91bGQoeCkubWF0Y2gobWF0Y2gpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgQXJyYXkoeyB0eXBlLCBsZW5ndGggfSA9IHt9KSB7XHJcbiAgICByZXR1cm4gKHgpID0+IHtcclxuICAgICAgc2hvdWxkKHgpLmJlLmFuLkFycmF5KCk7XHJcbiAgICAgIGlmKHR5cGUpIHtcclxuICAgICAgICB4LmZvckVhY2goKHYpID0+IHR5cGUodikpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKGxlbmd0aCAhPT0gdm9pZCAwKSB7XHJcbiAgICAgICAgc2hvdWxkKHgubGVuZ3RoKS5iZS5leGFjdGx5KGxlbmd0aCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSxcclxuICBPYmplY3QoeyB0eXBlLCBsZW5ndGggfSA9IHt9KSB7XHJcbiAgICByZXR1cm4gKHgpID0+IHtcclxuICAgICAgc2hvdWxkKHgpLmJlLmFuLk9iamVjdCgpO1xyXG4gICAgICBpZih0eXBlKSB7XHJcbiAgICAgICAgT2JqZWN0LmtleXMoeCkuZm9yRWFjaCgoaykgPT4gdHlwZSh4W2tdKSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYobGVuZ3RoICE9PSB2b2lkIDApIHtcclxuICAgICAgICBzaG91bGQoT2JqZWN0LmtleXMoeCkubGVuZ3RoKS5iZS5leGFjdGx5KGxlbmd0aCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSxcclxuICBGdW5jdGlvbihhcmdzVCA9IFQuYW55KCksIHJldFQgPSBULmFueSgpKSB7XHJcbiAgICByZXR1cm4gKHgpID0+IHtcclxuICAgICAgc2hvdWxkKHgpLmJlLmEuRnVuY3Rpb24oKTtcclxuICAgICAgcmV0dXJuICgpID0+IFQudHlwZWNoZWNrKGFyZ3NULCByZXRUKSh4KTtcclxuICAgIH07XHJcbiAgfSxcclxuICBQcm9taXNlKHsgdHlwZSB9ID0ge30pIHtcclxuICAgIHJldHVybiAoeCkgPT4ge1xyXG4gICAgICBULnNoYXBlKHsgdGhlbjogVC5GdW5jdGlvbigpIH0pKHgpO1xyXG4gICAgICBpZih0eXBlICE9PSB2b2lkIDApIHtcclxuICAgICAgICByZXR1cm4geC5jYXRjaCgoKSA9PiB2b2lkIDApLnRoZW4oKHYpID0+IHR5cGUodikpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgZWFjaE9mKC4uLnR5cGVzKSB7XHJcbiAgICByZXR1cm4gKHgpID0+IHR5cGVzLmZvckVhY2goKHQpID0+IHQoeCkpO1xyXG4gIH0sXHJcbiAgb25lT2YoLi4udHlwZXMpIHtcclxuICAgIHJldHVybiAoeCkgPT5cclxuICAgICAgc2hvdWxkKHR5cGVzLmZpbHRlcigodCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICB0KHgpO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKGVycikge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkubGVuZ3RoKS5iZS5hYm92ZSgwKVxyXG4gICAgO1xyXG4gIH0sXHJcbiAgbm90KHR5cGUpIHtcclxuICAgIHJldHVybiAoeCkgPT4gc2hvdWxkKCgpID0+IHR5cGUoeCkpLnRocm93KCk7XHJcbiAgfSxcclxuICBzaGFwZSh0KSB7XHJcbiAgICByZXR1cm4gKHgpID0+IHtcclxuICAgICAgLy8gVChbVC5OdW1iZXIoKSwgVC5TdHJpbmcoKSwgVC5BcnJheShULk51bWJlcigpKV0pIH4gWzEsICdmb28nLCBbMSwgNDJdXVxyXG4gICAgICBpZih0IGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICBzaG91bGQoeCkuYmUuYW4uQXJyYXkoKTtcclxuICAgICAgICByZXR1cm4gdC5tYXAoKHYsIGspID0+IHYoeFtrXSkpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIFQoeyBmb286IFQuU3RyaW5nKCksIGJhcjogVC5OdW1iZXIoKSB9KSB+IHsgZm9vOiAnZml6eicsIGJhcjogNDIgfVxyXG4gICAgICBpZih0IGluc3RhbmNlb2YgT2JqZWN0KSB7XHJcbiAgICAgICAgc2hvdWxkKHgpLmJlLmFuLk9iamVjdCgpO1xyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0KS5tYXAoKGspID0+IHRba10oeFtrXSkpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIFQoKHgpID0+IHNob3VsZCh4KS5iZS5leGFjdGx5KDQyKSkgfiA0MlxyXG4gICAgICBpZih0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgICB0KHgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sXHJcbn07XHJcblxyXG5mdW5jdGlvbiBhc3NlcnRUeXBlcyh0eXBlcywgYXJncykge1xyXG4gIHNob3VsZCh0eXBlcykuYmUuYW4uQXJyYXkoKTtcclxuICByZXR1cm4gYXJncy5tYXAoKHYsIGspID0+IHR5cGVzW2tdKHYpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gd3JhcChhcmdzVCwgdmFsVCwgZm4pIHtcclxuICBpZigodHlwZW9mIFQuc2hvdWxkVHlwZUNoZWNrID09PSAnZnVuY3Rpb24nICYmICFULnNob3VsZFR5cGVDaGVjaygpKSB8fCAhVC5zaG91bGRUeXBlQ2hlY2spIHtcclxuICAgIHJldHVybiBmbjtcclxuICB9XHJcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXBwZWQoLi4uYXJncykge1xyXG4gICAgYXNzZXJ0VHlwZXMoYXJnc1QsIGFyZ3MpO1xyXG4gICAgY29uc3QgdmFsID0gZm4uYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICBhc3NlcnRUeXBlcyhbdmFsVF0sIFt2YWxdKTtcclxuICAgIHJldHVybiB2YWw7XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gdHlwZWNoZWNrKGFyZ3NULCB2YWxULCBmbikge1xyXG4gIGlmKGZuICE9PSB2b2lkIDApIHtcclxuICAgIHJldHVybiB3cmFwKGFyZ3NULCB2YWxULCBmbik7XHJcbiAgfVxyXG4gIHJldHVybiAodGFyZ2V0LCBrZXksIGRlc2MpID0+ICh7XHJcbiAgICAuLi5kZXNjLFxyXG4gICAgdmFsdWU6IHdyYXAoYXJnc1QsIHZhbFQsIGRlc2MudmFsdWUpLFxyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKFQsIHsgdHlwZWNoZWNrIH0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=