import { CURSOR_EVENT } from '../../engine/enums/CURSOR_EVENT';
import DragComponent from '../components/DragComponent';
import { OnlyIfEntityHas } from '../../engine/abstracts/Entity';
import InputComponent from '../../engine/components/InputComponent';
import InputSystem, {
    OnCursorIntersection, OnInputEvent,
} from '../../engine/abstracts/systems/InputSystem';
import TranslationComponent from '../components/TranslationComponent';

export default class DragSystem extends InputSystem {

    public once(component: InputComponent): void {
        this.__onCursorBeginActuation(component);
        this.__onCursorEndActuation(component);
    }

    @OnInputEvent(CURSOR_EVENT.CURSOR_BEGIN_ACTUATION)
    @OnlyIfEntityHas(DragComponent)
    @OnCursorIntersection
    private __onCursorBeginActuation(component: InputComponent): void {
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

    @OnInputEvent(CURSOR_EVENT.CURSOR_END_ACTUATION)
    @OnlyIfEntityHas(DragComponent)
    private __onCursorEndActuation(component: InputComponent): void {
        component.entity.remove(TranslationComponent);
    }

}
