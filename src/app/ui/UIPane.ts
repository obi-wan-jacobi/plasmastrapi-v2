import PoseComponent from 'foundation/geometry/components/PoseComponent';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';
import { RGBA_0 } from './COLOUR';

export default class UIPane extends HTML5CanvasElement {

  public constructor({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
    super();
    this.$add(PoseComponent, { x, y, a: 0 });
    this.$add(ShapeComponent, {
      vertices: [
        { x: -width/2, y: -height/2 },
        { x: -width/2, y: height/2 },
        { x: width/2, y: height/2 },
        { x: width/2, y: -height/2 },
      ],
    });
    this.$add(StyleComponent, {
      colour: 'WHITE',
      fill: RGBA_0,
      opacity: 1,
      zIndex: 0,
    });
  }

}