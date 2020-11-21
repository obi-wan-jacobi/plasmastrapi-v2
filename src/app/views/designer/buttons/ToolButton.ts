import Button from '../../../ui/Button';
import Tool from '../tools/Tool';
import { Constructor } from 'foundation/types';

export default class ToolButton extends Button {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private __Tool: Constructor<Tool, {}>;

  public constructor({ ToolCtor }: { x: number; y: number; src: string; ToolCtor: Constructor<Tool, {}> }) {
    super(arguments[0]);
    this.__Tool = ToolCtor;
  }

  public $click(): void {
    this._$master.create(this.__Tool);
  }
}
