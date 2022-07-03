import { Dict, Void } from 'base/types';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import IHTML5EventTransform from 'html5-canvas/interfaces/IHTML5EventTransform';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import IInputHandler from '../interfaces/IInputHandler';

export default class InputController {

  private __handler: IInputHandler & Dict<Void<IMouseEvent>>;

  public constructor({ canvas, handler }: { canvas: HTMLCanvasElement; handler: IInputHandler }) {
    this.__handler = handler as IInputHandler & Dict<Void<IMouseEvent>>;
    this.__bindEvents({
      element: canvas,
      eventNames: Object.keys(MOUSE_EVENT),
      eventMapper: adaptCanvasMouseEvent,
    });
  }

  public setHandler(handler: IInputHandler): void {
    this.__handler.dispose();
    this.__handler = handler as IInputHandler & Dict<Void<IMouseEvent>>;
  }

  private __handleMouseEvent(event: IMouseEvent): void {
    if (this.__handler[event.name]) {
      this.__handler[event.name](event);
    }
  }

  private __bindEvents({ element, eventNames, eventMapper }: IHTML5EventTransform<HTMLCanvasElement, MouseEvent, IMouseEvent>): void {
    eventNames.forEach((name) => {
        (element as unknown as Dict<Void<MouseEvent>>)[`on${name}`] = (event: MouseEvent): void => {
            const adaptedEvent = eventMapper({
                event,
                element,
            });
            this.__handleMouseEvent(adaptedEvent);
        };
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