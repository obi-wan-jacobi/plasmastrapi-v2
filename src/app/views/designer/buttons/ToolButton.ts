import Button from '../../../ui/Button';
import { Ctor } from '../../../../data-structures/types';
import Tool from '../tools/Tool';

export default class ToolButton extends Button {

  // tslint:disable-next-line:naming-convention
  private __Tool: Ctor<Tool, {}>;

  public constructor({ x, y, src, ToolCtor }: { x: number, y: number, src: string, ToolCtor: Ctor<Tool, {}> }) {
    super(arguments[0]);
    this.__Tool = ToolCtor;
  }

  public $click(): void {
    this.$engine.entities.create(this.__Tool);
  }
}