import IUnique from '../interfaces/IUnique';
const uuidv1 = require('uuid/v1');

export default abstract class Unique implements IUnique {

    private __id: string;

    public static generateUuid(): string {
        return uuidv1();
    }

    constructor(id?: string) {
        this.__id = id || Unique.generateUuid();
    }

    get id(): string {
        return this.__id;
    }

}
