const Cycled = require('../src/cycled');

const fixture = [1, 2, 3];

test('.current()', () => {
  const c = new Cycled(fixture);
  expect(c.current()).toBe(1);
  c.next();
  expect(c.current()).toBe(2);
});

test('.next()', () => {
  const c = new Cycled(fixture);
  expect([c.next(), c.next(), c.next(), c.next()]).toEqual([2, 3, 1, 2]);
});

test('.previous()', () => {
  const c = new Cycled(fixture);
  expect([c.previous(), c.previous(), c.previous(), c.previous()]).toEqual([3, 2, 1, 3]);
});

test('.step()', () => {
  const c = new Cycled(fixture);
  expect(c.step(2)).toBe(3);
  expect(c.step(-2)).toBe(1);
});

test('.index', () => {
  const c = new Cycled(fixture);
  expect(c.index).toBe(0);
  c.index = 2;
  expect(c.index).toBe(2);
  expect(c.current()).toBe(3);
  c.index = -7;
  expect(c.index).toBe(2);
  expect(c.current()).toBe(3);
});

test('.indefinitely()', () => {
  const c = new Cycled(fixture);
  expect(c.indefinitely().next().value).toBe(2);
});

test('.indefinitelyReversed()', () => {
  const c = new Cycled(fixture);
  expect(c.indefinitelyReversed().next().value).toBe(3);
});

test('.indexOf()', () => {
  const c = new Cycled(fixture);
  expect(c.indexOf(3)).toBe(2);
});

test('iterable', () => {
  const c = new Cycled(fixture);
  expect(c[Symbol.iterator]().next().value).toBe(1);
});

test('iterations on destructuring', () => {
  const c = new Cycled(fixture);
  expect([...c]).toEqual(fixture);
  expect([...c]).toEqual(fixture);
  c.next();
  expect([...c]).toEqual([2, 3, 1]);
});
