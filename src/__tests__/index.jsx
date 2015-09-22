import should from 'should/as-function';
import Promise from 'bluebird';
Promise.longStackTraces();
const { describe, it, before, after } = global;

import T, { typecheck } from '../';

describe('T', () => {
  it('T.any()', () => {
    should(() => T.any(42)).not.throw();
    should(() => T.any(void 0)).not.throw();
    should(() => T.any(null)).not.throw();
    should(() => T.any({})).not.throw();
  });
  it('T.instanceOf()', () => {
    class C1 {}
    class C2 {}
    const a = new C1();
    const b = new C2();
    should(() => T.instanceOf(C1)(a)).not.throw();
    should(() => T.instanceOf(C1)(b)).throw();
    should(() => T.instanceOf(C2)(a)).throw();
    should(() => T.instanceOf(C2)(b)).not.throw();
  });
  it('T.exactly()', () => {
    should(() => T.exactly(42)(42)).not.throw();
    should(() => T.exactly(42)(1337)).throw();
    should(() => T.exactly({})({})).throw();
    should(() => T.exactly(JSON.stringify({}))(JSON.stringify({}))).not.throw();
  });
  it('T.deepEqual()', () => {
    should(() => T.deepEqual({ foo: 'bar' })({ foo: 'baz' })).throw();
    should(() => T.deepEqual({ foo: 'bar' })({ foo: 'bar' })).not.throw();
    should(() => T.deepEqual({ foo: { bar: 'fizz' } })({ foo: { bar: 'fizz' } })).not.throw();
  });
  it('T.bool()', () => {
    should(() => T.bool()(42)).throw();
    should(() => T.bool()({})).throw();
    should(() => T.bool()(true)).not.throw();
    should(() => T.bool()(false)).not.throw();
  });
  it('T.Number()', () => {
    should(() => T.Number()(42)).not.throw();
    should(() => T.Number()('42')).throw();
    should(() => T.Number({ above: 0 })(42)).not.throw();
    should(() => T.Number({ above: 0 })(-1)).throw();
    should(() => T.Number({ below: 0 })(0)).throw();
    should(() => T.Number({ below: 0 })(-1)).not.throw();
    should(() => T.Number({ within: [0, 1] })(0.5)).not.throw();
    should(() => T.Number({ within: [2, 3] })(0.5)).throw();
  });
  it('T.String()', () => {
    should(() => T.String()(42)).throw();
    should(() => T.String()('42')).not.throw();
    should(() => T.String({ length: 4 })('abc')).throw();
    should(() => T.String({ length: 4 })('abcd')).not.throw();
    should(() => T.String({ match: /^[0-9]*$/ })('abc')).throw();
    should(() => T.String({ match: /^[0-9]*$/ })('42')).not.throw();
  });
  it('T.Array()', () => {
    should(() => T.Array()(42)).throw();
    should(() => T.Array()([])).not.throw();
    should(() => T.Array()({})).throw();
    should(() => T.Array({ type: T.Number() })([42])).not.throw();
    should(() => T.Array({ type: T.Number() })([42, '42'])).throw();
    should(() => T.Array({ length: 0 })([])).not.throw();
    should(() => T.Array({ length: 0 })([42])).throw();
  });
  it('T.Object()', () => {
    should(() => T.Object()({})).not.throw();
    should(() => T.Object()(42)).throw();
    should(() => T.Object({ type: T.Number() })({ a: 42 })).not.throw();
    should(() => T.Object({ type: T.Number() })({ a: 42, b: '42' })).throw();
    should(() => T.Object({ length: 0 })({})).not.throw();
    should(() => T.Object({ length: 42 })({})).throw();
  });
  it('T.Promise()', () => {
    should(() => T.Promise()({})).throw();
    should(() => T.Promise()(Promise.resolve())).not.throw();
    return Promise.all([
      T.Promise({ type: T.Number() })(Promise.resolve(42)),
      T.Promise({ type: T.not(T.Number()) })(Promise.resolve('42')),
    ]);
  });
  it('T.eachOf()', () => {
    class A {}
    class B extends A {}
    class C extends B {}
    should(() => T.eachOf(T.Object(), T.Array())([])).not.throw();
    should(() => T.eachOf(T.Object(), T.Array())(42)).throw();
    should(() => T.eachOf(T.instanceOf(A), T.instanceOf(B), T.instanceOf(C))(new C())).not.throw();
  });
  it('T.oneOf()', () => {
    should(() => T.oneOf(T.Number(), T.Object())(42)).not.throw();
    should(() => T.oneOf(T.Array(), T.Object())(42)).throw();
  });
  it('T.not()', () => {
    should(() => T.not(T.Object())(42)).not.throw();
    should(() => T.not(T.Object())({})).throw();
  });
  it('T.shape()', () => {
    should(() => T.shape({})(42)).throw();
    should(() => T.shape({ a: T.Number() })({ a: 42 })).not.throw();
    should(() => T.shape({ a: T.Number() })({ a: '42' })).throw();
    should(() => T.shape({ foo: T.String(), fizz: T.exactly('buzz') })({ foo: 'bar', fizz: 'buzz' })).not.throw();
    should(() => T.shape([])(42)).throw();
    should(() => T.shape([T.Number()])([42])).not.throw();
    should(() => T.shape([T.Number()])(['42'])).throw();
  });
});

describe('typecheck', () => {
  const shouldTypeCheck = T.shouldTypeCheck;
  before(() => T.shouldTypeCheck = true);
  after(() => T.shouldTypeCheck = shouldTypeCheck);
  it('regular function typecheck', () => {
    const sum = typecheck([T.Number(), T.Number()], T.Number(),
      (a, b) => a + b
    );
    should(() => sum(1, 2)).not.throw();
    should(() => sum('42', '42')).throw();
  });
  it('class static method typecheck', () => {
    class A {
      @typecheck([T.Number(), T.Number()], T.Number())
      static sum(a, b) {
        return a + b;
      }
    }
    should(() => A.sum(1, 2)).not.throw();
    should(() => A.sum('42', '42')).throw();
  });
  it('class method typecheck', () => {
    class A {
      constructor(a, b) {
        this.a = a;
        this.b = b;
      }
      @typecheck([], T.Number())
      sum() {
        return this.a + this. b;
      }
    }
    should(() => new A(1, 2).sum()).not.throw();
    should(() => new A('42', '42').sum()).throw();
  });
});
