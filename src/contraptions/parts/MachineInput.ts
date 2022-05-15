import HiddenGate from 'app/gates/HiddenGate';
import InputTerminal from 'app/gates/InputTerminal';

export default class MachineInput extends InputTerminal {

  public constructor({ x, y }: { x: number; y: number }) {
    super({ x, y });
    this.$parent = new HiddenGate();
  }

}
