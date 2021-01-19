import IEvent from 'engine/interfaces/IEvent';

export default interface IMouseEvent extends IEvent {
    x: number;
    y: number;
    isCtrlDown: boolean;
    isShiftDown: boolean;
}
