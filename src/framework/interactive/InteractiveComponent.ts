import Component from 'engine/abstracts/Component';
import IMouseEvent from 'engine/interfaces/IMouseEvent';
import { Optional, Void } from 'foundation/types';

type AdaptedMouseEventCallback = Void<IMouseEvent>;

export interface IInteractive {
  isEnabled: boolean;
  isHovered: boolean;
  transform: 'enable' | 'disable' | undefined;
  mouseenter: AdaptedMouseEventCallback;
  mouseleave: Void<Optional<IMouseEvent>>;
  mousemove: AdaptedMouseEventCallback;
  mousedown: AdaptedMouseEventCallback;
  mouseup: AdaptedMouseEventCallback;
  click: AdaptedMouseEventCallback;
}
export default class InteractiveComponent extends Component<IInteractive> { }
