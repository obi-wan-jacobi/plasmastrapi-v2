import { Ctor } from '../framework/types/Ctor';
import IEntity from '../engine/interfaces/IEntity';
import Plasmastrapi from './Plasmastrapi';
import editor from './scenes/editor';
import { settings } from './game.config';
import $ from 'jquery';
import stage from './scenes/stage';

if (process.env.NODE_ENV === 'development') {
    require('./index.html');
}

$(() => {
    const canvas = $('#app-target').get(0) as HTMLCanvasElement;
    canvas.width = settings.canvas.width;
    canvas.height = settings.canvas.height;
    const game = new Plasmastrapi(canvas);
    editor.forEach((entity: { Ctor: Ctor<IEntity, any>, args: any }) => {
        game.store.entities.create(entity.Ctor, entity.args as any);
    });
    stage.forEach((entity: { Ctor: Ctor<IEntity, any>, args: any }) => {
        game.store.entities.create(entity.Ctor, entity.args as any);
    });
    game.loop.start();
});
