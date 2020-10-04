import Panel from '../../../ui/Panel';
import InputTerminal from '../../../digital-logic/entities/InputTerminal';
import PoseComponent from '../../../../framework/geometry/components/PoseComponent';
import ShapeComponent from '../../../../framework/geometry/components/ShapeComponent';
import OutputTerminal from '../../../digital-logic/entities/OutputTerminal';
import PowerSupply from '../../../digital-logic/entities/PowerSupply';

export default class DigitalCircuitPanel extends Panel {

  private __inputs: InputTerminal[] = [];
  private __outputs: OutputTerminal[] = [];

  public constructor({ x, y, width, height, inputs, outputs }: {
    x: number, y: number, width: number, height: number, inputs: InputTerminal[], outputs: OutputTerminal[],
  }) {
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
      .points.map((p) => ({ width: 2 * p.x, height: 2 * p.y }))[0];
    this.add(PowerSupply, {
      x: pose.x - width / 2 + 20,
      y: pose.y + height / 2 - 30,
    });
  }

  private __initInputs(): void {
    const pose = this.$copy(PoseComponent);
    const { width, height } = this.$copy(ShapeComponent)
      .points.map((p) => ({ width: 2 * p.x, height: 2 * p.y }))[0];
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
      .points.map((p) => ({ width: 2 * p.x, height: 2 * p.y }))[0];
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