import { RGBA_RED, RGBA_YELLOW } from 'app/ui/COLOUR';
import DigitalElement from 'digital-logic/abstracts/DigitalElement';
import { COMPONENTS } from 'engine/concretes/ComponentMaster';
import IComponent from 'engine/interfaces/IComponent';
import { Ctor } from 'engine/types';
import PoseComponent, { IPose } from 'foundation/geometry/components/PoseComponent';
import { entitiesTouch } from 'foundation/helpers/entities';
import { toNumber } from 'foundation/helpers/math';
import RigidBodyComponent from 'foundation/physics/components/RigidBodyComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import IHTML5CanvasElement from 'html5-canvas/interfaces/IHTML5CanvasElement';
import DigitalTrigger from './DigitalTrigger';

export default class TranslationTrigger extends DigitalTrigger<IPose> {

  private __translation: IPose | any;

  public constructor({ inputs, translation }: { inputs: DigitalElement[]; translation: IPose | any }) {
    super({ inputs });
    this.__translation = translation;
  }

  public invoke(): void {
    if (!this.$parent) {
      throw new Error(`${this.constructor.name} has no parent!`);
    }
    const oldPose = this.$parent!.$copy(this._getComponentToPatch())!;
    if (!(this._inputs.filter((input) => input.isHigh).length === this._inputs.length)) {
      return;
    }
    this.__translate(this.$parent, this.__translation);
    const bodies: IHTML5CanvasElement[] = COMPONENTS.toArray(RigidBodyComponent)
      .map((target) => target.$entity as IHTML5CanvasElement);
    for (let i = 0; i < bodies.length - 1; i++) {
      const bodyA = bodies[i];
      let isCollision = false;
      for (let j = i + 1; j < bodies.length; j++) {
        const bodyB = bodies[j];
        if (!entitiesTouch(bodyA, bodyB)) {
          continue;
        }
        this.$parent.$patch(PoseComponent, oldPose);
        isCollision = true;
        break;
      }
      if (isCollision) {
        break;
      }
    }
  }

  protected _getComponentToPatch(): Ctor<IComponent<IPose>, IPose> {
    return PoseComponent;
  }

  private __translate(entity: IHTML5CanvasElement, pose: IPose): void {
    const oldPose = entity.$copy(this._getComponentToPatch())!;
    const newPose = {
      x: oldPose.x + toNumber(pose.x),
      y: oldPose.y + toNumber(pose.y),
      a: oldPose.a + toNumber(pose.a),
    };
    entity.$patch(this._getComponentToPatch(), newPose);
  }

}