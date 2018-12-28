import { CURSOR_EVENT } from '../../enums/CURSOR_EVENT';
import CursorEventComponent from '../components/CursorEventComponent';
import CursorEventSystem, { OnCursorEvent, OnCursorIntersection } from '../../abstracts/systems/CursorEventSystem';
import DraggableComponent from '../components/DraggableComponent';
import { EntityMustPossess } from '../Entity';
import TranslatableComponent from '../components/TranslatableComponent';

export default class DraggableSystem extends CursorEventSystem {

    public once(component: CursorEventComponent): void {
        this.__onCursorBeginActuation(component);
        this.__onCursorEndActuation(component);
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_BEGIN_ACTUATION)
    @OnCursorIntersection
    @EntityMustPossess(DraggableComponent)
    private __onCursorBeginActuation(component: CursorEventComponent): void {
        component.entity.components.add(new TranslatableComponent());
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_END_ACTUATION)
    @EntityMustPossess(DraggableComponent)
    private __onCursorEndActuation(component: CursorEventComponent): void {
        component.entity.components.remove(TranslatableComponent);
    }

}
