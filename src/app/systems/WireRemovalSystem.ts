import Batch from '../../framework/invocables/Batch';
import { CURSOR_EVENT } from '../../engine/enums/CURSOR_EVENT';
import CurveComponent from '../components/CurveComponent';
import { OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import InputComponent from '../../engine/components/InputComponent';
import InputSystem, {
    OnInputEvent,
} from '../../engine/abstracts/systems/InputSystem';
import PoseComponent from '../../engine/components/PoseComponent';
import RemoveWireCommand from '../commands/RemoveWireCommand';
import ShapeComponent from '../../engine/components/ShapeComponent';
import Wire from '../entities/circuit-elements/Wire';
import WireCuttingPath from '../entities/tools/carets/WireCuttingPath';
import WireRemovalCaret from '../entities/tools/carets/WireRemovalCaret';
import { isShapeIntersectedByLine } from '../../geometry/methods/shapes';

export default class WireRemovalSystem extends InputSystem {

    public once(component: InputComponent): void {
        this.__onCursorBeginActuationWithWireCuttingPath(component);
        this.__onCursorTranslateDrawWireCuttingPath(component);
        this.__onCursorEndActuationWithWireCuttingPath(component);
    }

    @OnInputEvent(CURSOR_EVENT.CURSOR_BEGIN_ACTUATION)
    @OnlyIfEntityIsInstanceOf(WireRemovalCaret)
    private __onCursorBeginActuationWithWireCuttingPath(component: InputComponent): void {
        this.store.entities.create(WireCuttingPath, { points: [{ x: component.data.x, y: component.data.y }] });
    }

    @OnInputEvent(CURSOR_EVENT.CURSOR_TRANSLATE)
    @OnlyIfEntityIsInstanceOf(WireCuttingPath)
    private __onCursorTranslateDrawWireCuttingPath(component: InputComponent): void {
        const line = component.entity.get(CurveComponent);
        line.data.points.push({ x: component.data.x, y: component.data.y });
    }

    @OnInputEvent(CURSOR_EVENT.CURSOR_END_ACTUATION)
    @OnlyIfEntityIsInstanceOf(WireCuttingPath)
    private __onCursorEndActuationWithWireCuttingPath(component: InputComponent): void {
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
