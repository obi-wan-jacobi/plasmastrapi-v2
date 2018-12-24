import Button from './Button';
import { HTML5_COLOUR } from '../html5/enums/HTML5_COLOUR';
import Plasmastrapi from './Plasmastrapi';
import $ from 'jquery';

if (process.env.NODE_ENV === 'development') {
    require('./index.html');
}

$(() => {
    const canvas = $('#app-target').get(0) as HTMLCanvasElement;
    const game = new Plasmastrapi(canvas);

    const button = new Button({ x: 50, y: 50, width: 50, height: 50, colour: HTML5_COLOUR.RED });
    game.store.entities.load(button);

    game.loop.start();
});
