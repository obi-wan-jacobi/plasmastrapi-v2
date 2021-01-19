import IEvent from '../../engine/interfaces/IEvent';

export default interface IKeyboardEvent extends IEvent {
    key: string;
}
