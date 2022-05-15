import HiddenGate from 'app/gates/HiddenGate';
import OutputTerminal from 'app/gates/OutputTerminal';

export default class MachineOutput extends OutputTerminal {

  public constructor({ x, y }: { x: number; y: number }) {
    super({ x, y });
    this.$parent = new HiddenGate();
  }

}
