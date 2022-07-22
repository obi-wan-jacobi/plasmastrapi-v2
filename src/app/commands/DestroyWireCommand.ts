import Command from 'app/abstracts/Command';
import { app } from 'app/main';
import InputTerminal from 'digital-logic/terminals/InputTerminal';
import OutputTerminal from 'digital-logic/terminals/OutputTerminal';
import Wire from 'digital-logic/wires/Wire';

export default class CreateWireCommand extends Command {

  private __wire$: string;
  private __input$: string;
  private __output$: string;

  public constructor({ wire }: { wire: Wire }) {
    super();
    this.__input$ = wire.input.$parent!.$id;
    this.__output$ = wire.output.$parent!.$id;
    this.__wire$ = wire.$id;
  }

  public invoke(): void {
    app.entities.get(this.__wire$)!.$destroy();
  }

  public undo(): void {
    const input = app.entities.get(this.__input$) as InputTerminal;
    const output = app.entities.get(this.__output$) as OutputTerminal;
    this.__wire$ = new Wire({ input, output }).$id;
  }

}