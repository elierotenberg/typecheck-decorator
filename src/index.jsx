import { inspect } from 'util';
import should from 'should/as-function';

const __DEV__ = process.env.NODE_ENV === 'development';

const T = {
  // T.any() ~ 243
  any() {
    return function $any() {};
  },
  // T.instanceOf(Constructor) ~ new Constructor()
  instanceOf(Class) {
    return function $instanceOf(x) {
      should(x).be.an.instanceOf(Class);
    };
  },
  // T.exactly(42) ~ 42
  exactly(v) {
    return function $exactly(x) {
      should(x).be.exactly(v);
    };
  },
  // T.deepEqual({ a: 11 }) ~ { a: 11 }
  deepEqual(v) {
    return function $deepEqual(x) {
      should(x).eql(v);
    };
  },
  bool() {
    return function $bool(x) {
      should(x).equalOneOf(true, false);
    };
  },
  // T.Number() ~ 1
  // T.Number({ within: [4, 5] }) ~ 4.5
  Number({ above, aboveOrEqual, below, belowOrEqual, within } = {}) {
    return function $Number(x) {
      should(x).be.a.Number();
      if(above !== void 0) {
        should(x).be.above(above);
      }
      if(aboveOrEqual !== void 0) {
        should(x).be.aboveOrEqual(aboveOrEqual);
      }
      if(below !== void 0) {
        should(x).be.below(below);
      }
      if(belowOrEqual !== void 0) {
        should(x).be.belowOrEqual(belowOrEqual);
      }
      if(within !== void 0) {
        should(x).be.within(...within);
      }
    };
  },
  String({ length, match } = {}) {
    return function $String(x) {
      should(x).be.a.String();
      if(length !== void 0) {
        should(x.length).be.exactly(length);
      }
      if(match !== void 0) {
        should(x).match(match);
      }
    };
  },
  Array({ type, length } = {}) {
    return function $Array(x) {
      should(x).be.an.Array();
      if(type) {
        x.forEach((v) => type(v));
      }
      if(length !== void 0) {
        should(x.length).be.exactly(length);
      }
    };
  },
  Object({ type, length } = {}) {
    return function $Object(x) {
      should(x).be.an.Object();
      if(type) {
        Object.keys(x).forEach((k) => type(x[k]));
      }
      if(length !== void 0) {
        should(Object.keys(x).length).be.exactly(length);
      }
    };
  },
  Function(argsT = T.any(), retT = T.any()) {
    return function $Function(x) {
      should(x).be.a.Function();
      return () => T.typecheck(argsT, retT)(x);
    };
  },
  Promise({ type } = {}) {
    return function $Promise(x) {
      T.shape({ then: T.Function() })(x);
      if(type !== void 0) {
        return x.catch(() => void 0).then((v) => type(v));
      }
    };
  },
  Error({ message } = {}) {
    return function $Error(x) {
      should(x).be.an.Error();
      if(message !== void 0) {
        should(x.message).be.exactly(message);
      }
    };
  },
  eachOf(...types) {
    return function $eachOf(x) {
      types.forEach((t) => t(x));
    };
  },
  oneOf(...types) {
    return function $oneOf(x) {
      should(types.filter((t) => {
        try {
          t(x);
          return true;
        }
        catch(err) {
          return false;
        }
      }).length).be.above(0);
    };
  },
  not(type) {
    return function $not(x) {
      should(() => type(x)).throw();
    };
  },
  nullable(type) {
    return function $nullable(x) {
      x === null || type(x);
    };
  },
  option(type) {
    return function $option(x) {
      x === void 0 || type(x);
    };
  },
  shape(t) {
    return function $shape(x) {
      // T([T.Number(), T.String(), T.Array(T.Number())]) ~ [1, 'foo', [1, 42]]
      if(t instanceof Array) {
        should(x).be.an.Array();
        return t.map((v, k) => v(x[k]));
      }
      // T({ foo: T.String(), bar: T.Number() }) ~ { foo: 'fizz', bar: 42 }
      if(t instanceof Object) {
        should(x).be.an.Object();
        return Object.keys(t).map((k) => t[k](x[k]));
      }
      // T((x) => should(x).be.exactly(42)) ~ 42
      if(t instanceof Function) {
        t(x);
      }
    };
  },
  toPropType(type) {
    return function $toPropType(props, propName) {
      try {
        type(props[propName]);
      }
      catch(err) {
        return err;
      }
    };
  },
};

function assertTypes(types, args) {
  should(types).be.an.Array();
  return args.map((v, k) => types[k](v));
}

function renameFunction(fn, name, kind) {
  if(!__DEV__) {
    return fn;
  }
  Object.defineProperty(fn, 'name', {
    enumerable: false,
    writable: false,
    configurable: true,
    value: `${kind}(${name})`,
  });
  return fn;
}

function wrap(argsT, valT, fn) {
  return function wrapped(...args) {
    if(argsT !== void 0) {
      try {
        assertTypes(argsT, args);
      }
      catch(err) {
        throw new TypeError([
          `Function '${fn.name}' expected to take: ${inspect(argsT.map(argsT, (t) => t.name || t))}`,
          `but instead got: ${inspect(args)}`,
          err.toString(),
        ].join('\n'));
      }
    }
    const val = fn.apply(this, args);
    if(valT !== void 0) {
      try {
        assertTypes([valT], [val]);
      }
      catch(err) {
        throw new TypeError([
          `Function '${fn.name}' expected to take: ${inspect(valT.name || valT)}`,
          `but instead got: ${inspect(args)}`,
          err.toString(),
        ].join('\n'));
      }
    }
    return val;
  };
}

function typecheck(argsT, valT, fn, kind = 'typecheck') {
  if(fn !== void 0) {
    return renameFunction(wrap(argsT, valT, fn), fn.name, kind);
  }
  return (target, key, desc) => ({
    ...desc,
    value: renameFunction(wrap(argsT, valT, desc.value), desc.value.name, `@${kind}`),
  });
}

function takes(...argsT) {
  return typecheck(argsT, void 0, void 0, 'takes');
}

function returns(valT) {
  return typecheck(void 0, valT, void 0, 'returns');
}

export default Object.assign(T, { typecheck, takes, returns });
