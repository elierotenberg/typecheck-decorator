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
//# sourceMappingURL=data:application/json;base64,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QUFDLENBQUM7S0FDNUI7QUFDRCxXQUFPLEdBQUcsQ0FBQztHQUNaLENBQUM7Q0FDSDs7QUFFRCxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBc0I7TUFBcEIsSUFBSSx5REFBRyxXQUFXOztBQUNwRCxNQUFHLEVBQUUsS0FBSyxLQUFLLENBQUMsRUFBRTtBQUNoQixXQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0dBQzdEO0FBQ0QsU0FBTyxVQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSTt3QkFDcEIsSUFBSTtBQUNQLFdBQUssRUFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxRQUFNLElBQUksQ0FBRzs7R0FDakYsQ0FBQztDQUNKOztBQUVELFNBQVMsS0FBSyxHQUFXO3FDQUFQLEtBQUs7QUFBTCxTQUFLOzs7QUFDckIsU0FBTyxTQUFTLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0NBQ2xEOztBQUVELFNBQVMsT0FBTyxDQUFDLElBQUksRUFBRTtBQUNyQixTQUFPLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7Q0FDbkQ7O3FCQUVjLGVBQWMsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFULFNBQVMsRUFBRSxLQUFLLEVBQUwsS0FBSyxFQUFFLE9BQU8sRUFBUCxPQUFPLEVBQUUsQ0FBQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzaG91bGQgZnJvbSAnc2hvdWxkL2FzLWZ1bmN0aW9uJztcclxuXHJcbmNvbnN0IF9fREVWX18gPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JztcclxuXHJcbmNvbnN0IFQgPSB7XHJcbiAgLy8gVC5hbnkoKSB+IDI0M1xyXG4gIGFueSgpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAkYW55KCkge307XHJcbiAgfSxcclxuICAvLyBULmluc3RhbmNlT2YoQ29uc3RydWN0b3IpIH4gbmV3IENvbnN0cnVjdG9yKClcclxuICBpbnN0YW5jZU9mKENsYXNzKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gJGluc3RhbmNlT2YoeCkge1xyXG4gICAgICBzaG91bGQoeCkuYmUuYW4uaW5zdGFuY2VPZihDbGFzcyk7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgLy8gVC5leGFjdGx5KDQyKSB+IDQyXHJcbiAgZXhhY3RseSh2KSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gJGV4YWN0bHkoeCkge1xyXG4gICAgICBzaG91bGQoeCkuYmUuZXhhY3RseSh2KTtcclxuICAgIH07XHJcbiAgfSxcclxuICAvLyBULmRlZXBFcXVhbCh7IGE6IDExIH0pIH4geyBhOiAxMSB9XHJcbiAgZGVlcEVxdWFsKHYpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAkZGVlcEVxdWFsKHgpIHtcclxuICAgICAgc2hvdWxkKHgpLmVxbCh2KTtcclxuICAgIH07XHJcbiAgfSxcclxuICBib29sKCkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICRib29sKHgpIHtcclxuICAgICAgc2hvdWxkKHgpLmVxdWFsT25lT2YodHJ1ZSwgZmFsc2UpO1xyXG4gICAgfTtcclxuICB9LFxyXG4gIC8vIFQuTnVtYmVyKCkgfiAxXHJcbiAgLy8gVC5OdW1iZXIoeyB3aXRoaW46IFs0LCA1XSB9KSB+IDQuNVxyXG4gIE51bWJlcih7IGFib3ZlLCBhYm92ZU9yRXF1YWwsIGJlbG93LCBiZWxvd09yRXF1YWwsIHdpdGhpbiB9ID0ge30pIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAkTnVtYmVyKHgpIHtcclxuICAgICAgc2hvdWxkKHgpLmJlLmEuTnVtYmVyKCk7XHJcbiAgICAgIGlmKGFib3ZlICE9PSB2b2lkIDApIHtcclxuICAgICAgICBzaG91bGQoeCkuYmUuYWJvdmUoYWJvdmUpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKGFib3ZlT3JFcXVhbCAhPT0gdm9pZCAwKSB7XHJcbiAgICAgICAgc2hvdWxkKHgpLmJlLmFib3ZlT3JFcXVhbChhYm92ZU9yRXF1YWwpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKGJlbG93ICE9PSB2b2lkIDApIHtcclxuICAgICAgICBzaG91bGQoeCkuYmUuYmVsb3coYmVsb3cpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKGJlbG93T3JFcXVhbCAhPT0gdm9pZCAwKSB7XHJcbiAgICAgICAgc2hvdWxkKHgpLmJlLmJlbG93T3JFcXVhbChiZWxvd09yRXF1YWwpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKHdpdGhpbiAhPT0gdm9pZCAwKSB7XHJcbiAgICAgICAgc2hvdWxkKHgpLmJlLndpdGhpbiguLi53aXRoaW4pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgU3RyaW5nKHsgbGVuZ3RoLCBtYXRjaCB9ID0ge30pIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAkU3RyaW5nKHgpIHtcclxuICAgICAgc2hvdWxkKHgpLmJlLmEuU3RyaW5nKCk7XHJcbiAgICAgIGlmKGxlbmd0aCAhPT0gdm9pZCAwKSB7XHJcbiAgICAgICAgc2hvdWxkKHgubGVuZ3RoKS5iZS5leGFjdGx5KGxlbmd0aCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYobWF0Y2ggIT09IHZvaWQgMCkge1xyXG4gICAgICAgIHNob3VsZCh4KS5tYXRjaChtYXRjaCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSxcclxuICBBcnJheSh7IHR5cGUsIGxlbmd0aCB9ID0ge30pIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAkQXJyYXkoeCkge1xyXG4gICAgICBzaG91bGQoeCkuYmUuYW4uQXJyYXkoKTtcclxuICAgICAgaWYodHlwZSkge1xyXG4gICAgICAgIHguZm9yRWFjaCgodikgPT4gdHlwZSh2KSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYobGVuZ3RoICE9PSB2b2lkIDApIHtcclxuICAgICAgICBzaG91bGQoeC5sZW5ndGgpLmJlLmV4YWN0bHkobGVuZ3RoKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LFxyXG4gIE9iamVjdCh7IHR5cGUsIGxlbmd0aCB9ID0ge30pIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAkT2JqZWN0KHgpIHtcclxuICAgICAgc2hvdWxkKHgpLmJlLmFuLk9iamVjdCgpO1xyXG4gICAgICBpZih0eXBlKSB7XHJcbiAgICAgICAgT2JqZWN0LmtleXMoeCkuZm9yRWFjaCgoaykgPT4gdHlwZSh4W2tdKSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYobGVuZ3RoICE9PSB2b2lkIDApIHtcclxuICAgICAgICBzaG91bGQoT2JqZWN0LmtleXMoeCkubGVuZ3RoKS5iZS5leGFjdGx5KGxlbmd0aCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSxcclxuICBGdW5jdGlvbihhcmdzVCA9IFQuYW55KCksIHJldFQgPSBULmFueSgpKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gJEZ1bmN0aW9uKHgpIHtcclxuICAgICAgc2hvdWxkKHgpLmJlLmEuRnVuY3Rpb24oKTtcclxuICAgICAgcmV0dXJuICgpID0+IFQudHlwZWNoZWNrKGFyZ3NULCByZXRUKSh4KTtcclxuICAgIH07XHJcbiAgfSxcclxuICBQcm9taXNlKHsgdHlwZSB9ID0ge30pIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAkUHJvbWlzZSh4KSB7XHJcbiAgICAgIFQuc2hhcGUoeyB0aGVuOiBULkZ1bmN0aW9uKCkgfSkoeCk7XHJcbiAgICAgIGlmKHR5cGUgIT09IHZvaWQgMCkge1xyXG4gICAgICAgIHJldHVybiB4LmNhdGNoKCgpID0+IHZvaWQgMCkudGhlbigodikgPT4gdHlwZSh2KSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSxcclxuICBFcnJvcih7IG1lc3NhZ2UgfSA9IHt9KSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gJEVycm9yKHgpIHtcclxuICAgICAgc2hvdWxkKHgpLmJlLmFuLkVycm9yKCk7XHJcbiAgICAgIGlmKG1lc3NhZ2UgIT09IHZvaWQgMCkge1xyXG4gICAgICAgIHNob3VsZCh4Lm1lc3NhZ2UpLmJlLmV4YWN0bHkobWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSxcclxuICBlYWNoT2YoLi4udHlwZXMpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAkZWFjaE9mKHgpIHtcclxuICAgICAgdHlwZXMuZm9yRWFjaCgodCkgPT4gdCh4KSk7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgb25lT2YoLi4udHlwZXMpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAkb25lT2YoeCkge1xyXG4gICAgICBzaG91bGQodHlwZXMuZmlsdGVyKCh0KSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHQoeCk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5sZW5ndGgpLmJlLmFib3ZlKDApO1xyXG4gICAgfTtcclxuICB9LFxyXG4gIG5vdCh0eXBlKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gJG5vdCh4KSB7XHJcbiAgICAgIHNob3VsZCgoKSA9PiB0eXBlKHgpKS50aHJvdygpO1xyXG4gICAgfTtcclxuICB9LFxyXG4gIG51bGxhYmxlKHR5cGUpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAkbnVsbGFibGUoeCkge1xyXG4gICAgICB4ID09PSBudWxsIHx8IHR5cGUoeCk7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgb3B0aW9uKHR5cGUpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAkb3B0aW9uKHgpIHtcclxuICAgICAgeCA9PT0gdm9pZCAwIHx8IHR5cGUoeCk7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgc2hhcGUodCkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICRzaGFwZSh4KSB7XHJcbiAgICAgIC8vIFQoW1QuTnVtYmVyKCksIFQuU3RyaW5nKCksIFQuQXJyYXkoVC5OdW1iZXIoKSldKSB+IFsxLCAnZm9vJywgWzEsIDQyXV1cclxuICAgICAgaWYodCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgc2hvdWxkKHgpLmJlLmFuLkFycmF5KCk7XHJcbiAgICAgICAgcmV0dXJuIHQubWFwKCh2LCBrKSA9PiB2KHhba10pKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBUKHsgZm9vOiBULlN0cmluZygpLCBiYXI6IFQuTnVtYmVyKCkgfSkgfiB7IGZvbzogJ2ZpenonLCBiYXI6IDQyIH1cclxuICAgICAgaWYodCBpbnN0YW5jZW9mIE9iamVjdCkge1xyXG4gICAgICAgIHNob3VsZCh4KS5iZS5hbi5PYmplY3QoKTtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModCkubWFwKChrKSA9PiB0W2tdKHhba10pKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBUKCh4KSA9PiBzaG91bGQoeCkuYmUuZXhhY3RseSg0MikpIH4gNDJcclxuICAgICAgaWYodCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdCh4KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LFxyXG4gIHRvUHJvcFR5cGUodHlwZSkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICR0b1Byb3BUeXBlKHByb3BzLCBwcm9wTmFtZSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHR5cGUocHJvcHNbcHJvcE5hbWVdKTtcclxuICAgICAgfVxyXG4gICAgICBjYXRjaChlcnIpIHtcclxuICAgICAgICByZXR1cm4gZXJyO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sXHJcbn07XHJcblxyXG5mdW5jdGlvbiBhc3NlcnRUeXBlcyh0eXBlcywgYXJncykge1xyXG4gIHNob3VsZCh0eXBlcykuYmUuYW4uQXJyYXkoKTtcclxuICByZXR1cm4gYXJncy5tYXAoKHYsIGspID0+IHR5cGVzW2tdKHYpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuYW1lRnVuY3Rpb24oZm4sIG5hbWUsIGtpbmQpIHtcclxuICBpZighX19ERVZfXykge1xyXG4gICAgcmV0dXJuIGZuO1xyXG4gIH1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sICduYW1lJywge1xyXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICB2YWx1ZTogYCR7a2luZH0oJHtuYW1lfSlgLFxyXG4gIH0pO1xyXG4gIHJldHVybiBmbjtcclxufVxyXG5cclxuZnVuY3Rpb24gd3JhcChhcmdzVCwgdmFsVCwgZm4pIHtcclxuICByZXR1cm4gZnVuY3Rpb24gd3JhcHBlZCguLi5hcmdzKSB7XHJcbiAgICBpZihhcmdzVCAhPT0gdm9pZCAwKSB7XHJcbiAgICAgIGFzc2VydFR5cGVzKGFyZ3NULCBhcmdzKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHZhbCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG4gICAgaWYodmFsVCAhPT0gdm9pZCAwKSB7XHJcbiAgICAgIGFzc2VydFR5cGVzKFt2YWxUXSwgW3ZhbF0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbDtcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiB0eXBlY2hlY2soYXJnc1QsIHZhbFQsIGZuLCBraW5kID0gJ3R5cGVjaGVjaycpIHtcclxuICBpZihmbiAhPT0gdm9pZCAwKSB7XHJcbiAgICByZXR1cm4gcmVuYW1lRnVuY3Rpb24od3JhcChhcmdzVCwgdmFsVCwgZm4pLCBmbi5uYW1lLCBraW5kKTtcclxuICB9XHJcbiAgcmV0dXJuICh0YXJnZXQsIGtleSwgZGVzYykgPT4gKHtcclxuICAgIC4uLmRlc2MsXHJcbiAgICB2YWx1ZTogcmVuYW1lRnVuY3Rpb24od3JhcChhcmdzVCwgdmFsVCwgZGVzYy52YWx1ZSksIGRlc2MudmFsdWUubmFtZSwgYEAke2tpbmR9YCksXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRha2VzKC4uLmFyZ3NUKSB7XHJcbiAgcmV0dXJuIHR5cGVjaGVjayhhcmdzVCwgdm9pZCAwLCB2b2lkIDAsICd0YWtlcycpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXR1cm5zKHZhbFQpIHtcclxuICByZXR1cm4gdHlwZWNoZWNrKHZvaWQgMCwgdmFsVCwgdm9pZCAwLCAncmV0dXJucycpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKFQsIHsgdHlwZWNoZWNrLCB0YWtlcywgcmV0dXJucyB9KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9