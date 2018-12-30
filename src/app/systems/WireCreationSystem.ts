import { CURSOR_EVENT } from '../../framework/enums/CURSOR_EVENT';
import CursorEventComponent from '../../framework/concretes/components/CursorEventComponent';
import CursorEventSystem, {
    OnCursorEvent, OnCursorIntersection,
} from '../../framework/abstracts/systems/CursorEventSystem';
import { OnlyIfEntityHas } from '../../framework/concretes/Entity';
import OutputTerminal from '../entities/OutputTerminal';
import OutputTerminalComponent from '../components/OutputTerminalComponent';
import Wire from '../entities/Wire';
import WireHandle from '../entities/WireHandle';

export default class WireCreationSystem extends CursorEventSystem {

    public once(component: CursorEventComponent): void {
        this.__onCursorBeginActuation(component);
        this.__onCursorEndActuation(component);
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_BEGIN_ACTUATION)
    @OnCursorIntersection
    @OnlyIfEntityHas(OutputTerminalComponent)
    private __onCursorBeginActuation(component: CursorEventComponent): void {
        const wireHandle = this.store.entities.create(WireHandle, { x: component.data.x, y: component.data.y });
        const output = component.entity as OutputTerminal;
        const wire = this.store.entities.create(Wire);
        wire.tail = output;
        wire.head = wireHandle;
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_END_ACTUATION)
    @OnlyIfEntityHas(OutputTerminalComponent)
    private __onCursorEndActuation(component: CursorEventComponent): void {
        this.store.entities.get(WireHandle).forEach((wireHandle) => {
                this.store.entities.unload(wireHandle);
        });
        this.store.entities.get(Wire).forEach((wire: Wire) => {
            if (wire.head instanceof WireHandle || wire.tail instanceof WireHandle) {
                this.store.entities.unload(wire);
            }
        });
    }

}
