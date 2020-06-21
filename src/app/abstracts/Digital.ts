import { IDigital as IDigital } from '../interfaces/IDigital';
import { STATE } from '../enums/STATE';
import Unique from 'src/data-structures/abstracts/Unique';
import Dictionary from 'src/data-structures/concretes/Dictionary';

export abstract class Digital extends Unique implements IDigital {

    private __state: STATE = STATE.OFF;
    private __sources: Dictionary<Digital> = new Dictionary();
    private __targets: Dictionary<Digital> = new Dictionary();

    public get isHigh(): boolean {
        return this.__state === STATE.HIGH;
    }

    public get isLow(): boolean {
        return this.__state === STATE.LOW;
    }

    public get isOff(): boolean {
        return this.__state === STATE.OFF;
    }

    public high(): void {
        this.__state = STATE.HIGH;
    }

    public low(): void {
        this.__state = STATE.LOW;
    }

    public off(): void {
        this.__state = STATE.OFF;
    }

    public sources(): Digital[] {
        return this.__sources.toArray();
    }

    public lead(target: Digital): void {
        if (this.__targets.read(target.id)) {
            return;
        }
        this.__targets.write({ key: target.id, value: target });
        target.follow(this);
    }

    public unlead(source: Digital): void {
        this.__targets.delete(source.id);
    }

    public follow(source: Digital): void {
        if (this.__sources.read(source.id)) {
            return;
        }
        this.__sources.write({ key: source.id, value: source });
        source.lead(this);
    }

    public unfollow(source: Digital): void {
        this.__sources.delete(source.id);
    }

    public abstract once(): void;

    public dispose(): void {
        this.__sources.forEach((source) => source.unlead(this));
        this.__targets.forEach((target) => target.unfollow(this));
    }
}
