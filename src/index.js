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
function onChange() {
  // eslint-disable-next-line
  const object = {
    foo: false,
    a: {
      b: [
        {
          c: false,
        },
      ],
    },
  };
  // let proxy = new Proxy(object, handler);
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
function knownProp(arg) {
  const obj = arg;
  const handler = {
    get: (target, key) => {
      if (key in target) {
        return Reflect.get(target, key);
      }
      return new TypeError('Unknown property');
    },
    set: (target, key, value) => {
      // eslint-disable-next-line
      target[key] = value;
    },
  };
  // eslint-disable-next-line
  const proxy = new Proxy(obj, handler);
  return proxy;
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
    // eslint-disable-next-line
    get: (target, key) => {
      if (key < 0) {
        const test = Number(3 + Number(key));
        return Reflect.get(target, test);
      }
      return Reflect.get(target, key);
      // let x = Number(key);
    },
    set: (target, key, value) => {
      // eslint-disable-next-line
      target[key] = value;
    },
  };
  const proxy = new Proxy(arr, handler);
  return proxy;
}

/* Q5: Use ES6 Proxy to get a default property if a non-existing
  property is accessed.

  const myObj = setDefaultProperty({ foo: 'bar' }, 'default');
  myObj.foo // bar
  myObj.xyz // default
*/
function setDefaultProperty(obj, def) {
  const handler = {
    get: (target, key) => {
      if (key in target) {
        return Reflect.get(target, key);
      }
      return def;
    },
  };
  const proxy = new Proxy(obj, handler);
  return proxy;
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
