/* eslint no-restricted-syntax: ["error", "WithStatement"] */
class Cycled extends Array {
  constructor(array) {
    super();
    this.originalArray = array;
    this.index = 0;
  }

  get index() {
    return this.currentIndex;
  }

  set index(val) {
    let newVal = val % this.originalArray.length;
    newVal = newVal < 0 ? (this.originalArray.length + newVal) : newVal;

    this.currentIndex = newVal;
  }

  current() {
    return this.originalArray[this.index];
  }

  previous() {
    this.index -= 1;
    return this.current();
  }

  next() {
    this.index += 1;
    return this.current();
  }

  step(val) {
    this.index = val > 0 ? val : val - 1;
    return this.current();
  }

  indexOf(val) {
    return this.originalArray.indexOf(val);
  }

  indefinitely() {
    const instance = this;
    const iterator = {
      next() {
        return {
          value: instance.next(),
          done: false,
        };
      },
    };
    return iterator;
  }

  indefinitelyReversed() {
    const instance = this;
    const iterator = {
      next() {
        return {
          value: instance.previous(),
          done: false,
        };
      },
    };
    return iterator;
  }

  [Symbol.iterator]() {
    let step = 0;
    const instance = this;

    const iterator = {
      next() {
        instance.index += step > 0 ? 1 : 0;
        step += 1;

        if (step <= instance.originalArray.length) {
          return {
            value: instance.current(),
            done: false,
          };
        }
        return {
          value: undefined,
          done: true,
        };
      },
    };
    return iterator;
  }
}

module.exports = Cycled;
