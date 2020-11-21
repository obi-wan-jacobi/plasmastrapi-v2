/* eslint-disable @typescript-eslint/no-unused-vars */
import Engine from '../engine/Engine';
import HTML5CanvasKeyboardAdapter from '../html5-canvas/HTML5CanvasKeyboardAdaptor';
import HTML5CanvasMouseAdaptor from '../html5-canvas/HTML5CanvasMouseAdaptor';
import HTML5CanvasViewportAdaptor from '../html5-canvas/HTML5CanvasViewportAdaptor';
import IAdaptedKeyboardEvent from '../engine/interfaces/IAdaptedKeyboardEvent';
import IAdaptedMouseEvent from '../engine/interfaces/IAdaptedMouseEvent';
import IEngine from '../engine/interfaces/IEngine';
import IKeyboardAdaptor from '../engine/interfaces/IKeyboardAdaptor';
import IMouseAdaptor from '../engine/interfaces/IMouseAdaptor';
import IViewportAdaptor from '../engine/interfaces/IViewportAdaptor';
import { Dict } from 'foundation/types';
import IEntity from 'engine/interfaces/IEntity';
import { Etor } from 'engine/types';
import StyleSystem from 'framework/presentation/systems/StyleSystem';
import ImageSystem from 'framework/presentation/systems/ImageSystem';
import LabelSystem from 'framework/presentation/systems/LabelSystem';
import AnimatedImageSystem from 'framework/presentation/systems/AnimatedImageSystem';
import InteractiveSystem from 'framework/interactive/InteractiveSystem';

export default class App {

    private __viewport: IViewportAdaptor<CanvasImageSource>;
    private __mouse: IMouseAdaptor;
    private __keyboard: IKeyboardAdaptor;
    private __engine: IEngine;

    constructor({ canvas }: { canvas: HTMLCanvasElement & Dict<any> }) {
        this.__viewport = new HTML5CanvasViewportAdaptor(canvas);
        this.__mouse = new HTML5CanvasMouseAdaptor(canvas);
        this.__keyboard = new HTML5CanvasKeyboardAdapter(canvas);
        this.__engine = new Engine(this.__viewport);
        this.__initSystems();
        this.__initInputsHandlers();
    }

    public load(src: string): CanvasImageSource {
        return this.__viewport.load(src);
    }

    public create<T extends IEntity, TArg>(EntityConstructor: Etor<T, TArg>, data?: TArg): T {
        return this.__engine.entities.create(EntityConstructor, data);
    }

    public start(): void {
        setInterval(this.__once.bind(this), 1000 / 240);
    }

    private __once(): void {
        this.__mouse.once();
        this.__keyboard.once();
        this.__engine.once();
        this.__viewport.refresh();
        this.__engine.draw();
    }

    private __initInputsHandlers(): void {
        const propagateMouseInput = (mouseEvent: IAdaptedMouseEvent) => this.__engine.mouse = mouseEvent;
        this.__mouse.handler({
            mouseenter: propagateMouseInput,
            mousemove: propagateMouseInput,
            mouseleave: propagateMouseInput,
            mousedown: propagateMouseInput,
            mouseup: propagateMouseInput,
            click: propagateMouseInput,
            none: propagateMouseInput,
        });
        const propagateKeyboardInput = (keyboardEvent: IAdaptedKeyboardEvent) => this.__engine.keyboard = keyboardEvent;
        this.__keyboard.handler({
            keydown: propagateKeyboardInput,
            keypress: propagateKeyboardInput,
            keyup: propagateKeyboardInput,
        });
    }

    private __initSystems(): void {
        [
            // InteractiveSystem,
            StyleSystem,
            ImageSystem,
            LabelSystem,
            AnimatedImageSystem,
        ].forEach((SystemClass) => this.__engine.add(SystemClass));
    }
}
