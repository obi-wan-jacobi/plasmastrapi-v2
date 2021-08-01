import { DIGITAL_STATE } from 'digital-logic/enums/DIGITAL_STATE';
import System from 'engine/abstracts/System';
import IComponentMaster from 'engine/interfaces/IComponentMaster';
import IEntity from 'engine/interfaces/IEntity';
import PoseComponent from 'bootstrap/geometry/components/PoseComponent';
import TranslationComponent from 'bootstrap/geometry/components/TranslationComponent';
import StyleComponent from 'bootstrap/presentation/components/StyleComponent';
import ActuatorComponent from '../components/ActuatorComponent';
import MachineComponent from '../components/MachineComponents';

export default class ActuatorSystem extends System<any> {

  public once({ components }: { components: IComponentMaster }): void {
    components.forEvery(ActuatorComponent)(consumeTransform);
  }

}

const consumeTransform = (actuator: ActuatorComponent) => {
  const data = actuator.copy();
  if (!data.transform) {
    return;
  }
  actuator.patch({ transform: undefined });
  const executor = new Executor(actuator.$entity);
  return ((data.transform.valueOf() === DIGITAL_STATE.HIGH)
      ? executor.translate
      : executor.stop
    )();
};

function propagate({}: {}, {}: {}, descriptor: PropertyDescriptor): void {
  const fn = descriptor.value.name;
  descriptor.value = function(): void {
    fn(this);
    this.$children?.forEach(fn);
  };
}

class Executor {

  private __$: IEntity;

  constructor($entity: IEntity) {
    this.__$ = $entity;
  }

  @propagate
  public stop(): void {
    this.__$.$remove(TranslationComponent);
    this.__$.$patch(StyleComponent)({ animation: { isPaused: true }});
  }

  @propagate
  public reset(): void {
    const { initialPose } = this.__$.$copy(MachineComponent)!;
    this.__$.$mutate(PoseComponent)(initialPose);
    this.__$.$remove(TranslationComponent);
    this.__$.$patch(StyleComponent)({
      animation: {
        frame: 0,
        cooldown: 0,
        isPaused: true,
      },
    });
  }

  @propagate
  public translate(): void {
    // this.__$.$mutate(TranslationComponent)(Object.assign({ x: 0, y: 0, a: 0 }, this.$entity.translation));
  }
}