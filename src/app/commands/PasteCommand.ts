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

  private __ingredients: PasteIngredients;

  public constructor(container: IEntityContainer<DigitalElement>) {
    super();
    this.__ingredients = fromContainerToPasteIngredients(container);
  }

  public invoke(): void {
    fromPasteIngredientsToPasta(this.__ingredients);
  }

  public undo(): void {
    const [tuples, createWireCommands] = this.__ingredients;
    createWireCommands.forEach((command) => command.undo());
    tuples.forEach(([,,$id]) => app.entities.get($id)!.$destroy());
  }

}

export type PasteIngredients = [
  [Etor<DigitalElement, IPoint>, IPoint, string, string[]][],
  CreateWireCommand[],
];


export const fromContainerToPasteIngredients = (container: IEntityContainer<DigitalElement>): PasteIngredients => {
  const tuples: PasteIngredients[0] = [];
  const childMap$: Dict<string> = {};
  container.items.forEach((element) => {
    tuples.push([
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
  const wires = [...container.items].reduce((result, element) => {
    return result.concat(element.$children.filter((child) => child instanceof Wire) as []);
  }, []).filter((wire, index, self) => self.indexOf(wire) === index) as Wire[];
  const createWireCommands = wires.map((wire) =>
    new CreateWireCommand({
      input$: childMap$[wire.input.$id] || wire.input.$id,
      output$: childMap$[wire.output.$id] || wire.output.$id,
    })
  );
  return [tuples, createWireCommands];
};

export const fromPasteIngredientsToPasta = ([tuples, createWireCommands]: PasteIngredients): DigitalElement[] => {
  const pasta: DigitalElement[] = [];
  tuples.forEach(([Etor, point, id$, children$]) => {
    const instance = new Etor(point);
    app.entities.reId(instance.$id, id$);
    const children = instance.$children.toArray();
    children$.forEach((child$, i) => {
      app.entities.reId(children[i].$id, child$);
    });
    pasta.push(instance);
  });
  createWireCommands.forEach((command) => command.invoke());
  return pasta;
};