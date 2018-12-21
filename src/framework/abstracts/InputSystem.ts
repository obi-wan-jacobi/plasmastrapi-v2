import IComponent from '../interfaces/IComponent';
import IInputEvent from '../interfaces/IInputEvent';
import System from './System';

export default abstract class InputSystem<TComponent extends IComponent<IInputEvent<any>>> extends System<TComponent> {

}
