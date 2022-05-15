import PoseComponent from 'foundation/geometry/components/PoseComponent';
import TranslationComponent from 'foundation/geometry/components/TranslationComponent';
import { entitiesTouch } from 'foundation/helpers/entities';
import IHTML5CanvasElement from 'html5-canvas/interfaces/IHTML5CanvasElement';
import Rule from './Rule';


export default class StopTranslationRule extends Rule {

  private __stopper: IHTML5CanvasElement;

  public constructor({ stopper }: { stopper: IHTML5CanvasElement }) {
    super();
    this.__stopper = stopper;
  }

  public invoke(): void {
    if (entitiesTouch(this.$parent!, this.__stopper)) {
      const translation = this.$parent!.$copy(TranslationComponent)!;
      const { x, y } = this.$parent!.$copy(PoseComponent)!;
      const stopperPose = this.__stopper.$copy(PoseComponent)!;
      let newX = x;
      if (stopperPose.x > x && translation.x > 0) {
        newX = x - translation.x;
      } else if (stopperPose.x < x && translation.x < 0) {
        newX = x - translation.x;
      }
      let newY = y;
      if (stopperPose.y > y && translation.y > 0) {
        newY = y - translation.y;
      } else if (stopperPose.y < y && translation.y < 0) {
        newY = y - translation.y;
      }
      this.$parent!.$patch(PoseComponent)({ x: newX, y: newY });
    }
  }

}