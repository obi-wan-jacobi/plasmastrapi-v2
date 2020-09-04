import { Tool } from '../../DesignView';
import { IPoint } from '../../../../framework/geometry/components/PoseComponent';
import { StyleComponent } from '../../../../framework/presentation/components/StyleComponent';

export default class WireCutterTool extends Tool {

  public points: IPoint[] = [];

  private __isCuttingActive: boolean = false;

  constructor({ x, y }: { x: number, y: number }) {
    super(arguments[0]);
    this.$add(StyleComponent)({ colour: 'RED' });
  }

  public $mousedown(): void {
    this.__isCuttingActive = true;
  }

  public $mousemove(): void {
    super.$mousemove();
    if (!this.__isCuttingActive) {
      return;
    }
    this.points.push({
      x: this.$engine.mouse.x,
      y: this.$engine.mouse.y,
    });
  }

  public $mouseup(): void {
    super.$mouseup();
    this.$engine.entities.forEvery(Wire)((wire) => {
      if (entityTouchesLine(wire, this.points)) {
        wire.$destroy();
      }
    });
  }
}