import { Constructor, Dict } from 'base/types';
import IPipeEvent from 'engine/interfaces/IPipeEvent';
import IKeyboardEvent from 'html5-canvas/interfaces/IKeyboardEvent';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import { DESIGNER_EVENT } from '../enums/DESIGNER_EVENT';
import IDesignerTool from '../interfaces/IDesignerTool';
import CreatorTool from '../tools/CreatorTool';
import DefaultTool from '../tools/DefaultTool';
import DestructorTool from '../tools/DestructorTool';
import MoverTool from '../tools/MoverTool';
import SelectorTool from '../tools/SelectorTool';

export default class ToolController {

  private __lastDefinedMouseEvent?: IMouseEvent;
  private __lastDefinedKeyboardEvent?: IKeyboardEvent;
  private __tool: IDesignerTool;
  private __fromDesignerEventToDesignerTool: Dict<Constructor<IDesignerTool, any>> = {
    [DESIGNER_EVENT.CREATE_MODE]: CreatorTool,
    [DESIGNER_EVENT.DELETE_MODE]: DestructorTool,
    [DESIGNER_EVENT.SELECTION_MODE]: SelectorTool,
    [DESIGNER_EVENT.MOVER_MODE]: MoverTool,
  };

  public handleEvents({ mouseEvent, keyboardEvent, designerEvent }: { mouseEvent?: IMouseEvent; keyboardEvent?: IKeyboardEvent; designerEvent?: IPipeEvent }): void {
    if (keyboardEvent) {
      this.__lastDefinedKeyboardEvent = keyboardEvent;
      // console.log(keyboardEvent);
    }
    if (mouseEvent) {
      this.__lastDefinedMouseEvent = mouseEvent;
      // console.log(mouseEvent.name);
    }
    if (designerEvent && this.__fromDesignerEventToDesignerTool[designerEvent.name]) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const ToolConstructor = this.__fromDesignerEventToDesignerTool[designerEvent.name];
      this.__tool.dispose();
      this.__tool = new ToolConstructor({});
      this.__tool.equip({
        mouseEvent: mouseEvent || this.__lastDefinedMouseEvent,
        keyboardEvent: keyboardEvent || this.__lastDefinedKeyboardEvent,
      });
      console.log(designerEvent.name);
    }
    if (designerEvent && this.__tool[designerEvent.name]) {
      this.__tool[designerEvent.name]({
        mouseEvent: mouseEvent || this.__lastDefinedMouseEvent,
        keyboardEvent: keyboardEvent || this.__lastDefinedKeyboardEvent,
        designerEvent,
      });
    }
    if (mouseEvent && this.__tool[mouseEvent.name]) {
      this.__tool[mouseEvent.name]({
        mouseEvent: mouseEvent || this.__lastDefinedMouseEvent,
        keyboardEvent: keyboardEvent || this.__lastDefinedKeyboardEvent,
      });
    }
    if (keyboardEvent && this.__tool[keyboardEvent.name]) {
      this.__tool[keyboardEvent.name]({
        mouseEvent: mouseEvent || this.__lastDefinedMouseEvent,
        keyboardEvent: keyboardEvent || this.__lastDefinedKeyboardEvent,
      });
    }
    if (!this.__tool || this.__tool.isDisposed) {
      this.__tool = new DefaultTool();
      this.__tool.equip({
        mouseEvent: mouseEvent || this.__lastDefinedMouseEvent,
        keyboardEvent: keyboardEvent || this.__lastDefinedKeyboardEvent,
      });
    }
  }

}
