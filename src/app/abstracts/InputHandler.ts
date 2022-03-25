import IInputHandler from 'app/interfaces/IInputHandler';

export default abstract class InputHandler implements IInputHandler {

  public abstract dispose(): void;
}