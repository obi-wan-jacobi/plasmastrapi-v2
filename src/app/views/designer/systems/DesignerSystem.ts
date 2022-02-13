import System from 'engine/abstracts/System';
import IPipe from 'engine/interfaces/IPipe';
import IPipeEvent from 'engine/interfaces/IPipeEvent';
import IKeyboardEvent from 'html5-canvas/interfaces/IKeyboardEvent';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import ToolController from '../controllers/ToolController';

export default class DesignerSystem<TPipes extends { mouse: IPipe<IMouseEvent>; keyboard: IPipe<IKeyboardEvent>; designer: IPipe<IPipeEvent> }> extends System<TPipes> {

  private __controller = new ToolController();

  public once({ pipes }: { pipes: TPipes }): void {
    const mouseEvent = pipes.mouse.event;
    const keyboardEvent = pipes.keyboard.event;
    const designerEvent = pipes.designer.event;
    this.__controller.handleEvents({ mouseEvent, keyboardEvent, designerEvent });
  }

}

