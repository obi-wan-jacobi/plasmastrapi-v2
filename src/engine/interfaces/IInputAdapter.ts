import ComponentStoreManager from '../store/ComponentStoreManager';

export default interface IInputAdapter {

    sync(store: ComponentStoreManager): void;

}
