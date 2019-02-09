import ActivateToolCommand from '../commands/ActivateToolCommand';
import { OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import { MOUSE_EVENT } from '../../engine/enums/MOUSE_EVENT';
import MouseEventComponent from '../../engine/components/MouseEventComponent';
import MouseEventSystem, {
    OnCursorIntersection, OnMouseEvent,
} from '../../engine/abstracts/systems/MouseEventSystem';
import ToolButton from '../abstracts/ToolButton';

export default class ToolButtonSystem extends MouseEventSystem {

    @OnMouseEvent(MOUSE_EVENT.MOUSE_CLICK)
    @OnlyIfEntityIsInstanceOf(ToolButton)
    @OnCursorIntersection
    public onMouseClickActivateTool(component: MouseEventComponent): void {
        new ActivateToolCommand(this.store).invoke({
            position: component.data,
            toolButton: component.entity as ToolButton,
        });
    }

}
