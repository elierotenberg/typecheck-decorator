import should from 'should/as-function';
const shouldTypeCheck = process && process.env && process.env.NODE_ENV === 'development';

function assertArgs(types, args) {
  should(types).be.an.Array();
  return args.map((v, k) => types[k](v));
}

function wrap(types, fn) {
  if((typeof shouldTypeCheck === 'function' && shouldTypeCheck()) || shouldTypeCheck) {
    return fn;
  }
  return function wrapped(...args) {
    assertArgs(types, args);
    return fn.apply(this, args);
  };
}

function check(...types) {
  return (target, name, descriptor) => ({
    ...descriptor,
    value: wrap(types, descriptor.value),
  });
}

function T(t) {
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
}

Object.assign(T, {
  // T.instanceOf(Constructor) ~ new Constructor()
  instanceOf(Class) {
    return (x) => should(x).be.an.instanceOf(Class);
  },
  // T.exactly(42) ~ 42
  exactly(v) {
    return (x) => should(x).be.exactly(v);
  },
  // T.Number() ~ 1
  // T.Number({ within: [4, 5] }) ~ 4.5
  Number({ above, below, within }) {
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
  String({ length, match }) {
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
  Array({ type, length }) {
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
  Object({ type, length }) {
    return (x) => {
      should(x).be.an.Object();
      if(type) {
        Object.keys(x).forEach((k) => type(x[k]));
      }
      if(length !== void 0) {
        should(Object.keys(x).length).should.exactly(length);
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
      })).be.above(0)
    ;
  },
});

export default Object.assign(check, {
  T,
  wrap,
});
