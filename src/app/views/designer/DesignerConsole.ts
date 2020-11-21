import Contraption from '../../contraptions/abstracts/Contraption';
import DigitalCircuitPanel from './panels/DigitalCircuitPanel';
import Panel from '../../ui/Panel';
import ToolButtonPanel from './panels/ToolButtonPanel';

export default class DesignerConsole extends Panel {

  public constructor({ contraption }: { contraption: Contraption }) {
    super(arguments[0]);
    this.appendChild(ToolButtonPanel, {});
    this.appendChild(DigitalCircuitPanel, {
      x: 400, y: 340,
      width: 800,
      height: 560,
      inputs: contraption.inputs,
      outputs: contraption.outputs,
    });
  }

}
