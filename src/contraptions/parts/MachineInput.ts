import DigitalElement from 'digital-logic/abstracts/DigitalElement';
import LabelComponent from 'foundation/presentation/components/LabelComponent';
import InputTerminal from '../../digital-logic/terminals/InputTerminal';

export default class MachineInput extends DigitalElement {

  public constructor({ labelText }: { labelText: string}) {
    super({ x: 0, y: 0 });
    const input = this.$appendChild(new InputTerminal());
    input.$add(LabelComponent, {
      text: labelText,
      fontSize: 18,
      offset: { x: 12, y: 5 },
    });
  }

  public compute(): void {
    const isOneHigh = this._inputs.find((wire) => (wire.input.$parent as DigitalElement).isHigh);
    if (isOneHigh) {
      this.high();
      return;
    }
    const isOneLow = this._inputs.find((wire) => (wire.input.$parent as DigitalElement).isLow);
    if (isOneLow) {
      this.low();
      return;
    }
    this.off();
  }

}