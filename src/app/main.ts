// import Gate from './entities/Gate';
import GateFactoryButton from './entities/GateFactoryButton';
import Plasmastrapi from './Plasmastrapi';
// import Wire from './entities/Wire';
import WireRemovalSystem from './systems/WireRemovalSystem';
import $ from 'jquery';

if (process.env.NODE_ENV === 'development') {
    require('./index.html');
}

$(() => {
    const canvas = $('#app-target').get(0) as HTMLCanvasElement;
    const game = new Plasmastrapi(canvas);
    game.systems.add(WireRemovalSystem);
    game.store.entities.create(GateFactoryButton, { x: 40, y: 40 });
    // const gate1 = game.store.entities.create(Gate, { x: 100, y: 100 });
    // const gate2 = game.store.entities.create(Gate, { x: 300, y: 300 });
    // game.store.entities.create(Wire, { head: gate2.input, tail: gate1.output });
    game.loop.start();
});
