import { Component } from 'src/engine/abstracts/Component';

export interface IStyle {
    colour?: string;
    fill?: string;
    opacity?: number;
    zIndex?: number;
}
export class StyleComponent extends Component<IStyle> {}
