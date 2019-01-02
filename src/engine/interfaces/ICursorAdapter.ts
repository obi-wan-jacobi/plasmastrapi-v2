import ComponentStoreManager from '../concretes/store/ComponentStoreManager';

export default interface ICursorAdapter {

    once(store: ComponentStoreManager): void;

}
