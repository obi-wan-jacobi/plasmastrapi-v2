import IUnique from '../../foundation/interfaces/IUnique';

export default interface ISystem extends IUnique {

  once(): void;

  draw(): void;

}
