import DigitalElement from '../../../digital-logic/entities/abstracts/DigitalElement';
import { Tool } from '../../DesignView';
import { Constructor } from '../../../../foundation/types';
import { StyleComponent } from '../../../../framework/presentation/components/StyleComponent';

export default class CreatorTool<T extends DigitalElement> extends Tool {

  // tslint:disable-next-line:naming-convention
  private __DigitalElement: Constructor<T, {}>;

  constructor({ x, y, DigitalElementCtor }: { x: number, y: number, DigitalElementCtor: Constructor<T, {}> }) {
    super(arguments[0]);
    this.$add(StyleComponent)({ colour: 'YELLOW' });
    this.__DigitalElement = DigitalElementCtor;
  }

  public $mouseup(): void {
    this.$engine.entities.create(this.__DigitalElement, {
      x: this.$engine.mouse.x,
      y: this.$engine.mouse.y,
    });
  }
}