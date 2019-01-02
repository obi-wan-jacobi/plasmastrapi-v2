import Entity from '../../engine/concretes/Entity';
import Gate from './Gate';
import GateFactoryComponent from '../components/GateFactoryComponent';
import { HTML5_COLOUR } from '../../html5/enums/HTML5_COLOUR';
import PoseComponent from '../../engine/concretes/components/PoseComponent';
import Rectangle from '../../geometry/concretes/Rectangle';
import RenderableShapeComponent from '../../engine/concretes/components/RenderableShapeComponent';
import ShapeComponent from '../../engine/concretes/components/ShapeComponent';

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
