import { CURSOR_EVENT } from '../../framework/enums/CURSOR_EVENT';
import CursorEventComponent from '../../framework/concretes/components/CursorEventComponent';
import CursorEventSystem, {
    OnCursorEvent, OnCursorIntersection,
} from '../../framework/abstracts/systems/CursorEventSystem';
import { OnlyIfEntityIsInstanceOf } from '../../framework/concretes/Entity';
import Gate from '../entities/Gate';

export default class GateRemovalSystem extends CursorEventSystem {

    public once(component: CursorEventComponent): void {
        this.__onCursorEndActuation(component);
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_END_ACTUATION)
    @OnlyIfEntityIsInstanceOf(Gate)
    @OnCursorIntersection
    private __onCursorEndActuation(component: CursorEventComponent): void {
        component.entity.unload();
    }

}
