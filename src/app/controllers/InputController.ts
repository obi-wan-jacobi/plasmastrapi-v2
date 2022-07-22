import IController from 'app/interfaces/IController';
import { app } from 'app/main';
import DefaultTool from 'app/tools/DefaultTool';
import { Constructor, Dict, Void } from 'base/types';
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
  private __handlerArgs: any;
  private __mouse: IMouseEvent = {} as IMouseEvent;
  private __keyboard: IKeyboardEvent = {} as IKeyboardEvent;

  private __isCtrlDown = false;

  public constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    this.__canvas = canvas;
    this.__handler = new DefaultTool();
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

  public setHandler<TArgs>(Handler: Constructor<IInputHandler, TArgs>, args?: TArgs): void {
    this.__handler.dispose();
    if (!(Handler === DefaultTool && this.__keyboard.isShiftDown)) {
      this.__handlerArgs = args;
      this.__handler = new Handler(this.__handlerArgs);
    }
    this.__handler.init({ x: this.__mouse.x, y: this.__mouse.y, ...this.__handlerArgs });
  }

  private __handleMouseEvent(event: IMouseEvent): void {
    this.__mouse = event;
    if (this.__handler[event.name]) {
      this.__handler[event.name](event);
    }
  }

  private __handleKeyboardEvent(event: IKeyboardEvent): void {
    this.__keyboard = event;
    this.__isControlDown(event);
    if (this.__isPasteAction(event)) {
      app.controllers.clipboard.paste(this.__mouse);
      return;
    }
    else if (this.__isUndoAction(event)) {
      app.controllers.command.undo();
    }
    else if (this.__isRedoAction(event)) {
      app.controllers.command.redo();
    }
    else if (this.__isEndOfShiftAction(event) || this.__isEscapeAction(event)) {
      this.setHandler(DefaultTool);
    }
    if (this.__handler[event.name]) {
      this.__handler[event.name](event);
    }
  }

  private __isUndoAction(event: IKeyboardEvent) {
    return this.__isCtrlDown && !event.isShiftDown
      && event.name === KEYBOARD_EVENT.KEY_DOWN && event.key === 'z';
  }

  private __isRedoAction(event: IKeyboardEvent) {
    return this.__isCtrlDown && event.name === KEYBOARD_EVENT.KEY_DOWN
      && ((event.key === 'Z' && event.isShiftDown) || event.key === 'y');
  }

  private __isEndOfShiftAction(event: IKeyboardEvent) {
    return event.name === KEYBOARD_EVENT.KEY_UP && event.key === 'Shift';
  }

  private __isEscapeAction(event: IKeyboardEvent) {
    return event.name === KEYBOARD_EVENT.KEY_DOWN && event.key === 'Escape';
  }

  private __isPasteAction(event: IKeyboardEvent) {
    return this.__isCtrlDown && event.name === KEYBOARD_EVENT.KEY_DOWN && event.key === 'v';
  }

  private __isControlDown(event: IKeyboardEvent) {
    if (event.name === KEYBOARD_EVENT.KEY_DOWN && event.key === 'Control') {
      this.__isCtrlDown = true;
    }
    else if (event.name === KEYBOARD_EVENT.KEY_UP && event.key === 'Control') {
      this.__isCtrlDown = false;
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
  isAltDown: event.altKey,
  isShiftDown: event.shiftKey,
});