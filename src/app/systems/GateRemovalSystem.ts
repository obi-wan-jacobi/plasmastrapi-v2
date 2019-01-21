import ActiveItemFrame from '../entities/ActiveItemFrame';
import { CURSOR_EVENT } from '../../engine/enums/CURSOR_EVENT';
import CursorEventComponent from '../../engine/components/CursorEventComponent';
import CursorEventSystem, {
    CursorIntersectsEntityValidator, OnCursorEvent, OnCursorIntersection,
} from '../../engine/abstracts/systems/CursorEventSystem';
import { OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import Gate from '../entities/circuit-elements/Gate';
import GateRemovalButton from '../entities/buttons/GateRemovalButton';
import GateRemovalCaret from '../entities/tool-carets/GateRemovalCaret';
import Wire from '../entities/circuit-elements/Wire';

export default class GateRemovalSystem extends CursorEventSystem {

    public once(component: CursorEventComponent): void {
        this.__onCursorCompleteActuation(component);
        this.__onCursorCompleteCaretActuation(component);
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION)
    @OnlyIfEntityIsInstanceOf(GateRemovalButton)
    @OnCursorIntersection
    private __onCursorCompleteActuation(component: CursorEventComponent): void {
        this.store.entities.create(GateRemovalCaret, component.data);
        this.store.entities.create(ActiveItemFrame, component.entity);
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION)
    @OnlyIfEntityIsInstanceOf(GateRemovalCaret)
    private __onCursorCompleteCaretActuation(component: CursorEventComponent): void {
        const caret = component.entity;
        this.__removeAnyGatesIntersectedByCaret(caret);
        caret.unload();
        this.store.entities.get(ActiveItemFrame).forEach((frame) => frame.unload());
    }

    private __removeAnyGatesIntersectedByCaret(caret: GateRemovalCaret): void {
        this.store.entities.get(Gate).forEach((gate: Gate) => {
            if (CursorIntersectsEntityValidator.invoke(gate.get(CursorEventComponent))) {
                gate.unload();
                this.__removeConnectedWires(gate);
            }
        });
    }

    private __removeConnectedWires(gate: Gate): void {
        this.store.entities.get(Wire).forEach((wire: Wire) => {
            if (wire.head === gate.input || wire.tail === gate.output) {
                wire.unload();
            }
        });
    }

}
