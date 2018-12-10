import IComponent from '../interfaces/IComponent';

export default abstract class Component implements IComponent {

    public abstract set(): void;

}
