import { MOUSE_EVENT } from '../../engine/enums/MOUSE_EVENT';
import MouseEventComponent from '../../engine/components/MouseEventComponent';
import MouseEventSystem, {
    OnMouseEvent, OnMouseIntersection,
} from '../../engine/abstracts/systems/MouseEventSystem';
import DragComponent from '../components/DragComponent';
import { OnlyIfEntityHas } from '../../engine/abstracts/Entity';
import TranslationComponent from '../components/TranslationComponent';

export default class DragSystem extends MouseEventSystem {

    public once(component: MouseEventComponent): void {
        this.__onMouseDown(component);
        this.__onMouseUp(component);
    }

    @OnMouseEvent(MOUSE_EVENT.MOUSE_DOWN)
    @OnlyIfEntityHas(DragComponent)
    @OnMouseIntersection
    private __onMouseDown(component: MouseEventComponent): void {
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
    private __onMouseUp(component: MouseEventComponent): void {
        component.entity.remove(TranslationComponent);
    }

}
