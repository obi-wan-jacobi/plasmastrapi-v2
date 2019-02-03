import { Ctor } from '../../framework/types/Ctor';
import Entity from '../../engine/abstracts/Entity';
import { HTML5_COLOUR } from '../../html5/enums/HTML5_COLOUR';
import IPosition2D from '../../geometry/interfaces/IPosition2D';
import InputComponent from '../../engine/components/InputComponent';
import PoseComponent from '../../engine/components/PoseComponent';
import Rectangle from '../../geometry/concretes/Rectangle';
import RenderingComponent from '../../engine/components/RenderingComponent';
import ShapeComponent from '../../engine/components/ShapeComponent';
import ToolCaret from './ToolCaret';
import { settings } from '../game.config';

export default abstract class ToolButton extends Entity {

    /* tslint:disable:naming-convention */
    public ToolCaretCtor: Ctor<ToolCaret, IPosition2D>;
    /* tslint:enable:naming-convention */

    constructor({ position, ToolCaretCtor }: { position: IPosition2D, ToolCaretCtor: Ctor<ToolCaret, IPosition2D> }) {
        super();
        this.ToolCaretCtor = ToolCaretCtor;
        this.add(InputComponent);
        this.add(PoseComponent, { x: position.x, y: position.y, a: 0 });
        this.add(RenderingComponent, { colour: HTML5_COLOUR.WHITE });
        this.add(ShapeComponent, new Rectangle({
            width: settings.button.width,
            height: settings.button.height,
        }));
    }

}
