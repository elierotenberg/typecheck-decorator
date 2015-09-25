'use strict';

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createDecoratedClass = require('babel-runtime/helpers/create-decorated-class')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _shouldAsFunction = require('should/as-function');

var _shouldAsFunction2 = _interopRequireDefault(_shouldAsFunction);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _ = require('../');

var _2 = _interopRequireDefault(_);

_bluebird2['default'].longStackTraces();
var describe = global.describe;
var it = global.it;
var before = global.before;
var after = global.after;

describe('T', function () {
  it('T.any()', function () {
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].any()(42);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].any()(void 0);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].any()(null);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].any()({});
    }).not['throw']();
  });
  it('T.instanceOf()', function () {
    var C1 = function C1() {
      _classCallCheck(this, C1);
    };

    var C2 = function C2() {
      _classCallCheck(this, C2);
    };

    var a = new C1();
    var b = new C2();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].instanceOf(C1)(a);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].instanceOf(C1)(b);
    })['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].instanceOf(C2)(a);
    })['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].instanceOf(C2)(b);
    }).not['throw']();
  });
  it('T.exactly()', function () {
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].exactly(42)(42);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].exactly(42)(1337);
    })['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].exactly({})({});
    })['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].exactly(JSON.stringify({}))(JSON.stringify({}));
    }).not['throw']();
  });
  it('T.deepEqual()', function () {
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].deepEqual({ foo: 'bar' })({ foo: 'baz' });
    })['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].deepEqual({ foo: 'bar' })({ foo: 'bar' });
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].deepEqual({ foo: { bar: 'fizz' } })({ foo: { bar: 'fizz' } });
    }).not['throw']();
  });
  it('T.bool()', function () {
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].bool()(42);
    })['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].bool()({});
    })['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].bool()(true);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].bool()(false);
    }).not['throw']();
  });
  it('T.Number()', function () {
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].Number()(42);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].Number()('42');
    })['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].Number({ above: 0 })(42);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].Number({ above: 0 })(-1);
    })['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].Number({ below: 0 })(0);
    })['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].Number({ below: 0 })(-1);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].Number({ within: [0, 1] })(0.5);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].Number({ within: [2, 3] })(0.5);
    })['throw']();
  });
  it('T.String()', function () {
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].String()(42);
    })['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].String()('42');
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].String({ length: 4 })('abc');
    })['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].String({ length: 4 })('abcd');
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].String({ match: /^[0-9]*$/ })('abc');
    })['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].String({ match: /^[0-9]*$/ })('42');
    }).not['throw']();
  });
  it('T.Array()', function () {
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].Array()(42);
    })['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].Array()([]);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].Array()({});
    })['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].Array({ type: _2['default'].Number() })([42]);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].Array({ type: _2['default'].Number() })([42, '42']);
    })['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].Array({ length: 0 })([]);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].Array({ length: 0 })([42]);
    })['throw']();
  });
  it('T.Object()', function () {
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].Object()({});
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].Object()(42);
    })['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].Object({ type: _2['default'].Number() })({ a: 42 });
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].Object({ type: _2['default'].Number() })({ a: 42, b: '42' });
    })['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].Object({ length: 0 })({});
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].Object({ length: 42 })({});
    })['throw']();
  });
  it('T.Promise()', function () {
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].Promise()({});
    })['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].Promise()(_bluebird2['default'].resolve());
    }).not['throw']();
    return _bluebird2['default'].all([_2['default'].Promise({ type: _2['default'].Number() })(_bluebird2['default'].resolve(42)), _2['default'].Promise({ type: _2['default'].not(_2['default'].Number()) })(_bluebird2['default'].resolve('42'))]);
  });
  it('T.Error()', function () {
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].Error()(new Error());
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].Error()({ message: 'foo' });
    })['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].Error({ message: 'foo' })(new Error('foo'));
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].Error({ message: 'foo' })(new Error('bar'));
    })['throw']();
  });
  it('T.eachOf()', function () {
    var A = function A() {
      _classCallCheck(this, A);
    };

    var B = (function (_A) {
      _inherits(B, _A);

      function B() {
        _classCallCheck(this, B);

        _get(Object.getPrototypeOf(B.prototype), 'constructor', this).apply(this, arguments);
      }

      return B;
    })(A);

    var C = (function (_B) {
      _inherits(C, _B);

      function C() {
        _classCallCheck(this, C);

        _get(Object.getPrototypeOf(C.prototype), 'constructor', this).apply(this, arguments);
      }

      return C;
    })(B);

    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].eachOf(_2['default'].Object(), _2['default'].Array())([]);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].eachOf(_2['default'].Object(), _2['default'].Array())(42);
    })['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].eachOf(_2['default'].instanceOf(A), _2['default'].instanceOf(B), _2['default'].instanceOf(C))(new C());
    }).not['throw']();
  });
  it('T.oneOf()', function () {
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].oneOf(_2['default'].Number(), _2['default'].Object())(42);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].oneOf(_2['default'].Array(), _2['default'].Object())(42);
    })['throw']();
  });
  it('T.not()', function () {
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].not(_2['default'].Object())(42);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].not(_2['default'].Object())({});
    })['throw']();
  });
  it('T.nullable()', function () {
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].nullable(_2['default'].Number())(null);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].nullable(_2['default'].Number())(42);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].nullable(_2['default'].Number())('42');
    })['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].nullable(_2['default'].Number())(void 0);
    })['throw']();
  });
  it('T.option()', function () {
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].option(_2['default'].Number())(void 0);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].option(_2['default'].Number())(42);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].option(_2['default'].Number())('42');
    })['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].option(_2['default'].Number())(null);
    })['throw']();
  });
  it('T.shape()', function () {
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].shape({})(42);
    })['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].shape({ a: _2['default'].Number() })({ a: 42 });
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].shape({ a: _2['default'].Number() })({ a: '42' });
    })['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].shape({ foo: _2['default'].String(), fizz: _2['default'].exactly('buzz') })({ foo: 'bar', fizz: 'buzz' });
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].shape([])(42);
    })['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].shape([_2['default'].Number()])([42]);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].shape([_2['default'].Number()])(['42']);
    })['throw']();
  });
  it('T.toPropType()', function () {
    var propTypeNumber = _2['default'].toPropType(_2['default'].Number());
    (0, _shouldAsFunction2['default'])(propTypeNumber({ x: 1337 }, 'x')).not.be.an.Error();
    (0, _shouldAsFunction2['default'])(propTypeNumber({ x: '1337' }, 'x')).be.an.Error();
  });
});

describe('typecheck', function () {
  var shouldTypeCheck = _2['default'].shouldTypeCheck;
  before(function () {
    return _2['default'].shouldTypeCheck = true;
  });
  after(function () {
    return _2['default'].shouldTypeCheck = shouldTypeCheck;
  });
  it('regular function typecheck', function () {
    var sum = (0, _.typecheck)([_2['default'].Number(), _2['default'].Number()], _2['default'].Number(), function (a, b) {
      return a + b;
    });
    (0, _shouldAsFunction2['default'])(function () {
      return sum(1, 2);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return sum('42', '42');
    })['throw']();
  });
  it('class static method typecheck', function () {
    var A = (function () {
      function A() {
        _classCallCheck(this, A);
      }

      _createDecoratedClass(A, null, [{
        key: 'sum',
        decorators: [(0, _.typecheck)([_2['default'].Number(), _2['default'].Number()], _2['default'].Number())],
        value: function sum(a, b) {
          return a + b;
        }
      }]);

      return A;
    })();

    (0, _shouldAsFunction2['default'])(function () {
      return A.sum(1, 2);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return A.sum('42', '42');
    })['throw']();
  });
  it('class method typecheck', function () {
    var A = (function () {
      function A(a, b) {
        _classCallCheck(this, A);

        this.a = a;
        this.b = b;
      }

      _createDecoratedClass(A, [{
        key: 'sum',
        decorators: [(0, _.typecheck)([], _2['default'].Number())],
        value: function sum() {
          return this.a + this.b;
        }
      }]);

      return A;
    })();

    (0, _shouldAsFunction2['default'])(function () {
      return new A(1, 2).sum();
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return new A('42', '42').sum();
    })['throw']();
  });
  it('class static method takes', function () {
    var A = (function () {
      function A() {
        _classCallCheck(this, A);
      }

      _createDecoratedClass(A, null, [{
        key: 'sum',
        decorators: [(0, _.takes)(_2['default'].Number(), _2['default'].Number())],
        value: function sum(a, b) {
          return a + b;
        }
      }]);

      return A;
    })();

    (0, _shouldAsFunction2['default'])(function () {
      return A.sum(1, 2);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return A.sum('42', '42');
    })['throw']();
  });
  it('class method takes', function () {
    var A = (function () {
      function A(a, b) {
        _classCallCheck(this, A);

        this.a = a;
        this.b = b;
      }

      _createDecoratedClass(A, [{
        key: 'sum',
        decorators: [(0, _.takes)(_2['default'].Number())],
        value: function sum(c) {
          return this.a + this.b + c;
        }
      }]);

      return A;
    })();

    (0, _shouldAsFunction2['default'])(function () {
      return new A(1, 2).sum(3);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return new A('42', '42').sum('42');
    })['throw']();
  });
  it('class static method returns', function () {
    var A = (function () {
      function A() {
        _classCallCheck(this, A);
      }

      _createDecoratedClass(A, null, [{
        key: 'sum',
        decorators: [(0, _.returns)(_2['default'].Number())],
        value: function sum(a, b) {
          return a + b;
        }
      }]);

      return A;
    })();

    (0, _shouldAsFunction2['default'])(function () {
      return A.sum(1, 2);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return A.sum('42', '42');
    })['throw']();
  });
  it('class method returns', function () {
    var A = (function () {
      function A(a, b) {
        _classCallCheck(this, A);

        this.a = a;
        this.b = b;
      }

      _createDecoratedClass(A, [{
        key: 'sum',
        decorators: [(0, _.returns)(_2['default'].Number())],
        value: function sum() {
          return this.a + this.b;
        }
      }]);

      return A;
    })();

    (0, _shouldAsFunction2['default'])(function () {
      return new A(1, 2).sum();
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return new A('42', '42').sum();
    })['throw']();
  });
  it('class static method takes & returns', function () {
    var A = (function () {
      function A() {
        _classCallCheck(this, A);
      }

      _createDecoratedClass(A, null, [{
        key: 'sum',
        decorators: [(0, _.returns)(_2['default'].Number()), (0, _.takes)(_2['default'].Number(), _2['default'].any())],
        value: function sum(a, b) {
          return a + b;
        }
      }]);

      return A;
    })();

    (0, _shouldAsFunction2['default'])(function () {
      return A.sum(1, 2);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return A.sum(42, '42');
    })['throw']();
  });
});
//# sourceMappingURL=data:application/json;base64,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QUFPO2FBQU0sY0FBRSxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7S0FBQSxDQUFDLENBQUMsR0FBRyxTQUFNLEVBQUUsQ0FBQztBQUNyRCx1Q0FBTzthQUFNLGNBQUUsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FBQSxDQUFDLFNBQU0sRUFBRSxDQUFDO0FBQ2pELHVDQUFPO2FBQU0sY0FBRSxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FBQSxDQUFDLFNBQU0sRUFBRSxDQUFDO0FBQ2hELHVDQUFPO2FBQU0sY0FBRSxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUFBLENBQUMsQ0FBQyxHQUFHLFNBQU0sRUFBRSxDQUFDO0FBQ3JELHVDQUFPO2FBQU0sY0FBRSxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztLQUFBLENBQUMsQ0FBQyxHQUFHLFNBQU0sRUFBRSxDQUFDO0FBQzVELHVDQUFPO2FBQU0sY0FBRSxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztLQUFBLENBQUMsU0FBTSxFQUFFLENBQUM7R0FDekQsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLFlBQVksRUFBRSxZQUFNO0FBQ3JCLHVDQUFPO2FBQU0sY0FBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7S0FBQSxDQUFDLFNBQU0sRUFBRSxDQUFDO0FBQ3JDLHVDQUFPO2FBQU0sY0FBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7S0FBQSxDQUFDLENBQUMsR0FBRyxTQUFNLEVBQUUsQ0FBQztBQUMzQyx1Q0FBTzthQUFN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O0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6Il9fdGVzdHNfXy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzaG91bGQgZnJvbSAnc2hvdWxkL2FzLWZ1bmN0aW9uJztcclxuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xyXG5Qcm9taXNlLmxvbmdTdGFja1RyYWNlcygpO1xyXG5jb25zdCB7IGRlc2NyaWJlLCBpdCwgYmVmb3JlLCBhZnRlciB9ID0gZ2xvYmFsO1xyXG5cclxuaW1wb3J0IFQsIHsgdHlwZWNoZWNrLCB0YWtlcywgcmV0dXJucyB9IGZyb20gJy4uLyc7XHJcblxyXG5kZXNjcmliZSgnVCcsICgpID0+IHtcclxuICBpdCgnVC5hbnkoKScsICgpID0+IHtcclxuICAgIHNob3VsZCgoKSA9PiBULmFueSgpKDQyKSkubm90LnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5hbnkoKSh2b2lkIDApKS5ub3QudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULmFueSgpKG51bGwpKS5ub3QudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULmFueSgpKHt9KSkubm90LnRocm93KCk7XHJcbiAgfSk7XHJcbiAgaXQoJ1QuaW5zdGFuY2VPZigpJywgKCkgPT4ge1xyXG4gICAgY2xhc3MgQzEge31cclxuICAgIGNsYXNzIEMyIHt9XHJcbiAgICBjb25zdCBhID0gbmV3IEMxKCk7XHJcbiAgICBjb25zdCBiID0gbmV3IEMyKCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5pbnN0YW5jZU9mKEMxKShhKSkubm90LnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5pbnN0YW5jZU9mKEMxKShiKSkudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULmluc3RhbmNlT2YoQzIpKGEpKS50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuaW5zdGFuY2VPZihDMikoYikpLm5vdC50aHJvdygpO1xyXG4gIH0pO1xyXG4gIGl0KCdULmV4YWN0bHkoKScsICgpID0+IHtcclxuICAgIHNob3VsZCgoKSA9PiBULmV4YWN0bHkoNDIpKDQyKSkubm90LnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5leGFjdGx5KDQyKSgxMzM3KSkudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULmV4YWN0bHkoe30pKHt9KSkudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULmV4YWN0bHkoSlNPTi5zdHJpbmdpZnkoe30pKShKU09OLnN0cmluZ2lmeSh7fSkpKS5ub3QudGhyb3coKTtcclxuICB9KTtcclxuICBpdCgnVC5kZWVwRXF1YWwoKScsICgpID0+IHtcclxuICAgIHNob3VsZCgoKSA9PiBULmRlZXBFcXVhbCh7IGZvbzogJ2JhcicgfSkoeyBmb286ICdiYXonIH0pKS50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuZGVlcEVxdWFsKHsgZm9vOiAnYmFyJyB9KSh7IGZvbzogJ2JhcicgfSkpLm5vdC50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuZGVlcEVxdWFsKHsgZm9vOiB7IGJhcjogJ2ZpenonIH0gfSkoeyBmb286IHsgYmFyOiAnZml6eicgfSB9KSkubm90LnRocm93KCk7XHJcbiAgfSk7XHJcbiAgaXQoJ1QuYm9vbCgpJywgKCkgPT4ge1xyXG4gICAgc2hvdWxkKCgpID0+IFQuYm9vbCgpKDQyKSkudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULmJvb2woKSh7fSkpLnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5ib29sKCkodHJ1ZSkpLm5vdC50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuYm9vbCgpKGZhbHNlKSkubm90LnRocm93KCk7XHJcbiAgfSk7XHJcbiAgaXQoJ1QuTnVtYmVyKCknLCAoKSA9PiB7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5OdW1iZXIoKSg0MikpLm5vdC50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuTnVtYmVyKCkoJzQyJykpLnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5OdW1iZXIoeyBhYm92ZTogMCB9KSg0MikpLm5vdC50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuTnVtYmVyKHsgYWJvdmU6IDAgfSkoLTEpKS50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuTnVtYmVyKHsgYmVsb3c6IDAgfSkoMCkpLnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5OdW1iZXIoeyBiZWxvdzogMCB9KSgtMSkpLm5vdC50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuTnVtYmVyKHsgd2l0aGluOiBbMCwgMV0gfSkoMC41KSkubm90LnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5OdW1iZXIoeyB3aXRoaW46IFsyLCAzXSB9KSgwLjUpKS50aHJvdygpO1xyXG4gIH0pO1xyXG4gIGl0KCdULlN0cmluZygpJywgKCkgPT4ge1xyXG4gICAgc2hvdWxkKCgpID0+IFQuU3RyaW5nKCkoNDIpKS50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuU3RyaW5nKCkoJzQyJykpLm5vdC50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuU3RyaW5nKHsgbGVuZ3RoOiA0IH0pKCdhYmMnKSkudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULlN0cmluZyh7IGxlbmd0aDogNCB9KSgnYWJjZCcpKS5ub3QudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULlN0cmluZyh7IG1hdGNoOiAvXlswLTldKiQvIH0pKCdhYmMnKSkudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULlN0cmluZyh7IG1hdGNoOiAvXlswLTldKiQvIH0pKCc0MicpKS5ub3QudGhyb3coKTtcclxuICB9KTtcclxuICBpdCgnVC5BcnJheSgpJywgKCkgPT4ge1xyXG4gICAgc2hvdWxkKCgpID0+IFQuQXJyYXkoKSg0MikpLnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5BcnJheSgpKFtdKSkubm90LnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5BcnJheSgpKHt9KSkudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULkFycmF5KHsgdHlwZTogVC5OdW1iZXIoKSB9KShbNDJdKSkubm90LnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5BcnJheSh7IHR5cGU6IFQuTnVtYmVyKCkgfSkoWzQyLCAnNDInXSkpLnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5BcnJheSh7IGxlbmd0aDogMCB9KShbXSkpLm5vdC50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuQXJyYXkoeyBsZW5ndGg6IDAgfSkoWzQyXSkpLnRocm93KCk7XHJcbiAgfSk7XHJcbiAgaXQoJ1QuT2JqZWN0KCknLCAoKSA9PiB7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5PYmplY3QoKSh7fSkpLm5vdC50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuT2JqZWN0KCkoNDIpKS50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuT2JqZWN0KHsgdHlwZTogVC5OdW1iZXIoKSB9KSh7IGE6IDQyIH0pKS5ub3QudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULk9iamVjdCh7IHR5cGU6IFQuTnVtYmVyKCkgfSkoeyBhOiA0MiwgYjogJzQyJyB9KSkudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULk9iamVjdCh7IGxlbmd0aDogMCB9KSh7fSkpLm5vdC50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuT2JqZWN0KHsgbGVuZ3RoOiA0MiB9KSh7fSkpLnRocm93KCk7XHJcbiAgfSk7XHJcbiAgaXQoJ1QuUHJvbWlzZSgpJywgKCkgPT4ge1xyXG4gICAgc2hvdWxkKCgpID0+IFQuUHJvbWlzZSgpKHt9KSkudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULlByb21pc2UoKShQcm9taXNlLnJlc29sdmUoKSkpLm5vdC50aHJvdygpO1xyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFtcclxuICAgICAgVC5Qcm9taXNlKHsgdHlwZTogVC5OdW1iZXIoKSB9KShQcm9taXNlLnJlc29sdmUoNDIpKSxcclxuICAgICAgVC5Qcm9taXNlKHsgdHlwZTogVC5ub3QoVC5OdW1iZXIoKSkgfSkoUHJvbWlzZS5yZXNvbHZlKCc0MicpKSxcclxuICAgIF0pO1xyXG4gIH0pO1xyXG4gIGl0KCdULkVycm9yKCknLCAoKSA9PiB7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5FcnJvcigpKG5ldyBFcnJvcigpKSkubm90LnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5FcnJvcigpKHsgbWVzc2FnZTogJ2ZvbycgfSkpLnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5FcnJvcih7IG1lc3NhZ2U6ICdmb28nIH0pKG5ldyBFcnJvcignZm9vJykpKS5ub3QudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULkVycm9yKHsgbWVzc2FnZTogJ2ZvbycgfSkobmV3IEVycm9yKCdiYXInKSkpLnRocm93KCk7XHJcbiAgfSk7XHJcbiAgaXQoJ1QuZWFjaE9mKCknLCAoKSA9PiB7XHJcbiAgICBjbGFzcyBBIHt9XHJcbiAgICBjbGFzcyBCIGV4dGVuZHMgQSB7fVxyXG4gICAgY2xhc3MgQyBleHRlbmRzIEIge31cclxuICAgIHNob3VsZCgoKSA9PiBULmVhY2hPZihULk9iamVjdCgpLCBULkFycmF5KCkpKFtdKSkubm90LnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5lYWNoT2YoVC5PYmplY3QoKSwgVC5BcnJheSgpKSg0MikpLnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5lYWNoT2YoVC5pbnN0YW5jZU9mKEEpLCBULmluc3RhbmNlT2YoQiksIFQuaW5zdGFuY2VPZihDKSkobmV3IEMoKSkpLm5vdC50aHJvdygpO1xyXG4gIH0pO1xyXG4gIGl0KCdULm9uZU9mKCknLCAoKSA9PiB7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5vbmVPZihULk51bWJlcigpLCBULk9iamVjdCgpKSg0MikpLm5vdC50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQub25lT2YoVC5BcnJheSgpLCBULk9iamVjdCgpKSg0MikpLnRocm93KCk7XHJcbiAgfSk7XHJcbiAgaXQoJ1Qubm90KCknLCAoKSA9PiB7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5ub3QoVC5PYmplY3QoKSkoNDIpKS5ub3QudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULm5vdChULk9iamVjdCgpKSh7fSkpLnRocm93KCk7XHJcbiAgfSk7XHJcbiAgaXQoJ1QubnVsbGFibGUoKScsICgpID0+IHtcclxuICAgIHNob3VsZCgoKSA9PiBULm51bGxhYmxlKFQuTnVtYmVyKCkpKG51bGwpKS5ub3QudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULm51bGxhYmxlKFQuTnVtYmVyKCkpKDQyKSkubm90LnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5udWxsYWJsZShULk51bWJlcigpKSgnNDInKSkudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULm51bGxhYmxlKFQuTnVtYmVyKCkpKHZvaWQgMCkpLnRocm93KCk7XHJcbiAgfSk7XHJcbiAgaXQoJ1Qub3B0aW9uKCknLCAoKSA9PiB7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5vcHRpb24oVC5OdW1iZXIoKSkodm9pZCAwKSkubm90LnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5vcHRpb24oVC5OdW1iZXIoKSkoNDIpKS5ub3QudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULm9wdGlvbihULk51bWJlcigpKSgnNDInKSkudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULm9wdGlvbihULk51bWJlcigpKShudWxsKSkudGhyb3coKTtcclxuICB9KTtcclxuICBpdCgnVC5zaGFwZSgpJywgKCkgPT4ge1xyXG4gICAgc2hvdWxkKCgpID0+IFQuc2hhcGUoe30pKDQyKSkudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULnNoYXBlKHsgYTogVC5OdW1iZXIoKSB9KSh7IGE6IDQyIH0pKS5ub3QudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULnNoYXBlKHsgYTogVC5OdW1iZXIoKSB9KSh7IGE6ICc0MicgfSkpLnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5zaGFwZSh7IGZvbzogVC5TdHJpbmcoKSwgZml6ejogVC5leGFjdGx5KCdidXp6JykgfSkoeyBmb286ICdiYXInLCBmaXp6OiAnYnV6eicgfSkpLm5vdC50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuc2hhcGUoW10pKDQyKSkudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULnNoYXBlKFtULk51bWJlcigpXSkoWzQyXSkpLm5vdC50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuc2hhcGUoW1QuTnVtYmVyKCldKShbJzQyJ10pKS50aHJvdygpO1xyXG4gIH0pO1xyXG4gIGl0KCdULnRvUHJvcFR5cGUoKScsICgpID0+IHtcclxuICAgIGNvbnN0IHByb3BUeXBlTnVtYmVyID0gVC50b1Byb3BUeXBlKFQuTnVtYmVyKCkpO1xyXG4gICAgc2hvdWxkKHByb3BUeXBlTnVtYmVyKHsgeDogMTMzNyB9LCAneCcpKS5ub3QuYmUuYW4uRXJyb3IoKTtcclxuICAgIHNob3VsZChwcm9wVHlwZU51bWJlcih7IHg6ICcxMzM3JyB9LCAneCcpKS5iZS5hbi5FcnJvcigpO1xyXG4gIH0pO1xyXG59KTtcclxuXHJcbmRlc2NyaWJlKCd0eXBlY2hlY2snLCAoKSA9PiB7XHJcbiAgY29uc3Qgc2hvdWxkVHlwZUNoZWNrID0gVC5zaG91bGRUeXBlQ2hlY2s7XHJcbiAgYmVmb3JlKCgpID0+IFQuc2hvdWxkVHlwZUNoZWNrID0gdHJ1ZSk7XHJcbiAgYWZ0ZXIoKCkgPT4gVC5zaG91bGRUeXBlQ2hlY2sgPSBzaG91bGRUeXBlQ2hlY2spO1xyXG4gIGl0KCdyZWd1bGFyIGZ1bmN0aW9uIHR5cGVjaGVjaycsICgpID0+IHtcclxuICAgIGNvbnN0IHN1bSA9IHR5cGVjaGVjayhbVC5OdW1iZXIoKSwgVC5OdW1iZXIoKV0sIFQuTnVtYmVyKCksXHJcbiAgICAgIChhLCBiKSA9PiBhICsgYlxyXG4gICAgKTtcclxuICAgIHNob3VsZCgoKSA9PiBzdW0oMSwgMikpLm5vdC50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IHN1bSgnNDInLCAnNDInKSkudGhyb3coKTtcclxuICB9KTtcclxuICBpdCgnY2xhc3Mgc3RhdGljIG1ldGhvZCB0eXBlY2hlY2snLCAoKSA9PiB7XHJcbiAgICBjbGFzcyBBIHtcclxuICAgICAgQHR5cGVjaGVjayhbVC5OdW1iZXIoKSwgVC5OdW1iZXIoKV0sIFQuTnVtYmVyKCkpXHJcbiAgICAgIHN0YXRpYyBzdW0oYSwgYikge1xyXG4gICAgICAgIHJldHVybiBhICsgYjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2hvdWxkKCgpID0+IEEuc3VtKDEsIDIpKS5ub3QudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBBLnN1bSgnNDInLCAnNDInKSkudGhyb3coKTtcclxuICB9KTtcclxuICBpdCgnY2xhc3MgbWV0aG9kIHR5cGVjaGVjaycsICgpID0+IHtcclxuICAgIGNsYXNzIEEge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhLCBiKSB7XHJcbiAgICAgICAgdGhpcy5hID0gYTtcclxuICAgICAgICB0aGlzLmIgPSBiO1xyXG4gICAgICB9XHJcbiAgICAgIEB0eXBlY2hlY2soW10sIFQuTnVtYmVyKCkpXHJcbiAgICAgIHN1bSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hICsgdGhpcy4gYjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2hvdWxkKCgpID0+IG5ldyBBKDEsIDIpLnN1bSgpKS5ub3QudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBuZXcgQSgnNDInLCAnNDInKS5zdW0oKSkudGhyb3coKTtcclxuICB9KTtcclxuICBpdCgnY2xhc3Mgc3RhdGljIG1ldGhvZCB0YWtlcycsICgpID0+IHtcclxuICAgIGNsYXNzIEEge1xyXG4gICAgICBAdGFrZXMoVC5OdW1iZXIoKSwgVC5OdW1iZXIoKSlcclxuICAgICAgc3RhdGljIHN1bShhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIGEgKyBiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBzaG91bGQoKCkgPT4gQS5zdW0oMSwgMikpLm5vdC50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IEEuc3VtKCc0MicsICc0MicpKS50aHJvdygpO1xyXG4gIH0pO1xyXG4gIGl0KCdjbGFzcyBtZXRob2QgdGFrZXMnLCAoKSA9PiB7XHJcbiAgICBjbGFzcyBBIHtcclxuICAgICAgY29uc3RydWN0b3IoYSwgYikge1xyXG4gICAgICAgIHRoaXMuYSA9IGE7XHJcbiAgICAgICAgdGhpcy5iID0gYjtcclxuICAgICAgfVxyXG4gICAgICBAdGFrZXMoVC5OdW1iZXIoKSlcclxuICAgICAgc3VtKGMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hICsgdGhpcy5iICsgYztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2hvdWxkKCgpID0+IG5ldyBBKDEsIDIpLnN1bSgzKSkubm90LnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gbmV3IEEoJzQyJywgJzQyJykuc3VtKCc0MicpKS50aHJvdygpO1xyXG4gIH0pO1xyXG4gIGl0KCdjbGFzcyBzdGF0aWMgbWV0aG9kIHJldHVybnMnLCAoKSA9PiB7XHJcbiAgICBjbGFzcyBBIHtcclxuICAgICAgQHJldHVybnMoVC5OdW1iZXIoKSlcclxuICAgICAgc3RhdGljIHN1bShhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIGEgKyBiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBzaG91bGQoKCkgPT4gQS5zdW0oMSwgMikpLm5vdC50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IEEuc3VtKCc0MicsICc0MicpKS50aHJvdygpO1xyXG4gIH0pO1xyXG4gIGl0KCdjbGFzcyBtZXRob2QgcmV0dXJucycsICgpID0+IHtcclxuICAgIGNsYXNzIEEge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhLCBiKSB7XHJcbiAgICAgICAgdGhpcy5hID0gYTtcclxuICAgICAgICB0aGlzLmIgPSBiO1xyXG4gICAgICB9XHJcbiAgICAgIEByZXR1cm5zKFQuTnVtYmVyKCkpXHJcbiAgICAgIHN1bSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hICsgdGhpcy5iO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBzaG91bGQoKCkgPT4gbmV3IEEoMSwgMikuc3VtKCkpLm5vdC50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IG5ldyBBKCc0MicsICc0MicpLnN1bSgpKS50aHJvdygpO1xyXG4gIH0pO1xyXG4gIGl0KCdjbGFzcyBzdGF0aWMgbWV0aG9kIHRha2VzICYgcmV0dXJucycsICgpID0+IHtcclxuICAgIGNsYXNzIEEge1xyXG4gICAgICBAdGFrZXMoVC5OdW1iZXIoKSwgVC5hbnkoKSlcclxuICAgICAgQHJldHVybnMoVC5OdW1iZXIoKSlcclxuICAgICAgc3RhdGljIHN1bShhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIGEgKyBiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBzaG91bGQoKCkgPT4gQS5zdW0oMSwgMikpLm5vdC50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IEEuc3VtKDQyLCAnNDInKSkudGhyb3coKTtcclxuICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==