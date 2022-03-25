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

const canvas = document.getElementById('app-target') as HTMLCanvasElement;
canvas.width = 1280;
canvas.height = 680;
canvas.focus();

const app = new App({ canvas,
  systems: [
    ShapeSystem,
    LineSystem,
    LabelSystem,
    ImageSystem,
    AnimationSystem,
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

root.$appendChild(new DesignPane({ x: 405, y: 340, width: 800, height: 580 }));

root.$appendChild(new GateButton({ x: 25, y: 25, src: './AndGate.png', GateEtor: AndGate }));
root.$appendChild(new GateButton({ x: 75, y: 25, src: './NandGate.png', GateEtor: NandGate }));
root.$appendChild(new TrashButton({ x: 125, y: 25 }));
root.$appendChild(new WireCutterButton({ x: 175, y: 25 }));


app.start();




