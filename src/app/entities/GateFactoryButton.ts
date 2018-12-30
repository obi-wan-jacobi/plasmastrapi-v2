import Entity from '../../framework/concretes/Entity';
import Gate from './Gate';
import GateFactoryComponent from '../components/GateFactoryComponent';
import { HTML5_COLOUR } from '../../html5/enums/HTML5_COLOUR';
import PoseComponent from '../../framework/concretes/components/PoseComponent';
import Rectangle from '../../framework/concretes/geometry/shapes/Rectangle';
import RenderableShapeComponent from '../../framework/concretes/components/RenderableShapeComponent';
import ShapeComponent from '../../framework/concretes/components/ShapeComponent';

export default class GateFactoryButton extends Entity {

    constructor(
        { x, y }: {x: number, y: number },
    ) {
        super();
        this.add(PoseComponent, { x, y });
        this.add(ShapeComponent, new Rectangle({ width: 40, height: 40 }));
        this.add(RenderableShapeComponent, { colour: HTML5_COLOUR.WHITE });
        this.add(GateFactoryComponent, { GateCtor: Gate });
    }

}
