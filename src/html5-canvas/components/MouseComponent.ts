import { Dict, Tuple } from 'core/types';
import Component from 'engine/abstracts/Component';

export default class MouseComponent extends Component<{
  events: Dict<Array<Tuple<string, {}>>>;
  isHovered: boolean;
}> {

}
