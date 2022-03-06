import { DIGITAL_STATE } from 'digital-logic/enums/DIGITAL_STATE';
import Gate from './Gate';

export default class AndGate extends Gate {

  public compute(): void {
    this._nextState = DIGITAL_STATE.OFF;
    let i;
    for (i of this._inputs) {
      if ((i.input.$parent as Gate).isLow) {
        this._nextState = DIGITAL_STATE.HIGH;
        return;
      }
      if ((i.input.$parent as Gate).isHigh) {
        this._nextState = DIGITAL_STATE.LOW;
      }
    }
  }

}