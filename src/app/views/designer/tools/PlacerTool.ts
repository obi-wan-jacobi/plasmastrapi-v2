import DigitalElement from '../../../digital-logic/entities/abstracts/DigitalElement';
import Tool from './Tool';
import IMouseEvent from 'engine/interfaces/IMouseEvent';
import PoseComponent from 'framework/geometry/components/PoseComponent';
import StyleComponent from 'framework/presentation/components/StyleComponent';

export default class PlacerTool extends Tool {

  private __element: DigitalElement;

  constructor({ element }: { x: number; y: number; element: DigitalElement }) {
    super(arguments[0]);
    this.$patch(StyleComponent)({ colour: 'LIGHTBLUE' });
    this.__element = element;
  }

  public $mousemove(e: IMouseEvent): void {
    super.$mousemove(e);
    this.__element.$patch(PoseComponent)({
      x: e.x,
      y: e.y,
    });
  }
}
