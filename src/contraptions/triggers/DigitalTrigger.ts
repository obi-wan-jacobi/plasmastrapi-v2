import DigitalElement from 'app/abstracts/DigitalElement';
import IComponent from 'engine/interfaces/IComponent';
import { Ctor } from 'engine/types';
import Trigger from './Trigger';

export default abstract class DigitalTrigger<TPatch> extends Trigger {

  protected _inputs: DigitalElement[];
  protected _patchOnHigh: TPatch | any;
  protected _patchOnLow: TPatch | any;
  protected _patchOnOff: TPatch | any;

  public constructor({ inputs, high, low, off }: { inputs: DigitalElement[]; high?: TPatch | any; low?: TPatch | any; off?: TPatch | any }) {
    super();
    this._inputs = inputs;
    this._patchOnHigh = high;
    this._patchOnLow = low;
    this._patchOnOff = off;
  }

  public invoke(): void {
    if (!this.$parent) {
      throw new Error(`${this.constructor.name} has no parent!`);
    }
    if (this._patchOnHigh && this._inputs.filter((input) => input.isHigh).length === this._inputs.length) {
      this.$parent.$patch(this._getComponentToPatch(), this._patchOnHigh);
      return;
    }
    if (this._patchOnLow && this._inputs.filter((input) => input.isLow).length === this._inputs.length) {
      this.$parent.$patch(this._getComponentToPatch(), this._patchOnLow);
      return;
    }
    if (this._patchOnOff && this._inputs.filter((input) => input.isOff).length === this._inputs.length) {
      this.$parent.$patch(this._getComponentToPatch(), this._patchOnOff);
      return;
    }
  }

  protected abstract _getComponentToPatch(): Ctor<IComponent<TPatch>, TPatch>;

}