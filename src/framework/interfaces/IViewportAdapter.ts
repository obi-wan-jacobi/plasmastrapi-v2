import IComponent from './IComponent';
import IInputEvent from './IInputEvent';
import IRenderContext from './IRenderContext';
import StoreMaster from '../concretes/masters/StoreMaster';

export default interface IViewportAdapter<TComponent extends IComponent<IInputEvent<any>>> {

    onCursorEnable(component: TComponent): void;

    onCursorDisable(component: TComponent): void;

    onCursorTranslate(component: TComponent): void;

    onCursorBeginActuation(component: TComponent): void;

    onCursorEndActuation(component: TComponent): void;

    onCursorCompleteActuation(component: TComponent): void;

    storeInputs(store: StoreMaster): void;

    clearStoredInputs(store: StoreMaster): void;

    getRenderContext(): IRenderContext;

}
