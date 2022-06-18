import DigitalElement from 'digital-logic/abstracts/DigitalElement';
import { DIGITAL_STATE } from 'digital-logic/enums/DIGITAL_STATE';
import Gate from '../abstracts/Gate';

export default class NandGate extends Gate {

  public constructor({ x, y }: { x: number; y: number }) {
    super({ x, y, src: './NandGate.png' });
  }

  public compute(): void {
    let state;
    this._inputs.every((wire) => {
      if ((wire.input.$parent as DigitalElement).isHigh) {
        state = DIGITAL_STATE.HIGH;
        return true;
      }
      if ((wire.input.$parent as DigitalElement).isLow) {
        state = DIGITAL_STATE.LOW;
        return false;
      }
      return true;
    });
    if (state === DIGITAL_STATE.HIGH) {
      this.low();
      return;
    }
    if (state === DIGITAL_STATE.LOW) {
      this.high();
      return;
    }
    this.off();
  }

}