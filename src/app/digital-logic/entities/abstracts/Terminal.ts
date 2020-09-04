import { STATE } from '../../enums/STATE';
import UIElement from '../../../ui/abstracts/UIElement';
import { ImageComponent } from '../../../../framework/presentation/components/ImageComponent';
import { LabelComponent } from '../../../../framework/presentation/components/LabelComponent';

const LABEL_COLOUR_MAP = {
  [STATE.HIGH]: 'GREEN',
  [STATE.LOW]: 'RED',
  [STATE.OFF]: 'WHITE',
}

export default class Terminal extends UIElement {

  private __s: STATE = STATE.OFF;
  private __src: string;

  constructor({ x, y, src }: { x: number, y: number, src: string }) {
    super(Object.assign({ width: 20, height: 20 }, arguments[0]));
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
    super.$mouseenter();
    this.$mutate(ImageComponent)({ src: './Terminal_hovered.png' });
  }

  public $mouseleave(): void {
    super.$mouseleave();
    this.$mutate(ImageComponent)({ src: this.__src });
  }
}