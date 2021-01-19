import DigitalElement from '../../../digital-logic/entities/abstracts/DigitalElement';
import Tool from './Tool';
import { Constructor } from 'foundation/types';
import StyleComponent from 'framework/presentation/components/StyleComponent';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';

export default class CreatorTool<T extends DigitalElement> extends Tool {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private __DigitalElement: Constructor<T, {}>;

  constructor({ DigitalElementCtor }: { x: number; y: number; DigitalElementCtor: Constructor<T, {}> }) {
    super(arguments[0]);
    this.$patch(StyleComponent)({ colour: 'YELLOW' });
    this.__DigitalElement = DigitalElementCtor;
  }

  public $mouseup(e: IMouseEvent): void {
    new this.__DigitalElement({
      x: e.x,
      y: e.y,
    });
  }
}
