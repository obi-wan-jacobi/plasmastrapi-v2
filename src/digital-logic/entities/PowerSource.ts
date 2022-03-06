import { DIGITAL_STATE } from 'digital-logic/enums/DIGITAL_STATE';
import { ENTITIES } from 'engine/concretes/EntityMaster';
import UIEntity from 'ui/abstracts/UIEntity';

import OutputTerminal from './OutputTerminal';
import Wire from './Wire';

export default class PowerSource extends UIEntity {

  private __state: DIGITAL_STATE = DIGITAL_STATE.OFF;

  public get isHigh(): boolean {
    return this.__state === DIGITAL_STATE.HIGH;
  }

  public get isLow(): boolean {
    return this.__state === DIGITAL_STATE.LOW;
  }

  public get isOff(): boolean {
    return this.__state === DIGITAL_STATE.OFF;
  }

  public high(): void {
    this.__state = DIGITAL_STATE.HIGH;
  }

  public low(): void {
    this.__state = DIGITAL_STATE.LOW;
  }

  public off(): void {
    this.__state = DIGITAL_STATE.OFF;
  }

  public constructor({ x, y }: { x: number; y: number }) {
    super({
      pose: { x, y, a: 0 },
      style: {
        colour: 'WHITE',
        fill: 'rgba(0,0,0,0)',
        opacity: 1,
        zIndex: 0,
      },
      label: {
        fontSize: 10,
        text: 'POWER',
        offset: { x: -18, y: 4 },
      },
    });
    this.$appendChild(new OutputTerminal({ x, y, xOffset: 0, yOffset: -20 }));
  }

  public $destroy(): void {
    ENTITIES.forEvery(Wire)((wire) => {
      if (wire.output.$parent === this) {
        wire.$destroy();
      }
    });
    super.$destroy();
  }

}