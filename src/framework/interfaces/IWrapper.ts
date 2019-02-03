import { Optional } from '../types/Optional';

export default interface IWrapper<T> {

    unwrap(): Optional<T>;

}
