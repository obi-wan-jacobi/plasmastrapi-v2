import CursorEventComponent from '../components/CursorEventComponent';
import CursorEventSystem from '../../abstracts/systems/CursorEventSystem';
import { EntityMustPossess } from '../Entity';
import PoseComponent from '../components/PoseComponent';
import TranslatableComponent from '../components/TranslatableComponent';

export default class TranslatableSystem extends CursorEventSystem {

    @EntityMustPossess(TranslatableComponent)
    protected _onCursorTranslate(component: CursorEventComponent): void {
        const translatable = component.entity.components.get(TranslatableComponent);
        if (translatable.data.previous.cursor.x && translatable.data.previous.cursor.y) {
            const pose = component.entity.components.get(PoseComponent);
            pose.data.x = pose.data.x + (component.data.x - translatable.data.previous.cursor.x);
            pose.data.y = pose.data.y + (component.data.y - translatable.data.previous.cursor.y);
        }
        translatable.data.previous.cursor.x = component.data.x;
        translatable.data.previous.cursor.y = component.data.y;
        translatable.data.onTranslate.invoke(component);
    }

}
