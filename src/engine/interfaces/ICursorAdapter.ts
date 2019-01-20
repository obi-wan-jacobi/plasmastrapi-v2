import ComponentStoreManager from '../store/ComponentStoreManager';

export default interface ICursorAdapter {

    sync(store: ComponentStoreManager): void;

}
