import Consumable from 'src/framework/abstracts/Consumable';
import ICursorPosition from 'src/framework/interfaces/ICursorPosition';
import MouseEvents from 'src/framework/enums/MouseEvents';

export default class MouseConsumable extends Consumable<{ position: ICursorPosition, event: string }> {

    constructor({ position, mouseEventKey }: { position: ICursorPosition, mouseEventKey: string }) {
        super({ position, event: MouseEvents[mouseEventKey] });
    }

}
