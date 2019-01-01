import Gate from './entities/Gate';
import GateFactoryButton from './entities/GateFactoryButton';
import Plasmastrapi from './Plasmastrapi';
import $ from 'jquery';

if (process.env.NODE_ENV === 'development') {
    require('./index.html');
}

$(() => {
    const canvas = $('#app-target').get(0) as HTMLCanvasElement;
    const game = new Plasmastrapi(canvas);
    game.store.entities.create(GateFactoryButton, { x: 40, y: 40 });
    game.store.entities.create(Gate, { x: 100, y: 200 });
    game.store.entities.create(Gate, { x: 250, y: 250 });
    game.loop.start();
});
