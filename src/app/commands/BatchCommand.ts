import Command from 'app/abstracts/Command';

export default class BatchCommand extends Command {

  private __commands: Command[];

  public constructor(commands: Command[]) {
    super();
    this.__commands = commands;
  }

  public invoke(): void {
    this.__commands.forEach((c) => c.invoke());
  }

  public undo(): void {
    this.__commands.forEach((c) => c.undo());
  }

}