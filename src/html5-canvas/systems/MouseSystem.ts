import System from 'engine/abstracts/System';
import { entityContainsPoint } from '../../foundation/helpers/entities';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import IPipe from 'engine/interfaces/IPipe';
import IComponentMaster from 'engine/interfaces/IComponentMaster';
import MouseComponent from '../components/MouseComponent';
import { COMPONENT_MAP } from 'ui/abstracts/UIEntity';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
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

const patchIsHovered = ({ mouse, event, pipes }: {
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
      doMouseEvent({ mouse, event: event.name as MOUSE_EVENT, pipes });
      return;
    }
    mouse.patch({
      isHovered: true,
    });
    doMouseEvent({ mouse, event: MOUSE_EVENT.MOUSE_ENTER, pipes });
    return;
  }
  // no longer hovered
  if (isHovered) {
    mouse.patch({
      isHovered: false,
    });
    doMouseEvent({ mouse, event: MOUSE_EVENT.MOUSE_LEAVE, pipes });
    return;
  }
};

const doMouseEvent = ({ mouse, event, pipes }: { mouse: MouseComponent; event: MOUSE_EVENT; pipes: Dict<IPipe<IPipeEvent>> }): void => {
  const data = mouse.copy();
  if (data.events && data.events[event]) {
    data.events[event].forEach((tuple) => {
      mouse.$entity.$patch(COMPONENT_MAP[tuple[0]])(tuple[1]);
    });
  }
  if (data.pipes && data.pipes[event]) {
    data.pipes[event].forEach((tuple) => {
      try {
        pipes[tuple[0]].push(Object.assign(tuple[1], { target: mouse.$entity }));
      } catch(ex) {
        console.error(`Pipe is missing: ${tuple[0]}`);
      }
    });
  }
};