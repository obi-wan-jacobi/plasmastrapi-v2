import { CURSOR_EVENT } from '../../enums/CURSOR_EVENT';
import CursorComponent from '../../concretes/components/CursorComponent';
import CursorSystem from '../CursorSystem';

export function CursorComponentIsResetAfter(
    target: CursorSystem,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
): any {
    const method = descriptor.value;
    descriptor.value = function(component: CursorComponent): void {
        method.call(this, component);
        component.data.eventName = CURSOR_EVENT.UNDEFINED;
        component.data.cursor.x = -1;
        component.data.cursor.y = -1;
    };
}
