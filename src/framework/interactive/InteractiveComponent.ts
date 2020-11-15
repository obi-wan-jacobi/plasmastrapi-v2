import Component from 'engine/abstracts/Component';
import IAdaptedMouseEvent from 'engine/interfaces/IAdaptedMouseEvent';

type AdaptedMouseEventCallback = (e: IAdaptedMouseEvent) => void;

export interface IInteractive {
  isEnabled: boolean;
  isHovered: boolean;
  mouseenter: AdaptedMouseEventCallback;
  mouseleave: AdaptedMouseEventCallback;
  mousemove: AdaptedMouseEventCallback;
  mousedown: AdaptedMouseEventCallback;
  mouseup: AdaptedMouseEventCallback;
  click: AdaptedMouseEventCallback;
}
export default class InteractiveComponent extends Component<IInteractive> { }
