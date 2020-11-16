import DigitalElement from '../../../digital-logic/entities/abstracts/DigitalElement';
import Tool from './Tool';
import IAdaptedMouseEvent from 'engine/interfaces/IAdaptedMouseEvent';
import { Constructor } from 'foundation/types';
import StyleComponent from 'framework/presentation/components/StyleComponent';

export default class CreatorTool<T extends DigitalElement> extends Tool {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private __DigitalElement: Constructor<T, {}>;

  constructor({ DigitalElementCtor }: { x: number; y: number; DigitalElementCtor: Constructor<T, {}> }) {
    super(arguments[0]);
    this.$add(StyleComponent)({ colour: 'YELLOW' });
    this.__DigitalElement = DigitalElementCtor;
  }

  public $mouseup(e: IAdaptedMouseEvent): void {
    this._$master.create(this.__DigitalElement, {
      x: e.x,
      y: e.y,
    });
  }
}
