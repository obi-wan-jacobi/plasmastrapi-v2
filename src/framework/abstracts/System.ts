import Unique from './Unique';

export default abstract class System<TPayload extends {}> extends Unique {

    /* tslint:disable:naming-convention */
    private __PayloadSubclass: new (data: {}) => TPayload;

    constructor(PayloadSubclass: new (data: {}) => TPayload) {
        super();
        this.__PayloadSubclass = PayloadSubclass;
    }

    public abstract once(payload: TPayload): void;

    public get id(): string {
        return this.__PayloadSubclass.name;
    }

}
