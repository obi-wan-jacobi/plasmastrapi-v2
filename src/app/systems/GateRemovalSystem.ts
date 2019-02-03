import Batch from '../../framework/invocables/Batch';
import { CURSOR_EVENT } from '../../engine/enums/CURSOR_EVENT';
import { OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import Gate from '../entities/circuit-elements/Gate';
import GateRemovalCaret from '../entities/tools/carets/GateRemovalCaret';
import InputComponent from '../../engine/components/InputComponent';
import InputSystem, {
    CursorIntersectsEntityValidator, OnInputEvent,
} from '../../engine/abstracts/systems/InputSystem';
import RemoveGateCommand from '../commands/RemoveGateCommand';
import RemoveWireCommand from '../commands/RemoveWireCommand';
import Wire from '../entities/circuit-elements/Wire';

export default class GateRemovalSystem extends InputSystem {

    public once(component: InputComponent): void {
        this.__onCursorCompleteCaretActuationWithCaretRemoveIntersectedGate(component);
    }

    @OnInputEvent(CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION)
    @OnlyIfEntityIsInstanceOf(GateRemovalCaret)
    private __onCursorCompleteCaretActuationWithCaretRemoveIntersectedGate(component: InputComponent): void {
        this.__removeAnyGatesIntersectedByCaret();
    }

    private __removeAnyGatesIntersectedByCaret(): void {
        this.store.entities.get(Gate).forEach((gate: Gate) => {
            if (CursorIntersectsEntityValidator.invoke(gate.get(InputComponent))) {
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
