/* eslint-disable @typescript-eslint/no-unused-vars */
import App from './App';
import ShapeSystem from 'foundation/presentation/systems/ShapeSystem';
import LabelSystem from 'foundation/presentation/systems/LabelSystem';
import ImageSystem from 'foundation/presentation/systems/ImageSystem';
import AnimationSystem from 'foundation/presentation/systems/AnimationSystem';
import LineSystem from 'foundation/presentation/systems/LineSystem';
import InputController from './controllers/InputController';
import DefaultTool from './tools/DefaultTool';
import ToolController from './controllers/ToolController';
import TheClaw from 'contraptions/the-claw/TheClaw';
import PoseSystem from 'foundation/presentation/systems/PoseSystem';
import ContraptionController from './controllers/ContraptionController';
import DesignerController from './controllers/DesignerController';

const canvas = document.getElementById('app-target') as HTMLCanvasElement;
canvas.width = 1280;
canvas.height = 680;
canvas.focus();


export const app = new App({ canvas,
  controllers: {
    input: new InputController({ canvas, handler: new DefaultTool() }),
    tool: new ToolController(),
    designer: new DesignerController(),
    contraption: new ContraptionController(),
  },
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


const theClaw = app.root.$appendChild(new TheClaw({ x: 1050, y: 200 }));
app.controllers.contraption.setContraption(theClaw);

app.init();
app.start();




