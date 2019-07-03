import App from './App';
import Engine from '../engine/Engine';
import HTML5CanvasKeyboardAdapter from '../html5-canvas/HTML5CanvasKeyboardAdaptor';
import HTML5CanvasMouseAdaptor from '../html5-canvas/HTML5CanvasMouseAdaptor';
import { HTML5CanvasViewportAdaptor } from '../html5-canvas/HTML5CanvasViewportAdaptor';
import IAdaptedKeyboardEvent from '../engine/interfaces/IAdaptedKeyboardEvent';
import IAdaptedMouseEvent from '../engine/interfaces/IAdaptedMouseEvent';
import $ from 'jquery';
import {
    BuildArea, GateCreatorButton, GateDestructorButton, PlayButton,
    SceneArea, StopButton, WireDestructorButton,
} from './materials';
import {
    GateMaskSystem, InputTerminalHandleSystem, OutputTerminalHandleSystem, WireDestructorHandleSystem,
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
app.start();

app.engine.entities.create(GateCreatorButton, { x: 30, y: 30 });
app.engine.entities.create(WireDestructorButton, { x: 80, y: 30 });
app.engine.entities.create(GateDestructorButton, { x: 130, y: 30 });
app.engine.entities.create(BuildArea, { x: 400, y: 340, width: 800, height: 560 });

app.engine.entities.create(PlayButton, { x: 1200, y: 30 });
app.engine.entities.create(StopButton, { x: 1250, y: 30 });
app.engine.entities.create(SceneArea, { x: 1040, y: 340, width: 440, height: 560 });
