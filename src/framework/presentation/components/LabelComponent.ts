import { IStyle } from './StyleComponent';
import Component from 'engine/abstracts/Component';

export interface ILabel extends IStyle {
  text?: string;
  fontSize?: number;
  offset?: { x: number; y: number };
}
export default class LabelComponent extends Component<ILabel> { }
