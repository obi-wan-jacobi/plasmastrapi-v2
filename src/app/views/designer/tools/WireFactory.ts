import Dictionary from 'base/concretes/Dictionary';
import { Void } from 'base/types';
import Gate from 'digital-logic/entities/Gate';
import InputTerminal from 'digital-logic/entities/InputTerminal';
import OutputTerminal from 'digital-logic/entities/OutputTerminal';
import Wire from 'digital-logic/entities/Wire';

export default class WireFactory {

  private __gateToWiresMap = new Dictionary<Dictionary<Wire>>();

  public add({ input, output }: { input: InputTerminal; output: OutputTerminal }): Wire {
    const wire = new Wire({ head: input, tail: output });
    this.__addToMap({ target: input.$parent! as Gate, wire });
    this.__addToMap({ target: output.$parent! as Gate, wire });
    return wire;
  }

  public for(gate: Gate): { do: Void<Void<Wire>> } {
    const collection = this.__gateToWiresMap.read(gate.$id);
    return collection ? { do: collection.forEach.bind(collection) }: { do: () => undefined };
  }

  private __addToMap({ target, wire }: { target: Gate; wire: Wire }): void {
    let collection = this.__gateToWiresMap.read(target.$id);
    if (!collection) {
      collection = new Dictionary();
      this.__gateToWiresMap.write({
        key: target.$id,
        value: collection,
      });
    }
    collection.write({ key: wire.$id, value: wire });
  }
}