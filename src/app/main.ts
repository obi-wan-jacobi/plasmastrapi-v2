import Command from '../framework/concretes/commands/Command';
import HTML5CanvasGame from '../html5/HTML5CanvasGame';
import HTML5CanvasMouseInputSystem from '../html5/systems/HTML5CanvasMouseInputSystem';
import { HTML5_CANVAS_MOUSE_INPUT_EVENT } from '../html5/enums/HTML5_CANVAS_MOUSE_INPUT_EVENT';
import ICursorPosition from '../framework/interfaces/ICursorPosition';
import PoseComponent from '../framework/concretes/components/PoseComponent';
import Rectangle from '../framework/concretes/geometry/shapes/Rectangle';
import ShapeComponent from '../framework/concretes/components/ShapeComponent';
import $ from 'jquery';

if (process.env.NODE_ENV === 'development') {
    require('./index.html');
}

$(() => {
    const canvas = $('#app-target').get(0) as HTMLCanvasElement;
    const game = new HTML5CanvasGame(canvas);

    const printCursorPositionCommand = new Command({ method:
        (cursor: ICursorPosition) => console.log(`{ x: ${cursor.x}, y: ${cursor.y} }`),
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
                const entity = game.factory.entities.create();
                const poseArgs = { x: cursor.x, y: cursor.y, colour: 'red' };
                const pose = game.factory.components.create<PoseComponent<string>>(PoseComponent, poseArgs);
                const shapeArgs = new Rectangle(50, 50);
                const shape = game.factory.components.create(ShapeComponent, shapeArgs);
                shapeArgs.colour = 'blue';
                entity.add(pose);
                entity.add(shape);
            },
        }),
    );

    game.start();
});
