import System from 'engine/abstracts/System';
import { entityContainsPoint } from '../../foundation/helpers/entities';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import IPipe from 'engine/interfaces/IPipe';
import IComponentMaster from 'engine/interfaces/IComponentMaster';
import MouseComponent from '../components/MouseComponent';
import { COMPONENT_MAP } from 'ui/abstracts/UIEntity';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';

export default class MouseSystem<TPipes extends { mouse: IPipe<IMouseEvent>}> extends System<TPipes> {

  public once({ components, pipes }: { components: IComponentMaster; pipes: TPipes }): void {
    const event = pipes.mouse.event;
    components.forEvery(MouseComponent)((mouse) => {
      patchIsHovered({ mouse, event });
    });
  }
}

const patchIsHovered = ({ mouse, event }: {
  mouse: MouseComponent;
  event?: IMouseEvent;
}): void => {
  if (!event) {
    return;
  }
  const { isHovered } = mouse.copy();
  // hovered
  if (entityContainsPoint(mouse.$entity, event)) {
    if (isHovered) {
      doMouseEvent({ mouse, event: event.name as MOUSE_EVENT });
      return;
    }
    mouse.patch({
      isHovered: true,
    });
    doMouseEvent({ mouse, event: MOUSE_EVENT.MOUSE_ENTER });
    return;
  }
  // no longer hovered
  if (isHovered) {
    mouse.patch({
      isHovered: false,
    });
    doMouseEvent({ mouse, event: MOUSE_EVENT.MOUSE_LEAVE });
    return;
  }
};

const doMouseEvent = ({ mouse, event }: { mouse: MouseComponent; event: MOUSE_EVENT }): void => {
  return mouse.copy().events[event]?.forEach((tuple) => {
    mouse.$entity.$patch(COMPONENT_MAP[tuple[0]])(tuple[1]);
  });
};