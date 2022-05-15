import { TOOL_EVENT } from 'app/enums/TOOL_EVENT';
import EVENT_BUS from 'app/EVENT_BUS';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';
import IHTML5CanvasElement from 'html5-canvas/interfaces/IHTML5CanvasElement';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import SelectionBox from './SelectionBox';

export default class MoverBox<T extends IHTML5CanvasElement> extends HTML5CanvasElement {

  public items: Set<T>;

  public constructor({ selectionBox }: { selectionBox: SelectionBox<T> }) {
    const pose = selectionBox.$copy(PoseComponent)!;
    const shape = selectionBox.$copy(ShapeComponent)!;
    const style = selectionBox.$copy(StyleComponent)!;
    super();
    this.$add(PoseComponent)(pose);
    this.$add(ShapeComponent)(shape);
    this.$add(StyleComponent)(style);
    this.$add(MouseComponent)({ x: 0, y: 0, isHovered: false });
    this.items = selectionBox.selections;
  }

  public moveBy({ dx, dy }: { dx: number; dy: number }): void {
    const targets = [this, ...this.items];
    targets.forEach((target) => {
      const pose = target.$copy(PoseComponent)!;
      target.$moveTo({
        x: pose.x + dx,
        y: pose.y + dy,
      });
    });
  }

  public [MOUSE_EVENT.MOUSE_DOWN](mouseEvent: IMouseEvent): void {
    EVENT_BUS.publish({ topic: TOOL_EVENT.MOVE_SELECTION, arg: mouseEvent });
  }
}