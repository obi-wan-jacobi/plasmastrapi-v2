import { CURSOR_EVENT } from '../enums/CURSOR_EVENT';
import CursorComponent from '../concretes/components/CursorComponent';
import { CursorComponentIsResetAfter } from './decorators/CursorComponentIsResetAfter';
import System from './System';

export default abstract class CursorSystem extends System<CursorComponent> {

    private __responseMap: { [key: string]: (component: CursorComponent) => void} = {
        [CURSOR_EVENT.UNDEFINED]: () => undefined,
        [CURSOR_EVENT.CURSOR_ENABLE]: (component: CursorComponent): void => {
            this._onCursorEnable(component);
        },
        [CURSOR_EVENT.CURSOR_TRANSLATE]: (component: CursorComponent): void => {
            this._onCursorTranslate(component);
        },
        [CURSOR_EVENT.CURSOR_DISABLE]: (component: CursorComponent): void => {
            this._onCursorDisable(component);
        },
        [CURSOR_EVENT.CURSOR_BEGIN_ACTUATION]: (component: CursorComponent): void => {
            this._onCursorBeginActuation(component);
        },
        [CURSOR_EVENT.CURSOR_END_ACTUATION]: (component: CursorComponent): void => {
            this._onCursorEndActuation(component);
        },
        [CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION]: (component: CursorComponent): void => {
            this._onCursorCompleteActuation(component);
        },
    };

    constructor() {
        super(CursorComponent);
    }

    @CursorComponentIsResetAfter
    public once(component: CursorComponent): void {
        this.__responseMap[component.data.eventName](component);
    }

    protected abstract _onCursorEnable(component: CursorComponent): void;
    protected abstract _onCursorTranslate(component: CursorComponent): void;
    protected abstract _onCursorDisable(component: CursorComponent): void;
    protected abstract _onCursorBeginActuation(component: CursorComponent): void;
    protected abstract _onCursorEndActuation(component: CursorComponent): void;
    protected abstract _onCursorCompleteActuation(component: CursorComponent): void;

}
