import Entity from '../framework/concretes/Entity';
import PoseComponent from '../framework/concretes/components/PoseComponent';
import Rectangle from '../framework/concretes/geometry/shapes/Rectangle';
import ShapeComponent from '../framework/concretes/components/ShapeComponent';

export default class Button extends Entity {

    constructor(
        { x, y, width, height, colour }: {x: number, y: number, width: number, height: number, colour: string }
    ) {
        super();
        this.components.add(new PoseComponent({ x, y, a: 0, colour }));
        this.components.add(new ShapeComponent(new Rectangle({ width, height, colour })));
    }

}
