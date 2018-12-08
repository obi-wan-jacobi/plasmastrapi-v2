import Link from './Link';

export default class LinkedList<T> {

    private __start: Link<T>;
    private __end: Link<T>;
    private __length: number;

    constructor() {
        this.__start = new Link(null);
        this.__end = new Link(null);
        Link.conjoin(this.__start, this.__end);
        this.__length = 0;
    }

    get length(): number {
        return this.__length;
    }

    get isEmpty(): boolean {
        return this.length === 0;
    }

    get first(): Link<T> | null {
        return (this.length > 0)
            ? this.__start.next
            : null;
    }

    get last(): Link<T> | null {
        return (this.length > 0)
        ? this.__end.previous
        : null;
    }

    public forEach(fn: (link: any) => void): void {
        let cursor = this.__start.next;
        while (cursor !== this.__end) {
            fn(cursor);
            cursor = cursor.next;
        }
    }

    public unshift(value: T): LinkedList<T> {
        this.__incrementLength();
        this.__start.after(new Link(value));
        return this;
    }

    public push(value: T): LinkedList<T> {
        this.__incrementLength();
        this.__end.before(new Link(value));
        return this;
    }

    private __incrementLength(): void {
        this.__length++;
    }

    private __decrementLength(): void {
        this.__length--;
    }

}
