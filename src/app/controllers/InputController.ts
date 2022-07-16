import IController from 'app/interfaces/IController';
import { Dict, Void } from 'base/types';
import IPipeEvent from 'engine/interfaces/IPipeEvent';
import { KEYBOARD_EVENT } from 'html5-canvas/enums/KEYBOARD_EVENT';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import IHTML5EventTransform from 'html5-canvas/interfaces/IHTML5EventTransform';
import IKeyboardEvent from 'html5-canvas/interfaces/IKeyboardEvent';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import IInputHandler from '../interfaces/IInputHandler';

export default class InputController implements IController {

  private __canvas: HTMLCanvasElement;
  private __handler: IInputHandler;

  public constructor({ canvas, handler }: { canvas: HTMLCanvasElement; handler: IInputHandler }) {
    this.__canvas = canvas;
    this.__handler = handler;
  }

  public init(): void {
    bindEvents({
      element: this.__canvas,
      eventNames: Object.keys(MOUSE_EVENT).map((event) => (MOUSE_EVENT as Dict<string>)[event]),
      eventMapper: adaptCanvasMouseEvent,
      callback: this.__handleMouseEvent.bind(this),
    });
    bindEvents({
      element: this.__canvas,
      eventNames: Object.keys(KEYBOARD_EVENT).map((event) => (KEYBOARD_EVENT as Dict<string>)[event]),
      eventMapper: adaptCanvasKeyboardEvent,
      callback: this.__handleKeyboardEvent.bind(this),
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

  private __handleKeyboardEvent(event: IKeyboardEvent): void {
    if (this.__handler[event.name]) {
      this.__handler[event.name](event);
    }
  }

}

const bindEvents = <TSourceEvent extends Event, TAdaptedEvent extends IPipeEvent>({ element, eventNames, eventMapper, callback }: IHTML5EventTransform<HTMLCanvasElement, TSourceEvent, TAdaptedEvent>): void => {
  eventNames.forEach((name) => {
    (element as unknown as Dict<Void<TSourceEvent>>)[`on${name}`] = (event: TSourceEvent): void => {
      const adaptedEvent = eventMapper({
          event,
          element,
      });
      callback(adaptedEvent);
    };
  });
};

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

const adaptCanvasKeyboardEvent = ({ event }: { event: KeyboardEvent }): IKeyboardEvent => ({
  name: event.type,
  key: event.key,
  isAltKeyDown: event.altKey,
  isShiftKeyDown: event.shiftKey,
});