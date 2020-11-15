import App from './App';
import EditorView from './views/EditorView';
import TheClaw from './contraptions/the-claw/TheClaw';
import $ from 'jquery';

const canvas = $('#app-target').get(0) as HTMLCanvasElement & any;
canvas.focus();
canvas.width = 1280;
canvas.height = 680;

const app = new App({ canvas });

app.start();

const claw = app.engine.entities.create(TheClaw, { x: 1040, y: 340 });
app.engine.entities.create(EditorView, { contraption: claw });

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
