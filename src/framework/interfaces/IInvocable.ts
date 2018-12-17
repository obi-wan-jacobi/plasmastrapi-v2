import { Optional } from '../types/Optional';

export default interface IInvocable<TPayload, TResult> {

    invoke(payload: TPayload): TResult;

}
