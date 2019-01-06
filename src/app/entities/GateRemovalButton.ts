import Button from './Button';
import Command from '../../framework/concretes/Command';
import GateRemovalSystem from '../systems/GateRemovalSystem';

export default class GateRemovalButton extends Button {

    constructor({ x, y }: { x: number, y: number }) {
        super({ x, y});
        this.commands.onCursorCompleteActuation = new Command({ method: () => {
            if (this._engine.systems.get(GateRemovalSystem)) {
                this._engine.systems.remove(GateRemovalSystem);
            } else {
                this._engine.systems.add(GateRemovalSystem);
            }
        }});
    }

}
