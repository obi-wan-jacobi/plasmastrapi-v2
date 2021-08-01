import DigitalOperator from './abstracts/DigitalOperator';

export default class Nand extends DigitalOperator {

  public compute(): void {
    const high = this._inputs.find((input) => input.isHigh);
    const low = this._inputs.find((input) => input.isLow);
    if (!(high || low)) {
      return this.off();
    }
    if (low) {
      return this.high();
    }
    return this.low();
  }
}
