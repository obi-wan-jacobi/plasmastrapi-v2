import ChildPoseOffsetComponent from '../../engine/concretes/components/ChildPoseOffsetComponent';
import Entity from '../../engine/abstracts/Entity';
import { HTML5_COLOUR } from '../../html5/enums/HTML5_COLOUR';
import IChild from '../../framework/interfaces/IChild';
import PoseComponent from '../../engine/concretes/components/PoseComponent';
import Rectangle from '../../geometry/concretes/Rectangle';
import RenderingComponent from '../../engine/concretes/components/RenderingComponent';
import ShapeComponent from '../../engine/concretes/components/ShapeComponent';

export default class OutputTerminal extends Entity implements IChild<Entity> {

    public readonly parent: Entity;

    constructor(parent: Entity) {
        super();
        this.parent = parent;
        this.add(PoseComponent, { x: - Infinity, y: -Infinity });
        this.add(ShapeComponent, new Rectangle({ width: 10, height: 10 }));
        this.add(RenderingComponent, { colour: HTML5_COLOUR.YELLOW });
        this.add(ChildPoseOffsetComponent, { offsetX: 0, offsetY: -28 });
    }

}
