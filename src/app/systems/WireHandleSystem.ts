import { CURSOR_EVENT } from '../../framework/enums/CURSOR_EVENT';
import CursorEventComponent from '../../framework/concretes/components/CursorEventComponent';
import CursorEventSystem, { OnCursorEvent } from '../../framework/abstracts/systems/CursorEventSystem';
import { OnlyIfEntityIsInstanceOf } from '../../framework/concretes/Entity';
import WireHandle from '../entities/WireHandle';

export default class WireHandleSystem extends CursorEventSystem {

    @OnCursorEvent(CURSOR_EVENT.CURSOR_END_ACTUATION)
    @OnlyIfEntityIsInstanceOf(WireHandle)
    public once(component: CursorEventComponent): void {
        component.entity.unload();
    }

}
