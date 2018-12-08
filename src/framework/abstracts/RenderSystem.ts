import IIterable from '../templates/IIterable';
import IRenderContext from '../templates/IRenderContext';
import System from './System';

export default abstract class RenderSystem<T> extends System<T> {

    protected _context: IRenderContext;

    constructor({ context, iterable }: { context: IRenderContext, iterable: IIterable<T> }) {
        super({ iterable });
        this._context = context;
    }

}
