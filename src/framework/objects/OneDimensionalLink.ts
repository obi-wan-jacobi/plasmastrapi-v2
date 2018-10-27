
export default class OneDimensionalLink {

    private __value: any | null;
    private __next: OneDimensionalLink;
    private __previous: OneDimensionalLink;

    constructor(value: any | null = null) {
        this.__value = value;
        this.__next = this;
        this.__previous = this;
    }

    public get next(): OneDimensionalLink {
        return this.__next;
    }
    public set next(link: OneDimensionalLink) {
        this.__next = link;
        link.__previous = this;
    }

    public get previous(): OneDimensionalLink {
        return this.__previous;
    }
    public set previous(link: OneDimensionalLink) {
        this.__previous = link;
        link.__next = this;
    }

    public get value(): any {
        return this.__value;
    }

    public get isStart(): boolean {
        return this.previous === this;
    }

    public get isEnd(): boolean {
        return this.next === this;
    }

}
