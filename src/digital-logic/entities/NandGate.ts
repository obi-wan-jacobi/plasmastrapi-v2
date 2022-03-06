import { DIGITAL_STATE } from 'digital-logic/enums/DIGITAL_STATE';
import { IPoint } from 'foundation/geometry/components/PoseComponent';
import Gate from './Gate';

export default class NandGate extends Gate {

  public constructor({ x, y }: IPoint) {
    super({ x, y, src: './NandGate.png' });
  }

  public compute(): void {
    this._nextState = DIGITAL_STATE.OFF;
    let i;
    for (i of this._inputs) {
      if ((i.output.$parent as Gate).isLow) {
        this._nextState = DIGITAL_STATE.HIGH;
        return;
      }
      if ((i.output.$parent as Gate).isHigh) {
        this._nextState = DIGITAL_STATE.LOW;
      }
    }
  }

}