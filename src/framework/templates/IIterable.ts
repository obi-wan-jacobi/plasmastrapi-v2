
export default interface IIterable<T> {

    forEach(method: (payload: {}) => void): void;

}
