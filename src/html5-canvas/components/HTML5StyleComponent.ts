import Component from 'engine/abstracts/Component';
import { IStrictStyle } from 'framework/presentation/components/StyleComponent';

export interface IHTML5Style {
  default: IStrictStyle;
  hovered: IStrictStyle;
}

export default class HTML5tyleComponent extends Component<IHTML5Style> {}