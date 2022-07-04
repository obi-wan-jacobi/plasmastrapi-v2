import Engine from '../engine/Engine';
import HTML5CanvasKeyboardAdaptor from '../html5-canvas/HTML5CanvasKeyboardEventPipe';
import HTML5CanvasMouseEventPipe from '../html5-canvas/HTML5CanvasMouseEventPipe';
import HTML5CanvasViewport from '../html5-canvas/HTML5CanvasViewport';
import IPipe from 'engine/interfaces/IPipe';
import { Stor } from 'engine/types';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import IKeyboardEvent from 'html5-canvas/interfaces/IKeyboardEvent';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';

export default class App extends Engine<CanvasImageSource, { mouse: IPipe<IMouseEvent>; keyboard: IPipe<IKeyboardEvent> }> {

    public readonly root = new HTML5CanvasElement();

    public constructor({ canvas, systems }: { canvas: HTMLCanvasElement; systems: Stor[] }) {
        super({
            viewport: new HTML5CanvasViewport({ canvas }),
            pipes: {
                mouse: new HTML5CanvasMouseEventPipe({ canvas }),
                keyboard: new HTML5CanvasKeyboardAdaptor({ canvas }),
            },
            systems,
        });
    }
}
