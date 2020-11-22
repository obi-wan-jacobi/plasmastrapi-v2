import UIEntity from 'app/ui/abstracts/UIEntity';
import IMouseEvent from 'engine/interfaces/IMouseEvent';
import PoseComponent from 'framework/geometry/components/PoseComponent';

export default abstract class Tool extends UIEntity {

  public constructor({ x, y, src }: { x: number; y: number; src?: string }) {
    super({
      x, y,
      width: 10,
      height: 10,
      image: src ? { src, opacity: 1, zIndex: 0 } : undefined,
    });
  }

  public $mousemove(e: IMouseEvent): void {
    this.$patch(PoseComponent)({
      x: e.x,
      y: e.y,
    });
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  public $mouseenter(e: IMouseEvent): void {
    //
  }

  public $mouseleave(e: IMouseEvent): void {
    //
  }

  public $mousedown(e: IMouseEvent): void {
    //
  }

  public $mouseup(e: IMouseEvent): void {
    //
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */

  public readonly $click = (): void => {
    this.$destroy();
  };

}
