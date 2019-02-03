import { CURSOR_EVENT } from '../../engine/enums/CURSOR_EVENT';
import { OnlyIfEntityHas } from '../../engine/abstracts/Entity';
import InputComponent from '../../engine/components/InputComponent';
import InputSystem, { OnInputEvent } from '../../engine/abstracts/systems/InputSystem';
import PoseComponent from '../../engine/components/PoseComponent';
import TranslationComponent from '../components/TranslationComponent';

export default class TranslationSystem extends InputSystem {

    public once(component: InputComponent): void {
        this.__onCursorBeginActuation(component);
        this.__onCursorTranslation(component);
    }

    @OnInputEvent(CURSOR_EVENT.CURSOR_BEGIN_ACTUATION)
    @OnlyIfEntityHas(PoseComponent)
    @OnlyIfEntityHas(TranslationComponent)
    private __onCursorBeginActuation(component: InputComponent): void {
        const translatable = component.entity.get(TranslationComponent);
        if (translatable.data.previous.cursor.x > -Infinity && translatable.data.previous.cursor.y > -Infinity) {
            const pose = component.entity.get(PoseComponent);
            pose.mutate({
                x: pose.data.x + (component.data.x - translatable.data.previous.cursor.x),
                y: pose.data.y + (component.data.y - translatable.data.previous.cursor.y),
                a: pose.data.a,
            });
        }
        translatable.mutate({
            previous: {
                cursor: {
                    x: component.data.x,
                    y: component.data.y,
                },
            },
        });
    }

    @OnInputEvent(CURSOR_EVENT.CURSOR_TRANSLATE)
    @OnlyIfEntityHas(PoseComponent)
    @OnlyIfEntityHas(TranslationComponent)
    private __onCursorTranslation(component: InputComponent): void {
        const translatable = component.entity.get(TranslationComponent);
        if (translatable.data.previous.cursor.x > -Infinity && translatable.data.previous.cursor.y > -Infinity) {
            const pose = component.entity.get(PoseComponent);
            pose.mutate({
                x: pose.data.x + (component.data.x - translatable.data.previous.cursor.x),
                y: pose.data.y + (component.data.y - translatable.data.previous.cursor.y),
                a: pose.data.a,
            });
        }
        translatable.mutate({
            previous: {
                cursor: {
                    x: component.data.x,
                    y: component.data.y,
                },
            },
        });
    }

}
