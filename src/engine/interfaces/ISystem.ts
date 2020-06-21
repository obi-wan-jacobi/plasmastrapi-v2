import IUnique from '../../data-structures/interfaces/IUnique';

export default interface ISystem extends IUnique {

    once(): void;

    draw(): void;

}
