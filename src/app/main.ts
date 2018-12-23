import Command from '../framework/concretes/commands/Command';
import Entity from '../framework/concretes/Entity';
import HTML5CanvasGame from '../html5/HTML5CanvasGame';
import HTML5CanvasMouseInputSystem from '../html5/systems/HTML5CanvasMouseInputSystem';
import { HTML5_CANVAS_MOUSE_INPUT_EVENT } from '../html5/enums/HTML5_CANVAS_MOUSE_INPUT_EVENT';
import ICursorPosition from '../framework/interfaces/ICursorPosition';
import Plasmastrapi from './Plasmastrapi';
import PoseComponent from '../framework/concretes/components/PoseComponent';
import Rectangle from '../framework/concretes/geometry/shapes/Rectangle';
import ShapeComponent from '../framework/concretes/components/ShapeComponent';
import $ from 'jquery';

if (process.env.NODE_ENV === 'development') {
    require('./index.html');
}

$(() => {
    const canvas = $('#app-target').get(0) as HTMLCanvasElement;
    const game = new Plasmastrapi(canvas);

    const printCursorPositionCommand = new Command({ method:
        (cursor: ICursorPosition) => {
            // console.log(`{ x: ${cursor.x}, y: ${cursor.y} }`);
        },
    });

    const inputSystem = game.systems.getInputReceiver(HTML5CanvasMouseInputSystem);

    inputSystem.set(
        HTML5_CANVAS_MOUSE_INPUT_EVENT.MOUSE_ENTER,
        printCursorPositionCommand,
    );

    inputSystem.set(
        HTML5_CANVAS_MOUSE_INPUT_EVENT.MOUSE_MOVE,
        printCursorPositionCommand,
    );

    inputSystem.set(
        HTML5_CANVAS_MOUSE_INPUT_EVENT.MOUSE_LEAVE,
        printCursorPositionCommand,
    );

    inputSystem.set(
        HTML5_CANVAS_MOUSE_INPUT_EVENT.LEFT_MOUSE_DOWN,
        printCursorPositionCommand,
    );

    inputSystem.set(
        HTML5_CANVAS_MOUSE_INPUT_EVENT.LEFT_MOUSE_UP,
        printCursorPositionCommand,
    );

    inputSystem.set(
        HTML5_CANVAS_MOUSE_INPUT_EVENT.LEFT_MOUSE_CLICK,
        new Command({
            method: (cursor: ICursorPosition) => {
                const entity = new Entity(); // game.factory.entities.create();
                const poseArgs = { x: cursor.x, y: cursor.y, a: 0, colour: 'red' };
                const shapeArgs = new Rectangle({ width: 50, height: 50, colour: 'blue' });
                entity.components.add(new PoseComponent(poseArgs));
                entity.components.add(new ShapeComponent(shapeArgs));
                game.store.entities.load(entity);
            },
        }),
    );

    game.loop.start();
});
