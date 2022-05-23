import { Etor } from 'engine/types';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import ImageComponent from 'foundation/presentation/components/ImageComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import EVENT_BUS from '../../EVENT_BUS';
import Gate from '../../abstracts/Gate';
import { TOOL_EVENT } from '../../enums/TOOL_EVENT';

export default class GateButton extends HTML5CanvasElement {

  private __etor: Etor<Gate, IMouseEvent>;

  public constructor({ x, y, src, GateEtor }: { x: number; y: number; src: string; GateEtor: Etor<Gate, IMouseEvent> }) {
    super();
    this.__etor = GateEtor;
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
    this.$add(ImageComponent, { src, zIndex: 1 });
    this.$add(StyleComponent, {
      colour: 'WHITE',
      fill: '',
      opacity: 1,
      zIndex: 1,
    });
    this.$add(MouseComponent, { x: 0, y: 0, isHovered: false });
  }

  public [MOUSE_EVENT.CLICK](event: IMouseEvent): void {
    EVENT_BUS.publish({ topic: TOOL_EVENT.CREATE_GATE, arg: { etor: this.__etor, event } });
  }

}