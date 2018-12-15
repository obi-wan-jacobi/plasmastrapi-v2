import { Optional } from '../types/Optional';

export type OptionalLink<T> = Optional<Link<T>>;

export default class Link<T> {

    public static conjoin <T>(first: OptionalLink<T>, second: OptionalLink<T>): Array<OptionalLink<T>> {
        if (first !== undefined) {
            first.__next = second;
        }
        if (second !== undefined) {
            second.__previous = first;
        }
        return [first, second];
    }

    private __value: Optional<T>;
    private __next: OptionalLink<T>;
    private __previous: OptionalLink<T>;

    constructor(value: Optional<T>) {
        this.__value = value;
        this.__next = undefined;
        this.__previous = undefined;
    }

    public get next(): OptionalLink<T> {
        return this.__next;
    }

    public get previous(): OptionalLink<T> {
        return this.__previous;
    }

    public get value(): any {
        return this.__value;
    }

    public get isStart(): boolean {
        return this.previous === undefined;
    }

    public get isInterior(): boolean {
        return !(this.isStart || this.isEnd);
    }

    public get isEnd(): boolean {
        return this.next === undefined;
    }

    public before(next: OptionalLink<T>): Array<OptionalLink<T>> {
        this.__validateNotSelf(next);
        return Link.conjoin(this, next);
    }

    public between(previous: OptionalLink<T>, next: OptionalLink<T>): Array<OptionalLink<T>> {
        this.__validateNotSelf(previous);
        this.__validateNotSelf(next);
        Link.conjoin(previous, this);
        Link.conjoin(this, next);
        return [previous, this, next];
    }

    public after(previous: OptionalLink<T>): Array<OptionalLink<T>> {
        return Link.conjoin(previous, this);
    }

    private __validateNotSelf(target: OptionalLink<T>): void {
        if (this === target) {
            throw new Error('Attempted circular link to self');
        }
    }
}
