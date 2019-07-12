import App from './App';
import Engine from '../engine/Engine';
import HTML5CanvasKeyboardAdapter from '../html5-canvas/HTML5CanvasKeyboardAdaptor';
import HTML5CanvasMouseAdaptor from '../html5-canvas/HTML5CanvasMouseAdaptor';
import { HTML5CanvasViewportAdaptor } from '../html5-canvas/HTML5CanvasViewportAdaptor';
import IAdaptedKeyboardEvent from '../engine/interfaces/IAdaptedKeyboardEvent';
import IAdaptedMouseEvent from '../engine/interfaces/IAdaptedMouseEvent';
import {
    AndGateCreatorButton, BuildArea, GateDestructorButton, NandGateCreatorButton,
    OrGateCreatorButton, WireDestructorButton, XorGateCreatorButton,
} from './entities/editor';
import $ from 'jquery';
import { ClawMachine, PowerSupply } from './entities/machines';
import { PlayButton, SceneArea, ResetButton } from './entities/scenes';
import {
    GateMaskSystem, InputTerminalHandleSystem, OutputTerminalHandleSystem,
    RivetSystem, TerminalWireSystem, WireDestructorHandleSystem,
} from './systems';

const canvas = $('#app-target').get(0) as HTMLCanvasElement;
canvas.focus();
canvas.width = 1280;
canvas.height = 680;

const viewport = new HTML5CanvasViewportAdaptor(canvas);
const mouse = new HTML5CanvasMouseAdaptor(canvas);
const keyboard = new HTML5CanvasKeyboardAdapter(canvas);
const game = new Engine(viewport);

const app = new App({
    viewport,
    mouse,
    keyboard,
    game,
});

const propagateMouseInput = (mouseEvent: IAdaptedMouseEvent) => game.mouse = mouseEvent;
mouse.handler({
    mouseenter: propagateMouseInput,
    mousemove: propagateMouseInput,
    mouseleave: propagateMouseInput,
    mousedown: propagateMouseInput,
    mouseup: propagateMouseInput,
    click: propagateMouseInput,
    none: propagateMouseInput,
});

const propagateKeyboardInput = (keyboardEvent: IAdaptedKeyboardEvent) => game.keyboard = keyboardEvent;
keyboard.handler({
    keydown: propagateKeyboardInput,
    keypress: propagateKeyboardInput,
    keyup: propagateKeyboardInput,
});

game.add(GateMaskSystem);
game.add(WireDestructorHandleSystem);
game.add(InputTerminalHandleSystem);
game.add(OutputTerminalHandleSystem);
game.add(TerminalWireSystem);
game.add(RivetSystem);
app.start();

app.engine.entities.create(AndGateCreatorButton, { x: 30, y: 30 });
app.engine.entities.create(NandGateCreatorButton, { x: 80, y: 30 });
app.engine.entities.create(OrGateCreatorButton, { x: 130, y: 30 });
app.engine.entities.create(XorGateCreatorButton, { x: 180, y: 30 });
app.engine.entities.create(WireDestructorButton, { x: 720, y: 30 });
app.engine.entities.create(GateDestructorButton, { x: 770, y: 30 });
const editor = app.engine.entities.create(BuildArea, { x: 400, y: 340, width: 800, height: 560 });

app.engine.entities.create(PlayButton, { x: 1200, y: 30 });
app.engine.entities.create(ResetButton, { x: 1250, y: 30 });
app.engine.entities.create(SceneArea, { x: 1040, y: 340, width: 440, height: 560 });
const claw = app.engine.entities.create(ClawMachine, { x: 1040, y: 340 });

const power = app.engine.entities.create(PowerSupply, { x: 0, y: 0 });

editor.inputs = claw.inputs;
editor.outputs = [power].concat(claw.outputs);
editor.init();

[
    './threaded-axle-1.png',
    './threaded-axle-2.png',
    './threaded-axle-3.png',
    './threaded-axle-4.png',
    './threaded-axle-5.png',
    './threaded-axle-6.png',
    './threaded-axle-7.png',
    './threaded-axle-8.png',
    './threaded-axle-9.png',
    './threaded-axle-10.png',
].forEach((src) => {
    app.engine.viewport.load(src);
});
