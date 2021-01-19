import InputTerminal from '../../../digital-logic/entities/InputTerminal';
import OutputTerminal from '../../../digital-logic/entities/OutputTerminal';
import Panel from '../../../ui/UIPanel';
import PoseComponent from '../../../../framework/geometry/components/PoseComponent';
import PowerSupply from '../../../digital-logic/entities/PowerSupply';
import ShapeComponent from '../../../../framework/geometry/components/ShapeComponent';
import IEntityTemplateOverlay from 'app/ui/interfaces/IEntityTemplateOverlay';

export default class DigitalCircuitPanel extends Panel {

  private __inputs: InputTerminal[] = [];
  private __outputs: OutputTerminal[] = [];

  public constructor({ inputs, outputs }: IEntityTemplateOverlay & { inputs: InputTerminal[]; outputs: OutputTerminal[] }) {
    super(arguments[0]);
    this.__inputs = inputs;
    this.__outputs = outputs;
    this.__init();
  }

  private __init(): void {
    this.__initPowerSupply();
    this.__initInputs();
    this.__initOutputs();
  }

  private __initPowerSupply(): void {
    const pose = this.$copy(PoseComponent);
    const { width, height } = this.$copy(ShapeComponent)
      .vertices.map((p) => ({ width: 2 * p.x, height: 2 * p.y }))[0];
    this.$appendChild(new PowerSupply({ pose: {
      x: pose.x - width / 2 + 20,
      y: pose.y + height / 2 - 30,
      a: 0,
    }}));
  }

  private __initInputs(): void {
    const pose = this.$copy(PoseComponent);
    const { width, height } = this.$copy(ShapeComponent)
      .vertices.map((p) => ({ width: 2 * p.x, height: 2 * p.y }))[0];
    const horizontalSpacer = width / 4;
    const verticalSpacer = 20;
    let cursor = 1;
    let row = 1;
    for (const input of this.__inputs) {
      input.$mutate(PoseComponent)({
        x: pose.x - width / 2 + cursor * horizontalSpacer - 50,
        y: pose.y - height / 2 + row * verticalSpacer,
        a: 0,
      });
      cursor++;
      if (cursor % 4 === 0) {
        cursor = 1;
        row++;
      }
    }
  }

  private __initOutputs(): void {
    const pose = this.$copy(PoseComponent);
    const { width, height } = this.$copy(ShapeComponent)
      .vertices.map((p) => ({ width: 2 * p.x, height: 2 * p.y }))[0];
    const horizontalSpacer = width / 4;
    const verticalSpacer = 20;
    let cursor = 1;
    let row = 1;
    for (const output of this.__outputs) {
      output.$mutate(PoseComponent)({
        x: pose.x - width / 2 + cursor * horizontalSpacer - 50,
        y: pose.y + height / 2 - row * verticalSpacer,
        a: 0,
      });
      cursor++;
      if (cursor % 4 === 0) {
        cursor = 1;
        row++;
      }
    }
  }
}
