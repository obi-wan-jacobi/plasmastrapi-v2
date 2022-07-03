import Dictionary from 'base/data-structures/Dictionary';
import { Void } from 'base/types';

class EventBus {

  private __subsByTopic = new Dictionary<Dictionary<Void<any>>>();

  public subscribe({ topic, id, fn }: { topic: string; id: string; fn: Void<any> }) {
    let subscribers = this.__subsByTopic.read(topic);
    if (subscribers) {
      subscribers.write({ key: id, value: fn });
      return;
    }
    subscribers = new Dictionary<Void<any>>();
    subscribers.write({ key: id, value: fn });
    this.__subsByTopic.write({ key: topic, value: subscribers });
  }

  public unsubscribe({ topic, id }: { topic: string; id: string; fn: Void<any> }) {
    this.__subsByTopic.read(topic)?.delete(id);
  }

  public publish({ topic, arg }: { topic: string; arg?: any }) {
    this.__subsByTopic.read(topic)?.forEach((fn) => fn(arg));
  }

}

export default new EventBus;