import IInvocable from './IInvocable';
import { Optional } from '../types/Optional';

export default interface ICommand<TPayload, TResult> extends IInvocable<TPayload, TResult> {

    invoke(payload: TPayload): TResult;

}
