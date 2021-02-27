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
      if (!event) {
        return mouse.mutate({ event, isHovered: false });
      }
      const { isHovered } = mouse.copy();
      // hovered
      if (entityContainsPoint(mouse.$entity, event)) {
        if (!isHovered) {
          event.name = 'mouseenter';
        }
        return mouse.mutate({
          event,
          isHovered: true,
        });
      }
      // no longer hovered
      if (isHovered) {
        return mouse.mutate({
          event: Object.assign(event, { name: 'mouseleave'}),
          isHovered: false,
        });
      }
      return mouse.mutate({ event: undefined, isHovered: false });
    });
  }
}
