const {
  xprod,
  without,
  valuesIn,
  values,
  update,
} = require('../src/problems');

describe('xprod', () => {
  const a = [1, 2];
  const b = ['a', 'b', 'c'];

  it('returns an empty list if either input list is empty', () => {
    expect(xprod([], [1, 2, 3])).toEqual([]);
    expect(xprod([1, 2, 3], [])).toEqual([]);
  });

  it('creates the collection of all cross-product pairs of its parameters', () => {
    expect(xprod(a, b)).toEqual([[1, 'a'], [1, 'b'], [1, 'c'], [2, 'a'], [2, 'b'], [2, 'c']]);
  });
});

describe('without', () => {
  it('returns an array not containing values in the first argument', () => {
    expect(without([1, 2], [1, 2, 1, 4, 5])).toEqual([4, 5]);
    expect(without([0], [-0]).length).toBe(1);
    expect(without([-0], [0]).length).toBe(1);
    expect(without([NaN], [NaN]).length).toBe(0);
    expect(without([[1]], [[1]]).length).toBe(0);
  });
});

describe('valuesIn', () => {
  const obj = {
    a: 100, b: [1, 2, 3], c: { x: 200, y: 300 }, d: 'D', e: null, f: undefined,
  };

  class C {
    constructor() { this.a = 100; this.b = 200; }
  }
  C.prototype.x = () => 'x';
  C.prototype.y = 'y';
  const cobj = new C();

  it("returns an array of the given object's values", () => {
    const vs = valuesIn(obj);
    expect(vs.length).toBe(6);
    expect(vs.indexOf(100) >= 0).toBe(true);
    expect(vs.indexOf('D') >= 0).toBe(true);
    expect(vs.indexOf(null) >= 0).toBe(true);
    expect(vs.indexOf(undefined) >= 0).toBe(true);
    expect(vs.indexOf(obj.b) >= 0).toBe(true);
    expect(vs.indexOf(obj.c) >= 0).toBe(true);
  });

  it("includes the given object's prototype properties", () => {
    const vs = valuesIn(cobj);
    expect(vs.length).toBe(4);
    expect(vs.indexOf(100) >= 0).toBe(true);
    expect(vs.indexOf(200) >= 0).toBe(true);
    expect(vs.indexOf(cobj.x) >= 0).toBe(true);
    expect(vs.indexOf('y') >= 0).toBe(true);
  });
});

describe('values', () => {
  const obj = {
    a: 100, b: [1, 2, 3], c: { x: 200, y: 300 }, d: 'D', e: null, f: undefined,
  };

  class C {
    constructor() { this.a = 100; this.b = 200; }
  }
  C.prototype.x = () => 'x';
  C.prototype.y = 'y';
  const cobj = new C();

  it("returns an array of the given object's values", () => {
    const vs = values(obj).sort();
    const ts = [[1, 2, 3], 100, 'D', { x: 200, y: 300 }, null, undefined];
    expect(vs.length).toEqual(ts.length);
    expect(vs[0]).toEqual(ts[0]);
    expect(vs[1]).toEqual(ts[1]);
    expect(vs[2]).toEqual(ts[2]);
    expect(vs[3]).toEqual(ts[3]);
    expect(vs[4]).toEqual(ts[4]);
    expect(vs[5]).toEqual(ts[5]);

    expect(values({
      hasOwnProperty: false,
    })).toEqual([false]);
  });

  it("does not include the given object's prototype properties", () => {
    expect(values(cobj)).toEqual([100, 200]);
  });
});

describe('update', () => {
  it('updates the value at the given index of the supplied array', () => {
    expect(update(2, 4, [0, 1, 2, 3])).toEqual([0, 1, 4, 3]);
  });

  it('offsets negative indexes from the end of the array', () => {
    expect(update(-3, 4, [0, 1, 2, 3])).toEqual([0, 4, 2, 3]);
  });

  it('returns the original array if the supplied index is out of bounds', () => {
    const list = [0, 1, 2, 3];
    expect(update(4, 4, list)).toEqual(list);
    expect(update(-5, 4, list)).toEqual(list);
  });

  it('does not mutate the original array', () => {
    const list = [0, 1, 2, 3];
    expect(update(2, 4, list)).toEqual([0, 1, 4, 3]);
    expect(list).toEqual([0, 1, 2, 3]);
  });

  it('curries the arguments', () => {
    expect(update(2)(4)([0, 1, 2, 3])).toEqual([0, 1, 4, 3]);
  });

  it('accepts an array-like object', () => {
    function args(..._args) {
      return _args;
    }
    expect(update(2, 4, args(0, 1, 2, 3))).toEqual([0, 1, 4, 3]);
  });
});
