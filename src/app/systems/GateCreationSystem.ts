import ActiveItemFrame from '../entities/ActiveItemFrame';
import { CURSOR_EVENT } from '../../engine/enums/CURSOR_EVENT';
import CursorEventComponent from '../../engine/components/CursorEventComponent';
import CursorEventSystem, {
    OnCursorEvent, OnCursorIntersection,
} from '../../engine/abstracts/systems/CursorEventSystem';
import { OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import GateCreationButton from '../entities/buttons/GateCreationButton';
import GateCreationCaret from '../entities/tool-carets/GateCreationCaret';

export default class GateCreationSystem extends CursorEventSystem {

    public once(component: CursorEventComponent): void {
        this.__onCursorCompleteActuationWithButton(component);
        this.__onCursorCompleteActuationWithCaret(component);
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION)
    @OnlyIfEntityIsInstanceOf(GateCreationButton)
    @OnCursorIntersection
    private __onCursorCompleteActuationWithButton(component: CursorEventComponent): void {
        this.store.entities.create(ActiveItemFrame, component.entity);
        this.store.entities.create(GateCreationCaret, component.data);
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION)
    @OnlyIfEntityIsInstanceOf(GateCreationCaret)
    private __onCursorCompleteActuationWithCaret(component: CursorEventComponent): void {
        component.entity.unload();
        this.store.entities.get(ActiveItemFrame).forEach((frame) => frame.unload());
    }

}
