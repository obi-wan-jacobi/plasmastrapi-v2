import { CURSOR_EVENT } from '../../engine/enums/CURSOR_EVENT';
import ClearActiveToolCommand from '../commands/ClearActiveToolCommand';
import { OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import InputComponent from '../../engine/components/InputComponent';
import InputSystem, {
    OnInputEvent, WhenShiftKeyIsDown, WhenShiftKeyIsUp,
} from '../../engine/abstracts/systems/InputSystem';
import ResetActiveToolCommand from '../commands/ResetActiveToolCommand';
import ToolCaret from '../abstracts/ToolCaret';

export default class ActiveToolSystem extends InputSystem {

    public once(component: InputComponent): void {
        this.__onCursorCompleteActuationWithCaretDeactivateToolWhenShiftKeyIsUp(component);
        this.__onCursorCompleteActuationWithCaretReactivateToolWhenShiftKeyIsDown(component);
    }

    @WhenShiftKeyIsUp
    @OnInputEvent(CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION)
    @OnlyIfEntityIsInstanceOf(ToolCaret)
    private __onCursorCompleteActuationWithCaretDeactivateToolWhenShiftKeyIsUp(
        component: InputComponent,
    ): void {
        new ClearActiveToolCommand(this.store).invoke();
    }

    @WhenShiftKeyIsDown
    @OnInputEvent(CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION)
    @OnlyIfEntityIsInstanceOf(ToolCaret)
    private __onCursorCompleteActuationWithCaretReactivateToolWhenShiftKeyIsDown(
        component: InputComponent,
    ): void {
        new ResetActiveToolCommand(this.store).invoke();
    }

}
