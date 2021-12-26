import { IPoint } from '../../../../foundation/geometry/components/PoseComponent';
import Tool from './Tool';
import StyleComponent from 'foundation/presentation/components/StyleComponent';

export default class WireCutterTool extends Tool {

  public path: IPoint[] = [];

  private __isCuttingActive = false;

  constructor({}: { x: number; y: number }) {
    super(arguments[0]);
    this.$patch(StyleComponent)({ colour: 'RED' });
  }

  public $mousedown(): void {
    this.__isCuttingActive = true;
  }

  // public $mousemove(e: IMouseEvent): void {
  //   super.$mousemove(e);
  //   if (!this.__isCuttingActive) {
  //     return;
  //   }
  //   this.path.push({
  //     x: e.x,
  //     y: e.y,
  //   });
  // }

  // public $mouseup(e: IMouseEvent): void {
  //   super.$mouseup(e);
  //   this._$master.forEvery(Wire)((wire) => {
  //     if (entityTouchesLine(wire, this.path)) {
  //       wire.$destroy();
  //     }
  //   });
  // }
}
