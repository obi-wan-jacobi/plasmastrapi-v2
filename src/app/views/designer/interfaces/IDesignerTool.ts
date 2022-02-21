import IDisposable from 'base/interfaces/IDisposable';
import { Dict } from 'base/types';
import IPipeEvent from 'engine/interfaces/IPipeEvent';
import IKeyboardEvent from 'html5-canvas/interfaces/IKeyboardEvent';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';

export default interface IDesignerTool extends IDisposable, Dict<any> {
  equip({ mouseEvent, keyboardEvent, designerEvent }: { mouseEvent?: IMouseEvent; keyboardEvent?: IKeyboardEvent; designerEvent?: IPipeEvent }): void;
}