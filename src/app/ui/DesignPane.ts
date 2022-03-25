import { TOOL_EVENT } from 'app/enums/TOOL_EVENT';
import EVENT_BUS from 'app/EVENT_BUS';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import UIPane from './UIPane';

export default class DesignPane extends UIPane {

  public constructor({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
    super({ x, y, width, height });
    this.$patch(StyleComponent)({ zIndex: 1 });
  }

  public [MOUSE_EVENT.MOUSE_DOWN](mouseEvent: IMouseEvent): void {
    EVENT_BUS.publish({ topic: TOOL_EVENT.BEGIN_SELECTION, arg: mouseEvent });
  }

}