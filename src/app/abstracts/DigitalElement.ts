import { DIGITAL_STATE } from 'app/enums/DIGITAL_STATE';
import Wire from 'app/gates/Wire';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';

export default abstract class DigitalElement extends HTML5CanvasElement {

  private __state = DIGITAL_STATE.OFF;
  private __nextState = DIGITAL_STATE.OFF;

  public high(): void {
    this.__nextState = DIGITAL_STATE.HIGH;
  }

  public low(): void {
    this.__nextState = DIGITAL_STATE.LOW;
  }

  public off(): void {
    this.__nextState = DIGITAL_STATE.OFF;
  }

  public next(): void {
    this.__state = this.__nextState;
  }

  public get isHigh(): boolean {
    return this.__state === DIGITAL_STATE.HIGH;
  }

  public get isLow(): boolean {
    return this.__state === DIGITAL_STATE.LOW;
  }

  public get isOff(): boolean {
    return this.__state === DIGITAL_STATE.OFF;
  }

  public abstract compute(): void;

  protected get _inputs(): Wire[] {
    return this.$children.filter((child) => {
      return child instanceof Wire && (child as Wire).output.$parent === this;
    }) as Wire[];
  }

}