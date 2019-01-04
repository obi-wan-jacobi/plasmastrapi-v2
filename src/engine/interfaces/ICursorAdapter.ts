import ComponentStoreManager from '../concretes/store/ComponentStoreManager';

export default interface ICursorAdapter {

    sync(store: ComponentStoreManager): void;

}
