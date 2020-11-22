/* eslint-disable @typescript-eslint/no-unused-vars */
import Engine from '../engine/Engine';
import HTML5CanvasKeyboardAdapter from '../html5-canvas/HTML5CanvasKeyboardAdaptor';
import HTML5CanvasMouseAdaptor from '../html5-canvas/HTML5CanvasMouseAdaptor';
import HTML5CanvasViewportAdaptor from '../html5-canvas/HTML5CanvasViewportAdaptor';
import StyleSystem from 'framework/presentation/systems/StyleSystem';
import ImageSystem from 'framework/presentation/systems/ImageSystem';
import LabelSystem from 'framework/presentation/systems/LabelSystem';
import AnimatedImageSystem from 'framework/presentation/systems/AnimatedImageSystem';
import InteractiveSystem from 'framework/interactive/InteractiveSystem';

export default class App extends Engine<CanvasImageSource> {

    public constructor({ canvas }: { canvas: HTMLCanvasElement }) {
        super({
            viewport: new HTML5CanvasViewportAdaptor({ canvas }),
            mouse: new HTML5CanvasMouseAdaptor({ canvas }),
            keyboard: new HTML5CanvasKeyboardAdapter({ canvas }),
        });
        this.__initSystems();
    }

    private __initSystems(): void {
        [
            // InteractiveSystem,
            StyleSystem,
            ImageSystem,
            LabelSystem,
            AnimatedImageSystem,
        ].forEach((SystemClass) => this.add(SystemClass));
    }
}
