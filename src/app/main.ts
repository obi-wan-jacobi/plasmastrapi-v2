import Button from './entities/Button';
import Plasmastrapi from './Plasmastrapi';
import $ from 'jquery';

if (process.env.NODE_ENV === 'development') {
    require('./index.html');
}

$(() => {
    const canvas = $('#app-target').get(0) as HTMLCanvasElement;
    const game = new Plasmastrapi(canvas);

    game.store.entities.create(Button, { x: 50, y: 50, width: 50, height: 50 });

    game.loop.start();
});
