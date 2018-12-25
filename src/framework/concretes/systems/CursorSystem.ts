import { CURSOR_EVENT } from '../../enums/CURSOR_EVENT';
import { Ctor } from '../../types/Ctor';
import CursorEventComponent from '../components/CursorEventComponent';
import StoreMaster from '../masters/StoreMaster';
import System from '../../abstracts/systems/System';

export default class CursorSystem<TEventComponent extends CursorEventComponent>
extends System<TEventComponent> {

    private __eventMap: { [key: string]: CURSOR_EVENT };
    private __store: StoreMaster;

    constructor(
        ComponentCtor: Ctor<TEventComponent, {}>,
        eventMap: { [key: string]: CURSOR_EVENT },
        store: StoreMaster
    ) {
        super(ComponentCtor);
        this.__eventMap = eventMap;
        this.__store = store;
    }

    public once(event: TEventComponent): void {
        this.__store.components.get(CursorEventComponent).forEach((component) => {
            component.set({
                eventName: this.__eventMap[event.data.eventName],
                cursor: event.data.cursor
            });
        });
    }

}
