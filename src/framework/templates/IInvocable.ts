import { Optional } from '../types/Optional';

export default interface IInvocable<T> {

    invoke({ method }: { method: (payload: Optional<any>) => Optional<T>}): Optional<T>;

}
