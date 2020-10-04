import DigitalOperator from './abstracts/DigitalOperator';

export default class And extends DigitalOperator {

  public compute(): void {
    if (this._inputs.find((input) => input.isLow)) {
      return this.low();
    }
    if (this._inputs.find((input) => input.isHigh)) {
      return this.high();
    }
    return this.off();
  }
}