import Gate from './entities/Gate';
import GateFactoryButton from './entities/GateFactoryButton';
import Plasmastrapi from './Plasmastrapi';
import TranslatableComponent from '../framework/concretes/components/TranslatableComponent';
import Wire from './entities/Wire';
import $ from 'jquery';

if (process.env.NODE_ENV === 'development') {
    require('./index.html');
}

$(() => {
    const canvas = $('#app-target').get(0) as HTMLCanvasElement;
    const game = new Plasmastrapi(canvas);
    game.store.entities.create(GateFactoryButton, { x: 40, y: 40 });
    const gate1 = game.store.entities.create(Gate, { x: 100, y: 200 });
    gate1.remove(TranslatableComponent);
    const gate2 = game.store.entities.create(Gate, { x: 250, y: 250 });
    gate2.remove(TranslatableComponent);
    const wire = game.store.entities.create(Wire);
    wire.head = gate1.input;
    wire.tail = gate2.output;
    game.loop.start();
});
