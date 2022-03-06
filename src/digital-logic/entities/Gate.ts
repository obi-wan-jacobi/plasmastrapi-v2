import { DIGITAL_STATE } from 'digital-logic/enums/DIGITAL_STATE';
import { ENTITIES } from 'engine/concretes/EntityMaster';
import UIEntity from 'ui/abstracts/UIEntity';
import InputTerminal from './InputTerminal';
import OutputTerminal from './OutputTerminal';
import Wire from './Wire';

export default class Gate extends UIEntity {

  protected _inputs = new Set<Wire>();
  protected _state: DIGITAL_STATE = DIGITAL_STATE.OFF;
  protected _nextState: DIGITAL_STATE;

  public get isHigh(): boolean {
    return this._state === DIGITAL_STATE.HIGH;
  }

  public get isLow(): boolean {
    return this._state === DIGITAL_STATE.LOW;
  }

  public get isOff(): boolean {
    return this._state === DIGITAL_STATE.OFF;
  }

  public high(): void {
    this._state = DIGITAL_STATE.HIGH;
  }

  public low(): void {
    this._state = DIGITAL_STATE.LOW;
  }

  public off(): void {
    this._state = DIGITAL_STATE.OFF;
  }

  public constructor({ x, y, text, src }: { x: number; y: number; text?: string; src?: string }) {
    super({
      pose: { x, y, a: 0 },
      shape: {
        width: 40,
        height: 40,
      },
      style: {
        colour: '',
        fill: 'rgba(0,0,0,0)',
        opacity: 1,
        zIndex: 0,
      },
      label: !text ? undefined : {
        fontSize: 10,
        text,
        offset: { x: -10, y: 4 },
      },
      image: !src ? undefined : {
        src,
        zIndex: 0,
      },
      mouse: {
        isHovered: false,
      },
    });
    this.$appendChild(new InputTerminal({ x, y, xOffset: 0, yOffset: 20 }));
    this.$appendChild(new OutputTerminal({ x, y, xOffset: 0, yOffset: -20 }));
  }

  public connectInput({ wire }: { wire: Wire }): void {
    this._inputs.add(wire);
  }

  public removeInput({ wire }: { wire: Wire }): void {
    this._inputs.delete(wire);
  }

  public compute(): void {
    this._nextState = DIGITAL_STATE.OFF;
  }

  public tick(): void {
    this._state = this._nextState;
  }

  public $destroy(): void {
    ENTITIES.forEvery(Wire)((wire) => {
      if (wire.input.$parent === this || wire.output.$parent === this) {
        wire.$destroy();
      }
    });
    super.$destroy();
  }

}