import { Constructor, Optional } from 'foundation/types';
import IUIEntity from './IUIEntity';

export default interface IUIContainer {
    appendChild<T extends IUIEntity, TArg extends {}>(UIElementCtor: Constructor<T, Optional<TArg>>, arg?: TArg): void;
}