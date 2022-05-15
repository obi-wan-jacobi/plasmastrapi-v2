import MachineOutput from 'contraptions/parts/MachineOutput';
import IEntity from 'engine/interfaces/IEntity';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import { entitiesTouch } from 'foundation/helpers/entities';
import { getDirectionVectorAB } from 'foundation/helpers/geometry';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import Trigger from './Trigger';

export default class ProximityTrigger extends Trigger {

  private __target: IEntity;
  private __output: MachineOutput;
  private __proximity: number;

  public constructor({ target, proximity, output }: { target: IEntity; proximity: number; output: MachineOutput }) {
    super();
    this.__target = target;
    this.__proximity;
    this.__output = output;
  }

  public invoke(): void {
    const a = this.$parent!.$copy(PoseComponent)!;
    const b = this.__target.$copy(PoseComponent)!;
    const u = getDirectionVectorAB(a, b);
    const originalPose = this.$parent!.$copy(PoseComponent)!;
    this.$parent!.$patch(PoseComponent)({
      x: a.x + u.x,
      y: a.y + u.y,
    });
    if (entitiesTouch(this.$parent!, this.__target)) {
      this.$parent!.$patch(StyleComponent)({ colour: 'GREEN' });
    } else {
      this.$parent!.$patch(StyleComponent)({ colour: 'WHITE' });
    }
    this.$parent!.$patch(PoseComponent)(originalPose);
  }

}