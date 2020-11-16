import IAdaptedMouseEvent from 'engine/interfaces/IAdaptedMouseEvent';
import IEntity from 'engine/interfaces/IEntity';

export default interface IUIEntity extends IEntity {
    $enable(): void;
    $disable(): void;
    $mouseenter(e: IAdaptedMouseEvent): void;
    $mouseleave(e: IAdaptedMouseEvent): void;
    $mousemove(e: IAdaptedMouseEvent): void;
    $mousedown(e: IAdaptedMouseEvent): void;
    $mouseup(e: IAdaptedMouseEvent): void;
    $click(e: IAdaptedMouseEvent): void;
}