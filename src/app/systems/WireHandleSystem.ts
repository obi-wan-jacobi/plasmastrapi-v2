import { CURSOR_EVENT } from '../../engine/enums/CURSOR_EVENT';
import CursorEventComponent from '../../engine/concretes/components/CursorEventComponent';
import CursorEventSystem, { OnCursorEvent } from '../../engine/abstracts/systems/CursorEventSystem';
import { OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import WireHandle from '../entities/WireHandle';

export default class WireHandleSystem extends CursorEventSystem {

    @OnCursorEvent(CURSOR_EVENT.CURSOR_END_ACTUATION)
    @OnlyIfEntityIsInstanceOf(WireHandle)
    public once(component: CursorEventComponent): void {
        component.entity.unload();
    }

}
