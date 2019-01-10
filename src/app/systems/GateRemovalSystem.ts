import ActiveToolButtonFrame from '../entities/ActiveToolButtonFrame';
import { CURSOR_EVENT } from '../../engine/enums/CURSOR_EVENT';
import CursorEventComponent from '../../engine/concretes/components/CursorEventComponent';
import CursorEventSystem, {
    CursorIntersectsEntityValidator, OnCursorEvent, OnCursorIntersection,
} from '../../engine/abstracts/systems/CursorEventSystem';
import { OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import Gate from '../entities/circuit-elements/Gate';
import GateRemovalButton from '../entities/buttons/GateRemovalButton';
import GateRemovalCaret from '../entities/tool-carets/GateRemovalCaret';
import PoseComponent from '../../engine/concretes/components/PoseComponent';

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
        this.store.entities.create(ActiveToolButtonFrame, component.entity.get(PoseComponent).data);
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION)
    @OnlyIfEntityIsInstanceOf(GateRemovalCaret)
    private __onCursorCompleteCaretActuation(component: CursorEventComponent): void {
        const caret = component.entity;
        this.__removeAnyGatesIntersectedByCaret(caret);
        caret.unload();
        this.store.entities.get(ActiveToolButtonFrame).forEach((frame) => frame.unload());
    }

    private __removeAnyGatesIntersectedByCaret(caret: GateRemovalCaret): void {
        this.store.entities.get(Gate).forEach((gate) => {
            if (CursorIntersectsEntityValidator.invoke(gate.get(CursorEventComponent))) {
                gate.unload();
            }
        });
    }

}
