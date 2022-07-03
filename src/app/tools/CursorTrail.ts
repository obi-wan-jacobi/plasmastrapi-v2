import { RGBA_0, RGBA_RED } from 'app/ui/COLOUR';
import LineComponent from 'foundation/geometry/components/LineComponent';
import { IPoint } from 'foundation/geometry/components/PoseComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';

export default class CursorTrail extends HTML5CanvasElement {

  public constructor() {
    super();
    this.$add(StyleComponent, {
      colour: RGBA_RED,
      fill: RGBA_0,
      opacity: 1,
      zIndex: 2,
    });
    this.$add(LineComponent, {
      path: [],
    });
  }

  public addNewPoint({ x, y }: IPoint): void {
    const { path } = this.$copy(LineComponent)!;
    path.push({ x, y });
    this.$patch(LineComponent, { path });
  }

}