import DigitalElement from 'digital-logic/abstracts/DigitalElement';
import Gate from '../abstracts/Gate';

export default class OrGate extends Gate {

  public constructor({ x, y }: { x: number; y: number }) {
    super({ x, y, src: './OrGate.png' });
  }

  public compute(): void {
    this.off();
    const isHigh = this._inputs.filter((wire) => (wire.input.$parent as DigitalElement).isHigh).length > 0;
    if (isHigh) {
      this.high();
      return;
    }
    const isLow = this._inputs.filter((wire) => (wire.input.$parent as DigitalElement).isLow).length > 0;
    if (isLow) {
      this.low();
      return;
    }
  }

}