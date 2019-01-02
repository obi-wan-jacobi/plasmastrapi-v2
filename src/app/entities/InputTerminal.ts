import ChildPoseOffsetComponent from '../../engine/concretes/components/ChildPoseOffsetComponent';
import Entity from '../../engine/concretes/Entity';
import { HTML5_COLOUR } from '../../html5/enums/HTML5_COLOUR';
import PoseComponent from '../../engine/concretes/components/PoseComponent';
import Rectangle from '../../geometry/concretes/Rectangle';
import RenderableShapeComponent from '../../engine/concretes/components/RenderableShapeComponent';
import ShapeComponent from '../../engine/concretes/components/ShapeComponent';

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
