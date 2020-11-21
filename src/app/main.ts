/* eslint-disable @typescript-eslint/no-unused-vars */
import App from './App';
import EditorView from './views/EditorView';
import TheClaw from './contraptions/the-claw/TheClaw';
import $ from 'jquery';
import HorizontalThreadedAxle from './contraptions/parts/HorizontalThreadedAxle';

const canvas = $('#app-target').get(0) as HTMLCanvasElement & any;
canvas.focus();
canvas.width = 1280;
canvas.height = 680;

const app = new App({ canvas });

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

// app.create(HorizontalThreadedAxle, { x: 1040, y: 340, width: 300, height: 20 });
const claw = app.create(TheClaw, { x: 1040, y: 340 });
// app.create(EditorView, { contraption: claw });
app.start();


