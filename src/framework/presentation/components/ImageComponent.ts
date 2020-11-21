import Component from 'engine/abstracts/Component';

export interface IImage {
  src: string;
  opacity: number;
  zIndex: number;
  width?: number;
  height?: number;
  rotate?: number;
}
export default class ImageComponent extends Component<IImage> { }
