import { CURSOR_EVENT } from '../../enums/CURSOR_EVENT';
import CursorEventComponent from '../../concretes/components/CursorEventComponent';
import CursorEventSystem from '../systems/CursorEventSystem';

export function CursorComponentIsResetAfter(
    target: CursorEventSystem,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
): any {
    const method = descriptor.value;
    descriptor.value = function(component: CursorEventComponent): void {
        method.call(this, component);
        component.set({
            eventName: CURSOR_EVENT.UNDEFINED,
            cursor: {
                x: -1,
                y: -1
            }
        });
    };
}
