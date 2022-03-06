/* eslint-disable @typescript-eslint/no-unused-vars */
import App from './App';
import EditorView from './views/EditorView';
import TheClaw from '../contraptions/the-claw/TheClaw';
import HorizontalThreadedAxle from '../contraptions/parts/HorizontalThreadedAxle';
import MouseSystem from 'html5-canvas/systems/MouseSystem';
import ShapeSystem from 'foundation/presentation/systems/ShapeSystem';
import LabelSystem from 'foundation/presentation/systems/LabelSystem';
import ImageSystem from 'foundation/presentation/systems/ImageSystem';
import AnimationSystem from 'foundation/presentation/systems/AnimationSystem';
import Pipe from 'engine/concretes/Pipe';
import DesignerSystem from './views/designer/systems/DesignerSystem';
import LineSystem from 'foundation/presentation/systems/LineSystem';
import PlayerSystem from './views/designer/systems/PlayerSystem';

const canvas = document.getElementById('app-target') as HTMLCanvasElement;
canvas.width = 1280;
canvas.height = 680;
canvas.focus();

const app = new App({ canvas,
  systems: [
    MouseSystem,
    ShapeSystem,
    LineSystem,
    LabelSystem,
    ImageSystem,
    AnimationSystem,
    PlayerSystem,
    DesignerSystem,
  ],
  pipes: {
    designer: new Pipe(),
    player: new Pipe(),
  },
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

// new HorizontalThreadedAxle({ x: 1040, y: 340, width: 300, height: 20 });
// const claw = new TheClaw({ x: 1040, y: 340 });
new EditorView();
app.start();


