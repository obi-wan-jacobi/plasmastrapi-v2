import { Dict, Tuple } from 'base/types';
import Component from 'engine/abstracts/Component';
import IPipeEvent from 'engine/interfaces/IPipeEvent';

export interface IMouse {
  events: Dict<Array<Tuple<string, {}>>>;
  pipes: Dict<Array<Tuple<string, IPipeEvent>>>;
  isHovered: boolean;
}

export default class MouseComponent extends Component<IMouse> {

}
