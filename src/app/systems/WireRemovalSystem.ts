import { CURSOR_EVENT } from '../../engine/enums/CURSOR_EVENT';
import CursorEventComponent from '../../engine/concretes/components/CursorEventComponent';
import CursorEventSystem, { OnCursorEvent } from '../../engine/abstracts/systems/CursorEventSystem';
import { OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import LineComponent from '../../engine/concretes/components/LineComponent';
import LineDrawing from '../../engine/concretes/entities/LineDrawing';
import PoseComponent from '../../engine/concretes/components/PoseComponent';
import ShapeComponent from '../../engine/concretes/components/ShapeComponent';
import Wire from '../entities/Wire';
import { isShapeIntersectedByLine } from '../../geometry/methods/shapes';

export default class WireRemovalSystem extends CursorEventSystem {

    public once(component: CursorEventComponent): void {
        this.__onCursorBeginActuation(component);
        this.__onCursorEndActuation(component);
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_BEGIN_ACTUATION)
    private __onCursorBeginActuation(component: CursorEventComponent): void {
        this.store.entities.create(LineDrawing, { points: [{ x: component.data.x, y: component.data.y }] });
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_END_ACTUATION)
    @OnlyIfEntityIsInstanceOf(LineDrawing)
    private __onCursorEndActuation(component: CursorEventComponent): void {
        this.__cutAndRemoveWires(component.entity);
        component.entity.unload();
        this.master.remove(WireRemovalSystem);
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

}
