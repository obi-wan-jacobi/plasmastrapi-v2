import { CURSOR_EVENT } from '../../framework/enums/CURSOR_EVENT';
import CursorEventComponent from '../../framework/concretes/components/CursorEventComponent';
import CursorEventSystem, {
    OnCursorEvent, OnCursorIntersection,
} from '../../framework/abstracts/systems/CursorEventSystem';
import Entity, { OnlyIfEntityIsInstanceOf } from '../../framework/concretes/Entity';
import InputTerminal from '../entities/InputTerminal';
import { Optional } from '../../framework/types/Optional';
import OutputTerminal from '../entities/OutputTerminal';
import Wire from '../entities/Wire';
import WireHandle from '../entities/WireHandle';

export default class WireCreationSystem extends CursorEventSystem {

    public once(component: CursorEventComponent): void {
        this.__onCursorBeginActuationWithInputTerminal(component);
        this.__onCursorBeginActuationWithOutputTerminal(component);
        this.__onCursorEndActuationWithInputTerminal(component);
        this.__onCursorEndActuationWithOutputTerminal(component);
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_BEGIN_ACTUATION)
    @OnCursorIntersection
    @OnlyIfEntityIsInstanceOf(OutputTerminal)
    private __onCursorBeginActuationWithOutputTerminal(component: CursorEventComponent): void {
        const wireHandle = this.store.entities.create(WireHandle, { x: component.data.x, y: component.data.y });
        const output = component.entity as OutputTerminal;
        const wire = this.store.entities.create(Wire, { head: wireHandle, tail: output });
        wireHandle.wire = wire;
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_BEGIN_ACTUATION)
    @OnCursorIntersection
    @OnlyIfEntityIsInstanceOf(InputTerminal)
    private __onCursorBeginActuationWithInputTerminal(component: CursorEventComponent): void {
        const wireHandle = this.store.entities.create(WireHandle, { x: component.data.x, y: component.data.y });
        const input = component.entity as InputTerminal;
        const wire = this.store.entities.create(Wire, { head: input, tail: wireHandle });
        wireHandle.wire = wire;
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_END_ACTUATION)
    @OnlyIfEntityIsInstanceOf(InputTerminal)
    @OnCursorIntersection
    private __onCursorEndActuationWithInputTerminal(component: CursorEventComponent): void {
        const wireHandle = this.__findAnyExistingWireHandle();
        if (!wireHandle) {
            return;
        }
        this.__createNewWireIfNotDuplicated({ head: component.entity, tail: wireHandle.wire.tail });
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_END_ACTUATION)
    @OnlyIfEntityIsInstanceOf(OutputTerminal)
    @OnCursorIntersection
    private __onCursorEndActuationWithOutputTerminal(component: CursorEventComponent): void {
        const wireHandle = this.__findAnyExistingWireHandle();
        if (!wireHandle) {
            return;
        }
        this.__createNewWireIfNotDuplicated({ head: wireHandle.wire.head, tail: component.entity });
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

    private __createNewWireIfNotDuplicated({ head, tail}: { head: Entity, tail: Entity }) {
        const duplicate = this.store.entities.get(Wire).find((wire: Wire) => {
            return wire.head === head && wire.tail === tail;
        });
        if (!duplicate) {
            this.store.entities.create(Wire, { head, tail });
        }
    }

}
