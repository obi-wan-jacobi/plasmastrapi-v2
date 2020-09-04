import { Tool } from '../../DesignView';
import { StyleComponent } from '../../../../framework/presentation/components/StyleComponent';
import DigitalElement from '../../../digital-logic/entities/abstracts/DigitalElement';
import { entityContainsPoint } from '../../../../framework/helpers/entities';

export default class DestructorTool extends Tool {

  constructor({ x, y }: { x: number, y: number }) {
    super(Object.assign({ width: 10, height: 10 }, arguments[0]));
    this.$add(StyleComponent)({ colour: 'ORANGE' });
  }

  public $mouseup(): void {
    super.$mouseup();
    const target = this.$engine.entities.first(DigitalElement)((element) => {
      return entityContainsPoint(element, this.$engine.mouse);
    });
    if (target) {
      target.$destroy();
    }
  }
}