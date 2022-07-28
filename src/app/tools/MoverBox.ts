import { TOOL_EVENT } from 'app/enums/TOOL_EVENT';
import EVENT_BUS from 'app/EVENT_BUS';
import IEntityContainer from 'app/interfaces/IEntityContainer';
import clone from 'base/helpers/clone';
import PoseComponent, { IPoint } from 'foundation/geometry/components/PoseComponent';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';
import IHTML5CanvasElement from 'html5-canvas/interfaces/IHTML5CanvasElement';

export default class MoverBox<T extends IHTML5CanvasElement> extends HTML5CanvasElement implements IEntityContainer<T> {

  public items: Set<T>;

  private __start: IPoint;
  private __current: IPoint;

  public get start(): IPoint {
    return clone(this.__start);
  }

  public get current(): IPoint {
    return clone(this.__current);
  }

  public constructor(container: IEntityContainer<T>) {
    const pose = container.$copy(PoseComponent)!;
    const shape = container.$copy(ShapeComponent)!;
    const style = container.$copy(StyleComponent)!;
    super();
    this.$add(PoseComponent, pose);
    this.$add(ShapeComponent, shape);
    this.$add(StyleComponent, style);
    this.$add(MouseComponent, { x: 0, y: 0, isHovered: false });
    this.items = container.items || new Set<T>();
    this.__start = pose;
    this.__current = pose;
  }

  public init({ x, y}: IPoint): void {
    this.__start = clone({ x, y });
    this.__current = clone({ x, y });
  }

  public moveTo({ x, y }: IPoint): void {
    moveTo([[this, ...this.items], this.__current, { x, y }]);
    this.__current = clone({ x, y });
  }

  public [MOUSE_EVENT.MOUSE_DOWN](): void {
    EVENT_BUS.publish({ topic: TOOL_EVENT.MOVE_MANY });
  }

}

export const moveTo = ([items, start, { x, y }]: [IHTML5CanvasElement[], IPoint, IPoint]): void => {
    const { dx, dy } = {
      dx: x - start.x,
      dy: y - start.y,
    };
    items.forEach((target) => {
      const pose = target.$copy(PoseComponent)!;
      target.$patch(PoseComponent, {
        x: pose.x + dx,
        y: pose.y + dy,
      });
    });
  };