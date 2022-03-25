import InputHandler from 'app/abstracts/InputHandler';
import { COMPONENTS } from 'engine/concretes/ComponentMaster';
import { entityContainsPoint } from 'foundation/helpers/entities';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';
import IHTML5CanvasElement from 'html5-canvas/interfaces/IHTML5CanvasElement';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';

export default class DefaultTool extends InputHandler {

  [MOUSE_EVENT.MOUSE_DOWN](event: IMouseEvent): void {
    triggerEventsOnClosestTarget({ event });
  }

  [MOUSE_EVENT.MOUSE_UP](event: IMouseEvent): void {
    triggerEventsOnClosestTarget({ event });
  }

  [MOUSE_EVENT.CLICK](event: IMouseEvent): void {
    triggerEventsOnClosestTarget({ event });
  }

  [MOUSE_EVENT.MOUSE_MOVE](event: IMouseEvent): void {
    triggerEventsOnClosestTarget({ event });
  }

  public dispose(): void {}

}

export const triggerEventsOnClosestTarget = ({ event }: { event: IMouseEvent  }): void => {
  const unordered = new Array<HTML5CanvasElement>();
  COMPONENTS.forEvery(MouseComponent)((mouse) => {
    patchIsHovered({ mouse, event });
    unordered.push(mouse.$entity as HTML5CanvasElement);
  });
  const zOrdered = unordered.sort((a, b) => {
    const aZIndex = a.$copy(StyleComponent)?.zIndex;
    const bZIndex = b.$copy(StyleComponent)?.zIndex;
    return (bZIndex || -1) - (aZIndex || -1);
  });
  for(const element of zOrdered) {
    const { isHovered } = element.$copy(MouseComponent)!;
    // hovered
    if (entityContainsPoint(element, event)) {
      if (isHovered) {
        (element as any)[event.name](event);
        break;
      }
      element.$patch(MouseComponent)({
        isHovered: true,
      });
      (element as IHTML5CanvasElement)[MOUSE_EVENT.MOUSE_ENTER](event);
      (element as any)[event.name](event);
      break;
    }
  }
};

const patchIsHovered = ({ mouse, event }: {
  mouse: MouseComponent;
  event: IMouseEvent;
}): void => {
  mouse.patch({
    x: event.x,
    y: event.y,
  });
  const { isHovered } = mouse.copy();
  if (!entityContainsPoint(mouse.$entity, event)) {
    // no longer hovered
    if (isHovered) {
      mouse.patch({
        isHovered: false,
      });
      (mouse.$entity as IHTML5CanvasElement)[MOUSE_EVENT.MOUSE_LEAVE](event);
      return;
    }
  }
};