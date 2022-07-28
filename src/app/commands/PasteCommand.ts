import Command from 'app/abstracts/Command';
import IEntityContainer from 'app/interfaces/IEntityContainer';
import { app } from 'app/main';
import Unique from 'base/abstracts/Unique';
import { Dict } from 'base/types';
import DigitalElement from 'digital-logic/abstracts/DigitalElement';
import Wire from 'digital-logic/wires/Wire';
import { Etor } from 'engine/types';
import PoseComponent, { IPoint } from 'foundation/geometry/components/PoseComponent';
import CreateWireCommand from './CreateWireCommand';

export default class PasteCommand extends Command {

  private __tuples: [Etor<DigitalElement, IPoint>, IPoint, string, string[]][] = [];
  private __createWireCommands: CreateWireCommand[];

  public constructor(container: IEntityContainer<DigitalElement>, wires: Wire[]) {
    super();
    const childMap$: Dict<string> = {};
    container.items.forEach((element) => {
      this.__tuples.push([
        element.constructor as Etor<DigitalElement, IPoint>,
        element.$copy(PoseComponent)!,
        Unique.generateUuid(),
        element.$children.toArray()
          .filter((child) => !(child instanceof Wire)).map((child) => {
            const id$ = Unique.generateUuid();
            childMap$[child.$id] = id$;
            return id$;
          }),
      ]);
    });
    this.__createWireCommands = wires.map((wire) =>
      new CreateWireCommand({
        input$: childMap$[wire.input.$id],
        output$: childMap$[wire.output.$id],
      })
    );
  }

  public invoke(): void {
    this.__tuples.forEach(([Etor, point, $id, children$]) => {
      const instance = new Etor(point);
      app.entities.reId(instance.$id, $id);
      const children = instance.$children.toArray();
      children$.forEach((child$, i) => {
        app.entities.reId(children[i].$id, child$);
      });
    });
    this.__createWireCommands.forEach((command) => command.invoke());
  }

  public undo(): void {
    this.__createWireCommands.forEach((command) => command.undo());
    this.__tuples.forEach(([,,$id]) => app.entities.get($id)!.$destroy());
  }

}