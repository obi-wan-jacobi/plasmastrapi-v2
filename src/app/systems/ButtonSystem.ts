import Button from '../entities/Button';
import { CURSOR_EVENT } from '../../engine/enums/CURSOR_EVENT';
import CursorEventComponent from '../../engine/concretes/components/CursorEventComponent';
import CursorEventSystem, {
    OnCursorEvent, OnCursorIntersection,
} from '../../engine/abstracts/systems/CursorEventSystem';
import { OnlyIfEntityIsInstanceOf } from '../../engine/concretes/Entity';

export default class ButtonSystem extends CursorEventSystem {

    public once(component: CursorEventComponent): void {
        this.__onCursorBeginActuation(component);
        this.__onCursorEndActuation(component);
        this.__onCursorCompleteActuation(component);
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_BEGIN_ACTUATION)
    @OnlyIfEntityIsInstanceOf(Button)
    @OnCursorIntersection
    private __onCursorBeginActuation(component: CursorEventComponent): void {
        (component.entity as unknown as Button).commands.onCursorBeginActuation.invoke(component);
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_END_ACTUATION)
    @OnlyIfEntityIsInstanceOf(Button)
    @OnCursorIntersection
    private __onCursorEndActuation(component: CursorEventComponent): void {
        (component.entity as unknown as Button).commands.onCursorEndActuation.invoke(component);
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION)
    @OnlyIfEntityIsInstanceOf(Button)
    @OnCursorIntersection
    private __onCursorCompleteActuation(component: CursorEventComponent): void {
        (component.entity as unknown as Button).commands.onCursorCompleteActuation.invoke(component);
    }

}
