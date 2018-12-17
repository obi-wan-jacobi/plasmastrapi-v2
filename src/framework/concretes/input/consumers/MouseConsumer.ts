import Dictionary from '../../data-structures/Dictionary';
import IMouseCommand from 'src/framework/interfaces/IMouseCommand';
import Invocable from 'src/framework/abstracts/Invocable';
import MouseConsumable from '../consumables/MouseConsumable';

export default class MouseConsumer extends Invocable<MouseConsumable, void> {

    private __strategies: Dictionary<IMouseCommand>;

    constructor() {
        super({ method: () => undefined });
        this.__strategies = new Dictionary<IMouseCommand>();
    }

    public set(event: string, command: IMouseCommand): void {
        this.__strategies.write({
            key: event,
            value: command,
        });
    }

    public invoke(input: MouseConsumable): void {
        const payload = input.consume();
        const command = this.__strategies.read(payload.event);
        if (command) {
            command.invoke(payload.position);
        } else {
            throw new Error(`${this.constructor.name} has no matching input command!`);
        }
    }

}
