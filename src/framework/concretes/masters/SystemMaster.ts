import { Ctor } from '../../types/Ctor';
import IRenderContext from '../../interfaces/IRenderContext';
import InputSystem from '../../abstracts/InputSystem';
import RenderSystem from '../../abstracts/rendering/RenderSystem';
import System from '../../abstracts/System';
import TypeCollection from '../data-structures/TypeCollection';

export default class SystemMaster {

    private __renderContext: IRenderContext;
    private __inputSystems: TypeCollection<InputSystem<any>>;
    private __basicSystems: TypeCollection<System<any>>;
    private __renderSystems: TypeCollection<RenderSystem<any>>;

    constructor(renderContext: IRenderContext) {
        this.__renderContext = renderContext;
        this.__inputSystems = new TypeCollection<InputSystem<any>>();
        this.__basicSystems = new TypeCollection<System<any>>();
        this.__renderSystems = new TypeCollection<RenderSystem<any>>();
    }

    public get inputs(): TypeCollection<InputSystem<any>> {
        return this.__inputSystems;
    }

    public get basic(): TypeCollection<System<any>> {
        return this.__basicSystems;
    }

    public get renderers(): TypeCollection<RenderSystem<any>> {
        return this.__renderSystems;
    }

    public getInputReceiver<TInputSystem extends InputSystem<any>>(SystemCtor: Ctor<TInputSystem, void>)
    : TInputSystem {
        return this.__inputSystems.get(SystemCtor);
    }

    public addInputReceiver<TInputSystem extends InputSystem<any>>(
        SystemCtor: Ctor<TInputSystem, void>
    ): TInputSystem {
        const system = new SystemCtor();
        this.__inputSystems.add(system);
        return system;
    }

    public add<TSystem extends System<any>>(SystemCtor: Ctor<TSystem, void>): TSystem {
        const system = new SystemCtor();
        this.__basicSystems.add(system);
        return system;
    }

    public addRenderer<TRenderSystem extends RenderSystem<any>>(
        SystemCtor: Ctor<TRenderSystem, IRenderContext>
    ): TRenderSystem {
        const system = new SystemCtor(this.__renderContext);
        this.__renderSystems.add(system);
        return system;
    }

}
