import CursorEventComponent from '../../framework/concretes/components/CursorEventComponent';
import DraggableComponent from '../../framework/concretes/components/DraggableComponent';
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
        { x, y, width, height }: {x: number, y: number, width: number, height: number }
    ) {
        super();
        this.components.add(new PoseComponent({ x, y }));
        this.components.add(new ShapeComponent(new Rectangle({ width, height })));
        this.components.add(new RenderableShapeComponent({ colour: HTML5_COLOUR.WHITE }));
        this.components.add(new CursorEventComponent());
        this.components.add(new GateFactoryComponent(Gate));
    }

}
