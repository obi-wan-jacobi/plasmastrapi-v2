import { CURSOR_EVENT } from '../../engine/enums/CURSOR_EVENT';
import CursorEventComponent from '../../engine/concretes/components/CursorEventComponent';
import CursorEventSystem, { OnCursorEvent } from '../../engine/abstracts/systems/CursorEventSystem';
import CurveComponent from '../components/CurveComponent';
import { OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import WireCuttingPath from '../entities/tool-carets/WireCuttingPath';

export default class LineDrawingSystem extends CursorEventSystem {

    @OnCursorEvent(CURSOR_EVENT.CURSOR_TRANSLATE)
    @OnlyIfEntityIsInstanceOf(WireCuttingPath)
    public once(component: CursorEventComponent): void {
        const line = component.entity.get(CurveComponent);
        line.data.points.push({ x: component.data.x, y: component.data.y });
    }

}
