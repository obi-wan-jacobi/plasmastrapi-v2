import Dictionary from '../concretes/data-structures/Dictionary';
import Index from '../concretes/data-structures/Index';
import MessageReceiver from './MessageReceiver';
import Wrapper from './Wrapper';

export default class MessageDispatcher extends Wrapper<Dictionary<Index<any>>> {

    constructor() {
        super(new Dictionary<Index<any>>());
    }

    public subscribe(topic: string, receiver: MessageReceiver): void {
        if (!this.unwrap().read(topic)) {
            this.unwrap().write({
                key: topic,
                value: new Index<any>(),
            });
        }
        this.unwrap().read(topic).add(receiver);
    }

    public unsubscribe(topic: string, receiver: MessageReceiver): void {
        this.unwrap().read(topic).remove(receiver.id);
    }

    public dispatch(topic: string, payload?: any): void {
        if (!this.unwrap().read(topic)) {
            return;
        }
        this.unwrap().read(topic).forEach((receiver: MessageReceiver) => {
            receiver.push(topic, payload);
        });
    }

}
