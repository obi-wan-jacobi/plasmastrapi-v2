import UIElement from '../../../ui/abstracts/UIElement';
import { PoseComponent } from '../../../../framework/geometry/components/PoseComponent';

export default abstract class Tool extends UIElement {

  public constructor({ x, y, src }: { x: number, y: number, src?: string }) {
    super(arguments[0]);
  }

  public $mousemove(): void {
    this.$patch(PoseComponent)({
      x: this.$engine.mouse.x,
      y: this.$engine.mouse.y,
    });
  }

  public readonly $click = (): void => {
    this.$destroy();
  }
}