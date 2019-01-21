import ActiveItemFrame from '../entities/ActiveItemFrame';
import { CURSOR_EVENT } from '../../engine/enums/CURSOR_EVENT';
import CursorEventComponent from '../../engine/components/CursorEventComponent';
import CursorEventSystem, {
    OnCursorEvent, OnCursorIntersection, WhenShiftKeyIsDown, WhenShiftKeyIsUp,
} from '../../engine/abstracts/systems/CursorEventSystem';
import { OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import GateCreationButton from '../entities/buttons/GateCreationButton';
import GateCreationCaret from '../entities/tool-carets/GateCreationCaret';

export default class GateCreationSystem extends CursorEventSystem {

    public once(component: CursorEventComponent): void {
        this.__onCursorCompleteActuationWithButtonSpawnGate(component);
        this.__onCursorCompleteActuationWithCaretDeactivateToolWhenShiftKeyIsUp(component);
        this.__onCursorCompleteActuationWithCaretReactivateToolWhenShiftKeyIsDown(component);
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION)
    @OnlyIfEntityIsInstanceOf(GateCreationButton)
    @OnCursorIntersection
    private __onCursorCompleteActuationWithButtonSpawnGate(component: CursorEventComponent): void {
        this.store.entities.create(ActiveItemFrame, component.entity);
        this.__spawnGate(component);
    }

    @WhenShiftKeyIsUp
    @OnCursorEvent(CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION)
    @OnlyIfEntityIsInstanceOf(GateCreationCaret)
    private __onCursorCompleteActuationWithCaretDeactivateToolWhenShiftKeyIsUp(
        component: CursorEventComponent,
    ): void {
        component.entity.unload();
        this.store.entities.get(ActiveItemFrame).forEach((frame) => frame.unload());
    }

    @WhenShiftKeyIsDown
    @OnCursorEvent(CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION)
    @OnlyIfEntityIsInstanceOf(GateCreationCaret)
    private __onCursorCompleteActuationWithCaretReactivateToolWhenShiftKeyIsDown(
        component: CursorEventComponent,
    ): void {
        component.entity.unload();
        this.__spawnGate(component);
    }

    private __spawnGate(component: CursorEventComponent): void {
        this.store.entities.create(GateCreationCaret, component.data);
    }

}
