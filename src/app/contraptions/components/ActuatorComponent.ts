import { DIGITAL_STATE } from 'app/digital-logic/enums/DIGITAL_STATE';
import Component from 'engine/abstracts/Component';
import { ITranslation } from 'framework/geometry/components/TranslationComponent';

export interface IActuator {
  transform?: DIGITAL_STATE;
  translation: ITranslation;
}

export default class ActuatorComponent extends Component<IActuator> {

}