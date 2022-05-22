import MachineInputGate from 'app/gates/MachinInputGate';
import InputTerminal from 'app/gates/InputTerminal';

export default class MachineInput extends InputTerminal {

  public constructor() {
    super();
    this.$parent = new MachineInputGate();
  }

}
