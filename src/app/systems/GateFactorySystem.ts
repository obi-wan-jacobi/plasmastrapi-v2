import { CURSOR_EVENT } from '../../engine/enums/CURSOR_EVENT';
import CursorEventComponent from '../../engine/concretes/components/CursorEventComponent';
import CursorEventSystem, {
    OnCursorEvent, OnCursorIntersection,
} from '../../engine/abstracts/systems/CursorEventSystem';
import { OnlyIfEntityHas } from '../../engine/concretes/Entity';
import GateFactoryComponent from '../components/GateFactoryComponent';
import TranslatableComponent from '../../engine/concretes/components/TranslatableComponent';

export default class GateFactorySystem extends CursorEventSystem {

    public once(component: CursorEventComponent): void {
        this.__onCursorBeginActuation(component);
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_BEGIN_ACTUATION)
    @OnCursorIntersection
    @OnlyIfEntityHas(GateFactoryComponent)
    private __onCursorBeginActuation(component: CursorEventComponent): void {
        const factory = component.entity.get(GateFactoryComponent);
        const gate = this.store.entities.create(factory.data.GateCtor, {
            x: component.data.x,
            y: component.data.y,
        });
        gate.add(TranslatableComponent);
    }

}
