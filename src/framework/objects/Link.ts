
export default class Link<T> {

    public static conjoin <T>(first: Link<T>, second: Link<T>): Array<Link<T>> {
        first.__next = second;
        second.__previous = first;
        return [first, second];
    }

    private __value: T | null;
    private __next: Link<T>;
    private __previous: Link<T>;

    constructor(value: T | null) {
        this.__value = value;
        this.__next = this;
        this.__previous = this;
    }

    public get next(): Link<T> {
        return this.__next;
    }

    public get previous(): Link<T> {
        return this.__previous;
    }

    public get value(): any {
        return this.__value;
    }

    public get isStart(): boolean {
        return this.previous === this;
    }

    public get isMiddle(): boolean {
        return !(this.isStart || this.isEnd);
    }

    public get isEnd(): boolean {
        return this.next === this;
    }

    public before(next: Link<T>): Array<Link<T>> {
        return (next.isStart)
            ? Link.conjoin(this, next)
            : this.between(next.previous, next);
    }

    public between(previous: Link<T>, next: Link<T>): Array<Link<T>> {
        __validateLinksAreMutuallyConnected(previous, next);
        Link.conjoin(previous, this);
        Link.conjoin(this, next);
        return [previous, this, next];
    }

    public after(previous: Link<T>): Array<Link<T>> {
        return (previous.isEnd)
            ? Link.conjoin(previous, this)
            : this.between(previous, previous.next);
    }

}

const __validateLinksAreMutuallyConnected = <T>(first: Link<T>, second: Link<T>): void => {
    if (first === second) {
        throw new Error('message');
    }
    if (first.next !== second || second.previous !== first) {
        throw new Error('message');
    }
};
