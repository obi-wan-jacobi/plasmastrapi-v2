import HTML5CanvasGame from './HTML5CanvasGame';
import PoseComponent from './components/PoseComponent';
import $ from 'jquery';

/* tslint:disable:no-var-requires */

if (process.env.NODE_ENV === 'development') {
    require('./index.html');
}

const canvas = $('#app-target').get(0) as HTMLCanvasElement;
const game = new HTML5CanvasGame(canvas);

game.engine.factory.components.create(PoseComponent, { x: 50, y: 50, a: 0 });

game.engine.systems.loopOnce();
