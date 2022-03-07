import System from 'engine/abstracts/System';
import { entityContainsPoint } from '../../foundation/helpers/entities';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import IPipe from 'engine/interfaces/IPipe';
import IComponentMaster from 'engine/interfaces/IComponentMaster';
import MouseComponent from '../components/MouseComponent';
import { Dict } from 'base/types';
import IPipeEvent from 'engine/interfaces/IPipeEvent';

export default class MouseSystem<TPipes extends { mouse: IPipe<IMouseEvent> }> extends System<TPipes> {

  public once({ components, pipes }: { components: IComponentMaster; pipes: TPipes }): void {
    const event = pipes.mouse.event;
    components.forEvery(MouseComponent)((mouse) => {
      patchIsHovered({ mouse, event, pipes });
    });
  }
}

const patchIsHovered = ({ mouse, event }: {
  mouse: MouseComponent;
  event?: IMouseEvent;
  pipes: Dict<IPipe<IPipeEvent>>;
}): void => {
  if (!event) {
    return;
  }
  const { isHovered } = mouse.copy();
  // hovered
  if (entityContainsPoint(mouse.$entity, event)) {
    if (isHovered) {
      return;
    }
    mouse.patch({
      isHovered: true,
    });
    return;
  }
  // no longer hovered
  if (isHovered) {
    mouse.patch({
      isHovered: false,
    });
    return;
  }
};