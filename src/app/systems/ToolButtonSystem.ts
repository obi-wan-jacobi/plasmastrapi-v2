import ActivateToolCommand from '../commands/ActivateToolCommand';
import { CURSOR_EVENT } from '../../engine/enums/CURSOR_EVENT';
import CursorEventComponent from '../../engine/components/CursorEventComponent';
import CursorEventSystem, {
    OnCursorEvent, OnCursorIntersection,
} from '../../engine/abstracts/systems/CursorEventSystem';
import { OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import ToolButton from '../abstracts/ToolButton';

export default class ToolButtonSystem extends CursorEventSystem {

    public once(component: CursorEventComponent): void {
        this.__onCursorCompleteActuationWithToolButton(component);
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION)
    @OnlyIfEntityIsInstanceOf(ToolButton)
    @OnCursorIntersection
    private __onCursorCompleteActuationWithToolButton(component: CursorEventComponent): void {
        new ActivateToolCommand(this.store).invoke({
            position: component.data,
            toolButton: component.entity as ToolButton,
        });
    }

}
