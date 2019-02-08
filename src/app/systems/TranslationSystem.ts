import { MOUSE_EVENT } from '../../engine/enums/MOUSE_EVENT';
import MouseEventComponent from '../../engine/components/MouseEventComponent';
import MouseEventSystem, { OnMouseEvent } from '../../engine/abstracts/systems/MouseEventSystem';
import { OnlyIfEntityHas } from '../../engine/abstracts/Entity';
import PoseComponent from '../../engine/components/PoseComponent';
import TranslationComponent from '../components/TranslationComponent';

export default class TranslationSystem extends MouseEventSystem {

    public once(component: MouseEventComponent): void {
        this.__onMouseDown(component);
        this.__onMouseTranslation(component);
    }

    @OnMouseEvent(MOUSE_EVENT.MOUSE_DOWN)
    @OnlyIfEntityHas(PoseComponent)
    @OnlyIfEntityHas(TranslationComponent)
    private __onMouseDown(component: MouseEventComponent): void {
        const translatable = component.entity.get(TranslationComponent);
        if (translatable.data.previous.mouse.x > -Infinity && translatable.data.previous.mouse.y > -Infinity) {
            const pose = component.entity.get(PoseComponent);
            pose.mutate({
                x: pose.data.x + (component.data.x - translatable.data.previous.mouse.x),
                y: pose.data.y + (component.data.y - translatable.data.previous.mouse.y),
                a: pose.data.a,
            });
        }
        translatable.mutate({
            previous: {
                mouse: {
                    x: component.data.x,
                    y: component.data.y,
                },
            },
        });
    }

    @OnMouseEvent(MOUSE_EVENT.MOUSE_MOVE)
    @OnlyIfEntityHas(PoseComponent)
    @OnlyIfEntityHas(TranslationComponent)
    private __onMouseTranslation(component: MouseEventComponent): void {
        const translatable = component.entity.get(TranslationComponent);
        if (translatable.data.previous.mouse.x > -Infinity && translatable.data.previous.mouse.y > -Infinity) {
            const pose = component.entity.get(PoseComponent);
            pose.mutate({
                x: pose.data.x + (component.data.x - translatable.data.previous.mouse.x),
                y: pose.data.y + (component.data.y - translatable.data.previous.mouse.y),
                a: pose.data.a,
            });
        }
        translatable.mutate({
            previous: {
                mouse: {
                    x: component.data.x,
                    y: component.data.y,
                },
            },
        });
    }

}
