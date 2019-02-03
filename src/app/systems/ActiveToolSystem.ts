import { CURSOR_EVENT } from '../../engine/enums/CURSOR_EVENT';
import ClearActiveToolCommand from '../commands/ClearActiveToolCommand';
import CursorEventComponent from '../../engine/components/CursorEventComponent';
import CursorEventSystem, {
    OnCursorEvent, WhenShiftKeyIsDown, WhenShiftKeyIsUp,
} from '../../engine/abstracts/systems/CursorEventSystem';
import { OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import ResetActiveToolCommand from '../commands/ResetActiveToolCommand';
import ToolCaret from '../abstracts/ToolCaret';

export default class ActiveToolSystem extends CursorEventSystem {

    public once(component: CursorEventComponent): void {
        this.__onCursorCompleteActuationWithCaretDeactivateToolWhenShiftKeyIsUp(component);
        this.__onCursorCompleteActuationWithCaretReactivateToolWhenShiftKeyIsDown(component);
    }

    @WhenShiftKeyIsUp
    @OnCursorEvent(CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION)
    @OnlyIfEntityIsInstanceOf(ToolCaret)
    private __onCursorCompleteActuationWithCaretDeactivateToolWhenShiftKeyIsUp(
        component: CursorEventComponent,
    ): void {
        new ClearActiveToolCommand(this.store).invoke();
    }

    @WhenShiftKeyIsDown
    @OnCursorEvent(CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION)
    @OnlyIfEntityIsInstanceOf(ToolCaret)
    private __onCursorCompleteActuationWithCaretReactivateToolWhenShiftKeyIsDown(
        component: CursorEventComponent,
    ): void {
        new ResetActiveToolCommand(this.store).invoke();
    }

}
