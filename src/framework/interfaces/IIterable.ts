
export default interface IIterable<T> {

    length: number;

    forEach(method: (payload: T) => void): void;

}
