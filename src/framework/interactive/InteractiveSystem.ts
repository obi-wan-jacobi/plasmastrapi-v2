import InteractiveComponent from './InteractiveComponent';
import System from 'engine/abstracts/System';
import IMouseEvent from 'engine/interfaces/IMouseEvent';
import { entityContainsPoint } from '../helpers/entities';
import { Dict, Void } from 'foundation/types';

export default class InteractiveSystem extends System {

  public once(): void {
    const event = this.$engine.events.mouse;
    if (!event) {
      return;
    }
    this.$engine.components.forEvery(InteractiveComponent)((interactive) => {
      const {
        transform,
        isEnabled, isHovered,
        mouseenter, mouseleave,
        mousemove, mousedown,
        mouseup, click,
      } = interactive.copy();
      // disabled
      if (transform === 'disable') {
        if (isHovered) {
          mouseleave(undefined);
        }
        interactive.patch({ isEnabled: false, isHovered: false });
        return;
      }
      // enabled
      if (transform === 'enable') {
        interactive.patch({ isEnabled: true });
      }
      else if (!isEnabled) {
        return;
      }
      // hovered
      if (entityContainsPoint(interactive.$entity, event)) {
        if (!isHovered) {
          interactive.patch({ isHovered: true });
          mouseenter(event);
          return;
        }
        const callbacks: Dict<Void<IMouseEvent>> = { mousemove, mousedown, mouseup, click };
        callbacks[`${event.name}`](event);
        return;
      }
      // no longer hovered
      if (isHovered) {
        interactive.patch({ isHovered: false });
        mouseleave(event);
        return;
      }
    });
  }
}
