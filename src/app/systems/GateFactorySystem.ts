import { CURSOR_EVENT } from '../../framework/enums/CURSOR_EVENT';
import CursorEventComponent from '../../framework/concretes/components/CursorEventComponent';
import CursorEventSystem, {
    OnCursorEvent, OnCursorIntersection
} from '../../framework/abstracts/systems/CursorEventSystem';
import { OnlyIfEntityHas } from '../../framework/concretes/Entity';
import GateFactoryComponent from '../components/GateFactoryComponent';

export default class GateFactorySystem extends CursorEventSystem {

    public once(component: CursorEventComponent): void {
        this.__onCursorBeginActuation(component);
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_BEGIN_ACTUATION)
    @OnCursorIntersection
    @OnlyIfEntityHas(GateFactoryComponent)
    private __onCursorBeginActuation(component: CursorEventComponent): void {
        const factory = component.entity.get(GateFactoryComponent);
        this.store.entities.create(factory.data.GateCtor, {
            x: component.data.x,
            y: component.data.y,
        });
    }

}
