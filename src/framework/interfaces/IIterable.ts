
export default interface IIterable<T> {

    forEach(method: (payload: T) => void): void;

}
