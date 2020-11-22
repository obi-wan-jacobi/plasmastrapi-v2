import { IPoint } from '../../../../framework/geometry/components/PoseComponent';
import Tool from './Tool';
import Wire from 'app/digital-logic/entities/Wire';
import IMouseEvent from 'engine/interfaces/IMouseEvent';
import { entityTouchesLine } from 'framework/helpers/entities';
import StyleComponent from 'framework/presentation/components/StyleComponent';

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

  public $mousemove(e: IMouseEvent): void {
    super.$mousemove(e);
    if (!this.__isCuttingActive) {
      return;
    }
    this.path.push({
      x: e.x,
      y: e.y,
    });
  }

  public $mouseup(e: IMouseEvent): void {
    super.$mouseup(e);
    this._$master.forEvery(Wire)((wire) => {
      if (entityTouchesLine(wire, this.path)) {
        wire.$destroy();
      }
    });
  }
}
