import Dictionary from '../concretes/data-structures/Dictionary';
import ICommand from '../interfaces/ICommand';
import ILoopable from '../../engine/interfaces/ILoopable';
import UniqueWrapper from './UniqueWrapper';

export default class MessageReceiver extends UniqueWrapper<Dictionary<{ command: ICommand<any, void>, buffer: any[] }>>
implements ILoopable<void> {

    constructor(commands: { [key: string]: ICommand<any, void>}) {
        super(new Dictionary<{ command: ICommand<any, void>, buffer: any[] }>());
        Object.keys(commands).forEach((topic) => {
            this.unwrap().write({
                key: topic,
                value: {
                    command: commands[topic],
                    buffer: [],
                },
            });
        });
    }

    public push(topic: string, payload: any): void {
        this.unwrap().read(topic).buffer.unshift(payload);
    }

    public once(): void {
        this.unwrap().forEach((profile) => {
            const payload = profile.buffer.pop();
            profile.command.invoke(payload);
        });
    }

}
