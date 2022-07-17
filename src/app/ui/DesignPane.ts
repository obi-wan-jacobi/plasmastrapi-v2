import { TOOL_EVENT } from 'app/enums/TOOL_EVENT';
import EVENT_BUS from 'app/EVENT_BUS';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import UIPane from './UIPane';

export default class DesignPane extends UIPane {

  public constructor({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
    super({ x, y, width, height });
    this.$patch(StyleComponent, { zIndex: 1 });
    this.$add(MouseComponent, { x: 0, y: 0, isHovered: false });
  }

  public [MOUSE_EVENT.MOUSE_DOWN](): void {
    EVENT_BUS.publish({ topic: TOOL_EVENT.SELECTION_BEGIN });
  }

}