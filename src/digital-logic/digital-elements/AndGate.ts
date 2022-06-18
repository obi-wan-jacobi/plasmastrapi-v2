import DigitalElement from 'digital-logic/abstracts/DigitalElement';
import Gate from '../abstracts/Gate';

export default class AndGate extends Gate {

  public constructor({ x, y }: { x: number; y: number }) {
    super({ x, y, src: './AndGate.png' });
  }

  public compute(): void {
    this.off();
    this._inputs.every((wire) => {
      if ((wire.input.$parent as DigitalElement).isHigh) {
        this.high();
        return true;
      }
      if ((wire.input.$parent as DigitalElement).isLow) {
        this.low();
        return false;
      }
      return true;
    });
  }

}