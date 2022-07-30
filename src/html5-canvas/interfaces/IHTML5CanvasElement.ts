import IEntity from 'engine/interfaces/IEntity';
import IMouseEvent from './IMouseEvent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';

export default interface IHTML5CanvasElement extends IEntity {
    $subscribe({ method, id, callback }: { method: string; id: string; callback: () => void }): void;
    $unsubscribe({ method, id }: { method: string; id: string }): void;
    [MOUSE_EVENT.MOUSE_DOWN](event: IMouseEvent): void;
    [MOUSE_EVENT.MOUSE_UP](event: IMouseEvent): void;
    [MOUSE_EVENT.CLICK](event: IMouseEvent): void;
    [MOUSE_EVENT.MOUSE_MOVE](event: IMouseEvent): void;
    [MOUSE_EVENT.MOUSE_ENTER](event: IMouseEvent): void;
    [MOUSE_EVENT.MOUSE_LEAVE](event: IMouseEvent): void;
}