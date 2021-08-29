import System from 'engine/abstracts/System';
import { entityContainsPoint } from '../../bootstrap/helpers/entities';
import { Dict } from 'core/types';
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
        return mouse.mutate({ isHovered: false });
      }
      const { isHovered } = mouse.copy();
      // hovered
      if (entityContainsPoint(mouse.$entity, event)) {
        return mouse.mutate({
          isHovered: true,
        });
      }
      // no longer hovered
      if (isHovered) {
        return mouse.mutate({
          isHovered: false,
        });
      }
    });
  }
}
