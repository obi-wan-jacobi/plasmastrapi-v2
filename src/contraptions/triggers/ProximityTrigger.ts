import MachineOutput from 'contraptions/parts/MachineOutput';
import IEntity from 'engine/interfaces/IEntity';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import { entitiesTouch } from 'foundation/helpers/entities';
import { getDirectionVectorAB } from 'foundation/helpers/geometry';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import Trigger from './Trigger';

export default class ProximityTrigger extends Trigger {

  private __output: MachineOutput;
  private __target: IEntity;

  public constructor({ output, target }: { output: MachineOutput; target: IEntity }) {
    super();
    this.__output = output;
    this.__target = target;
  }

  public invoke(): void {
    const a = this.$parent!.$copy(PoseComponent)!;
    const b = this.__target.$copy(PoseComponent)!;
    const u = getDirectionVectorAB(a, b);
    const originalPose = this.$parent!.$copy(PoseComponent)!;
    this.$parent!.$patch(PoseComponent, {
      x: a.x + u.x,
      y: a.y + u.y,
    });
    if (entitiesTouch(this.$parent!, this.__target)) {
      this.$parent!.$patch(StyleComponent, { colour: 'GREEN' });
      this.__output.high();
    } else {
      this.$parent!.$patch(StyleComponent, { colour: 'WHITE' });
      this.__output.low();
    }
    this.$parent!.$patch(PoseComponent, originalPose);
  }

}