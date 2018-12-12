import IIterable from '../templates/IIterable';
import Wrapper from '../abstracts/Wrapper';

export default class SuperArray<T> extends Wrapper<T[]> implements IIterable<T[]> {

    constructor() {
        super({ payload: new Array<T>() });
    }


    public forEach(fn: (payload: T) => void): void {
        return this.__do({ methodString: this.forEach.name, fn });
    }

    public map(fn: (payload: T) => T): T[] {
        return this.__do({ methodString: this.map.name, fn });
    }

    private __do({ methodString, fn }: { methodString: string, fn: (payload: T) => any }): any {
        return (this.unwrap() as { [key: string]: any })[methodString](fn);
    }

}
