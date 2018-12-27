import Command from '../commands/Command';
import Component from '../../abstracts/Component';
import CursorEventComponent from './CursorEventComponent';
import ICommand from '../../interfaces/ICommand';

export default class ActuatableComponent
 extends Component<{
     onBegin: ICommand<CursorEventComponent, void>,
     onEnd: ICommand<CursorEventComponent, void>,
     onComplete: ICommand<CursorEventComponent, void>,
}> {

    constructor({ onBegin, onEnd, onComplete }: {
        onBegin?: ICommand<CursorEventComponent, void>,
        onEnd?: ICommand<CursorEventComponent, void>,
        onComplete?: ICommand<CursorEventComponent, void>,
   }) {
        super({
            onBegin: onBegin || new Command({ method: (component: CursorEventComponent): void => undefined }),
            onEnd: onEnd || new Command({ method: (component: CursorEventComponent): void => undefined }),
            onComplete: onComplete || new Command({ method: (component: CursorEventComponent): void => undefined }),
        });
    }

}
