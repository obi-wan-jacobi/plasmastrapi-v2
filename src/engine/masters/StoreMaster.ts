import ComponentStoreManager from '../store/ComponentStoreManager';
import EntityStoreManager from '../store/EntityStoreManager';
import IComponent from '../interfaces/IComponent';
import IEntity from '../interfaces/IEntity';
import IStoreManager from '../interfaces/IStoreManager';
import IStoreMaster from '../interfaces/IStoreMaster';

export default class StoreMaster implements IStoreMaster{

    private __componentStoreManager: IStoreManager<IComponent<any>>;
    private __entityStoreManager: IStoreManager<IEntity>;

    constructor() {
        this.__componentStoreManager = new ComponentStoreManager();
        this.__entityStoreManager = new EntityStoreManager(this);
    }

    get components(): IStoreManager<IComponent<any>> {
        return this.__componentStoreManager;
    }

    get entities(): IStoreManager<IEntity> {
        return this.__entityStoreManager;
    }

    public sync(): void {
        this.__componentStoreManager.loadNew();
        this.__componentStoreManager.cleanup();
        this.__entityStoreManager.loadNew();
        this.__entityStoreManager.cleanup();
    }

}
