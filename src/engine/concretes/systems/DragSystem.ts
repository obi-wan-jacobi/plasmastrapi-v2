import { CURSOR_EVENT } from '../../enums/CURSOR_EVENT';
import CursorEventComponent from '../components/CursorEventComponent';
import CursorEventSystem, { OnCursorEvent, OnCursorIntersection } from '../../abstracts/systems/CursorEventSystem';
import DragComponent from '../components/DragComponent';
import { OnlyIfEntityHas } from '../../abstracts/Entity';
import TranslationComponent from '../components/TranslationComponent';

export default class DragSystem extends CursorEventSystem {

    public once(component: CursorEventComponent): void {
        this.__onCursorBeginActuation(component);
        this.__onCursorEndActuation(component);
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_BEGIN_ACTUATION)
    @OnlyIfEntityHas(DragComponent)
    @OnCursorIntersection
    private __onCursorBeginActuation(component: CursorEventComponent): void {
        const translatable = component.entity.add(TranslationComponent);
        translatable.data.previous.cursor.x = component.data.x;
        translatable.data.previous.cursor.y = component.data.y;
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_END_ACTUATION)
    @OnlyIfEntityHas(DragComponent)
    private __onCursorEndActuation(component: CursorEventComponent): void {
        component.entity.remove(TranslationComponent);
    }

}
