import DigitalElement from 'digital-logic/abstracts/DigitalElement';
import IComponent from 'engine/interfaces/IComponent';
import { Ctor } from 'engine/types';
import PoseComponent, { IPose } from 'foundation/geometry/components/PoseComponent';
import { entitiesTouch } from 'foundation/helpers/entities';
import { toNumber } from 'foundation/helpers/math';
import IHTML5CanvasElement from 'html5-canvas/interfaces/IHTML5CanvasElement';
import DigitalTrigger from './DigitalTrigger';

export default class TranslationTrigger extends DigitalTrigger<IPose> {

  private __bodies?: IHTML5CanvasElement[];
  private __blockers: IHTML5CanvasElement[];

  public constructor({ inputs, high, bodies, blockers }: { inputs: DigitalElement[]; high?: IPose | any; bodies?: IHTML5CanvasElement[]; blockers: IHTML5CanvasElement[] }) {
    super({ inputs, high });
    this.__bodies = bodies;
    this.__blockers = blockers;
  }

  public invoke(): void {
    if (!this.$parent) {
      throw new Error(`${this.constructor.name} has no parent!`);
    }
    const root = this.$parent;
    const oldPose = this.$parent!.$copy(this._getComponentToPatch())!;
    if (!(this._patchOnHigh && this._inputs.filter((input) => input.isHigh).length === this._inputs.length)) {
      return;
    }
    this.__translate(this.$parent, this._patchOnHigh);
    this.__bodies = this.__bodies || [this.$parent!];
    this.__bodies.every((body) => {
      return this.__blockers.every((blocker) => {
        if (!entitiesTouch(body, blocker)) {
          return true;
        }
        root.$patch(this._getComponentToPatch(), oldPose);
        return false;
      });
    });
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