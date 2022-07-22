import ICommand from 'app/interfaces/ICommand';
import IController from 'app/interfaces/IController';

export default class CommandController implements IController {

  private __undoHistory: ICommand[] = [];
  private __redoHistory: ICommand[] = [];

  public init(): void {

  }

  public invoke(command: ICommand): void {
    command.invoke();
    this.__undoHistory.push(command);
    this.__redoHistory = [];
  }

  public undo(): void {
    const command = this.__undoHistory.pop();
    if (!command) {
      return;
    }
    command.undo();
    this.__redoHistory.push(command);
  }

  public redo(): void {
    const command = this.__redoHistory.pop();
    if (!command) {
      return;
    }
    command.invoke();
    this.__undoHistory.push(command);
  }

}
