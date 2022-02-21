import PoseComponent, { IPoint } from 'foundation/geometry/components/PoseComponent';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import IHTML5CanvasEntity from 'html5-canvas/interfaces/IHTML5CanvasEntity';
import UIEntity from 'ui/abstracts/UIEntity';
import { DESIGNER_EVENT } from '../enums/DESIGNER_EVENT';
import SelectionBox from './SelectionBox';

export default class MoverBox<T extends IHTML5CanvasEntity> extends UIEntity {

  public items: Set<T>;

  private __start: IPoint;

  public constructor({ selectionBox }: { selectionBox: SelectionBox<T> }) {
    const pose = selectionBox.$copy(PoseComponent);
    const shape = selectionBox.$copy(ShapeComponent);
    const style = selectionBox.$copy(StyleComponent);
    super({
      pose,
      shape,
      style,
      mouse: {
        events: {},
        pipes: {
          [MOUSE_EVENT.MOUSE_DOWN]: [['designer', { name: DESIGNER_EVENT.MOVER_MODE }]],
        },
        isHovered: false,
      },
    });
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
}