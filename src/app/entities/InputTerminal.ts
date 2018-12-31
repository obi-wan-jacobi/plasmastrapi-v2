import ChildPoseOffsetComponent from '../../framework/concretes/components/ChildPoseOffsetComponent';
import Entity from '../../framework/concretes/Entity';
import { HTML5_COLOUR } from '../../html5/enums/HTML5_COLOUR';
import PoseComponent from '../../framework/concretes/components/PoseComponent';
import Rectangle from '../../framework/concretes/geometry/shapes/Rectangle';
import RenderableShapeComponent from '../../framework/concretes/components/RenderableShapeComponent';
import ShapeComponent from '../../framework/concretes/components/ShapeComponent';

export default class InputTerminal extends Entity {

    private __parent: Entity;

    constructor(parent: Entity) {
        super();
        this.__parent = parent;
        this.add(PoseComponent, { x: - Infinity, y: -Infinity });
        this.add(ShapeComponent, new Rectangle({ width: 10, height: 10 }));
        this.add(RenderableShapeComponent, { colour: HTML5_COLOUR.YELLOW });
        this.add(ChildPoseOffsetComponent, { offsetX: 0, offsetY: 28 });
    }

    public get parent(): Entity {
        return this.__parent;
    }

}
