import ImageComponent from '../../../../framework/presentation/components/ImageComponent';
import LabelComponent from '../../../../framework/presentation/components/LabelComponent';
import { STATE } from '../../enums/STATE';
import UIEntity from '../../../ui/abstracts/UIEntity';

const LABEL_COLOUR_MAP = {
  [STATE.HIGH] : 'GREEN',
  [STATE.LOW]  : 'RED',
  [STATE.OFF]  : 'WHITE',
};

export default class Terminal extends UIEntity {

  private __s: STATE = STATE.OFF;
  private __src: string;

  constructor({ x, y, src }: { x: number; y: number; src: string }) {
    super({
      pose   : { x: 0, y: 0, a: 0 },
      width  : 20,
      height : 20,
      style  : {},
      label  : {},
      image  : {},
    });
    this.__src = src;
    this.$add(ImageComponent)({ src });
  }

  public get isHigh(): boolean {
    return this.__s === STATE.HIGH;
  }

  public get isLow(): boolean {
    return this.__s === STATE.LOW;
  }

  public get isOff(): boolean {
    return this.__s === STATE.OFF;
  }

  private get __state(): STATE {
    return this.__s;
  }

  private set __state(state: STATE) {
    this.__s = state;
    if (this.$copy(LabelComponent)) {
      this.$patch(LabelComponent)({
        colour: LABEL_COLOUR_MAP[state],
      });
    }
  }

  public high(): void {
    this.__state = STATE.HIGH;
  }

  public low(): void {
    this.__state = STATE.LOW;
  }

  public off(): void {
    this.__state = STATE.OFF;
  }

  public $mouseenter(): void {
    this.$mutate(ImageComponent)({ src: './Terminal_hovered.png' });
  }

  public $mouseleave(): void {
    this.$mutate(ImageComponent)({ src: this.__src });
  }

  public $mousemove(): void {
    //
  }

  public $mousedown(): void {
    //
  }

  public $mouseup(): void {
    //
  }

  public $click(): void {
    //
  }

}
