import VelocityComponent, { IVelocity } from 'foundation/physics/components/VelocityComponent';
import DigitalTrigger from './DigitalTrigger';

export default class VelocityTrigger extends DigitalTrigger<IVelocity> {

  protected _initComponentToPatch(): void {
    this._ComponentToPatch = VelocityComponent;
  }

}