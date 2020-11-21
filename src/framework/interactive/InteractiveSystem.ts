import InteractiveComponent from './InteractiveComponent';
import System from 'engine/abstracts/System';
import IAdaptedMouseEvent from 'engine/interfaces/IAdaptedMouseEvent';
import { entityContainsPoint } from '../helpers/entities';
import { Dict } from 'foundation/types';

export default class InteractiveSystem extends System {

  public once(): void {
    this.$engine.components.forEvery(InteractiveComponent)((interactive) => {
      const { isEnabled, isHovered, mouseenter, mouseleave } = interactive.copy();
      const { mousemove, mousedown, mouseup, click } = interactive.copy();
      const callbacks: Dict<(e: IAdaptedMouseEvent) => void> = { mousemove, mousedown, mouseup, click };
      if (!isEnabled) {
        return;
      }
      if (this.$engine.mouse.name === 'none') {
        return;
      }
      if (!entityContainsPoint(interactive.$entity, this.$engine.mouse)) {
        if (isHovered) {
          interactive.patch({ isHovered: false });
          mouseleave(this.$engine.mouse);
          return;
        }
        return;
      }
      if (!isHovered) {
        interactive.patch({ isHovered: true });
        mouseenter(this.$engine.mouse);
      }
      callbacks[`${this.$engine.mouse.name}`](this.$engine.mouse);
    });
  }
}
