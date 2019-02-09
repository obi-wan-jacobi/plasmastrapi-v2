import Container from '../../framework/data-structures/Container';
import IEntity from '../interfaces/IEntity';
import IStoreMaster from '../interfaces/IStoreMaster';
import IUIModule from '../interfaces/IUIModule';

export default class UIModule extends Container<IEntity> implements IUIModule {

    protected _store: IStoreMaster;

    constructor(store: IStoreMaster) {
        super();
        this._store = store;
    }

    public load(): void {
        this.forEach((entity) => entity.load());
    }

    public unload(): void {
        this.forEach((entity) => entity.unload());
    }

}
