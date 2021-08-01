import { Dict } from 'core/types';
import HTML5EventAdaptor from 'html5-canvas/abstracts/HTML5EventAdaptor';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';

export default class HTML5CanvasMouseAdaptor extends HTML5EventAdaptor<HTMLCanvasElement, MouseEvent, IMouseEvent> {

  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    super({
      element: canvas as HTMLCanvasElement & Dict<any>,
      eventNames: MOUSE_EVENTS,
      eventMapper: adaptCanvasMouseEvent,
    });
  }

}

const MOUSE_EVENTS = [
  'mouseenter',
  'mousemove',
  'mouseleave',
  'mousedown',
  'mouseup',
  'click',
];

const adaptCanvasMouseEvent = ({ event, element }: { event: MouseEvent; element: HTMLCanvasElement }): IMouseEvent => {
  const boundingClientRect = element.getBoundingClientRect();
  return {
    name: event.type,
    x: event.clientX - boundingClientRect.left,
    y: event.clientY - boundingClientRect.top,
    isCtrlDown: event.ctrlKey,
    isShiftDown: event.shiftKey,
  };
};