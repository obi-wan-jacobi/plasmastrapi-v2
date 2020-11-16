import LabelComponent from '../../../framework/presentation/components/LabelComponent';
import MachinePart from './abstracts/MachinePart';
import OutputTerminal from '../../digital-logic/entities/OutputTerminal';
import StyleComponent from '../../../framework/presentation/components/StyleComponent';
import TouchActivator from './TouchActivator';
import IEntityTemplate from 'app/IEntityTemplate';
import { entitiesTouch } from '../../../framework/helpers/entities';

export default class Sensor extends MachinePart {

  public output: OutputTerminal;

  public constructor({ pose, shape, label }: IEntityTemplate) {
    super(arguments[0]);
    this.output = this._$master.create(OutputTerminal, { x: 0, y: 0 });
    this.output.$add(LabelComponent)({
      text: label!.text,
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
    const target = this._$master.find(TouchActivator)((activator) => {
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
