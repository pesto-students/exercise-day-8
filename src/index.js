/** Q1.
 * Removes one level of nesting from
 * any chain.
 *
 *
 *   unnest([1, [2], [[3]]]); //=> [1, 2, [3]]
 *   unnest([[1, 2], [3, 4], [5, 6]]); //=> [1, 2, 3, 4, 5, 6]
 */

function unnest() {

}


/** Q2. (*)
 * Returns a new list containing only one copy of each element in the original
 * list. [`R.equals`](#equals) is used to determine equality.
 *
 *   uniq([1, 1, 2, 1]); //=> [1, 2]
 *   uniq([1, '1']);     //=> [1, '1']
 *   uniq([[42], [42]]); //=> [[42]]
 */

function uniq(list) {
  return [...(new Set(list))];
}

/** Q3. (*)
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list.

 *      R.union([1, 2, 3], [2, 3, 4]); //=> [1, 2, 3, 4]
 */

function union(list1, list2) {
  return uniq([...list1, ...list2]);
}

/** Q4.
 * Returns a function of arity `n` from a (manually) curried function.

 *      const addFour = a => b => c => d => a + b + c + d;
 *
 *      const uncurriedAddFour = uncurryN(4, addFour);
 *      uncurriedAddFour(1, 2, 3, 4); //=> 10
 */

function uncurryN() {

}

/** Q5. (*)
 * Gives a single-word string description of the (native) type of a value,
 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
 * attempt to distinguish user Object types any further, reporting them all as
 * 'Object'.
 *
 *      R.type({}); //=> "Object"
 *      R.type(1); //=> "Number"
 *      R.type(false); //=> "Boolean"
 *      R.type('s'); //=> "String"
 *      R.type(null); //=> "Null"
 *      R.type([]); //=> "Array"
 *      R.type(/[A-z]/); //=> "RegExp"
 *      R.type(() => {}); //=> "Function"
 *      R.type(undefined); //=> "Undefined"
 */

function type() {

}

/** Q6. (*)
 * The upper case version of a string.
 *
 *      R.toUpper('abc'); //=> 'ABC'
 */

function toUpper1(params) {
  return params.toUpperCase();
}

/** Q7.
 * Converts an object into an array of key, value arrays. The object's own
 * properties and prototype properties are used. Note that the order of the
 * output array is not guaranteed to be consistent across different JS
 * platforms.
 *
 *      const F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      const f = new F();
 *      toPairsIn(f); //=> [['x','X'], ['y','Y']]
 */

function toPairs(params) {
  return params;
}


/** Q8.
 * Title: Tiles
 *
 * Summary: Determine if you can combine small and big tiles to create a specific length.
 *
 * Determine if you can create a row of tiles that are a specific
 * target inches long given a number of small tiles (1 inch
 * each) and a number of big tiles (5 inches each). Return true
 * if it is possible else false.
 *
 * input: object containing
 *     small: Integer number of small (1 inch) tiles
 *       big: Integer number of big (5 inch) tiles
 *    target: Integer length in inches that we want to create.
 *
 * output: true if some combination of small and big tiles will
 *         create target length, else false.
 *
 * Restrictions: Do not use loops (for or while) or recursion.
 */

function tiles(input) {
  return input;
}

/** Q9.
 * Title: Theatre Line Change
 *
 * Summary: Can the theatre box office make change for everyone in the line.
 *
 * The theatre box office needs to sell tickets to everyone
 * in line. I must sell tickets in the order that people are
 * in the line. A ticket costs $10 and the theatre box office
 * must give correct change to everyone when they buy their
 * ticket.
 *
 * Everyone in the theatre box office line only has one bill
 * to pay with: $10, $20, $50.
 *
 * Given that the theatre box office starts with no change,
 * determine if they can sell tickets to everyone in line
 * and give the correct change at the time each ticket is
 * purchased.
 *
 * input: Array of 10, 20, and 50, representing what bill
 *        each person in line has.
 *
 * output: true if the box office can sell tickets and make
 *         change for everyone in line, else false.
 *
 * For Example:
 * [10,10,20,10,10,10,50] => true
 * [20] => false
 * [10,20,10,20,50] => true
 * [10,20,20] => false
 */

function theatre(input) {
  return input;
}

/** Q10.
 * Title: Sumable
 *
 * Summary: Given an array of integers, determine if a subset of the array add to a target number.
 *
 * Given an array of integers and a target number, is it
 * possible to choose a set integers, such that the set
 * sums to the target?
 *
 * input: Object containing
 *     target: integer number
 *      array: array of integers
 *
 * output: true if there exists a set of input array integers
 *         that add up to input target.
 *
 * Restrictions: No loops or helper functions allowed: for, while, function
 */

function sumable(input) {
  return input;
}

/** Q11.
 * Title: Sudan Function
 *
 * Implement Sudan Function defined as
 *
 * F(n,x,y) = x+y when n = 0
 *
 * F(n,x,y) = x when y = 0 and n >= 0
 *
 * F(n,x,y) = F(n-1, F(n,x,y-1), F(n,x,y-1) + y)
 *            when y > 0 and n >= 0
 *
 * Help with Sudan Function:
 * https://en.wikipedia.org/wiki/Sudan_function
 *
 * input: Object containing:
 *        n: Non-negative Integer
 *        x: Non-negative Integer
 *        y: Non-negative Integer
 *
 * output: Integer as defined above.
 */

function kungfoo(input) {
  return input;
}

/** Q12. (*)
 * Title: Substitution Cipher II
 *
 * output: String encoded such that:
 *         A-Z and a-z are replaced with the corresponding letter,
 *         of the same case, shifted 4 or 6 letters to the right. 'A'
 *         is shifted 4, 'B' is shifted 6, 'C' is shifted 4, 'D' is
 *         shifted 6, etc... The same rule applies for the lower case
 *         letters.
 *
 *         If a letter is shifted past Z or z then it wraps
 *         back around to A or a and continues the remaining
 *         number of shifted positions.
 *
 *         All other characters are left unchanged.
 *
 * For Example:
 * A -> E (shifted right 4 letters)
 * B -> H (shifted right 6 letters)
 * Y -> C (shifted right 4 letters)
 * Z -> F (shifted right 6 letters)
 * a -> e (shifted right 4 letters)
 * b -> h (shifted right 6 letters)
 * y -> c (shifted right 4 letters)
 * z -> z (shifted right 6 letters)
 * . -> .
 * " " -> " " (space)
 * \n -> \n (newline)
 */

function cipher(str) {
  return str;
}

/** Q13. (*)
 * Splits a collection into slices of the specified length.
 *
 *     splitEvery(3, [1, 2, 3, 4, 5, 6, 7]); //=> [[1, 2, 3], [4, 5, 6], [7]]
 *     splitEvery(3, 'foobarbaz'); //=> ['foo', 'bar', 'baz']
 */

function splitEvery(n, list) {
  return n + list;
}


/** Q14. (*)
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 *
 *
 *    slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 *    slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
 *    slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
 *    slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
 *    slice(0, 3, 'ramda');                     //=> 'ram'
 */

function slice(input) {
  return input;
}


/** Q15. (*)
 * Title: Search Sorted Matrix
 *
 * input: An object containing:
 *     'search': an integer to search for.
 *     'matrix': A 2D array of integers where integers in each row are sorted from
 *               left to right and the first integer of each row is greater than the
 *               last integer of the previous row.
 *
 * output: return true if 'matrix' contains 'search' else return false.
 *
 * The goal is to search as efficiently as possible, fewest statements executed.
 */

function searchSortedMatrix(input) {
  return input;
}

/* Q16 (*)
Create an iterable using generator function.
It should have the same functionality as the one in question 1
*/
function* generatorIterable() {
  yield 'abc';
}

// Q16 (*)
const fibonacci = {
  * [Symbol.iterator]() {
    // implement fibonacci
  },
};

module.exports = {
  searchSortedMatrix,
  slice,
  splitEvery,
  cipher,
  kungfoo,
  sumable,
  theatre,
  tiles,
  toPairs,
  toUpper1,
  type,
  uncurryN,
  union,
  uniq,
  unnest,
  generatorIterable,
  fibonacci,
};
