class Cycled extends Array {
  constructor(arr) {
    super();
    this.arr = arr;
    this.index = 0;
  }

  step(stepCount) {
    const finalIndex = (this.index + stepCount) % this.arr.length;
    this.index = finalIndex;
    return this.arr[this.index];
  }

  current() {
    return this.arr[this.index];
  }

  next() {
    const finalIndex = (this.index + 1) % this.arr.length;
    this.index = finalIndex;
    return this.arr[this.index];
  }

  previous() {
    console.log(this.index);
    const finalIndex = (this.index - 1) % this.arr.length;
    this.index = finalIndex;
    console.log(finalIndex);
    return this.arr[this.index];
  }

  indexOf(val) {
    return this.arr.indexOf(val);
  }
}

module.exports = Cycled;
