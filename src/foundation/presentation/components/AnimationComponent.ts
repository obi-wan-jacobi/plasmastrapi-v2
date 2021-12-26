import Component from 'engine/abstracts/Component';

export interface IAnimation {
  frame: number;
  images: { src: string}[];
  isPaused: boolean;
  isReversed: boolean;
  duration: number;
}

export default class AnimationComponent extends Component<IAnimation> { }
