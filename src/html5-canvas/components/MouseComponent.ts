import Component from 'engine/abstracts/Component';

export interface IMouse {
  x: number;
  y: number;
  isHovered: boolean;
}

export default class MouseComponent extends Component<IMouse> {

}
