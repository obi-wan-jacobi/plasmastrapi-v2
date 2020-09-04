import { IImage } from './ImageComponent';
import Component from 'src/engine/abstracts/Component';
import IComponent from 'src/engine/interfaces/IComponent';

export interface IAnimation {
  images: IImage[];
  frame: number;
  speed: number;
  cooldown: number;
  isPaused?: boolean;
  isReversed?: boolean;
}
export default class AnimationComponent extends Component<IAnimation> { }
