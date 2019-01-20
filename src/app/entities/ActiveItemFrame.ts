import ChildPoseOffsetComponent from '../components/ChildPoseOffsetComponent';
import Entity from '../../engine/abstracts/Entity';
import { HTML5_COLOUR } from '../../html5/enums/HTML5_COLOUR';
import IChild from '../../framework/interfaces/IChild';
import PoseComponent from '../../engine/components/PoseComponent';
import Rectangle from '../../geometry/concretes/Rectangle';
import RenderingComponent from '../../engine/components/RenderingComponent';
import ShapeComponent from '../../engine/components/ShapeComponent';

export default class ActiveToolButtonFrame extends Entity implements IChild<Entity> {

    public parent: Entity;

    constructor(entity: Entity) {
        super();
        this.parent = entity;
        this.add(PoseComponent, this.parent.get(PoseComponent).data);
        this.add(RenderingComponent, { colour: HTML5_COLOUR.WHITE });
        this.add(ShapeComponent, new Rectangle({ width: 50, height: 50 }));
        this.add(ChildPoseOffsetComponent, { offsetX: 0, offsetY: 0 });
    }

}
