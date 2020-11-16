import DigitalElement from '../../../digital-logic/entities/abstracts/DigitalElement';
import Tool from './Tool';
import IAdaptedMouseEvent from 'engine/interfaces/IAdaptedMouseEvent';
import PoseComponent from 'framework/geometry/components/PoseComponent';
import StyleComponent from 'framework/presentation/components/StyleComponent';

export default class PlacerTool extends Tool {

  private __element: DigitalElement;

  constructor({ element }: { x: number; y: number; element: DigitalElement }) {
    super(arguments[0]);
    this.$add(StyleComponent)({ colour: 'LIGHTBLUE' });
    this.__element = element;
  }

  public $mousemove(e: IAdaptedMouseEvent): void {
    super.$mousemove(e);
    this.__element.$patch(PoseComponent)({
      x: e.x,
      y: e.y,
    });
  }
}
