import IEntityContainer from 'app/interfaces/IEntityContainer';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';
import IHTML5CanvasElement from 'html5-canvas/interfaces/IHTML5CanvasElement';

export default class MoverBox<T extends IHTML5CanvasElement> extends HTML5CanvasElement implements IEntityContainer<T> {

  public items: Set<T>;

  public constructor(container: HTML5CanvasElement & IEntityContainer<T>) {
    const pose = container.$copy(PoseComponent)!;
    const shape = container.$copy(ShapeComponent)!;
    const style = container.$copy(StyleComponent)!;
    super();
    this.$add(PoseComponent, pose);
    this.$add(ShapeComponent, shape);
    this.$add(StyleComponent, style);
    this.$add(MouseComponent, { x: 0, y: 0, isHovered: false });
    this.items = container.items || new Set<T>();
  }

  public moveBy({ dx, dy }: { dx: number; dy: number }): void {
    const targets = [this, ...this.items];
    targets.forEach((target) => {
      const pose = target.$copy(PoseComponent)!;
      (target as IHTML5CanvasElement).$patch(PoseComponent, {
        x: pose.x + dx,
        y: pose.y + dy,
      });
    });
  }

}