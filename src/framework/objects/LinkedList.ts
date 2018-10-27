import OneDimensionalLink from './OneDimensionalLink';

export default class LinkedList {

    private __start: OneDimensionalLink;
    private __end: OneDimensionalLink;
    private __length: number;

    constructor() {
        this.__start = new OneDimensionalLink();
        this.__end = new OneDimensionalLink();
        this.__start.next = this.__end;
        this.__length = 0;
    }

    get length(): number {
        return this.__length;
    }

    public forEach(fn: (link: any) => void): void {
        return this.__forEachLink((link: any): void => {
            return fn(link.value);
        });
    }

    public push(value) {
        const newLink = new OneDimensionalLink(value);
        if (this.length === 0) {
            this.__start.next = newLink;
            newLink.previous = this.__start;
            newLink.next = this.__end;
            this.__end.previous = newLink;
        } else {
            const oldLinkBeforeEnd = this.__end.previous;
            oldLinkBeforeEnd.next = newLink;
            newLink.previous = oldLinkBeforeEnd;
            newLink.next = this.__end;
            this.__end.previous = newLink;
        }
        this.__incrementLength();
    }

    public splice(value: any): any {
        return this.__forEachLink((link: OneDimensionalLink): void => {
            if (link.value === value) {
                const previous = link.previous;
                const next = link.next;
                previous.next = next;
                next.previous = previous;
                // A freed link can be identified by the fact that it has a null next() value
                link.next = null;
                this.__decrementLength();
                return link.value;
            }
        });
    }

    public shift(): any {
        if (this.length > 0) {
            return this.splice(this.__start.next.value);
        } else {
            return null;
        }
    }

    public contains(value: any): boolean {
        return this.forEach(function(ownedvalue) {
            if (ownedvalue === value) {
                return true;
            }
        });
    }

    public toArray() {
        var result = [];
        this.forEach(function(value) {
            result.push(value);
        });
        return result;
    }

    private __incrementLength(): void {
        this.__length++;
    }

    private __decrementLength(): void {
        if (this.__length === 0) {
            return;
        }
        this.__length--;
    }

    private __forEachLink(fn: (link: OneDimensionalLink) => void): void {
        const link = this.__start.next;
        while (link.next !== null) {
            fn.call(this, link);
            // if the current link being held for iteration has been freed
            if (link.next === null) {
                // revert to the previous non-freed link
                link = link.previous;
            }
            // process the next link
            link = link.next;
        }
    }

}
