import VelocityComponent, { IVelocity } from 'foundation/physics/components/VelocityComponent';
import DigitalRule from './DigitalRule';

export default class VelocityRule extends DigitalRule<IVelocity> {

  protected _initComponentToPatch(): void {
    this._ComponentToPatch = VelocityComponent;
  }

}