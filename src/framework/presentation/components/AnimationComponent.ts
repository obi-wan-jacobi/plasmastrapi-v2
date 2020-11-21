import { IImage } from './ImageComponent';
import Component from 'engine/abstracts/Component';

export interface IAnimatedImage {
  images: IImage[];
  frame: number;
  speed: number;
  cooldown: number;
  isPaused?: boolean;
  isReversed?: boolean;
}
export default class AnimatedImageComponent extends Component<IAnimatedImage> { }
