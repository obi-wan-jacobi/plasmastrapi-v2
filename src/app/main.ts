import GateFactoryButton from './entities/GateFactoryButton';
import Plasmastrapi from './Plasmastrapi';
import $ from 'jquery';

if (process.env.NODE_ENV === 'development') {
    require('./index.html');
}

$(() => {
    const canvas = $('#app-target').get(0) as HTMLCanvasElement;
    const game = new Plasmastrapi(canvas);

    game.store.entities.create(GateFactoryButton, { x: 40, y: 40, width: 40, height: 40 });

    game.loop.start();
});
