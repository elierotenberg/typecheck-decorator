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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9fdGVzdHNfXy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O2dDQUFtQixvQkFBb0I7Ozs7d0JBQ25CLFVBQVU7Ozs7Z0JBSUQsS0FBSzs7OztBQUhsQyxzQkFBUSxlQUFlLEVBQUUsQ0FBQztJQUNsQixRQUFRLEdBQXdCLE1BQU0sQ0FBdEMsUUFBUTtJQUFFLEVBQUUsR0FBb0IsTUFBTSxDQUE1QixFQUFFO0lBQUUsTUFBTSxHQUFZLE1BQU0sQ0FBeEIsTUFBTTtJQUFFLEtBQUssR0FBSyxNQUFNLENBQWhCLEtBQUs7O0FBSW5DLFFBQVEsQ0FBQyxHQUFHLEVBQUUsWUFBTTtBQUNsQixJQUFFLENBQUMsU0FBUyxFQUFFLFlBQU07QUFDbEIsdUNBQU87YUFBTSxjQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7S0FBQSxDQUFDLENBQUMsR0FBRyxTQUFNLEVBQUUsQ0FBQztBQUNwQyx1Q0FBTzthQUFNLGNBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQUEsQ0FBQyxDQUFDLEdBQUcsU0FBTSxFQUFFLENBQUM7QUFDeEMsdUNBQU87YUFBTSxjQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUM7S0FBQSxDQUFDLENBQUMsR0FBRyxTQUFNLEVBQUUsQ0FBQztBQUN0Qyx1Q0FBTzthQUFNLGNBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQztLQUFBLENBQUMsQ0FBQyxHQUFHLFNBQU0sRUFBRSxDQUFDO0dBQ3JDLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxZQUFNO1FBQ25CLEVBQUUsWUFBRixFQUFFOzRCQUFGLEVBQUU7OztRQUNGLEVBQUUsWUFBRixFQUFFOzRCQUFGLEVBQUU7OztBQUNSLFFBQU0sQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFLENBQUM7QUFDbkIsUUFBTSxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQztBQUNuQix1Q0FBTzthQUFNLGNBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUFBLENBQUMsQ0FBQyxHQUFHLFNBQU0sRUFBRSxDQUFDO0FBQzlDLHVDQUFPO2FBQU0sY0FBRSxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQUEsQ0FBQyxTQUFNLEVBQUUsQ0FBQztBQUMxQyx1Q0FBTzthQUFNLGNBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUFBLENBQUMsU0FBTSxFQUFFLENBQUM7QUFDMUMsdUNBQU87YUFBTSxjQUFFLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FBQSxDQUFDLENBQUMsR0FBRyxTQUFNLEVBQUUsQ0FBQztHQUMvQyxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsYUFBYSxFQUFFLFlBQU07QUFDdEIsdUNBQU87YUFBTSxjQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7S0FBQSxDQUFDLENBQUMsR0FBRyxTQUFNLEVBQUUsQ0FBQztBQUM1Qyx1Q0FBTzthQUFNLGNBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztLQUFBLENBQUMsU0FBTSxFQUFFLENBQUM7QUFDMUMsdUNBQU87YUFBTSxjQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7S0FBQSxDQUFDLFNBQU0sRUFBRSxDQUFDO0FBQ3hDLHVDQUFPO2FBQU0sY0FBRSxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7S0FBQSxDQUFDLENBQUMsR0FBRyxTQUFNLEVBQUUsQ0FBQztHQUM3RSxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsZUFBZSxFQUFFLFlBQU07QUFDeEIsdUNBQU87YUFBTSxjQUFFLFNBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDO0tBQUEsQ0FBQyxTQUFNLEVBQUUsQ0FBQztBQUNsRSx1Q0FBTzthQUFNLGNBQUUsU0FBUyxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUM7S0FBQSxDQUFDLENBQUMsR0FBRyxTQUFNLEVBQUUsQ0FBQztBQUN0RSx1Q0FBTzthQUFNLGNBQUUsU0FBUyxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDO0tBQUEsQ0FBQyxDQUFDLEdBQUcsU0FBTSxFQUFFLENBQUM7R0FDM0YsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLFVBQVUsRUFBRSxZQUFNO0FBQ25CLHVDQUFPO2FBQU0sY0FBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUM7S0FBQSxDQUFDLFNBQU0sRUFBRSxDQUFDO0FBQ25DLHVDQUFPO2FBQU0sY0FBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUM7S0FBQSxDQUFDLFNBQU0sRUFBRSxDQUFDO0FBQ25DLHVDQUFPO2FBQU0sY0FBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUM7S0FBQSxDQUFDLENBQUMsR0FBRyxTQUFNLEVBQUUsQ0FBQztBQUN6Qyx1Q0FBTzthQUFNLGNBQUUsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDO0tBQUEsQ0FBQyxDQUFDLEdBQUcsU0FBTSxFQUFFLENBQUM7R0FDM0MsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLFlBQVksRUFBRSxZQUFNO0FBQ3JCLHVDQUFPO2FBQU0sY0FBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7S0FBQSxDQUFDLENBQUMsR0FBRyxTQUFNLEVBQUUsQ0FBQztBQUN6Qyx1Q0FBTzthQUFNLGNBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO0tBQUEsQ0FBQyxTQUFNLEVBQUUsQ0FBQztBQUN2Qyx1Q0FBTzthQUFNLGNBQUUsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO0tBQUEsQ0FBQyxDQUFDLEdBQUcsU0FBTSxFQUFFLENBQUM7QUFDckQsdUNBQU87YUFBTSxjQUFFLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQUEsQ0FBQyxTQUFNLEVBQUUsQ0FBQztBQUNqRCx1Q0FBTzthQUFNLGNBQUUsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQUEsQ0FBQyxTQUFNLEVBQUUsQ0FBQztBQUNoRCx1Q0FBTzthQUFNLGNBQUUsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FBQSxDQUFDLENBQUMsR0FBRyxTQUFNLEVBQUUsQ0FBQztBQUNyRCx1Q0FBTzthQUFNLGNBQUUsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUM7S0FBQSxDQUFDLENBQUMsR0FBRyxTQUFNLEVBQUUsQ0FBQztBQUM1RCx1Q0FBTzthQUFNLGNBQUUsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUM7S0FBQSxDQUFDLFNBQU0sRUFBRSxDQUFDO0dBQ3pELENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBTTtBQUNyQix1Q0FBTzthQUFNLGNBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO0tBQUEsQ0FBQyxTQUFNLEVBQUUsQ0FBQztBQUNyQyx1Q0FBTzthQUFNLGNBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO0tBQUEsQ0FBQyxDQUFDLEdBQUcsU0FBTSxFQUFFLENBQUM7QUFDM0MsdUNBQU87YUFBTSxjQUFFLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQztLQUFBLENBQUMsU0FBTSxFQUFFLENBQUM7QUFDckQsdUNBQU87YUFBTSxjQUFFLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztLQUFBLENBQUMsQ0FBQyxHQUFHLFNBQU0sRUFBRSxDQUFDO0FBQzFELHVDQUFPO2FBQU0sY0FBRSxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7S0FBQSxDQUFDLFNBQU0sRUFBRSxDQUFDO0FBQzdELHVDQUFPO2FBQU0sY0FBRSxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FBQSxDQUFDLENBQUMsR0FBRyxTQUFNLEVBQUUsQ0FBQztHQUNqRSxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsV0FBVyxFQUFFLFlBQU07QUFDcEIsdUNBQU87YUFBTSxjQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztLQUFBLENBQUMsU0FBTSxFQUFFLENBQUM7QUFDcEMsdUNBQU87YUFBTSxjQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztLQUFBLENBQUMsQ0FBQyxHQUFHLFNBQU0sRUFBRSxDQUFDO0FBQ3hDLHVDQUFPO2FBQU0sY0FBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUM7S0FBQSxDQUFDLFNBQU0sRUFBRSxDQUFDO0FBQ3BDLHVDQUFPO2FBQU0sY0FBRSxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsY0FBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUFBLENBQUMsQ0FBQyxHQUFHLFNBQU0sRUFBRSxDQUFDO0FBQzlELHVDQUFPO2FBQU0sY0FBRSxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsY0FBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENB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Q3pDLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyx3QkFBd0IsRUFBRSxZQUFNO1FBQzNCLENBQUM7QUFDTSxlQURQLENBQUMsQ0FDTyxDQUFDLEVBQUUsQ0FBQyxFQUFFOzhCQURkLENBQUM7O0FBRUgsWUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDWCxZQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztPQUNaOzs0QkFKRyxDQUFDOztxQkFLSixpQkFBVSxFQUFFLEVBQUUsY0FBRSxNQUFNLEVBQUUsQ0FBQztlQUN2QixlQUFHO0FBQ0osaUJBQU8sSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUUsQ0FBQyxDQUFDO1NBQ3pCOzs7YUFSRyxDQUFDOzs7QUFVUCx1Q0FBTzthQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7S0FBQSxDQUFDLENBQUMsR0FBRyxTQUFNLEVBQUUsQ0FBQztBQUM1Qyx1Q0FBTzthQUFNLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUU7S0FBQSxDQUFDLFNBQU0sRUFBRSxDQUFDO0dBQy9DLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJfX3Rlc3RzX18vaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2hvdWxkIGZyb20gJ3Nob3VsZC9hcy1mdW5jdGlvbic7XHJcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcclxuUHJvbWlzZS5sb25nU3RhY2tUcmFjZXMoKTtcclxuY29uc3QgeyBkZXNjcmliZSwgaXQsIGJlZm9yZSwgYWZ0ZXIgfSA9IGdsb2JhbDtcclxuXHJcbmltcG9ydCBULCB7IHR5cGVjaGVjayB9IGZyb20gJy4uLyc7XHJcblxyXG5kZXNjcmliZSgnVCcsICgpID0+IHtcclxuICBpdCgnVC5hbnkoKScsICgpID0+IHtcclxuICAgIHNob3VsZCgoKSA9PiBULmFueSg0MikpLm5vdC50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuYW55KHZvaWQgMCkpLm5vdC50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuYW55KG51bGwpKS5ub3QudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULmFueSh7fSkpLm5vdC50aHJvdygpO1xyXG4gIH0pO1xyXG4gIGl0KCdULmluc3RhbmNlT2YoKScsICgpID0+IHtcclxuICAgIGNsYXNzIEMxIHt9XHJcbiAgICBjbGFzcyBDMiB7fVxyXG4gICAgY29uc3QgYSA9IG5ldyBDMSgpO1xyXG4gICAgY29uc3QgYiA9IG5ldyBDMigpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuaW5zdGFuY2VPZihDMSkoYSkpLm5vdC50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuaW5zdGFuY2VPZihDMSkoYikpLnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5pbnN0YW5jZU9mKEMyKShhKSkudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULmluc3RhbmNlT2YoQzIpKGIpKS5ub3QudGhyb3coKTtcclxuICB9KTtcclxuICBpdCgnVC5leGFjdGx5KCknLCAoKSA9PiB7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5leGFjdGx5KDQyKSg0MikpLm5vdC50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuZXhhY3RseSg0MikoMTMzNykpLnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5leGFjdGx5KHt9KSh7fSkpLnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5leGFjdGx5KEpTT04uc3RyaW5naWZ5KHt9KSkoSlNPTi5zdHJpbmdpZnkoe30pKSkubm90LnRocm93KCk7XHJcbiAgfSk7XHJcbiAgaXQoJ1QuZGVlcEVxdWFsKCknLCAoKSA9PiB7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5kZWVwRXF1YWwoeyBmb286ICdiYXInIH0pKHsgZm9vOiAnYmF6JyB9KSkudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULmRlZXBFcXVhbCh7IGZvbzogJ2JhcicgfSkoeyBmb286ICdiYXInIH0pKS5ub3QudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULmRlZXBFcXVhbCh7IGZvbzogeyBiYXI6ICdmaXp6JyB9IH0pKHsgZm9vOiB7IGJhcjogJ2ZpenonIH0gfSkpLm5vdC50aHJvdygpO1xyXG4gIH0pO1xyXG4gIGl0KCdULmJvb2woKScsICgpID0+IHtcclxuICAgIHNob3VsZCgoKSA9PiBULmJvb2woKSg0MikpLnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5ib29sKCkoe30pKS50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuYm9vbCgpKHRydWUpKS5ub3QudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULmJvb2woKShmYWxzZSkpLm5vdC50aHJvdygpO1xyXG4gIH0pO1xyXG4gIGl0KCdULk51bWJlcigpJywgKCkgPT4ge1xyXG4gICAgc2hvdWxkKCgpID0+IFQuTnVtYmVyKCkoNDIpKS5ub3QudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULk51bWJlcigpKCc0MicpKS50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuTnVtYmVyKHsgYWJvdmU6IDAgfSkoNDIpKS5ub3QudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULk51bWJlcih7IGFib3ZlOiAwIH0pKC0xKSkudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULk51bWJlcih7IGJlbG93OiAwIH0pKDApKS50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuTnVtYmVyKHsgYmVsb3c6IDAgfSkoLTEpKS5ub3QudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULk51bWJlcih7IHdpdGhpbjogWzAsIDFdIH0pKDAuNSkpLm5vdC50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuTnVtYmVyKHsgd2l0aGluOiBbMiwgM10gfSkoMC41KSkudGhyb3coKTtcclxuICB9KTtcclxuICBpdCgnVC5TdHJpbmcoKScsICgpID0+IHtcclxuICAgIHNob3VsZCgoKSA9PiBULlN0cmluZygpKDQyKSkudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULlN0cmluZygpKCc0MicpKS5ub3QudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULlN0cmluZyh7IGxlbmd0aDogNCB9KSgnYWJjJykpLnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5TdHJpbmcoeyBsZW5ndGg6IDQgfSkoJ2FiY2QnKSkubm90LnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5TdHJpbmcoeyBtYXRjaDogL15bMC05XSokLyB9KSgnYWJjJykpLnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5TdHJpbmcoeyBtYXRjaDogL15bMC05XSokLyB9KSgnNDInKSkubm90LnRocm93KCk7XHJcbiAgfSk7XHJcbiAgaXQoJ1QuQXJyYXkoKScsICgpID0+IHtcclxuICAgIHNob3VsZCgoKSA9PiBULkFycmF5KCkoNDIpKS50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuQXJyYXkoKShbXSkpLm5vdC50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuQXJyYXkoKSh7fSkpLnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5BcnJheSh7IHR5cGU6IFQuTnVtYmVyKCkgfSkoWzQyXSkpLm5vdC50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuQXJyYXkoeyB0eXBlOiBULk51bWJlcigpIH0pKFs0MiwgJzQyJ10pKS50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuQXJyYXkoeyBsZW5ndGg6IDAgfSkoW10pKS5ub3QudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULkFycmF5KHsgbGVuZ3RoOiAwIH0pKFs0Ml0pKS50aHJvdygpO1xyXG4gIH0pO1xyXG4gIGl0KCdULk9iamVjdCgpJywgKCkgPT4ge1xyXG4gICAgc2hvdWxkKCgpID0+IFQuT2JqZWN0KCkoe30pKS5ub3QudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULk9iamVjdCgpKDQyKSkudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULk9iamVjdCh7IHR5cGU6IFQuTnVtYmVyKCkgfSkoeyBhOiA0MiB9KSkubm90LnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5PYmplY3QoeyB0eXBlOiBULk51bWJlcigpIH0pKHsgYTogNDIsIGI6ICc0MicgfSkpLnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5PYmplY3QoeyBsZW5ndGg6IDAgfSkoe30pKS5ub3QudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULk9iamVjdCh7IGxlbmd0aDogNDIgfSkoe30pKS50aHJvdygpO1xyXG4gIH0pO1xyXG4gIGl0KCdULlByb21pc2UoKScsICgpID0+IHtcclxuICAgIHNob3VsZCgoKSA9PiBULlByb21pc2UoKSh7fSkpLnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5Qcm9taXNlKCkoUHJvbWlzZS5yZXNvbHZlKCkpKS5ub3QudGhyb3coKTtcclxuICAgIHJldHVybiBQcm9taXNlLmFsbChbXHJcbiAgICAgIFQuUHJvbWlzZSh7IHR5cGU6IFQuTnVtYmVyKCkgfSkoUHJvbWlzZS5yZXNvbHZlKDQyKSksXHJcbiAgICAgIFQuUHJvbWlzZSh7IHR5cGU6IFQubm90KFQuTnVtYmVyKCkpIH0pKFByb21pc2UucmVzb2x2ZSgnNDInKSksXHJcbiAgICBdKTtcclxuICB9KTtcclxuICBpdCgnVC5lYWNoT2YoKScsICgpID0+IHtcclxuICAgIGNsYXNzIEEge31cclxuICAgIGNsYXNzIEIgZXh0ZW5kcyBBIHt9XHJcbiAgICBjbGFzcyBDIGV4dGVuZHMgQiB7fVxyXG4gICAgc2hvdWxkKCgpID0+IFQuZWFjaE9mKFQuT2JqZWN0KCksIFQuQXJyYXkoKSkoW10pKS5ub3QudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULmVhY2hPZihULk9iamVjdCgpLCBULkFycmF5KCkpKDQyKSkudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULmVhY2hPZihULmluc3RhbmNlT2YoQSksIFQuaW5zdGFuY2VPZihCKSwgVC5pbnN0YW5jZU9mKEMpKShuZXcgQygpKSkubm90LnRocm93KCk7XHJcbiAgfSk7XHJcbiAgaXQoJ1Qub25lT2YoKScsICgpID0+IHtcclxuICAgIHNob3VsZCgoKSA9PiBULm9uZU9mKFQuTnVtYmVyKCksIFQuT2JqZWN0KCkpKDQyKSkubm90LnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5vbmVPZihULkFycmF5KCksIFQuT2JqZWN0KCkpKDQyKSkudGhyb3coKTtcclxuICB9KTtcclxuICBpdCgnVC5ub3QoKScsICgpID0+IHtcclxuICAgIHNob3VsZCgoKSA9PiBULm5vdChULk9iamVjdCgpKSg0MikpLm5vdC50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQubm90KFQuT2JqZWN0KCkpKHt9KSkudGhyb3coKTtcclxuICB9KTtcclxuICBpdCgnVC5zaGFwZSgpJywgKCkgPT4ge1xyXG4gICAgc2hvdWxkKCgpID0+IFQuc2hhcGUoe30pKDQyKSkudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULnNoYXBlKHsgYTogVC5OdW1iZXIoKSB9KSh7IGE6IDQyIH0pKS5ub3QudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULnNoYXBlKHsgYTogVC5OdW1iZXIoKSB9KSh7IGE6ICc0MicgfSkpLnRocm93KCk7XHJcbiAgICBzaG91bGQoKCkgPT4gVC5zaGFwZSh7IGZvbzogVC5TdHJpbmcoKSwgZml6ejogVC5leGFjdGx5KCdidXp6JykgfSkoeyBmb286ICdiYXInLCBmaXp6OiAnYnV6eicgfSkpLm5vdC50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuc2hhcGUoW10pKDQyKSkudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBULnNoYXBlKFtULk51bWJlcigpXSkoWzQyXSkpLm5vdC50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IFQuc2hhcGUoW1QuTnVtYmVyKCldKShbJzQyJ10pKS50aHJvdygpO1xyXG4gIH0pO1xyXG59KTtcclxuXHJcbmRlc2NyaWJlKCd0eXBlY2hlY2snLCAoKSA9PiB7XHJcbiAgY29uc3Qgc2hvdWxkVHlwZUNoZWNrID0gVC5zaG91bGRUeXBlQ2hlY2s7XHJcbiAgYmVmb3JlKCgpID0+IFQuc2hvdWxkVHlwZUNoZWNrID0gdHJ1ZSk7XHJcbiAgYWZ0ZXIoKCkgPT4gVC5zaG91bGRUeXBlQ2hlY2sgPSBzaG91bGRUeXBlQ2hlY2spO1xyXG4gIGl0KCdyZWd1bGFyIGZ1bmN0aW9uIHR5cGVjaGVjaycsICgpID0+IHtcclxuICAgIGNvbnN0IHN1bSA9IHR5cGVjaGVjayhbVC5OdW1iZXIoKSwgVC5OdW1iZXIoKV0sIFQuTnVtYmVyKCksXHJcbiAgICAgIChhLCBiKSA9PiBhICsgYlxyXG4gICAgKTtcclxuICAgIHNob3VsZCgoKSA9PiBzdW0oMSwgMikpLm5vdC50aHJvdygpO1xyXG4gICAgc2hvdWxkKCgpID0+IHN1bSgnNDInLCAnNDInKSkudGhyb3coKTtcclxuICB9KTtcclxuICBpdCgnY2xhc3Mgc3RhdGljIG1ldGhvZCB0eXBlY2hlY2snLCAoKSA9PiB7XHJcbiAgICBjbGFzcyBBIHtcclxuICAgICAgQHR5cGVjaGVjayhbVC5OdW1iZXIoKSwgVC5OdW1iZXIoKV0sIFQuTnVtYmVyKCkpXHJcbiAgICAgIHN0YXRpYyBzdW0oYSwgYikge1xyXG4gICAgICAgIHJldHVybiBhICsgYjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2hvdWxkKCgpID0+IEEuc3VtKDEsIDIpKS5ub3QudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBBLnN1bSgnNDInLCAnNDInKSkudGhyb3coKTtcclxuICB9KTtcclxuICBpdCgnY2xhc3MgbWV0aG9kIHR5cGVjaGVjaycsICgpID0+IHtcclxuICAgIGNsYXNzIEEge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhLCBiKSB7XHJcbiAgICAgICAgdGhpcy5hID0gYTtcclxuICAgICAgICB0aGlzLmIgPSBiO1xyXG4gICAgICB9XHJcbiAgICAgIEB0eXBlY2hlY2soW10sIFQuTnVtYmVyKCkpXHJcbiAgICAgIHN1bSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hICsgdGhpcy4gYjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2hvdWxkKCgpID0+IG5ldyBBKDEsIDIpLnN1bSgpKS5ub3QudGhyb3coKTtcclxuICAgIHNob3VsZCgoKSA9PiBuZXcgQSgnNDInLCAnNDInKS5zdW0oKSkudGhyb3coKTtcclxuICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==