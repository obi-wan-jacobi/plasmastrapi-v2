import ICommand from 'app/interfaces/ICommand';

export default abstract class Command implements ICommand {

  public abstract invoke(): void;

  public abstract undo(): void;

}