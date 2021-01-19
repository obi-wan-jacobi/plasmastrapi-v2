import System from 'engine/abstracts/System';
import { entityContainsPoint } from '../../framework/helpers/entities';
import { Dict } from 'foundation/types';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import IPipe from 'engine/interfaces/IPipe';
import IComponentMaster from 'engine/interfaces/IComponentMaster';
import IEvent from 'engine/interfaces/IEvent';
import MouseComponent from '../components/MouseComponent';

export default class MouseSystem<TPipes extends { mouse: IPipe<IMouseEvent> } & Dict<IPipe<IEvent>>> extends System<TPipes> {

  public once({ components, pipes }: { components: IComponentMaster; pipes: TPipes }): void {
    components.forEvery(MouseComponent)((mouse) => {
      const event = pipes.mouse.event;
      const { isHovered } = mouse.copy();
      if (!event) {
        return mouse.patch({ event });
      }
      // hovered
      if (entityContainsPoint(mouse.$entity, event)) {
        if (!isHovered) {
          return mouse.patch({
            event: Object.assign(event, { name: 'mouseenter'}),
            isHovered: true,
          });
        }
        return mouse.patch({ event });
      }
      // no longer hovered
      if (isHovered) {
        return mouse.patch({
          event: Object.assign(event, { name: 'mouseleave'}),
          isHovered: false,
        });
      }
      return mouse.patch({ event: undefined });
    });
  }
}
