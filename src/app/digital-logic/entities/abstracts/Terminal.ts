import ImageComponent from '../../../../framework/presentation/components/ImageComponent';
import LabelComponent from '../../../../framework/presentation/components/LabelComponent';
import { STATE } from '../../enums/STATE';
import UIEntity from '../../../ui/abstracts/UIEntity';

const LABEL_COLOUR_MAP = {
  [STATE.HIGH]: 'GREEN',
  [STATE.LOW]: 'RED',
  [STATE.OFF]: 'WHITE',
};

export default class Terminal extends UIEntity {

  private __s: STATE = STATE.OFF;
  private __src: string;

  constructor({ x, y, src, labelText }: { x: number; y: number; src: string; labelText?: string }) {
    super(Object.assign({
      pose: { x, y, a: 0 },
      width: 20,
      height: 20,
      label: labelText ? {
        text: labelText,
        fontSize: 20,
        offset: { x: 15, y: 7 },
        colour: 'WHITE',
        fill: 'rgba(0,0,0,0)',
        opacity: 1,
        zIndex: 0,
      } : undefined,
      image: {
        src,
        opacity: 1,
        zIndex: 0,
      },
    }, arguments[0]));
    this.__src = src;
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
    this.$patch(LabelComponent)({
      colour: LABEL_COLOUR_MAP[state],
    });
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
    this.$patch(ImageComponent)({ src: './Terminal_hovered.png' });
  }

  public $mouseleave(): void {
    this.$patch(ImageComponent)({ src: this.__src });
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
