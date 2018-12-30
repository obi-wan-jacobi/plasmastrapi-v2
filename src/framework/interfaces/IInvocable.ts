
export default interface IInvocable<TPayload, TResult> {

    invoke(payload: TPayload): TResult;

}
