import { TOOL_EVENT } from 'app/enums/TOOL_EVENT';
import EVENT_BUS from 'app/EVENT_BUS';
import { IPoint } from 'foundation/geometry/components/PoseComponent';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import DigitalElement from './DigitalElement';

export default abstract class InteractiveDigitalElement extends DigitalElement {

  public constructor({ x, y }: IPoint) {
    super({ x, y });
    this.$add(MouseComponent, { x: 0, y: 0, isHovered: false });
  }

  public [MOUSE_EVENT.MOUSE_DOWN](): void {
    EVENT_BUS.publish({ topic: TOOL_EVENT.MOVE });
  }

}