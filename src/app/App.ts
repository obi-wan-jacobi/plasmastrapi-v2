/* eslint-disable @typescript-eslint/no-unused-vars */
import Engine from '../engine/Engine';
import HTML5CanvasKeyboardAdaptor from '../html5-canvas/HTML5CanvasKeyboardEventPipe';
import HTML5CanvasMouseEventPipe from '../html5-canvas/HTML5CanvasMouseEventPipe';
import HTML5CanvasViewport from '../html5-canvas/HTML5CanvasViewport';
import IPipe from 'engine/interfaces/IPipe';
import { Stor } from 'engine/types';
import { Dict } from 'base/types';
import IPipeEvent from 'engine/interfaces/IPipeEvent';

export default class App<TPipes extends Dict<IPipe<IPipeEvent>>> extends Engine<CanvasImageSource, TPipes> {

    public constructor({ canvas, pipes, systems }: { canvas: HTMLCanvasElement; pipes?: TPipes; systems: Stor<TPipes>[] }) {
        super({
            viewport: new HTML5CanvasViewport({ canvas }),
            pipes: Object.assign({
                mouse: new HTML5CanvasMouseEventPipe({ canvas }),
                keyboard: new HTML5CanvasKeyboardAdaptor({ canvas }),
            }, pipes),
            systems,
        });
    }
}
