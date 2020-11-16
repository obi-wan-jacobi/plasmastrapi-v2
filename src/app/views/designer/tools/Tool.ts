import UIEntity from 'app/ui/abstracts/UIEntity';
import IAdaptedMouseEvent from 'engine/interfaces/IAdaptedMouseEvent';
import PoseComponent from 'framework/geometry/components/PoseComponent';

export default abstract class Tool extends UIEntity {

  public constructor({ x, y, src }: { x: number; y: number; src?: string }) {
    super({
      pose: { x, y, a: 0 },
      width: 10,
      height: 10,
      style: {},
      label: { text: '' },
      image: { src },
    });
  }

  public $mousemove(e: IAdaptedMouseEvent): void {
    this.$patch(PoseComponent)({
      x: e.x,
      y: e.y,
    });
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  public $mouseenter(e: IAdaptedMouseEvent): void {
    //
  }

  public $mouseleave(e: IAdaptedMouseEvent): void {
    //
  }

  public $mousedown(e: IAdaptedMouseEvent): void {
    //
  }

  public $mouseup(e: IAdaptedMouseEvent): void {
    //
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */

  public readonly $click = (): void => {
    this.$destroy();
  };

}
