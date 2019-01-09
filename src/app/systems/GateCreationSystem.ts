import { CURSOR_EVENT } from '../../engine/enums/CURSOR_EVENT';
import CursorEventComponent from '../../engine/concretes/components/CursorEventComponent';
import CursorEventSystem, {
    OnCursorEvent, OnCursorIntersection,
} from '../../engine/abstracts/systems/CursorEventSystem';
import { OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import Gate from '../entities/Gate';
import GateCreationButton from '../entities/GateCreationButton';
import TranslationComponent from '../../engine/concretes/components/TranslationComponent';

export default class GateCreationSystem extends CursorEventSystem {

    public once(component: CursorEventComponent): void {
        this.__onCursorBeginActuation(component);
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_BEGIN_ACTUATION)
    @OnlyIfEntityIsInstanceOf(GateCreationButton)
    @OnCursorIntersection
    private __onCursorBeginActuation(component: CursorEventComponent): void {
        const gate = this.store.entities.create(Gate, { x: component.data.x, y: component.data.y });
        gate.add(TranslationComponent);
    }

}
