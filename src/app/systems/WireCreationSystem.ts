import { CURSOR_EVENT } from '../../framework/enums/CURSOR_EVENT';
import CursorEventComponent from '../../framework/concretes/components/CursorEventComponent';
import CursorEventSystem, {
    OnCursorEvent, OnCursorIntersection,
} from '../../framework/abstracts/systems/CursorEventSystem';
import { OnlyIfEntityIsInstanceOf } from '../../framework/concretes/Entity';
import InputTerminal from '../entities/InputTerminal';
import { Optional } from '../../framework/types/Optional';
import OutputTerminal from '../entities/OutputTerminal';
import Wire from '../entities/Wire';
import WireHandle from '../entities/WireHandle';

export default class WireCreationSystem extends CursorEventSystem {

    public once(component: CursorEventComponent): void {
        this.__onCursorBeginActuation(component);
        this.__onCursorEndActuation(component);
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_BEGIN_ACTUATION)
    @OnCursorIntersection
    @OnlyIfEntityIsInstanceOf(OutputTerminal)
    private __onCursorBeginActuation(component: CursorEventComponent): void {
        const wireHandle = this.store.entities.create(WireHandle, { x: component.data.x, y: component.data.y });
        const output = component.entity as OutputTerminal;
        const wire = this.store.entities.create(Wire, { head: wireHandle, tail: output });
        wireHandle.wire = wire;
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_END_ACTUATION)
    @OnlyIfEntityIsInstanceOf(InputTerminal)
    @OnCursorIntersection
    private __onCursorEndActuation(component: CursorEventComponent): void {
        const wireHandle = this.__findAnyExistingWireHandle();
        if (!wireHandle) {
            return;
        }
        this.store.entities.create(Wire, { head: component.entity, tail: wireHandle.wire.tail });
    }

    private __findAnyExistingWireHandle(): Optional<WireHandle> {
        let wireHandle: Optional<WireHandle>;
        const wireHandleCollection = this.store.entities.get(WireHandle);
        if (wireHandleCollection.length > 1) {
            throw new Error(`Memory leak detected: more than one instance of ${WireHandle.name} was found`);
        }
        wireHandleCollection.forEach((instance: WireHandle) => {
            wireHandle = instance;
        });
        return wireHandle;
    }

}
