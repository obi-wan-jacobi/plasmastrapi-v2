import IComponent from '../interfaces/IComponent';
import IIterable from '../interfaces/IIterable';
import IRenderContext from '../interfaces/IRenderContext';
import System from './System';

export default abstract class RenderSystem<T> extends System<IComponent<T>> {

    protected _context: IRenderContext;

    constructor({ context, iterable }: { context: IRenderContext, iterable: IIterable<T> }) {
        super({ iterable });
        this._context = context;
    }

}
