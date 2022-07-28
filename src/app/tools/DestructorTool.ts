import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import SelectionBox from './SelectionBox';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import InputHandler from 'app/abstracts/InputHandler';
import EVENT_BUS from 'app/EVENT_BUS';
import { TOOL_EVENT } from 'app/enums/TOOL_EVENT';
import { RGBA_RED } from 'app/ui/COLOUR';
import DigitalElement from 'digital-logic/abstracts/DigitalElement';
import { getClosestTarget } from './DefaultTool';
import { app } from 'app/main';
import DestroyDigitalElementsCommand from 'app/commands/DestroyDigitalElementsCommand';

export default class DestructorTool extends InputHandler {

  private __selectionBox?: SelectionBox<DigitalElement>;

  public init(): void {}

  public dispose(): void {
    this.__selectionBox?.$destroy();
  }

  public [MOUSE_EVENT.MOUSE_MOVE](mouseEvent: IMouseEvent): void {
    this.__selectionBox?.stretchTo(mouseEvent);
  }

  public [MOUSE_EVENT.MOUSE_DOWN](mouseEvent: IMouseEvent): void {
    this.__selectionBox = new SelectionBox({ x: mouseEvent.x, y: mouseEvent.y, SelectionType: DigitalElement });
    this.__selectionBox.$patch(StyleComponent, { colour: RGBA_RED });
  }

  public [MOUSE_EVENT.MOUSE_UP](event: IMouseEvent): void {
    if (this.__selectionBox?.items.size) {
      const targets = [...this.__selectionBox?.items];
      app.controllers.command.invoke(new DestroyDigitalElementsCommand(targets));
    }
    else {
      const target = getClosestTarget(event);
      if (target instanceof DigitalElement) {
        app.controllers.command.invoke(new DestroyDigitalElementsCommand([target]));
      }
    }
    EVENT_BUS.publish({ topic: TOOL_EVENT.DEFAULT});
  }
}
