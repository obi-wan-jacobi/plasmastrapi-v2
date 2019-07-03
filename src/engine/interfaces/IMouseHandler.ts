import IAdaptedMouseEvent from './IAdaptedMouseEvent';

export default interface IMouseHandler {
    [key: string]: any;
    mouseenter: (mouseEvent: IAdaptedMouseEvent) => void;
    mousemove: (mouseEvent: IAdaptedMouseEvent) => void;
    mouseleave: (mouseEvent: IAdaptedMouseEvent) => void;
    mousedown: (mouseEvent: IAdaptedMouseEvent) => void;
    mouseup: (mouseEvent: IAdaptedMouseEvent) => void;
    click: (mouseEvent: IAdaptedMouseEvent) => void;
    none: (mouseEvent: IAdaptedMouseEvent) => void;
}
