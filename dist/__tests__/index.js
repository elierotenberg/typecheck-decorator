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
//# sourceMappingURL=data:application/json;base64,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QUFPO2FBQU0sY0FBRSxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7S0FBQSxDQUFDLENBQUMsR0FBRyxTQUFNLEVBQUUsQ0FBQztBQUNyRCx1Q0FBTzthQUFNLGNBQUUsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FBQSxDQUFDLFNBQU0sRUFBRSxDQUFDO0FBQ2pELHVDQUFPO2FBQU0sY0FBRSxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FBQSxDQUFDLFNBQU0sRUFBRSxDQUFDO0FBQ2hELHVDQUFPO2FBQU0sY0FBRSxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUFBLENBQUMsQ0FBQyxHQUFHLFNBQU0sRUFBRSxDQUFDO0FBQ3JELHVDQUFPO2FBQU0sY0FBRSxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztLQUFBLENBQUMsQ0FBQyxHQUFHLFNBQU0sRUFBRSxDQUFDO0FBQzVELHVDQUFPO2FBQU0sY0FBRSxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztLQUFBLENBQUMsU0FBTSxFQUFFLENBQUM7R0FDekQsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLFlBQVksRUFBRSxZQUFNO0FBQ3JCLHVDQUFPO2FBQU0sY0FBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7S0FBQSxDQUFDLFNBQU0sRUFBRSxDQUFDO0FBQ3JDLHVDQUFPO2FBQU0sY0FBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7S0FBQSxDQUFDLENBQUMsR0FBRyxTQUFNLEVBQUUsQ0FBQztBQUMzQyx1Q0FBTzthQUFN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QU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDO0tBQUEsQ0FBQyxTQUFNLEVBQUUsQ0FBQztHQUN2QyxDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoiX190ZXN0c19fL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHNob3VsZCBmcm9tICdzaG91bGQvYXMtZnVuY3Rpb24nO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuUHJvbWlzZS5sb25nU3RhY2tUcmFjZXMoKTtcbmNvbnN0IHsgZGVzY3JpYmUsIGl0LCBiZWZvcmUsIGFmdGVyIH0gPSBnbG9iYWw7XG5cbmltcG9ydCBULCB7IHR5cGVjaGVjaywgdGFrZXMsIHJldHVybnMgfSBmcm9tICcuLi8nO1xuXG5kZXNjcmliZSgnVCcsICgpID0+IHtcbiAgaXQoJ1QuYW55KCknLCAoKSA9PiB7XG4gICAgc2hvdWxkKCgpID0+IFQuYW55KCkoNDIpKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5hbnkoKSh2b2lkIDApKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5hbnkoKShudWxsKSkubm90LnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuYW55KCkoe30pKS5ub3QudGhyb3coKTtcbiAgfSk7XG4gIGl0KCdULmluc3RhbmNlT2YoKScsICgpID0+IHtcbiAgICBjbGFzcyBDMSB7fVxuICAgIGNsYXNzIEMyIHt9XG4gICAgY29uc3QgYSA9IG5ldyBDMSgpO1xuICAgIGNvbnN0IGIgPSBuZXcgQzIoKTtcbiAgICBzaG91bGQoKCkgPT4gVC5pbnN0YW5jZU9mKEMxKShhKSkubm90LnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuaW5zdGFuY2VPZihDMSkoYikpLnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuaW5zdGFuY2VPZihDMikoYSkpLnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuaW5zdGFuY2VPZihDMikoYikpLm5vdC50aHJvdygpO1xuICB9KTtcbiAgaXQoJ1QuZXhhY3RseSgpJywgKCkgPT4ge1xuICAgIHNob3VsZCgoKSA9PiBULmV4YWN0bHkoNDIpKDQyKSkubm90LnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuZXhhY3RseSg0MikoMTMzNykpLnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuZXhhY3RseSh7fSkoe30pKS50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULmV4YWN0bHkoSlNPTi5zdHJpbmdpZnkoe30pKShKU09OLnN0cmluZ2lmeSh7fSkpKS5ub3QudGhyb3coKTtcbiAgfSk7XG4gIGl0KCdULmRlZXBFcXVhbCgpJywgKCkgPT4ge1xuICAgIHNob3VsZCgoKSA9PiBULmRlZXBFcXVhbCh7IGZvbzogJ2JhcicgfSkoeyBmb286ICdiYXonIH0pKS50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULmRlZXBFcXVhbCh7IGZvbzogJ2JhcicgfSkoeyBmb286ICdiYXInIH0pKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5kZWVwRXF1YWwoeyBmb286IHsgYmFyOiAnZml6eicgfSB9KSh7IGZvbzogeyBiYXI6ICdmaXp6JyB9IH0pKS5ub3QudGhyb3coKTtcbiAgfSk7XG4gIGl0KCdULmJvb2woKScsICgpID0+IHtcbiAgICBzaG91bGQoKCkgPT4gVC5ib29sKCkoNDIpKS50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULmJvb2woKSh7fSkpLnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuYm9vbCgpKHRydWUpKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5ib29sKCkoZmFsc2UpKS5ub3QudGhyb3coKTtcbiAgfSk7XG4gIGl0KCdULk51bWJlcigpJywgKCkgPT4ge1xuICAgIHNob3VsZCgoKSA9PiBULk51bWJlcigpKDQyKSkubm90LnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuTnVtYmVyKCkoJzQyJykpLnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuTnVtYmVyKHsgYWJvdmU6IDAgfSkoNDIpKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5OdW1iZXIoeyBhYm92ZTogMCB9KSgtMSkpLnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuTnVtYmVyKHsgYmVsb3c6IDAgfSkoMCkpLnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuTnVtYmVyKHsgYmVsb3c6IDAgfSkoLTEpKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5OdW1iZXIoeyB3aXRoaW46IFswLCAxXSB9KSgwLjUpKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5OdW1iZXIoeyB3aXRoaW46IFsyLCAzXSB9KSgwLjUpKS50aHJvdygpO1xuICB9KTtcbiAgaXQoJ1QuU3RyaW5nKCknLCAoKSA9PiB7XG4gICAgc2hvdWxkKCgpID0+IFQuU3RyaW5nKCkoNDIpKS50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULlN0cmluZygpKCc0MicpKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5TdHJpbmcoeyBsZW5ndGg6IDQgfSkoJ2FiYycpKS50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULlN0cmluZyh7IGxlbmd0aDogNCB9KSgnYWJjZCcpKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5TdHJpbmcoeyBtYXRjaDogL15bMC05XSokLyB9KSgnYWJjJykpLnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuU3RyaW5nKHsgbWF0Y2g6IC9eWzAtOV0qJC8gfSkoJzQyJykpLm5vdC50aHJvdygpO1xuICB9KTtcbiAgaXQoJ1QuQXJyYXkoKScsICgpID0+IHtcbiAgICBzaG91bGQoKCkgPT4gVC5BcnJheSgpKDQyKSkudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5BcnJheSgpKFtdKSkubm90LnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuQXJyYXkoKSh7fSkpLnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuQXJyYXkoeyB0eXBlOiBULk51bWJlcigpIH0pKFs0Ml0pKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5BcnJheSh7IHR5cGU6IFQuTnVtYmVyKCkgfSkoWzQyLCAnNDInXSkpLnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuQXJyYXkoeyBsZW5ndGg6IDAgfSkoW10pKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5BcnJheSh7IGxlbmd0aDogMCB9KShbNDJdKSkudGhyb3coKTtcbiAgfSk7XG4gIGl0KCdULk9iamVjdCgpJywgKCkgPT4ge1xuICAgIHNob3VsZCgoKSA9PiBULk9iamVjdCgpKHt9KSkubm90LnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuT2JqZWN0KCkoNDIpKS50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULk9iamVjdCh7IHR5cGU6IFQuTnVtYmVyKCkgfSkoeyBhOiA0MiB9KSkubm90LnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuT2JqZWN0KHsgdHlwZTogVC5OdW1iZXIoKSB9KSh7IGE6IDQyLCBiOiAnNDInIH0pKS50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULk9iamVjdCh7IGxlbmd0aDogMCB9KSh7fSkpLm5vdC50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULk9iamVjdCh7IGxlbmd0aDogNDIgfSkoe30pKS50aHJvdygpO1xuICB9KTtcbiAgaXQoJ1QuUHJvbWlzZSgpJywgKCkgPT4ge1xuICAgIHNob3VsZCgoKSA9PiBULlByb21pc2UoKSh7fSkpLnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuUHJvbWlzZSgpKFByb21pc2UucmVzb2x2ZSgpKSkubm90LnRocm93KCk7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgIFQuUHJvbWlzZSh7IHR5cGU6IFQuTnVtYmVyKCkgfSkoUHJvbWlzZS5yZXNvbHZlKDQyKSksXG4gICAgICBULlByb21pc2UoeyB0eXBlOiBULm5vdChULk51bWJlcigpKSB9KShQcm9taXNlLnJlc29sdmUoJzQyJykpLFxuICAgIF0pO1xuICB9KTtcbiAgaXQoJ1QuZWFjaE9mKCknLCAoKSA9PiB7XG4gICAgY2xhc3MgQSB7fVxuICAgIGNsYXNzIEIgZXh0ZW5kcyBBIHt9XG4gICAgY2xhc3MgQyBleHRlbmRzIEIge31cbiAgICBzaG91bGQoKCkgPT4gVC5lYWNoT2YoVC5PYmplY3QoKSwgVC5BcnJheSgpKShbXSkpLm5vdC50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULmVhY2hPZihULk9iamVjdCgpLCBULkFycmF5KCkpKDQyKSkudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5lYWNoT2YoVC5pbnN0YW5jZU9mKEEpLCBULmluc3RhbmNlT2YoQiksIFQuaW5zdGFuY2VPZihDKSkobmV3IEMoKSkpLm5vdC50aHJvdygpO1xuICB9KTtcbiAgaXQoJ1Qub25lT2YoKScsICgpID0+IHtcbiAgICBzaG91bGQoKCkgPT4gVC5vbmVPZihULk51bWJlcigpLCBULk9iamVjdCgpKSg0MikpLm5vdC50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULm9uZU9mKFQuQXJyYXkoKSwgVC5PYmplY3QoKSkoNDIpKS50aHJvdygpO1xuICB9KTtcbiAgaXQoJ1Qubm90KCknLCAoKSA9PiB7XG4gICAgc2hvdWxkKCgpID0+IFQubm90KFQuT2JqZWN0KCkpKDQyKSkubm90LnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQubm90KFQuT2JqZWN0KCkpKHt9KSkudGhyb3coKTtcbiAgfSk7XG4gIGl0KCdULm51bGxhYmxlKCknLCAoKSA9PiB7XG4gICAgc2hvdWxkKCgpID0+IFQubnVsbGFibGUoVC5OdW1iZXIoKSkobnVsbCkpLm5vdC50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULm51bGxhYmxlKFQuTnVtYmVyKCkpKDQyKSkubm90LnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQubnVsbGFibGUoVC5OdW1iZXIoKSkoJzQyJykpLnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQubnVsbGFibGUoVC5OdW1iZXIoKSkodm9pZCAwKSkudGhyb3coKTtcbiAgfSk7XG4gIGl0KCdULm9wdGlvbigpJywgKCkgPT4ge1xuICAgIHNob3VsZCgoKSA9PiBULm9wdGlvbihULk51bWJlcigpKSh2b2lkIDApKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5vcHRpb24oVC5OdW1iZXIoKSkoNDIpKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5vcHRpb24oVC5OdW1iZXIoKSkoJzQyJykpLnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQub3B0aW9uKFQuTnVtYmVyKCkpKG51bGwpKS50aHJvdygpO1xuICB9KTtcbiAgaXQoJ1Quc2hhcGUoKScsICgpID0+IHtcbiAgICBzaG91bGQoKCkgPT4gVC5zaGFwZSh7fSkoNDIpKS50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULnNoYXBlKHsgYTogVC5OdW1iZXIoKSB9KSh7IGE6IDQyIH0pKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5zaGFwZSh7IGE6IFQuTnVtYmVyKCkgfSkoeyBhOiAnNDInIH0pKS50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULnNoYXBlKHsgZm9vOiBULlN0cmluZygpLCBmaXp6OiBULmV4YWN0bHkoJ2J1enonKSB9KSh7IGZvbzogJ2JhcicsIGZpeno6ICdidXp6JyB9KSkubm90LnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuc2hhcGUoW10pKDQyKSkudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5zaGFwZShbVC5OdW1iZXIoKV0pKFs0Ml0pKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5zaGFwZShbVC5OdW1iZXIoKV0pKFsnNDInXSkpLnRocm93KCk7XG4gIH0pO1xufSk7XG5cbmRlc2NyaWJlKCd0eXBlY2hlY2snLCAoKSA9PiB7XG4gIGNvbnN0IHNob3VsZFR5cGVDaGVjayA9IFQuc2hvdWxkVHlwZUNoZWNrO1xuICBiZWZvcmUoKCkgPT4gVC5zaG91bGRUeXBlQ2hlY2sgPSB0cnVlKTtcbiAgYWZ0ZXIoKCkgPT4gVC5zaG91bGRUeXBlQ2hlY2sgPSBzaG91bGRUeXBlQ2hlY2spO1xuICBpdCgncmVndWxhciBmdW5jdGlvbiB0eXBlY2hlY2snLCAoKSA9PiB7XG4gICAgY29uc3Qgc3VtID0gdHlwZWNoZWNrKFtULk51bWJlcigpLCBULk51bWJlcigpXSwgVC5OdW1iZXIoKSxcbiAgICAgIChhLCBiKSA9PiBhICsgYlxuICAgICk7XG4gICAgc2hvdWxkKCgpID0+IHN1bSgxLCAyKSkubm90LnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IHN1bSgnNDInLCAnNDInKSkudGhyb3coKTtcbiAgfSk7XG4gIGl0KCdjbGFzcyBzdGF0aWMgbWV0aG9kIHR5cGVjaGVjaycsICgpID0+IHtcbiAgICBjbGFzcyBBIHtcbiAgICAgIEB0eXBlY2hlY2soW1QuTnVtYmVyKCksIFQuTnVtYmVyKCldLCBULk51bWJlcigpKVxuICAgICAgc3RhdGljIHN1bShhLCBiKSB7XG4gICAgICAgIHJldHVybiBhICsgYjtcbiAgICAgIH1cbiAgICB9XG4gICAgc2hvdWxkKCgpID0+IEEuc3VtKDEsIDIpKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gQS5zdW0oJzQyJywgJzQyJykpLnRocm93KCk7XG4gIH0pO1xuICBpdCgnY2xhc3MgbWV0aG9kIHR5cGVjaGVjaycsICgpID0+IHtcbiAgICBjbGFzcyBBIHtcbiAgICAgIGNvbnN0cnVjdG9yKGEsIGIpIHtcbiAgICAgICAgdGhpcy5hID0gYTtcbiAgICAgICAgdGhpcy5iID0gYjtcbiAgICAgIH1cbiAgICAgIEB0eXBlY2hlY2soW10sIFQuTnVtYmVyKCkpXG4gICAgICBzdW0oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmEgKyB0aGlzLiBiO1xuICAgICAgfVxuICAgIH1cbiAgICBzaG91bGQoKCkgPT4gbmV3IEEoMSwgMikuc3VtKCkpLm5vdC50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBuZXcgQSgnNDInLCAnNDInKS5zdW0oKSkudGhyb3coKTtcbiAgfSk7XG4gIGl0KCdjbGFzcyBzdGF0aWMgbWV0aG9kIHRha2VzJywgKCkgPT4ge1xuICAgIGNsYXNzIEEge1xuICAgICAgQHRha2VzKFQuTnVtYmVyKCksIFQuTnVtYmVyKCkpXG4gICAgICBzdGF0aWMgc3VtKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgKyBiO1xuICAgICAgfVxuICAgIH1cbiAgICBzaG91bGQoKCkgPT4gQS5zdW0oMSwgMikpLm5vdC50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBBLnN1bSgnNDInLCAnNDInKSkudGhyb3coKTtcbiAgfSk7XG4gIGl0KCdjbGFzcyBtZXRob2QgdGFrZXMnLCAoKSA9PiB7XG4gICAgY2xhc3MgQSB7XG4gICAgICBjb25zdHJ1Y3RvcihhLCBiKSB7XG4gICAgICAgIHRoaXMuYSA9IGE7XG4gICAgICAgIHRoaXMuYiA9IGI7XG4gICAgICB9XG4gICAgICBAdGFrZXMoVC5OdW1iZXIoKSlcbiAgICAgIHN1bShjKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmEgKyB0aGlzLmIgKyBjO1xuICAgICAgfVxuICAgIH1cbiAgICBzaG91bGQoKCkgPT4gbmV3IEEoMSwgMikuc3VtKDMpKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gbmV3IEEoJzQyJywgJzQyJykuc3VtKCc0MicpKS50aHJvdygpO1xuICB9KTtcbiAgaXQoJ2NsYXNzIHN0YXRpYyBtZXRob2QgcmV0dXJucycsICgpID0+IHtcbiAgICBjbGFzcyBBIHtcbiAgICAgIEByZXR1cm5zKFQuTnVtYmVyKCkpXG4gICAgICBzdGF0aWMgc3VtKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgKyBiO1xuICAgICAgfVxuICAgIH1cbiAgICBzaG91bGQoKCkgPT4gQS5zdW0oMSwgMikpLm5vdC50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBBLnN1bSgnNDInLCAnNDInKSkudGhyb3coKTtcbiAgfSk7XG4gIGl0KCdjbGFzcyBtZXRob2QgcmV0dXJucycsICgpID0+IHtcbiAgICBjbGFzcyBBIHtcbiAgICAgIGNvbnN0cnVjdG9yKGEsIGIpIHtcbiAgICAgICAgdGhpcy5hID0gYTtcbiAgICAgICAgdGhpcy5iID0gYjtcbiAgICAgIH1cbiAgICAgIEByZXR1cm5zKFQuTnVtYmVyKCkpXG4gICAgICBzdW0oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmEgKyB0aGlzLmI7XG4gICAgICB9XG4gICAgfVxuICAgIHNob3VsZCgoKSA9PiBuZXcgQSgxLCAyKS5zdW0oKSkubm90LnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IG5ldyBBKCc0MicsICc0MicpLnN1bSgpKS50aHJvdygpO1xuICB9KTtcbiAgaXQoJ2NsYXNzIHN0YXRpYyBtZXRob2QgdGFrZXMgJiByZXR1cm5zJywgKCkgPT4ge1xuICAgIGNsYXNzIEEge1xuICAgICAgQHRha2VzKFQuTnVtYmVyKCksIFQuYW55KCkpXG4gICAgICBAcmV0dXJucyhULk51bWJlcigpKVxuICAgICAgc3RhdGljIHN1bShhLCBiKSB7XG4gICAgICAgIHJldHVybiBhICsgYjtcbiAgICAgIH1cbiAgICB9XG4gICAgc2hvdWxkKCgpID0+IEEuc3VtKDEsIDIpKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gQS5zdW0oNDIsICc0MicpKS50aHJvdygpO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9