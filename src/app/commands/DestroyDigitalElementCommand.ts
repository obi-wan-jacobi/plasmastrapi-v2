import Command from 'app/abstracts/Command';
import { app } from 'app/main';
import DigitalElement from 'digital-logic/abstracts/DigitalElement';
import Wire from 'digital-logic/wires/Wire';
import { Etor } from 'engine/types';
import PoseComponent, { IPoint } from 'foundation/geometry/components/PoseComponent';
import BatchCommand from './BatchCommand';
import DestroyWireCommand from './DestroyWireCommand';

export default class DestroyDigitalElementCommand extends Command {

  private __element$: string;
  private __children$: string[];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private __Etor: Etor<DigitalElement, IPoint>;
  private __arg: IPoint;

  private __destroyWiresCommand: BatchCommand;

  public constructor({ target }: { target: DigitalElement }) {
    super();
    this.__element$ = target.$id;
    this.__children$ = target.$children.toArray()
      .filter((c) => !(c instanceof Wire)).map((c) => c.$id);
    this.__Etor = target.constructor as Etor<DigitalElement, IPoint>;
    this.__arg = target.$copy(PoseComponent)!;
    this.__destroyWiresCommand = new BatchCommand(
      target.$children.filter((c) => c instanceof Wire)
        .map((wire: Wire) => new DestroyWireCommand({ wire }))
    );
  }

  public invoke(): void {
    this.__destroyWiresCommand.invoke();
    app.entities.get(this.__element$)!.$destroy();
  }

  public undo(): void {
    const instance = new this.__Etor(this.__arg);
    const children = instance.$children.toArray();
    app.entities.reId(instance.$id, this.__element$);
    this.__children$.forEach((c$, i) => app.entities.reId(children[i].$id, c$));
    this.__destroyWiresCommand.undo();
  }

}