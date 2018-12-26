import ActuatableComponent from '../components/ActuatableComponent';
import CursorEventComponent from '../components/CursorEventComponent';
import CursorEventSystem, { CursorMustIntersectEntity } from '../../abstracts/systems/CursorEventSystem';
import { EntityMustPossess } from '../Entity';

export default class ActuatableSystem extends CursorEventSystem {

    @CursorMustIntersectEntity
    @EntityMustPossess(ActuatableComponent)
    protected _onCursorBeginActuation(component: CursorEventComponent): void {
        component.entity.components.get(ActuatableComponent).data.onBegin.invoke(component);
    }

    @CursorMustIntersectEntity
    @EntityMustPossess(ActuatableComponent)
    protected _onCursorEndActuation(component: CursorEventComponent): void {
        component.entity.components.get(ActuatableComponent).data.onEnd.invoke(component);
    }

    @CursorMustIntersectEntity
    @EntityMustPossess(ActuatableComponent)
    protected _onCursorCompleteActuation(component: CursorEventComponent): void {
        component.entity.components.get(ActuatableComponent).data.onComplete.invoke(component);
    }

}
