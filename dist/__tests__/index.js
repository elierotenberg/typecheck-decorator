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
      return _2['default'].any(42);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].any(void 0);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].any(null);
    }).not['throw']();
    (0, _shouldAsFunction2['default'])(function () {
      return _2['default'].any({});
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
//# sourceMappingURL=data:application/json;base64,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QUFNLEVBQUUsQ0FBQztBQUNsRSx1Q0FBTzthQUFNLGNBQUUsU0FBUyxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUM7S0FBQSxDQUFDLENBQUMsR0FBRyxTQUFNLEVBQUUsQ0FBQztBQUN0RSx1Q0FBTzthQUFNLGNBQUUsU0FBUyxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDO0tBQUEsQ0FBQyxDQUFDLEdBQUcsU0FBTSxFQUFFLENBQUM7R0FDM0YsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLFVBQVUsRUFBRSxZQUFNO0FBQ25CLHVDQUFPO2FBQU0sY0FBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUM7S0FBQSxDQUFDLFNBQU0sRUFBRSxDQUFDO0FBQ25DLHVDQUFPO2FBQU0sY0FBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUM7S0FBQSxDQUFDLFNBQU0sRUFBRSxDQUFDO0FBQ25DLHVDQUFPO2FBQU0sY0FBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUM7S0FBQSxDQUFDLENBQUMsR0FBRyxTQUFNLEVBQUUsQ0FBQztBQUN6Qyx1Q0FBTzthQUFNLGNBQUUsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDO0tBQUEsQ0FBQyxDQUFDLEdBQUcsU0FBTSxFQUFFLENBQUM7R0FDM0MsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLFlBQVksRUFBRSxZQUFNO0FBQ3JCLHVDQUFPO2FBQU0sY0FBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7S0FBQSxDQUFDLENBQUMsR0FBRyxTQUFNLEVBQUUsQ0FBQztBQUN6Qyx1Q0FBTzthQUFNLGNBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO0tBQUEsQ0FBQyxTQUFNLEVBQUUsQ0FBQztBQUN2Qyx1Q0FBTzthQUFNLGNBQUUsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO0tBQUEsQ0FBQyxDQUFDLEdBQUcsU0FBTSxFQUFFLENBQUM7QUFDckQsdUNBQU87YUFBTSxjQUFFLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQUEsQ0FBQyxTQUFNLEVBQUUsQ0FBQztBQUNqRCx1Q0FBTzthQUFNLGNBQUUsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQUEsQ0FBQyxTQUFNLEVBQUUsQ0FBQztBQUNoRCx1Q0FBTzthQUFNLGNBQUUsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FBQSxDQUFDLENBQUMsR0FBRyxTQUFNLEVBQUUsQ0FBQztBQUNyRCx1Q0FBTzthQUFNLGNBQUUsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUM7S0FBQSxDQUFDLENBQUMsR0FBRyxTQUFNLEVBQUUsQ0FBQztBQUM1RCx1Q0FBTzthQUFNLGNBQUUsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUM7S0FBQSxDQUFDLFNBQU0sRUFBRSxDQUFDO0dBQ3pELENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBTTtBQUNyQix1Q0FBTzthQUFNLGNBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO0tBQUEsQ0FBQyxTQUFNLEVBQUUsQ0FBQztBQUNyQyx1Q0FBTzthQUFNLGNBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO0tBQUEsQ0FBQyxDQUFDLEdBQUcsU0FBTSxFQUFFLENBQUM7QUFDM0MsdUNBQU87YUFBTSxjQUFFLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQztLQUFBLENBQUMsU0FBTSxFQUFFLENBQUM7QUFDckQsdUNBQU87YUFBTSxjQUFFLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztLQUFBLENBQUMsQ0FBQyxHQUFHLFNBQU0sRUFBRSxDQUFDO0FBQzFELHVDQUFPO2FBQU0sY0FBRSxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7S0FBQSxDQUFDLFNBQU0sRUFBRSxDQUFDO0FBQzdELHVDQUFPO2FBQU0sY0FBRSxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FBQSxDQUFDLENBQUMsR0FBRyxTQUFNLEVBQUUsQ0FBQztHQUNqRSxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsV0FBVyxFQUFFLFlBQU07QUFDcEIsdUNBQU87YUFBTSxjQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztLQUFBLENBQUMsU0FBTSxFQUFFLENBQUM7QUFDcEMsdUNBQU87YUFBTSxjQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztLQUFBLENBQUMsQ0FBQyxHQUFHLFNBQU0sRUFBRSxDQUFDO0FBQ3hDLHVDQUFPO2FBQU0sY0FBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUM7S0FBQSxDQUFDLFNBQU0sRUFBRSxDQUFDO0FBQ3BDLHVDQUFPO2FBQU0sY0FBRSxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsY0FBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUFBLENBQUMsQ0FBQyxHQUFHLFNBQU0sRUFBRSxDQUFDO0FBQzlELHVDQUFPO2FBQU0sY0FBRSxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsY0FBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENB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QUMsRUFBRSxFQUFFLElBQUksQ0FBQztLQUFBLENBQUMsU0FBTSxFQUFFLENBQUM7R0FDdkMsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6Il9fdGVzdHNfXy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzaG91bGQgZnJvbSAnc2hvdWxkL2FzLWZ1bmN0aW9uJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcblByb21pc2UubG9uZ1N0YWNrVHJhY2VzKCk7XG5jb25zdCB7IGRlc2NyaWJlLCBpdCwgYmVmb3JlLCBhZnRlciB9ID0gZ2xvYmFsO1xuXG5pbXBvcnQgVCwgeyB0eXBlY2hlY2ssIHRha2VzLCByZXR1cm5zIH0gZnJvbSAnLi4vJztcblxuZGVzY3JpYmUoJ1QnLCAoKSA9PiB7XG4gIGl0KCdULmFueSgpJywgKCkgPT4ge1xuICAgIHNob3VsZCgoKSA9PiBULmFueSg0MikpLm5vdC50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULmFueSh2b2lkIDApKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5hbnkobnVsbCkpLm5vdC50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULmFueSh7fSkpLm5vdC50aHJvdygpO1xuICB9KTtcbiAgaXQoJ1QuaW5zdGFuY2VPZigpJywgKCkgPT4ge1xuICAgIGNsYXNzIEMxIHt9XG4gICAgY2xhc3MgQzIge31cbiAgICBjb25zdCBhID0gbmV3IEMxKCk7XG4gICAgY29uc3QgYiA9IG5ldyBDMigpO1xuICAgIHNob3VsZCgoKSA9PiBULmluc3RhbmNlT2YoQzEpKGEpKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5pbnN0YW5jZU9mKEMxKShiKSkudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5pbnN0YW5jZU9mKEMyKShhKSkudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5pbnN0YW5jZU9mKEMyKShiKSkubm90LnRocm93KCk7XG4gIH0pO1xuICBpdCgnVC5leGFjdGx5KCknLCAoKSA9PiB7XG4gICAgc2hvdWxkKCgpID0+IFQuZXhhY3RseSg0MikoNDIpKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5leGFjdGx5KDQyKSgxMzM3KSkudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5leGFjdGx5KHt9KSh7fSkpLnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuZXhhY3RseShKU09OLnN0cmluZ2lmeSh7fSkpKEpTT04uc3RyaW5naWZ5KHt9KSkpLm5vdC50aHJvdygpO1xuICB9KTtcbiAgaXQoJ1QuZGVlcEVxdWFsKCknLCAoKSA9PiB7XG4gICAgc2hvdWxkKCgpID0+IFQuZGVlcEVxdWFsKHsgZm9vOiAnYmFyJyB9KSh7IGZvbzogJ2JheicgfSkpLnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuZGVlcEVxdWFsKHsgZm9vOiAnYmFyJyB9KSh7IGZvbzogJ2JhcicgfSkpLm5vdC50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULmRlZXBFcXVhbCh7IGZvbzogeyBiYXI6ICdmaXp6JyB9IH0pKHsgZm9vOiB7IGJhcjogJ2ZpenonIH0gfSkpLm5vdC50aHJvdygpO1xuICB9KTtcbiAgaXQoJ1QuYm9vbCgpJywgKCkgPT4ge1xuICAgIHNob3VsZCgoKSA9PiBULmJvb2woKSg0MikpLnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuYm9vbCgpKHt9KSkudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5ib29sKCkodHJ1ZSkpLm5vdC50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULmJvb2woKShmYWxzZSkpLm5vdC50aHJvdygpO1xuICB9KTtcbiAgaXQoJ1QuTnVtYmVyKCknLCAoKSA9PiB7XG4gICAgc2hvdWxkKCgpID0+IFQuTnVtYmVyKCkoNDIpKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5OdW1iZXIoKSgnNDInKSkudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5OdW1iZXIoeyBhYm92ZTogMCB9KSg0MikpLm5vdC50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULk51bWJlcih7IGFib3ZlOiAwIH0pKC0xKSkudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5OdW1iZXIoeyBiZWxvdzogMCB9KSgwKSkudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5OdW1iZXIoeyBiZWxvdzogMCB9KSgtMSkpLm5vdC50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULk51bWJlcih7IHdpdGhpbjogWzAsIDFdIH0pKDAuNSkpLm5vdC50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULk51bWJlcih7IHdpdGhpbjogWzIsIDNdIH0pKDAuNSkpLnRocm93KCk7XG4gIH0pO1xuICBpdCgnVC5TdHJpbmcoKScsICgpID0+IHtcbiAgICBzaG91bGQoKCkgPT4gVC5TdHJpbmcoKSg0MikpLnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuU3RyaW5nKCkoJzQyJykpLm5vdC50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULlN0cmluZyh7IGxlbmd0aDogNCB9KSgnYWJjJykpLnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuU3RyaW5nKHsgbGVuZ3RoOiA0IH0pKCdhYmNkJykpLm5vdC50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULlN0cmluZyh7IG1hdGNoOiAvXlswLTldKiQvIH0pKCdhYmMnKSkudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5TdHJpbmcoeyBtYXRjaDogL15bMC05XSokLyB9KSgnNDInKSkubm90LnRocm93KCk7XG4gIH0pO1xuICBpdCgnVC5BcnJheSgpJywgKCkgPT4ge1xuICAgIHNob3VsZCgoKSA9PiBULkFycmF5KCkoNDIpKS50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULkFycmF5KCkoW10pKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5BcnJheSgpKHt9KSkudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5BcnJheSh7IHR5cGU6IFQuTnVtYmVyKCkgfSkoWzQyXSkpLm5vdC50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULkFycmF5KHsgdHlwZTogVC5OdW1iZXIoKSB9KShbNDIsICc0MiddKSkudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5BcnJheSh7IGxlbmd0aDogMCB9KShbXSkpLm5vdC50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULkFycmF5KHsgbGVuZ3RoOiAwIH0pKFs0Ml0pKS50aHJvdygpO1xuICB9KTtcbiAgaXQoJ1QuT2JqZWN0KCknLCAoKSA9PiB7XG4gICAgc2hvdWxkKCgpID0+IFQuT2JqZWN0KCkoe30pKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5PYmplY3QoKSg0MikpLnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuT2JqZWN0KHsgdHlwZTogVC5OdW1iZXIoKSB9KSh7IGE6IDQyIH0pKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5PYmplY3QoeyB0eXBlOiBULk51bWJlcigpIH0pKHsgYTogNDIsIGI6ICc0MicgfSkpLnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuT2JqZWN0KHsgbGVuZ3RoOiAwIH0pKHt9KSkubm90LnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuT2JqZWN0KHsgbGVuZ3RoOiA0MiB9KSh7fSkpLnRocm93KCk7XG4gIH0pO1xuICBpdCgnVC5Qcm9taXNlKCknLCAoKSA9PiB7XG4gICAgc2hvdWxkKCgpID0+IFQuUHJvbWlzZSgpKHt9KSkudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5Qcm9taXNlKCkoUHJvbWlzZS5yZXNvbHZlKCkpKS5ub3QudGhyb3coKTtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgVC5Qcm9taXNlKHsgdHlwZTogVC5OdW1iZXIoKSB9KShQcm9taXNlLnJlc29sdmUoNDIpKSxcbiAgICAgIFQuUHJvbWlzZSh7IHR5cGU6IFQubm90KFQuTnVtYmVyKCkpIH0pKFByb21pc2UucmVzb2x2ZSgnNDInKSksXG4gICAgXSk7XG4gIH0pO1xuICBpdCgnVC5lYWNoT2YoKScsICgpID0+IHtcbiAgICBjbGFzcyBBIHt9XG4gICAgY2xhc3MgQiBleHRlbmRzIEEge31cbiAgICBjbGFzcyBDIGV4dGVuZHMgQiB7fVxuICAgIHNob3VsZCgoKSA9PiBULmVhY2hPZihULk9iamVjdCgpLCBULkFycmF5KCkpKFtdKSkubm90LnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuZWFjaE9mKFQuT2JqZWN0KCksIFQuQXJyYXkoKSkoNDIpKS50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULmVhY2hPZihULmluc3RhbmNlT2YoQSksIFQuaW5zdGFuY2VPZihCKSwgVC5pbnN0YW5jZU9mKEMpKShuZXcgQygpKSkubm90LnRocm93KCk7XG4gIH0pO1xuICBpdCgnVC5vbmVPZigpJywgKCkgPT4ge1xuICAgIHNob3VsZCgoKSA9PiBULm9uZU9mKFQuTnVtYmVyKCksIFQuT2JqZWN0KCkpKDQyKSkubm90LnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQub25lT2YoVC5BcnJheSgpLCBULk9iamVjdCgpKSg0MikpLnRocm93KCk7XG4gIH0pO1xuICBpdCgnVC5ub3QoKScsICgpID0+IHtcbiAgICBzaG91bGQoKCkgPT4gVC5ub3QoVC5PYmplY3QoKSkoNDIpKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5ub3QoVC5PYmplY3QoKSkoe30pKS50aHJvdygpO1xuICB9KTtcbiAgaXQoJ1QubnVsbGFibGUoKScsICgpID0+IHtcbiAgICBzaG91bGQoKCkgPT4gVC5udWxsYWJsZShULk51bWJlcigpKShudWxsKSkubm90LnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQubnVsbGFibGUoVC5OdW1iZXIoKSkoNDIpKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5udWxsYWJsZShULk51bWJlcigpKSgnNDInKSkudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5udWxsYWJsZShULk51bWJlcigpKSh2b2lkIDApKS50aHJvdygpO1xuICB9KTtcbiAgaXQoJ1Qub3B0aW9uKCknLCAoKSA9PiB7XG4gICAgc2hvdWxkKCgpID0+IFQub3B0aW9uKFQuTnVtYmVyKCkpKHZvaWQgMCkpLm5vdC50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULm9wdGlvbihULk51bWJlcigpKSg0MikpLm5vdC50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULm9wdGlvbihULk51bWJlcigpKSgnNDInKSkudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5vcHRpb24oVC5OdW1iZXIoKSkobnVsbCkpLnRocm93KCk7XG4gIH0pO1xuICBpdCgnVC5zaGFwZSgpJywgKCkgPT4ge1xuICAgIHNob3VsZCgoKSA9PiBULnNoYXBlKHt9KSg0MikpLnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuc2hhcGUoeyBhOiBULk51bWJlcigpIH0pKHsgYTogNDIgfSkpLm5vdC50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULnNoYXBlKHsgYTogVC5OdW1iZXIoKSB9KSh7IGE6ICc0MicgfSkpLnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IFQuc2hhcGUoeyBmb286IFQuU3RyaW5nKCksIGZpeno6IFQuZXhhY3RseSgnYnV6eicpIH0pKHsgZm9vOiAnYmFyJywgZml6ejogJ2J1enonIH0pKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gVC5zaGFwZShbXSkoNDIpKS50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULnNoYXBlKFtULk51bWJlcigpXSkoWzQyXSkpLm5vdC50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBULnNoYXBlKFtULk51bWJlcigpXSkoWyc0MiddKSkudGhyb3coKTtcbiAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ3R5cGVjaGVjaycsICgpID0+IHtcbiAgY29uc3Qgc2hvdWxkVHlwZUNoZWNrID0gVC5zaG91bGRUeXBlQ2hlY2s7XG4gIGJlZm9yZSgoKSA9PiBULnNob3VsZFR5cGVDaGVjayA9IHRydWUpO1xuICBhZnRlcigoKSA9PiBULnNob3VsZFR5cGVDaGVjayA9IHNob3VsZFR5cGVDaGVjayk7XG4gIGl0KCdyZWd1bGFyIGZ1bmN0aW9uIHR5cGVjaGVjaycsICgpID0+IHtcbiAgICBjb25zdCBzdW0gPSB0eXBlY2hlY2soW1QuTnVtYmVyKCksIFQuTnVtYmVyKCldLCBULk51bWJlcigpLFxuICAgICAgKGEsIGIpID0+IGEgKyBiXG4gICAgKTtcbiAgICBzaG91bGQoKCkgPT4gc3VtKDEsIDIpKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gc3VtKCc0MicsICc0MicpKS50aHJvdygpO1xuICB9KTtcbiAgaXQoJ2NsYXNzIHN0YXRpYyBtZXRob2QgdHlwZWNoZWNrJywgKCkgPT4ge1xuICAgIGNsYXNzIEEge1xuICAgICAgQHR5cGVjaGVjayhbVC5OdW1iZXIoKSwgVC5OdW1iZXIoKV0sIFQuTnVtYmVyKCkpXG4gICAgICBzdGF0aWMgc3VtKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgKyBiO1xuICAgICAgfVxuICAgIH1cbiAgICBzaG91bGQoKCkgPT4gQS5zdW0oMSwgMikpLm5vdC50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBBLnN1bSgnNDInLCAnNDInKSkudGhyb3coKTtcbiAgfSk7XG4gIGl0KCdjbGFzcyBtZXRob2QgdHlwZWNoZWNrJywgKCkgPT4ge1xuICAgIGNsYXNzIEEge1xuICAgICAgY29uc3RydWN0b3IoYSwgYikge1xuICAgICAgICB0aGlzLmEgPSBhO1xuICAgICAgICB0aGlzLmIgPSBiO1xuICAgICAgfVxuICAgICAgQHR5cGVjaGVjayhbXSwgVC5OdW1iZXIoKSlcbiAgICAgIHN1bSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYSArIHRoaXMuIGI7XG4gICAgICB9XG4gICAgfVxuICAgIHNob3VsZCgoKSA9PiBuZXcgQSgxLCAyKS5zdW0oKSkubm90LnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IG5ldyBBKCc0MicsICc0MicpLnN1bSgpKS50aHJvdygpO1xuICB9KTtcbiAgaXQoJ2NsYXNzIHN0YXRpYyBtZXRob2QgdGFrZXMnLCAoKSA9PiB7XG4gICAgY2xhc3MgQSB7XG4gICAgICBAdGFrZXMoVC5OdW1iZXIoKSwgVC5OdW1iZXIoKSlcbiAgICAgIHN0YXRpYyBzdW0oYSwgYikge1xuICAgICAgICByZXR1cm4gYSArIGI7XG4gICAgICB9XG4gICAgfVxuICAgIHNob3VsZCgoKSA9PiBBLnN1bSgxLCAyKSkubm90LnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IEEuc3VtKCc0MicsICc0MicpKS50aHJvdygpO1xuICB9KTtcbiAgaXQoJ2NsYXNzIG1ldGhvZCB0YWtlcycsICgpID0+IHtcbiAgICBjbGFzcyBBIHtcbiAgICAgIGNvbnN0cnVjdG9yKGEsIGIpIHtcbiAgICAgICAgdGhpcy5hID0gYTtcbiAgICAgICAgdGhpcy5iID0gYjtcbiAgICAgIH1cbiAgICAgIEB0YWtlcyhULk51bWJlcigpKVxuICAgICAgc3VtKGMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYSArIHRoaXMuYiArIGM7XG4gICAgICB9XG4gICAgfVxuICAgIHNob3VsZCgoKSA9PiBuZXcgQSgxLCAyKS5zdW0oMykpLm5vdC50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBuZXcgQSgnNDInLCAnNDInKS5zdW0oJzQyJykpLnRocm93KCk7XG4gIH0pO1xuICBpdCgnY2xhc3Mgc3RhdGljIG1ldGhvZCByZXR1cm5zJywgKCkgPT4ge1xuICAgIGNsYXNzIEEge1xuICAgICAgQHJldHVybnMoVC5OdW1iZXIoKSlcbiAgICAgIHN0YXRpYyBzdW0oYSwgYikge1xuICAgICAgICByZXR1cm4gYSArIGI7XG4gICAgICB9XG4gICAgfVxuICAgIHNob3VsZCgoKSA9PiBBLnN1bSgxLCAyKSkubm90LnRocm93KCk7XG4gICAgc2hvdWxkKCgpID0+IEEuc3VtKCc0MicsICc0MicpKS50aHJvdygpO1xuICB9KTtcbiAgaXQoJ2NsYXNzIG1ldGhvZCByZXR1cm5zJywgKCkgPT4ge1xuICAgIGNsYXNzIEEge1xuICAgICAgY29uc3RydWN0b3IoYSwgYikge1xuICAgICAgICB0aGlzLmEgPSBhO1xuICAgICAgICB0aGlzLmIgPSBiO1xuICAgICAgfVxuICAgICAgQHJldHVybnMoVC5OdW1iZXIoKSlcbiAgICAgIHN1bSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYSArIHRoaXMuYjtcbiAgICAgIH1cbiAgICB9XG4gICAgc2hvdWxkKCgpID0+IG5ldyBBKDEsIDIpLnN1bSgpKS5ub3QudGhyb3coKTtcbiAgICBzaG91bGQoKCkgPT4gbmV3IEEoJzQyJywgJzQyJykuc3VtKCkpLnRocm93KCk7XG4gIH0pO1xuICBpdCgnY2xhc3Mgc3RhdGljIG1ldGhvZCB0YWtlcyAmIHJldHVybnMnLCAoKSA9PiB7XG4gICAgY2xhc3MgQSB7XG4gICAgICBAdGFrZXMoVC5OdW1iZXIoKSwgVC5hbnkoKSlcbiAgICAgIEByZXR1cm5zKFQuTnVtYmVyKCkpXG4gICAgICBzdGF0aWMgc3VtKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgKyBiO1xuICAgICAgfVxuICAgIH1cbiAgICBzaG91bGQoKCkgPT4gQS5zdW0oMSwgMikpLm5vdC50aHJvdygpO1xuICAgIHNob3VsZCgoKSA9PiBBLnN1bSg0MiwgJzQyJykpLnRocm93KCk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=