import IEntity from './IEntity';
import IUnique from '../../foundation/interfaces/IUnique';

export default interface IComponent<T extends {}> extends IUnique {
  $entity: IEntity;
  copy(): T;
  mutate(data: T): void;
}
