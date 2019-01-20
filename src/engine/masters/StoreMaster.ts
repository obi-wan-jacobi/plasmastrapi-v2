import ComponentStoreManager from '../store/ComponentStoreManager';
import EntityStoreManager from '../store/EntityStoreManager';
import IMaster from '../interfaces/IMaster';

export default class StoreMaster implements IMaster<void> {

    private __componentStoreManager: ComponentStoreManager;
    private __entityStoreManager: EntityStoreManager;

    constructor() {
        this.__componentStoreManager = new ComponentStoreManager();
        this.__entityStoreManager = new EntityStoreManager(this);
    }

    get components(): ComponentStoreManager {
        return this.__componentStoreManager;
    }

    get entities(): EntityStoreManager {
        return this.__entityStoreManager;
    }

    public sync(): void {
        this.__componentStoreManager.loadNew();
        this.__componentStoreManager.cleanup();
        this.__entityStoreManager.loadNew();
        this.__entityStoreManager.cleanup();
    }

}
