import { DIGITAL_STATE } from 'digital-logic/enums/DIGITAL_STATE';
import { IPoint } from 'foundation/geometry/components/PoseComponent';
import Gate from './Gate';

export default class AndGate extends Gate {

  public constructor({ x, y }: IPoint) {
    super({ x, y, src: './AndGate.png' });
  }

  public compute(): void {
    this._nextState = DIGITAL_STATE.OFF;
    let i;
    for (i of this._inputs) {
      if ((i.output.$parent as Gate).isLow) {
        this._nextState = DIGITAL_STATE.LOW;
        return;
      }
      if ((i.output.$parent as Gate).isHigh) {
        this._nextState = DIGITAL_STATE.HIGH;
      }
    }
  }

}