import BusComponent from '../components/BusComponent';
import ComponentStoreManager from '../store/ComponentStoreManager';
import IMaster from '../../interfaces/IMaster';
import { Optional } from '../../../framework/types/Optional';

export default class BusMaster implements IMaster<ComponentStoreManager> {

    private __queue: Array<{ topic: string, payload: Optional<any> }>;

    constructor() {
        this.__queue = new Array<{ topic: string, payload: Optional<any> }>();
    }

    public push<T>(topic: string, payload?: Optional<T>): void {
        this.__queue.unshift({ topic, payload });
    }

    public sync(store: ComponentStoreManager): void {
        store.get(BusComponent).forEach((component) => {
            component.set({ messages: this.__queue });
        });
        this.__queue = new Array<{ topic: string, payload: Optional<any> }>();
    }

}
