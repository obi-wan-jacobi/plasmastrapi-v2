import System from 'engine/abstracts/System';
import IComponentMaster from 'engine/interfaces/IComponentMaster';
import { entitiesTouch } from 'bootstrap/helpers/entities';
import TouchActivatorComponent from '../components/TouchActivatorComponent';
import TouchSensorComponent from '../components/TouchSensorComponent';

export default class TouchSensorSystem extends System<any> {

  public once({ components }: { components: IComponentMaster }): void {
    components.forEvery(TouchSensorComponent)((touchSensor: TouchSensorComponent) => {
      const activator = components.find(TouchActivatorComponent)((activator) => {
        return entitiesTouch(touchSensor.$entity, activator.$entity);
      });
      if (activator) {
        // return touchSensor.output.high();
      }
      // return touchSensor.output.low();
    });
  }

}