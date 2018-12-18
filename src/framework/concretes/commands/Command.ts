import ICommand from '../../interfaces/ICommand';
import Invocable from '../../abstracts/Invocable';

export default class Command<TPayload, TResult> extends Invocable<TPayload, TResult>
implements ICommand<TPayload, TResult> {

}
