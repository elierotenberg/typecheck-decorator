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
  Error: function Error() {
    var _ref6 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var message = _ref6.message;

    return function (x) {
      (0, _shouldAsFunction2['default'])(x).be.an.Error();
      if (message !== void 0) {
        (0, _shouldAsFunction2['default'])(x.message).be.exactly(message);
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
  },
  toPropType: function toPropType(type) {
    return function (props, propName) {
      try {
        type(props[propName]);
      } catch (err) {
        return err;
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
//# sourceMappingURL=data:application/json;base64,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SSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQzVCO0FBQ0QsV0FBTyxHQUFHLENBQUM7R0FDWixDQUFDO0NBQ0g7O0FBRUQsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7QUFDbEMsTUFBRyxFQUFFLEtBQUssS0FBSyxDQUFDLEVBQUU7QUFDaEIsV0FBTyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztHQUM5QjtBQUNELFNBQU8sVUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUk7d0JBQ3BCLElBQUk7QUFDUCxXQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQzs7R0FDcEMsQ0FBQztDQUNKOztBQUVELFNBQVMsS0FBSyxHQUFXO3FDQUFQLEtBQUs7QUFBTCxTQUFLOzs7QUFDckIsU0FBTyxTQUFTLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7Q0FDakM7O0FBRUQsU0FBUyxPQUFPLENBQUMsSUFBSSxFQUFFO0FBQ3JCLFNBQU8sU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQ2hDOztxQkFFYyxlQUFjLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBVCxTQUFTLEVBQUUsS0FBSyxFQUFMLEtBQUssRUFBRSxPQUFPLEVBQVAsT0FBTyxFQUFFLENBQUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2hvdWxkIGZyb20gJ3Nob3VsZC9hcy1mdW5jdGlvbic7XHJcblxyXG5jb25zdCBUID0ge1xyXG4gIC8vIFQuYW55KCkgfiAyNDNcclxuICBhbnkoKSB7XHJcbiAgICByZXR1cm4gKHgpID0+IHZvaWQgeDtcclxuICB9LFxyXG4gIC8vIFQuaW5zdGFuY2VPZihDb25zdHJ1Y3RvcikgfiBuZXcgQ29uc3RydWN0b3IoKVxyXG4gIGluc3RhbmNlT2YoQ2xhc3MpIHtcclxuICAgIHJldHVybiAoeCkgPT4gc2hvdWxkKHgpLmJlLmFuLmluc3RhbmNlT2YoQ2xhc3MpO1xyXG4gIH0sXHJcbiAgLy8gVC5leGFjdGx5KDQyKSB+IDQyXHJcbiAgZXhhY3RseSh2KSB7XHJcbiAgICByZXR1cm4gKHgpID0+IHNob3VsZCh4KS5iZS5leGFjdGx5KHYpO1xyXG4gIH0sXHJcbiAgLy8gVC5kZWVwRXF1YWwoeyBhOiAxMSB9KSB+IHsgYTogMTEgfVxyXG4gIGRlZXBFcXVhbCh2KSB7XHJcbiAgICByZXR1cm4gKHgpID0+IHNob3VsZCh4KS5lcWwodik7XHJcbiAgfSxcclxuICBib29sKCkge1xyXG4gICAgcmV0dXJuICh4KSA9PiBzaG91bGQoeCkuZXF1YWxPbmVPZih0cnVlLCBmYWxzZSk7XHJcbiAgfSxcclxuICAvLyBULk51bWJlcigpIH4gMVxyXG4gIC8vIFQuTnVtYmVyKHsgd2l0aGluOiBbNCwgNV0gfSkgfiA0LjVcclxuICBOdW1iZXIoeyBhYm92ZSwgYmVsb3csIHdpdGhpbiB9ID0ge30pIHtcclxuICAgIHJldHVybiAoeCkgPT4ge1xyXG4gICAgICBzaG91bGQoeCkuYmUuYS5OdW1iZXIoKTtcclxuICAgICAgaWYoYWJvdmUgIT09IHZvaWQgMCkge1xyXG4gICAgICAgIHNob3VsZCh4KS5iZS5hYm92ZShhYm92ZSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYoYmVsb3cgIT09IHZvaWQgMCkge1xyXG4gICAgICAgIHNob3VsZCh4KS5iZS5iZWxvdyhiZWxvdyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYod2l0aGluICE9PSB2b2lkIDApIHtcclxuICAgICAgICBzaG91bGQoeCkuYmUud2l0aGluKC4uLndpdGhpbik7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSxcclxuICBTdHJpbmcoeyBsZW5ndGgsIG1hdGNoIH0gPSB7fSkge1xyXG4gICAgcmV0dXJuICh4KSA9PiB7XHJcbiAgICAgIHNob3VsZCh4KS5iZS5hLlN0cmluZygpO1xyXG4gICAgICBpZihsZW5ndGggIT09IHZvaWQgMCkge1xyXG4gICAgICAgIHNob3VsZCh4Lmxlbmd0aCkuYmUuZXhhY3RseShsZW5ndGgpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKG1hdGNoICE9PSB2b2lkIDApIHtcclxuICAgICAgICBzaG91bGQoeCkubWF0Y2gobWF0Y2gpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgQXJyYXkoeyB0eXBlLCBsZW5ndGggfSA9IHt9KSB7XHJcbiAgICByZXR1cm4gKHgpID0+IHtcclxuICAgICAgc2hvdWxkKHgpLmJlLmFuLkFycmF5KCk7XHJcbiAgICAgIGlmKHR5cGUpIHtcclxuICAgICAgICB4LmZvckVhY2goKHYpID0+IHR5cGUodikpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKGxlbmd0aCAhPT0gdm9pZCAwKSB7XHJcbiAgICAgICAgc2hvdWxkKHgubGVuZ3RoKS5iZS5leGFjdGx5KGxlbmd0aCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSxcclxuICBPYmplY3QoeyB0eXBlLCBsZW5ndGggfSA9IHt9KSB7XHJcbiAgICByZXR1cm4gKHgpID0+IHtcclxuICAgICAgc2hvdWxkKHgpLmJlLmFuLk9iamVjdCgpO1xyXG4gICAgICBpZih0eXBlKSB7XHJcbiAgICAgICAgT2JqZWN0LmtleXMoeCkuZm9yRWFjaCgoaykgPT4gdHlwZSh4W2tdKSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYobGVuZ3RoICE9PSB2b2lkIDApIHtcclxuICAgICAgICBzaG91bGQoT2JqZWN0LmtleXMoeCkubGVuZ3RoKS5iZS5leGFjdGx5KGxlbmd0aCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSxcclxuICBGdW5jdGlvbihhcmdzVCA9IFQuYW55KCksIHJldFQgPSBULmFueSgpKSB7XHJcbiAgICByZXR1cm4gKHgpID0+IHtcclxuICAgICAgc2hvdWxkKHgpLmJlLmEuRnVuY3Rpb24oKTtcclxuICAgICAgcmV0dXJuICgpID0+IFQudHlwZWNoZWNrKGFyZ3NULCByZXRUKSh4KTtcclxuICAgIH07XHJcbiAgfSxcclxuICBQcm9taXNlKHsgdHlwZSB9ID0ge30pIHtcclxuICAgIHJldHVybiAoeCkgPT4ge1xyXG4gICAgICBULnNoYXBlKHsgdGhlbjogVC5GdW5jdGlvbigpIH0pKHgpO1xyXG4gICAgICBpZih0eXBlICE9PSB2b2lkIDApIHtcclxuICAgICAgICByZXR1cm4geC5jYXRjaCgoKSA9PiB2b2lkIDApLnRoZW4oKHYpID0+IHR5cGUodikpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgRXJyb3IoeyBtZXNzYWdlIH0gPSB7fSkge1xyXG4gICAgcmV0dXJuICh4KSA9PiB7XHJcbiAgICAgIHNob3VsZCh4KS5iZS5hbi5FcnJvcigpO1xyXG4gICAgICBpZihtZXNzYWdlICE9PSB2b2lkIDApIHtcclxuICAgICAgICBzaG91bGQoeC5tZXNzYWdlKS5iZS5leGFjdGx5KG1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgZWFjaE9mKC4uLnR5cGVzKSB7XHJcbiAgICByZXR1cm4gKHgpID0+IHR5cGVzLmZvckVhY2goKHQpID0+IHQoeCkpO1xyXG4gIH0sXHJcbiAgb25lT2YoLi4udHlwZXMpIHtcclxuICAgIHJldHVybiAoeCkgPT5cclxuICAgICAgc2hvdWxkKHR5cGVzLmZpbHRlcigodCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICB0KHgpO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKGVycikge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkubGVuZ3RoKS5iZS5hYm92ZSgwKVxyXG4gICAgO1xyXG4gIH0sXHJcbiAgbm90KHR5cGUpIHtcclxuICAgIHJldHVybiAoeCkgPT4gc2hvdWxkKCgpID0+IHR5cGUoeCkpLnRocm93KCk7XHJcbiAgfSxcclxuICBudWxsYWJsZSh0eXBlKSB7XHJcbiAgICByZXR1cm4gKHgpID0+IHggPT09IG51bGwgfHwgdHlwZSh4KTtcclxuICB9LFxyXG4gIG9wdGlvbih0eXBlKSB7XHJcbiAgICByZXR1cm4gKHgpID0+IHggPT09IHZvaWQgMCB8fCB0eXBlKHgpO1xyXG4gIH0sXHJcbiAgc2hhcGUodCkge1xyXG4gICAgcmV0dXJuICh4KSA9PiB7XHJcbiAgICAgIC8vIFQoW1QuTnVtYmVyKCksIFQuU3RyaW5nKCksIFQuQXJyYXkoVC5OdW1iZXIoKSldKSB+IFsxLCAnZm9vJywgWzEsIDQyXV1cclxuICAgICAgaWYodCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgc2hvdWxkKHgpLmJlLmFuLkFycmF5KCk7XHJcbiAgICAgICAgcmV0dXJuIHQubWFwKCh2LCBrKSA9PiB2KHhba10pKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBUKHsgZm9vOiBULlN0cmluZygpLCBiYXI6IFQuTnVtYmVyKCkgfSkgfiB7IGZvbzogJ2ZpenonLCBiYXI6IDQyIH1cclxuICAgICAgaWYodCBpbnN0YW5jZW9mIE9iamVjdCkge1xyXG4gICAgICAgIHNob3VsZCh4KS5iZS5hbi5PYmplY3QoKTtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModCkubWFwKChrKSA9PiB0W2tdKHhba10pKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBUKCh4KSA9PiBzaG91bGQoeCkuYmUuZXhhY3RseSg0MikpIH4gNDJcclxuICAgICAgaWYodCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdCh4KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LFxyXG4gIHRvUHJvcFR5cGUodHlwZSkge1xyXG4gICAgcmV0dXJuIChwcm9wcywgcHJvcE5hbWUpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICB0eXBlKHByb3BzW3Byb3BOYW1lXSk7XHJcbiAgICAgIH1cclxuICAgICAgY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIGVycjtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LFxyXG59O1xyXG5cclxuZnVuY3Rpb24gYXNzZXJ0VHlwZXModHlwZXMsIGFyZ3MpIHtcclxuICBzaG91bGQodHlwZXMpLmJlLmFuLkFycmF5KCk7XHJcbiAgcmV0dXJuIGFyZ3MubWFwKCh2LCBrKSA9PiB0eXBlc1trXSh2KSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdyYXAoYXJnc1QsIHZhbFQsIGZuKSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXBwZWQoLi4uYXJncykge1xyXG4gICAgaWYoYXJnc1QgIT09IHZvaWQgMCkge1xyXG4gICAgICBhc3NlcnRUeXBlcyhhcmdzVCwgYXJncyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB2YWwgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgIGlmKHZhbFQgIT09IHZvaWQgMCkge1xyXG4gICAgICBhc3NlcnRUeXBlcyhbdmFsVF0sIFt2YWxdKTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWw7XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gdHlwZWNoZWNrKGFyZ3NULCB2YWxULCBmbikge1xyXG4gIGlmKGZuICE9PSB2b2lkIDApIHtcclxuICAgIHJldHVybiB3cmFwKGFyZ3NULCB2YWxULCBmbik7XHJcbiAgfVxyXG4gIHJldHVybiAodGFyZ2V0LCBrZXksIGRlc2MpID0+ICh7XHJcbiAgICAuLi5kZXNjLFxyXG4gICAgdmFsdWU6IHdyYXAoYXJnc1QsIHZhbFQsIGRlc2MudmFsdWUpLFxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0YWtlcyguLi5hcmdzVCkge1xyXG4gIHJldHVybiB0eXBlY2hlY2soYXJnc1QsIHZvaWQgMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJldHVybnModmFsVCkge1xyXG4gIHJldHVybiB0eXBlY2hlY2sodm9pZCAwLCB2YWxUKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihULCB7IHR5cGVjaGVjaywgdGFrZXMsIHJldHVybnMgfSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==