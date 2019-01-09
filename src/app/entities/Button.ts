import CursorEventComponent from '../../engine/concretes/components/CursorEventComponent';
import Entity from '../../engine/abstracts/Entity';
import { HTML5_COLOUR } from '../../html5/enums/HTML5_COLOUR';
import PoseComponent from '../../engine/concretes/components/PoseComponent';
import Rectangle from '../../geometry/concretes/Rectangle';
import RenderingComponent from '../../engine/concretes/components/RenderingComponent';
import ShapeComponent from '../../engine/concretes/components/ShapeComponent';

export default class Button extends Entity {

    constructor({ x, y }: { x: number, y: number }) {
        super();
        this.add(CursorEventComponent);
        this.add(PoseComponent, { x, y, a: 0 });
        this.add(RenderingComponent, { colour: HTML5_COLOUR.WHITE });
        this.add(ShapeComponent, new Rectangle({ width: 40, height: 40 }));
    }

}
