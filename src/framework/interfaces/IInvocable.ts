
export default interface IInvocable<T> {

    invoke({ method }: { method: (payload: any) => T}): T;

}
