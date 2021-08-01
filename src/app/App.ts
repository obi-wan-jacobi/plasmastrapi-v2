/* eslint-disable @typescript-eslint/no-unused-vars */
import Engine from '../engine/Engine';
import HTML5CanvasKeyboardAdapter from '../html5-canvas/HTML5CanvasKeyboardAdaptor';
import HTML5CanvasMouseAdaptor from '../html5-canvas/HTML5CanvasMouseAdaptor';
import HTML5CanvasViewportAdaptor from '../html5-canvas/HTML5CanvasViewportAdaptor';
import ShapeSystem from 'bootstrap/presentation/systems/ShapeSystem';
import LabelSystem from 'bootstrap/presentation/systems/LabelSystem';
import ImageSystem from 'bootstrap/presentation/systems/ImageSystem';
import AnimationSystem from 'bootstrap/presentation/systems/AnimationSystem';

export default class App extends Engine<CanvasImageSource> {

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
            ShapeSystem,
            LabelSystem,
            ImageSystem,
            AnimationSystem,
        ].forEach((SystemClass) => this.add(SystemClass));
    }
}
