import fromObjectToPropertyValues from 'base/helpers/fromObjectToPropertyValues';
import { Dict, Void } from 'base/types';
import HTML5EventAdaptor from 'html5-canvas/abstracts/HTML5EventAdaptor';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import { MOUSE_EVENT } from './enums/MOUSE_EVENT';

export default class HTML5CanvasMouseAdaptor extends HTML5EventAdaptor<HTMLCanvasElement, MouseEvent, IMouseEvent> {

  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    super({
      element: canvas as HTMLCanvasElement & Dict<Void<MouseEvent>>,
      eventNames: fromObjectToPropertyValues(MOUSE_EVENT),
      eventMapper: adaptCanvasMouseEvent,
    });
  }

}

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