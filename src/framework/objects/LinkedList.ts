import IWrapper from '../interfaces/IWrapper';
import IIterable from '../templates/IIterable';
import Link, { Optional, OptionalLink } from './Link';

export default class LinkedList<T> implements IIterable<Optional<T>>, IWrapper<OptionalLink<T>> {

    private __start: OptionalLink<T>;
    private __end: OptionalLink<T>;
    private __length: number;

    constructor() {
        this.__start = undefined;
        this.__end = undefined;
        this.__length = 0;
    }

    get length(): number {
        return this.__length;
    }

    get isEmpty(): boolean {
        return this.length === 0;
    }

    get first(): T {
        return (this.__start)
            ? this.__start.value
            : undefined;
    }

    get last(): T {
        return (this.__end)
        ? this.__end.value
        : undefined;
    }

    public unwrap(): OptionalLink<T> {
        return this.__start;
    }

    public forEach(fn: (link: any) => void): void {
        if (this.length === 0) {
            return;
        }
        let cursor = this.__start;
        while (cursor !== undefined) {
            fn(cursor.value);
            cursor = cursor.next;
        }
    }

    public map(fn: (value: T) => any): any[] {
        const transforms = Array<any>();
        this.forEach((value) => {
            transforms.push(fn(value));
        });
        return transforms;
    }

    public unshift(value: T): LinkedList<T> {
        if (this.length === 0) {
            this.__start = this.__end = new Link(value);
        } else {
            this.__start!.after(new Link(value));
            this.__start = this.__start!.previous;
        }
        this.__incrementLength();
        return this;
    }

    public shift(): Optional<T> {
        let value: Optional<T>;
        if (this.isEmpty) {
            return undefined;
        }
        if (this.length === 1) {
            value = this.__start!.value;
            this.__start = this.__end = undefined;
        } else {
            value = this.__start!.value;
            this.__start = this.__start!.next;
        }
        this.__decrementLength();
        return value;
    }

    public push(value: T): LinkedList<T> {
        if (!(this.__start && this.__end)) {
            this.__start = this.__end = new Link(value);
        } else {
            this.__end.before(new Link(value));
            this.__end =  this.__end.next;
        }
        this.__incrementLength();
        return this;
    }

    public pop(): Optional<T> {
        let value: Optional<T>;
        if (this.isEmpty) {
            return undefined;
        }
        if (this.length === 1) {
            return this.shift();
        } else {
            value = this.__end!.value;
            this.__end = this.__end!.previous;
        }
        this.__decrementLength();
        return value;
    }

    private __incrementLength(): void {
        this.__length++;
    }

    private __decrementLength(): void {
        this.__length--;
    }

}
