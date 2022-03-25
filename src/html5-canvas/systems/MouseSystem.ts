import System from 'engine/abstracts/System';
import { entityContainsPoint } from '../../foundation/helpers/entities';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import IPipe from 'engine/interfaces/IPipe';
import IComponentMaster from 'engine/interfaces/IComponentMaster';
import MouseComponent from '../components/MouseComponent';
import IHTML5CanvasElement from 'html5-canvas/interfaces/IHTML5CanvasElement';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';

export default class MouseSystem<TPipes extends { mouse: IPipe<IMouseEvent> }> extends System<TPipes> {

  public once({ components, pipes }: { components: IComponentMaster; pipes: TPipes }): void {
    const event = pipes.mouse.event;
    if (!event) {
      return;
    }
    const unordered = new Array<HTML5CanvasElement>();
    components.forEvery(MouseComponent)((mouse) => {
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
  }
}

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