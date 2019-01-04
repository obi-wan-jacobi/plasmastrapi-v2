import Command from '../../framework/concretes/Command';
import CursorEventComponent from '../../engine/concretes/components/CursorEventComponent';
import Entity from '../../engine/concretes/Entity';
import { HTML5_COLOUR } from '../../html5/enums/HTML5_COLOUR';
import ICommand from '../../framework/interfaces/ICommand';
import PoseComponent from '../../engine/concretes/components/PoseComponent';
import Rectangle from '../../geometry/concretes/Rectangle';
import RenderingComponent from '../../engine/concretes/components/RenderingComponent';
import ShapeComponent from '../../engine/concretes/components/ShapeComponent';

const __doNothingCommand = new Command({ method: (component: CursorEventComponent) => { return; } });

export default class Button extends Entity {

    public commands: {
        onCursorBeginActuation: ICommand<CursorEventComponent, void>,
        onCursorEndActuation: ICommand<CursorEventComponent, void>,
        onCursorCompleteActuation: ICommand<CursorEventComponent, void>,
    };

    constructor({ x, y }: { x: number, y: number }) {
        super();
        this.commands = {
            onCursorBeginActuation: __doNothingCommand,
            onCursorEndActuation: __doNothingCommand,
            onCursorCompleteActuation: __doNothingCommand,
        };
        this.add(PoseComponent, { x, y });
        this.add(ShapeComponent, new Rectangle({ width: 40, height: 40 }));
        this.add(RenderingComponent, { colour: HTML5_COLOUR.WHITE });
    }

}
