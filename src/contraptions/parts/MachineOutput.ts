import MachineOutputGate from 'app/gates/MachineOutputGate';
import OutputTerminal from 'app/gates/OutputTerminal';

export default class MachineOutput extends OutputTerminal {

  public constructor() {
    super();
    this.$parent = new MachineOutputGate();
  }

}
