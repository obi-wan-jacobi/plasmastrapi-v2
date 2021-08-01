import Component from 'engine/abstracts/Component';

export interface IStyle {
  colour: string;
  fill: string;
  opacity: number;
}

export default class StyleComponent extends Component<IStyle> { }
