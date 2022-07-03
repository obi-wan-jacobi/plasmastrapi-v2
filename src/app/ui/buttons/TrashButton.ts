import PoseComponent from 'foundation/geometry/components/PoseComponent';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import ImageComponent from 'foundation/presentation/components/ImageComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';
import EVENT_BUS from '../../EVENT_BUS';
import { TOOL_EVENT } from '../../enums/TOOL_EVENT';
import { RGBA_0, RGBA_WHITE } from '../COLOUR';

export default class TrashButton extends HTML5CanvasElement {

  public constructor({ x, y }: { x: number; y: number }) {
    super();
    this.$add(PoseComponent, { x, y, a: 0 });
    const width = 40, height = 40;
    this.$add(ShapeComponent, {
      vertices: [
        { x: -width/2, y: -height/2 },
        { x: -width/2, y: height/2 },
        { x: width/2, y: height/2 },
        { x: width/2, y: -height/2 },
      ],
    });
    this.$add(ImageComponent, { src: './TRASHCAN.png', zIndex: 1 });
    this.$add(StyleComponent, {
      colour: RGBA_WHITE,
      fill: RGBA_0,
      opacity: 1,
      zIndex: 1,
    });
    this.$add(MouseComponent, { x: 0, y: 0, isHovered: false });
  }

  public [MOUSE_EVENT.CLICK](): void {
    EVENT_BUS.publish({ topic: TOOL_EVENT.DELETE_GATE });
  }

}