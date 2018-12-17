import ICommand from './ICommand';
import ICursorPosition from './ICursorPosition';

export default interface IMouseCommand extends ICommand<ICursorPosition, void> {

    invoke(cursorPosition: ICursorPosition): void;

}
