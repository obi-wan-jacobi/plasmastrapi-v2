import DigitalElement from 'digital-logic/abstracts/DigitalElement';
import { COMPONENTS } from 'engine/concretes/ComponentMaster';
import IComponent from 'engine/interfaces/IComponent';
import IEntity from 'engine/interfaces/IEntity';
import { Ctor } from 'engine/types';
import PoseComponent, { IPose } from 'foundation/geometry/components/PoseComponent';
import { entitiesTouch } from 'foundation/helpers/entities';
import { toNumber } from 'foundation/helpers/math';
import RigidBodyComponent from 'foundation/physics/components/RigidBodyComponent';
import Trigger from './Trigger';

export default class TranslationTrigger extends Trigger {

  private __input: DigitalElement;
  private __translation: IPose | any;

  public constructor({ input, translation }: { input: DigitalElement; translation: IPose | any }) {
    super();
    this.__input = input;
    this.__translation = translation;
  }

  public invoke(): void {
    if (!this.$parent) {
      throw new Error(`${this.constructor.name} has no parent!`);
    }
    const oldPose = this.$parent!.$copy(this._getComponentToPatch())!;
    if (!this.__input.isHigh) {
      return;
    }
    this.__translate(this.$parent, this.__translation);
    const bodies: IEntity[] = COMPONENTS.toArray(RigidBodyComponent)
      .map((target) => target.$entity as IEntity);
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

  private __translate(entity: IEntity, pose: IPose): void {
    const oldPose = entity.$copy(this._getComponentToPatch())!;
    const newPose = {
      x: oldPose.x + toNumber(pose.x),
      y: oldPose.y + toNumber(pose.y),
      a: oldPose.a + toNumber(pose.a),
    };
    entity.$patch(this._getComponentToPatch(), newPose);
  }

}