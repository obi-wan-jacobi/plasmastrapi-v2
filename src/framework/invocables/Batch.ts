import Command from './Command';
import Invocable from '../abstracts/Invocable';

export default class Batch extends Invocable<void, any[]> {

    private __commands: Array<Command<void, any>>;

    constructor() {
        super({ method: (): any[] => this.__commands.map((command) => command.invoke()) });
        this.__commands = new Array<Command<void, any>>();
    }

    public add(command: Command<void, any>): void {
        this.__commands.push(command);
    }

}
