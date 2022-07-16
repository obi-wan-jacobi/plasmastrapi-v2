import InputHandler from 'app/abstracts/InputHandler';
import { COMPONENTS } from 'engine/concretes/ComponentMaster';
import { IPoint } from 'foundation/geometry/components/PoseComponent';
import { entityContainsPoint } from 'foundation/helpers/entities';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';
import IHTML5CanvasElement from 'html5-canvas/interfaces/IHTML5CanvasElement';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';

export default class DefaultTool extends InputHandler {

  public init(): void {}

  [MOUSE_EVENT.MOUSE_DOWN](event: IMouseEvent): void {
    triggerMouseEventsOnClosestTarget({ event });
  }

  [MOUSE_EVENT.MOUSE_UP](event: IMouseEvent): void {
    triggerMouseEventsOnClosestTarget({ event });
  }

  [MOUSE_EVENT.CLICK](event: IMouseEvent): void {
    triggerMouseEventsOnClosestTarget({ event });
  }

  [MOUSE_EVENT.MOUSE_MOVE](event: IMouseEvent): void {
    triggerMouseEventsOnClosestTarget({ event });
  }

  public dispose(): void {}

}

export const triggerMouseEventsOnClosestTarget = ({ event }: { event: IMouseEvent  }): IHTML5CanvasElement | undefined => {
  COMPONENTS.forEvery(MouseComponent)((mouse) => {
    patchIsHovered({ mouse, event });
  });
  const element = getClosestTarget({ ...event });
  if (!element) {
    return;
  }
  const { isHovered } = element.$copy(MouseComponent)!;
  // hovered
  if (isHovered) {
    (element as any)[event.name](event);
    return element;
  }
  element.$patch(MouseComponent, {
    isHovered: true,
  });
  (element as IHTML5CanvasElement)[MOUSE_EVENT.MOUSE_ENTER](event);
  (element as any)[event.name](event);
  return element;
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
  if (!entityContainsPoint(mouse.$entity as IHTML5CanvasElement, event)) {
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

export const getClosestTarget = ({ x, y }: IPoint): IHTML5CanvasElement | undefined => {
  const zOrdered = COMPONENTS.toArray(MouseComponent).map((c) => c.$entity as HTML5CanvasElement)
    .sort((a, b) => {
      const aZIndex = a.$copy(StyleComponent)?.zIndex;
      const bZIndex = b.$copy(StyleComponent)?.zIndex;
      return (bZIndex || -1) - (aZIndex || -1);
    });
  for(const element of zOrdered) {
    if (entityContainsPoint(element, { x, y })) {
      return element;
    }
  }
  return;
};