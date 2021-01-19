import Component from 'engine/abstracts/Component';

export interface IStyle {
  colour?: string;
  fill?: string;
  opacity?: number;
  zIndex?: number;
  label?: ILabel;
  image?: IImage;
  animation?: IAnimation;
}

export interface IImage {
  src?: string;
  width?: number;
  height?: number;
  rotate?: number;
}

export interface ILabel {
  text?: string;
  fontSize?: number;
  offset?: { x: number; y: number };
}

export interface IAnimation {
  frame?: number;
  images?: IImage[];
  isPaused?: boolean;
  isReversed?: boolean;
  duration?: number;
}

export interface IStrictStyle extends IStyle {
  colour: string;
  fill: string;
  opacity: number;
  zIndex: number;
  label?: IStrictLabel;
  image?: IStrictImage;
  animation?: IStrictAnimation;
}

export interface IStrictLabel extends ILabel {
  text: string;
  fontSize: number;
  offset: { x: number; y: number };
}

export interface IStrictImage extends IImage {
  src: string;
}

export interface IStrictAnimation extends IAnimation {
  frame: number;
  images: IStrictImage[];
  isPaused: boolean;
  isReversed: boolean;
  duration: number;
  idur: number;
}

export default class StyleComponent extends Component<IStrictStyle> { }
