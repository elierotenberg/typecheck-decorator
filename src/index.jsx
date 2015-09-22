import should from 'should/as-function';

const T = {
  shouldTypeCheck: process && process.env && process.env.NODE_ENV === 'development',
  // T.any() ~ 243
  any() {
    return (x) => void x;
  },
  // T.instanceOf(Constructor) ~ new Constructor()
  instanceOf(Class) {
    return (x) => should(x).be.an.instanceOf(Class);
  },
  // T.exactly(42) ~ 42
  exactly(v) {
    return (x) => should(x).be.exactly(v);
  },
  // T.deepEqual({ a: 11 }) ~ { a: 11 }
  deepEqual(v) {
    return (x) => should(x).eql(v);
  },
  bool() {
    return (x) => should(x).equalOneOf(true, false);
  },
  // T.Number() ~ 1
  // T.Number({ within: [4, 5] }) ~ 4.5
  Number({ above, below, within } = {}) {
    return (x) => {
      should(x).be.a.Number();
      if(above !== void 0) {
        should(x).be.above(above);
      }
      if(below !== void 0) {
        should(x).be.below(below);
      }
      if(within !== void 0) {
        should(x).be.within(...within);
      }
    };
  },
  String({ length, match } = {}) {
    return (x) => {
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
    return (x) => {
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
    return (x) => {
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
    return (x) => {
      should(x).be.a.Function();
      return () => T.typecheck(argsT, retT)(x);
    };
  },
  Promise({ type } = {}) {
    return (x) => {
      T.shape({ then: T.Function() })(x);
      if(type !== void 0) {
        return x.catch(() => void 0).then((v) => type(v));
      }
    };
  },
  eachOf(...types) {
    return (x) => types.forEach((t) => t(x));
  },
  oneOf(...types) {
    return (x) =>
      should(types.filter((t) => {
        try {
          t(x);
          return true;
        }
        catch(err) {
          return false;
        }
      }).length).be.above(0)
    ;
  },
  not(type) {
    return (x) => should(() => type(x)).throw();
  },
  nullable(type) {
    return (x) => x === null || type(x);
  },
  option(type) {
    return (x) => x === void 0 || type(x);
  },
  shape(t) {
    return (x) => {
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
};

function assertTypes(types, args) {
  should(types).be.an.Array();
  return args.map((v, k) => types[k](v));
}

function wrap(argsT, valT, fn) {
  if((typeof T.shouldTypeCheck === 'function' && !T.shouldTypeCheck()) || !T.shouldTypeCheck) {
    return fn;
  }
  return function wrapped(...args) {
    assertTypes(argsT, args);
    const val = fn.apply(this, args);
    assertTypes([valT], [val]);
    return val;
  };
}

function typecheck(argsT, valT, fn) {
  if(fn !== void 0) {
    return wrap(argsT, valT, fn);
  }
  return (target, key, desc) => ({
    ...desc,
    value: wrap(argsT, valT, desc.value),
  });
}

export default Object.assign(T, { typecheck });
