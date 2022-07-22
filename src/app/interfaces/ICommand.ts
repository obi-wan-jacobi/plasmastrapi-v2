
export default interface ICommand {

  invoke(): void;

  undo(): void;

}