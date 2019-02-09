import Batch from '../../framework/invocables/Batch';
import CurveComponent from '../components/CurveComponent';
import { OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import { MOUSE_EVENT } from '../../engine/enums/MOUSE_EVENT';
import MouseEventComponent from '../../engine/components/MouseEventComponent';
import MouseEventSystem, {
    OnMouseEvent,
} from '../../engine/abstracts/systems/MouseEventSystem';
import PoseComponent from '../../engine/components/PoseComponent';
import RemoveWireCommand from '../commands/RemoveWireCommand';
import ShapeComponent from '../../engine/components/ShapeComponent';
import Wire from '../entities/circuit-elements/Wire';
import WireCuttingPath from '../entities/tools/carets/WireCuttingPath';
import WireRemovalCaret from '../entities/tools/carets/WireRemovalCaret';
import { isShapeIntersectedByLine } from '../../geometry/methods/shapes';

export default class WireRemovalSystem extends MouseEventSystem {

    @OnMouseEvent(MOUSE_EVENT.MOUSE_DOWN)
    @OnlyIfEntityIsInstanceOf(WireRemovalCaret)
    public onMouseDownWithWireCuttingPath(component: MouseEventComponent): void {
        this.store.entities.create(WireCuttingPath, { points: [{ x: component.data.x, y: component.data.y }] });
    }

    @OnMouseEvent(MOUSE_EVENT.MOUSE_MOVE)
    @OnlyIfEntityIsInstanceOf(WireCuttingPath)
    public onMouseMoveDrawWireCuttingPath(component: MouseEventComponent): void {
        const line = component.entity.get(CurveComponent);
        line.data.points.push({ x: component.data.x, y: component.data.y });
    }

    @OnMouseEvent(MOUSE_EVENT.MOUSE_UP)
    @OnlyIfEntityIsInstanceOf(WireCuttingPath)
    public onMouseUpWithWireCuttingPath(component: MouseEventComponent): void {
        component.entity.unload();
        this.__cutAndRemoveWires(component.entity);
    }

    private __cutAndRemoveWires(wireCuttingPath: WireCuttingPath): void {
        const line = wireCuttingPath.get(CurveComponent).data;
        const batch = new Batch();
        this.store.entities.get(Wire).forEach((wire: Wire) => {
            const pose = wire.get(PoseComponent).data;
            const shape = wire.get(ShapeComponent).data;
            if (isShapeIntersectedByLine(shape, pose, line)) {
                batch.add(new RemoveWireCommand(wire));
            }
        });
        batch.invoke();
    }

}
