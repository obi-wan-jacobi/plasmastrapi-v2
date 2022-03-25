import { TOOL_EVENT } from 'app/enums/TOOL_EVENT';
import EVENT_BUS from 'app/EVENT_BUS';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import ImageComponent from 'foundation/presentation/components/ImageComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';

export default class Terminal extends HTML5CanvasElement {

  public constructor({ x, y, src }: { x: number; y: number; src: string }) {
    super();
    this.$add(PoseComponent)({ x, y, a: 0 });
    const width = 20, height = 20;
    this.$add(ShapeComponent)({
      vertices: [
        { x: -width/2, y: -height/2 },
        { x: -width/2, y: height/2 },
        { x: width/2, y: height/2 },
        { x: width/2, y: -height/2 },
      ],
    });
    this.$add(ImageComponent)({ src, zIndex: 2 });
    this.$add(StyleComponent)({
      colour: 'WHITE',
      fill: '',
      opacity: 1,
      zIndex: 2,
    });
    this.$add(MouseComponent)({ x: 0, y: 0, isHovered: false });
  }

  public [MOUSE_EVENT.MOUSE_DOWN](): void {
    EVENT_BUS.publish({ topic: TOOL_EVENT.CREATE_WIRE, arg: this });
  }

}