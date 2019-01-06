import IUnique from '../interfaces/IUnique';
import Unique from './Unique';
import Wrapper from './Wrapper';

export default abstract class UniqueWrapper<T extends {}> extends Wrapper<T> implements IUnique {

    public readonly id: string;

    constructor(data: T) {
        super(data);
        this.id = Unique.generateUuid();
    }

}
