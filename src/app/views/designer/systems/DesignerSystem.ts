import { Dict, Fn } from 'base/types';
import System from 'engine/abstracts/System';
import IPipe from 'engine/interfaces/IPipe';
import IPipeEvent from 'engine/interfaces/IPipeEvent';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import { DESIGNER_EVENT } from '../enums/DESIGNER_EVENT';
import DefaultTool from '../tools/DefaultTool';

export default class DesignerSystem<TPipes extends { mouse: IPipe<IMouseEvent>; designer: IPipe<IPipeEvent> }> extends System<TPipes> {

  private __controller = new ToolController();

  public once({ pipes }: { pipes: TPipes }): void {
    const mouseEvent = pipes.mouse.event;
    const designerEvent = pipes.designer.event;
    this.__controller.handleEvents({ mouseEvent, designerEvent });
  }

}

class ToolController {

  private __isPaletteHovered = false;
  private __tool?: DefaultTool;

  private __fromDesignerEventToFnMap: Dict<Fn<{ designerEvent: IPipeEvent }, void>> = {
    [DESIGNER_EVENT.ENABLE]: (): void => {
      this.__isPaletteHovered = true;
      this.__tool = new DefaultTool();
      console.log('enable');
    },
    [DESIGNER_EVENT.DISABLE]: (): void => {
      this.__isPaletteHovered = false;
      this.__tool = undefined;
      console.log('disable');
    },
  };

  public handleEvents({ mouseEvent, designerEvent }: { mouseEvent?: IMouseEvent; designerEvent?: IPipeEvent }) {
    if (designerEvent && this.__fromDesignerEventToFnMap[designerEvent.name]) {
      this.__fromDesignerEventToFnMap[designerEvent.name]({ designerEvent });
    }
    console.log(mouseEvent);
  }

}
