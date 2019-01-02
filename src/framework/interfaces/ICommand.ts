import IInvocable from './IInvocable';

export default interface ICommand<TPayload, TResult> extends IInvocable<TPayload, TResult> {

    invoke(payload: TPayload): TResult;

}
