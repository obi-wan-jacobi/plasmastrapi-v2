import { CURSOR_EVENT } from '../../enums/CURSOR_EVENT';
import CursorEventComponent from '../components/CursorEventComponent';
import CursorEventSystem, { OnCursorEvent, OnCursorIntersection } from '../../abstracts/systems/CursorEventSystem';
import { EntityMustPossess } from '../Entity';
import PoseComponent from '../components/PoseComponent';
import TranslatableComponent from '../components/TranslatableComponent';

export default class TranslatableSystem extends CursorEventSystem {

    public once(component: CursorEventComponent): void {
        this.__onCursorTranslation(component);
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_TRANSLATE)
    @EntityMustPossess(PoseComponent)
    @EntityMustPossess(TranslatableComponent)
    private __onCursorTranslation(component: CursorEventComponent): void {
        const translatable = component.entity.components.get(TranslatableComponent);
        if (translatable.data.previous.cursor.x > -Infinity && translatable.data.previous.cursor.y > -Infinity) {
            const pose = component.entity.components.get(PoseComponent);
            pose.data.x = pose.data.x + (component.data.x - translatable.data.previous.cursor.x);
            pose.data.y = pose.data.y + (component.data.y - translatable.data.previous.cursor.y);
        }
        translatable.data.previous.cursor.x = component.data.x;
        translatable.data.previous.cursor.y = component.data.y;
    }

}
