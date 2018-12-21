import ComponentStoreManager from '../store/ComponentStoreManager';
import EntityStoreManager from '../store/EntityStoreManager';

export default class StoreMaster {

    private __componentStoreManager: ComponentStoreManager;
    private __entityStoreManager: EntityStoreManager;

    constructor() {
        this.__componentStoreManager = new ComponentStoreManager();
        this.__entityStoreManager = new EntityStoreManager(this.__componentStoreManager);
    }

    get components(): ComponentStoreManager {
        return this.__componentStoreManager;
    }

    get entities(): EntityStoreManager {
        return this.__entityStoreManager;
    }

}
