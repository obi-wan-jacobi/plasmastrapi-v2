import CursorEventComponent from '../components/CursorEventComponent';
import CursorEventSystem, { CursorMustIntersectEntity } from '../../abstracts/systems/CursorEventSystem';
import { EntityMustPossess } from '../Entity';
import HoverableComponent from '../components/HoverableComponent';

export default class HoverableSystem extends CursorEventSystem {

    @CursorMustIntersectEntity
    @EntityMustPossess(HoverableComponent)
    protected _onCursorTranslate(component: CursorEventComponent): void {
        component.entity.components.get(HoverableComponent).data.onTranslate.invoke(component);
    }

}
