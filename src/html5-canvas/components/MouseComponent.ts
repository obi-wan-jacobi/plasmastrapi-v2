import { Dict, Tuple } from 'base/types';
import Component from 'engine/abstracts/Component';

export default class MouseComponent extends Component<{
  events: Dict<Array<Tuple<string, {}>>>;
  isHovered: boolean;
}> {

}
