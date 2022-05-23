import DigitalElement from 'app/abstracts/DigitalElement';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import InputTerminal from '../../app/gates/InputTerminal';

export default class MachineInput extends DigitalElement {

  public constructor() {
    super();
    this.$add(PoseComponent, { x: 0, y: 0, a: 0 });
    this.$appendChild(new InputTerminal());
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