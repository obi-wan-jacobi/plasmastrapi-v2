import Unique from './Unique';

export default abstract class System<TPayload extends {}> extends Unique {

    constructor(PayloadSubclass: new (data: {}) => TPayload) {
        super(PayloadSubclass.name);
    }

    public abstract once(payload: TPayload): void;

}
