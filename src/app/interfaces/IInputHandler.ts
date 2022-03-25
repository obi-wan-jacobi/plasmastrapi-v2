import IDisposable from 'base/interfaces/IDisposable';

export default interface IInputHandler extends IDisposable {
  dispose(): void;
}