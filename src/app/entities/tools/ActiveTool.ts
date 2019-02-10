import Entity, { EntityHas } from '../../../engine/abstracts/Entity';
import IPosition2D from '../../../geometry/interfaces/IPosition2D';
import MouseEventComponent from '../../../engine/components/MouseEventComponent';
import PoseComponent from '../../../engine/components/PoseComponent';
import ToolButton from '../../abstracts/ToolButton';

@EntityHas(MouseEventComponent)
export default class ActiveTool extends Entity {

    public toolButton: ToolButton;

    constructor({ position, toolButton }: { position: IPosition2D, toolButton: ToolButton }) {
        super();
        this.toolButton = toolButton;
        this.add(PoseComponent, position);
    }

}
