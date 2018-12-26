import { CURSOR_EVENT } from '../../framework/enums/CURSOR_EVENT';
import CursorEventComponent from '../../framework/concretes/components/CursorEventComponent';
import PoseComponent from '../../framework/concretes/components/PoseComponent';
import System from '../../framework/abstracts/systems/System';
import TranslatableComponent from '../components/TranslatableComponent';

export default class TranslatableSystem extends System<TranslatableComponent> {

    constructor() {
        super(TranslatableComponent);
    }

    public once(component: TranslatableComponent): void {
        const cursor = component.entity.components.get(CursorEventComponent);
        if (!cursor || cursor.data.eventName !== CURSOR_EVENT.CURSOR_TRANSLATE) {
            return;
        }
        if (component.data.previous.cursor.x && component.data.previous.cursor.y) {
            const pose = component.entity.components.get(PoseComponent);
            pose.data.x = pose.data.x + (cursor.data.x - component.data.previous.cursor.x);
            pose.data.y = pose.data.y + (cursor.data.y - component.data.previous.cursor.y);
        }
        component.data.previous.cursor.x = cursor.data.x;
        component.data.previous.cursor.y = cursor.data.y;
    }

}
