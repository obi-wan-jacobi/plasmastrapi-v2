/* eslint-disable @typescript-eslint/no-unused-vars */
import Engine from '../engine/Engine';
import HTML5CanvasKeyboardAdaptor from '../html5-canvas/HTML5CanvasKeyboardAdaptor';
import HTML5CanvasMouseAdaptor from '../html5-canvas/HTML5CanvasMouseAdaptor';
import HTML5CanvasViewportAdaptor from '../html5-canvas/HTML5CanvasViewportAdaptor';
import IPipe from 'engine/interfaces/IPipe';
import { Stor } from 'engine/types';
import { Dict } from 'base/types';
import IEvent from 'engine/interfaces/IEvent';

export default class App<TPipes extends Dict<IPipe<IEvent>>> extends Engine<CanvasImageSource, TPipes> {

    public constructor({ canvas, pipes, systems }: { canvas: HTMLCanvasElement; pipes?: TPipes; systems: Stor<TPipes>[] }) {
        super({
            viewport: new HTML5CanvasViewportAdaptor({ canvas }),
            pipes: Object.assign({
                mouse: new HTML5CanvasMouseAdaptor({ canvas }),
                keyboard: new HTML5CanvasKeyboardAdaptor({ canvas }),
            }, pipes),
            systems,
        });
    }
}
