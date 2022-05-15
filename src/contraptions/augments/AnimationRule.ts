import AnimationComponent, { IAnimation } from 'foundation/presentation/components/AnimationComponent';
import DigitalRule from './DigitalRule';

export default class AnimationRule extends DigitalRule<IAnimation> {

  protected _initComponentToPatch(): void {
    this._ComponentToPatch = AnimationComponent;
  }

}