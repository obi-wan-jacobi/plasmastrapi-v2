import { CURSOR_EVENT } from '../../engine/enums/CURSOR_EVENT';
import CursorEventComponent from '../../engine/concretes/components/CursorEventComponent';
import CursorEventSystem, {
    OnCursorEvent, OnCursorIntersection,
} from '../../engine/abstracts/systems/CursorEventSystem';
import { OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import WireCuttingSystem from './WireCuttingSystem';
import WireRemovalButton from '../entities/WireRemovalButton';

export default class WireRemovalSystem extends CursorEventSystem {

    public once(component: CursorEventComponent): void {
        this.__onCursorCompleteActuation(component);
    }

    @OnCursorEvent(CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION)
    @OnlyIfEntityIsInstanceOf(WireRemovalButton)
    @OnCursorIntersection
    private __onCursorCompleteActuation(component: CursorEventComponent): void {
        const wireCuttingSystem = this.master.get(WireCuttingSystem);
        if (wireCuttingSystem) {
            this.master.remove(WireCuttingSystem);
            return;
        }
        this.master.add(WireCuttingSystem);
    }

}
