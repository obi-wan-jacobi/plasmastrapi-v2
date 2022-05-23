import IEntity from 'engine/interfaces/IEntity';
import IDictionary from 'base/interfaces/IDictionary';
import { Volatile } from 'base/types';
import IMouseEvent from './IMouseEvent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';

export default interface IHTML5CanvasElement extends IEntity {
    $parent: Volatile<IHTML5CanvasElement>;
    readonly $children: IDictionary<IHTML5CanvasElement>;
    $appendChild<T extends IHTML5CanvasElement>(child: T): T;
    $removeChild<T extends IHTML5CanvasElement>(child: T): void;
    [MOUSE_EVENT.MOUSE_DOWN](event: IMouseEvent): void;
    [MOUSE_EVENT.MOUSE_UP](event: IMouseEvent): void;
    [MOUSE_EVENT.CLICK](event: IMouseEvent): void;
    [MOUSE_EVENT.MOUSE_MOVE](event: IMouseEvent): void;
    [MOUSE_EVENT.MOUSE_ENTER](event: IMouseEvent): void;
    [MOUSE_EVENT.MOUSE_LEAVE](event: IMouseEvent): void;
}