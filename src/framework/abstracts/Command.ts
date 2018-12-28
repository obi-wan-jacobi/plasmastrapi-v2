import ICommand from '../interfaces/ICommand';
import Invocable from './Invocable';

export default abstract class Command<TPayload, TResult> extends Invocable<TPayload, TResult>
implements ICommand<TPayload, TResult> {

}
