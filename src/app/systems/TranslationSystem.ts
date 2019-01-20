import { CURSOR_EVENT } from '../../engine/enums/CURSOR_EVENT';
import CursorEventComponent from '../../engine/components/CursorEventComponent';
import CursorEventSystem, { OnCursorEvent } from '../../engine/abstracts/systems/CursorEventSystem';
import { OnlyIfEntityHas } from '../../engine/abstracts/Entity';
import PoseComponent from '../../engine/components/PoseComponent';
import TranslationComponent from '../components/TranslationComponent';

export default class TranslationSystem extends CursorEventSystem {

    public once(component: CursorEventComponent): void {
        this.__onCursorBeginActuation(component);
        this.__onCursorTranslation(component);
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_BEGIN_ACTUATION)
    @OnlyIfEntityHas(PoseComponent)
    @OnlyIfEntityHas(TranslationComponent)
    private __onCursorBeginActuation(component: CursorEventComponent): void {
        const translatable = component.entity.get(TranslationComponent);
        if (translatable.data.previous.cursor.x > -Infinity && translatable.data.previous.cursor.y > -Infinity) {
            const pose = component.entity.get(PoseComponent);
            pose.data.x = pose.data.x + (component.data.x - translatable.data.previous.cursor.x);
            pose.data.y = pose.data.y + (component.data.y - translatable.data.previous.cursor.y);
        }
        translatable.data.previous.cursor.x = component.data.x;
        translatable.data.previous.cursor.y = component.data.y;
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_TRANSLATE)
    @OnlyIfEntityHas(PoseComponent)
    @OnlyIfEntityHas(TranslationComponent)
    private __onCursorTranslation(component: CursorEventComponent): void {
        const translatable = component.entity.get(TranslationComponent);
        if (translatable.data.previous.cursor.x > -Infinity && translatable.data.previous.cursor.y > -Infinity) {
            const pose = component.entity.get(PoseComponent);
            pose.data.x = pose.data.x + (component.data.x - translatable.data.previous.cursor.x);
            pose.data.y = pose.data.y + (component.data.y - translatable.data.previous.cursor.y);
        }
        translatable.data.previous.cursor.x = component.data.x;
        translatable.data.previous.cursor.y = component.data.y;
    }

}
