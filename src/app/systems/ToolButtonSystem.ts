import ActivateToolCommand from '../commands/ActivateToolCommand';
import { CURSOR_EVENT } from '../../engine/enums/CURSOR_EVENT';
import { OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import InputComponent from '../../engine/components/InputComponent';
import InputSystem, {
    OnCursorIntersection, OnInputEvent,
} from '../../engine/abstracts/systems/InputSystem';
import ToolButton from '../abstracts/ToolButton';

export default class ToolButtonSystem extends InputSystem {

    public once(component: InputComponent): void {
        this.__onCursorCompleteActuationWithToolButton(component);
    }

    @OnInputEvent(CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION)
    @OnlyIfEntityIsInstanceOf(ToolButton)
    @OnCursorIntersection
    private __onCursorCompleteActuationWithToolButton(component: InputComponent): void {
        new ActivateToolCommand(this.store).invoke({
            position: component.data,
            toolButton: component.entity as ToolButton,
        });
    }

}
