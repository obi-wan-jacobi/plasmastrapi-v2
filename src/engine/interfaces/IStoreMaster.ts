import IComponent from './IComponent';
import IEntity from './IEntity';
import IMaster from './IMaster';
import IStoreManager from './IStoreManager';

export default interface IStoreMaster extends IMaster<void> {

    components: IStoreManager<IComponent<any>>;

    entities: IStoreManager<IEntity>;

}
