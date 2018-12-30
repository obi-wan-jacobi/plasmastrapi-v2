import ComponentStoreManager from '../store/ComponentStoreManager';
import EntityStoreManager from '../store/EntityStoreManager';

export default class StoreMaster {

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

    public loadNew(): void {
        this.__componentStoreManager.loadNew();
        this.__entityStoreManager.loadNew();
    }

    public cleanup(): void {
        this.__componentStoreManager.cleanup();
        this.__entityStoreManager.cleanup();
    }

}
