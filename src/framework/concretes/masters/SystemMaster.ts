import { Ctor } from '../../types/Ctor';
import Dictionary from '../data-structures/Dictionary';
import IRenderContext from '../../interfaces/IRenderContext';
import InputSystem from '../../abstracts/InputSystem';
import RenderSystem from '../../abstracts/rendering/RenderSystem';

export default class SystemMaster {

    private __renderContext: IRenderContext;
    private __inputSystems: Dictionary<InputSystem<any>>;
    private __renderSystems: Dictionary<RenderSystem<any>>;

    constructor(renderContext: IRenderContext) {
        this.__renderContext = renderContext;
        this.__inputSystems = new Dictionary<InputSystem<any>>();
        this.__renderSystems = new Dictionary<RenderSystem<any>>();
    }

    public get inputs(): Dictionary<InputSystem<any>> {
        return this.__inputSystems;
    }

    public get renderers(): Dictionary<RenderSystem<any>> {
        return this.__renderSystems;
    }

    public getInputReceiver<TInputSystem extends InputSystem<any>>(SystemClass: Ctor<TInputSystem, void>)
    : TInputSystem {
        return this.__inputSystems.read(SystemClass.name) as TInputSystem;
    }

    public addInputReceiver<TInputSystem extends InputSystem<any>>(
        InputSystemSubclass: Ctor<TInputSystem, void>
    ): void {
        this.__inputSystems.write({
            key: InputSystemSubclass.name,
            value: new InputSystemSubclass(),
        });
    }

    public addRenderer<TRenderSystem extends RenderSystem<any>>(
        RenderSystemSubclass: Ctor<TRenderSystem, IRenderContext>
    ): void {
        this.__renderSystems.write({
            key: RenderSystemSubclass.name,
            value: new RenderSystemSubclass(this.__renderContext),
        });
    }

}
