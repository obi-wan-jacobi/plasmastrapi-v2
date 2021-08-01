import { DIGITAL_STATE } from 'digital-logic/enums/DIGITAL_STATE';
import Component from 'engine/abstracts/Component';

export interface IDigital {
  transform?: DIGITAL_STATE;
  state: DIGITAL_STATE;
}

export default class DigitalComponent extends Component<IDigital> {}