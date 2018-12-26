import Entity from '../../framework/concretes/Entity';
import { HTML5_COLOUR } from '../../html5/enums/HTML5_COLOUR';
import PoseComponent from '../../framework/concretes/components/PoseComponent';
import Rectangle from '../../framework/concretes/geometry/shapes/Rectangle';
import RenderingComponent from '../../framework/concretes/components/RenderingComponent';
import ShapeComponent from '../../framework/concretes/components/ShapeComponent';

export default class Button extends Entity {

    constructor(
        { x, y, width, height }: {x: number, y: number, width: number, height: number }
    ) {
        super();
        this.components.add(new PoseComponent({ x, y }));
        this.components.add(new ShapeComponent(new Rectangle({ width, height })));
        this.components.add(new RenderingComponent({ colour: HTML5_COLOUR.RED }));
    }

}
