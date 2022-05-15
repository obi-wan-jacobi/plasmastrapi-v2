import Gate from 'app/abstracts/Gate';
import InputTerminal from 'app/gates/InputTerminal';
import IComponent from 'engine/interfaces/IComponent';
import { Ctor } from 'engine/types';
import Rule from './Rule';

export default abstract class DigitalRule<TPatch> extends Rule {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  protected _ComponentToPatch: Ctor<IComponent<TPatch>, TPatch>;

  private __inputs: InputTerminal[];
  private __patchOnHigh: TPatch | any;
  private __patchOnLow: TPatch | any;
  private __patchOnOff: TPatch | any;

  public constructor({ inputs, high, low, off }: { inputs: InputTerminal[]; high?: TPatch | any; low?: TPatch | any; off?: TPatch | any }) {
    super();
    this.__inputs = inputs;
    this.__patchOnHigh = high;
    this.__patchOnLow = low;
    this.__patchOnOff = off;
    this._initComponentToPatch();
  }

  public invoke(): void {
    if (!this.$parent) {
      throw new Error(`${this.constructor.name} has no parent!`);
    }
    if (this.__patchOnHigh && this.__inputs.filter((input) => (input.$parent as Gate).isHigh).length === this.__inputs.length) {
      this.$parent.$patch(this._ComponentToPatch)(this.__patchOnHigh);
      return;
    }
    if (this.__patchOnLow && this.__inputs.filter((input) => (input.$parent as Gate).isLow).length === this.__inputs.length) {
      this.$parent.$patch(this._ComponentToPatch)(this.__patchOnLow);
      return;
    }
    if (this.__patchOnOff && this.__inputs.filter((input) => (input.$parent as Gate).isOff).length === this.__inputs.length) {
      this.$parent.$patch(this._ComponentToPatch)(this.__patchOnOff);
      return;
    }
  }

  protected abstract _initComponentToPatch(): void;

}