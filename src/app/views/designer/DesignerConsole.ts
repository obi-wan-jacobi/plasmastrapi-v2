import Contraption from '../../contraptions/abstracts/Contraption';
import DigitalCircuitPanel from './panels/DigitalCircuitPanel';
import Panel from '../../ui/UIPanel';

export default class DesignerConsole extends Panel {

  public constructor({ contraption }: { contraption: Contraption }) {
    super(arguments[0]);
    // this.$appendChild(new ToolButtonPanel());
    this.$appendChild(new DigitalCircuitPanel({
      pose: { x: 400, y: 340, a: 0 },
      shape: { width: 800, height: 560 },
      inputs: contraption.inputs,
      outputs: contraption.outputs,
    }));
  }

}
