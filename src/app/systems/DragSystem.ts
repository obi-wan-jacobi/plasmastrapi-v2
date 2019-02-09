import DragComponent from '../components/DragComponent';
import { OnlyIfEntityHas } from '../../engine/abstracts/Entity';
import { MOUSE_EVENT } from '../../engine/enums/MOUSE_EVENT';
import MouseEventComponent from '../../engine/components/MouseEventComponent';
import MouseEventSystem, {
    OnCursorIntersection, OnMouseEvent,
} from '../../engine/abstracts/systems/MouseEventSystem';
import TranslationComponent from '../components/TranslationComponent';

export default class DragSystem extends MouseEventSystem {

    @OnMouseEvent(MOUSE_EVENT.MOUSE_DOWN)
    @OnlyIfEntityHas(DragComponent)
    @OnCursorIntersection
    public onMouseDown(component: MouseEventComponent): void {
        const translatable = component.entity.add(TranslationComponent);
        translatable.mutate({
            previous: {
                mouse: {
                    x: component.data.x,
                    y: component.data.y,
                },
            },
        });
    }

    @OnMouseEvent(MOUSE_EVENT.MOUSE_UP)
    @OnlyIfEntityHas(DragComponent)
    public onMouseUp(component: MouseEventComponent): void {
        component.entity.remove(TranslationComponent);
    }

}
