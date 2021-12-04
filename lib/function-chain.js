class FunctionChain {
  static fromFunctionArray(functionArray) {
    let next = undefined;
    for (let i = functionArray.length - 1; i >= 0; i--) {
      next = new FunctionChain(functionArray[i], next);
    }
    return next;
  }

  constructor(f, next) {
    this.f = f;
    this.next = next;
  }

  async call(req, res) {
    if (this.next) {
      const nextFunction = () => this.next.call(req, res);
      await this.f(req, res, nextFunction);
    } else {
      await this.f(req, res);
    }
  }
}

module.exports = FunctionChain;
