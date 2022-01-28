import IKeyboardEvent from './interfaces/IKeyboardEvent';
import HTML5Pipe from 'html5-canvas/abstracts/HTML5Pipe';
import { Dict } from 'base/types';

export default class HTML5CanvasKeyboardEventPipe extends HTML5Pipe<HTMLCanvasElement, KeyboardEvent, IKeyboardEvent> {

  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    super({
      element: canvas as HTMLCanvasElement & Dict<any>,
      eventNames: KEYBOARD_EVENTS,
      eventMapper: adaptCanvasKeyboardEvent,
    });
  }

}

const KEYBOARD_EVENTS = [
  'keydown',
  'keypress',
  'keyup',
];

const adaptCanvasKeyboardEvent = ({ event }: { event: KeyboardEvent }): IKeyboardEvent => ({
  name: event.type,
  key: event.key,
  isAltKeyDown: event.altKey,
  isShiftKeyDown: event.shiftKey,
});