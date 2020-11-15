import Button from '../../../ui/Button';
import Tool from '../tools/Tool';
import IAdaptedMouseEvent from 'engine/interfaces/IAdaptedMouseEvent';
import { Constructor } from 'foundation/types';

export default class ToolButton extends Button {

  private __Tool: Constructor<Tool, {}>;

  public constructor({ x, y, src, ToolCtor }: { x: number; y: number; src: string; ToolCtor: Constructor<Tool, {}> }) {
    super(arguments[0]);
    this.__Tool = ToolCtor;
  }

  public $click(e: IAdaptedMouseEvent): void {
    this._$master.create(this.__Tool);
  }
}
