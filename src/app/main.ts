import Button from './Button';
import Plasmastrapi from './Plasmastrapi';
import $ from 'jquery';

if (process.env.NODE_ENV === 'development') {
    require('./index.html');
}

$(() => {
    const canvas = $('#app-target').get(0) as HTMLCanvasElement;
    const game = new Plasmastrapi(canvas);

    const button = new Button({ x: 50, y: 50, width: 50, height: 50, colour: 'red' });
    game.store.entities.load(button);

    game.loop.start();
});
