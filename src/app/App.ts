/* eslint-disable @typescript-eslint/no-unused-vars */
import Engine from '../engine/Engine';
import HTML5CanvasKeyboardAdapter from '../html5-canvas/HTML5CanvasKeyboardAdaptor';
import HTML5CanvasMouseAdaptor from '../html5-canvas/HTML5CanvasMouseAdaptor';
import HTML5CanvasViewportAdaptor from '../html5-canvas/HTML5CanvasViewportAdaptor';
import IPipe from 'engine/interfaces/IPipe';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import IKeyboardEvent from 'html5-canvas/interfaces/IKeyboardEvent';
import { Stor } from 'engine/types';

type MyPipes = {
    mouse: IPipe<IMouseEvent>;
    keyboard: IPipe<IKeyboardEvent>;
};

export default class App extends Engine<CanvasImageSource, MyPipes> {

    public constructor({ canvas, systems }: { canvas: HTMLCanvasElement; systems: Stor<MyPipes>[] }) {
        super({
            viewport: new HTML5CanvasViewportAdaptor({ canvas }),
            pipes: {
                mouse: new HTML5CanvasMouseAdaptor({ canvas }),
                keyboard: new HTML5CanvasKeyboardAdapter({ canvas }),
            },
            systems,
        });
    }
}
