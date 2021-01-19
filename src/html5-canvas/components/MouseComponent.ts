import Component from 'engine/abstracts/Component';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';

export default class MouseComponent extends Component<{ event?: IMouseEvent; isHovered: boolean }> { }
