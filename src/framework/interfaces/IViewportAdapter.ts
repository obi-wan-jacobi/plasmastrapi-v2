import Engine from '../Engine';
import IComponent from './IComponent';

export default interface IViewportAdapter<TComponent extends IComponent<any>> {

    onCursorEnable(component: TComponent): void;

    onCursorDisable(component: TComponent): void;

    onCursorTranslate(component: TComponent): void;

    onCursorBeginActuation(component: TComponent): void;

    onCursorEndActuation(component: TComponent): void;

    onCursorCompleteActuation(component: TComponent): void;

    bind(engine: Engine<IViewportAdapter<IComponent<any>>>): void;

}
