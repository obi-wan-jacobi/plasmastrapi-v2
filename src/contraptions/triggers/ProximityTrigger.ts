import { RGBA_GREEN, RGBA_WHITE } from 'app/ui/COLOUR';
import MachineOutput from 'contraptions/parts/MachineOutput';
import { COMPONENTS } from 'engine/concretes/ComponentMaster';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import { entitiesTouch } from 'foundation/helpers/entities';
import { getDirectionVectorAB } from 'foundation/helpers/geometry';
import RigidBodyComponent from 'foundation/physics/components/RigidBodyComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import IHTML5CanvasElement from 'html5-canvas/interfaces/IHTML5CanvasElement';
import Trigger from './Trigger';

export default class ProximityTrigger extends Trigger {

  public constructor(public output: MachineOutput) {
    super();
  }

  public invoke(): void {
    const a = this.$parent!.$copy(PoseComponent)!;
      const targets = COMPONENTS.toArray(RigidBodyComponent);
      for (const t of targets) {
        const target = t.$entity;
        const b = target.$copy(PoseComponent)!;
        const u = getDirectionVectorAB(a, b);
        const originalPose = this.$parent!.$copy(PoseComponent)!;
        this.$parent!.$patch(PoseComponent, {
          x: a.x + u.x,
          y: a.y + u.y,
        });
        if (entitiesTouch(this.$parent!, target as IHTML5CanvasElement)) {
          this.$parent!.$patch(StyleComponent, { colour: RGBA_GREEN });
          this.output.high();
          this.$parent!.$patch(PoseComponent, originalPose);
          break;
        } else {
          this.$parent!.$patch(StyleComponent, { colour: RGBA_WHITE });
          this.output.low();
          this.$parent!.$patch(PoseComponent, originalPose);
        }
      }
  }

}