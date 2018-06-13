class Cycled extends Array {
  constructor(arr) {
    super(Array);
    this.arr = arr;
  }
  // * cycle(arr) {
  //   while (true) {
  //     for (const elm of arr) {
  //       yield elm;
  //     }
  //     this;
  //   }
}


module.exports = Cycled;
