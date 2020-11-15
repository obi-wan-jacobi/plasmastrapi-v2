import IUnique from '../interfaces/IUnique';

const uuidv1 = require('uuid/v1');

export default abstract class Unique implements IUnique {

    public get id(): string {
        return this.__id;
    }

    public static generateUuid(): string {
        return uuidv1();
    }

    private __id: string;

    public constructor(id?: string) {
        this.__id = id || Unique.generateUuid();
    }

}
