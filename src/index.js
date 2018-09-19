/* Q1: Use ES6 Proxy to implement the following function
  const object = {
    foo: false,
    a: {
      b: [
        {
          c: false
        }
      ]
    }
  };

  let i = 0;
  const watchedObject = onChange(object, () => {
    console.log('Object changed:', ++i);
  });

  watchedObject.foo = true;
  //=> 'Object changed: 1'

  watchedObject.a.b[0].c = true;
  //=> 'Object changed: 2'
*/
function onChange(target, handler) {
  const proxies = new WeakSet();

  const proxyHandler = {
    set(obj, prop, value) {
      handler();
      return Reflect.set(obj, prop, value);
    },

    get(object, key) {
      const value = Reflect.get(object, key);

      if (typeof value === 'object' && !proxies.has(value)) {
        const proxyObj = new Proxy(value, proxyHandler);
        proxies.add(proxyObj);
        return proxyObj;
      }

      return Reflect.get(object, key);
    },

    defineProperty() {
      handler();
      return true;
    },

    deleteProperty() {
      handler();
      return true;
    },
  };

  return new Proxy(target, proxyHandler);
}

/* Q2: Use ES6 Proxy to implement the following function
  Call a method on an iterable to call it on all items of the iterable

  const x = {
    i: 0,
    increment(value) {
      this.i += value;
      return this.i;
    }
  };

  const array = [x, x, x, x];
  const proxyArray = proxyIterable(array);

  Array.isArray(proxyArray);
  //=> true

  proxyArray.increment(2);
  //=> [2, 4, 6, 8];

  x.i;
  //=> 8
*/
const proxyIterable = () => {};

/* Q3: Use ES6 Proxy to implement the following function (*)
  const obj = {foo: true};

  console.log(obj.bar);
  //=> undefined

  const obj2 = knownProp(obj);

  // Throws a TypeError when you try to access an unknown property
  console.log(obj2.bar);
  //=> [TypeError] Unknown property: bar
*/
function knownProp(obj) {
  const handler = {
    get(object, prop) {
      if (Reflect.has(object, prop)) {
        return Reflect.get(object, prop);
      }
      throw new TypeError('Unknown property');
    },
  };

  return new Proxy(obj, handler);
}

/* Q4: Use ES6 Proxy to support negative index in array (*)

  const unicorn = negativeIndex(['pony', 'cake', 'rainbow']);

  console.log(unicorn[-1]);
  //=> 'rainbow' (gets the 1st element from last)
*/
function negativeIndex(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('Only arrays are supported');
  }

  const handler = {
    set(object, prop, value) {
      let index = prop;
      if (typeof prop === 'symbol') {
        index = prop.valueOf();
      } else {
        index = Number(prop);
      }

      if (index < 0) {
        return Reflect.set(object, object.length + index, value);
      }
      return Reflect.set(object, prop, value);
    },

    get(object, prop) {
      let index = prop;
      if (typeof prop === 'symbol') {
        index = prop.valueOf();
      } else {
        index = Number(prop);
      }

      if (index < 0) {
        return Reflect.get(object, object.length + index);
      }
      return Reflect.get(object, prop);
    },
  };

  return new Proxy(arr, handler);
}

/* Q5: Use ES6 Proxy to get a default property if a non-existing
  property is accessed.

  const myObj = setDefaultProperty({ foo: 'bar' }, 'default');
  myObj.foo // bar
  myObj.xyz // default
*/
function setDefaultProperty(obj, defaultValue) {
  const handler = {
    get(object, prop) {
      if (Reflect.has(object, prop)) {
        return Reflect.get(object, prop);
      }
      return defaultValue;
    },
  };

  return new Proxy(obj, handler);
}

/* Q6: Use ES6 Proxy to hide private properties of an object.
  See test cases for further info.
  Hint: use
    get,
    set,
    has,
    ownKeys,
    getOwnPropertyDescriptor
    traps in handler
*/
function privateProps() {}

module.exports = {
  onChange,
  proxyIterable,
  knownProp,
  negativeIndex,
  setDefaultProperty,
  privateProps,
};
