import Component from '../../framework/abstracts/Component';
import CursorEventComponent from '../../framework/concretes/components/CursorEventComponent';
import ICommand from '../../framework/interfaces/ICommand';
import { Optional } from '../../framework/types/Optional';

export default class ActuatableComponent
 extends Component<{
     onBegin: Optional<ICommand<CursorEventComponent, void>>,
     onEnd: Optional<ICommand<CursorEventComponent, void>>,
     onComplete: Optional<ICommand<CursorEventComponent, void>>,
}> {

    constructor({ onBegin, onEnd, onComplete }: {
        onBegin?: ICommand<CursorEventComponent, void>,
        onEnd?: ICommand<CursorEventComponent, void>,
        onComplete?: ICommand<CursorEventComponent, void>,
   }) {
        super({ onBegin, onEnd, onComplete });
    }

}
