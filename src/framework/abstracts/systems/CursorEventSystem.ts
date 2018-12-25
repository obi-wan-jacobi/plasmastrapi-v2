import { CURSOR_EVENT } from '../../enums/CURSOR_EVENT';
import CursorEventComponent from '../../concretes/components/CursorEventComponent';
import System from './System';

export default abstract class CursorEventSystem extends System<CursorEventComponent> {

    private __responseMap: { [key: string]: (component: CursorEventComponent) => void} = {
        [CURSOR_EVENT.UNDEFINED]: () => undefined,
        [CURSOR_EVENT.CURSOR_ENABLE]: (component: CursorEventComponent): void => {
            this._onCursorEnable(component);
        },
        [CURSOR_EVENT.CURSOR_TRANSLATE]: (component: CursorEventComponent): void => {
            this._onCursorTranslate(component);
        },
        [CURSOR_EVENT.CURSOR_DISABLE]: (component: CursorEventComponent): void => {
            this._onCursorDisable(component);
        },
        [CURSOR_EVENT.CURSOR_BEGIN_ACTUATION]: (component: CursorEventComponent): void => {
            this._onCursorBeginActuation(component);
        },
        [CURSOR_EVENT.CURSOR_END_ACTUATION]: (component: CursorEventComponent): void => {
            this._onCursorEndActuation(component);
        },
        [CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION]: (component: CursorEventComponent): void => {
            this._onCursorCompleteActuation(component);
        },
    };

    constructor() {
        super(CursorEventComponent);
    }

    public once(component: CursorEventComponent): void {
        this.__responseMap[component.data.eventName](component);
    }

    protected _onCursorEnable(component: CursorEventComponent): void { return; }
    protected _onCursorTranslate(component: CursorEventComponent): void { return; }
    protected _onCursorDisable(component: CursorEventComponent): void { return; }
    protected _onCursorBeginActuation(component: CursorEventComponent): void { return; }
    protected _onCursorEndActuation(component: CursorEventComponent): void { return; }
    protected _onCursorCompleteActuation(component: CursorEventComponent): void { return; }

}
