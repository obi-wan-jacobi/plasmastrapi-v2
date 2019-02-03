import { CURSOR_EVENT } from '../../engine/enums/CURSOR_EVENT';
import CursorEventComponent from '../../engine/components/CursorEventComponent';
import CursorEventSystem, {
    OnCursorEvent, OnCursorIntersection,
} from '../../engine/abstracts/systems/CursorEventSystem';
import DragComponent from '../components/DragComponent';
import { OnlyIfEntityHas } from '../../engine/abstracts/Entity';
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
        translatable.mutate({
            previous: {
                cursor: {
                    x: component.data.x,
                    y: component.data.y,
                },
            },
        });
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_END_ACTUATION)
    @OnlyIfEntityHas(DragComponent)
    private __onCursorEndActuation(component: CursorEventComponent): void {
        component.entity.remove(TranslationComponent);
    }

}
