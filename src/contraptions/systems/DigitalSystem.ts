import { DIGITAL_STATE } from 'digital-logic/enums/DIGITAL_STATE';
import System from 'engine/abstracts/System';
import IComponentMaster from 'engine/interfaces/IComponentMaster';
import { Dict } from 'core/types';
import StyleComponent from 'bootstrap/presentation/components/StyleComponent';
import DigitalComponent from '../components/DigitalComponent';

const DIGITAL_STATE_COLOUR_MAP: Dict<string> = {
  [DIGITAL_STATE.HIGH]: 'GREEN',
  [DIGITAL_STATE.LOW]: 'RED',
  [DIGITAL_STATE.OFF]: 'WHITE',
};

export default class DigitalSystem extends System<any> {

  public once({ components }: { components: IComponentMaster }): void {
    components.forEvery(DigitalComponent)((digital: DigitalComponent) => {
      const data = digital.copy();
      if (!data.transform) {
        return;
      }
      const entity = digital.$entity;
      entity.$patch(DigitalComponent)({ transform: undefined });
      entity.$patch(StyleComponent)({
        colour: DIGITAL_STATE_COLOUR_MAP[data.transform],
      });
    });
    components.forEvery(DigitalComponent)((digital: DigitalComponent) => {
      const data = digital.copy();
      if (!data.transform) {
        return;
      }
      const entity = digital.$entity;
      entity.$patch(DigitalComponent)({
        transform: undefined,
        state: data.transform,
      });
      entity.$patch(StyleComponent)({
        colour: DIGITAL_STATE_COLOUR_MAP[data.transform],
      });
    });
  }

}