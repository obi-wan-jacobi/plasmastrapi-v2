
export default interface IIterable<T> {

    forEach(method: (payload: T) => void): void;

    map(method: (payload: T) => any): any[];

    push(payload: T): void;

    pop(): T;

    unshift(payload: T): void;

    shift(): T;

}
