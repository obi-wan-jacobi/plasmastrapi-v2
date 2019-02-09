import { OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import Gate from '../entities/circuit-elements/Gate';
import GateRemovalCaret from '../entities/tools/carets/GateRemovalCaret';
import { MOUSE_EVENT } from '../../engine/enums/MOUSE_EVENT';
import MouseEventComponent from '../../engine/components/MouseEventComponent';
import MouseEventSystem, {
    MouseIntersectsEntityValidator, OnMouseEvent,
} from '../../engine/abstracts/systems/MouseEventSystem';
import RemoveGateCommand from '../commands/RemoveGateCommand';

export default class GateRemovalSystem extends MouseEventSystem {

    @OnMouseEvent(MOUSE_EVENT.MOUSE_CLICK)
    @OnlyIfEntityIsInstanceOf(GateRemovalCaret)
    public onMouseClickRemoveAnyGatesIntersectedByCaret(component: MouseEventComponent): void {
        this.store.entities.get(Gate).forEach((gate: Gate) => {
            if (MouseIntersectsEntityValidator.invoke(gate)) {
                new RemoveGateCommand(this.store).invoke(gate);
            }
        });
    }

}
