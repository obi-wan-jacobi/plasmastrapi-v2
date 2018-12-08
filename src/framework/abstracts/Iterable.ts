import IIterable from '../templates/IIterable';

export default abstract class Iterable<T> implements IIterable<T> {

    public abstract forEach(): void;

}
