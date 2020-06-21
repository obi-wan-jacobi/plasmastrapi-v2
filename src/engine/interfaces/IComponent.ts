import IEntity from './IEntity';
import IUnique from '../../data-structures/interfaces/IUnique';

export default interface IComponent<T extends {}> extends IUnique {
    $entity: IEntity;
    inject(entity: IEntity): void;
    copy(): T;
    mutate(data: T): void;
}
