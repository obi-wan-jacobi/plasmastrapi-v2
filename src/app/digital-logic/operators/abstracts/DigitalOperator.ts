import IDigitalOperator from '../interfaces/IDigitalOperator';
import { STATE } from '../../enums/STATE';
import Unique from 'src/data-structures/abstracts/Unique';
import Dictionary from 'src/data-structures/concretes/Dictionary';
import IDictionary from 'src/data-structures/interfaces/IDictionary';

export default abstract class DigitalOperator extends Unique implements IDigitalOperator {

  protected _inputs: IDictionary<IDigitalOperator> = new Dictionary();
  private __outputs: IDictionary<IDigitalOperator> = new Dictionary();
  private __state: STATE = STATE.OFF;

  public get isHigh(): boolean {
    return this.__state === STATE.HIGH;
  }

  public get isLow(): boolean {
    return this.__state === STATE.LOW;
  }

  public get isOff(): boolean {
    return this.__state === STATE.OFF;
  }

  public high(): void {
    this.__state = STATE.HIGH;
  }

  public low(): void {
    this.__state = STATE.LOW;
  }

  public off(): void {
    this.__state = STATE.OFF;
  }

  public to(target: IDigitalOperator): void {
    if (this.__outputs.read(target.id)) {
      return;
    }
    this.__outputs.write({ key: target.id, value: target });
    target.from(this);
  }

  public from(target: IDigitalOperator): void {
    this._inputs.write({ key: target.id, value: target });
    target.to(this);
  }

  public detach(target: IDigitalOperator): void {
    if (!this._inputs.read(target.id) && !this.__outputs.read(target.id)) {
      return;
    }
    this._inputs.delete(target.id);
    this.__outputs.delete(target.id);
    target.detach(this);
  }

  public abstract compute(): void;

  public dispose(): void {
    this._inputs.forEach((source) => source.detach(this));
    this.__outputs.forEach((target) => target.detach(this));
  }
}
