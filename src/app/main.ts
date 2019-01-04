// import Gate from './entities/Gate';
import Button from './entities/Button';
import Command from '../framework/concretes/Command';
import CursorEventComponent from '../engine/concretes/components/CursorEventComponent';
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
    const removeWireButton = game.store.entities.create(Button, { x: 40, y: 40 });
    removeWireButton.commands.onCursorCompleteActuation = new Command({ method: (component: CursorEventComponent) => {
        const isWireRemovalSystemLoaded = game.systems.get(WireRemovalSystem);
        if (isWireRemovalSystemLoaded) {
            game.systems.remove(WireRemovalSystem);
        } else {
            game.systems.add(WireRemovalSystem);
        }
    }});
    game.store.entities.create(GateFactoryButton, { x: 40, y: 640 });
    // const gate1 = game.store.entities.create(Gate, { x: 100, y: 100 });
    // const gate2 = game.store.entities.create(Gate, { x: 300, y: 300 });
    // game.store.entities.create(Wire, { head: gate2.input, tail: gate1.output });
    game.loop.start();
});
