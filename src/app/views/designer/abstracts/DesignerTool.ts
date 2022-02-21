import IPipeEvent from 'engine/interfaces/IPipeEvent';
import IKeyboardEvent from 'html5-canvas/interfaces/IKeyboardEvent';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import IDesignerTool from '../interfaces/IDesignerTool';

export default abstract class DesignerTool implements IDesignerTool {
  [key: string]: any;

  private __isDisposed = false;

  public get isDisposed(): boolean {
    return this.__isDisposed;
  }

  public equip({ mouseEvent, keyboardEvent, designerEvent }: { mouseEvent?: IMouseEvent; keyboardEvent?: IKeyboardEvent; designerEvent?: IPipeEvent }): void {
    console.log(`Equip ${this.constructor.name}`);
  }

  public dispose(): void {
    this.__isDisposed = true;
    console.log(`Dispose ${this.constructor.name}`);
  }

}