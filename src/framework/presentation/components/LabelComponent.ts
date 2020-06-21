import { IStyle } from './StyleComponent';
import { Component } from 'src/engine/abstracts/Component';

export interface ILabel extends IStyle {
    text: string;
    fontSize: number;
    offset: { x: number, y: number };
}
export class LabelComponent extends Component<ILabel> {}
