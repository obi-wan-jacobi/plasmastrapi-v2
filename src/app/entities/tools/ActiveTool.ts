import CursorEventComponent from '../../../engine/components/CursorEventComponent';
import Entity from '../../../engine/abstracts/Entity';
import IPosition2D from '../../../geometry/interfaces/IPosition2D';
import PoseComponent from '../../../engine/components/PoseComponent';
import ToolButton from '../../abstracts/ToolButton';

export default class ActiveTool extends Entity {

    public toolButton: ToolButton;

    constructor({ position, toolButton }: { position: IPosition2D, toolButton: ToolButton }) {
        super();
        this.toolButton = toolButton;
        this.add(CursorEventComponent);
        this.add(PoseComponent, position);
    }

}
