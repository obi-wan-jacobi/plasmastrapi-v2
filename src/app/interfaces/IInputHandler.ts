import IDisposable from 'base/interfaces/IDisposable';
import { Dict, Void } from 'base/types';

export default interface IInputHandler extends IDisposable, Dict<Void<any>> {
  dispose(): void;
}