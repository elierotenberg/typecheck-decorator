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
        throw new TypeError(['Function \'' + fn.name + '\' expected to take: ' + (0, _util.inspect)(argsT.map(argsT, function (t) {
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
//# sourceMappingURL=data:application/json;base64,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QUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxRQUFNLElBQUksQ0FBRzs7R0FDakYsQ0FBQztDQUNKOztBQUVELFNBQVMsS0FBSyxHQUFXO3FDQUFQLEtBQUs7QUFBTCxTQUFLOzs7QUFDckIsU0FBTyxTQUFTLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0NBQ2xEOztBQUVELFNBQVMsT0FBTyxDQUFDLElBQUksRUFBRTtBQUNyQixTQUFPLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7Q0FDbkQ7O3FCQUVjLGVBQWMsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFULFNBQVMsRUFBRSxLQUFLLEVBQUwsS0FBSyxFQUFFLE9BQU8sRUFBUCxPQUFPLEVBQUUsQ0FBQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluc3BlY3QgfSBmcm9tICd1dGlsJztcclxuaW1wb3J0IHNob3VsZCBmcm9tICdzaG91bGQvYXMtZnVuY3Rpb24nO1xyXG5cclxuY29uc3QgX19ERVZfXyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnO1xyXG5cclxuY29uc3QgVCA9IHtcclxuICAvLyBULmFueSgpIH4gMjQzXHJcbiAgYW55KCkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICRhbnkoKSB7fTtcclxuICB9LFxyXG4gIC8vIFQuaW5zdGFuY2VPZihDb25zdHJ1Y3RvcikgfiBuZXcgQ29uc3RydWN0b3IoKVxyXG4gIGluc3RhbmNlT2YoQ2xhc3MpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAkaW5zdGFuY2VPZih4KSB7XHJcbiAgICAgIHNob3VsZCh4KS5iZS5hbi5pbnN0YW5jZU9mKENsYXNzKTtcclxuICAgIH07XHJcbiAgfSxcclxuICAvLyBULmV4YWN0bHkoNDIpIH4gNDJcclxuICBleGFjdGx5KHYpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAkZXhhY3RseSh4KSB7XHJcbiAgICAgIHNob3VsZCh4KS5iZS5leGFjdGx5KHYpO1xyXG4gICAgfTtcclxuICB9LFxyXG4gIC8vIFQuZGVlcEVxdWFsKHsgYTogMTEgfSkgfiB7IGE6IDExIH1cclxuICBkZWVwRXF1YWwodikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICRkZWVwRXF1YWwoeCkge1xyXG4gICAgICBzaG91bGQoeCkuZXFsKHYpO1xyXG4gICAgfTtcclxuICB9LFxyXG4gIGJvb2woKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gJGJvb2woeCkge1xyXG4gICAgICBzaG91bGQoeCkuZXF1YWxPbmVPZih0cnVlLCBmYWxzZSk7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgLy8gVC5OdW1iZXIoKSB+IDFcclxuICAvLyBULk51bWJlcih7IHdpdGhpbjogWzQsIDVdIH0pIH4gNC41XHJcbiAgTnVtYmVyKHsgYWJvdmUsIGFib3ZlT3JFcXVhbCwgYmVsb3csIGJlbG93T3JFcXVhbCwgd2l0aGluIH0gPSB7fSkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICROdW1iZXIoeCkge1xyXG4gICAgICBzaG91bGQoeCkuYmUuYS5OdW1iZXIoKTtcclxuICAgICAgaWYoYWJvdmUgIT09IHZvaWQgMCkge1xyXG4gICAgICAgIHNob3VsZCh4KS5iZS5hYm92ZShhYm92ZSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYoYWJvdmVPckVxdWFsICE9PSB2b2lkIDApIHtcclxuICAgICAgICBzaG91bGQoeCkuYmUuYWJvdmVPckVxdWFsKGFib3ZlT3JFcXVhbCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYoYmVsb3cgIT09IHZvaWQgMCkge1xyXG4gICAgICAgIHNob3VsZCh4KS5iZS5iZWxvdyhiZWxvdyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYoYmVsb3dPckVxdWFsICE9PSB2b2lkIDApIHtcclxuICAgICAgICBzaG91bGQoeCkuYmUuYmVsb3dPckVxdWFsKGJlbG93T3JFcXVhbCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYod2l0aGluICE9PSB2b2lkIDApIHtcclxuICAgICAgICBzaG91bGQoeCkuYmUud2l0aGluKC4uLndpdGhpbik7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSxcclxuICBTdHJpbmcoeyBsZW5ndGgsIG1hdGNoIH0gPSB7fSkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICRTdHJpbmcoeCkge1xyXG4gICAgICBzaG91bGQoeCkuYmUuYS5TdHJpbmcoKTtcclxuICAgICAgaWYobGVuZ3RoICE9PSB2b2lkIDApIHtcclxuICAgICAgICBzaG91bGQoeC5sZW5ndGgpLmJlLmV4YWN0bHkobGVuZ3RoKTtcclxuICAgICAgfVxyXG4gICAgICBpZihtYXRjaCAhPT0gdm9pZCAwKSB7XHJcbiAgICAgICAgc2hvdWxkKHgpLm1hdGNoKG1hdGNoKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LFxyXG4gIEFycmF5KHsgdHlwZSwgbGVuZ3RoIH0gPSB7fSkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICRBcnJheSh4KSB7XHJcbiAgICAgIHNob3VsZCh4KS5iZS5hbi5BcnJheSgpO1xyXG4gICAgICBpZih0eXBlKSB7XHJcbiAgICAgICAgeC5mb3JFYWNoKCh2KSA9PiB0eXBlKHYpKTtcclxuICAgICAgfVxyXG4gICAgICBpZihsZW5ndGggIT09IHZvaWQgMCkge1xyXG4gICAgICAgIHNob3VsZCh4Lmxlbmd0aCkuYmUuZXhhY3RseShsZW5ndGgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgT2JqZWN0KHsgdHlwZSwgbGVuZ3RoIH0gPSB7fSkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICRPYmplY3QoeCkge1xyXG4gICAgICBzaG91bGQoeCkuYmUuYW4uT2JqZWN0KCk7XHJcbiAgICAgIGlmKHR5cGUpIHtcclxuICAgICAgICBPYmplY3Qua2V5cyh4KS5mb3JFYWNoKChrKSA9PiB0eXBlKHhba10pKTtcclxuICAgICAgfVxyXG4gICAgICBpZihsZW5ndGggIT09IHZvaWQgMCkge1xyXG4gICAgICAgIHNob3VsZChPYmplY3Qua2V5cyh4KS5sZW5ndGgpLmJlLmV4YWN0bHkobGVuZ3RoKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LFxyXG4gIEZ1bmN0aW9uKGFyZ3NUID0gVC5hbnkoKSwgcmV0VCA9IFQuYW55KCkpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAkRnVuY3Rpb24oeCkge1xyXG4gICAgICBzaG91bGQoeCkuYmUuYS5GdW5jdGlvbigpO1xyXG4gICAgICByZXR1cm4gKCkgPT4gVC50eXBlY2hlY2soYXJnc1QsIHJldFQpKHgpO1xyXG4gICAgfTtcclxuICB9LFxyXG4gIFByb21pc2UoeyB0eXBlIH0gPSB7fSkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICRQcm9taXNlKHgpIHtcclxuICAgICAgVC5zaGFwZSh7IHRoZW46IFQuRnVuY3Rpb24oKSB9KSh4KTtcclxuICAgICAgaWYodHlwZSAhPT0gdm9pZCAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHguY2F0Y2goKCkgPT4gdm9pZCAwKS50aGVuKCh2KSA9PiB0eXBlKHYpKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LFxyXG4gIEVycm9yKHsgbWVzc2FnZSB9ID0ge30pIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAkRXJyb3IoeCkge1xyXG4gICAgICBzaG91bGQoeCkuYmUuYW4uRXJyb3IoKTtcclxuICAgICAgaWYobWVzc2FnZSAhPT0gdm9pZCAwKSB7XHJcbiAgICAgICAgc2hvdWxkKHgubWVzc2FnZSkuYmUuZXhhY3RseShtZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LFxyXG4gIGVhY2hPZiguLi50eXBlcykge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICRlYWNoT2YoeCkge1xyXG4gICAgICB0eXBlcy5mb3JFYWNoKCh0KSA9PiB0KHgpKTtcclxuICAgIH07XHJcbiAgfSxcclxuICBvbmVPZiguLi50eXBlcykge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICRvbmVPZih4KSB7XHJcbiAgICAgIHNob3VsZCh0eXBlcy5maWx0ZXIoKHQpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgdCh4KTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaChlcnIpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLmxlbmd0aCkuYmUuYWJvdmUoMCk7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgbm90KHR5cGUpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAkbm90KHgpIHtcclxuICAgICAgc2hvdWxkKCgpID0+IHR5cGUoeCkpLnRocm93KCk7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgbnVsbGFibGUodHlwZSkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICRudWxsYWJsZSh4KSB7XHJcbiAgICAgIHggPT09IG51bGwgfHwgdHlwZSh4KTtcclxuICAgIH07XHJcbiAgfSxcclxuICBvcHRpb24odHlwZSkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICRvcHRpb24oeCkge1xyXG4gICAgICB4ID09PSB2b2lkIDAgfHwgdHlwZSh4KTtcclxuICAgIH07XHJcbiAgfSxcclxuICBzaGFwZSh0KSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gJHNoYXBlKHgpIHtcclxuICAgICAgLy8gVChbVC5OdW1iZXIoKSwgVC5TdHJpbmcoKSwgVC5BcnJheShULk51bWJlcigpKV0pIH4gWzEsICdmb28nLCBbMSwgNDJdXVxyXG4gICAgICBpZih0IGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICBzaG91bGQoeCkuYmUuYW4uQXJyYXkoKTtcclxuICAgICAgICByZXR1cm4gdC5tYXAoKHYsIGspID0+IHYoeFtrXSkpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIFQoeyBmb286IFQuU3RyaW5nKCksIGJhcjogVC5OdW1iZXIoKSB9KSB+IHsgZm9vOiAnZml6eicsIGJhcjogNDIgfVxyXG4gICAgICBpZih0IGluc3RhbmNlb2YgT2JqZWN0KSB7XHJcbiAgICAgICAgc2hvdWxkKHgpLmJlLmFuLk9iamVjdCgpO1xyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0KS5tYXAoKGspID0+IHRba10oeFtrXSkpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIFQoKHgpID0+IHNob3VsZCh4KS5iZS5leGFjdGx5KDQyKSkgfiA0MlxyXG4gICAgICBpZih0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgICB0KHgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgdG9Qcm9wVHlwZSh0eXBlKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gJHRvUHJvcFR5cGUocHJvcHMsIHByb3BOYW1lKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdHlwZShwcm9wc1twcm9wTmFtZV0pO1xyXG4gICAgICB9XHJcbiAgICAgIGNhdGNoKGVycikge1xyXG4gICAgICAgIHJldHVybiBlcnI7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSxcclxufTtcclxuXHJcbmZ1bmN0aW9uIGFzc2VydFR5cGVzKHR5cGVzLCBhcmdzKSB7XHJcbiAgc2hvdWxkKHR5cGVzKS5iZS5hbi5BcnJheSgpO1xyXG4gIHJldHVybiBhcmdzLm1hcCgodiwgaykgPT4gdHlwZXNba10odikpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5hbWVGdW5jdGlvbihmbiwgbmFtZSwga2luZCkge1xyXG4gIGlmKCFfX0RFVl9fKSB7XHJcbiAgICByZXR1cm4gZm47XHJcbiAgfVxyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgJ25hbWUnLCB7XHJcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgIHdyaXRhYmxlOiBmYWxzZSxcclxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgIHZhbHVlOiBgJHtraW5kfSgke25hbWV9KWAsXHJcbiAgfSk7XHJcbiAgcmV0dXJuIGZuO1xyXG59XHJcblxyXG5mdW5jdGlvbiB3cmFwKGFyZ3NULCB2YWxULCBmbikge1xyXG4gIHJldHVybiBmdW5jdGlvbiB3cmFwcGVkKC4uLmFyZ3MpIHtcclxuICAgIGlmKGFyZ3NUICE9PSB2b2lkIDApIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBhc3NlcnRUeXBlcyhhcmdzVCwgYXJncyk7XHJcbiAgICAgIH1cclxuICAgICAgY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihbXHJcbiAgICAgICAgICBgRnVuY3Rpb24gJyR7Zm4ubmFtZX0nIGV4cGVjdGVkIHRvIHRha2U6ICR7aW5zcGVjdChhcmdzVC5tYXAoYXJnc1QsICh0KSA9PiB0Lm5hbWUgfHwgdCkpfWAsXHJcbiAgICAgICAgICBgYnV0IGluc3RlYWQgZ290OiAke2luc3BlY3QoYXJncyl9YCxcclxuICAgICAgICAgIGVyci50b1N0cmluZygpLFxyXG4gICAgICAgIF0uam9pbignXFxuJykpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCB2YWwgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgIGlmKHZhbFQgIT09IHZvaWQgMCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGFzc2VydFR5cGVzKFt2YWxUXSwgW3ZhbF0pO1xyXG4gICAgICB9XHJcbiAgICAgIGNhdGNoKGVycikge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoW1xyXG4gICAgICAgICAgYEZ1bmN0aW9uICcke2ZuLm5hbWV9JyBleHBlY3RlZCB0byB0YWtlOiAke2luc3BlY3QodmFsVC5uYW1lIHx8IHZhbFQpfWAsXHJcbiAgICAgICAgICBgYnV0IGluc3RlYWQgZ290OiAke2luc3BlY3QoYXJncyl9YCxcclxuICAgICAgICAgIGVyci50b1N0cmluZygpLFxyXG4gICAgICAgIF0uam9pbignXFxuJykpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsO1xyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHR5cGVjaGVjayhhcmdzVCwgdmFsVCwgZm4sIGtpbmQgPSAndHlwZWNoZWNrJykge1xyXG4gIGlmKGZuICE9PSB2b2lkIDApIHtcclxuICAgIHJldHVybiByZW5hbWVGdW5jdGlvbih3cmFwKGFyZ3NULCB2YWxULCBmbiksIGZuLm5hbWUsIGtpbmQpO1xyXG4gIH1cclxuICByZXR1cm4gKHRhcmdldCwga2V5LCBkZXNjKSA9PiAoe1xyXG4gICAgLi4uZGVzYyxcclxuICAgIHZhbHVlOiByZW5hbWVGdW5jdGlvbih3cmFwKGFyZ3NULCB2YWxULCBkZXNjLnZhbHVlKSwgZGVzYy52YWx1ZS5uYW1lLCBgQCR7a2luZH1gKSxcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gdGFrZXMoLi4uYXJnc1QpIHtcclxuICByZXR1cm4gdHlwZWNoZWNrKGFyZ3NULCB2b2lkIDAsIHZvaWQgMCwgJ3Rha2VzJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJldHVybnModmFsVCkge1xyXG4gIHJldHVybiB0eXBlY2hlY2sodm9pZCAwLCB2YWxULCB2b2lkIDAsICdyZXR1cm5zJyk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oVCwgeyB0eXBlY2hlY2ssIHRha2VzLCByZXR1cm5zIH0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=