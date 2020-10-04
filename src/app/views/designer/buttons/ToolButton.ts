import Button from '../../../ui/Button';
import { Constructor } from '../../../../foundation/types';
import Tool from '../tools/Tool';

export default class ToolButton extends Button {

  // tslint:disable-next-line:naming-convention
  private __Tool: Constructor<Tool, {}>;

  public constructor({ x, y, src, ToolCtor }: { x: number, y: number, src: string, ToolCtor: Constructor<Tool, {}> }) {
    super(arguments[0]);
    this.__Tool = ToolCtor;
  }

  public $click(): void {
    this.$master.entities.create(this.__Tool);
  }
}