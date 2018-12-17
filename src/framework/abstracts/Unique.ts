import IUnique from '../interfaces/IUnique';
const uuidv1 = require('uuid/v1');

export default abstract class Unique implements IUnique {

    private __id: string;

    constructor() {
        this.__id = uuidv1();
    }

    get id(): string {
        return this.__id;
    }

}
