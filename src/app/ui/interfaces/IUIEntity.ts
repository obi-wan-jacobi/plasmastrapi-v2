import IMouseEvent from 'engine/interfaces/IMouseEvent';
import IEntity from 'engine/interfaces/IEntity';

export default interface IUIEntity extends IEntity {
    $enable(): void;
    $disable(): void;
    $mouseenter(e: IMouseEvent): void;
    $mouseleave(e: IMouseEvent): void;
    $mousemove(e: IMouseEvent): void;
    $mousedown(e: IMouseEvent): void;
    $mouseup(e: IMouseEvent): void;
    $click(e: IMouseEvent): void;
}