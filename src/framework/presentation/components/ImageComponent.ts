import { IStyle } from './StyleComponent';
import Component from 'engine/abstracts/Component';

export interface IImage extends IStyle {
  src?: string;
  width?: number;
  height?: number;
  rotate?: number;
}
export default class ImageComponent extends Component<IImage> { }
