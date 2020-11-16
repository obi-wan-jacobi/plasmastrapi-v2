import Contraption from '../../contraptions/abstracts/Contraption';
import DigitalCircuitPanel from './panels/DigitalCircuitPanel';
import Panel from '../../ui/Panel';
import ToolButtonPanel from './panels/ToolButtonPanel';

export default class DesignerConsole extends Panel {

  public constructor(contraption: Contraption) {
    super({
      pose: { x: 0, y: 0, a: 0 },
      width: 1,
      height: 1,
      style: {},
      label: {},
      image: {},
    });
    this.appendChild(ToolButtonPanel);
    this.appendChild(DigitalCircuitPanel, {
      x: 400,
      y: 340,
      width: 800,
      height: 560,
      inputs: contraption.inputs,
      outputs: contraption.outputs,
    });
  }

}
