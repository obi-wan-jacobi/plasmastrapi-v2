import AnimationComponent, { IAnimation } from 'foundation/presentation/components/AnimationComponent';
import DigitalTrigger from './DigitalTrigger';

export default class AnimationTrigger extends DigitalTrigger<IAnimation> {

  protected _initComponentToPatch(): void {
    this._ComponentToPatch = AnimationComponent;
  }

}