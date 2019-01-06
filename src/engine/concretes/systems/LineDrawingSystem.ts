import { CURSOR_EVENT } from '../../enums/CURSOR_EVENT';
import CursorEventComponent from '../components/CursorEventComponent';
import CursorEventSystem, { OnCursorEvent } from '../../abstracts/systems/CursorEventSystem';
import { OnlyIfEntityIsInstanceOf } from '../../abstracts/Entity';
import LineComponent from '../components/LineComponent';
import LineDrawing from '../entities/LineDrawing';

export default class LineDrawingSystem extends CursorEventSystem {

    @OnCursorEvent(CURSOR_EVENT.CURSOR_TRANSLATE)
    @OnlyIfEntityIsInstanceOf(LineDrawing)
    public once(component: CursorEventComponent): void {
        const line = component.entity.get(LineComponent);
        line.data.points.push({ x: component.data.x, y: component.data.y });
    }

}
