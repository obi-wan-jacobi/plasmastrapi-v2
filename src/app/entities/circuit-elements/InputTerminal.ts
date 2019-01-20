import ChildPoseOffsetComponent from '../../components/ChildPoseOffsetComponent';
import CursorEventComponent from '../../../engine/components/CursorEventComponent';
import Entity from '../../../engine/abstracts/Entity';
import { HTML5_COLOUR } from '../../../html5/enums/HTML5_COLOUR';
import IChild from '../../../framework/interfaces/IChild';
import PoseComponent from '../../../engine/components/PoseComponent';
import Rectangle from '../../../geometry/concretes/Rectangle';
import RenderingComponent from '../../../engine/components/RenderingComponent';
import ShapeComponent from '../../../engine/components/ShapeComponent';
import { settings } from '../../game.config';

export default class InputTerminal extends Entity implements IChild<Entity> {

    public readonly parent: Entity;

    constructor(parent: Entity) {
        super();
        this.parent = parent;
        this.add(CursorEventComponent);
        this.add(PoseComponent, { x: - Infinity, y: -Infinity });
        this.add(ShapeComponent, new Rectangle({
            width: settings.terminal.width,
            height: settings.terminal.height,
        }));
        this.add(RenderingComponent, { colour: HTML5_COLOUR.YELLOW });
        this.add(ChildPoseOffsetComponent, {
            offsetX: settings.terminal.input.offsetX,
            offsetY: settings.terminal.input.offsetY,
        });
    }

}
