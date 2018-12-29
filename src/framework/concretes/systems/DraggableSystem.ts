import { CURSOR_EVENT } from '../../enums/CURSOR_EVENT';
import CursorEventComponent from '../components/CursorEventComponent';
import CursorEventSystem, { OnCursorEvent, OnCursorIntersection } from '../../abstracts/systems/CursorEventSystem';
import DraggableComponent from '../components/DraggableComponent';
import { OnlyIfEntityHas } from '../Entity';
import TranslatableComponent from '../components/TranslatableComponent';

export default class DraggableSystem extends CursorEventSystem {

    public once(component: CursorEventComponent): void {
        this.__onCursorBeginActuation(component);
        this.__onCursorEndActuation(component);
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_BEGIN_ACTUATION)
    @OnCursorIntersection
    @OnlyIfEntityHas(DraggableComponent)
    private __onCursorBeginActuation(component: CursorEventComponent): void {
        const translatable = component.entity.add(TranslatableComponent);
        translatable.data.previous.cursor.x = component.data.x;
        translatable.data.previous.cursor.y = component.data.y;
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_END_ACTUATION)
    @OnlyIfEntityHas(DraggableComponent)
    private __onCursorEndActuation(component: CursorEventComponent): void {
        component.entity.remove(TranslatableComponent);
    }

}
