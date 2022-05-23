import { TOOL_EVENT } from 'app/enums/TOOL_EVENT';
import EVENT_BUS from 'app/EVENT_BUS';
import RelativePoseComponent from 'foundation/geometry/components/RelativePoseComponent';
import { addWidthAndHeightAsShapeComponent } from 'foundation/helpers/entities';
import ImageComponent from 'foundation/presentation/components/ImageComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';

export default class Terminal extends HTML5CanvasElement {

  public constructor({ x, y, src }: { x: number; y: number; src: string }) {
    super();
    this.$add(RelativePoseComponent, { x, y, a: 0 });
    addWidthAndHeightAsShapeComponent({ entity: this, width: 20, height: 20 });
    this.$add(ImageComponent, { src, zIndex: 3 });
    this.$add(StyleComponent, {
      colour: 'WHITE',
      fill: '',
      opacity: 1,
      zIndex: 3,
    });
    this.$add(MouseComponent, { x: 0, y: 0, isHovered: false });
  }

  public [MOUSE_EVENT.MOUSE_DOWN](): void {
    EVENT_BUS.publish({ topic: TOOL_EVENT.CREATE_WIRE, arg: { target: this }});
  }

}