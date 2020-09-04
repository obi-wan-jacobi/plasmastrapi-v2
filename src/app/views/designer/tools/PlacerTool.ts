import { Tool } from '../../DesignView';
import DigitalElement from '../../../digital-logic/entities/abstracts/DigitalElement';
import { StyleComponent } from '../../../../framework/presentation/components/StyleComponent';
import { PoseComponent } from '../../../../framework/geometry/components/PoseComponent';

export default class PlacerTool extends Tool {

  private __element: DigitalElement;

  constructor({ x, y, element }: { x: number, y: number, element: DigitalElement }) {
    super(arguments[0]);
    this.$add(StyleComponent)({ colour: 'LIGHTBLUE' });
    this.__element = element;
  }

  public $mousemove(): void {
    super.$mousemove();
    this.__element.$patch(PoseComponent)({
      x: this.$engine.mouse.x,
      y: this.$engine.mouse.y,
    });
  }
}