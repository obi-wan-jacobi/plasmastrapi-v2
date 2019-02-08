import ComponentStoreManager from '../store/ComponentStoreManager';

export default interface IMouseAdapter {

    sync(store: ComponentStoreManager): void;

}
