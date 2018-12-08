import IRenderContext from '../templates/IRenderContext';
import Context from './Context';

export default abstract class RenderContext<T> extends Context<T> implements IRenderContext {

    public get ctx(): T {
        return this.unwrap();
    }

    public abstract drawPoint({ x, y }: { x: number, y: number }): void;

}
