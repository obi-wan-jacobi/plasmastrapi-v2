import Plasmastrapi from './Plasmastrapi';
import editor from './scenes/editor';
import { settings } from './game.config';
import $ from 'jquery';

if (process.env.NODE_ENV === 'development') {
    require('./index.html');
}

$(() => {
    const canvas = $('#app-target').get(0) as HTMLCanvasElement;
    canvas.width = settings.canvas.width;
    canvas.height = settings.canvas.height;
    const game = new Plasmastrapi(canvas);
    editor.forEach((entity) => {
        game.store.entities.create(entity.Ctor, entity.args as any);
    });
    game.loop.start();
});
