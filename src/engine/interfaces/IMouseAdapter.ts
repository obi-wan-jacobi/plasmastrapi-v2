import IComponent from './IComponent';
import IStoreManager from './IStoreManager';

export default interface IMouseAdapter {

    sync(store: IStoreManager<IComponent<any>>): void;

}
