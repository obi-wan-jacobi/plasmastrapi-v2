/* eslint-disable @typescript-eslint/no-unused-vars */
import Engine from '../engine/Engine';
import HTML5CanvasKeyboardAdapter from '../html5-canvas/HTML5CanvasKeyboardAdaptor';
import HTML5CanvasMouseAdaptor from '../html5-canvas/HTML5CanvasMouseAdaptor';
import HTML5CanvasViewportAdaptor from '../html5-canvas/HTML5CanvasViewportAdaptor';
import StyleSystem from 'framework/presentation/systems/StyleSystem';
import IPipe from 'engine/interfaces/IPipe';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import IKeyboardEvent from 'html5-canvas/interfaces/IKeyboardEvent';

export default class App extends Engine<CanvasImageSource, { mouse: IPipe<IMouseEvent>; keyboard: IPipe<IKeyboardEvent> }> {

    public constructor({ canvas }: { canvas: HTMLCanvasElement }) {
        super({
            viewport: new HTML5CanvasViewportAdaptor({ canvas }),
            pipes: {
                mouse: new HTML5CanvasMouseAdaptor({ canvas }),
                keyboard: new HTML5CanvasKeyboardAdapter({ canvas }),
            },
        });
        this.__initSystems();
    }

    private __initSystems(): void {
        [
            // MouseSystem,
            StyleSystem,
        ].forEach((SystemClass) => this.add(SystemClass));
    }
}
