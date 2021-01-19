import UIButton from '../../../ui/UIButton';
import Tool from '../tools/Tool';
import { Constructor } from 'foundation/types';

export default class ToolButton extends UIButton {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private __Tool: Constructor<Tool, {}>;

  public constructor({ ToolCtor }: { x: number; y: number; src: string; ToolCtor: Constructor<Tool, {}> }) {
    super(arguments[0]);
    this.__Tool = ToolCtor;
  }

  public $click(): void {
    // this.$appendChild(this.__Tool);
  }
}
