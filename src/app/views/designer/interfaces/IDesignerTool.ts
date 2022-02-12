import IDisposable from 'base/interfaces/IDisposable';
import { Dict } from 'base/types';

export default interface IDesignerTool<TTarget extends {}> extends IDisposable, Dict<any> {
  target?: TTarget;
  equip(): void;
  isDisposed: boolean;
  isDesignerPaletteHovered: boolean;
}