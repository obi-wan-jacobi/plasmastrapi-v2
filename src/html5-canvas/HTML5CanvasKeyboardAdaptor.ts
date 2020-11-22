import IKeyboardEvent from '../engine/interfaces/IKeyboardEvent';
import HTML5EventAdaptor from 'html5-canvas/abstracts/HTML5CanvasEventAdaptor';
import { Dict } from 'foundation/types';

export default class HTML5CanvasKeyboardAdapter extends HTML5EventAdaptor<HTMLCanvasElement, KeyboardEvent, IKeyboardEvent> {

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
});