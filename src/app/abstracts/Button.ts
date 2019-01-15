import CursorEventComponent from '../../engine/concretes/components/CursorEventComponent';
import Entity from '../../engine/abstracts/Entity';
import { HTML5_COLOUR } from '../../html5/enums/HTML5_COLOUR';
import IPosition2D from '../../geometry/interfaces/IPosition2D';
import PoseComponent from '../../engine/concretes/components/PoseComponent';
import Rectangle from '../../geometry/concretes/Rectangle';
import RenderingComponent from '../../engine/concretes/components/RenderingComponent';
import ShapeComponent from '../../engine/concretes/components/ShapeComponent';
import { settings } from '../game.config';

export default abstract class Button extends Entity {

    constructor(position: IPosition2D) {
        super();
        this.add(CursorEventComponent);
        this.add(PoseComponent, { x: position.x, y: position.y, a: 0 });
        this.add(RenderingComponent, { colour: HTML5_COLOUR.WHITE });
        this.add(ShapeComponent, new Rectangle({
            width: settings.button.width,
            height: settings.button.height,
        }));
    }

}
