/* eslint-disable @typescript-eslint/no-unused-vars */
import App from './App';
import ShapeSystem from 'foundation/presentation/systems/ShapeSystem';
import LabelSystem from 'foundation/presentation/systems/LabelSystem';
import ImageSystem from 'foundation/presentation/systems/ImageSystem';
import AnimationSystem from 'foundation/presentation/systems/AnimationSystem';
import LineSystem from 'foundation/presentation/systems/LineSystem';
import UIPane from './ui/UIPane';
import GateButton from './ui/buttons/GateButton';
import InputController from './controllers/InputController';
import DefaultTool from './tools/DefaultTool';
import ToolController from './controllers/ToolController';
import AndGate from './gates/AndGate';
import NandGate from './gates/NandGate';
import TrashButton from './ui/buttons/TrashButton';
import DesignPane from './ui/DesignPane';
import WireCutterButton from './ui/buttons/WireCutterButton';
import PlayButton from './ui/buttons/PlayButton';
import PowerSource from './gates/PowerSource';
import StopButton from './ui/buttons/StopButton';
import PoseSystem from './systems/PoseSystem';
import Claw from 'contraptions/parts/Claw';
import TheClaw from 'contraptions/the-claw/TheClaw';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import VelocitySystem from 'foundation/physics/systems/VelocitySystem';
import CollisionSystem from 'foundation/physics/systems/CollisionSystem';

const canvas = document.getElementById('app-target') as HTMLCanvasElement;
canvas.width = 1280;
canvas.height = 680;
canvas.focus();

export const app = new App({ canvas,
  systems: [
    PoseSystem,
    ShapeSystem,
    LineSystem,
    LabelSystem,
    ImageSystem,
    AnimationSystem,
    VelocitySystem,
    CollisionSystem,
  ],
});

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
].forEach((src) => app.load(src));

const inputController = new InputController({ canvas, handler: new DefaultTool() });
new ToolController(inputController);

const root = new UIPane({ x: 640, y: 340, width: 1280, height: 680 });

root.$appendChild(new GateButton({ x: 25, y: 25, src: './AndGate.png', GateEtor: AndGate }));
root.$appendChild(new GateButton({ x: 75, y: 25, src: './NandGate.png', GateEtor: NandGate }));
root.$appendChild(new TrashButton({ x: 125, y: 25 }));
root.$appendChild(new WireCutterButton({ x: 175, y: 25 }));

root.$appendChild(new DesignPane({ x: 405, y: 340, width: 800, height: 580 }));
root.$appendChild(new PowerSource({ x: 25, y: 610 }));

root.$appendChild(new UIPane({ x: 1050, y: 340, width: 400, height: 580}));
root.$appendChild(new PlayButton({ x: 1050, y: 660 }));
root.$appendChild(new StopButton({ x: 1100, y: 660 }));

// root.$appendChild(new HorizontalThreadedAxle({ x: 200, y: 200, width: 100, height: 50 }));
// root.$appendChild(new VerticalThreadedAxle({ x: 200, y: 200, width: 50, height: 100 }));
const claw = root.$appendChild(new Claw({ x: 1050, y: 200 }));
claw.inputs[0].$patch(PoseComponent, { x: 100, y: 75 });
claw.inputs[1].$patch(PoseComponent, { x: 200, y: 75 });
claw.outputs[0].$patch(PoseComponent, { x: 100, y: 600 });
claw.outputs[1].$patch(PoseComponent, { x: 200, y: 600 });
// const theClaw = root.$appendChild(new TheClaw({ x: 1050, y: 200 }));
// theClaw.inputs[0].$patch(PoseComponent, { x: 100, y: 75 });
// theClaw.inputs[1].$patch(PoseComponent, { x: 200, y: 75 });
// theClaw.outputs[0].$patch(PoseComponent, { x: 100, y: 600 });
// theClaw.outputs[1].$patch(PoseComponent, { x: 200, y: 600 });



app.start();




