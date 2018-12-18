import Engine from '../Engine';
import IComponent from './IComponent';
import IRenderContext from './IRenderContext';

export default interface IViewportAdapter<TComponent extends IComponent<any>> {

    bind(engine: Engine<IViewportAdapter<IComponent<any>>>): void;

    onCursorEnable(component: TComponent): void;

    onCursorDisable(component: TComponent): void;

    onCursorTranslate(component: TComponent): void;

    onCursorBeginActuation(component: TComponent): void;

    onCursorEndActuation(component: TComponent): void;

    onCursorCompleteActuation(component: TComponent): void;

    getRenderContext(): IRenderContext;

    refreshRenderContext(): void;

}
