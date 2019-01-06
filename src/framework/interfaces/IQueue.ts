import { Optional } from '../types/Optional';

export default interface IQueue<T> {

    push(item: T): void;

    pop(): Optional<T>;

}
