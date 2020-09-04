import MachinePart from './abstracts/MachinePart';
import OutputTerminal from '../../digital-logic/entities/OutputTerminal';
import { IShape } from '../../../framework/geometry/components/ShapeComponent';
import { LabelComponent } from '../../../framework/presentation/components/LabelComponent';
import { StyleComponent } from '../../../framework/presentation/components/StyleComponent';
import { TouchActivator } from './TouchActivator';
import { entitiesTouch } from '../../../framework/helpers/entities';

export default class Sensor extends MachinePart {

  public output: OutputTerminal;

  public constructor({ x, y, shape, label }: { x: number, y: number, shape: IShape, label: string }) {
    super(arguments[0]);
    this.output = this.$engine.entities.create(OutputTerminal, { x: 0, y: 0 });
    this.output.$add(LabelComponent)({
      text: label,
      fontSize: 20,
      offset: { x: 15, y: 7 },
    });
    this.output.$add(StyleComponent)({ colour: 'WHITE' });
  }

  public get isHigh(): boolean {
    return this.output.isHigh;
  }

  public get isLow(): boolean {
    return this.output.isLow;
  }

  public get isOff(): boolean {
    return this.output.isOff;
  }

  public once(): void {
    const target = this.$engine.entities.first(TouchActivator)((activator) => {
      return entitiesTouch(this, activator);
    });
    if (target) {
      this.output.high();
    } else {
      this.output.low();
    }
  }

  public $destroy(): void {
    super.$destroy();
    this.output.$destroy();
  }
}