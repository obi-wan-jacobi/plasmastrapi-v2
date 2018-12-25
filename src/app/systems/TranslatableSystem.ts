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
        const pose = component.entity.components.get(PoseComponent);
        component.set({
            previous: pose.data
        });
        pose.set(cursor.data.cursor);
    }

}
