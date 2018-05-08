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
function onChange() {}

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
function knownProp() {}

/* Q4: Use ES6 Proxy to support negative index in array (*)

  const unicorn = negativeIndex(['pony', 'cake', 'rainbow']);

  console.log(unicorn[-1]);
  //=> 'rainbow' (gets the 1st element from last)
*/
function negativeIndex() {}

/* Q5: Use ES6 Proxy to get a default property if a non-existing
  property is accessed.

  const myObj = setDefaultProperty({ foo: 'bar' }, 'default');
  myObj.foo // bar
  myObj.xyz // default
*/
function setDefaultProperty() {}

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
