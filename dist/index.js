'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _util = require('util');

var _shouldAsFunction = require('should/as-function');

var _shouldAsFunction2 = _interopRequireDefault(_shouldAsFunction);

var __DEV__ = process.env.NODE_ENV === 'development';

var T = {
  // T.any() ~ 243
  any: function any() {
    return function $any() {};
  },
  // T.instanceOf(Constructor) ~ new Constructor()
  instanceOf: function instanceOf(Class) {
    return function $instanceOf(x) {
      (0, _shouldAsFunction2['default'])(x).be.an.instanceOf(Class);
    };
  },
  // T.exactly(42) ~ 42
  exactly: function exactly(v) {
    return function $exactly(x) {
      (0, _shouldAsFunction2['default'])(x).be.exactly(v);
    };
  },
  // T.deepEqual({ a: 11 }) ~ { a: 11 }
  deepEqual: function deepEqual(v) {
    return function $deepEqual(x) {
      (0, _shouldAsFunction2['default'])(x).eql(v);
    };
  },
  bool: function bool() {
    return function $bool(x) {
      (0, _shouldAsFunction2['default'])(x).equalOneOf(true, false);
    };
  },
  // T.Number() ~ 1
  // T.Number({ within: [4, 5] }) ~ 4.5
  Number: function Number() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var above = _ref.above;
    var aboveOrEqual = _ref.aboveOrEqual;
    var below = _ref.below;
    var belowOrEqual = _ref.belowOrEqual;
    var within = _ref.within;

    return function $Number(x) {
      (0, _shouldAsFunction2['default'])(x).be.a.Number();
      if (above !== void 0) {
        (0, _shouldAsFunction2['default'])(x).be.above(above);
      }
      if (aboveOrEqual !== void 0) {
        (0, _shouldAsFunction2['default'])(x).be.aboveOrEqual(aboveOrEqual);
      }
      if (below !== void 0) {
        (0, _shouldAsFunction2['default'])(x).be.below(below);
      }
      if (belowOrEqual !== void 0) {
        (0, _shouldAsFunction2['default'])(x).be.belowOrEqual(belowOrEqual);
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

    return function $String(x) {
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

    return function $Array(x) {
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

    return function $Object(x) {
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

    return function $Function(x) {
      (0, _shouldAsFunction2['default'])(x).be.a.Function();
      return function () {
        return T.typecheck(argsT, retT)(x);
      };
    };
  },
  Promise: function Promise() {
    var _ref5 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var type = _ref5.type;

    return function $Promise(x) {
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

    return function $Error(x) {
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

    return function $eachOf(x) {
      types.forEach(function (t) {
        return t(x);
      });
    };
  },
  oneOf: function oneOf() {
    for (var _len2 = arguments.length, types = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      types[_key2] = arguments[_key2];
    }

    return function $oneOf(x) {
      (0, _shouldAsFunction2['default'])(types.filter(function (t) {
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
    return function $not(x) {
      (0, _shouldAsFunction2['default'])(function () {
        return type(x);
      })['throw']();
    };
  },
  nullable: function nullable(type) {
    return function $nullable(x) {
      x === null || type(x);
    };
  },
  option: function option(type) {
    return function $option(x) {
      x === void 0 || type(x);
    };
  },
  shape: function shape(t) {
    return function $shape(x) {
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
    return function $toPropType(props, propName) {
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

function renameFunction(fn, name, kind) {
  if (!__DEV__) {
    return fn;
  }
  Object.defineProperty(fn, 'name', {
    enumerable: false,
    writable: false,
    configurable: true,
    value: kind + '(' + name + ')'
  });
  return fn;
}

function wrap(argsT, valT, fn) {
  return function wrapped() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    if (argsT !== void 0) {
      try {
        assertTypes(argsT, args);
      } catch (err) {
        throw new TypeError(['Function \'' + fn.name + '\' expected to take: ' + (0, _util.inspect)(argsT.map(function (t) {
          return t.name || t;
        })), 'but instead got: ' + (0, _util.inspect)(args), err.toString()].join('\n'));
      }
    }
    var val = fn.apply(this, args);
    if (valT !== void 0) {
      try {
        assertTypes([valT], [val]);
      } catch (err) {
        throw new TypeError(['Function \'' + fn.name + '\' expected to take: ' + (0, _util.inspect)(valT.name || valT), 'but instead got: ' + (0, _util.inspect)(args), err.toString()].join('\n'));
      }
    }
    return val;
  };
}

function typecheck(argsT, valT, fn) {
  var kind = arguments.length <= 3 || arguments[3] === undefined ? 'typecheck' : arguments[3];

  if (fn !== void 0) {
    return renameFunction(wrap(argsT, valT, fn), fn.name, kind);
  }
  return function (target, key, desc) {
    return _extends({}, desc, {
      value: renameFunction(wrap(argsT, valT, desc.value), desc.value.name, '@' + kind)
    });
  };
}

function takes() {
  for (var _len4 = arguments.length, argsT = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    argsT[_key4] = arguments[_key4];
  }

  return typecheck(argsT, void 0, void 0, 'takes');
}

function returns(valT) {
  return typecheck(void 0, valT, void 0, 'returns');
}

exports['default'] = _Object$assign(T, { typecheck: typecheck, takes: takes, returns: returns });
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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QUFDLEtBQUssQ0FBQyxJQUFJLFFBQU0sSUFBSSxDQUFHOztHQUNqRixDQUFDO0NBQ0o7O0FBRUQsU0FBUyxLQUFLLEdBQVc7cUNBQVAsS0FBSztBQUFMLFNBQUs7OztBQUNyQixTQUFPLFNBQVMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7Q0FDbEQ7O0FBRUQsU0FBUyxPQUFPLENBQUMsSUFBSSxFQUFFO0FBQ3JCLFNBQU8sU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztDQUNuRDs7cUJBRWMsZUFBYyxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQVQsU0FBUyxFQUFFLEtBQUssRUFBTCxLQUFLLEVBQUUsT0FBTyxFQUFQLE9BQU8sRUFBRSxDQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5zcGVjdCB9IGZyb20gJ3V0aWwnO1xyXG5pbXBvcnQgc2hvdWxkIGZyb20gJ3Nob3VsZC9hcy1mdW5jdGlvbic7XHJcblxyXG5jb25zdCBfX0RFVl9fID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCc7XHJcblxyXG5jb25zdCBUID0ge1xyXG4gIC8vIFQuYW55KCkgfiAyNDNcclxuICBhbnkoKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gJGFueSgpIHt9O1xyXG4gIH0sXHJcbiAgLy8gVC5pbnN0YW5jZU9mKENvbnN0cnVjdG9yKSB+IG5ldyBDb25zdHJ1Y3RvcigpXHJcbiAgaW5zdGFuY2VPZihDbGFzcykge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICRpbnN0YW5jZU9mKHgpIHtcclxuICAgICAgc2hvdWxkKHgpLmJlLmFuLmluc3RhbmNlT2YoQ2xhc3MpO1xyXG4gICAgfTtcclxuICB9LFxyXG4gIC8vIFQuZXhhY3RseSg0MikgfiA0MlxyXG4gIGV4YWN0bHkodikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICRleGFjdGx5KHgpIHtcclxuICAgICAgc2hvdWxkKHgpLmJlLmV4YWN0bHkodik7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgLy8gVC5kZWVwRXF1YWwoeyBhOiAxMSB9KSB+IHsgYTogMTEgfVxyXG4gIGRlZXBFcXVhbCh2KSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gJGRlZXBFcXVhbCh4KSB7XHJcbiAgICAgIHNob3VsZCh4KS5lcWwodik7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgYm9vbCgpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAkYm9vbCh4KSB7XHJcbiAgICAgIHNob3VsZCh4KS5lcXVhbE9uZU9mKHRydWUsIGZhbHNlKTtcclxuICAgIH07XHJcbiAgfSxcclxuICAvLyBULk51bWJlcigpIH4gMVxyXG4gIC8vIFQuTnVtYmVyKHsgd2l0aGluOiBbNCwgNV0gfSkgfiA0LjVcclxuICBOdW1iZXIoeyBhYm92ZSwgYWJvdmVPckVxdWFsLCBiZWxvdywgYmVsb3dPckVxdWFsLCB3aXRoaW4gfSA9IHt9KSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gJE51bWJlcih4KSB7XHJcbiAgICAgIHNob3VsZCh4KS5iZS5hLk51bWJlcigpO1xyXG4gICAgICBpZihhYm92ZSAhPT0gdm9pZCAwKSB7XHJcbiAgICAgICAgc2hvdWxkKHgpLmJlLmFib3ZlKGFib3ZlKTtcclxuICAgICAgfVxyXG4gICAgICBpZihhYm92ZU9yRXF1YWwgIT09IHZvaWQgMCkge1xyXG4gICAgICAgIHNob3VsZCh4KS5iZS5hYm92ZU9yRXF1YWwoYWJvdmVPckVxdWFsKTtcclxuICAgICAgfVxyXG4gICAgICBpZihiZWxvdyAhPT0gdm9pZCAwKSB7XHJcbiAgICAgICAgc2hvdWxkKHgpLmJlLmJlbG93KGJlbG93KTtcclxuICAgICAgfVxyXG4gICAgICBpZihiZWxvd09yRXF1YWwgIT09IHZvaWQgMCkge1xyXG4gICAgICAgIHNob3VsZCh4KS5iZS5iZWxvd09yRXF1YWwoYmVsb3dPckVxdWFsKTtcclxuICAgICAgfVxyXG4gICAgICBpZih3aXRoaW4gIT09IHZvaWQgMCkge1xyXG4gICAgICAgIHNob3VsZCh4KS5iZS53aXRoaW4oLi4ud2l0aGluKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LFxyXG4gIFN0cmluZyh7IGxlbmd0aCwgbWF0Y2ggfSA9IHt9KSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gJFN0cmluZyh4KSB7XHJcbiAgICAgIHNob3VsZCh4KS5iZS5hLlN0cmluZygpO1xyXG4gICAgICBpZihsZW5ndGggIT09IHZvaWQgMCkge1xyXG4gICAgICAgIHNob3VsZCh4Lmxlbmd0aCkuYmUuZXhhY3RseShsZW5ndGgpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKG1hdGNoICE9PSB2b2lkIDApIHtcclxuICAgICAgICBzaG91bGQoeCkubWF0Y2gobWF0Y2gpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgQXJyYXkoeyB0eXBlLCBsZW5ndGggfSA9IHt9KSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gJEFycmF5KHgpIHtcclxuICAgICAgc2hvdWxkKHgpLmJlLmFuLkFycmF5KCk7XHJcbiAgICAgIGlmKHR5cGUpIHtcclxuICAgICAgICB4LmZvckVhY2goKHYpID0+IHR5cGUodikpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKGxlbmd0aCAhPT0gdm9pZCAwKSB7XHJcbiAgICAgICAgc2hvdWxkKHgubGVuZ3RoKS5iZS5leGFjdGx5KGxlbmd0aCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSxcclxuICBPYmplY3QoeyB0eXBlLCBsZW5ndGggfSA9IHt9KSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gJE9iamVjdCh4KSB7XHJcbiAgICAgIHNob3VsZCh4KS5iZS5hbi5PYmplY3QoKTtcclxuICAgICAgaWYodHlwZSkge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHgpLmZvckVhY2goKGspID0+IHR5cGUoeFtrXSkpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKGxlbmd0aCAhPT0gdm9pZCAwKSB7XHJcbiAgICAgICAgc2hvdWxkKE9iamVjdC5rZXlzKHgpLmxlbmd0aCkuYmUuZXhhY3RseShsZW5ndGgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgRnVuY3Rpb24oYXJnc1QgPSBULmFueSgpLCByZXRUID0gVC5hbnkoKSkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICRGdW5jdGlvbih4KSB7XHJcbiAgICAgIHNob3VsZCh4KS5iZS5hLkZ1bmN0aW9uKCk7XHJcbiAgICAgIHJldHVybiAoKSA9PiBULnR5cGVjaGVjayhhcmdzVCwgcmV0VCkoeCk7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgUHJvbWlzZSh7IHR5cGUgfSA9IHt9KSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gJFByb21pc2UoeCkge1xyXG4gICAgICBULnNoYXBlKHsgdGhlbjogVC5GdW5jdGlvbigpIH0pKHgpO1xyXG4gICAgICBpZih0eXBlICE9PSB2b2lkIDApIHtcclxuICAgICAgICByZXR1cm4geC5jYXRjaCgoKSA9PiB2b2lkIDApLnRoZW4oKHYpID0+IHR5cGUodikpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgRXJyb3IoeyBtZXNzYWdlIH0gPSB7fSkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICRFcnJvcih4KSB7XHJcbiAgICAgIHNob3VsZCh4KS5iZS5hbi5FcnJvcigpO1xyXG4gICAgICBpZihtZXNzYWdlICE9PSB2b2lkIDApIHtcclxuICAgICAgICBzaG91bGQoeC5tZXNzYWdlKS5iZS5leGFjdGx5KG1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgZWFjaE9mKC4uLnR5cGVzKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gJGVhY2hPZih4KSB7XHJcbiAgICAgIHR5cGVzLmZvckVhY2goKHQpID0+IHQoeCkpO1xyXG4gICAgfTtcclxuICB9LFxyXG4gIG9uZU9mKC4uLnR5cGVzKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gJG9uZU9mKHgpIHtcclxuICAgICAgc2hvdWxkKHR5cGVzLmZpbHRlcigodCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICB0KHgpO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKGVycikge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkubGVuZ3RoKS5iZS5hYm92ZSgwKTtcclxuICAgIH07XHJcbiAgfSxcclxuICBub3QodHlwZSkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICRub3QoeCkge1xyXG4gICAgICBzaG91bGQoKCkgPT4gdHlwZSh4KSkudGhyb3coKTtcclxuICAgIH07XHJcbiAgfSxcclxuICBudWxsYWJsZSh0eXBlKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gJG51bGxhYmxlKHgpIHtcclxuICAgICAgeCA9PT0gbnVsbCB8fCB0eXBlKHgpO1xyXG4gICAgfTtcclxuICB9LFxyXG4gIG9wdGlvbih0eXBlKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gJG9wdGlvbih4KSB7XHJcbiAgICAgIHggPT09IHZvaWQgMCB8fCB0eXBlKHgpO1xyXG4gICAgfTtcclxuICB9LFxyXG4gIHNoYXBlKHQpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAkc2hhcGUoeCkge1xyXG4gICAgICAvLyBUKFtULk51bWJlcigpLCBULlN0cmluZygpLCBULkFycmF5KFQuTnVtYmVyKCkpXSkgfiBbMSwgJ2ZvbycsIFsxLCA0Ml1dXHJcbiAgICAgIGlmKHQgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgIHNob3VsZCh4KS5iZS5hbi5BcnJheSgpO1xyXG4gICAgICAgIHJldHVybiB0Lm1hcCgodiwgaykgPT4gdih4W2tdKSk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gVCh7IGZvbzogVC5TdHJpbmcoKSwgYmFyOiBULk51bWJlcigpIH0pIH4geyBmb286ICdmaXp6JywgYmFyOiA0MiB9XHJcbiAgICAgIGlmKHQgaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgICBzaG91bGQoeCkuYmUuYW4uT2JqZWN0KCk7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHQpLm1hcCgoaykgPT4gdFtrXSh4W2tdKSk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gVCgoeCkgPT4gc2hvdWxkKHgpLmJlLmV4YWN0bHkoNDIpKSB+IDQyXHJcbiAgICAgIGlmKHQgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICAgIHQoeCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSxcclxuICB0b1Byb3BUeXBlKHR5cGUpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAkdG9Qcm9wVHlwZShwcm9wcywgcHJvcE5hbWUpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICB0eXBlKHByb3BzW3Byb3BOYW1lXSk7XHJcbiAgICAgIH1cclxuICAgICAgY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIGVycjtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LFxyXG59O1xyXG5cclxuZnVuY3Rpb24gYXNzZXJ0VHlwZXModHlwZXMsIGFyZ3MpIHtcclxuICBzaG91bGQodHlwZXMpLmJlLmFuLkFycmF5KCk7XHJcbiAgcmV0dXJuIGFyZ3MubWFwKCh2LCBrKSA9PiB0eXBlc1trXSh2KSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmFtZUZ1bmN0aW9uKGZuLCBuYW1lLCBraW5kKSB7XHJcbiAgaWYoIV9fREVWX18pIHtcclxuICAgIHJldHVybiBmbjtcclxuICB9XHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnbmFtZScsIHtcclxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgdmFsdWU6IGAke2tpbmR9KCR7bmFtZX0pYCxcclxuICB9KTtcclxuICByZXR1cm4gZm47XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdyYXAoYXJnc1QsIHZhbFQsIGZuKSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXBwZWQoLi4uYXJncykge1xyXG4gICAgaWYoYXJnc1QgIT09IHZvaWQgMCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGFzc2VydFR5cGVzKGFyZ3NULCBhcmdzKTtcclxuICAgICAgfVxyXG4gICAgICBjYXRjaChlcnIpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFtcclxuICAgICAgICAgIGBGdW5jdGlvbiAnJHtmbi5uYW1lfScgZXhwZWN0ZWQgdG8gdGFrZTogJHtpbnNwZWN0KGFyZ3NULm1hcCgodCkgPT4gdC5uYW1lIHx8IHQpKX1gLFxyXG4gICAgICAgICAgYGJ1dCBpbnN0ZWFkIGdvdDogJHtpbnNwZWN0KGFyZ3MpfWAsXHJcbiAgICAgICAgICBlcnIudG9TdHJpbmcoKSxcclxuICAgICAgICBdLmpvaW4oJ1xcbicpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3QgdmFsID0gZm4uYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICBpZih2YWxUICE9PSB2b2lkIDApIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBhc3NlcnRUeXBlcyhbdmFsVF0sIFt2YWxdKTtcclxuICAgICAgfVxyXG4gICAgICBjYXRjaChlcnIpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFtcclxuICAgICAgICAgIGBGdW5jdGlvbiAnJHtmbi5uYW1lfScgZXhwZWN0ZWQgdG8gdGFrZTogJHtpbnNwZWN0KHZhbFQubmFtZSB8fCB2YWxUKX1gLFxyXG4gICAgICAgICAgYGJ1dCBpbnN0ZWFkIGdvdDogJHtpbnNwZWN0KGFyZ3MpfWAsXHJcbiAgICAgICAgICBlcnIudG9TdHJpbmcoKSxcclxuICAgICAgICBdLmpvaW4oJ1xcbicpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbDtcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiB0eXBlY2hlY2soYXJnc1QsIHZhbFQsIGZuLCBraW5kID0gJ3R5cGVjaGVjaycpIHtcclxuICBpZihmbiAhPT0gdm9pZCAwKSB7XHJcbiAgICByZXR1cm4gcmVuYW1lRnVuY3Rpb24od3JhcChhcmdzVCwgdmFsVCwgZm4pLCBmbi5uYW1lLCBraW5kKTtcclxuICB9XHJcbiAgcmV0dXJuICh0YXJnZXQsIGtleSwgZGVzYykgPT4gKHtcclxuICAgIC4uLmRlc2MsXHJcbiAgICB2YWx1ZTogcmVuYW1lRnVuY3Rpb24od3JhcChhcmdzVCwgdmFsVCwgZGVzYy52YWx1ZSksIGRlc2MudmFsdWUubmFtZSwgYEAke2tpbmR9YCksXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRha2VzKC4uLmFyZ3NUKSB7XHJcbiAgcmV0dXJuIHR5cGVjaGVjayhhcmdzVCwgdm9pZCAwLCB2b2lkIDAsICd0YWtlcycpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXR1cm5zKHZhbFQpIHtcclxuICByZXR1cm4gdHlwZWNoZWNrKHZvaWQgMCwgdmFsVCwgdm9pZCAwLCAncmV0dXJucycpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKFQsIHsgdHlwZWNoZWNrLCB0YWtlcywgcmV0dXJucyB9KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9