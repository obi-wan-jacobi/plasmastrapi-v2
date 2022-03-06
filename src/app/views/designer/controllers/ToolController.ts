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
import WireCutterTool from '../tools/WireCutterTool';
import WireTool from '../tools/WireTool';

export default class ToolController {

  private __lastDefinedMouseEvent?: IMouseEvent;
  private __lastDefinedKeyboardEvent?: IKeyboardEvent;
  private __tool: IDesignerTool;
  private __fromDesignerEventToDesignerTool: Dict<Constructor<IDesignerTool, any>> = {
    [DESIGNER_EVENT.CREATE_MODE]: CreatorTool,
    [DESIGNER_EVENT.DELETE_MODE]: DestructorTool,
    [DESIGNER_EVENT.SELECTION_MODE]: SelectorTool,
    [DESIGNER_EVENT.MOVER_MODE]: MoverTool,
    [DESIGNER_EVENT.WIRING_MODE]: WireTool,
    [DESIGNER_EVENT.CUTTER_MODE]: WireCutterTool,
  };

  public handleEvents({ mouseEvent, keyboardEvent, designerEvent }: { mouseEvent?: IMouseEvent; keyboardEvent?: IKeyboardEvent; designerEvent?: IPipeEvent }): void {
    this.__lastDefinedKeyboardEvent = keyboardEvent || this.__lastDefinedKeyboardEvent;
    this.__lastDefinedMouseEvent = mouseEvent || this.__lastDefinedMouseEvent;
    const payload = {
      mouseEvent: mouseEvent || this.__lastDefinedMouseEvent,
      keyboardEvent: keyboardEvent || this.__lastDefinedKeyboardEvent,
      designerEvent,
    };
    if (designerEvent && this.__fromDesignerEventToDesignerTool[designerEvent.name] && (designerEvent.name !== DESIGNER_EVENT.SELECTION_MODE || this.__tool instanceof DefaultTool)) {
      this.__tool.dispose();
      this.__equipTool({
        ToolConstructor: this.__fromDesignerEventToDesignerTool[designerEvent.name],
        payload,
      });
      console.log(designerEvent.name);
    }
    this.__handleEvent({ event: designerEvent, payload });
    this.__handleEvent({ event: mouseEvent, payload });
    this.__handleEvent({ event: keyboardEvent, payload });
    if (!this.__tool || this.__tool.isDisposed) {
      this.__equipTool({ ToolConstructor: DefaultTool, payload });
    }
  }

  private __equipTool<T extends IDesignerTool>({ ToolConstructor, payload }: { ToolConstructor: Constructor<T, void>; payload: { mouseEvent?: IMouseEvent; keyboardEvent?: IKeyboardEvent; designerEvent?: IPipeEvent }}) {
    this.__tool = new ToolConstructor();
    this.__tool.equip({
      mouseEvent: payload.mouseEvent || this.__lastDefinedMouseEvent,
      keyboardEvent: payload.keyboardEvent || this.__lastDefinedKeyboardEvent,
      designerEvent: payload.designerEvent,
    });
  }

  private __handleEvent({ event, payload }: { event?: IPipeEvent; payload: { mouseEvent?: IMouseEvent; keyboardEvent?: IKeyboardEvent; designerEvent?: IPipeEvent }}) {
    if (this.__tool && event && this.__tool[event.name]) {
      this.__tool[event.name](payload);
    }
  }

}
