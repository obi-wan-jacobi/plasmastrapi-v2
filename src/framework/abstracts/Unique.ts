import uuidv1 from 'uuid/v1';
import IUnique from '../interfaces/IUnique';

export default abstract class Unique implements IUnique {

    private __id: string;

    constructor() {
        this.__id = uuidv1();
    }

    get id(): string {
        return this.__id;
    }

}
