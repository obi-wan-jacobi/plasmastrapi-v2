import { IStyle } from './StyleComponent';
import Component from 'src/engine/abstracts/Component';

export interface IImage extends IStyle {
  src: string;
  width?: number;
  height?: number;
  rotate?: number;
}
export default class ImageComponent extends Component<IImage> { }
