import Batch from '../../framework/invocables/Batch';
import { OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import Gate from '../entities/circuit-elements/Gate';
import GateRemovalCaret from '../entities/tools/carets/GateRemovalCaret';
import { MOUSE_EVENT } from '../../engine/enums/MOUSE_EVENT';
import MouseEventComponent from '../../engine/components/MouseEventComponent';
import MouseEventSystem, {
    MouseIntersectsEntityValidator, OnMouseEvent,
} from '../../engine/abstracts/systems/MouseEventSystem';
import RemoveGateCommand from '../commands/RemoveGateCommand';
import RemoveWireCommand from '../commands/RemoveWireCommand';
import Wire from '../entities/circuit-elements/Wire';

export default class GateRemovalSystem extends MouseEventSystem {

    @OnMouseEvent(MOUSE_EVENT.MOUSE_CLICK)
    @OnlyIfEntityIsInstanceOf(GateRemovalCaret)
    public onMouseCompleteCaretActuationWithCaretRemoveIntersectedGate(component: MouseEventComponent): void {
        this.__removeAnyGatesIntersectedByCaret();
    }

    private __removeAnyGatesIntersectedByCaret(): void {
        this.store.entities.get(Gate).forEach((gate: Gate) => {
            if (MouseIntersectsEntityValidator.invoke(gate.get(MouseEventComponent))) {
                new RemoveGateCommand(gate).invoke();
                this.__removeAnyWiresConnectedToGate(gate);
            }
        });
    }

    private __removeAnyWiresConnectedToGate(gate: Gate): void {
        const batch = new Batch();
        this.store.entities.get(Wire).forEach((wire: Wire) => {
            if (wire.head === gate.input || wire.tail === gate.output) {
                batch.add(new RemoveWireCommand(wire));
            }
        });
        batch.invoke();
    }

}
