const {
  generatorIterable,
  fibonacci,
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
} = require('../src/index');

describe('generatorIterable', () => {
  test('should be a generator function', () => {
    expect(generatorIterable.constructor.name).toBe('GeneratorFunction');
  });

  test('iterator.next returns an object with value and done properties', () => {
    const iterable = generatorIterable();
    const iterator = iterable[Symbol.iterator]();
    expect(iterator.next()).toEqual({
      value: 1,
      done: false,
    });
  });

  test('iteration should finish after value is 5', () => {
    const iterable = generatorIterable();
    const iterator = iterable[Symbol.iterator]();
    let value = iterator.next(); // 1
    value = iterator.next(); // 2
    value = iterator.next(); // 3
    value = iterator.next(); // 4
    value = iterator.next(); // 5
    expect(value).toEqual({ value: 5, done: false });
    expect(iterator.next()).toEqual({ value: undefined, done: true });
  });
});

describe('fibonacci', () => {
  test('should be an iterable', () => {
    const iterator = fibonacci[Symbol.iterator]();
    expect(typeof fibonacci[Symbol.iterator]).toBe('function');
    expect(typeof iterator.next).toBe('function');
    expect(iterator.next()).toHaveProperty('value');
    expect(iterator.next()).toHaveProperty('done');
  });

  test('should return fibonacci series', () => {
    const iterator = fibonacci[Symbol.iterator]();
    expect(iterator.next().value).toBe(1);
    expect(iterator.next().value).toBe(2);
    expect(iterator.next().value).toBe(3);
    expect(iterator.next().value).toBe(5);
    expect(iterator.next().value).toBe(8);
    expect(iterator.next().value).toBe(13);
    expect(iterator.next().value).toBe(21);
    expect(iterator.next().value).toBe(34);
    expect(iterator.next().value).toBe(55);
    expect(iterator.next().value).toBe(89);
    expect(iterator.next().value).toBe(144);
  });
});

describe('searchSortedMatrix', () => {
  test('should implement the function correctly', () => {
    expect(searchSortedMatrix({
      search: 18,
      matrix: [
        [12, 18, 34, 35],
        [38, 50, 52, 70],
        [82, 84, 90, 95],
      ],
    })).toBe(true);
    expect(searchSortedMatrix({
      search: 41,
      matrix: [[12, 18, 34, 35, 41, 44]],
    })).toBe(true);
    expect(searchSortedMatrix({
      search: 40,
      matrix: [[12, 18, 34, 35, 41, 44]],
    })).toBe(false);
    expect(searchSortedMatrix({
      search: 54,
      matrix: [[1, 2, 3, 4, 5, 6, 9, 10],
        [12, 14, 15, 17, 18, 20, 22, 23],
        [24, 25, 26, 27, 28, 34, 35, 36],
        [37, 42, 43, 44, 45, 46, 48, 49],
        [50, 51, 52, 56, 61, 62, 63, 64],
        [65, 69, 70, 75, 76, 80, 81, 82],
        [83, 84, 90, 82, 84, 90, 95, 96]],
    })).toBe(false);
    expect(searchSortedMatrix({
      search: 80,
      matrix: [[1, 2, 3, 4, 5, 6, 9, 10],
        [12, 14, 15, 17, 18, 20, 22, 23],
        [24, 25, 26, 27, 28, 34, 35, 36],
        [37, 42, 43, 44, 45, 46, 48, 49],
        [50, 51, 52, 56, 61, 62, 63, 64],
        [65, 69, 70, 75, 76, 80, 81, 82],
        [83, 84, 90, 82, 84, 90, 95, 96]],
    })).toBe(true);
  });
});

describe('slice', () => {
  it('retrieves the proper sublist of a list', () => {
    const list = [8, 6, 7, 5, 3, 0, 9];
    expect(slice(2, 5, list)).toBe([7, 5, 3]);
  });

  it('can operate on strings', () => {
    expect(slice(0, 0, 'abc')).toBe('');
    expect(slice(0, 1, 'abc')).toBe('a');
    expect(slice(0, 2, 'abc')).toBe('ab');
    expect(slice(0, 3, 'abc')).toBe('abc');
    expect(slice(0, 4, 'abc')).toBe('abc');
    expect(slice(1, 0, 'abc')).toBe('');
    expect(slice(1, 1, 'abc')).toBe('');
    expect(slice(1, 2, 'abc')).toBe('b');
    expect(slice(1, 3, 'abc')).toBe('bc');
    expect(slice(1, 4, 'abc')).toBe('bc');
    expect(slice(0, -4, 'abc')).toBe('');
    expect(slice(0, -3, 'abc')).toBe('');
    expect(slice(0, -2, 'abc')).toBe('a');
    expect(slice(0, -1, 'abc')).toBe('ab');
    expect(slice(0, -0, 'abc')).toBe('');
    expect(slice(-2, -4, 'abc')).toBe('');
    expect(slice(-2, -3, 'abc')).toBe('');
    expect(slice(-2, -2, 'abc')).toBe('');
    expect(slice(-2, -1, 'abc')).toBe('b');
    expect(slice(-2, -0, 'abc')).toBe('');
  });
});

describe('splitEvery', () => {
  it('splits a collection into slices of the specified length', () => {
    expect(splitEvery(1, [1, 2, 3, 4])).toEqual([[1], [2], [3], [4]]);
    expect(splitEvery(2, [1, 2, 3, 4])).toEqual([[1, 2], [3, 4]]);
    expect(splitEvery(3, [1, 2, 3, 4])).toEqual([[1, 2, 3], [4]]);
    expect(splitEvery(4, [1, 2, 3, 4])).toEqual([[1, 2, 3, 4]]);
    expect(splitEvery(5, [1, 2, 3, 4])).toEqual([[1, 2, 3, 4]]);
    expect(splitEvery(3, [])).toEqual([]);
    expect(splitEvery(1, 'abcd')).toEqual(['a', 'b', 'c', 'd']);
    expect(splitEvery(2, 'abcd')).toEqual(['ab', 'cd']);
    expect(splitEvery(3, 'abcd')).toEqual(['abc', 'd']);
    expect(splitEvery(4, 'abcd')).toEqual(['abcd']);
    expect(splitEvery(5, 'abcd')).toEqual(['abcd']);
    expect(splitEvery(3, '')).toEqual([]);
  });

  it('throws if first argument is not positive', () => {
    expect(() => { splitEvery(0, []); }).toThrow();
    expect(() => { splitEvery(0, ''); }).toThrow();
    expect(() => { splitEvery(-1, []); }).toThrow();
    expect(() => { splitEvery(-1, ''); }).toThrow();
  });
});

describe('substitution-cipher', () => {
  test('should return correct output for an input', () => {
    expect(cipher('Aa Bb Cc Xx Yy Zz !?.\n')).toBe('Ee Hh Gg Dd Cc Ff !?.\n');
    expect(cipher('The Quick Brown Fox Jumped Over The Lazy Dog!')).toBe('Zni Uymgo Hxsat Lsd Pyqvij Sbix Zni Refc Jsk!');
    expect(cipher('Lorem ipsum dolor sit amet, consectetur adipiscing elit! Sed sit amet tortor id turpis pharetra ultricies eget ac ipsum.\nNam porttitor, ligula vitae tincidunt lacinia, lacus eros tempus neque, ac tincidunt nisi dui ac dui. Ut volutpat mi non velit varius, at scelerisque lorem efficitur. Etiam vitae molestie nibh. Integer quis arcu non tortor auctor viverra et at leo?\nSed lacinia nunc non est tincidunt, vel pellentesque magna finibus. Nullam sed lectus sed massa convallis posuere id in augue. Mauris pharetra felis erat, vitae condimentum nisi bibendum id. Vestibulum vitae neque a lectus gravida rhoncus lobortis id elit. Maecenas semper.'))
      .toBe('Rsxiq mvwyq jsrsx wmz eqiz, gstwigzizyx ejmvmwgmtk irmz! Wij wmz eqiz zsxzsx mj zyxvmw vnexizxe yrzxmgmiw ikiz eg mvwyq.\nTeq vsxzzmzsx, rmkyre bmzei zmtgmjytz regmtme, regyw ixsw ziqvyw tiuyi, eg zmtgmjytz tmwm jym eg jym. Yz bsryzvez qm tst birmz bexmyw, ez wgirixmwuyi rsxiq illmgmzyx. Izmeq bmzei qsriwzmi tmhn. Mtzikix uymw exgy tst zsxzsx eygzsx bmbixxe iz ez ris?\nWij regmtme tytg tst iwz zmtgmjytz, bir virritziwuyi qekte lmtmhyw. Tyrreq wij rigzyw wij qewwe gstberrmw vswyixi mj mt eykyi. Qeyxmw vnexizxe lirmw ixez, bmzei gstjmqitzyq tmwm hmhitjyq mj. Biwzmhyryq bmzei tiuyi e rigzyw kxebmje xnstgyw rshsxzmw mj irmz. Qeigitew wiqvix.');
  });
});

describe('sudan function', () => {
  test('should implement sudan function correctly', () => {
    expect(kungfoo({ n: 0, x: 5, y: 8 })).toEqual(13);
    expect(kungfoo({ n: 1, x: 3, y: 4 })).toEqual(74);
    expect(kungfoo({ n: 2, x: 5, y: 1 })).toEqual(440);
    expect(kungfoo({ n: 2, x: 0, y: 2 })).toEqual(19);
  });
});

describe('sumable', () => {
  test('should implement sumable as specified', () => {
    expect(sumable({ target: 8, array: [4, 9, 4, 2] })).toBe(true);
    expect(sumable({ target: 8, array: [4, 9, 3, 2] })).toBe(false);
    expect(sumable({ target: 17, array: [4, 9, 6, 7, 4, 2] })).toBe(true);
    expect(sumable({ target: 27, array: [4, 9, 6, 7, 4, 2] })).toBe(false);
    expect(sumable({ target: 0, array: [] })).toBe(true);
    expect(sumable({ target: 1, array: [] })).toBe(false);
  });
});

describe('theatre', () => {
  test('should implement theatre correctly', () => {
    expect(theatre([10, 10, 20, 10, 10, 10, 50, 10, 20, 50, 10, 20])).toBe(true);
    expect(theatre([10, 10, 20, 10, 10, 10, 50, 50, 10, 20])).toBe(false);
    expect(theatre([10, 10, 20, 10, 10, 10, 20, 20, 20, 20])).toBe(true);
    expect(theatre([10, 10, 10, 20, 10, 10, 50, 10, 20, 10, 20, 20, 20, 10, 50, 20,
      10, 10, 10, 20, 20, 50, 20])).toBe(true);
    expect(theatre([10, 10, 10, 20, 10, 10, 50, 20, 10, 20, 20, 20, 10, 50, 20, 10,
      10, 10, 20, 20, 50, 10, 20])).toBe(false);
  });
});

describe('tiles', () => {
  test('should implement tiles correctly', () => {
    expect(tiles({ small: 4, big: 3, target: 12 })).toBe(true);
    expect(tiles({ small: 2, big: 3, target: 18 })).toBe(false);
    expect(tiles({ small: 8, big: 4, target: 26 })).toBe(true);
    expect(tiles({ small: 3, big: 3, target: 14 })).toBe(false);
  });
});

describe('toPairs', () => {
  it('converts an object into an array of two-element [key, value] arrays', () => {
    expect(toPairs({ a: 1, b: 2, c: 3 })).toEqual([['a', 1], ['b', 2], ['c', 3]]);
  });

  it("only iterates the object's own properties", () => {
    const F = function () {
      this.x = 1;
      this.y = 2;
    };
    F.prototype.protoProp = 'you can\'t see me';
    const f = new F();
    expect(toPairs(f)).toEqual([['x', 1], ['y', 2]]);
  });
});

describe('toUpper', () => {
  it('returns the upper-case equivalent of the input string', () => {
    expect(toUpper1('abc')).toBe('ABC');
  });
});

describe('type', () => {
  it('"Array" if given an array literal', () => {
    expect(type([1, 2, 3])).toBe('Array');
  });

  // it('"Arguments" if given an arguments object', function() {
  //   var args = (function() { return arguments; }());
  //   expect(type(args), 'Arguments');
  // });

  it('"Object" if given an object literal', () => {
    expect(type({ batman: 'na na na na na na na' })).toBe('Object');
  });

  it('"RegExp" if given a RegExp literal', () => {
    expect(type(/[A-z]/)).toBe('RegExp');
  });

  it('"Number" if given a numeric value', () => {
    expect(type(4)).toBe('Number');
  });

  it('"Number" if given the NaN value', () => {
    expect(type(NaN)).toBe('Number');
  });

  it('"String" if given a String literal', () => {
    expect(type('Gooooodd Mornning Ramda!!')).toBe('String');
  });

  it('"String" if given a String object', () => {
    expect(type('I am a String object')).toBe('String');
  });

  it('"Null" if given the null value', () => {
    expect(type(null)).toBe('Null');
  });

  it('"Undefined" if given the undefined value', () => {
    expect(type(undefined)).toBe('Undefined');
  });
});

describe('uncurryN', () => {
  function a2(a) {
    return b => a + b;
  }

  function a3(a) {
    return b => c => a + b + c;
  }

  function a3b(a) {
    return b => (c, ...args) => a + b + c + (args[0] || 0) + (args[1] || 0);
  }

  function a4(a) {
    return b => c => d => a + b + c + d;
  }

  it('accepts an arity', () => {
    const uncurried = uncurryN(3, a3);
    expect(uncurried(1, 2, 3)).toBe(6);
  });

  it('returns a function of the specified arity', () => {
    expect(uncurryN(2, a2).length).toBe(2);
    expect(uncurryN(3, a3).length).toBe(3);
    expect(uncurryN(4, a4).length).toBe(4);
  });

  it('forwards extra arguments', () => {
    const g = uncurryN(3, a3b);

    expect(g(1, 2, 3)).toBe(6);
    expect(g(1, 2, 3, 4)).toBe(10);
    expect(g(1, 2, 3, 4, 5)).toBe(15);
  });

  it('works with ordinary uncurried functions', () => {
    expect(uncurryN(2, (a, b) => a + b)(10, 20)).toBe(30);
    expect(uncurryN(3, (a, b, c) => a + b + c)(10, 20, 30)).toBe(60);
  });
});

describe('union', () => {
  const M = [1, 2, 3, 4];
  const N = [3, 4, 5, 6];
  it('combines two lists into the set of all their elements', () => {
    expect(union(M, N)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('combines two lists with various elements', () => {
    expect(union([0], [-0]).length).toEqual(2);
    expect(union([-0], [0]).length).toEqual(2);
    expect(union([NaN], [NaN]).length).toEqual(1);
  });
});

describe('uniq', () => {
  it('returns a set from any array (i.e. purges duplicate elements)', () => {
    const list = [1, 2, 3, 1, 2, 3, 1, 2, 3];
    expect(uniq(list)).toEqual([1, 2, 3]);
  });

  it('keeps elements from the left', () => {
    expect(uniq([1, 2, 3, 4, 1])).toEqual([1, 2, 3, 4]);
  });

  it('returns an empty array for an empty array', () => {
    expect(uniq([])).toEqual([]);
  });

  it('checking length', () => {
    expect(uniq([-0, -0]).length).toBe(1);
    expect(uniq([0, -0]).length).toBe(2);
    expect(uniq([NaN, NaN]).length).toBe(1);
    expect(uniq([[1], [1]]).length).toBe(1);
  });

  it('handles null and undefined elements', () => {
    expect(uniq([undefined, null, undefined, null])).toEqual([undefined, null]);
  });
});

describe('unnest', () => {
  it('only flattens one layer deep of a nested list', () => {
    let nest = [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10];
    expect(unnest(nest)).toEqual([1, 2, 3, [4, 5], 6, [[[7], 8]], 9, 10]);
    nest = [[[[3]], 2, 1], 0, [[-1, -2], -3]];
    expect(unnest(nest)).toEqual([[[3]], 2, 1, 0, [-1, -2], -3]);
    expect(unnest([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it('is not destructive', () => {
    const nest = [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10];
    expect(unnest(nest)).not.toEqual(nest);
  });

  it('handles array-like objects', () => {
    const o = {
      length: 3, 0: [1, 2, [3]], 1: [], 2: ['a', 'b', 'c', ['d', 'e']],
    };
    expect(unnest(o)).toEqual([1, 2, [3], 'a', 'b', 'c', ['d', 'e']]);
  });

  it('flattens an array of empty arrays', () => {
    expect(unnest([[], [], []])).toEqual([]);
    expect(unnest([])).toEqual([]);
  });
});
