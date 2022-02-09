import { Dict, Fn } from 'base/types';
import System from 'engine/abstracts/System';
import IPipe from 'engine/interfaces/IPipe';
import IPipeEvent from 'engine/interfaces/IPipeEvent';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import { DESIGNER_EVENT } from '../enums/DESIGNER_EVENT';
import IDesignerTool from '../interfaces/IDesignerTool';
import CreatorTool from '../tools/CreatorTool';

export default class DesignerSystem<TPipes extends { mouse: IPipe<IMouseEvent>; designer: IPipe<IPipeEvent> }> extends System<TPipes> {

  private __controller = new ToolController();

  public once({ pipes }: { pipes: TPipes }): void {
    const mouseEvent = pipes.mouse.event;
    const designerEvent = pipes.designer.event;
    this.__controller.handleEvents({ mouseEvent, designerEvent });
  }

}

class ToolController {

  private __prevDefinedMouseEvent?: IMouseEvent;
  private __isDesignPaletteHovered = false;
  private __tool?: IDesignerTool<any>;

  private __equip<T>(tool: IDesignerTool<T>) {
    if (this.__tool) {
      this.__tool.dispose();
    }
    this.__tool = tool;
    if (this.__tool) {
      this.__tool.equip();
    }
  }

  private __fromDesignerEventToFnMap: Dict<Fn<{ mouseEvent?: IMouseEvent; designerEvent: IPipeEvent }, void>> = {
    [DESIGNER_EVENT.ENABLE]: (): void => {
      this.__isDesignPaletteHovered = true;
    },
    [DESIGNER_EVENT.DISABLE]: (): void => {
      this.__isDesignPaletteHovered = false;
    },
    [DESIGNER_EVENT.CREATE_MODE]: ({ mouseEvent, designerEvent }: { mouseEvent: IMouseEvent; designerEvent: IPipeEvent }): void => {
      this.__equip(new CreatorTool({
        initiator: designerEvent.target,
        mouseEvent,
        isDesignPaletteHovered: this.__isDesignPaletteHovered,
      }));
    },
  };

  public handleEvents({ mouseEvent, designerEvent }: { mouseEvent?: IMouseEvent; designerEvent?: IPipeEvent }) {
    if (this.__tool && this.__tool.isDisposed) {
      this.__tool = undefined;
    }
    if (designerEvent && this.__fromDesignerEventToFnMap[designerEvent.name]) {
      this.__fromDesignerEventToFnMap[designerEvent.name]({
        mouseEvent: mouseEvent || this.__prevDefinedMouseEvent,
        designerEvent,
      });
    }
    if (mouseEvent && this.__tool && this.__tool[mouseEvent.name]) {
      this.__tool[mouseEvent.name]({ mouseEvent });
    }
    if (mouseEvent) {
      this.__prevDefinedMouseEvent = mouseEvent;
    }
  }

}
