import Engine from '../engine/Engine';
import HTML5CanvasKeyboardAdapter from '../html5-canvas/HTML5CanvasKeyboardAdaptor';
import HTML5CanvasMouseAdaptor from '../html5-canvas/HTML5CanvasMouseAdaptor';
import { HTML5CanvasViewportAdaptor } from '../html5-canvas/HTML5CanvasViewportAdaptor';
import IAdaptedKeyboardEvent from '../engine/interfaces/IAdaptedKeyboardEvent';
import IAdaptedMouseEvent from '../engine/interfaces/IAdaptedMouseEvent';
import IEngine from '../engine/interfaces/IEngine';
import IKeyboardAdaptor from '../engine/interfaces/IKeyboardAdaptor';
import IMouseAdaptor from '../engine/interfaces/IMouseAdaptor';
import IViewportAdaptor from '../engine/interfaces/IViewportAdaptor';
import { MotionSystem } from 'src/framework/geometry/systems/MotionSystem';
import { InteractiveSystem } from 'src/framework/interactive/InteractiveSystem';
import AccelerationSystem from 'src/framework/physics/systems/AccelerationSystem';
import VelocitySystem from 'src/framework/physics/systems/VelocitySystem';
import { AnimatedImageSystem } from 'src/framework/presentation/systems/AnimationSystem';
import ImageSystem from 'src/framework/presentation/systems/ImageSystem';
import LabelSystem from 'src/framework/presentation/systems/LabelSystem';
import ShapeSystem from 'src/framework/presentation/systems/ShapeSystem';
import {
    GateMaskSystem, InputTerminalHandleSystem, OutputTerminalHandleSystem, RivetSystem,
    TerminalWireSystem, WireDestructorHandleSystem,
} from './systems';

export default class App {

    public viewport: IViewportAdaptor<CanvasImageSource>;
    public mouse: IMouseAdaptor;
    public keyboard: IKeyboardAdaptor;
    public engine: IEngine;

    constructor({ canvas }: { canvas: HTMLCanvasElement & any }) {
        this.viewport = new HTML5CanvasViewportAdaptor(canvas);
        this.mouse = new HTML5CanvasMouseAdaptor(canvas);
        this.keyboard = new HTML5CanvasKeyboardAdapter(canvas);
        this.engine = new Engine(this.viewport);
        this.__initSystems();
        this.__initInputsHandlers();
    }

    public once(): void {
        this.mouse.once();
        this.keyboard.once();
        this.engine.once();
        this.viewport.refresh();
        this.engine.draw();
    }

    public start(): void {
        setInterval(this.once.bind(this), 1000 / 240);
    }

    private __initInputsHandlers(): void {
        const propagateMouseInput = (mouseEvent: IAdaptedMouseEvent) => this.engine.mouse = mouseEvent;
        this.mouse.handler({
            mouseenter: propagateMouseInput,
            mousemove: propagateMouseInput,
            mouseleave: propagateMouseInput,
            mousedown: propagateMouseInput,
            mouseup: propagateMouseInput,
            click: propagateMouseInput,
            none: propagateMouseInput,
        });
        const propagateKeyboardInput = (keyboardEvent: IAdaptedKeyboardEvent) => this.engine.keyboard = keyboardEvent;
        this.keyboard.handler({
            keydown: propagateKeyboardInput,
            keypress: propagateKeyboardInput,
            keyup: propagateKeyboardInput,
        });
    }

    private __initSystems(): void {
        this.engine.add(LabelSystem);
        this.engine.add(ShapeSystem);
        this.engine.add(ImageSystem);
        this.engine.add(AnimatedImageSystem);
        this.engine.add(InteractiveSystem);
        this.engine.add(MotionSystem);
        this.engine.add(AccelerationSystem);
        this.engine.add(VelocitySystem);

        this.engine.add(GateMaskSystem);
        this.engine.add(WireDestructorHandleSystem);
        this.engine.add(InputTerminalHandleSystem);
        this.engine.add(OutputTerminalHandleSystem);
        this.engine.add(TerminalWireSystem);
        this.engine.add(RivetSystem);
    }
}
