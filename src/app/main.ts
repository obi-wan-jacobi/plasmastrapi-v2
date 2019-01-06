import Plasmastrapi from './Plasmastrapi';
import editor from './scenes/editor';
import $ from 'jquery';

if (process.env.NODE_ENV === 'development') {
    require('./index.html');
}

$(() => {
    const canvas = $('#app-target').get(0) as HTMLCanvasElement;
    const game = new Plasmastrapi(canvas);
    editor.forEach((entity) => {
        game.store.entities.create(entity.Ctor, entity.args);
    });
    game.loop.start();
});
