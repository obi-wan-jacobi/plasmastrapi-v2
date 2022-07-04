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
import AndGate from '../digital-logic/digital-elements/AndGate';
import NandGate from '../digital-logic/digital-elements/NandGate';
import TrashButton from './ui/buttons/TrashButton';
import DesignPane from './ui/DesignPane';
import WireCutterButton from './ui/buttons/WireCutterButton';
import PowerSource from '../digital-logic/digital-elements/PowerSource';
import TheClaw from 'contraptions/the-claw/TheClaw';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import PoseSystem from 'foundation/presentation/systems/PoseSystem';
import ContraptionController from './controllers/ContraptionController';
import DesignerController from './controllers/DesignerController';

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

app.root.$appendChild(new UIPane({ x: 640, y: 340, width: 1280, height: 680 }));
app.root.$appendChild(new DesignPane({ x: 405, y: 340, width: 800, height: 580 }));
app.root.$appendChild(new PowerSource({ x: 25, y: 610 }));

const theClaw = app.root.$appendChild(new TheClaw({ x: 1050, y: 200 }));

const designerController = new DesignerController();
designerController.setContraptionIO(theClaw);

const inputController = new InputController({ canvas, handler: new DefaultTool() });
new ToolController({
  inputController,
  buttons: [
    new GateButton({ src: './AndGate.png', GateEtor: AndGate }),
    new GateButton({ src: './NandGate.png', GateEtor: NandGate }),
    new TrashButton(),
    new WireCutterButton(),
  ],
});

new ContraptionController(theClaw);

app.start();




