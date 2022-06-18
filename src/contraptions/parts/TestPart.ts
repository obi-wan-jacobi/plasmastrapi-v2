import { RGBA_0 } from 'app/ui/COLOUR';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import Part from 'contraptions/abstracts/Part';
import PoseComponent from 'foundation/geometry/components/PoseComponent';

export default class TestPart extends Part {

  private __wrist: Part;
  private __palm: Part;

  public constructor({ x, y }: { x: number; y: number }) {
    super();
    this.$add(PoseComponent, { x, y, a: 0 });
    this.__wrist = this.$appendChild(new Part());
    this.__wrist.$add(PoseComponent, { x: 0, y: -15, a: 0 });
    this.__wrist.$add(ShapeComponent, {
      vertices: [
        { x: 10, y: 5 },
        { x: -10, y: 5 },
        { x: -20, y: -5 },
        { x: 20, y: -5 },
      ],
    });
    this.__wrist.$add(StyleComponent, { colour: 'WHITE', opacity: 1, fill: RGBA_0, zIndex: 2 });
    this.__palm = this.$appendChild(new Part());
    this.__palm.$add(PoseComponent, { x: 0, y: 10, a: 0 });
    this.__palm.$add(ShapeComponent, {
      vertices: [
        { x: 10, y: 10 },
        { x: -10, y: 10 },
        { x: -10, y: -20 },
        { x: 10, y: -20 },
      ],
    });
    this.__palm.$add(StyleComponent, { colour: 'WHITE', opacity: 1, fill: RGBA_0, zIndex: 2 });
  }
}
