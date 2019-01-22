import ActiveItemFrame from '../entities/ActiveItemFrame';
import Batch from '../../framework/invocables/Batch';
import { CURSOR_EVENT } from '../../engine/enums/CURSOR_EVENT';
import CursorEventComponent from '../../engine/components/CursorEventComponent';
import CursorEventSystem, {
    OnCursorEvent, OnCursorIntersection,
} from '../../engine/abstracts/systems/CursorEventSystem';
import CurveComponent from '../components/CurveComponent';
import { OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import PoseComponent from '../../engine/components/PoseComponent';
import RemoveWireCommand from '../commands/RemoveWireCommand';
import ShapeComponent from '../../engine/components/ShapeComponent';
import Wire from '../entities/circuit-elements/Wire';
import WireCuttingPath from '../entities/tool-carets/WireCuttingPath';
import WireRemovalButton from '../entities/buttons/WireRemovalButton';
import WireRemovalCaret from '../entities/tool-carets/WireRemovalCaret';
import { isShapeIntersectedByLine } from '../../geometry/methods/shapes';

export default class WireRemovalSystem extends CursorEventSystem {

    public once(component: CursorEventComponent): void {
        this.__onCursorBeginActuationWithWireCuttingPath(component);
        this.__onCursorTranslateDrawWireCuttingPath(component);
        this.__onCursorEndActuationWithWireCuttingPath(component);
        this.__onCursorCompleteActuationWithButton(component);
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_BEGIN_ACTUATION)
    @OnlyIfEntityIsInstanceOf(WireRemovalCaret)
    private __onCursorBeginActuationWithWireCuttingPath(component: CursorEventComponent): void {
        component.entity.unload();
        this.store.entities.get(ActiveItemFrame).forEach((frame) => frame.unload());
        this.store.entities.create(WireCuttingPath, { points: [{ x: component.data.x, y: component.data.y }] });
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_TRANSLATE)
    @OnlyIfEntityIsInstanceOf(WireCuttingPath)
    private __onCursorTranslateDrawWireCuttingPath(component: CursorEventComponent): void {
        const line = component.entity.get(CurveComponent);
        line.data.points.push({ x: component.data.x, y: component.data.y });
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_END_ACTUATION)
    @OnlyIfEntityIsInstanceOf(WireCuttingPath)
    private __onCursorEndActuationWithWireCuttingPath(component: CursorEventComponent): void {
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

    @OnCursorEvent(CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION)
    @OnlyIfEntityIsInstanceOf(WireRemovalButton)
    @OnCursorIntersection
    private __onCursorCompleteActuationWithButton(component: CursorEventComponent): void {
        this.store.entities.create(WireRemovalCaret, component.data);
        this.store.entities.create(ActiveItemFrame, component.entity);
    }

}
