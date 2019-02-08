import ActivateToolCommand from '../commands/ActivateToolCommand';
import { MOUSE_EVENT } from '../../engine/enums/MOUSE_EVENT';
import MouseEventComponent from '../../engine/components/MouseEventComponent';
import MouseEventSystem, {
    OnMouseEvent, OnMouseIntersection,
} from '../../engine/abstracts/systems/MouseEventSystem';
import { OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import ToolButton from '../abstracts/ToolButton';

export default class ToolButtonSystem extends MouseEventSystem {

    public once(component: MouseEventComponent): void {
        this.__onMouseClickWithToolButton(component);
    }

    @OnMouseEvent(MOUSE_EVENT.MOUSE_CLICK)
    @OnlyIfEntityIsInstanceOf(ToolButton)
    @OnMouseIntersection
    private __onMouseClickWithToolButton(component: MouseEventComponent): void {
        new ActivateToolCommand(this.store).invoke({
            position: component.data,
            toolButton: component.entity as ToolButton,
        });
    }

}
