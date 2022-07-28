import Command from 'app/abstracts/Command';
import { app } from 'app/main';
import InputTerminal from 'digital-logic/terminals/InputTerminal';
import OutputTerminal from 'digital-logic/terminals/OutputTerminal';
import Wire from 'digital-logic/wires/Wire';

export default class DestroyWiresCommand extends Command {

  private __tuples: [string, string, string][] = [];

  public constructor(wires: Wire[]) {
    super();
    this.__tuples = wires.map((wire) => [
      wire.$id,
      wire.input.$id,
      wire.output.$id,
    ]);
  }

  public invoke(): void {
    this.__tuples.forEach(([wire$]) => app.entities.get(wire$)!.$destroy());
  }

  public undo(): void {
    this.__tuples.forEach(([wire$, input$, output$]) => {
      const input = app.entities.get(input$) as OutputTerminal;
      const output = app.entities.get(output$) as InputTerminal;
      app.entities.reId(new Wire({ input, output }).$id, wire$);
    });
  }

}