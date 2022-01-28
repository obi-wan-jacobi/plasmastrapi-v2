import IPipeEvent from 'engine/interfaces/IPipeEvent';

export default interface IMouseEvent extends IPipeEvent {
    x: number;
    y: number;
    isCtrlDown: boolean;
    isShiftDown: boolean;
}
