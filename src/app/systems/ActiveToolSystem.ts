import ClearActiveToolCommand from '../commands/ClearActiveToolCommand';
import { OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import { MOUSE_EVENT } from '../../engine/enums/MOUSE_EVENT';
import MouseEventComponent from '../../engine/components/MouseEventComponent';
import MouseEventSystem, {
    OnMouseEvent, WhenShiftKeyIsDown, WhenShiftKeyIsUp,
} from '../../engine/abstracts/systems/MouseEventSystem';
import ResetActiveToolCommand from '../commands/ResetActiveToolCommand';
import ToolCaret from '../abstracts/ToolCaret';

export default class ActiveToolSystem extends MouseEventSystem {

    @WhenShiftKeyIsUp
    @OnMouseEvent(MOUSE_EVENT.MOUSE_CLICK)
    @OnlyIfEntityIsInstanceOf(ToolCaret)
    public onMouseClickWithCaretDeactivateToolWhenShiftKeyIsUp(
        component: MouseEventComponent,
    ): void {
        new ClearActiveToolCommand(this.store).invoke();
    }

    @WhenShiftKeyIsDown
    @OnMouseEvent(MOUSE_EVENT.MOUSE_CLICK)
    @OnlyIfEntityIsInstanceOf(ToolCaret)
    public onMouseClickWithCaretReactivateToolWhenShiftKeyIsDown(
        component: MouseEventComponent,
    ): void {
        new ResetActiveToolCommand(this.store).invoke();
    }

}
