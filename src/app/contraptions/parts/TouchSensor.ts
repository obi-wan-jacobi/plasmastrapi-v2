import MachinePart from './abstracts/MachinePart';
import OutputTerminal from '../../digital-logic/entities/OutputTerminal';
import TouchActivator from './TouchActivator';
import { entitiesTouch } from '../../../framework/helpers/entities';
import IEntityTemplate from 'app/IEntityTemplate';

export default class TouchSensor extends MachinePart {

  public output: OutputTerminal;

  public constructor({ labelText }: IEntityTemplate & { labelText: string }) {
    super(arguments[0]);
    this.output = this._$master.create(OutputTerminal, { x: 0, y: 0, labelText });
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
