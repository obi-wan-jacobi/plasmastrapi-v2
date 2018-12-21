import Context from '../Context';
import IPosition2D from '../../interfaces/IPosition2D';
import IRenderContext from '../../interfaces/IRenderContext';

export default abstract class RenderContext<T> extends Context<T> implements IRenderContext {

    public get ctx(): T {
        return this.unwrap();
    }

    public abstract refresh(): void;

    public abstract drawPoint(point: IPosition2D): void;

}
