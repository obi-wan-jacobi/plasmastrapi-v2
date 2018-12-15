import IComponent from '../interfaces/IComponent';

export default abstract class Component<T> implements IComponent<T> {

    public abstract set(data: T): void;

}
