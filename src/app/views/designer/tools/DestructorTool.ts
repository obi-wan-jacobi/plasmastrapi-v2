import DigitalElement from '../../../digital-logic/entities/abstracts/DigitalElement';
import Tool from './Tool';
import IAdaptedMouseEvent from 'engine/interfaces/IAdaptedMouseEvent';
import { entityContainsPoint } from '../../../../framework/helpers/entities';
import StyleComponent from 'framework/presentation/components/StyleComponent';

export default class DestructorTool extends Tool {

  constructor({}: { x: number; y: number }) {
    super(arguments[0]);
    this.$add(StyleComponent)({ colour: 'ORANGE' });
  }

  public $mouseup(e: IAdaptedMouseEvent): void {
    super.$mouseup(e);
    const target = this._$master.find(DigitalElement)((element) => {
      return entityContainsPoint(element, e);
    });
    if (target) {
      target.$destroy();
    }
  }
}
