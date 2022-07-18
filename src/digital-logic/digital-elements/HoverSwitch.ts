import { TOOL_EVENT } from 'app/enums/TOOL_EVENT';
import EVENT_BUS from 'app/EVENT_BUS';
import { RGBA_0 } from 'app/ui/COLOUR';
import DigitalElement from 'digital-logic/abstracts/DigitalElement';
import OutputTerminal from 'digital-logic/terminals/OutputTerminal';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import { addWidthAndHeightAsShapeComponent } from 'foundation/helpers/entities';
import ImageComponent from 'foundation/presentation/components/ImageComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';

export default class HoverSwitch extends DigitalElement {

  public constructor({ x, y }: { x: number; y: number }) {
    super();
    this.$add(PoseComponent, { x, y, a: 0 });
    addWidthAndHeightAsShapeComponent({ entity: this, width: 40, height: 40 });
    this.$add(ImageComponent, { src: './hoverswitch.png', zIndex: 1 });
    this.$add(StyleComponent, {
      colour: RGBA_0,
      fill: RGBA_0,
      opacity: 0,
      zIndex: 2,
    });
    this.$add(MouseComponent, { x: 0, y: 0, isHovered: false });
    this.$appendChild(new OutputTerminal());
  }

  public compute(): void {
    //do nothing
  }

  public [MOUSE_EVENT.MOUSE_DOWN](): void {
    EVENT_BUS.publish({ topic: TOOL_EVENT.SELECTION_BEGIN });
  }

  public [MOUSE_EVENT.MOUSE_ENTER](): void {
    this.high();
  }

  public [MOUSE_EVENT.MOUSE_LEAVE](): void {
    this.low();
  }

}