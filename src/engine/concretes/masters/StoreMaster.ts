import ComponentStoreManager from '../store/ComponentStoreManager';
import Engine from '../../Engine';
import EntityStoreManager from '../store/EntityStoreManager';
import IMaster from '../../interfaces/IMaster';

export default class StoreMaster implements IMaster {

    private __componentStoreManager: ComponentStoreManager;
    private __entityStoreManager: EntityStoreManager;

    constructor(engine: Engine) {
        this.__componentStoreManager = new ComponentStoreManager();
        this.__entityStoreManager = new EntityStoreManager(engine);
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
