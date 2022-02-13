import { Dict, Fn } from 'base/types';
import IPipeEvent from 'engine/interfaces/IPipeEvent';
import IKeyboardEvent from 'html5-canvas/interfaces/IKeyboardEvent';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import { DESIGNER_EVENT } from '../enums/DESIGNER_EVENT';
import IDesignerTool from '../interfaces/IDesignerTool';
import CreatorTool from '../tools/CreatorTool';
import DefaultTool from '../tools/DefaultTool';

export default class ToolController {

  private __prevDefinedMouseEvent?: IMouseEvent;
  private __isDesignPaletteHovered = false;
  private __tool?: IDesignerTool<any>;

  private __equip<T>(tool: IDesignerTool<T>) {
    if (this.__tool) {
      this.__tool.dispose();
    }
    this.__tool = tool;
    this.__tool.equip();
  }

  private __fromDesignerEventToFnMap: Dict<Fn<{ mouseEvent?: IMouseEvent; designerEvent: IPipeEvent }, void>> = {
    [DESIGNER_EVENT.ENABLE]: (): void => {
      this.__isDesignPaletteHovered = true;
      if (this.__tool) {
        this.__tool.isDesignerPaletteHovered = true;
      }
    },
    [DESIGNER_EVENT.DISABLE]: (): void => {
      this.__isDesignPaletteHovered = false;
      if (this.__tool) {
        this.__tool.isDesignerPaletteHovered = false;
      }
    },
    [DESIGNER_EVENT.CREATE_MODE]: ({ mouseEvent, designerEvent }: { mouseEvent: IMouseEvent; designerEvent: IPipeEvent }): void => {
      this.__equip(new CreatorTool({
        initiator: designerEvent.target!,
        mouseEvent,
        isDesignPaletteHovered: this.__isDesignPaletteHovered,
      }));
    },
  };

  public handleEvents({ mouseEvent, keyboardEvent, designerEvent }: { mouseEvent?: IMouseEvent; keyboardEvent?: IKeyboardEvent; designerEvent?: IPipeEvent }): void {
    if (keyboardEvent) {
      console.log(keyboardEvent.name + keyboardEvent.key);
    }
    if (!this.__tool || (this.__tool && this.__tool.isDisposed)) {
      this.__equip(new DefaultTool({ isDesignPaletteHovered: this.__isDesignPaletteHovered }));
    }
    if (designerEvent && this.__fromDesignerEventToFnMap[designerEvent.name]) {
      this.__fromDesignerEventToFnMap[designerEvent.name]({
        mouseEvent: mouseEvent || this.__prevDefinedMouseEvent,
        designerEvent,
      });
    }
    if (designerEvent && this.__tool && this.__tool[designerEvent.name]) {
      this.__tool[designerEvent.name]({ designerEvent });
    }
    if (mouseEvent && this.__tool && this.__tool[mouseEvent.name]) {
      this.__tool[mouseEvent.name]({ mouseEvent, keyboardEvent });
    }
    if (mouseEvent) {
      this.__prevDefinedMouseEvent = mouseEvent;
    }
    if (keyboardEvent && this.__tool && this.__tool[keyboardEvent.name]) {
      this.__tool[keyboardEvent.name]({ keyboardEvent });
    }
  }

}
