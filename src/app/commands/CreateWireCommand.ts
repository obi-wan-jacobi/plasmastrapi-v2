import Command from 'app/abstracts/Command';
import { app } from 'app/main';
import InputTerminal from 'digital-logic/terminals/InputTerminal';
import OutputTerminal from 'digital-logic/terminals/OutputTerminal';
import Wire from 'digital-logic/wires/Wire';

export default class CreateWireCommand extends Command {

  private __wire$?: string;
  private __input$: string;
  private __output$: string;

  public constructor({ input, output}: { input: InputTerminal; output: OutputTerminal }) {
    super();
    this.__input$ = input.$id;
    this.__output$ = output.$id;
  }

  public invoke(): void {
    const input = app.entities.get(this.__input$) as InputTerminal;
    const output = app.entities.get(this.__output$) as OutputTerminal;
    if (!this.__wire$) {
      this.__wire$ = new Wire({ input, output }).$id;
    } else {
      app.entities.reId(new Wire({ input, output }).$id, this.__wire$);
    }
  }

  public undo(): void {
    app.entities.get(this.__wire$!)!.$destroy();
  }

}