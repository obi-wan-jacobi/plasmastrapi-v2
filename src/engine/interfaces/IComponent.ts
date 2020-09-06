import IEntity from './IEntity';
import IUnique from '../../data-structures/interfaces/IUnique';

export type CCtor<TClass extends IComponent<{}>, TArg extends {}> = new (entity: IEntity, arg: TArg) => TClass;

export default interface IComponent<T extends {}> extends IUnique {
  $entity: IEntity;
  copy(): T;
  mutate(data: T): void;
}
