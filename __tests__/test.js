const {
  onChange,
  proxyIterable,
  knownProp,
  negativeIndex,
  setDefaultProperty,
  privateProps,
} = require('../src');

/* eslint-disable arrow-body-style */
describe('onChange', () => {
  test('main', () => {
    const fixture = {
      foo: false,
      bar: {
        a: {
          b: 0,
          c: [1, 2],
        },
      },
    };

    let callCount = 0;

    const object = onChange(fixture, () => {
      callCount += 1;
    });

    object.foo = true;
    expect(callCount).toBe(1);

    Object.defineProperty(object, 'newProp', {
      value: '🦄',
    });

    expect(callCount).toBe(2);

    Object.assign(object, {
      foo: false,
    });
    expect(callCount).toBe(3);

    delete object.foo;
    expect(callCount).toBe(4);

    object.bar.a.b = 1;
    expect(object.bar.a.b).toBe(1);
    expect(callCount).toBe(5);

    object.bar.a.c[2] = 5;
    expect(object.bar.a.c[2]).toBe(5);
    expect(callCount).toBe(6);
  });

  test('works with an array too', () => {
    const fixture = [1, 2, {
      a: false,
    }];

    let callCount = 0;

    const array = onChange(fixture, () => {
      callCount += 1;
    });

    array[0] = 'a';
    expect(array).toEqual(['a', 2, {
      a: false,
    }]);
    expect(callCount).toBe(1);

    array[2].a = true;
    expect(callCount).toBe(2);

    array.sort();
    expect(callCount).toBe(6);

    array.pop();
    expect(callCount).toBe(8);
  });
});

describe('proxyIterable', () => {
  test('main', () => {
    let i = 0;

    const createFixture = () => {
      return {
        increment(value) {
          i += value;
          return i;
        },
      };
    };

    const array = [
      createFixture(),
      createFixture(),
      createFixture(),
      createFixture(),
    ];

    const proxyArray = proxyIterable(array);

    expect(Array.isArray(proxyArray)).toBe(true);
    expect(proxyArray.increment(2)).toEqual([2, 4, 6, 8]);
    expect(i).toBe(8);
  });

  test('`this` works correctly', () => {
    const fixture = {
      i: 0,
      increment(value) {
        this.i += value;
        return this.i;
      },
    };

    const array = [fixture, fixture, fixture, fixture];

    expect(proxyIterable(array).increment(2)).toEqual([2, 4, 6, 8]);
    expect(fixture.i).toBe(8);
  });

  test('does not work on heterogeneous iterable', () => {
    const createFixture = () => {
      return {
        foo() {},
      };
    };

    const array = [
      createFixture(),
      createFixture(),
      {},
      createFixture(),
    ];

    const proxyArray = proxyIterable(array);

    expect(() => {
      proxyArray.foo();
    })
      .toThrowError(/Item 3 of the iterable is missing the foo\(\) method/);
  });

  test('should work on array of non-objects', () => {
    expect(proxyIterable(['a', 'b']).includes('b')).toEqual([false, true]);
  });

  test('should only apply to the items of the iterable', () => {
    const fixture = {
      foo() {
        return '🦄';
      },
    };

    const array = [fixture, fixture];
    array.foo = () => '🤡';

    expect(proxyIterable(array).foo()).toEqual(['🦄', '🦄']);
  });
});

describe('knownProp', () => {
  test('returns the value if known property is accessed', () => {
    const object1 = knownProp({ foo: true });
    expect(object1.foo).toBe(true);
    const object2 = knownProp({ foo: undefined });
    expect(object2.foo).toBe(undefined);
  });

  test('throws error if unknown property is accessed', () => {
    const result = knownProp({ foo: true });
    expect(() => {
      console.log(result.bar);
    }).toThrowError(TypeError, /Unknown property/);
  });
});

describe('negativeIndex', () => {
  test('behaves like an array', () => {
    const fixture = negativeIndex(['foo', 'bar', 'baz']);
    expect(fixture.length).toBe(3);
    expect(fixture.toString()).toBe('foo,bar,baz');
  });

  test('get values', () => {
    const fixture = negativeIndex(['foo', 'bar', 'baz']);
    expect(fixture[0]).toBe('foo');
    expect(fixture[1]).toBe('bar');
    expect(fixture[-1]).toBe('baz');
    expect(fixture[-2]).toBe('bar');
  });

  test('set values', () => {
    const fixture = negativeIndex(['foo', 'bar', 'baz']);
    fixture[0] = 0;
    expect(fixture).toEqual([0, 'bar', 'baz']);
    fixture[1] = 1;
    expect(fixture).toEqual([0, 1, 'baz']);
    fixture[-1] = -1;
    expect(fixture).toEqual([0, 1, -1]);
    fixture[-2] = -2;
    expect(fixture).toEqual([0, -2, -1]);
  });

  test('only accepts arrays', () => {
    expect(() => {
      negativeIndex({});
    }).toThrowError(TypeError, /Only arrays are supported/);
  });
});

describe.only('setDefaultProperty', () => {
  test('returns the value if known property is accessed', () => {
    const object1 = setDefaultProperty({ foo: 'bar' }, 'defaultValue');
    expect(object1.foo).toBe('bar');
    const object2 = setDefaultProperty({ foo: undefined }, 'defaultValue');
    expect(object2.foo).toBe(undefined);
  });

  test('returns the default value if known property is accessed', () => {
    const result = setDefaultProperty({ foo: 'bar' }, 'defaultValue');
    expect(result.bazzz).toBe('defaultValue');
  });
});

describe('privateProps', () => {
  let myProxy;
  beforeAll(() => {
    const privacyFilter = (prop) => {
      return prop.indexOf('_') === 0;
    };
    const myObj = {
      _private: 'secret',
      public: 'hello',
      getPrivate: function getPrivate() {
        return this._private; // eslint-disable-line no-underscore-dangle
      },
    };
    myProxy = privateProps(myObj, privacyFilter);
  });

  test('accessible from methods', () => {
    expect(myProxy.getPrivate()).toBe('secret');
  });

  test('not accessible from outside', () => {
    expect('_private' in myProxy).toBe(false);
    expect(Object.keys(myProxy)).toEqual(['public', 'getPrivate']);
  });

  test('throws TypeError when new value is set on private property', () => {
    expect(() => {
      myProxy._private = 'another value'; // eslint-disable-line no-underscore-dangle
    }).toThrowError(TypeError, /Can't set property "_private"/);
  });
});
