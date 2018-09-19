/**
 * Q1.
 * Creates a new list out of the two supplied by creating each possible pair
 * from the lists.
 *
 * xprod([1, 2], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
 * xprod([a, b], [c, d]) = [[a, c], [a, d], [b, c], [b, d]]
 */

function xprod(arr1, arr2) {
  let ret = [];
  arr1.forEach((elem) => {
    ret = ret.concat(arr2.map(elem2 => [elem, elem2]));
  });
  return ret;
}

/**
 * Q2.
 * Returns a new list without values in the first argument.
 *
 * without([1, 2], [1, 2, 1, 3, 4]); //=> [3, 4]
 */

function without() {

}

/**
 * Q3.
 * Returns a list of all the properties, including prototype properties, of the
 * supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 *      const F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      const f = new F();
 *      R.valuesIn(f); //=> ['X', 'Y']
 */

function valuesIn(obj) {
  const ret = [];

  // eslint-disable-next-line
  for (const key in obj) ret.push(obj[key]);
  return ret;
}

/**
 * Q4.
 * Returns a list of all the enumerable own properties of the supplied object.
 * Note that the order of the output array is not guaranteed across different
 * JS platforms.
 *
 *   values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
 */

function values() {

}

/**
 * Q5.
 * Returns a new copy of the array with the element at the provided index
 * replaced with the given value.
 *
 *      update(1, '_', ['a', 'b', 'c']);      //=> ['a', '_', 'c']
 *      update(-1, '_', ['a', 'b', 'c']);     //=> ['a', 'b', '_']
 *      update(-1, a, [b, c]) = [b, a]
 *      update(0, a, [b, c]) = [a, c]
 *      update(1, a, [b, c]) = [b, a]
 */

function update() {

}

module.exports = {
  update,
  values,
  valuesIn,
  without,
  xprod,
};
