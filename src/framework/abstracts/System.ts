import IComponent from '../interfaces/IComponent';

export default abstract class System<T extends IComponent<any>> {

    public abstract once(component: T): void;

}
