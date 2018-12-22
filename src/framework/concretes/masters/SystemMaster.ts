import { Ctor } from '../../types/Ctor';
import IRenderContext from '../../interfaces/IRenderContext';
import InputSystem from '../../abstracts/InputSystem';
import RenderSystem from '../../abstracts/rendering/RenderSystem';
import TypeCollection from '../data-structures/TypeCollection';

export default class SystemMaster {

    private __renderContext: IRenderContext;
    private __inputSystems: TypeCollection<InputSystem<any>>;
    private __renderSystems: TypeCollection<RenderSystem<any>>;

    constructor(renderContext: IRenderContext) {
        this.__renderContext = renderContext;
        this.__inputSystems = new TypeCollection<InputSystem<any>>();
        this.__renderSystems = new TypeCollection<RenderSystem<any>>();
    }

    public get inputs(): TypeCollection<InputSystem<any>> {
        return this.__inputSystems;
    }

    public get renderers(): TypeCollection<RenderSystem<any>> {
        return this.__renderSystems;
    }

    public getInputReceiver<TInputSystem extends InputSystem<any>>(SystemConstructor: Ctor<TInputSystem, void>)
    : TInputSystem {
        return this.__inputSystems.get(SystemConstructor);
    }

    public addInputReceiver<TInputSystem extends InputSystem<any>>(
        SystemConstructor: Ctor<TInputSystem, void>
    ): void {
        this.__inputSystems.add(new SystemConstructor());
    }

    public addRenderer<TRenderSystem extends RenderSystem<any>>(
        SystemConstructor: Ctor<TRenderSystem, IRenderContext>
    ): void {
        this.__renderSystems.add(new SystemConstructor(this.__renderContext));
    }

}
