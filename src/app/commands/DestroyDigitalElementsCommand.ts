import Command from 'app/abstracts/Command';
import { app } from 'app/main';
import DigitalElement from 'digital-logic/abstracts/DigitalElement';
import Wire from 'digital-logic/wires/Wire';
import { Etor } from 'engine/types';
import PoseComponent, { IPoint } from 'foundation/geometry/components/PoseComponent';
import DestroyWiresCommand from './DestroyWiresCommand';

export default class DestroyDigitalElementsCommand extends Command {

  private __tuples: [Etor<DigitalElement, IPoint>, IPoint, string, string[]][] = [];

  private __destroyWiresCommand: DestroyWiresCommand;

  public constructor(elements: DigitalElement[]) {
    super();
    elements.forEach((element) => {
      this.__tuples.push([
        element.constructor as Etor<DigitalElement, IPoint>,
        element.$copy(PoseComponent)!,
        element.$id,
        element.$children.toArray()
        .filter((child) => !(child instanceof Wire)).map((child) => child.$id),
      ]);
    });
    this.__destroyWiresCommand = new DestroyWiresCommand(
      elements.reduce((wires, element) => {
        return wires.concat(element.$children.filter((c) => c instanceof Wire) as Wire[]);
      }, [] as Wire[]).filter((wire, i, self) => self.indexOf(wire) === i)
    );
  }

  public invoke(): void {
    this.__destroyWiresCommand.invoke();
    this.__tuples.forEach(([,,$id]) => app.entities.get($id)!.$destroy());
  }

  public undo(): void {
    this.__tuples.forEach(([Etor, point, $id, children$]) => {
      const instance = new Etor(point);
      app.entities.reId(instance.$id, $id);
      const children = instance.$children.toArray();
      children$.forEach((child$, i) => {
        app.entities.reId(children[i].$id, child$);
      });
    });
    this.__destroyWiresCommand.undo();
  }

}