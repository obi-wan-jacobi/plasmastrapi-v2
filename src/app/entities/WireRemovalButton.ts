import Button from './Button';
import Command from '../../framework/concretes/Command';
import WireRemovalSystem from '../systems/WireRemovalSystem';

export default class WireRemovalButton extends Button {

    constructor({ x, y }: { x: number, y: number }) {
        super({ x, y});
        this.commands.onCursorCompleteActuation = new Command({ method: () => {
            if (this._engine.systems.get(WireRemovalSystem)) {
                this._engine.systems.remove(WireRemovalSystem);
            } else {
                this._engine.systems.add(WireRemovalSystem);
            }
        }});
    }

}
