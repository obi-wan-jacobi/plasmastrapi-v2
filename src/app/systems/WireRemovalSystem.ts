import { CURSOR_EVENT } from '../../engine/enums/CURSOR_EVENT';
import CursorEventComponent from '../../engine/concretes/components/CursorEventComponent';
import CursorEventSystem, {
    OnCursorEvent, OnCursorIntersection,
} from '../../engine/abstracts/systems/CursorEventSystem';
import { OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import LineComponent from '../../engine/concretes/components/LineComponent';
import LineDrawing from '../../engine/concretes/entities/LineDrawing';
import PoseComponent from '../../engine/concretes/components/PoseComponent';
import ShapeComponent from '../../engine/concretes/components/ShapeComponent';
import Wire from '../entities/Wire';
import WireRemovalButton from '../entities/WireRemovalButton';
import WireRemovalCaret from '../entities/carets/WireRemovalCaret';
import { isShapeIntersectedByLine } from '../../geometry/methods/shapes';

export default class WireRemovalSystem extends CursorEventSystem {

    public once(component: CursorEventComponent): void {
        this.__onCursorBeginActuationWithLineDrawing(component);
        this.__onCursorEndActuationWithLineDrawing(component);
        this.__onCursorCompleteActuationWithButton(component);
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_BEGIN_ACTUATION)
    @OnlyIfEntityIsInstanceOf(WireRemovalCaret)
    private __onCursorBeginActuationWithLineDrawing(component: CursorEventComponent): void {
        component.entity.unload();
        this.store.entities.create(LineDrawing, { points: [{ x: component.data.x, y: component.data.y }] });
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_END_ACTUATION)
    @OnlyIfEntityIsInstanceOf(LineDrawing)
    private __onCursorEndActuationWithLineDrawing(component: CursorEventComponent): void {
        component.entity.unload();
        this.__cutAndRemoveWires(component.entity);
    }

    private __cutAndRemoveWires(lineDrawing: LineDrawing): void {
        const line = lineDrawing.get(LineComponent).data;
        this.store.entities.get(Wire).forEach((wire) => {
            const pose = wire.get(PoseComponent).data;
            const shape = wire.get(ShapeComponent).data;
            if (isShapeIntersectedByLine(shape, pose, line)) {
                wire.unload();
            }
        });
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION)
    @OnlyIfEntityIsInstanceOf(WireRemovalButton)
    @OnCursorIntersection
    private __onCursorCompleteActuationWithButton(component: CursorEventComponent): void {
        this.store.entities.create(WireRemovalCaret, component.data);
    }

}
