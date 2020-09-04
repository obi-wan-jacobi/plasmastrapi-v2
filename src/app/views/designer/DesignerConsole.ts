import Panel from '../../ui/Panel';
import ToolButtonPanel from './panels/ToolButtonPanel';
import DigitalCircuitPanel from './panels/DigitalCircuitPanel';
import { Contraption } from '../../contraptions/abstracts/Contraption';

export default class DesignerConsole extends Panel {

  public constructor({ contraption }: { contraption: Contraption }) {
    super(arguments[0]);
    this.add(ToolButtonPanel);
    this.add(DigitalCircuitPanel, {
      x: 400,
      y: 340,
      width: 800,
      height: 560,
      inputs: contraption.inputs,
      outputs: contraption.outputs,
    });
  }

}