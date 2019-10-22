import App from './App';
import {
    AndGateCreatorButton, BuildArea, GateDestructorButton, NandGateCreatorButton,
    OrGateCreatorButton, WireDestructorButton, XorGateCreatorButton,
} from './entities/editor';
import $ from 'jquery';
import { ClawMachine, MachineTarget } from './entities/machines';
import { PlayButton, ResetButton, SceneArea } from './entities/scenes';

const canvas = $('#app-target').get(0) as HTMLCanvasElement & any;
canvas.focus();
canvas.width = 1280;
canvas.height = 680;

const app = new App({ canvas });

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

const prize = app.engine.entities.create(MachineTarget, {
    x: 1170,
    y: 590,
    shape: { points: [
        { x: 10, y: 20 },
        { x: -10, y: 20 },
        { x: -10, y: -20 },
        { x: 10, y: -20 },
    ]},
});

editor.inputs = claw.inputs;
editor.outputs = claw.outputs;
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
].forEach((src) => app.engine.viewport.load(src));
